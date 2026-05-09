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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 arctic-noise overflow-hidden"
      style={{
        backgroundColor: "#0A0A0A",
        backgroundImage:
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,138,30,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(245,181,68,0.10) 0%, transparent 60%), linear-gradient(180deg,#0A0A0A 0%, #050505 100%)",
      }}
    >
      {/* Animated mono grid lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,138,30,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,138,30,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="aurora-blob" style={{ top: "10%", left: "55%" }} />
      <div className="aurora-blob alt" style={{ bottom: "5%", left: "5%", animationDelay: "-6s" }} />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-5 font-mono text-[10px] tracking-[0.3em] uppercase text-[#FFB36B]/70">
        <span>SS · Studio</span>
        <span className="hidden sm:inline">Security Checkpoint</span>
        <span>{new Date().getFullYear()}</span>
      </div>

      <div
        className="w-full max-w-md text-center cinematic-in relative rounded-2xl"
        style={{
          background: "rgba(17,17,17,0.85)",
          backdropFilter: "blur(20px) saturate(150%)",
          WebkitBackdropFilter: "blur(20px) saturate(150%)",
          border: "1px solid rgba(255,138,30,0.25)",
          boxShadow: "0 24px 80px -20px rgba(255,138,30,0.45), 0 0 0 1px rgba(255,138,30,0.08) inset",
          padding: "56px 44px",
          animationDelay: "0.3s",
        }}
      >
        {/* corner ticks */}
        <span className="absolute top-2 left-2 w-3 h-3 border-t border-l" style={{ borderColor: "#FF8A1E" }} />
        <span className="absolute top-2 right-2 w-3 h-3 border-t border-r" style={{ borderColor: "#FF8A1E" }} />
        <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l" style={{ borderColor: "#FF8A1E" }} />
        <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r" style={{ borderColor: "#FF8A1E" }} />

        <div className="relative mx-auto mb-6 flex h-[64px] w-[64px] items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, #FF8A1E, transparent 40%, #F5B544 70%, #FF8A1E)",
              animation: "border-spin 4s linear infinite",
              WebkitMask: "radial-gradient(circle, transparent 58%, #000 60%)",
              mask: "radial-gradient(circle, transparent 58%, #000 60%)",
            }}
          />
          <div
            className="absolute inset-2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,138,30,0.25), transparent 70%)" }}
          />
          <ShieldCheck className="h-7 w-7" strokeWidth={1.5} style={{ color: "#FF8A1E", filter: "drop-shadow(0 0 8px rgba(255,138,30,0.7))" }} />
        </div>

        <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: "#FFB36B" }}>
          [ Verification Required ]
        </p>
        <h2
          className="font-display mb-3"
          style={{ color: "#FFFFFF", fontSize: "26px", fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          Security check
        </h2>
        <p className="font-normal mb-8 text-[13px]" style={{ color: "#9A9A9A" }}>
          Please verify you're human to continue to the portfolio.
        </p>

        <div
          className="flex justify-center min-h-[70px] overflow-hidden"
          style={{ border: "1px solid #242424", background: "#0A0A0A" }}
        >
          <div ref={widgetRef} aria-label="Cloudflare Turnstile verification" />
        </div>

        {status === "loading" && (
          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest" style={{ color: "#9A9A9A" }}>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Loading…
          </div>
        )}
        {status === "verifying" && (
          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest" style={{ color: "#9A9A9A" }}>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Verifying…
          </div>
        )}
        {status === "error" && (
          <p className="mt-5 text-xs text-destructive font-mono">{errorMsg}</p>
        )}

        <p
          className="mt-8 font-mono"
          style={{ fontSize: "10px", color: "#5C5C5C", letterSpacing: "0.25em" }}
        >
          PROTECTED BY CLOUDFLARE TURNSTILE
        </p>
      </div>
    </div>
  );
}
