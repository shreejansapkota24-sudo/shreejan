import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WorldCupLayout from "@/components/worldcup/WorldCupLayout";
import { GlassCard, SectionHeading, Badge } from "@/components/worldcup/ui";
import { EDITIONS, teamById } from "@/data/worldcup/mockData";

export default function Archive() {
  const [openYear, setOpenYear] = useState<number | null>(null);
  const reversed = [...EDITIONS].reverse();

  return (
    <WorldCupLayout>
      <section className="px-5 md:px-8 py-10 max-w-[1400px] mx-auto">
        <SectionHeading eyebrow="— Historical Archive" title="Every World Cup · 1930–2022" sub="Click any edition to expand its full tournament profile." />

        <div className="space-y-3">
          {reversed.map((e, i) => {
            const w = teamById(e.winner);
            const r = teamById(e.runnerUp);
            const open = openYear === e.year;
            return (
              <motion.div key={e.year} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(i * 0.02, 0.4) }}>
                <button onClick={() => setOpenYear(open ? null : e.year)} className="w-full text-left">
                  <GlassCard style={{ padding: 0 }}>
                    <div className="grid grid-cols-2 md:grid-cols-[100px_1fr_1fr_1fr_auto] gap-4 items-center p-4 md:p-5">
                      <div className="wc-display tabular-nums" style={{ fontSize: 30, color: "#FFD700", letterSpacing: "0.04em" }}>{e.year}</div>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF]">Host</p>
                        <p className="text-sm text-[#F9FAFB] truncate"><span className="mr-1.5">{e.hostFlag}</span>{e.host}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#F5A623]">🏆 Winner</p>
                        <p className="text-sm text-[#F9FAFB] truncate">{w.flag} {w.name}</p>
                      </div>
                      <div className="min-w-0 hidden md:block">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF]">Runner-up</p>
                        <p className="text-sm text-[#F9FAFB] truncate">{r.flag} {r.name}</p>
                      </div>
                      <Badge color="muted">{e.totalGoals} goals</Badge>
                    </div>
                    <AnimatePresence>
                      {open && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t" style={{ borderColor: "rgba(245,166,35,0.15)" }}>
                          <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div><p className="text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF]">Top Scorer</p><p className="text-sm text-[#F9FAFB] mt-1 truncate">{e.topScorer}</p></div>
                            <div><p className="text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF]">Goals</p><p className="wc-display text-[#FFD700] mt-1" style={{ fontSize: 22 }}>{e.topScorerGoals}</p></div>
                            <div><p className="text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF]">Matches</p><p className="wc-display text-[#FFD700] mt-1" style={{ fontSize: 22 }}>{e.matches}</p></div>
                            <div><p className="text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF]">Goals / Match</p><p className="wc-display text-[#FFD700] mt-1" style={{ fontSize: 22 }}>{(e.totalGoals / e.matches).toFixed(2)}</p></div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>
    </WorldCupLayout>
  );
}
