// Invisible Cloudflare Turnstile helper.
// Loads the Turnstile script lazily, fetches the site key from a public edge
// function, runs an invisible challenge, and caches the resulting token for the
// session. No UI changes required.

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const CONFIG_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-turnstile-config`;
const SESSION_KEY = "turnstile_token_v1";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;
let siteKeyPromise: Promise<string> | null = null;
let containerEl: HTMLDivElement | null = null;

function loadScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (typeof document === "undefined") return reject(new Error("no document"));
    if (window.turnstile) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Turnstile script failed")));
      if (window.turnstile) resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Turnstile script failed"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

async function getSiteKey(): Promise<string> {
  if (siteKeyPromise) return siteKeyPromise;
  siteKeyPromise = (async () => {
    const res = await fetch(CONFIG_URL, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
    });
    if (!res.ok) throw new Error("Failed to load verification config");
    const data = await res.json();
    if (!data.siteKey) throw new Error("Verification not configured");
    return data.siteKey as string;
  })();
  return siteKeyPromise;
}

function getContainer(): HTMLDivElement {
  if (containerEl && document.body.contains(containerEl)) return containerEl;
  const el = document.createElement("div");
  // Hidden offscreen — invisible mode does not render a visible widget,
  // but managed mode may briefly show one. Keep it offscreen either way.
  el.style.position = "fixed";
  el.style.left = "-10000px";
  el.style.top = "-10000px";
  el.style.width = "0";
  el.style.height = "0";
  el.style.overflow = "hidden";
  el.setAttribute("aria-hidden", "true");
  document.body.appendChild(el);
  containerEl = el;
  return el;
}

async function executeChallenge(): Promise<string> {
  await loadScript();
  const siteKey = await getSiteKey();
  if (!window.turnstile) throw new Error("Turnstile not available");

  const container = getContainer();
  // Clear container so we always render fresh
  container.innerHTML = "";

  return await new Promise<string>((resolve, reject) => {
    let settled = false;
    const timeout = window.setTimeout(() => {
      if (!settled) {
        settled = true;
        reject(new Error("Verification timed out"));
      }
    }, 20000);

    try {
      window.turnstile!.render(container, {
        sitekey: siteKey,
        size: "invisible",
        callback: (token: string) => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timeout);
          resolve(token);
        },
        "error-callback": () => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timeout);
          reject(new Error("Verification failed"));
        },
        "expired-callback": () => {
          sessionStorage.removeItem(SESSION_KEY);
        },
      });
    } catch (e) {
      if (!settled) {
        settled = true;
        window.clearTimeout(timeout);
        reject(e instanceof Error ? e : new Error("Verification error"));
      }
    }
  });
}

/**
 * Returns a Turnstile token. Reuses a cached session token if present,
 * otherwise runs an invisible challenge.
 */
export async function getTurnstileToken(): Promise<string> {
  try {
    const cached = sessionStorage.getItem(SESSION_KEY);
    if (cached) return cached;
  } catch {
    // sessionStorage may be unavailable; continue
  }
  const token = await executeChallenge();
  try {
    sessionStorage.setItem(SESSION_KEY, token);
  } catch {
    // ignore
  }
  return token;
}

/** Clear cached token, e.g. after a 401/403 from the backend. */
export function resetTurnstileToken(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}
