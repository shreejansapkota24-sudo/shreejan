import { ReactNode, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MATCHES } from "@/data/worldcup/mockData";
import { LiveDot } from "./ui";
import WorldCupAI from "./WorldCupAI";

const NAV = [
  { to: "/worldcup", label: "Home", end: true },
  { to: "/worldcup/live", label: "Live" },
  { to: "/worldcup/tournament", label: "Tournament" },
  { to: "/worldcup/teams", label: "Teams" },
  { to: "/worldcup/stats", label: "Stats" },
  { to: "/worldcup/archive", label: "Archive" },
  { to: "/worldcup/map", label: "Map" },
];

export default function WorldCupLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const hasLive = MATCHES.some((m) => m.status === "LIVE");

  return (
    <div className="wc-theme min-h-screen overflow-x-hidden" style={{ background: "#0A0E1A", color: "#F9FAFB" }}>
      <nav className="fixed top-0 left-0 right-0 z-40" style={{ background: "rgba(10,14,26,0.85)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(245,166,35,0.15)" }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
          <Link to="/worldcup" className="flex items-center gap-2 shrink-0" aria-label="WorldCup Hub home">
            <span style={{ fontSize: 22 }}>⚽</span>
            <span className="wc-display text-xl md:text-2xl" style={{ color: "#F5A623", letterSpacing: "0.04em" }}>
              WorldCup Hub
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end as boolean | undefined}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm tracking-wide rounded-md transition-all ${
                    isActive ? "text-[#F5A623] bg-[rgba(245,166,35,0.08)]" : "text-[#9CA3AF] hover:text-[#F9FAFB]"
                  }`
                }
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                {n.label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {hasLive && (
              <span className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md" style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.35)" }}>
                <LiveDot />
                <span className="text-[10px] tracking-[0.25em] font-bold" style={{ color: "#22C55E", fontFamily: "'JetBrains Mono', monospace" }}>LIVE</span>
              </span>
            )}
            <Link to="/" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-[#F5A623]" aria-label="Back to portfolio">
              <ArrowLeft className="w-3.5 h-3.5" /> Portfolio
            </Link>
            <button className="md:hidden p-2 text-[#F9FAFB]" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="md:hidden overflow-hidden border-t border-[rgba(245,166,35,0.15)]">
              <div className="flex flex-col p-4 gap-1">
                {NAV.map((n) => (
                  <NavLink key={n.to} to={n.to} end={n.end as boolean | undefined} onClick={() => setOpen(false)}
                    className={({ isActive }) => `px-3 py-2.5 rounded-md text-sm ${isActive ? "text-[#F5A623] bg-[rgba(245,166,35,0.08)]" : "text-[#9CA3AF]"}`}>
                    {n.label}
                  </NavLink>
                ))}
                <Link to="/" className="px-3 py-2.5 text-sm text-[#9CA3AF] flex items-center gap-2" onClick={() => setOpen(false)}>
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <motion.main
        key={loc.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="pt-16"
      >
        {children}
      </motion.main>

      <footer className="mt-24 border-t" style={{ borderColor: "rgba(245,166,35,0.15)" }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: "#9CA3AF" }}>
          <p>Data provided by API-Football & Football-Data.org · Mock data for demo.</p>
          <p>Not affiliated with FIFA. © {new Date().getFullYear()} WorldCup Hub.</p>
        </div>
      </footer>

      <WorldCupAI />
    </div>
  );
}
