import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Terminal,
  Sparkles,
  Shield,
  Wrench,
  Brain,
  MessageSquare,
  Lock,
  Bug,
  Network,
  type LucideIcon,
} from "lucide-react";

type Skill = { name: string; devicon?: string; lucide?: LucideIcon };
type Category = { label: string; icon: LucideIcon; items: Skill[] };

const categories: Category[] = [
  {
    label: "Programming Languages",
    icon: Terminal,
    items: [
      { name: "Python", devicon: "devicon-python-plain colored" },
      { name: "Java", devicon: "devicon-java-plain colored" },
      { name: "JavaScript", devicon: "devicon-javascript-plain colored" },
      { name: "TypeScript", devicon: "devicon-typescript-plain colored" },
      { name: "C", devicon: "devicon-c-plain colored" },
      { name: "C++", devicon: "devicon-cplusplus-plain colored" },
    ],
  },
  {
    label: "Frontend",
    icon: Code2,
    items: [
      { name: "React", devicon: "devicon-react-original colored" },
      { name: "Tailwind CSS", devicon: "devicon-tailwindcss-plain colored" },
      { name: "HTML5", devicon: "devicon-html5-plain colored" },
      { name: "CSS3", devicon: "devicon-css3-plain colored" },
      { name: "Next.js", devicon: "devicon-nextjs-plain" },
    ],
  },
  {
    label: "Backend",
    icon: Server,
    items: [
      { name: "Node.js", devicon: "devicon-nodejs-plain colored" },
      { name: "Express", devicon: "devicon-express-original" },
      { name: "REST APIs", lucide: Network },
    ],
  },
  {
    label: "Databases",
    icon: Database,
    items: [
      { name: "MySQL", devicon: "devicon-mysql-plain colored" },
      { name: "PostgreSQL", devicon: "devicon-postgresql-plain colored" },
      { name: "MongoDB", devicon: "devicon-mongodb-plain colored" },
    ],
  },
  {
    label: "Tools & Platforms",
    icon: Wrench,
    items: [
      { name: "Git", devicon: "devicon-git-plain colored" },
      { name: "GitHub", devicon: "devicon-github-original" },
      { name: "VS Code", devicon: "devicon-vscode-plain colored" },
      { name: "Linux", devicon: "devicon-linux-plain" },
      { name: "Docker", devicon: "devicon-docker-plain colored" },
    ],
  },
  {
    label: "AI & Emerging",
    icon: Sparkles,
    items: [
      { name: "OpenAI API", lucide: Brain },
      { name: "Prompt Engineering", lucide: MessageSquare },
      { name: "Applied AI Basics", lucide: Sparkles },
    ],
  },
  {
    label: "Cybersecurity Foundations",
    icon: Shield,
    items: [
      { name: "Web Security Fundamentals", lucide: Lock },
      { name: "Ethical Hacking Basics", lucide: Bug },
    ],
  },
];

const softSkills = [
  "Problem solving",
  "Communication",
  "Continuous learning",
  "Adaptability",
  "Teamwork",
  "Attention to detail",
];

const Skills = () => (
  <section id="skills" className="py-28 md:py-36 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="mb-16 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <span className="eyebrow mb-6 inline-flex">Skills</span>
        <h2
          className="text-4xl md:text-6xl mb-6"
          style={{ fontFamily: '"Playfair Display", serif', fontWeight: 500, letterSpacing: "-0.025em" }}
        >
          A focused toolkit for{" "}
          <span style={{ fontStyle: "italic", color: "var(--sp-mid-dark)" }}>building and learning.</span>
        </h2>
        <p className="text-[15px]" style={{ color: "var(--sp-mid)" }}>
          Organized by category — refined through study, personal projects, and continuous practice.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="sp-card p-7"
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="p-2 rounded-md"
                style={{ background: "var(--sp-surface-2)", border: "1px solid var(--sp-border)" }}
              >
                <cat.icon className="w-4 h-4" style={{ color: "var(--sp-charcoal)" }} />
              </div>
              <h3
                className="text-base"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 600,
                  color: "var(--sp-charcoal)",
                  letterSpacing: "-0.005em",
                }}
              >
                {cat.label}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => {
                const LucideIco = item.lucide;
                return (
                  <span
                    key={item.name}
                    className="inline-flex items-center px-3 py-1.5 text-[12px] rounded-full transition-all duration-300"
                    style={{
                      background: "var(--sp-surface)",
                      border: "1px solid var(--sp-border)",
                      color: "var(--sp-charcoal)",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {item.devicon ? (
                      <i
                        className={item.devicon}
                        style={{ fontSize: 16, verticalAlign: "middle", marginRight: 6 }}
                        aria-hidden="true"
                      />
                    ) : LucideIco ? (
                      <LucideIco
                        size={14}
                        style={{ marginRight: 6, color: "var(--sp-mid-dark)" }}
                        aria-hidden="true"
                      />
                    ) : null}
                    {item.name}
                  </span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-10 sp-card p-7"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono-label mb-4">Soft Skills</p>
        <div className="flex flex-wrap gap-2">
          {softSkills.map((s) => (
            <span
              key={s}
              className="px-3 py-1.5 text-[12px] rounded-full"
              style={{
                background: "var(--sp-white)",
                border: "1px solid var(--sp-border)",
                color: "var(--sp-mid-dark)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Skills;
