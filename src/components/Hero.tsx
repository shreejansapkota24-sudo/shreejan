const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-32 pb-16"
    >
      <div className="max-w-[1320px] mx-auto w-full relative">
        <span className="eyebrow fade-up">AI &amp; Computer Science Student · Kathmandu, Nepal</span>

        <h1 className="mt-8 leading-[0.92]" style={{ fontSize: "clamp(56px, 10vw, 160px)" }}>
          <span className="block fade-up delay-1" style={{ animation: "hero-slide-left 1s cubic-bezier(0.22,1,0.36,1) both", animationDelay: "0.2s" }}>SHREEJAN</span>
          <span className="block fade-up delay-2 text-outline cursor-pointer" style={{ animation: "hero-slide-right 1s cubic-bezier(0.22,1,0.36,1) both", animationDelay: "0.2s" }}>SAPKOTA.</span>
        </h1>

        <div className="mt-14 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <p className="fade-up delay-3 max-w-xl text-[15px] leading-[1.9]" style={{ color: "var(--white2)" }}>
              Pursuing <span style={{ color: "var(--white)" }}>BCS (Hons) at IIMS College</span> with a focus on{" "}
              <span style={{ color: "var(--accent)" }}>artificial intelligence</span>, machine learning, and building
              intelligent, production-ready software. I learn by training, testing, and shipping real models and tools.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 fade-up delay-4">
              <a href="#portfolio" className="btn-primary">View Projects →</a>
              <a href="#contact" className="btn-ghost">Get in Touch</a>
            </div>
          </div>

          <div className="md:col-span-5 flex md:justify-end">
            <div className="fade-up delay-4 flex flex-col items-start md:items-end gap-3">
              {["Open to Internships", "Open to Collaborations"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 px-3 py-1.5 font-mono-syne"
                  style={{ border: "1px solid var(--line2)", color: "var(--white2)", background: "var(--bg2)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full pulse-soft" style={{ background: "#22c55e" }} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:flex absolute bottom-[-40px] right-0 items-center gap-4 fade-up delay-5">
          <span
            className="font-mono-syne"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: "var(--white3)" }}
          >
            Scroll
          </span>
          <div className="w-px h-20 scroll-pulse" style={{ background: "var(--accent)" }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
