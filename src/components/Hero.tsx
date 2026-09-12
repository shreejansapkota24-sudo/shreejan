const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center px-6 md:px-16 pt-40 pb-24 md:pt-48 md:pb-36"
    >
      <div className="max-w-[1100px] mx-auto w-full">
        <div className="fade-up inline-flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: "var(--bg3)", border: "1px solid var(--line2)" }}>
          <span className="h-1.5 w-1.5 rounded-full pulse-soft" style={{ background: "var(--accent)" }} />
          <span className="font-mono-syne" style={{ color: "var(--accent)" }}>Available for opportunities</span>
        </div>
        <span className="eyebrow fade-up delay-1 mt-7 block">AI &amp; Computer Science Student · Kathmandu, Nepal</span>

        <h1
          className="mt-5 fade-up delay-2 leading-[1.02] max-w-4xl"
          style={{ fontSize: "clamp(40px, 6.4vw, 84px)" }}
        >
          Shreejan <span style={{ color: "var(--accent)" }}>Sapkota</span>
        </h1>

        <p
          className="mt-7 fade-up delay-3 max-w-2xl text-[16px] leading-[1.85]"
          style={{ color: "var(--white2)" }}
        >
          Pursuing <span style={{ color: "var(--white)" }}>BCS (Hons) at IIMS College</span>, focused on
          artificial intelligence, machine learning, and building intelligent, production-ready software.
          I learn by training, testing, and shipping real models and tools.
        </p>

        <div className="mt-10 flex flex-wrap gap-3 fade-up delay-4">
          <a href="#portfolio" className="btn-primary">View Projects</a>
          <a href="#contact" className="btn-ghost">Get in Touch</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
