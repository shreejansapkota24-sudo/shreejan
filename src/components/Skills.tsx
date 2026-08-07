import { Brain, Sparkles, Network, Eye, MessageSquare, LineChart, Database, Bot, Sigma, type LucideIcon } from "lucide-react";

type Skill = { name: string; icon?: string; lucide?: LucideIcon };

const categories: { name: string; items: Skill[] }[] = [
  {
    name: "Languages",
    items: [
      { name: "Python", icon: "devicon-python-plain colored" },
      { name: "Java", icon: "devicon-java-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "TypeScript", icon: "devicon-typescript-plain colored" },
      { name: "C", icon: "devicon-c-plain" },
      { name: "SQL", icon: "devicon-mysql-plain colored" },
    ],
  },
  {
    name: "AI & Machine Learning",
    items: [
      { name: "Machine Learning", lucide: Brain },
      { name: "Deep Learning", lucide: Network },
      { name: "Neural Networks", lucide: Network },
      { name: "Computer Vision", lucide: Eye },
      { name: "NLP", lucide: MessageSquare },
      { name: "Model Evaluation", lucide: LineChart },
    ],
  },
  {
    name: "ML Libraries",
    items: [
      { name: "NumPy", icon: "devicon-numpy-original colored" },
      { name: "pandas", icon: "devicon-pandas-original" },
      { name: "scikit-learn", lucide: Brain },
      { name: "TensorFlow", icon: "devicon-tensorflow-original colored" },
      { name: "PyTorch", icon: "devicon-pytorch-original colored" },
      { name: "Matplotlib", icon: "devicon-matplotlib-plain colored" },
    ],
  },
  {
    name: "LLMs & Generative AI",
    items: [
      { name: "OpenAI API", lucide: Sparkles },
      { name: "Prompt Engineering", lucide: Brain },
      { name: "RAG Pipelines", lucide: Database },
      { name: "Embeddings", lucide: Sparkles },
      { name: "AI Agents", lucide: Bot },
    ],
  },
  {
    name: "Data & Analytics",
    items: [
      { name: "Data Analysis", lucide: LineChart },
      { name: "Data Cleaning", lucide: Database },
      { name: "Jupyter", icon: "devicon-jupyter-plain colored" },
      { name: "Visualization", lucide: LineChart },
      { name: "Statistics", lucide: Sigma },
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
    name: "Backend & Tools",
    items: [
      { name: "Node.js", icon: "devicon-nodejs-plain colored" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
      { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
      { name: "Git", icon: "devicon-git-plain colored" },
      { name: "Docker", icon: "devicon-docker-plain colored" },
      { name: "Linux", icon: "devicon-linux-plain" },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="px-6 md:px-16 py-28 md:py-36">
      <div className="max-w-[1320px] mx-auto">
        <span className="eyebrow fade-up">— Skills</span>
        <h2 className="mt-6 fade-up delay-1 leading-[0.95]" style={{ fontSize: "clamp(44px,7vw,96px)" }}>
          <span className="block">AN AI-FIRST</span>
          <span
            className="block"
            style={{
              fontWeight: 300, textTransform: "lowercase",
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
            }}
          >
            toolkit.
          </span>
        </h2>

        <div className="mt-20 divide-y" style={{ borderColor: "var(--line)" }}>
          {categories.map((c, idx) => (
            <div
              key={c.name}
              className={`${idx % 2 === 0 ? "reveal-left" : "reveal-right"} group grid md:grid-cols-[220px_1fr] gap-6 py-8 transition-all duration-500 hover:pl-3`}
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
                      <Sparkles size={12} className="text-[var(--white3)]" />
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
