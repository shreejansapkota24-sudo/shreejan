import { Github, Linkedin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Project = {
  num: string;
  title: string;
  subtitle: string;
  tags: string[];
  href?: string;
  internal?: boolean;
};

const projects: Project[] = [
  {
    num: "01",
    title: "CyberGuard",
    subtitle:
      "A cybersecurity toolkit with URL & file scanning, a live threat map, and country-level intelligence panels.",
    tags: ["React", "TypeScript", "Security", "Threat Intel"],
    href: "/cyberguard",
    internal: true,
  },
  {
    num: "02",
    title: "Cyber Saathi",
    subtitle:
      "An AI-powered defensive security analyst that extracts IOCs, scores risk, and explains threats in plain language.",
    tags: ["AI", "LLM", "IOC Extraction", "Risk Scoring"],
    href: "/cyberguard/cyber-saathi",
    internal: true,
  },
  {
    num: "03",
    title: "More Coming Soon",
    subtitle:
      "New experiments in full-stack development, AI tooling, and security research — stay tuned.",
    tags: ["WIP", "Research", "Experiments"],
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 glass font-mono text-[10px] uppercase tracking-[0.3em] mb-6"
            style={{ color: "#E8D5A3", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 999 }}
          >
            Selected Works
          </span>
          <h2
            className="text-5xl md:text-7xl"
            style={{ fontFamily: '"Playfair Display",serif', fontWeight: 600, letterSpacing: "-0.02em" }}
          >
            <span style={{ fontStyle: "italic", color: "#F5F5F0" }}>My</span>{" "}
            <span className="arctic-gradient-text">Portfolio</span>
          </h2>
        </motion.div>

        <div className="space-y-px">
          {projects.map((p, i) => {
            const ButtonInner = (
              <span className="inline-flex items-center gap-2 group/btn">
                View Project
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </span>
            );

            return (
              <motion.article
                key={p.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
                className="group relative overflow-hidden cinematic-ease"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(201,168,76,0.15)",
                  borderRadius: 16,
                  marginBottom: 16,
                  transition: "background 0.5s ease, border-color 0.4s ease",
                }}
                whileHover={{ scale: 1.01 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #14110a 0%, #111111 100%)";
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#111111";
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)";
                }}
              >
                <div className="relative p-8 md:p-14 overflow-hidden">
                  {/* big background number */}
                  <span
                    aria-hidden
                    className="absolute right-6 top-2 select-none pointer-events-none"
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: "clamp(80px, 14vw, 180px)",
                      fontWeight: 700,
                      color: "#F5F5F0",
                      opacity: 0.05,
                      letterSpacing: "-0.05em",
                      lineHeight: 1,
                    }}
                  >
                    {p.num}
                  </span>

                  {/* top-right socials */}
                  <div className="absolute top-6 right-6 flex gap-2 z-10">
                    <a
                      href="https://github.com/shreejansapkota24-sudo"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
                      style={{
                        border: "1px solid rgba(201,168,76,0.25)",
                        color: "#888880",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#C9A84C";
                        e.currentTarget.style.borderColor = "#C9A84C";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#888880";
                        e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)";
                      }}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/shreejan-sapkota-0449b023b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
                      style={{
                        border: "1px solid rgba(201,168,76,0.25)",
                        color: "#888880",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#C9A84C";
                        e.currentTarget.style.borderColor = "#C9A84C";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#888880";
                        e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)";
                      }}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="relative z-[2] max-w-3xl">
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.3em] mb-4"
                      style={{ color: "#C9A84C" }}
                    >
                      Project · {p.num}
                    </p>
                    <h3
                      className="mb-5"
                      style={{
                        fontFamily: '"Playfair Display",serif',
                        fontWeight: 600,
                        fontSize: "clamp(36px, 5vw, 64px)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                        color: "#F5F5F0",
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className="mb-7 max-w-2xl text-[14px] leading-relaxed"
                      style={{ color: "#888880" }}
                    >
                      {p.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono px-3 py-1 text-[10px] uppercase tracking-[0.18em] rounded-full"
                          style={{
                            color: "#C9A84C",
                            border: "1px solid rgba(201,168,76,0.3)",
                            background: "rgba(201,168,76,0.04)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {p.href ? (
                      p.internal ? (
                        <Link
                          to={p.href}
                          className="group/btn inline-flex items-center gap-2 px-7 py-3 font-mono text-[11px] uppercase tracking-[0.18em] rounded-full transition-all duration-300"
                          style={{
                            border: "1px solid #C9A84C",
                            color: "#C9A84C",
                            background: "transparent",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#C9A84C";
                            e.currentTarget.style.color = "#0A0A0A";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#C9A84C";
                          }}
                        >
                          {ButtonInner}
                        </Link>
                      ) : (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn inline-flex items-center gap-2 px-7 py-3 font-mono text-[11px] uppercase tracking-[0.18em] rounded-full"
                          style={{ border: "1px solid #C9A84C", color: "#C9A84C" }}
                        >
                          {ButtonInner}
                        </a>
                      )
                    ) : (
                      <span
                        className="inline-flex items-center gap-2 px-7 py-3 font-mono text-[11px] uppercase tracking-[0.18em] rounded-full opacity-60"
                        style={{ border: "1px dashed rgba(201,168,76,0.4)", color: "#888880" }}
                      >
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
