import { useState } from "react";
import WorldCupLayout from "@/components/worldcup/WorldCupLayout";
import { GlassCard, SectionHeading } from "@/components/worldcup/ui";
import { EDITIONS, TEAMS } from "@/data/worldcup/mockData";

type Filter = "all" | "current" | "hosts";

const HOSTS = new Set(EDITIONS.map((e) => e.host.toLowerCase()));
const CHAMPIONS = new Set(EDITIONS.map((e) => e.winner));

// Simplified world regions / a small grid of well-known nations as "map" cells
const MAP_LAYOUT = [
  ["", "rus", "", "", "", "", "", "", ""],
  ["eng", "ned", "ger", "pol", "srb", "rus", "kor", "jpn", ""],
  ["", "fra", "sui", "ita", "cro", "irn", "", "", ""],
  ["", "esp", "por", "tun", "ksa", "qat", "", "", ""],
  ["", "", "mar", "sen", "gha", "cmr", "", "aus", ""],
  ["", "mex", "usa", "crc", "", "", "", "", ""],
  ["", "", "ecu", "bra", "arg", "uru", "", "", ""],
];

export default function WorldMapPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [hover, setHover] = useState<string | null>(null);

  const colorFor = (id: string) => {
    if (!id) return "transparent";
    const t = TEAMS.find((x) => x.id === id);
    if (!t) return "rgba(255,255,255,0.05)";
    const isHost = HOSTS.has(t.name.toLowerCase());
    const isChampion = CHAMPIONS.has(t.id);
    if (filter === "hosts") return isHost ? "#FFD700" : "rgba(255,255,255,0.04)";
    if (filter === "current") return ["arg", "fra", "bra", "ger", "esp", "eng", "por", "ned"].includes(t.id) ? "#F5A623" : "rgba(255,255,255,0.04)";
    if (isHost) return "#FFD700";
    if (isChampion) return "#F5A623";
    return "rgba(245,166,35,0.25)";
  };

  const hoveredTeam = hover ? TEAMS.find((t) => t.id === hover) : null;

  return (
    <WorldCupLayout>
      <section className="px-5 md:px-8 py-10 max-w-[1400px] mx-auto">
        <SectionHeading eyebrow="— World Cup Atlas" title="Interactive Nation Map" sub="A stylised view of every nation that has competed at the World Cup." />

        <div className="flex flex-wrap gap-2 mb-6">
          {(["all", "current", "hosts"] as Filter[]).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-md text-xs uppercase tracking-widest"
              style={{
                background: filter === f ? "rgba(245,166,35,0.18)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${filter === f ? "rgba(245,166,35,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: filter === f ? "#F5A623" : "#9CA3AF",
                fontFamily: "'JetBrains Mono', monospace",
              }}>
              {f === "all" ? "All Time" : f === "current" ? "Current Tournament" : "Host Nations"}
            </button>
          ))}
        </div>

        <GlassCard>
          <div className="overflow-x-auto">
            <div className="inline-grid gap-1.5" style={{ gridTemplateColumns: `repeat(${MAP_LAYOUT[0].length}, minmax(58px, 1fr))` }}>
              {MAP_LAYOUT.flat().map((id, i) => {
                const t = id ? TEAMS.find((x) => x.id === id) : null;
                return (
                  <button
                    key={i}
                    onMouseEnter={() => id && setHover(id)}
                    onMouseLeave={() => setHover(null)}
                    className="aspect-square rounded-md flex items-center justify-center text-lg transition-all relative"
                    style={{
                      background: colorFor(id),
                      border: id ? "1px solid rgba(245,166,35,0.2)" : "none",
                      cursor: id ? "pointer" : "default",
                    }}
                    aria-label={t?.name ?? "empty"}
                  >
                    {t && <span style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.6))" }}>{t.flag}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-xs" style={{ color: "#9CA3AF" }}>
            <span className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded" style={{ background: "#FFD700" }} /> Host nation</span>
            <span className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded" style={{ background: "#F5A623" }} /> Champion</span>
            <span className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded" style={{ background: "rgba(245,166,35,0.25)" }} /> Participated</span>
          </div>
        </GlassCard>

        {hoveredTeam && (
          <GlassCard className="mt-5">
            <div className="flex items-center gap-4">
              <span style={{ fontSize: 40 }}>{hoveredTeam.flag}</span>
              <div className="min-w-0">
                <h4 className="wc-display" style={{ fontSize: 22, color: "#FFD700" }}>{hoveredTeam.name}</h4>
                <p className="text-xs text-[#9CA3AF] truncate">{hoveredTeam.appearances} appearances · {hoveredTeam.totalGoals} goals · {hoveredTeam.bestFinish}</p>
              </div>
            </div>
          </GlassCard>
        )}
      </section>
    </WorldCupLayout>
  );
}
