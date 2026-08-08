import { useMemo } from "react";
import { Brain, Sparkles, Cpu, Bot, Binary, Network, CircuitBoard, Atom } from "lucide-react";

const ICONS = [Brain, Sparkles, Cpu, Bot, Binary, Network, CircuitBoard, Atom];

const ORBS = [
  { size: 420, left: "-6%", top: "6%", color: "rgba(139,123,249,0.30)", dur: 18 },
  { size: 340, left: "72%", top: "2%", color: "rgba(56,214,242,0.20)", dur: 24 },
  { size: 380, left: "28%", top: "62%", color: "rgba(124,141,255,0.22)", dur: 21 },
  { size: 260, left: "86%", top: "58%", color: "rgba(139,123,249,0.20)", dur: 27 },
];

/** Fixed, non-interactive ambient layer: soft drifting orbs + floating AI glyphs. */
const AIField = () => {
  const glyphs = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        Icon: ICONS[i % ICONS.length],
        left: `${6 + ((i * 8.3) % 88)}%`,
        top: `${8 + ((i * 17) % 78)}%`,
        size: 26 + ((i * 7) % 20),
        dur: 16 + ((i * 3) % 14),
        delay: (i * 1.7) % 12,
      })),
    [],
  );

  return (
    <div className="ai-field" aria-hidden>
      {ORBS.map((o, i) => (
        <span
          key={`orb-${i}`}
          className="ai-orb"
          style={{
            width: o.size,
            height: o.size,
            left: o.left,
            top: o.top,
            background: o.color,
            animationDuration: `${o.dur}s`,
          }}
        />
      ))}

      {glyphs.map(({ Icon, left, top, size, dur, delay }, i) => (
        <span
          key={`glyph-${i}`}
          className="ai-glyph"
          style={{
            left,
            top,
            width: size + 16,
            height: size + 16,
            animationDuration: `${dur}s`,
            animationDelay: `${delay}s`,
          }}
        >
          <Icon style={{ width: size * 0.55, height: size * 0.55 }} strokeWidth={1.4} />
        </span>
      ))}
    </div>
  );
};

export default AIField;
