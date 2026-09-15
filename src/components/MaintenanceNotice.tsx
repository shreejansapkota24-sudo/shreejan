import { useEffect, useState } from "react";
import { X, Wrench, Linkedin } from "lucide-react";
import { openExternal } from "@/lib/openExternal";

const LINKEDIN_URL = "https://www.linkedin.com/in/shreejan-sapkota-0449b023b/";
const STORAGE_KEY = "portfolio-maintenance-notice";

const MaintenanceNotice = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY) === "seen") return;
    const t = window.setTimeout(() => setOpen(true), 500);
    return () => window.clearTimeout(t);
  }, []);

  const close = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "seen");
    setOpen(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
      style={{ background: "hsl(var(--foreground) / 0.35)", backdropFilter: "blur(4px)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Site under maintenance"
      onClick={close}
    >
      <div
        className="w-full max-w-[420px]"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg)",
          border: "1px solid var(--line2)",
          boxShadow: "var(--shadow-panel)",
          animation: "fade-up 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--line)" }}>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full pulse-soft" style={{ background: "var(--accent)" }} />
            <span className="font-mono-syne text-[11px]" style={{ color: "var(--accent)", letterSpacing: "0.18em" }}>
              UNDER MAINTENANCE
            </span>
          </div>
          <button onClick={close} aria-label="Close">
            <X className="w-4 h-4" style={{ color: "var(--white2)" }} />
          </button>
        </div>

        <div className="px-6 py-8 text-center">
          <div
            className="mx-auto mb-5 flex items-center justify-center"
            style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--bg3)", border: "1px solid var(--line2)" }}
          >
            <Wrench className="w-5 h-5" style={{ color: "var(--accent)" }} />
          </div>
          <h2 className="font-display text-[22px] leading-tight mb-3" style={{ letterSpacing: "-0.02em" }}>
            This portfolio is being upgraded
          </h2>
          <p className="text-[13.5px] leading-[1.7]" style={{ color: "var(--white2)" }}>
            I'm still refining some sections and the AI tools, so a few things may look or behave unfinished.
            Feel free to browse in the meantime — I'll post here and on LinkedIn once everything is complete.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <button
              onClick={close}
              className="px-5 py-2.5 text-[12px] transition-opacity hover:opacity-90"
              style={{ background: "var(--accent)", color: "var(--accent-contrast)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em" }}
            >
              CONTINUE TO PORTFOLIO
            </button>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => openExternal(e, LINKEDIN_URL)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 text-[12px] transition-colors hover:border-[var(--accent)]"
              style={{ background: "var(--bg2)", border: "1px solid var(--line2)", color: "var(--accent)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em" }}
            >
              <Linkedin className="w-3.5 h-3.5" /> FOLLOW ON LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceNotice;
