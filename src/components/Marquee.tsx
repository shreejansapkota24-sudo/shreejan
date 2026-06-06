const ITEMS = [
  "SHREEJAN SAPKOTA",
  "DATA SCIENCE",
  "FULL STACK DEV",
  "CYBERSECURITY",
  "ASPIRING ENGINEER",
  "KATHMANDU · NEPAL",
];

const Marquee = () => {
  const row = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div
      className="marquee-wrap overflow-hidden py-7"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="marquee-track font-display" style={{ fontSize: "clamp(24px,4vw,48px)" }}>
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-14 transition-all duration-300 hover:text-accent-c hover:scale-[1.04]"
            style={{
              color: i % 2 === 0 ? "var(--white)" : "transparent",
              WebkitTextStroke: i % 2 === 0 ? "0" : "1px var(--line2)",
            }}
          >
            {t}
            <span style={{ color: "var(--accent)" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
