import { memo, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import type { ThreatEvent, SeverityLevel } from "@/lib/cyberguard/threat-map-data";
import { countryCoordinates, severityColors, countryNames } from "@/lib/cyberguard/threat-map-data";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
  events: ThreatEvent[];
  selectedEventId: string | null;
  onEventHover: (event: ThreatEvent | null) => void;
  onEventClick: (event: ThreatEvent) => void;
}

const getStrokeWidth = (severity: SeverityLevel): number => {
  const widths: Record<SeverityLevel, number> = {
    Low: 1,
    Medium: 1.5,
    High: 2,
    Critical: 2.5,
  };
  return widths[severity];
};

const AttackArc = memo(({ event, isSelected, onHover, onClick }: {
  event: ThreatEvent;
  isSelected: boolean;
  onHover: (event: ThreatEvent | null) => void;
  onClick: (event: ThreatEvent) => void;
}) => {
  const sourceCoords = countryCoordinates[event.sourceCountry];
  const targetCoords = countryCoordinates[event.targetCountry];
  
  if (!sourceCoords || !targetCoords) return null;

  const color = severityColors[event.severity];
  const strokeWidth = getStrokeWidth(event.severity);
  const opacity = Math.max(0.3, 1 - event.animationProgress * 0.7);

  return (
    <g
      onMouseEnter={() => onHover(event)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(event)}
      style={{ cursor: "pointer" }}
    >
      {/* Attack arc line */}
      <Line
        from={sourceCoords}
        to={targetCoords}
        stroke={color}
        strokeWidth={isSelected ? strokeWidth * 2 : strokeWidth}
        strokeLinecap="round"
        strokeOpacity={isSelected ? 1 : opacity}
        strokeDasharray={isSelected ? "none" : "4 2"}
      />
      
      {/* Source marker (pulsing dot) */}
      <Marker coordinates={sourceCoords}>
        <circle
          r={isSelected ? 5 : 3}
          fill={color}
          fillOpacity={opacity}
        />
        {event.animationProgress < 0.3 && (
          <circle
            r={6}
            fill="none"
            stroke={color}
            strokeWidth={1}
            strokeOpacity={0.5}
          >
            <animate
              attributeName="r"
              from="3"
              to="10"
              dur="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              from="0.6"
              to="0"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </Marker>
      
      {/* Target marker */}
      <Marker coordinates={targetCoords}>
        <circle
          r={isSelected ? 4 : 2.5}
          fill={color}
          fillOpacity={opacity * 0.8}
        />
      </Marker>
    </g>
  );
});

AttackArc.displayName = "AttackArc";

const WorldMap = memo(({ events, selectedEventId, onEventHover, onEventClick }: WorldMapProps) => {
  const visibleEvents = useMemo(() => 
    events.filter(e => e.animationProgress < 1).slice(0, 30),
    [events]
  );

  const selectedEvent = events.find(e => e.id === selectedEventId);

  return (
    <div className="relative w-full h-full bg-background/50 rounded-lg overflow-hidden border border-border">
      {/* Grid overlay for cyber effect */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 140,
          center: [10, 30],
        }}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "hsl(var(--muted-foreground) / 0.3)", outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Attack arcs */}
        {visibleEvents.map((event) => (
          <AttackArc
            key={event.id}
            event={event}
            isSelected={event.id === selectedEventId}
            onHover={onEventHover}
            onClick={onEventClick}
          />
        ))}
      </ComposableMap>

      {/* Selected event tooltip overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 max-w-xs shadow-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: severityColors[selectedEvent.severity] }}
              />
              <span className="font-semibold text-sm">{selectedEvent.attackType}</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                {selectedEvent.severity}
              </span>
            </div>
            <div className="text-xs space-y-1 text-muted-foreground">
              <div>
                <span className="text-red-400">{countryNames[selectedEvent.sourceCountry]}</span>
                {" → "}
                <span className="text-blue-400">{countryNames[selectedEvent.targetCountry]}</span>
              </div>
              <div>Protocol: {selectedEvent.protocol} • Port: {selectedEvent.port}</div>
              <div className="font-mono text-[10px]">
                {selectedEvent.time.toLocaleTimeString()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-2">
        <div className="text-[10px] text-muted-foreground mb-1 font-medium">Severity</div>
        <div className="space-y-0.5">
          {(["Low", "Medium", "High", "Critical"] as const).map((level) => (
            <div key={level} className="flex items-center gap-1.5">
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: severityColors[level] }}
              />
              <span className="text-[10px] text-muted-foreground">{level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

WorldMap.displayName = "WorldMap";

export default WorldMap;
