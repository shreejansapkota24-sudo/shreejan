import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  role: string;
  learned: string;
  href?: string;
  internal?: boolean;
};

const projects: Project[] = [
  {
    num: "01",
    title: "CyberGuard",
    subtitle: "Cybersecurity toolkit",
    description:
      "A cybersecurity toolkit with URL and file scanning, a live threat map, and country-level intelligence panels.",
    tags: ["React", "TypeScript", "Security", "Threat Intel"],
    role: "Designer & Developer",
    learned: "Building data-driven dashboards and integrating threat intelligence sources.",
    href: "/cyberguard",
    internal: true,
  },
  {
    num: "02",
    title: "Cyber Saathi",
    subtitle: "AI defensive analyst",
    description:
      "An AI-powered defensive security analyst that extracts IOCs, scores risk, and explains threats in plain language.",
    tags: ["AI", "LLM", "IOC Extraction", "Risk Scoring"],
    role: "Designer & Developer",
    learned: "Prompt engineering, structured AI outputs, and applied LLM workflows.",
    href: "/cyberguard/cyber-saathi",
    internal: true,
  },
  {
    num: "03",
    title: "More Coming Soon",
    subtitle: "Ongoing experiments",
    description:
      "New experiments in full-stack development, AI tooling, and data science — currently in progress.",
    tags: ["WIP", "Research", "Experiments"],
    role: "Self-directed study",
    learned: "Continuous practice across full-stack, AI, and data fundamentals.",
  },
];

const easing = [0.16, 1, 0.3, 1] as const;

const Portfolio = () => {
  const [active, setActive] = useState(0);
  const project = projects[active];

  const CTA = ({ p }: { p: Project }) => {
    const label = p.href ? "View Project" : "Coming Soon";
    const inner = (
      <span className="inline-flex items-center gap-2">
        {label}
        {p.href && <ArrowUpRight className="w-4 h-4" />}
      </span>
    );
    if (!p.href) {
      return (
        <span
          className="inline-flex items-center gap-2 px-6 py-3 text-[13px] rounded-full"
          style={{
            border: "1px dashed var(--sp-border)",
            color: "var(--sp-mid)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {inner}
        </span>
      );
    }
    if (p.internal) {
      return (
        <Link to={p.href} className="btn-mono">
          {inner}
        </Link>
      );
    }
    return (
      <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn-mono">
        {inner}
      </a>
    );
  };

  return (
    <section id="portfolio" className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow mb-6 inline-flex">Selected Projects</span>
          <h2
            className="text-4xl md:text-6xl mb-6"
            style={{ fontFamily: '"Playfair Display", serif', fontWeight: 500, letterSpacing: "-0.025em" }}
          >
            Practical work that{" "}
            <span style={{ fontStyle: "italic", color: "var(--sp-mid-dark)" }}>shows the learning.</span>
          </h2>
          <p className="text-[15px]" style={{ color: "var(--sp-mid)" }}>
            Each project is a step in building applied skills across web development, AI, and security.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          {/* Project list (left) */}
          <div className="md:col-span-5 space-y-2">
            {projects.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.num}
                  onClick={() => setActive(i)}
                  className="w-full text-left p-5 rounded-xl transition-all duration-500 cinematic-ease relative"
                  style={{
                    background: isActive ? "var(--sp-charcoal)" : "var(--sp-white)",
                    border: `1px solid ${isActive ? "var(--sp-charcoal)" : "var(--sp-border)"}`,
                    color: isActive ? "var(--sp-white)" : "var(--sp-charcoal)",
                  }}
                  aria-pressed={isActive}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className="text-[10px] font-mono mb-2"
                        style={{
                          color: isActive ? "rgba(255,255,255,0.55)" : "var(--sp-mid)",
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                        }}
                      >
                        Project · {p.num}
                      </p>
                      <h3
                        className="text-xl"
                        style={{
                          fontFamily: '"Playfair Display", serif',
                          fontWeight: 500,
                          color: isActive ? "var(--sp-white)" : "var(--sp-charcoal)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {p.title}
                      </h3>
                      <p
                        className="text-[12px] mt-1"
                        style={{ color: isActive ? "rgba(255,255,255,0.65)" : "var(--sp-mid)" }}
                      >
                        {p.subtitle}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="w-4 h-4 mt-1 transition-transform duration-500"
                      style={{
                        color: isActive ? "var(--sp-white)" : "var(--sp-medium)",
                        transform: isActive ? "translate(2px,-2px)" : "none",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active project detail (right) */}
          <div className="md:col-span-7">
            <div className="sp-card p-8 md:p-10 min-h-[420px] relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.num}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: easing }}
                >
                  <p className="font-mono-label mb-5">Case · {project.num}</p>
                  <h3
                    className="mb-4"
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 500,
                      fontSize: "clamp(32px, 4.5vw, 52px)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      color: "var(--sp-charcoal)",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed mb-8" style={{ color: "var(--sp-mid-dark)" }}>
                    {project.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div>
                      <p className="font-mono-label mb-2">Role</p>
                      <p className="text-[14px]" style={{ color: "var(--sp-charcoal)" }}>{project.role}</p>
                    </div>
                    <div>
                      <p className="font-mono-label mb-2">What I learned</p>
                      <p className="text-[14px]" style={{ color: "var(--sp-charcoal)" }}>{project.learned}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 text-[11px] rounded-full"
                        style={{
                          background: "var(--sp-surface)",
                          border: "1px solid var(--sp-border)",
                          color: "var(--sp-mid-dark)",
                          fontFamily: "JetBrains Mono, monospace",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <CTA p={project} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
