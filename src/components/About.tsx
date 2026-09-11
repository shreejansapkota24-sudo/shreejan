const highlights = [
  "Studying machine learning, deep learning, and applied data analysis",
  "Building and evaluating models with Python, NumPy, pandas, and scikit-learn",
  "Shipping AI-powered full-stack apps with React, TypeScript, and Supabase",
  "Working with LLMs, prompt engineering, and retrieval-augmented systems",
];

const facts = [
  { label: "Role", value: "AI & CS Student" },
  { label: "Location", value: "Kathmandu, Nepal" },
  { label: "Degree", value: "BCS (Hons), IIMS College" },
  { label: "Graduating", value: "2029" },
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
    <section id="about" className="px-6 md:px-16 py-24 md:py-28" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="max-w-[1100px] mx-auto">
        <span className="eyebrow fade-up">About</span>
        <h2 className="mt-4 fade-up delay-1" style={{ fontSize: "clamp(30px,4vw,44px)" }}>
          A journey into artificial intelligence
        </h2>

        <div className="mt-14 grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7 space-y-5">
            <p className="fade-up text-[15px] leading-[1.85]" style={{ color: "var(--white2)" }}>
              I'm Shreejan Sapkota, an AI-focused Computer Science student at IIMS College in Kathmandu,
              currently working through my BCS (Hons) — expected to graduate in 2029. I'm drawn to how
              machines learn: how models are trained, evaluated, and turned into products people actually
              use.
            </p>
            <p className="fade-up delay-1 text-[15px] leading-[1.85]" style={{ color: "var(--white2)" }}>
              My focus is on machine learning, deep learning, data analysis, and large language models.
              Alongside that, I build full-stack applications with React, TypeScript, and Supabase, so I can
              take an idea from dataset and model all the way to a working interface.
            </p>
            <p className="fade-up delay-2 text-[15px] leading-[1.85]" style={{ color: "var(--white2)" }}>
              Outside of class I run my own experiments, ship AI-powered tools, and explore how intelligent
              systems can solve practical problems. I'm open to internships and collaborations where I can
              keep learning by doing real work.
            </p>

            <ul className="mt-8 space-y-1">
              {highlights.map((h, i) => (
                <li
                  key={i}
                  className="fade-up flex items-start gap-4 py-3"
                  style={{ borderTop: "1px solid var(--line)" }}
                >
                  <span className="font-mono-syne pt-1" style={{ color: "var(--white3)", minWidth: 26 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px]" style={{ color: "var(--white)" }}>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <dl className="fade-up sp-card p-6 grid grid-cols-1 gap-4">
              {facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono-syne" style={{ color: "var(--white3)" }}>{f.label}</dt>
                  <dd className="text-[14px] text-right" style={{ color: "var(--white)" }}>{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="fade-up delay-1 sp-card p-6">
              <p className="font-mono-syne mb-5" style={{ color: "var(--white3)" }}>Education</p>
              <div className="space-y-5">
                {education.map((e) => (
                  <div key={e.degree} className="pl-4" style={{ borderLeft: `2px solid ${e.active ? "var(--accent)" : "var(--line2)"}` }}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display" style={{ fontSize: 15, color: "var(--white)" }}>{e.degree}</p>
                        <p className="text-[13px] mt-1" style={{ color: "var(--white2)" }}>{e.institution}</p>
                        <p className="font-mono-syne mt-1" style={{ color: "var(--white3)" }}>{e.years}</p>
                      </div>
                      <span
                        className="font-mono-syne px-2 py-1 whitespace-nowrap rounded"
                        style={{
                          border: "1px solid var(--line2)",
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

            <div className="fade-up delay-2 sp-card p-6">
              <p className="font-mono-syne mb-3" style={{ color: "var(--white3)" }}>Currently</p>
              <p className="text-[14px]" style={{ color: "var(--white)" }}>
                Open to internships and collaborations in AI, machine learning, and full-stack development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
