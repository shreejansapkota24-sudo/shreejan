// Invisible Cloudflare Turnstile token helper.
// Loads the script lazily, fetches the site key from the public config edge
// function, runs an invisible challenge once, and returns a fresh token.

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const CONFIG_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-turnstile-config`;
const PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
      execute?: (widgetId: string) => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;
let siteKeyPromise: Promise<string> | null = null;

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
      headers: { Authorization: `Bearer ${PUBLISHABLE_KEY}` },
    });
    if (!res.ok) throw new Error("Verification config unavailable");
    const data = await res.json();
    if (!data.siteKey) throw new Error("Verification not configured");
    return data.siteKey as string;
  })();
  return siteKeyPromise;
}

/**
 * Returns true when the host is a Lovable preview/sandbox/local environment
 * (where Turnstile hostnames usually aren't whitelisted). Callers can skip
 * Turnstile here and the backend skips it too.
 */
export function isPreviewHost(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return (
    host.endsWith(".lovable.app")
    || host.endsWith(".lovable.dev")
    || host === "localhost"
    || host === "127.0.0.1"
  );
}

/**
 * Run a fresh invisible Turnstile challenge and return the token.
 * Throws on timeout or error.
 */
export async function getFreshTurnstileToken(): Promise<string> {
  await loadScript();
  const siteKey = await getSiteKey();
  if (!window.turnstile) throw new Error("Turnstile not available");

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-10000px";
  container.style.top = "-10000px";
  container.style.width = "0";
  container.style.height = "0";
  container.style.overflow = "hidden";
  container.setAttribute("aria-hidden", "true");
  document.body.appendChild(container);

  let widgetId: string | null = null;
  return await new Promise<string>((resolve, reject) => {
    let settled = false;
    const cleanup = () => {
      try {
        if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
      } catch { /* ignore */ }
      try { container.remove(); } catch { /* ignore */ }
    };
    const timeout = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error("Verification timed out"));
    }, 20000);

    try {
      widgetId = window.turnstile!.render(container, {
        sitekey: siteKey,
        size: "invisible",
        callback: (token: string) => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timeout);
          // Defer cleanup to next tick so Turnstile can finish internal work
          setTimeout(cleanup, 0);
          resolve(token);
        },
        "error-callback": () => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timeout);
          cleanup();
          reject(new Error("Verification failed"));
        },
      });
    } catch (e) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      cleanup();
      reject(e instanceof Error ? e : new Error("Verification error"));
    }
  });
}
