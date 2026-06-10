import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import WorldCupLayout from "@/components/worldcup/WorldCupLayout";
import { GlassCard, Badge, LiveDot, SectionHeading } from "@/components/worldcup/ui";
import { MATCHES, LIVE_EVENTS, MATCH_STATS, MOMENTUM, teamById } from "@/data/worldcup/mockData";

const TABS = ["Overview", "Stats", "Timeline", "Lineups", "H2H"] as const;
type Tab = typeof TABS[number];

const eventIcon = (t: string) => (t === "goal" ? "⚽" : t === "yellow" ? "🟨" : t === "red" ? "🟥" : "🔄");

function Pitch({ formation = "4-3-3" }: { formation?: string }) {
  const rows = formation.split("-").map(Number);
  return (
    <div className="relative w-full" style={{ aspectRatio: "2/3", background: "linear-gradient(180deg, #0F4D2E, #0B3A23)", border: "2px solid rgba(255,255,255,0.4)", borderRadius: 12, overflow: "hidden" }}>
      <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: "rgba(255,255,255,0.4)" }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/40" />
      {/* Home (top) */}
      {[1, ...rows, 1].slice(0, rows.length + 2).map((count, ri) => (
        <div key={`h${ri}`} className="absolute inset-x-0 flex justify-around" style={{ top: `${6 + ri * 9}%` }}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full" style={{ background: "#F5A623", border: "2px solid #FFD700", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }} />
          ))}
        </div>
      ))}
      {/* Away (bottom mirror) */}
      {[1, ...rows, 1].slice(0, rows.length + 2).map((count, ri) => (
        <div key={`a${ri}`} className="absolute inset-x-0 flex justify-around" style={{ bottom: `${6 + ri * 9}%` }}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full" style={{ background: "#22C55E", border: "2px solid #4ADE80", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function LiveCenter() {
  const [selected, setSelected] = useState(MATCHES[0].id);
  const [tab, setTab] = useState<Tab>("Overview");
  const match = MATCHES.find((m) => m.id === selected)!;
  const h = teamById(match.home);
  const a = teamById(match.away);
  const events = LIVE_EVENTS[match.id] || [];
  const stats = MATCH_STATS[match.id] || MATCH_STATS.m1;
  const momentum = MOMENTUM[match.id] || MOMENTUM.m1;
  const h2h = [
    { name: "Goals", home: 18, away: 11 },
    { name: "Wins", home: 3, away: 1 },
    { name: "Draws", home: 1, away: 1 },
  ];

  return (
    <WorldCupLayout>
      <section className="px-5 md:px-8 py-10 max-w-[1400px] mx-auto">
        <SectionHeading eyebrow="— Live Match Center" title="Live & Today" sub="Real-time updates from every World Cup fixture." />

        <div className="grid lg:grid-cols-[360px_1fr] gap-6">
          {/* List */}
          <div className="space-y-3">
            {MATCHES.map((m) => {
              const mh = teamById(m.home);
              const ma = teamById(m.away);
              const active = m.id === selected;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelected(m.id)}
                  className="w-full text-left rounded-2xl p-4 transition-all overflow-hidden"
                  style={{
                    background: active ? "rgba(245,166,35,0.08)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${active ? "rgba(245,166,35,0.5)" : "rgba(245,166,35,0.15)"}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "#9CA3AF", fontFamily: "'JetBrains Mono', monospace" }}>
                      {m.stage}
                    </span>
                    {m.status === "LIVE" ? <span className="inline-flex items-center gap-1.5"><LiveDot /><span className="text-[10px] font-bold text-[#22C55E]">{m.minute}'</span></span> : <Badge color={m.status === "FT" ? "muted" : "gold"}>{m.status}</Badge>}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0"><span>{mh.flag}</span><span className="truncate text-sm text-[#F9FAFB]">{mh.name}</span></div>
                    <span className="wc-display tabular-nums text-[#FFD700]" style={{ fontSize: 18 }}>{m.homeScore}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-1.5">
                    <div className="flex items-center gap-2 min-w-0"><span>{ma.flag}</span><span className="truncate text-sm text-[#F9FAFB]">{ma.name}</span></div>
                    <span className="wc-display tabular-nums text-[#FFD700]" style={{ fontSize: 18 }}>{m.awayScore}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <GlassCard style={{ padding: 0 }}>
            <div className="p-6 border-b" style={{ borderColor: "rgba(245,166,35,0.15)" }}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="text-center min-w-0">
                    <div style={{ fontSize: 38 }}>{h.flag}</div>
                    <div className="text-xs text-[#9CA3AF] truncate max-w-[120px]">{h.name}</div>
                  </div>
                  <div className="wc-display tabular-nums text-center" style={{ fontSize: 48, color: "#FFD700" }}>
                    {match.homeScore} <span className="text-[#9CA3AF]">–</span> {match.awayScore}
                  </div>
                  <div className="text-center min-w-0">
                    <div style={{ fontSize: 38 }}>{a.flag}</div>
                    <div className="text-xs text-[#9CA3AF] truncate max-w-[120px]">{a.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  {match.status === "LIVE" && <Badge color="green">⏱ {match.minute}'</Badge>}
                  <p className="text-[11px] mt-1 text-[#9CA3AF]">{match.stadium}</p>
                </div>
              </div>
              <div className="mt-5 flex gap-1 overflow-x-auto pb-1">
                {TABS.map((t) => (
                  <button key={t} onClick={() => setTab(t)} className="px-4 py-2 text-xs rounded-md whitespace-nowrap transition-all"
                    style={{ background: tab === t ? "rgba(245,166,35,0.15)" : "transparent", color: tab === t ? "#F5A623" : "#9CA3AF", border: `1px solid ${tab === t ? "rgba(245,166,35,0.4)" : "transparent"}`, fontWeight: 600, letterSpacing: "0.05em" }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  {tab === "Overview" && (
                    <div className="space-y-2">
                      {events.length === 0 && <p className="text-sm text-[#9CA3AF]">No events yet.</p>}
                      {events.map((e, i) => (
                        <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-3 py-2.5 px-3 rounded-md" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                          <span className="wc-display text-[#FFD700] tabular-nums" style={{ fontSize: 16, minWidth: 38 }}>{e.minute}'</span>
                          <span style={{ fontSize: 20 }}>{eventIcon(e.type)}</span>
                          <span className="flex-1 text-sm text-[#F9FAFB] truncate">{e.player}</span>
                          <span className="text-[10px] uppercase tracking-widest text-[#9CA3AF]">{e.team === "home" ? h.short : a.short}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {tab === "Stats" && (
                    <div className="space-y-4">
                      {stats.map((s) => {
                        const total = s.home + s.away;
                        const hp = total > 0 ? (s.home / total) * 100 : 50;
                        return (
                          <div key={s.label}>
                            <div className="flex justify-between text-xs mb-1.5"><span className="text-[#FFD700] tabular-nums">{s.home}</span><span className="text-[#9CA3AF] uppercase tracking-widest text-[10px]">{s.label}</span><span className="text-[#22C55E] tabular-nums">{s.away}</span></div>
                            <div className="h-2 rounded-full overflow-hidden flex" style={{ background: "rgba(255,255,255,0.05)" }}>
                              <motion.div initial={{ width: 0 }} animate={{ width: `${hp}%` }} transition={{ duration: 0.8 }} style={{ background: "#F5A623" }} />
                              <motion.div initial={{ width: 0 }} animate={{ width: `${100 - hp}%` }} transition={{ duration: 0.8 }} style={{ background: "#22C55E" }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {tab === "Timeline" && (
                    <div style={{ height: 280 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={momentum}>
                          <defs>
                            <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F5A623" stopOpacity={0.5} /><stop offset="100%" stopColor="#F5A623" stopOpacity={0} /></linearGradient>
                            <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22C55E" stopOpacity={0.5} /><stop offset="100%" stopColor="#22C55E" stopOpacity={0} /></linearGradient>
                          </defs>
                          <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                          <XAxis dataKey="min" stroke="#6B7280" fontSize={11} />
                          <YAxis stroke="#6B7280" fontSize={11} />
                          <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(245,166,35,0.3)", borderRadius: 8 }} />
                          <Area type="monotone" dataKey="home" stroke="#F5A623" fill="url(#hg)" strokeWidth={2} />
                          <Area type="monotone" dataKey="away" stroke="#22C55E" fill="url(#ag)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {tab === "Lineups" && (
                    <div className="max-w-md mx-auto">
                      <Pitch formation="4-3-3" />
                      <div className="flex items-center justify-between mt-3 text-xs">
                        <span className="text-[#F5A623]">{h.short} · 4-3-3</span>
                        <span className="text-[#22C55E]">{a.short} · 4-3-3</span>
                      </div>
                    </div>
                  )}

                  {tab === "H2H" && (
                    <div>
                      <p className="text-sm text-[#9CA3AF] mb-3">Last 5 World Cup meetings · {h.name} vs {a.name}</p>
                      <div style={{ height: 240 }}>
                        <ResponsiveContainer>
                          <BarChart data={h2h}>
                            <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" />
                            <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(245,166,35,0.3)" }} />
                            <Bar dataKey="home" fill="#F5A623" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="away" fill="#22C55E" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </GlassCard>
        </div>
      </section>
    </WorldCupLayout>
  );
}
