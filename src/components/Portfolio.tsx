import { useState } from "react";
import { ArrowUpRight, Wrench, X } from "lucide-react";
import { Link } from "react-router-dom";

type Project = {
  num: string;
  title: string;
  type: string;
  ai?: boolean;
  tags: string[];
  href?: string;
  muted?: boolean;
  dev?: boolean;
};

const projects: Project[] = [
  {
    num: "01",
    title: "CyberGuard",
    type: "Cybersecurity Toolkit",
    ai: true,
    tags: ["React", "TypeScript", "Supabase", "Threat Intel"],
    href: "/cyberguard",
  },
  {
    num: "02",
    title: "Cyber Saathi",
    type: "AI Defensive Analyst",
    ai: true,
    tags: ["AI / LLM", "IOC Extraction", "Risk Scoring"],
    dev: true,
  },
];

const Row = ({ p, onDev }: { p: Project; onDev: (p: Project) => void }) => {
  const content = (
    <div
      className={`group fade-up relative grid grid-cols-[60px_1fr_40px] items-center gap-6 py-10 px-6 md:px-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
        p.muted ? "opacity-60" : "hover:px-10"
      }`}
      style={{ borderTop: "1px solid var(--line)", wordBreak: "break-word", overflowWrap: "break-word" }}
    >
      {/* smooth sweep background on hover */}
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
        style={{ background: "linear-gradient(90deg, rgba(139,123,249,0.10), transparent 70%)" }}
      />
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100"
        style={{ background: "var(--accent)" }}
      />

      <span className="font-mono-syne relative transition-all duration-500 group-hover:text-[var(--accent)] group-hover:translate-x-1" style={{ color: "var(--white3)" }}>{p.num}</span>
      <div className="min-w-0 relative transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
        <h3
          className="font-display transition-all duration-500 group-hover:text-[var(--accent)]"
          style={{ fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-0.04em", wordBreak: "break-word", whiteSpace: "normal" }}
        >
          {p.title.toUpperCase()}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="font-mono-syne" style={{ color: "var(--accent)" }}>
            {p.ai && <span className="mr-2">⚡ AI</span>}
            {p.type}
          </span>
          {p.dev && (
            <span
              className="text-[10px] px-2.5 py-1 inline-flex items-center gap-1.5"
              style={{
                background: "var(--glass)",
                border: "1px solid var(--accent)",
                borderRadius: 999,
                color: "var(--accent)",
                fontFamily: "JetBrains Mono, monospace",
                letterSpacing: "0.14em",
              }}
            >
              <Wrench className="w-3 h-3" /> IN DEVELOPMENT
            </span>
          )}
          <span style={{ color: "var(--white3)" }}>·</span>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2.5 py-1"
                style={{
                  background: "var(--glass)",
                  border: "1px solid var(--glass-line)",
                  borderRadius: 999,
                  color: "var(--white2)",
                  fontFamily: "JetBrains Mono, monospace",
                  letterSpacing: "0.08em",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      {!p.muted && (
        <ArrowUpRight
          className="transition-all duration-500 group-hover:rotate-45 group-hover:text-[var(--accent)]"
          style={{ color: "var(--white2)", width: 32, height: 32 }}
        />
      )}
    </div>
  );

  if (p.dev) {
    return (
      <button type="button" onClick={() => onDev(p)} className="block w-full text-left">
        {content}
      </button>
    );
  }

  if (p.href && !p.muted) {
    return p.href.startsWith("/") ? (
      <Link to={p.href}>{content}</Link>
    ) : (
      <a href={p.href}>{content}</a>
    );
  }
  return content;
};

const Portfolio = () => {
  const [devProject, setDevProject] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="px-6 md:px-16 py-28 md:py-36">
      <div className="max-w-[1320px] mx-auto">
        <span className="eyebrow fade-up">— Selected Projects</span>
        <h2 className="mt-6 fade-up delay-1 leading-[0.95]" style={{ fontSize: "clamp(44px,7vw,96px)" }}>
          <span className="block">PRACTICAL WORK THAT</span>
          <span
            className="block"
            style={{
              fontWeight: 300, textTransform: "lowercase",
              background: "var(--gradient-text)", WebkitBackgroundClip: "text",
              backgroundClip: "text", color: "transparent",
            }}
          >
            shows the learning.
          </span>
        </h2>

        <div className="mt-16" style={{ borderBottom: "1px solid var(--line)" }}>
          {projects.map((p) => (
            <Row key={p.num} p={p} onDev={setDevProject} />
          ))}
        </div>
      </div>

      {/* In-development popup */}
      {devProject && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center px-6"
          style={{ background: "rgba(5,8,20,0.72)", backdropFilter: "blur(8px)" }}
          role="dialog"
          aria-modal="true"
          aria-label={`${devProject.title} status`}
          onClick={() => setDevProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[440px] px-8 py-10 text-center"
            style={{
              background: "var(--bg)",
              border: "1px solid var(--line2)",
              boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7)",
              animation: "fade-up 0.35s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <button
              onClick={() => setDevProject(null)}
              aria-label="Close"
              className="absolute top-4 right-4"
            >
              <X className="w-4 h-4" style={{ color: "var(--white2)" }} />
            </button>

            <div
              className="mx-auto mb-6 flex items-center justify-center"
              style={{ width: 58, height: 58, borderRadius: "50%", background: "var(--bg3)", border: "1px solid var(--line2)" }}
            >
              <Wrench className="w-6 h-6" style={{ color: "var(--accent)" }} />
            </div>

            <p className="font-mono-syne text-[11px] mb-4" style={{ color: "var(--accent)", letterSpacing: "0.2em" }}>
              IN DEVELOPMENT
            </p>
            <h3 className="font-display text-[28px] leading-tight mb-4" style={{ letterSpacing: "-0.03em" }}>
              {devProject.title} is coming soon
            </h3>
            <p className="text-[14px] leading-[1.75]" style={{ color: "var(--white2)" }}>
              This AI project is currently in its development phase while I refine the model and its analysis
              pipeline. It will be live on the portfolio soon.
            </p>
            <button
              onClick={() => setDevProject(null)}
              className="mt-7 px-6 py-3 text-[12px] transition-colors hover:bg-[var(--accent)] hover:text-[var(--bg)]"
              style={{ background: "var(--bg2)", border: "1px solid var(--line2)", color: "var(--accent)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.12em" }}
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
