import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import WorldCupLayout from "@/components/worldcup/WorldCupLayout";
import { GlassCard, SectionHeading } from "@/components/worldcup/ui";
import { TEAMS } from "@/data/worldcup/mockData";

export default function Teams() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => TEAMS.filter((t) => t.name.toLowerCase().includes(q.toLowerCase())), [q]);

  return (
    <WorldCupLayout>
      <section className="px-5 md:px-8 py-10 max-w-[1400px] mx-auto">
        <SectionHeading eyebrow="— Country Explorer" title="Teams & Nations" sub="Every country to ever grace a FIFA World Cup pitch." />

        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search countries…"
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(245,166,35,0.2)", color: "#F9FAFB" }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((t, i) => (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.02, 0.5) }}
              whileHover={{ y: -4 }}
              className="text-left rounded-2xl p-4 overflow-hidden transition-all hover:border-[rgba(245,166,35,0.5)]"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(245,166,35,0.15)" }}
            >
              <div style={{ fontSize: 42, lineHeight: 1 }}>{t.flag}</div>
              <div className="wc-display mt-3 truncate" style={{ fontSize: 18, color: "#F9FAFB", letterSpacing: "0.04em" }} title={t.name}>{t.name}</div>
              <p className="text-[11px] mt-1 text-[#9CA3AF]">{t.appearances} appearances</p>
              <p className="text-[10px] mt-1 text-[#F5A623] line-clamp-2" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {t.bestFinish}
              </p>
            </motion.button>
          ))}
        </div>
        {filtered.length === 0 && (
          <GlassCard className="text-center mt-6"><p className="text-sm text-[#9CA3AF]">No countries match "{q}"</p></GlassCard>
        )}
      </section>
    </WorldCupLayout>
  );
}
