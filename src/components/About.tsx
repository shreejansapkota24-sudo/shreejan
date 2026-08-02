const highlights = [
  "Studying machine learning, deep learning, and applied data analysis",
  "Building and evaluating models with Python, NumPy, pandas, and scikit-learn",
  "Shipping AI-powered full-stack apps with React, TypeScript, and Supabase",
  "Working with LLMs, prompt engineering, and retrieval-augmented systems",
];

const facts = [
  { label: "Name", value: "Shreejan Sapkota" },
  { label: "Role", value: "AI Student" },
  { label: "Location", value: "Kathmandu, NP" },
  { label: "Status", value: "Available" },
  { label: "Focus", value: "Artificial Intelligence · Machine Learning · Full Stack", span: "col-span-2" },
];

const education = [
  {
    degree: "BCS (Hons)",
    institution: "IIMS College, Kathmandu",
    years: "2025 — 2029",
    status: "In Progress",
    active: true,
  },
  {
    degree: "Higher Secondary Education",
    institution: "Science Stream",
    years: "Completed",
    status: "Completed",
  },
];

const About = () => {
  return (
    <section id="about" className="px-6 md:px-16 py-28 md:py-36">
      <div className="max-w-[1320px] mx-auto">
        <span className="eyebrow fade-up">— About</span>

        <h2 className="mt-6 fade-up delay-1 leading-[0.95]" style={{ fontSize: "clamp(44px,7vw,96px)" }}>
          <span className="block">A JOURNEY INTO</span>
          <span
            className="block"
            style={{
              fontFamily: 'Georgia, "Playfair Display", serif',
              fontStyle: "italic", fontWeight: 400, textTransform: "lowercase",
              color: "transparent", WebkitTextStroke: "1px var(--white2)",
            }}
          >
            artificial intelligence.
          </span>
        </h2>

        <div className="mt-20 grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7 space-y-6">
            <p className="fade-up text-[15px] leading-[1.9]" style={{ color: "var(--white2)" }}>
              I'm Shreejan Sapkota, an AI-focused Computer Science student at IIMS College in Kathmandu,
              currently working through my BCS (Hons) — expected to graduate in 2029. I'm drawn to how
              machines learn: how models are trained, evaluated, and turned into products people actually
              use.
            </p>
            <p className="fade-up delay-1 text-[15px] leading-[1.9]" style={{ color: "var(--white2)" }}>
              My focus is on machine learning, deep learning, data analysis, and large language models.
              Alongside that, I build full-stack applications with React, TypeScript, and Supabase, so I can
              take an idea from dataset and model all the way to a working interface.
            </p>
            <p className="fade-up delay-2 text-[15px] leading-[1.9]" style={{ color: "var(--white2)" }}>
              Outside of class I run my own experiments, ship AI-powered tools, and explore how intelligent
              systems can solve practical problems. I'm open to internships and collaborations where I can
              keep learning by doing real work.
            </p>

            <ul className="mt-8 space-y-3">
              {highlights.map((h, i) => (
                <li
                  key={i}
                  className="fade-up flex items-start gap-4 py-3 transition-transform duration-300 hover:translate-x-2 cursor-default"
                  style={{ borderBottom: "1px solid var(--line)" }}
                >
                  <span className="font-mono-syne" style={{ color: "var(--accent)", minWidth: 28 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ color: "var(--white)" }}>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-2 gap-3">
              {facts.map((f, i) => (
                <div
                  key={f.label}
                  className={`fade-up delay-${(i % 4) + 1} p-6 sp-card transition-all duration-400 hover:border-[var(--accent)] hover:-translate-y-1 ${f.span ?? ""}`}
                >
                  <p className="font-mono-syne mb-2" style={{ color: "var(--white3)" }}>{f.label}</p>
                  <p className="font-display" style={{ fontSize: 18, color: "var(--white)" }}>{f.value}</p>
                </div>
              ))}
            </div>

            <div className="fade-up delay-2 p-7 sp-card">
              <p className="font-mono-syne mb-5" style={{ color: "var(--accent)" }}>— Education</p>
              <div className="space-y-5">
                {education.map((e) => (
                  <div key={e.degree} className="pl-4" style={{ borderLeft: `2px solid ${e.active ? "var(--accent)" : "var(--line2)"}` }}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display" style={{ fontSize: 16, color: "var(--white)" }}>{e.degree}</p>
                        <p className="text-[13px] mt-1" style={{ color: "var(--white2)" }}>{e.institution}</p>
                        <p className="font-mono-syne mt-1" style={{ color: "var(--white3)" }}>{e.years}</p>
                      </div>
                      <span
                        className="font-mono-syne px-2 py-1 whitespace-nowrap"
                        style={{
                          border: `1px solid ${e.active ? "var(--accent)" : "var(--line2)"}`,
                          color: e.active ? "var(--accent)" : "var(--white2)",
                          fontSize: 9,
                        }}
                      >
                        {e.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
