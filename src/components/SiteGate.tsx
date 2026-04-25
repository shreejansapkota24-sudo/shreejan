import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const CONFIG_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-turnstile-config`;
const VERIFY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-turnstile`;
const SESSION_KEY = "site_gate_verified_v1";
const PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

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
function loadScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (window.turnstile) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Script failed")));
      if (window.turnstile) resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Script failed"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export default function SiteGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [status, setStatus] = useState<"loading" | "ready" | "verifying" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (verified) return;
    let cancelled = false;

    (async () => {
      try {
        const configRes = await fetch(CONFIG_URL, {
          headers: { Authorization: `Bearer ${PUBLISHABLE_KEY}` },
        });
        if (!configRes.ok) throw new Error("Could not load verification");
        const { siteKey } = await configRes.json();
        if (!siteKey) throw new Error("Verification not configured");

        await loadScript();
        if (cancelled || !widgetRef.current || !window.turnstile) return;

        // Render the standard "managed" widget — the checkbox style shown in
        // the reference (Verify you are human + CLOUDFLARE branding).
        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
          sitekey: siteKey,
          theme: "light",
          size: "normal",
          callback: async (token: string) => {
            setStatus("verifying");
            try {
              const res = await fetch(VERIFY_URL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${PUBLISHABLE_KEY}`,
                },
                body: JSON.stringify({ token }),
              });
              const data = await res.json();
              if (data.success) {
                try {
                  sessionStorage.setItem(SESSION_KEY, "1");
                } catch {
                  /* ignore */
                }
                setVerified(true);
              } else {
                setStatus("error");
                setErrorMsg("Verification failed. Please try again.");
                window.turnstile?.reset(widgetIdRef.current ?? undefined);
              }
            } catch {
              setStatus("error");
              setErrorMsg("Network error. Please try again.");
              window.turnstile?.reset(widgetIdRef.current ?? undefined);
            }
          },
          "error-callback": () => {
            setStatus("error");
            setErrorMsg("Verification error. Please try again.");
          },
          "expired-callback": () => {
            window.turnstile?.reset(widgetIdRef.current ?? undefined);
          },
        });

        if (!cancelled) setStatus("ready");
      } catch (e) {
        if (!cancelled) {
          setStatus("error");
          setErrorMsg(e instanceof Error ? e.message : "Verification unavailable");
        }
      }
    })();

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* ignore */
        }
        widgetIdRef.current = null;
      }
    };
  }, [verified]);

  if (verified) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10 p-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheck className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Security check</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please verify you're human to continue to the portfolio.
        </p>

        <div className="flex justify-center min-h-[70px]">
          <div ref={widgetRef} aria-label="Cloudflare Turnstile verification" />
        </div>

        {status === "loading" && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Loading verification…
          </div>
        )}
        {status === "verifying" && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Verifying…
          </div>
        )}
        {status === "error" && (
          <p className="mt-4 text-xs text-destructive">{errorMsg}</p>
        )}

        <p className="mt-6 text-[11px] text-muted-foreground/70">
          Protected by Cloudflare Turnstile
        </p>
      </div>
    </div>
  );
}
