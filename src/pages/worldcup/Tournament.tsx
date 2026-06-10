import { motion } from "framer-motion";
import WorldCupLayout from "@/components/worldcup/WorldCupLayout";
import { GlassCard, SectionHeading } from "@/components/worldcup/ui";
import { STANDINGS, BRACKET, teamById } from "@/data/worldcup/mockData";

const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export default function Tournament() {
  return (
    <WorldCupLayout>
      <section className="px-5 md:px-8 py-10 max-w-[1400px] mx-auto">
        <SectionHeading eyebrow="— Tournament Tracker" title="Group Stage & Knockouts" sub="Qatar 2022 results · top 2 qualify for the Round of 16." />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {GROUPS.map((g, gi) => (
            <motion.div key={g} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.05 }}>
              <GlassCard style={{ padding: 18 }}>
                <h3 className="wc-display mb-3" style={{ fontSize: 20, color: "#F5A623", letterSpacing: "0.1em" }}>Group {g}</h3>
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ color: "#9CA3AF" }}>
                      <th className="text-left font-normal pb-2">Team</th>
                      <th className="font-normal pb-2">P</th>
                      <th className="font-normal pb-2">GD</th>
                      <th className="text-right font-normal pb-2">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STANDINGS[g].map((row, i) => {
                      const t = teamById(row.team);
                      const qualified = i < 2;
                      const playoff = i === 2;
                      return (
                        <tr key={row.team} className={i > 1 ? "opacity-70" : ""} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                          <td className="py-2 pl-2" style={{ borderLeft: qualified ? "3px solid #F5A623" : playoff ? "3px solid #B07515" : "3px solid transparent" }}>
                            <div className="flex items-center gap-2 min-w-0"><span>{t.flag}</span><span className="truncate text-[#F9FAFB]">{t.short}</span></div>
                          </td>
                          <td className="text-center text-[#9CA3AF]">{row.p}</td>
                          <td className="text-center tabular-nums" style={{ color: row.gf - row.ga >= 0 ? "#22C55E" : "#EF4444" }}>{row.gf - row.ga > 0 ? "+" : ""}{row.gf - row.ga}</td>
                          <td className="text-right wc-display tabular-nums text-[#FFD700]" style={{ fontSize: 14 }}>{row.pts}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* BRACKET */}
        <div className="mt-16">
          <SectionHeading eyebrow="— Road to the Final" title="Knockout Bracket" />
          <div className="relative">
            {/* Champion */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mx-auto mb-10 max-w-sm">
              <GlassCard className="text-center" style={{ borderColor: "rgba(255,215,0,0.5)", boxShadow: "0 0 40px rgba(245,166,35,0.25)" }}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#F5A623]">🏆 Champion</p>
                <div className="mt-2 text-5xl">🇦🇷</div>
                <div className="wc-display mt-1" style={{ fontSize: 26, color: "#FFD700" }}>Argentina</div>
                <p className="text-xs text-[#9CA3AF] mt-1">3–3 vs France · 4–2 pens</p>
              </GlassCard>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {BRACKET.map((round, ri) => (
                <div key={round.round}>
                  <h4 className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "#9CA3AF", fontFamily: "'JetBrains Mono', monospace" }}>{round.round}</h4>
                  <div className="space-y-3">
                    {round.matches.map((m, i) => {
                      const h = teamById(m.home);
                      const a = teamById(m.away);
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: ri * 0.15 + i * 0.04 }}
                          className="rounded-lg overflow-hidden"
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(245,166,35,0.15)" }}
                        >
                          <div className="flex items-center justify-between px-3 py-2 text-sm">
                            <span className="flex items-center gap-1.5 min-w-0"><span>{h.flag}</span><span className="truncate">{h.short}</span></span>
                            <span className="wc-display tabular-nums text-[#FFD700]">{m.hs}</span>
                          </div>
                          <div className="flex items-center justify-between px-3 py-2 text-sm border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                            <span className="flex items-center gap-1.5 min-w-0"><span>{a.flag}</span><span className="truncate">{a.short}</span></span>
                            <span className="wc-display tabular-nums text-[#FFD700]">{m.as}</span>
                          </div>
                          {m.pen && <div className="px-3 py-1 text-[10px] text-center text-[#F5A623]" style={{ background: "rgba(245,166,35,0.05)" }}>Pens {m.pen}</div>}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </WorldCupLayout>
  );
}
