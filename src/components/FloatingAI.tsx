import { useState } from "react";
import { X, Sparkles, Wrench, Linkedin } from "lucide-react";
import { openExternal } from "@/lib/openExternal";

const LINKEDIN_URL = "https://www.linkedin.com/in/shreejan-sapkota-0449b023b/";


const FloatingAI = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI Saathi" : "Open AI Saathi"}
        className="group fixed z-[999] flex items-center justify-center transition-transform duration-300 hover:scale-105"
        style={{
          bottom: 32, right: 32,
          width: 56, height: 56,
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, #1a1a1a, #0a0a0a)",
          border: "1px solid var(--line2)",
          boxShadow: "0 12px 32px -8px rgba(139,123,249,0.25)",
        }}
      >
        <span
          className="absolute inset-[-6px] rounded-full ring-spin pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, transparent, var(--accent), transparent 70%)",
            mask: "radial-gradient(circle, transparent 26px, #000 27px)",
            WebkitMask: "radial-gradient(circle, transparent 26px, #000 27px)",
            opacity: 0.6,
          }}
        />
        {open ? (
          <X className="w-5 h-5" style={{ color: "var(--accent)" }} />
        ) : (
          <Sparkles className="w-5 h-5 pulse-soft" style={{ color: "var(--accent)" }} />
        )}

        {!open && (
          <span
            className="absolute right-[70px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-mono-syne whitespace-nowrap px-3 py-1.5"
            style={{ background: "var(--bg2)", border: "1px solid var(--line2)", color: "var(--accent)" }}
          >
            AI Saathi
          </span>
        )}
      </button>

      {/* Development notice panel */}
      {open && (
        <div
          className="fixed z-[998] flex flex-col"
          style={{
            bottom: 100, right: 32,
            width: "min(360px, calc(100vw - 32px))",
            background: "var(--bg)",
            border: "1px solid var(--line2)",
            boxShadow: "0 24px 60px -12px rgba(0,0,0,0.6)",
            animation: "fade-up 0.3s cubic-bezier(0.22,1,0.36,1)",
          }}
          role="dialog"
          aria-label="AI Saathi status"
        >
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--line)" }}>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full pulse-soft" style={{ background: "var(--accent)" }} />
              <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
              <span className="font-mono-syne" style={{ color: "var(--accent)" }}>AI Saathi</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close">
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
            <p
              className="font-mono-syne text-[11px] mb-3"
              style={{ color: "var(--accent)", letterSpacing: "0.18em" }}
            >
              IN DEVELOPMENT
            </p>
            <h3 className="font-display text-[22px] leading-tight mb-3" style={{ letterSpacing: "-0.02em" }}>
              AI Saathi is being upgraded
            </h3>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "var(--white2)" }}>
              I'm making some changes to the AI model and its knowledge base. AI Saathi will be live on the
              portfolio again soon. I'll post the update on my LinkedIn once it's finished — follow me there to
              stay updated.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => openExternal(e, LINKEDIN_URL)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 text-[12px] transition-colors hover:opacity-90"
                style={{ background: "var(--accent)", color: "var(--bg)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em" }}
              >
                <Linkedin className="w-3.5 h-3.5" /> FOLLOW ON LINKEDIN
              </a>
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2.5 text-[12px] transition-colors hover:border-[var(--accent)]"
                style={{ background: "var(--bg2)", border: "1px solid var(--line2)", color: "var(--accent)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em" }}
              >
                GOT IT
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAI;
