import { useEffect, useRef, useState } from "react";
import { Lock, Loader2 } from "lucide-react";

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

        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
          sitekey: siteKey,
          theme: "dark",
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-hidden"
      style={{ background: "#0A0E1A" }}
    >
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-5"
        style={{ borderBottom: "1px solid rgba(245,166,35,0.15)" }}
      >
        <span
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 18,
            fontWeight: 600,
            color: "#F9FAFB",
            letterSpacing: "-0.02em",
          }}
        >
          Shreejan<span style={{ color: "#F5A623" }}>.</span>
        </span>
        <span className="hidden sm:inline text-[10px] tracking-[0.3em] uppercase" style={{ color: "#9CA3AF", fontFamily: "'JetBrains Mono', monospace" }}>
          Portfolio Access
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "#9CA3AF", fontFamily: "'JetBrains Mono', monospace" }}>
          {new Date().getFullYear()}
        </span>
      </div>

      {/* radial glow */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(245,166,35,0.10), transparent 65%)", pointerEvents: "none" }} />

      <div
        className="relative w-full max-w-md text-center rounded-2xl overflow-hidden"
        style={{
          background: "rgba(17,24,39,0.85)",
          border: "1px solid rgba(245,166,35,0.3)",
          padding: "48px 36px",
          backdropFilter: "blur(16px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,166,35,0.08)",
        }}
      >
        <div
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.4)" }}
        >
          <Lock className="h-5 w-5" strokeWidth={1.8} style={{ color: "#F5A623" }} />
        </div>

        <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "#F5A623", fontFamily: "'JetBrains Mono', monospace" }}>
          Verification
        </p>
        <h2
          className="mb-3"
          style={{
            color: "#F9FAFB",
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            fontFamily: '"Playfair Display", serif',
          }}
        >
          A quick check before you enter.
        </h2>
        <p className="mb-7 text-[13px] leading-relaxed" style={{ color: "#9CA3AF" }}>
          Please complete the verification below to continue to the portfolio.
        </p>

        <div
          className="flex justify-center items-center min-h-[78px] rounded-xl p-3"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "2px solid rgba(245,166,35,0.4)",
            boxShadow: "0 0 0 3px rgba(245,166,35,0.12), inset 0 0 12px rgba(245,166,35,0.06)",
          }}
        >
          <div ref={widgetRef} aria-label="Cloudflare Turnstile verification" />
        </div>

        {status === "loading" && (
          <div className="mt-5 flex items-center justify-center gap-2 text-xs" style={{ color: "#9CA3AF" }}>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Loading…
          </div>
        )}
        {status === "verifying" && (
          <div className="mt-5 flex items-center justify-center gap-2 text-xs" style={{ color: "#F5A623" }}>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Verifying…
          </div>
        )}
        {status === "error" && (
          <div className="mt-5 flex flex-col items-center gap-3">
            <p className="text-xs" style={{ color: "#EF4444" }}>{errorMsg || "Verification failed."}</p>
            <button
              onClick={() => {
                setStatus("loading");
                setErrorMsg("");
                if (widgetIdRef.current && window.turnstile) {
                  try { window.turnstile.reset(widgetIdRef.current); setStatus("ready"); } catch { /* ignore */ }
                } else {
                  window.location.reload();
                }
              }}
              className="px-4 py-2 text-xs rounded-md"
              style={{ background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.4)", color: "#F5A623", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}
            >
              Retry verification
            </button>
          </div>
        )}

        <p className="mt-8 text-[10px] tracking-[0.3em] uppercase" style={{ color: "#6B7280", fontFamily: "'JetBrains Mono', monospace" }}>
          Protected by Cloudflare Turnstile
        </p>
      </div>
    </div>
  );
}
