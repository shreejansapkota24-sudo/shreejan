import { ReactNode } from "react";

export const GlassCard = ({ children, className = "", style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div
    className={`overflow-hidden ${className}`}
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(245,166,35,0.15)",
      borderRadius: 16,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      padding: 24,
      ...style,
    }}
  >
    {children}
  </div>
);

export const LiveDot = () => (
  <span className="relative inline-flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: "#22C55E" }} />
    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#22C55E" }} />
  </span>
);

export const Badge = ({ children, color = "gold" }: { children: ReactNode; color?: "gold" | "green" | "red" | "muted" }) => {
  const palette = {
    gold: { bg: "rgba(245,166,35,0.15)", border: "rgba(245,166,35,0.4)", color: "#F5A623" },
    green: { bg: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.4)", color: "#22C55E" },
    red: { bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.4)", color: "#EF4444" },
    muted: { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.15)", color: "#9CA3AF" },
  }[color];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] rounded-md font-semibold tracking-widest uppercase"
      style={{ background: palette.bg, border: `1px solid ${palette.border}`, color: palette.color, fontFamily: "'JetBrains Mono', monospace" }}
    >
      {children}
    </span>
  );
};

export const Skeleton = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <div
    className={`animate-pulse ${className}`}
    style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.08), rgba(255,255,255,0.04))", borderRadius: 8, ...style }}
  />
);

export const SectionHeading = ({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) => (
  <div className="mb-8 overflow-hidden">
    {eyebrow && (
      <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: "#F5A623", fontFamily: "'JetBrains Mono', monospace" }}>
        {eyebrow}
      </p>
    )}
    <h2 className="wc-display" style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1, color: "#F9FAFB", wordBreak: "break-word" }}>
      {title}
    </h2>
    {sub && <p className="mt-3 text-[15px]" style={{ color: "#9CA3AF", maxWidth: 720 }}>{sub}</p>}
  </div>
);
