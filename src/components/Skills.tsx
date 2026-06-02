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
  Brain,
  MessageSquare,
  Lock,
  Bug,
  Network,
  type LucideIcon,
} from "lucide-react";

type Skill = {
  name: string;
  devicon?: string;
  lucide?: LucideIcon;
};

type Category = {
  label: string;
  icon: LucideIcon;
  items: Skill[];
  featured?: string[];
};

const categories: Category[] = [
  {
    label: "Frontend",
    icon: Code2,
    items: [
      { name: "HTML5", devicon: "devicon-html5-plain colored" },
      { name: "CSS3", devicon: "devicon-css3-plain colored" },
      { name: "JavaScript", devicon: "devicon-javascript-plain colored" },
      { name: "TypeScript", devicon: "devicon-typescript-plain colored" },
      { name: "React.js", devicon: "devicon-react-original colored" },
      { name: "Next.js", devicon: "devicon-nextjs-plain" },
      { name: "Tailwind CSS", devicon: "devicon-tailwindcss-plain colored" },
    ],
    featured: ["React.js", "Tailwind CSS"],
  },
  {
    label: "Backend",
    icon: Server,
    items: [
      { name: "Node.js", devicon: "devicon-nodejs-plain colored" },
      { name: "Express.js", devicon: "devicon-express-original" },
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
    label: "Languages",
    icon: Terminal,
    items: [
      { name: "C", devicon: "devicon-c-plain colored" },
      { name: "C++", devicon: "devicon-cplusplus-plain colored" },
      { name: "Python", devicon: "devicon-python-plain colored" },
      { name: "Java", devicon: "devicon-java-plain colored" },
      { name: "JavaScript", devicon: "devicon-javascript-plain colored" },
      { name: "TypeScript", devicon: "devicon-typescript-plain colored" },
    ],
  },
  {
    label: "AI & Emerging",
    icon: Sparkles,
    items: [
      { name: "OpenAI API", lucide: Brain },
      { name: "Artificial Intelligence", lucide: Sparkles },
      { name: "Prompt Engineering", lucide: MessageSquare },
    ],
  },
  {
    label: "Cybersecurity",
    icon: Shield,
    items: [
      { name: "Web Security Fundamentals", lucide: Lock },
      { name: "Ethical Hacking Basics", lucide: Bug },
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
          style={{ color: "#E8D5A3", borderRadius: 999 }}
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
            <div
              className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background:
                  "radial-gradient(600px circle at 50% 0%, rgba(201,168,76,0.18), transparent 60%)",
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)" }} />

            <div className="relative flex items-center gap-3 mb-6">
              <div
                className="p-2.5 rounded-xl"
                style={{
                  background: "rgba(201,168,76,0.08)",
                  border: "1px solid rgba(201,168,76,0.25)",
                  boxShadow: "0 0 24px -8px rgba(201,168,76,0.45)",
                }}
              >
                <cat.icon className="w-4 h-4" style={{ color: "#C9A84C" }} />
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
                const isFeatured = cat.featured?.includes(item.name);
                const LucideIco = item.lucide;
                return (
                  <span
                    key={item.name}
                    className="inline-flex items-center px-3 py-1.5 text-[11px] rounded-full font-mono tracking-[0.05em] transition-all duration-300"
                    style={
                      isFeatured
                        ? {
                            background: "linear-gradient(135deg, rgba(201,168,76,0.18), rgba(232,213,163,0.10))",
                            border: "1px solid rgba(201,168,76,0.45)",
                            color: "#E8D5A3",
                            boxShadow: "0 0 18px -4px rgba(201,168,76,0.5)",
                          }
                        : {
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#A1A1AA",
                          }
                    }
                  >
                    {item.devicon ? (
                      <i
                        className={item.devicon}
                        style={{ fontSize: 18, verticalAlign: "middle", marginRight: 6 }}
                        aria-hidden="true"
                      />
                    ) : LucideIco ? (
                      <LucideIco
                        size={16}
                        style={{ marginRight: 6, color: "#C9A84C" }}
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
    </div>
  </section>
);

export default Skills;
