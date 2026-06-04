import { Sparkles, MessageSquare, Code2, BookOpen, PenTool, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const capabilities = [
  { icon: MessageSquare, label: "Ask anything", desc: "Open-ended conversation and answers." },
  { icon: PenTool, label: "Writing help", desc: "Drafts, edits, and clear summaries." },
  { icon: Code2, label: "Code & debug", desc: "Snippets, reviews, and explanations." },
  { icon: BookOpen, label: "Study help", desc: "Notes, breakdowns, and study guides." },
];

const easing = [0.16, 1, 0.3, 1] as const;

const AssistantHero = () => {
  return (
    <section id="cyber-saathi" className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Left: copy */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easing }}
          >
            <span className="eyebrow mb-6 inline-flex">AI Assistant</span>
            <h2
              className="text-4xl md:text-5xl mb-6"
              style={{ fontFamily: '"Playfair Display", serif', fontWeight: 500, letterSpacing: "-0.025em" }}
            >
              Meet{" "}
              <span style={{ fontStyle: "italic", color: "var(--sp-mid-dark)" }}>Cyber Saathi.</span>
            </h2>
            <p className="text-[15px] leading-relaxed mb-8" style={{ color: "var(--sp-mid-dark)" }}>
              A focused multipurpose AI assistant — chat, write, code, study, and brainstorm.
              Built as part of my portfolio to explore applied AI and product design.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link to="/cyberguard/cyber-saathi" className="btn-mono">
                <Sparkles className="w-3.5 h-3.5" />
                Start Chatting
              </Link>
              <a href="#portfolio" className="btn-ghost-mono">Learn more</a>
            </div>

            <div className="flex items-center gap-3 text-[12px]" style={{ color: "var(--sp-mid)" }}>
              <span className="relative inline-flex">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "var(--sp-charcoal)" }}
                />
                <span
                  className="absolute inset-0 w-2 h-2 rounded-full animate-ping"
                  style={{ background: "var(--sp-charcoal)", opacity: 0.4 }}
                />
              </span>
              Online · 7 free messages per day · No login required
            </div>
          </motion.div>

          {/* Right: product preview card */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: easing }}
          >
            <div className="sp-card overflow-hidden">
              {/* Window chrome */}
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{ borderBottom: "1px solid var(--sp-border)", background: "var(--sp-surface)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--sp-light)" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--sp-light)" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--sp-light)" }} />
                </div>
                <span className="font-mono-label" style={{ fontSize: 10 }}>
                  cyber-saathi · v1.0
                </span>
                <Link
                  to="/cyberguard/cyber-saathi"
                  className="inline-flex items-center gap-1 text-[11px]"
                  style={{ color: "var(--sp-charcoal)", fontFamily: "Inter, sans-serif" }}
                >
                  Open <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Chat preview */}
              <div className="p-6 md:p-8 space-y-4" style={{ background: "var(--sp-white)" }}>
                <div className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[11px]"
                    style={{ background: "var(--sp-surface-2)", color: "var(--sp-mid-dark)", fontFamily: "Inter,sans-serif", fontWeight: 600 }}
                  >
                    S
                  </div>
                  <div
                    className="px-4 py-3 rounded-2xl text-[13.5px] max-w-md"
                    style={{ background: "var(--sp-surface)", color: "var(--sp-charcoal)" }}
                  >
                    Explain what a primary key is in a database.
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div
                    className="px-4 py-3 rounded-2xl text-[13.5px] max-w-md"
                    style={{ background: "var(--sp-charcoal)", color: "var(--sp-white)" }}
                  >
                    A primary key uniquely identifies each row in a table. It must be unique and non-null —
                    think of it as the row's permanent ID.
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: "var(--sp-charcoal)" }}
                  >
                    <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--sp-white)" }} />
                  </div>
                </div>
              </div>

              {/* Capabilities grid */}
              <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderTop: "1px solid var(--sp-border)" }}>
                {capabilities.map((cap, i) => (
                  <div
                    key={cap.label}
                    className="p-5 transition-colors duration-300"
                    style={{
                      borderRight: i < capabilities.length - 1 ? "1px solid var(--sp-border)" : "none",
                      background: "var(--sp-white)",
                    }}
                  >
                    <cap.icon className="w-4 h-4 mb-3" style={{ color: "var(--sp-charcoal)" }} />
                    <p
                      className="text-[13px] mb-1"
                      style={{ color: "var(--sp-charcoal)", fontFamily: "Inter,sans-serif", fontWeight: 600 }}
                    >
                      {cap.label}
                    </p>
                    <p className="text-[11.5px] leading-snug" style={{ color: "var(--sp-mid)" }}>
                      {cap.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AssistantHero;
