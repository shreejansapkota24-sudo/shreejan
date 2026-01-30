import { motion } from "framer-motion";
import { Activity, Target, Crosshair, Zap, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ThreatEvent } from "@/lib/cyberguard/threat-map-data";
import { countryNames, getTopItem, calculateRiskScore } from "@/lib/cyberguard/threat-map-data";

interface ThreatMapStatsProps {
  events: ThreatEvent[];
  attacksPerMinute: number;
}

const ThreatMapStats = ({ events, attacksPerMinute }: ThreatMapStatsProps) => {
  const topSource = getTopItem(events.slice(0, 30), e => e.sourceCountry);
  const topTarget = getTopItem(events.slice(0, 30), e => e.targetCountry);
  const topAttackType = getTopItem(events.slice(0, 30), e => e.attackType);
  const riskScore = calculateRiskScore(events);

  const getRiskColor = (score: number) => {
    if (score < 25) return "text-emerald-500";
    if (score < 50) return "text-amber-500";
    if (score < 75) return "text-orange-500";
    return "text-red-500";
  };

  const stats = [
    {
      icon: Activity,
      label: "Attacks/min",
      value: attacksPerMinute.toFixed(1),
      color: "text-cyan-400",
    },
    {
      icon: Crosshair,
      label: "Top Source",
      value: topSource ? countryNames[topSource] || topSource : "—",
      color: "text-red-400",
    },
    {
      icon: Target,
      label: "Top Target",
      value: topTarget ? countryNames[topTarget] || topTarget : "—",
      color: "text-blue-400",
    },
    {
      icon: Zap,
      label: "Attack Type",
      value: topAttackType || "—",
      color: "text-purple-400",
    },
    {
      icon: Gauge,
      label: "Risk Level",
      value: `${riskScore}/100`,
      color: getRiskColor(riskScore),
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card/80 border border-border rounded-lg p-3 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-1">
            <stat.icon className={cn("w-4 h-4", stat.color)} />
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
          <p className={cn("text-sm font-bold truncate", stat.color)}>
            {stat.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default ThreatMapStats;
