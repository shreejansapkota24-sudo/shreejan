import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Terminal,
  Sparkles,
  Shield,
  Wrench,
  Zap,
} from "lucide-react";

const categories = [
  {
    label: "Frontend",
    icon: Code2,
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "Tailwind CSS"],
    featured: ["React.js", "Tailwind CSS"],
  },
  {
    label: "Backend",
    icon: Server,
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    label: "Databases",
    icon: Database,
    items: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    label: "Languages",
    icon: Terminal,
    items: ["C", "C++", "Python", "Java", "JavaScript", "TypeScript"],
  },
  {
    label: "AI & Emerging",
    icon: Sparkles,
    items: ["OpenAI API", "Artificial Intelligence", "Prompt Engineering"],
  },
  {
    label: "Cybersecurity",
    icon: Shield,
    items: ["Web Security Fundamentals", "Ethical Hacking Basics"],
  },
  {
    label: "Tools & Platforms",
    icon: Wrench,
    items: ["Git", "GitHub", "VS Code", "Linux", "Docker"],
  },
];

const Skills = () => (
  <section id="skills" className="py-32 px-6 relative overflow-hidden arctic-noise">
    <div className="absolute inset-0 -z-10">
      <div className="aurora-blob" style={{ top: "10%", left: "5%" }} />
      <div className="aurora-blob alt" style={{ bottom: "10%", right: "5%", animationDelay: "-9s" }} />
    </div>

    <div className="max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 glass border-glow font-mono text-[10px] uppercase tracking-[0.3em] mb-6"
          style={{ color: "#FFD56A", borderRadius: 999 }}
        >
          <Zap className="w-3 h-3" />
          Technical Expertise
        </span>
        <h2
          className="text-5xl md:text-7xl text-foreground"
          style={{
            fontFamily: '"Playfair Display","Cormorant Garamond",serif',
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ fontStyle: "italic", color: "#FFFFFF" }}>Skills</span>{" "}
          <span className="arctic-gradient-text">& Technologies</span>
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-[14px]" style={{ color: "#A1A1AA" }}>
          A focused stack across full-stack development, AI, and cybersecurity — refined through study, projects, and continuous learning.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="group relative p-8 rounded-3xl overflow-hidden cinematic-ease"
            style={{
              background: "rgba(17,17,17,0.6)",
              backdropFilter: "blur(20px) saturate(140%)",
              WebkitBackdropFilter: "blur(20px) saturate(140%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* gold glow on hover */}
            <div
              className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background:
                  "radial-gradient(600px circle at 50% 0%, rgba(245,185,66,0.18), transparent 60%)",
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(245,185,66,0.5), transparent)" }} />

            <div className="relative flex items-center gap-3 mb-6">
              <div
                className="p-2.5 rounded-xl"
                style={{
                  background: "rgba(245,185,66,0.08)",
                  border: "1px solid rgba(245,185,66,0.25)",
                  boxShadow: "0 0 24px -8px rgba(245,185,66,0.45)",
                }}
              >
                <cat.icon className="w-4 h-4" style={{ color: "#F5B942" }} />
              </div>
              <h3
                className="text-xl"
                style={{
                  fontFamily: '"Playfair Display",serif',
                  fontWeight: 600,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                }}
              >
                {cat.label}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 relative">
              {cat.items.map((item) => {
                const isFeatured = cat.featured?.includes(item);
                return (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-[11px] rounded-full font-mono tracking-[0.05em] transition-all duration-300"
                    style={
                      isFeatured
                        ? {
                            background: "linear-gradient(135deg, rgba(245,185,66,0.18), rgba(255,213,106,0.10))",
                            border: "1px solid rgba(245,185,66,0.45)",
                            color: "#FFD56A",
                            boxShadow: "0 0 18px -4px rgba(245,185,66,0.5)",
                          }
                        : {
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#A1A1AA",
                          }
                    }
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
