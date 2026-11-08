import { useEffect, useRef } from "react";

const COLORS = ["#ffb703", "#fb8500", "#ff4d6d", "#f72585", "#4cc9f0", "#90e0ef", "#ffd166", "#06d6a0"];

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Occasional realistic fireworks + crackers on a transparent canvas. */
export const Fireworks = ({ intense = false }: { intense?: boolean }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (reduced()) return;
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; size: number; trail?: boolean; tx?: number; ty?: number };
    let parts: P[] = [];
    let rockets: P[] = [];
    let raf = 0;
    let last = 0;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const burst = (x: number, y: number, small = false) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const color2 = COLORS[Math.floor(Math.random() * COLORS.length)];
      const n = small ? 28 : 70 + Math.random() * 40;
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n;
        const s = (small ? 1.5 : 2.5) + Math.random() * (small ? 2 : 3.5);
        parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: 50 + Math.random() * 40, color: Math.random() > 0.3 ? color : color2, size: small ? 1.4 : 2 });
      }
    };
    const launch = () => {
      const x = c.width * (0.15 + Math.random() * 0.7);
      const ty = c.height * (0.12 + Math.random() * 0.3);
      rockets.push({ x, y: c.height, vx: (Math.random() - 0.5) * 1.5, vy: -(8 + Math.random() * 3), life: 0, max: 200, color: "#ffd166", size: 2, ty, tx: x });
    };
    const cracker = () => {
      // pataka on the ground — quick sparkly pops near bottom
      const x = c.width * (0.05 + Math.random() * 0.9);
      const y = c.height - 20 - Math.random() * 40;
      for (let k = 0; k < 3; k++) setTimeout(() => burst(x + (Math.random() - 0.5) * 30, y, true), k * 120);
    };

    const loop = (t: number) => {
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.globalCompositeOperation = "lighter";
      const gap = intense ? 450 : 3800;
      if (t - last > gap + Math.random() * gap) {
        last = t;
        Math.random() > 0.3 ? launch() : cracker();
      }
      rockets = rockets.filter((r) => {
        r.x += r.vx; r.y += r.vy; r.vy += 0.08;
        ctx.fillStyle = r.color;
        ctx.beginPath(); ctx.arc(r.x, r.y, 2, 0, 7); ctx.fill();
        parts.push({ x: r.x, y: r.y, vx: (Math.random() - 0.5) * 0.4, vy: 0.5, life: 0, max: 18, color: "#ffb703", size: 1.2 });
        if (r.y <= (r.ty ?? 0) || r.vy >= 0) { burst(r.x, r.y); return false; }
        return true;
      });
      parts = parts.filter((p) => {
        p.life++; p.x += p.vx; p.y += p.vy; p.vx *= 0.97; p.vy = p.vy * 0.97 + 0.04;
        const a = 1 - p.life / p.max;
        if (a <= 0) return false;
        ctx.globalAlpha = a;
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (0.5 + a), 0, 7); ctx.fill();
        return true;
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [intense]);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0" style={{ zIndex: intense ? 1001 : 5 }} />;
};

export const Diyo = ({ size = 34 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden className="diyo">
    <ellipse className="diyo-flame" cx="20" cy="13" rx="4" ry="8" fill="#ffb703" />
    <ellipse cx="20" cy="15" rx="2" ry="4" fill="#fff3b0" />
    <path d="M4 24 Q20 40 36 24 Z" fill="#c2410c" />
    <path d="M4 24 H36" stroke="#fb8500" strokeWidth="2" />
  </svg>
);

const Marigold = ({ color }: { color: string }) => (
  <span aria-hidden style={{ display: "inline-block", width: 16, height: 16, borderRadius: "50%", background: `radial-gradient(circle, #fff3b0 0 18%, ${color} 22% 100%)`, boxShadow: `0 0 0 2px ${color}55`, margin: "0 -2px" }} />
);

/** Marigold garland + diyas + floating sparkles. Non-blocking. */
const TiharFestive = () => {
  const flowers = Array.from({ length: 60 }, (_, i) => (i % 3 === 0 ? "#f97316" : "#fbbf24"));
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed top-0 left-0 right-0 overflow-hidden flex justify-center" style={{ zIndex: 6, height: 22 }}>
        <div className="flex whitespace-nowrap">{flowers.map((c, i) => <Marigold key={i} color={c} />)}</div>
      </div>
      <div aria-hidden className="pointer-events-none fixed bottom-2 left-0 right-0 flex justify-between px-3 md:px-8" style={{ zIndex: 6 }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className={i % 2 ? "hidden md:inline-block" : "inline-block"} style={{ animationDelay: `${i * 0.3}s` }}><Diyo size={30} /></span>
        ))}
      </div>
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 4 }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="tihar-spark" style={{ left: `${(i * 7.3) % 100}%`, animationDelay: `${i * 0.9}s`, background: COLORS[i % COLORS.length] }} />
        ))}
      </div>
      <Fireworks />
    </>
  );
};

export default TiharFestive;
