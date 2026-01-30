import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { ThreatEvent, SeverityLevel } from "@/lib/cyberguard/threat-map-data";
import { countryNames, severityColors } from "@/lib/cyberguard/threat-map-data";

interface ThreatFeedProps {
  events: ThreatEvent[];
  selectedEventId: string | null;
  onEventClick: (event: ThreatEvent) => void;
}

const SeverityBadge = ({ severity }: { severity: SeverityLevel }) => {
  const bgClasses: Record<SeverityLevel, string> = {
    Low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    Medium: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    High: "bg-orange-500/20 text-orange-400 border-orange-500/40",
    Critical: "bg-red-500/20 text-red-400 border-red-500/40 animate-pulse",
  };

  return (
    <span className={cn(
      "px-1.5 py-0.5 text-[10px] font-semibold rounded border",
      bgClasses[severity]
    )}>
      {severity}
    </span>
  );
};

const ThreatFeed = ({ events, selectedEventId, onEventClick }: ThreatFeedProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-full bg-card/50 rounded-lg border border-border overflow-hidden">
      <div className="px-3 py-2 border-b border-border bg-card/80">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          Live Threat Feed
        </h3>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          <AnimatePresence mode="popLayout">
            {events.slice(0, 50).map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => onEventClick(event)}
                className={cn(
                  "p-2 rounded-md cursor-pointer transition-all duration-200",
                  "hover:bg-muted/60 border border-transparent",
                  selectedEventId === event.id && "bg-primary/10 border-primary/30"
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {formatTime(event.time)}
                  </span>
                  <SeverityBadge severity={event.severity} />
                </div>
                
                <div className="flex items-center gap-1 text-xs">
                  <span className="font-medium text-red-400 truncate max-w-[60px]">
                    {event.sourceCountry}
                  </span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                  <span className="font-medium text-blue-400 truncate max-w-[60px]">
                    {event.targetCountry}
                  </span>
                </div>
                
                <div className="text-[10px] text-muted-foreground mt-0.5 truncate">
                  {event.attackType} • {event.protocol}:{event.port}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {events.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Waiting for threat data...
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ThreatFeed;
