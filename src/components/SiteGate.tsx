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
    // Auto-skip gate in Lovable preview / sandbox environments so the
    // builder isn't blocked by Cloudflare Turnstile hostname restrictions.
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      if (host.endsWith(".lovable.app") || host.endsWith(".lovable.dev") || host === "localhost") {
        return true;
      }
    }
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
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 arctic-noise"
      style={{
        backgroundColor: "#F5F5F7",
        backgroundImage:
          "radial-gradient(ellipse 70% 50% at 80% 10%, rgba(183,156,255,0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 10% 90%, rgba(107,213,255,0.15) 0%, transparent 60%)",
      }}
    >
      <div className="aurora-blob" style={{ top: "10%", left: "55%" }} />
      <div className="aurora-blob alt" style={{ bottom: "5%", left: "5%", animationDelay: "-6s" }} />

      <div
        className="w-full max-w-md rounded-3xl text-center cinematic-in relative"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
          border: "1px solid rgba(10, 10, 15, 0.06)",
          boxShadow: "0 20px 60px rgba(107, 91, 255, 0.15), 0 0 0 1px rgba(255,255,255,0.5) inset",
          padding: "56px 48px",
          animationDelay: "0.3s",
        }}
      >
        <div className="relative mx-auto mb-6 flex h-[52px] w-[52px] items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: "0 0 50px rgba(107,91,255,0.4)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          />
          <ShieldCheck className="h-[52px] w-[52px] relative" style={{ color: "#6B5BFF", fill: "rgba(107,91,255,0.08)" }} strokeWidth={1.4} />
        </div>

        <h2 className="font-display font-bold mb-3" style={{ color: "#0A0A0F", fontSize: "28px", letterSpacing: "-0.02em" }}>
          Security check
        </h2>
        <p className="font-normal mb-8" style={{ color: "#6B6B75" }}>
          Please verify you're human to continue to the portfolio.
        </p>

        <div
          className="flex justify-center min-h-[70px] rounded-[10px] overflow-hidden"
          style={{ border: "1px solid rgba(10,10,15,0.06)" }}
        >
          <div ref={widgetRef} aria-label="Cloudflare Turnstile verification" />
        </div>

        {status === "loading" && (
          <div className="mt-5 flex items-center justify-center gap-2 text-xs" style={{ color: "#6B6B75" }}>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Loading verification…
          </div>
        )}
        {status === "verifying" && (
          <div className="mt-5 flex items-center justify-center gap-2 text-xs" style={{ color: "#6B6B75" }}>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Verifying…
          </div>
        )}
        {status === "error" && (
          <p className="mt-5 text-xs text-destructive">{errorMsg}</p>
        )}

        <p
          className="mt-8 font-mono"
          style={{ fontSize: "11px", color: "#9B9BA5", letterSpacing: "0.08em" }}
        >
          PROTECTED BY CLOUDFLARE TURNSTILE
        </p>
      </div>
    </div>
  );
}
