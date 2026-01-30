import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, TrendingUp, TrendingDown, Activity, Target, Crosshair, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import type { ThreatEvent, SeverityLevel } from "@/lib/cyberguard/threat-map-data";
import { countryNames, severityColors, severityWeights } from "@/lib/cyberguard/threat-map-data";
import { 
  getCountryProfile, 
  riskLevelBgClasses, 
  type RiskLevel 
} from "@/lib/cyberguard/country-profiles";

interface CountryDetailsPanelProps {
  countryCode: string | null;
  events: ThreatEvent[];
  onClose: () => void;
  className?: string;
}

const SeverityBadge = ({ severity }: { severity: SeverityLevel }) => {
  const bgClasses: Record<SeverityLevel, string> = {
    Low: "bg-emerald-500/20 text-emerald-400",
    Medium: "bg-amber-500/20 text-amber-400",
    High: "bg-orange-500/20 text-orange-400",
    Critical: "bg-red-500/20 text-red-400",
  };

  return (
    <span className={cn("px-1.5 py-0.5 text-[10px] font-semibold rounded", bgClasses[severity])}>
      {severity}
    </span>
  );
};

const RiskBadge = ({ level }: { level: RiskLevel }) => (
  <span className={cn(
    "px-2 py-1 text-xs font-semibold rounded border",
    riskLevelBgClasses[level],
    level === "Critical" && "animate-pulse"
  )}>
    {level}
  </span>
);

const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  trend 
}: { 
  icon: typeof Shield; 
  label: string; 
  value: number | string;
  trend?: "up" | "down";
}) => (
  <div className="bg-background/50 rounded-lg p-3 border border-border">
    <div className="flex items-center justify-between mb-1">
      <Icon className="w-4 h-4 text-muted-foreground" />
      {trend && (
        trend === "up" 
          ? <TrendingUp className="w-3 h-3 text-red-400" />
          : <TrendingDown className="w-3 h-3 text-emerald-400" />
      )}
    </div>
    <p className="text-lg font-bold text-foreground">{value}</p>
    <p className="text-[10px] text-muted-foreground">{label}</p>
  </div>
);

const CountryDetailsPanel = ({ 
  countryCode, 
  events, 
  onClose,
  className 
}: CountryDetailsPanelProps) => {
  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const profile = useMemo(() => 
    countryCode ? getCountryProfile(countryCode) : null, 
    [countryCode]
  );

  const countryEvents = useMemo(() => 
    events.filter(e => 
      e.sourceCountry === countryCode || e.targetCountry === countryCode
    ).slice(0, 10),
    [events, countryCode]
  );

  const incomingCount = useMemo(() => 
    events.filter(e => e.targetCountry === countryCode).length,
    [events, countryCode]
  );

  const outgoingCount = useMemo(() => 
    events.filter(e => e.sourceCountry === countryCode).length,
    [events, countryCode]
  );

  // Calculate live severity score from recent events
  const liveSeverityScore = useMemo(() => {
    if (!profile || countryEvents.length === 0) return profile?.baseSeverityScore || 0;
    
    const eventWeight = countryEvents.reduce((sum, e) => sum + severityWeights[e.severity], 0);
    const maxWeight = countryEvents.length * severityWeights.Critical;
    const liveScore = (eventWeight / maxWeight) * 100;
    
    // Blend base score with live activity
    return Math.round((profile.baseSeverityScore * 0.6) + (liveScore * 0.4));
  }, [profile, countryEvents]);

  // Top sources/targets from recent events
  const topRelatedCountries = useMemo(() => {
    if (!countryCode) return [];
    
    const counts = new Map<string, number>();
    events.forEach(e => {
      if (e.sourceCountry === countryCode) {
        counts.set(e.targetCountry, (counts.get(e.targetCountry) || 0) + 1);
      } else if (e.targetCountry === countryCode) {
        counts.set(e.sourceCountry, (counts.get(e.sourceCountry) || 0) + 1);
      }
    });
    
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([code, count]) => ({ code, name: countryNames[code] || code, count }));
  }, [events, countryCode]);

  const formatTime = (date: Date) => 
    date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

  if (!countryCode || !profile) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={cn(
          "bg-card/95 backdrop-blur-md border border-border rounded-lg overflow-hidden flex flex-col",
          className
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border bg-card/80">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{profile.countryName}</h3>
                <p className="text-xs text-muted-foreground">{countryCode}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <RiskBadge level={profile.riskLevel} />
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {/* Live Stats Grid */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                Live Statistics
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <StatCard 
                  icon={Activity} 
                  label="Attacks (24h)" 
                  value={profile.baseAttacks24h.toLocaleString()}
                />
                <StatCard 
                  icon={Target} 
                  label="Incoming (1h)" 
                  value={profile.baseIncoming1h + incomingCount}
                  trend={incomingCount > 5 ? "up" : undefined}
                />
                <StatCard 
                  icon={Crosshair} 
                  label="Outgoing (1h)" 
                  value={profile.baseOutgoing1h + outgoingCount}
                  trend={outgoingCount > 5 ? "up" : undefined}
                />
                <StatCard 
                  icon={Shield} 
                  label="Severity Score" 
                  value={`${liveSeverityScore}/100`}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">
                Most common: <span className="text-primary">{profile.commonAttackType}</span>
              </p>
            </div>

            {/* Attack Type Breakdown */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                Attack Type Breakdown
              </h4>
              <div className="space-y-2">
                {Object.entries(profile.attackTypeBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .map(([type, percentage]) => (
                    <div key={type} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{type}</span>
                        <span className="font-medium text-foreground">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-1.5" />
                    </div>
                  ))}
              </div>
            </div>

            {/* Top Related Countries */}
            {topRelatedCountries.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                  {profile.isAttacker ? "Top Targets" : "Top Sources"}
                </h4>
                <div className="space-y-1">
                  {topRelatedCountries.map(({ code, name, count }) => (
                    <div 
                      key={code}
                      className="flex items-center justify-between py-1.5 px-2 rounded bg-background/50"
                    >
                      <span className="text-xs text-foreground">{name}</span>
                      <span className="text-xs text-muted-foreground">{count} events</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Events Table */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                Recent Events
              </h4>
              {countryEvents.length > 0 ? (
                <div className="space-y-1">
                  {countryEvents.map((event) => (
                    <div 
                      key={event.id}
                      className="p-2 rounded bg-background/50 border border-border/50"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {formatTime(event.time)}
                        </span>
                        <SeverityBadge severity={event.severity} />
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <span className={cn(
                          "font-medium",
                          event.sourceCountry === countryCode ? "text-primary" : "text-red-400"
                        )}>
                          {event.sourceCountry}
                        </span>
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        <span className={cn(
                          "font-medium",
                          event.targetCountry === countryCode ? "text-primary" : "text-blue-400"
                        )}>
                          {event.targetCountry}
                        </span>
                        <span className="text-muted-foreground ml-auto text-[10px]">
                          {event.attackType}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground text-center py-4">
                  No recent events
                </p>
              )}
            </div>
          </div>
        </ScrollArea>
      </motion.div>
    </AnimatePresence>
  );
};

export default CountryDetailsPanel;
