const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-24 pb-16"
    >
      <div className="max-w-[1320px] mx-auto w-full relative">
        <span className="eyebrow fade-up">Computer Science Student · Kathmandu, Nepal</span>

        <h1 className="mt-8 leading-[0.92]" style={{ fontSize: "clamp(64px, 13vw, 200px)" }}>
          <span className="block fade-up delay-1">SHREEJAN</span>
          <span className="block fade-up delay-2 text-outline cursor-pointer">SAPKOTA.</span>
        </h1>

        <div className="mt-14 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <p className="fade-up delay-3 max-w-xl text-[15px] leading-[1.9]" style={{ color: "var(--white2)" }}>
              Pursuing <span style={{ color: "var(--white)" }}>BCS (Hons) at IIMS</span> — building strong
              foundations in programming, databases, and modern web development. Growing focus on{" "}
              <span style={{ color: "var(--accent)" }}>Data Science</span> and applied AI.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 fade-up delay-4">
              <a href="#portfolio" className="btn-primary">View Projects →</a>
              <a href="#contact" className="btn-ghost">Get in Touch</a>
            </div>
          </div>

          <div className="md:col-span-5 flex md:justify-end">
            <div className="fade-up delay-4 flex items-center gap-4">
              <span
                className="font-mono-syne"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: "var(--white3)" }}
              >
                Scroll
              </span>
              <div className="w-px h-20 scroll-pulse" style={{ background: "var(--accent)" }} />
            </div>
          </div>
        </div>

        {/* Graduation badge */}
        <div className="hidden lg:block absolute top-0 right-0 text-right fade-up delay-3">
          <div className="font-display" style={{ fontSize: 56, color: "var(--accent)" }}>2029</div>
          <div className="font-mono-syne mt-1" style={{ color: "var(--white2)" }}>Expected graduation</div>
          <div className="font-mono-syne" style={{ color: "var(--white3)" }}>BCS Hons — IIMS</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
