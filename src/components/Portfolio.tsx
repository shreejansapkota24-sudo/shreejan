import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type Project = {
  title: string;
  subtitle: string;
  bg: string;
  href?: string;
  internal?: boolean;
};

const projects: Project[] = [
  {
    title: "CyberGuard",
    subtitle: "Cybersecurity Toolkit · URL & File Scanner · Threat Map",
    href: "/cyberguard",
    internal: true,
    bg: `radial-gradient(ellipse at 30% 20%, rgba(255,138,30,0.35), transparent 55%),
         radial-gradient(ellipse at 80% 80%, rgba(245,181,68,0.20), transparent 60%),
         linear-gradient(135deg, #1a0a02 0%, #2a1305 40%, #0A0A0A 100%)`,
  },
  {
    title: "Cyber Saathi",
    subtitle: "AI-powered Defensive Security Analyst · IOC Extraction",
    href: "/cyberguard/cyber-saathi",
    internal: true,
    bg: `radial-gradient(ellipse at 70% 30%, rgba(255,106,61,0.32), transparent 60%),
         radial-gradient(ellipse at 20% 70%, rgba(245,181,68,0.18), transparent 60%),
         linear-gradient(160deg, #160803 0%, #2c1206 50%, #0A0A0A 100%)`,
  },
  {
    title: "More Coming Soon",
    subtitle: "New experiments in motion · Stay tuned",
    bg: `radial-gradient(ellipse at 50% 30%, rgba(255,138,30,0.20), transparent 60%),
         linear-gradient(135deg, #0A0A0A 0%, #1a0d04 50%, #0A0A0A 100%)`,
  },
];

const useClock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
};

const Portfolio = () => {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0, visible: false });
  const wrapRef = useRef<HTMLDivElement>(null);
  const now = useClock();

  const next = () => setIndex((i) => (i + 1) % projects.length);
  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);

  useEffect(() => {
    if (hovered) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [hovered]);

  const onMove = (e: React.MouseEvent) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  };

  const onClick = (e: React.MouseEvent) => {
    if (!wrapRef.current) return;
    const target = e.target as HTMLElement;
    if (target.closest("a, button")) return;
    const rect = wrapRef.current.getBoundingClientRect();
    if (e.clientX - rect.left > rect.width / 2) next();
    else prev();
  };

  const current = projects[index];

  const dateStr = now
    .toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();
  const timeStr = now.toLocaleTimeString("en-US", { hour12: false });

  return (
    <section id="portfolio" className="relative bg-[#0A0A0A] py-16 md:py-24 px-4 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-6 px-2">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#FF8A1E]/80 mb-2">
              Selected Works · 2024 — 2026
            </p>
            <h2 className="font-display text-3xl md:text-5xl arctic-gradient-text" style={{ fontWeight: 800, letterSpacing: "-0.03em" }}>
              Portfolio
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-6 font-mono text-[10px] tracking-[0.25em] uppercase text-white/50">
            <span>{dateStr}</span>
            <span style={{ color: "#FF8A1E" }}>{timeStr}</span>
          </div>
        </div>

        <div
          ref={wrapRef}
          className="relative w-full overflow-hidden rounded-2xl border border-[#FF8A1E]/20 box-glow"
          style={{ height: "min(78vh, 720px)" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            setMouse((m) => ({ ...m, visible: false }));
          }}
          onMouseMove={onMove}
          onClick={onClick}
        >
          {/* Slides */}
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`carousel-slide ${i === index ? "active" : ""}`}
              aria-hidden={i !== index}
            >
              <div className="ken-burns-img" style={{ background: p.bg }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 arctic-noise pointer-events-none" />
            </div>
          ))}

          {/* Top bar inside frame */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10 py-5 font-mono text-[10px] tracking-[0.25em] uppercase text-white/60 pointer-events-none">
            <span>Project · {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
            <span className="hidden md:inline text-white/80">{timeStr} · KTM</span>
          </div>

          {/* Vertical counter left */}
          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3 font-mono text-[11px] text-white/80 select-none pointer-events-none">
            <span className="text-2xl text-white">{String(index + 1).padStart(2, "0")}</span>
            <span className="block w-px h-16 bg-white/30" />
            <span className="text-white/40">{String(projects.length).padStart(2, "0")}</span>
          </div>

          {/* Title bottom-left */}
          <div className="absolute left-6 md:left-12 bottom-8 md:bottom-12 z-20 max-w-[85%] pointer-events-none">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 mb-3">
              {current.subtitle}
            </p>
            <h3
              className="font-display leading-[0.9] text-white"
              style={{
                fontSize: "clamp(48px, 9vw, 120px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              {current.title}
            </h3>
          </div>

          {/* CTA bottom-right */}
          {current.href && (
            <div className="absolute right-6 md:right-12 bottom-12 md:bottom-16 z-30">
              {current.internal ? (
                <Link
                  to={current.href}
                  className="btn-mono pointer-events-auto"
                >
                  View Project →
                </Link>
              ) : (
                <a
                  href={current.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-mono pointer-events-auto"
                >
                  View Project →
                </a>
              )}
            </div>
          )}

          {/* Socials */}
          <div className="absolute right-6 md:right-12 top-16 z-20 flex gap-3">
            <a
              href="https://github.com/shreejansapkota24-sudo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white transition"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/shreejan-sapkota-0449b023b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white transition"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-opacity ${hovered ? "opacity-100" : "opacity-0"}`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-opacity ${hovered ? "opacity-100" : "opacity-0"}`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Rotating "Explore Project" cursor — confined to this section */}
          <div
            className={`explore-cursor ${mouse.visible ? "visible" : ""}`}
            style={{ left: mouse.x, top: mouse.y, position: "absolute" }}
          >
            <svg viewBox="0 0 100 100">
              <defs>
                <path id="circlePath" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
              </defs>
              <text fill="#FFFFFF" fontSize="9" fontFamily="'JetBrains Mono', monospace" letterSpacing="2">
                <textPath href="#circlePath">EXPLORE PROJECT • EXPLORE PROJECT • </textPath>
              </text>
              <circle cx="50" cy="50" r="2.5" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Progress dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                aria-label={`Go to slide ${i + 1}`}
                className="h-[2px] transition-all rounded-full"
                style={{
                  width: i === index ? 36 : 14,
                  background: i === index
                    ? "linear-gradient(90deg, #FF8A1E, #F5B544)"
                    : "rgba(255,138,30,0.3)",
                  boxShadow: i === index ? "0 0 8px #FF8A1E" : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
