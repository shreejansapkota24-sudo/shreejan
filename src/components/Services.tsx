const items = [
  {
    num: "01",
    title: "Internships",
    body: "Open to data, software, and research internships where I can learn and contribute meaningfully to a team.",
  },
  {
    num: "02",
    title: "Collaborations",
    body: "Interested in student project collaborations and small team experiences that stretch my technical abilities.",
  },
  {
    num: "03",
    title: "Open Source",
    body: "Happy to contribute to beginner-friendly open-source projects across the stack — web, AI, and tooling.",
  },
];

const Services = () => {
  return (
    <section id="services" className="px-6 md:px-16 py-28 md:py-36">
      <div className="max-w-[1320px] mx-auto">
        <span className="eyebrow fade-up">— Opportunities</span>
        <h2 className="mt-6 fade-up delay-1 leading-[0.95]" style={{ fontSize: "clamp(44px,7vw,96px)" }}>
          <span className="block">OPEN TO LEARNING &amp;</span>
          <span
            className="block"
            style={{
              fontFamily: 'Georgia, serif', fontStyle: "italic", fontWeight: 400,
              textTransform: "lowercase", color: "transparent",
              WebkitTextStroke: "1px var(--white2)",
            }}
          >
            working together.
          </span>
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <article
              key={it.num}
              className={`fade-up delay-${i + 1} group p-10 transition-all duration-500 hover:-translate-y-2`}
              style={{ background: "var(--bg2)", border: "1px solid var(--line)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg3)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg2)")}
            >
              <span className="font-mono-syne block mb-6" style={{ color: "var(--white3)" }}>{it.num} —</span>
              <h3 className="font-display text-2xl md:text-3xl transition-colors duration-300 group-hover:text-[var(--accent)]">
                {it.title}
              </h3>
              <p className="mt-5 text-[14px] leading-[1.85]" style={{ color: "var(--white2)" }}>
                {it.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
