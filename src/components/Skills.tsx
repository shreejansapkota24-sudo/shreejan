import { Shield, ShieldAlert, Flag, Brain, Sparkles, Network, Code2, Search, type LucideIcon } from "lucide-react";

type Skill = { name: string; icon?: string; lucide?: LucideIcon };

const categories: { name: string; items: Skill[] }[] = [
  {
    name: "Languages",
    items: [
      { name: "Python", icon: "devicon-python-plain colored" },
      { name: "Java", icon: "devicon-java-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "C", icon: "devicon-c-plain" },
      { name: "C++", icon: "devicon-cplusplus-plain colored" },
      { name: "Bash", icon: "devicon-bash-plain" },
    ],
  },
  {
    name: "Cybersecurity",
    items: [
      { name: "Ethical Hacking", lucide: Shield },
      { name: "Network Security", lucide: Network },
      { name: "Web App Security", lucide: ShieldAlert },
      { name: "OWASP Top 10", lucide: Shield },
      { name: "CTF Challenges", lucide: Flag },
      { name: "Threat Analysis", lucide: Search },
    ],
  },
  {
    name: "Security Tools",
    items: [
      { name: "Linux / Kali", icon: "devicon-linux-plain" },
      { name: "Wireshark", lucide: Network },
      { name: "Nmap", lucide: Search },
      { name: "Burp Suite", lucide: ShieldAlert },
      { name: "Metasploit", lucide: Shield },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "React", icon: "devicon-react-original colored" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain colored" },
      { name: "HTML5", icon: "devicon-html5-plain colored" },
      { name: "CSS3", icon: "devicon-css3-plain colored" },
      { name: "Next.js", icon: "devicon-nextjs-plain" },
    ],
  },
  {
    name: "Backend & DB",
    items: [
      { name: "Node.js", icon: "devicon-nodejs-plain colored" },
      { name: "Express", icon: "devicon-express-original" },
      { name: "MySQL", icon: "devicon-mysql-plain colored" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
      { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
    ],
  },
  {
    name: "Tools & DevOps",
    items: [
      { name: "Git", icon: "devicon-git-plain colored" },
      { name: "GitHub", icon: "devicon-github-original" },
      { name: "Docker", icon: "devicon-docker-plain colored" },
      { name: "VS Code", icon: "devicon-vscode-plain colored" },
      { name: "REST APIs", lucide: Network },
    ],
  },
  {
    name: "AI & Research",
    items: [
      { name: "OpenAI API", lucide: Sparkles },
      { name: "Prompt Engineering", lucide: Brain },
      { name: "IOC Analysis", lucide: Search },
      { name: "Applied AI", lucide: Sparkles },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="px-6 md:px-16 py-28 md:py-36">
      <div className="max-w-[1320px] mx-auto">
        <span className="eyebrow fade-up">— Skills</span>
        <h2 className="mt-6 fade-up delay-1 leading-[0.95]" style={{ fontSize: "clamp(44px,7vw,96px)" }}>
          <span className="block">A SECURITY-FIRST</span>
          <span
            className="block"
            style={{
              fontFamily: 'Georgia, serif', fontStyle: "italic", fontWeight: 400,
              textTransform: "lowercase", color: "transparent",
              WebkitTextStroke: "1px var(--white2)",
            }}
          >
            toolkit.
          </span>
        </h2>

        <div className="mt-20 divide-y" style={{ borderColor: "var(--line)" }}>
          {categories.map((c, idx) => (
            <div
              key={c.name}
              className="fade-up group grid md:grid-cols-[220px_1fr] gap-6 py-8 transition-all duration-300 hover:pl-2"
              style={{ borderTop: idx === 0 ? "1px solid var(--line)" : undefined, borderBottom: "1px solid var(--line)" }}
            >
              <h3
                className="font-display text-xl transition-colors duration-300 group-hover:text-[var(--accent)]"
                style={{ color: "var(--white)" }}
              >
                {c.name}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {c.items.map((s) => (
                  <span key={s.name} className="stag">
                    {s.icon ? (
                      <i className={s.icon} style={{ fontSize: 16 }} />
                    ) : s.lucide ? (
                      <s.lucide size={14} className="text-[var(--accent)]" />
                    ) : (
                      <Code2 size={12} className="text-[var(--white3)]" />
                    )}
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
