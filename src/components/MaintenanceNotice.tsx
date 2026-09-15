import { Wrench, Linkedin, Instagram } from "lucide-react";
import { openExternal } from "@/lib/openExternal";

const LINKEDIN_URL = "https://www.linkedin.com/in/shreejan-sapkota-0449b023b/";
const INSTAGRAM_URL = "https://www.instagram.com/sapkota.shreejan/";

const MaintenanceNotice = () => {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
      style={{ background: "var(--bg)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Site under maintenance"
    >
      <div className="w-full max-w-[640px] text-center" style={{ animation: "fade-up 0.45s cubic-bezier(0.22,1,0.36,1)" }}>
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="w-2.5 h-2.5 rounded-full pulse-soft" style={{ background: "var(--accent)" }} />
          <span className="font-mono-syne text-[13px]" style={{ color: "var(--accent)", letterSpacing: "0.24em" }}>
            UNDER MAINTENANCE
          </span>
        </div>

        <div
          className="mx-auto mb-8 flex items-center justify-center"
          style={{ width: 84, height: 84, borderRadius: "50%", background: "var(--bg2)", border: "1px solid var(--line2)" }}
        >
          <Wrench className="w-9 h-9" style={{ color: "var(--accent)" }} />
        </div>

        <h1 className="font-display text-[34px] md:text-[46px] leading-[1.1] mb-5" style={{ letterSpacing: "-0.02em" }}>
          This portfolio is being upgraded
        </h1>

        <p
          className="text-[15px] md:text-[16px] leading-[1.8] mx-auto max-w-[520px]"
          style={{ color: "var(--white2)" }}
        >
          I'm rebuilding a few sections and the AI tools, so the full site is hidden for now.
          For updates on when it goes live, follow me on my social media below.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => openExternal(e, LINKEDIN_URL)}
            className="flex items-center justify-center gap-2.5 px-7 py-3.5 text-[13px] w-full sm:w-auto transition-opacity hover:opacity-90"
            style={{
              background: "var(--accent)",
              color: "var(--accent-contrast)",
              fontFamily: "JetBrains Mono, monospace",
              letterSpacing: "0.1em",
            }}
          >
            <Linkedin className="w-4 h-4" /> FOLLOW ON LINKEDIN
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => openExternal(e, INSTAGRAM_URL)}
            className="flex items-center justify-center gap-2.5 px-7 py-3.5 text-[13px] w-full sm:w-auto transition-colors hover:border-[var(--accent)]"
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--line2)",
              color: "var(--accent)",
              fontFamily: "JetBrains Mono, monospace",
              letterSpacing: "0.1em",
            }}
          >
            <Instagram className="w-4 h-4" /> FOLLOW ON INSTAGRAM
          </a>
        </div>

        <p className="font-mono-syne mt-12 text-[11px]" style={{ color: "var(--white3)", letterSpacing: "0.18em" }}>
          SHREEJAN SAPKOTA · BACK SOON
        </p>
      </div>
    </div>
  );
};

export default MaintenanceNotice;
