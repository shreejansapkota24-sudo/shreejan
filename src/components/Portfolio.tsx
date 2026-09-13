import { useState } from "react";
import { ArrowUpRight, ShieldCheck, Wrench, X, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { openExternal } from "@/lib/openExternal";

const LINKEDIN_URL = "https://www.linkedin.com/in/shreejan-sapkota-0449b023b/";


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
    title: "AI Saathi",
    type: "AI Defensive Analyst",
    ai: true,
    tags: ["AI / LLM", "IOC Extraction", "Risk Scoring"],
    dev: true,
  },
];

const Row = ({ p, onDev }: { p: Project; onDev: (p: Project) => void }) => {
  const content = (
    <article className="group fade-up relative flex h-full min-h-[360px] flex-col overflow-hidden p-7 md:p-8 transition-all duration-300 hover:-translate-y-1" style={{ background: "var(--bg2)", border: "1px solid var(--line2)", boxShadow: "var(--shadow-soft)" }}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
          {p.dev ? <Wrench className="h-5 w-5" style={{ color: "var(--accent)" }} /> : <ShieldCheck className="h-5 w-5" style={{ color: "var(--accent)" }} />}
        </div>
        <span className="font-mono-syne" style={{ color: "var(--white3)" }}>{p.num}</span>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        {p.ai && <span className="font-mono-syne" style={{ color: "var(--accent)" }}>AI PROJECT</span>}
        {p.dev && <span className="font-mono-syne px-2 py-1" style={{ background: "var(--bg3)", color: "var(--accent)" }}>IN DEVELOPMENT</span>}
      </div>
      <h3 className="mt-4 font-display text-2xl md:text-3xl transition-colors duration-300 group-hover:text-[var(--accent)]">{p.title}</h3>
      <p className="mt-2 text-[14px]" style={{ color: "var(--white2)" }}>{p.type}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {p.tags.map((t) => <span key={t} className="stag">{t}</span>)}
      </div>

      <div className="mt-auto pt-8 inline-flex items-center gap-2 font-mono-syne" style={{ color: "var(--accent)" }}>
        {p.dev ? "View status" : "Open project"}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </article>
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
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-end justify-between gap-6 border-b pb-5" style={{ borderColor: "var(--line)" }}>
          <div>
            <span className="eyebrow fade-up">Selected Projects</span>
            <h2 className="mt-4 fade-up delay-1" style={{ fontSize: "clamp(30px,4vw,44px)" }}>Practical work that shows the learning</h2>
          </div>
          <span className="hidden sm:block font-mono-syne" style={{ color: "var(--white3)" }}>01 — 02</span>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <Row key={p.num} p={p} onDev={setDevProject} />
          ))}
        </div>
      </div>

      {/* In-development popup */}
      {devProject && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center px-6"
          style={{ background: "var(--overlay)", backdropFilter: "blur(8px)" }}
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
              boxShadow: "var(--shadow-soft)",
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
                style={{ width: 58, height: 58, background: "var(--bg3)", border: "1px solid var(--line2)" }}
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
              pipeline. It will be live on the portfolio soon — I'll post the update on my LinkedIn once it's
              finished, so follow me there to stay updated.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => openExternal(e, LINKEDIN_URL)}
                className="flex items-center justify-center gap-2 px-6 py-3 text-[12px] transition-opacity hover:opacity-90"
                style={{ background: "var(--accent)", color: "var(--bg2)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.12em" }}
              >
                <Linkedin className="w-3.5 h-3.5" /> FOLLOW ON LINKEDIN
              </a>
              <button
                onClick={() => setDevProject(null)}
                className="px-6 py-3 text-[12px] transition-colors hover:border-[var(--accent)]"
                style={{ background: "var(--bg2)", border: "1px solid var(--line2)", color: "var(--accent)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.12em" }}
              >
                GOT IT
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
