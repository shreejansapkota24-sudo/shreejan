const highlights = [
  "Building technical foundations in programming and databases",
  "Practicing modern web development with React and Tailwind",
  "Exploring Data Science as a long-term career path",
  "Strengthening analytical and problem-solving skills through projects",
];

const facts: { label: string; value: string; span?: string }[] = [
  { label: "Name", value: "Shreejan Sapkota" },
  { label: "Role", value: "CS Student" },
  { label: "Location", value: "Kathmandu, NP" },
  { label: "Education", value: "BCS (Hons)" },
  { label: "College", value: "IIMS College" },
  { label: "Graduation", value: "Expected 2029" },
  { label: "Focus", value: "Data Science · Web Development · AI", span: "col-span-2" },
];

const About = () => {
  return (
    <section id="about" className="px-6 md:px-16 py-28 md:py-36">
      <div className="max-w-[1320px] mx-auto">
        <span className="eyebrow fade-up">— About</span>

        <h2 className="mt-6 fade-up delay-1 leading-[0.95]" style={{ fontSize: "clamp(44px,7vw,96px)" }}>
          <span className="block">BUILDING A PATH INTO</span>
          <span
            className="block"
            style={{
              fontFamily: 'Georgia, "Playfair Display", serif',
              fontStyle: "italic",
              fontWeight: 400,
              textTransform: "lowercase",
              color: "transparent",
              WebkitTextStroke: "1px var(--white2)",
            }}
          >
            data &amp; software.
          </span>
        </h2>

        <div className="mt-20 grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7 space-y-6">
            <p className="fade-up text-[15px] leading-[1.9]" style={{ color: "var(--white2)" }}>
              I'm Shreejan Sapkota, a Computer Science student at IIMS College in Kathmandu, currently
              working through my BCS (Hons) — expected to graduate in 2029. My focus is on building strong
              fundamentals in programming, databases, and modern web development.
            </p>
            <p className="fade-up delay-1 text-[15px] leading-[1.9]" style={{ color: "var(--white2)" }}>
              I gravitate toward problems that mix logic, data, and design. I've been steadily building
              full-stack projects with React and TypeScript, and I'm sharpening my Python and SQL toward a
              long-term path in Data Science and applied AI.
            </p>
            <p className="fade-up delay-2 text-[15px] leading-[1.9]" style={{ color: "var(--white2)" }}>
              Outside of class I explore cybersecurity, write tools that scratch my own itch, and try to ship
              things end-to-end — not just demos. I'm always open to learning from people further ahead.
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

          <div className="lg:col-span-5">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
