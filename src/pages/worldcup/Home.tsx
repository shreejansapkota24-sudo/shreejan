import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Target, Globe, Crown } from "lucide-react";
import WorldCupLayout from "@/components/worldcup/WorldCupLayout";
import ParticleBackground from "@/components/worldcup/ParticleBackground";
import TrophyHero from "@/components/worldcup/TrophyHero";
import CountdownTimer from "@/components/worldcup/CountdownTimer";
import { GlassCard, Badge, LiveDot } from "@/components/worldcup/ui";
import { MATCHES, teamById } from "@/data/worldcup/mockData";

const QUICK_STATS = [
  { icon: Trophy, label: "World Cups", value: "22" },
  { icon: Target, label: "Total Goals", value: "2,720+" },
  { icon: Crown, label: "Most Titles", value: "🇧🇷 5" },
  { icon: Globe, label: "Champions", value: "🇦🇷 Argentina" },
];

export default function Home() {
  return (
    <WorldCupLayout>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-5 md:px-8 overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-x-0 top-0 h-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(245,166,35,0.18), transparent 70%)" }} aria-hidden />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <TrophyHero />
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="wc-display mt-6"
            style={{
              fontSize: "clamp(40px, 8vw, 96px)",
              letterSpacing: "0.06em",
              lineHeight: 0.95,
              background: "linear-gradient(180deg, #FFD700 0%, #F5A623 60%, #A56E14 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              wordBreak: "break-word",
            }}
          >
            Road to World Cup Glory
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-4 text-sm md:text-base"
            style={{ color: "#9CA3AF", maxWidth: 560 }}
          >
            Live matches · tournament tracker · 96 years of FIFA World Cup history — one beautiful dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-10 w-full"
          >
            <CountdownTimer />
            <p className="mt-4 text-[11px] tracking-[0.3em] uppercase" style={{ color: "#9CA3AF", fontFamily: "'JetBrains Mono', monospace" }}>
              Until FIFA World Cup 2026 · USA / Canada / Mexico
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link to="/worldcup/live" className="wc-btn-primary">
              Live Center <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/worldcup/archive" className="wc-btn-ghost">Explore Archive</Link>
          </motion.div>
        </div>
      </section>

      {/* LIVE STRIP */}
      <section className="px-5 md:px-8 py-12 md:py-16 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
          <div>
            <p className="wc-eyebrow">— Today's Action</p>
            <h2 className="wc-display mt-2" style={{ fontSize: "clamp(28px,4vw,44px)", color: "#F9FAFB" }}>Live & Upcoming</h2>
          </div>
          <Link to="/worldcup/live" className="text-xs tracking-widest uppercase" style={{ color: "#F5A623", fontFamily: "'JetBrains Mono', monospace" }}>
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MATCHES.map((m, i) => {
            const h = teamById(m.home);
            const a = teamById(m.away);
            return (
              <motion.div key={m.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to="/worldcup/live">
                  <GlassCard className="hover:border-[rgba(245,166,35,0.4)] transition-all" style={{ cursor: "pointer" }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "#9CA3AF", fontFamily: "'JetBrains Mono', monospace" }}>
                        {m.stage}
                      </span>
                      {m.status === "LIVE" ? (
                        <span className="inline-flex items-center gap-1.5"><LiveDot /><Badge color="green">{m.minute}'</Badge></span>
                      ) : m.status === "HT" ? (
                        <Badge color="gold">HT</Badge>
                      ) : m.status === "FT" ? (
                        <Badge color="muted">FT</Badge>
                      ) : (
                        <Badge color="muted">{m.date}</Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span style={{ fontSize: 22 }}>{h.flag}</span>
                        <span className="truncate" style={{ color: "#F9FAFB", fontWeight: 600 }}>{h.name}</span>
                      </div>
                      <span className="wc-display tabular-nums" style={{ fontSize: 26, color: "#FFD700" }}>{m.homeScore}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 mt-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span style={{ fontSize: 22 }}>{a.flag}</span>
                        <span className="truncate" style={{ color: "#F9FAFB", fontWeight: 600 }}>{a.name}</span>
                      </div>
                      <span className="wc-display tabular-nums" style={{ fontSize: 26, color: "#FFD700" }}>{m.awayScore}</span>
                    </div>
                    <p className="mt-3 text-[11px] truncate" style={{ color: "#9CA3AF" }}>{m.stadium}</p>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="px-5 md:px-8 pb-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {QUICK_STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <GlassCard className="text-center">
                <s.icon className="w-6 h-6 mx-auto mb-3" style={{ color: "#F5A623" }} />
                <div className="wc-display" style={{ fontSize: 28, color: "#FFD700", lineHeight: 1, wordBreak: "break-word" }}>{s.value}</div>
                <div className="mt-2 text-[10px] tracking-[0.25em] uppercase" style={{ color: "#9CA3AF", fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>
    </WorldCupLayout>
  );
}
