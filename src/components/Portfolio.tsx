import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

type Project = {
  num: string;
  title: string;
  type: string;
  ai?: boolean;
  tags: string[];
  href?: string;
  muted?: boolean;
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
    href: "/cyberguard/cyber-saathi",
  },
  {
    num: "03",
    title: "More Coming Soon",
    type: "Ongoing experiments",
    tags: ["WIP", "Research"],
    muted: true,
  },
];

const Row = ({ p }: { p: Project }) => {
  const content = (
    <div
      className={`group fade-up grid grid-cols-[60px_1fr_40px] items-center gap-6 py-10 px-6 md:px-6 transition-all duration-500 ${
        p.muted ? "opacity-60" : "hover:px-10"
      }`}
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <span className="font-mono-syne" style={{ color: "var(--white3)" }}>{p.num}</span>
      <div>
        <h3
          className="font-display transition-all duration-500 group-hover:text-[var(--accent)]"
          style={{ fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-0.04em" }}
        >
          {p.title.toUpperCase()}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="font-mono-syne" style={{ color: "var(--accent)" }}>
            {p.ai && <span className="mr-2">⚡ AI</span>}
            {p.type}
          </span>
          <span style={{ color: "var(--white3)" }}>·</span>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2.5 py-1"
                style={{
                  background: "var(--bg3)",
                  border: "1px solid var(--line)",
                  color: "var(--white2)",
                  fontFamily: "Syne Mono, monospace",
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
  return (
    <section id="portfolio" className="px-6 md:px-16 py-28 md:py-36">
      <div className="max-w-[1320px] mx-auto">
        <span className="eyebrow fade-up">— Selected Projects</span>
        <h2 className="mt-6 fade-up delay-1 leading-[0.95]" style={{ fontSize: "clamp(44px,7vw,96px)" }}>
          <span className="block">PRACTICAL WORK THAT</span>
          <span
            className="block"
            style={{
              fontFamily: 'Georgia, serif', fontStyle: "italic", fontWeight: 400,
              textTransform: "lowercase", color: "transparent",
              WebkitTextStroke: "1px var(--white2)",
            }}
          >
            shows the learning.
          </span>
        </h2>

        <div className="mt-16" style={{ borderBottom: "1px solid var(--line)" }}>
          {projects.map((p) => (
            <Row key={p.num} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
