import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const resize = () => { c.width = c.offsetWidth * devicePixelRatio; c.height = c.offsetHeight * devicePixelRatio; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 1.6 + 0.4, vy: -Math.random() * 0.3 - 0.05,
      a: Math.random() * 0.6 + 0.2, gold: Math.random() > 0.4,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      // light rays
      const grad = ctx.createRadialGradient(c.width / 2, c.height, 0, c.width / 2, c.height, c.width * 0.7);
      grad.addColorStop(0, "rgba(245,166,35,0.08)");
      grad.addColorStop(1, "rgba(245,166,35,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, c.width, c.height);
      particles.forEach((p) => {
        p.y += p.vy;
        if (p.y < -10) { p.y = c.height + 10; p.x = Math.random() * c.width; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? `rgba(245,166,35,${p.a})` : `rgba(255,255,255,${p.a * 0.7})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden style={{ pointerEvents: "none" }} />;
}
