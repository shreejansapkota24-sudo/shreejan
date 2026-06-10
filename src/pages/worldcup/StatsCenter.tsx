import { motion } from "framer-motion";
import { Trophy, Award, Crown, Star } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import WorldCupLayout from "@/components/worldcup/WorldCupLayout";
import { GlassCard, SectionHeading } from "@/components/worldcup/ui";
import { TOP_SCORERS, TOP_ASSISTERS, RECORDS, teamById } from "@/data/worldcup/mockData";

const RankList = ({ rows, valueLabel }: { rows: { name: string; country: string; value?: number; goals?: number; tournaments: string }[]; valueLabel: string }) => (
  <div className="space-y-2">
    {rows.map((r, i) => {
      const t = teamById(r.country);
      const v = r.goals ?? r.value ?? 0;
      return (
        <motion.div key={r.name} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
          className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="w-7 text-center wc-display tabular-nums" style={{ color: i === 0 ? "#FFD700" : "#9CA3AF", fontSize: 16 }}>
            {i === 0 ? "🏆" : i + 1}
          </div>
          <span style={{ fontSize: 22 }}>{t.flag}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-[#F9FAFB] truncate">{r.name}</div>
            <div className="text-[10px] text-[#9CA3AF] truncate">{t.name} · {r.tournaments}</div>
          </div>
          <div className="wc-display tabular-nums" style={{ fontSize: 22, color: "#FFD700" }}>{v}</div>
          <span className="text-[10px] text-[#9CA3AF] uppercase tracking-widest">{valueLabel}</span>
        </motion.div>
      );
    })}
  </div>
);

export default function StatsCenter() {
  const chartData = TOP_SCORERS.slice(0, 8).map((r) => ({ name: r.name.split(" ").pop(), goals: r.goals }));
  return (
    <WorldCupLayout>
      <section className="px-5 md:px-8 py-10 max-w-[1400px] mx-auto">
        <SectionHeading eyebrow="— Stats Center" title="All-Time Records" sub="The numbers behind 96 years of World Cup history." />

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <GlassCard>
            <div className="flex items-center gap-2 mb-4"><Trophy className="w-5 h-5 text-[#F5A623]" /><h3 className="wc-display" style={{ fontSize: 20, color: "#F9FAFB" }}>Top Scorers</h3></div>
            <RankList rows={TOP_SCORERS} valueLabel="goals" />
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-2 mb-4"><Award className="w-5 h-5 text-[#F5A623]" /><h3 className="wc-display" style={{ fontSize: 20, color: "#F9FAFB" }}>Top Assisters</h3></div>
            <RankList rows={TOP_ASSISTERS} valueLabel="assists" />
          </GlassCard>
        </div>

        <GlassCard className="mb-10">
          <div className="flex items-center gap-2 mb-4"><Star className="w-5 h-5 text-[#F5A623]" /><h3 className="wc-display" style={{ fontSize: 20, color: "#F9FAFB" }}>Goals by Legend</h3></div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(245,166,35,0.3)", borderRadius: 8 }} cursor={{ fill: "rgba(245,166,35,0.05)" }} />
                <Bar dataKey="goals" fill="#F5A623" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <div className="flex items-center gap-2 mb-4"><Crown className="w-5 h-5 text-[#F5A623]" /><h3 className="wc-display" style={{ fontSize: 22, color: "#F9FAFB" }}>Records Wall</h3></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RECORDS.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <GlassCard style={{ borderColor: "rgba(245,166,35,0.3)" }}>
                <div style={{ fontSize: 28 }}>{r.icon}</div>
                <p className="mt-2 text-[10px] uppercase tracking-[0.3em]" style={{ color: "#9CA3AF", fontFamily: "'JetBrains Mono', monospace" }}>{r.title}</p>
                <div className="wc-display mt-1" style={{ fontSize: 38, color: "#FFD700", lineHeight: 1 }}>{r.value}</div>
                <p className="mt-2 text-xs text-[#9CA3AF] line-clamp-2" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {r.desc}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>
    </WorldCupLayout>
  );
}
