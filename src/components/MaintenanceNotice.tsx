import { Wrench, Linkedin, Instagram } from "lucide-react";
import { openExternal } from "@/lib/openExternal";

const LINKEDIN_URL = "https://www.linkedin.com/in/shreejan-sapkota-0449b023b/";
const INSTAGRAM_URL = "https://www.instagram.com/sapkota.shreejan/";

const MaintenanceNotice = () => {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
      style={{ background: "#ffffff" }}
      role="dialog"
      aria-modal="true"
      aria-label="Site under maintenance"
    >
      {/* faint moving sheen — barely visible over white */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ opacity: 0.18 }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-30%",
            width: "40%",
            height: "200%",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(15,118,110,0.12) 50%, transparent 100%)",
            transform: "skewX(-18deg)",
            animation: "sheen 9s ease-in-out infinite",
          }}
        />
      </div>

      <div
        className="relative w-full max-w-[640px] text-center"
        style={{ animation: "fade-up 0.5s cubic-bezier(0.22,1,0.36,1)" }}
      >
        {/* OFFLINE status — subtle pulsing dot */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <span
            className="relative flex items-center justify-center"
            style={{ width: 10, height: 10 }}
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: "#0f766e", animation: "ripple 2.4s ease-out infinite" }}
            />
            <span
              className="relative rounded-full"
              style={{ width: 8, height: 8, background: "#0f766e" }}
            />
          </span>
          <span
            className="font-mono-syne text-[12px]"
            style={{ color: "#0f766e", letterSpacing: "0.28em" }}
          >
            OFFLINE · BACK SOON
          </span>
        </div>

        {/* Wrench with gentle float */}
        <div
          className="mx-auto mb-8 flex items-center justify-center"
          style={{
            width: 84,
            height: 84,
            borderRadius: "50%",
            background: "#f3f7f6",
            border: "1px solid #dce7e4",
            animation: "float-soft 4s ease-in-out infinite",
          }}
        >
          <Wrench className="w-9 h-9" style={{ color: "#0f766e" }} />
        </div>

        <h1
          className="font-display text-[34px] md:text-[46px] leading-[1.1] mb-5"
          style={{ letterSpacing: "-0.02em", color: "#18302d" }}
        >
          This portfolio is being upgraded
        </h1>

        <p
          className="text-[15px] md:text-[16px] leading-[1.8] mx-auto max-w-[520px]"
          style={{ color: "#48615d" }}
        >
          I'm rebuilding a few sections and the AI tools, so the full site is
          hidden for now. For updates on when it goes live, follow me on my
          social media below.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => openExternal(e, LINKEDIN_URL)}
            className="flex items-center justify-center gap-2.5 px-7 py-3.5 text-[13px] w-full sm:w-auto transition-opacity hover:opacity-90"
            style={{
              background: "#0f766e",
              color: "#ffffff",
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
            className="flex items-center justify-center gap-2.5 px-7 py-3.5 text-[13px] w-full sm:w-auto transition-colors hover:border-[#0f766e]"
            style={{
              background: "#ffffff",
              border: "1px solid #dce7e4",
              color: "#0f766e",
              fontFamily: "JetBrains Mono, monospace",
              letterSpacing: "0.1em",
            }}
          >
            <Instagram className="w-4 h-4" /> FOLLOW ON INSTAGRAM
          </a>
        </div>

        <p
          className="font-mono-syne mt-12 text-[11px]"
          style={{ color: "#6d817d", letterSpacing: "0.18em" }}
        >
          SHREEJAN SAPKOTA · BACK SOON
        </p>
      </div>
    </div>
  );
};

export default MaintenanceNotice;
