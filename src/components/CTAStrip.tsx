const CTAStrip = () => {
  return (
    <section className="px-6 md:px-16 py-20 md:py-28" style={{ background: "var(--bg2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="max-w-[1320px] mx-auto grid md:grid-cols-2 gap-10 items-center">
        <h2 className="fade-up leading-[0.95]" style={{ fontSize: "clamp(40px,6vw,80px)" }}>
          <span className="block">READY TO</span>
          <span
            className="block"
            style={{
              fontFamily: 'Georgia, serif', fontStyle: "italic", fontWeight: 400,
              textTransform: "lowercase", color: "transparent",
              WebkitTextStroke: "1px var(--accent)",
            }}
          >
            work together?
          </span>
        </h2>
        <div className="fade-up delay-1 flex flex-col md:items-end gap-5">
          <span className="inline-flex items-center gap-3 px-4 py-2" style={{ border: "1px solid var(--line2)", color: "var(--white2)" }}>
            <span className="w-2 h-2 rounded-full pulse-soft" style={{ background: "#22c55e" }} />
            <span className="font-mono-syne">Available for opportunities</span>
          </span>
          <a href="#contact" className="btn-primary">Drop me a line →</a>
        </div>
      </div>
    </section>
  );
};

export default CTAStrip;
