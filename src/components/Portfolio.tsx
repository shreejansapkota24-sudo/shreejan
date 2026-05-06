import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type Project = {
  title: string;
  subtitle: string;
  bg: string; // CSS background
  href?: string;
  internal?: boolean;
};

const projects: Project[] = [
  {
    title: "CyberGuard",
    subtitle: "Cybersecurity Toolkit · URL & File Scanner · Threat Map",
    href: "/cyberguard",
    internal: true,
    bg: `radial-gradient(ellipse at 30% 20%, rgba(255,122,69,0.35), transparent 55%),
         radial-gradient(ellipse at 80% 80%, rgba(79,139,255,0.4), transparent 60%),
         linear-gradient(135deg, #08101F 0%, #142042 60%, #1B0A1A 100%)`,
  },
  {
    title: "Cyber Saathi",
    subtitle: "AI-powered Defensive Security Analyst · IOC Extraction",
    href: "/cyberguard/cyber-saathi",
    internal: true,
    bg: `radial-gradient(ellipse at 70% 30%, rgba(255,77,138,0.35), transparent 60%),
         radial-gradient(ellipse at 20% 70%, rgba(140,107,255,0.35), transparent 60%),
         linear-gradient(160deg, #050B17 0%, #0E1830 50%, #1A0E2E 100%)`,
  },
  {
    title: "More Coming Soon",
    subtitle: "New experiments in motion · Stay tuned",
    bg: `linear-gradient(135deg, #08101F 0%, #0E1830 50%, #08101F 100%)`,
  },
];

const Portfolio = () => {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0, visible: false });
  const wrapRef = useRef<HTMLDivElement>(null);

  const next = () => setIndex((i) => (i + 1) % projects.length);
  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);

  // Auto-advance, pause on hover
  useEffect(() => {
    if (hovered) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [hovered]);

  const onMove = (e: React.MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY, visible: true });
  };

  const onClick = (e: React.MouseEvent) => {
    if (!wrapRef.current) return;
    const target = e.target as HTMLElement;
    // ignore clicks on links/buttons
    if (target.closest("a, button")) return;
    const rect = wrapRef.current.getBoundingClientRect();
    if (e.clientX - rect.left > rect.width / 2) next();
    else prev();
  };

  const current = projects[index];

  return (
    <section id="portfolio" className="relative">
      <div
        ref={wrapRef}
        className="relative w-screen h-screen overflow-hidden -mx-6 cursor-none"
        style={{ marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setMouse((m) => ({ ...m, visible: false })); }}
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
            {/* dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040810] via-[#040810]/40 to-transparent" />
            <div className="absolute inset-0 arctic-noise pointer-events-none" />
          </div>
        ))}

        {/* Slide counter (left middle) */}
        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3 font-mono text-[12px] text-white/80 select-none">
          <span className="text-2xl text-[#FF7A45]">{String(index + 1).padStart(2, "0")}</span>
          <span className="block w-px h-16 bg-white/30" />
          <span className="text-white/50">{String(projects.length).padStart(2, "0")}</span>
        </div>

        {/* Title bottom-left, partially cropped */}
        <div className="absolute left-6 md:left-20 bottom-[-20px] md:bottom-[-30px] z-20 max-w-[90%] pointer-events-none">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF7A45] mb-3">
            {current.subtitle}
          </p>
          <h3
            className="font-display leading-[0.85] text-white"
            style={{
              fontSize: "clamp(60px, 12vw, 140px)",
              fontWeight: 700,
              fontStyle: "italic",
              letterSpacing: "-0.04em",
            }}
          >
            {current.title}
          </h3>
        </div>

        {/* CTA View Project */}
        {current.href && (
          <div className="absolute right-6 md:right-20 bottom-32 md:bottom-44 z-30">
            {current.internal ? (
              <Link to={current.href} className="btn-mono pointer-events-auto" style={{ background: "#FF7A45", color: "#08101F", borderColor: "#FF7A45" }}>
                View Project
              </Link>
            ) : (
              <a href={current.href} target="_blank" rel="noopener noreferrer" className="btn-mono pointer-events-auto">
                View Project
              </a>
            )}
          </div>
        )}

        {/* Social links bottom-right */}
        <div className="absolute right-6 md:right-10 bottom-8 z-20 flex gap-3">
          <a href="https://github.com/shreejansapkota24-sudo" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/70 hover:text-[#FF7A45] hover:border-[#FF7A45] transition">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/shreejan-sapkota-0449b023b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/70 hover:text-[#FF7A45] hover:border-[#FF7A45] transition">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

        {/* Subtle nav arrows on hover */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous"
          className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center text-white/60 hover:text-[#FF7A45] transition-opacity ${hovered ? "opacity-100" : "opacity-0"}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next"
          className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center text-white/60 hover:text-[#FF7A45] transition-opacity ${hovered ? "opacity-100" : "opacity-0"}`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Custom rotating "Explore Project" cursor */}
        <div
          className={`explore-cursor ${mouse.visible ? "visible" : ""}`}
          style={{ left: mouse.x, top: mouse.y }}
        >
          <svg viewBox="0 0 100 100">
            <defs>
              <path id="circlePath" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
            </defs>
            <text fill="#FFFFFF" fontSize="9" fontFamily="'Space Mono', monospace" letterSpacing="2">
              <textPath href="#circlePath">EXPLORE PROJECT • EXPLORE PROJECT • </textPath>
            </text>
            <circle cx="50" cy="50" r="3" fill="#FF7A45" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
