import { memo, useMemo, useState } from "react";
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
import { getCountryProfile, riskLevelColors } from "@/lib/cyberguard/country-profiles";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO 3166-1 numeric to alpha-2 mapping for major countries
const numericToAlpha2: Record<string, string> = {
  "840": "US", "156": "CN", "643": "RU", "356": "IN", "076": "BR",
  "276": "DE", "250": "FR", "826": "GB", "392": "JP", "410": "KR",
  "036": "AU", "710": "ZA", "566": "NG", "484": "MX", "124": "CA",
  "792": "TR", "364": "IR", "360": "ID", "586": "PK", "724": "ES",
  "380": "IT", "528": "NL", "752": "SE", "804": "UA", "616": "PL",
  "702": "SG", "376": "IL", "704": "VN", "818": "EG", "682": "SA",
  "784": "AE", "458": "MY", "764": "TH", "608": "PH", "032": "AR",
  "152": "CL", "170": "CO", "604": "PE", "862": "VE",
};

interface WorldMapProps {
  events: ThreatEvent[];
  selectedEventId: string | null;
  selectedCountry: string | null;
  onEventHover: (event: ThreatEvent | null) => void;
  onEventClick: (event: ThreatEvent) => void;
  onCountryClick: (countryCode: string) => void;
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

const AttackArc = memo(({ 
  event, 
  isSelected, 
  isCountrySelected,
  selectedCountry,
  onHover, 
  onClick 
}: {
  event: ThreatEvent;
  isSelected: boolean;
  isCountrySelected: boolean;
  selectedCountry: string | null;
  onHover: (event: ThreatEvent | null) => void;
  onClick: (event: ThreatEvent) => void;
}) => {
  const sourceCoords = countryCoordinates[event.sourceCountry];
  const targetCoords = countryCoordinates[event.targetCountry];
  
  if (!sourceCoords || !targetCoords) return null;

  const color = severityColors[event.severity];
  const strokeWidth = getStrokeWidth(event.severity);
  const baseOpacity = Math.max(0.3, 1 - event.animationProgress * 0.7);
  
  // If a country is selected, highlight arcs involving that country
  const involvesSelectedCountry = selectedCountry && 
    (event.sourceCountry === selectedCountry || event.targetCountry === selectedCountry);
  
  const opacity = isCountrySelected 
    ? (involvesSelectedCountry ? 1 : 0.15) 
    : baseOpacity;
  
  const finalStrokeWidth = involvesSelectedCountry 
    ? strokeWidth * 1.5 
    : (isSelected ? strokeWidth * 2 : strokeWidth);

  return (
    <g
      onMouseEnter={() => onHover(event)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(event)}
      style={{ cursor: "pointer" }}
    >
      <Line
        from={sourceCoords}
        to={targetCoords}
        stroke={color}
        strokeWidth={finalStrokeWidth}
        strokeLinecap="round"
        strokeOpacity={isSelected ? 1 : opacity}
        strokeDasharray={isSelected ? "none" : "4 2"}
      />
      
      <Marker coordinates={sourceCoords}>
        <circle
          r={isSelected || involvesSelectedCountry ? 5 : 3}
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
      
      <Marker coordinates={targetCoords}>
        <circle
          r={isSelected || involvesSelectedCountry ? 4 : 2.5}
          fill={color}
          fillOpacity={opacity * 0.8}
        />
      </Marker>
    </g>
  );
});

AttackArc.displayName = "AttackArc";

// Country node markers for clickable countries
const CountryNode = memo(({ 
  countryCode, 
  isSelected, 
  onHover,
  onClick 
}: {
  countryCode: string;
  isSelected: boolean;
  onHover: (code: string | null) => void;
  onClick: (code: string) => void;
}) => {
  const coords = countryCoordinates[countryCode];
  if (!coords) return null;

  const profile = getCountryProfile(countryCode);
  const color = riskLevelColors[profile.riskLevel];

  return (
    <Marker coordinates={coords}>
      <g
        onMouseEnter={() => onHover(countryCode)}
        onMouseLeave={() => onHover(null)}
        onClick={(e) => {
          e.stopPropagation();
          onClick(countryCode);
        }}
        style={{ cursor: "pointer" }}
      >
        {/* Outer glow when selected */}
        {isSelected && (
          <>
            <circle
              r={16}
              fill={color}
              fillOpacity={0.2}
            >
              <animate
                attributeName="r"
                values="12;18;12"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              r={12}
              fill="none"
              stroke={color}
              strokeWidth={2}
              strokeOpacity={0.6}
            />
          </>
        )}
        
        {/* Main node */}
        <circle
          r={isSelected ? 8 : 6}
          fill={color}
          fillOpacity={isSelected ? 1 : 0.8}
          stroke="hsl(var(--background))"
          strokeWidth={1.5}
        />
        
        {/* Inner highlight */}
        <circle
          r={isSelected ? 3 : 2}
          fill="white"
          fillOpacity={0.4}
        />
      </g>
    </Marker>
  );
});

CountryNode.displayName = "CountryNode";

const WorldMap = memo(({ 
  events, 
  selectedEventId, 
  selectedCountry,
  onEventHover, 
  onEventClick,
  onCountryClick 
}: WorldMapProps) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [hoveredGeoCountry, setHoveredGeoCountry] = useState<string | null>(null);
  
  const visibleEvents = useMemo(() => 
    events.filter(e => e.animationProgress < 1).slice(0, 30),
    [events]
  );

  const selectedEvent = events.find(e => e.id === selectedEventId);
  const isCountrySelected = !!selectedCountry;

  // Get country code from geography properties
  const getCountryCode = (geo: any): string | null => {
    const numericCode = geo.id?.toString().padStart(3, '0');
    return numericToAlpha2[numericCode] || null;
  };

  return (
    <div className="relative w-full h-full bg-background/50 rounded-lg overflow-hidden border border-border">
      {/* Grid overlay */}
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
            geographies.map((geo) => {
              const countryCode = getCountryCode(geo);
              const isGeoSelected = countryCode === selectedCountry;
              const isGeoHovered = countryCode === hoveredGeoCountry;
              
              return (
                <Tooltip key={geo.rsmKey}>
                  <TooltipTrigger asChild>
                    <Geography
                      geography={geo}
                      fill={
                        isGeoSelected 
                          ? "hsl(var(--primary) / 0.4)" 
                          : isCountrySelected 
                            ? "hsl(var(--muted) / 0.5)"
                            : "hsl(var(--muted))"
                      }
                      stroke={
                        isGeoSelected 
                          ? "hsl(var(--primary))" 
                          : "hsl(var(--border))"
                      }
                      strokeWidth={isGeoSelected ? 1.5 : 0.5}
                      style={{
                        default: { 
                          outline: "none",
                          transition: "all 0.2s ease-in-out",
                        },
                        hover: { 
                          fill: countryCode 
                            ? "hsl(var(--primary) / 0.3)" 
                            : "hsl(var(--muted-foreground) / 0.3)", 
                          outline: "none",
                          cursor: countryCode ? "pointer" : "default",
                        },
                        pressed: { outline: "none" },
                      }}
                      onMouseEnter={() => countryCode && setHoveredGeoCountry(countryCode)}
                      onMouseLeave={() => setHoveredGeoCountry(null)}
                      onClick={() => countryCode && onCountryClick(countryCode)}
                    />
                  </TooltipTrigger>
                  {countryCode && isGeoHovered && (
                    <TooltipContent side="top" className="bg-card border-border">
                      <p className="font-medium">{countryNames[countryCode] || countryCode}</p>
                      <p className="text-xs text-muted-foreground">Click for details</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })
          }
        </Geographies>

        {/* Attack arcs */}
        {visibleEvents.map((event) => (
          <AttackArc
            key={event.id}
            event={event}
            isSelected={event.id === selectedEventId}
            isCountrySelected={isCountrySelected}
            selectedCountry={selectedCountry}
            onHover={onEventHover}
            onClick={onEventClick}
          />
        ))}

        {/* Country nodes with tooltips */}
        {Object.keys(countryCoordinates).map((code) => (
          <Tooltip key={code}>
            <TooltipTrigger asChild>
              <g>
                <CountryNode
                  countryCode={code}
                  isSelected={code === selectedCountry}
                  onHover={setHoveredCountry}
                  onClick={onCountryClick}
                />
              </g>
            </TooltipTrigger>
            {hoveredCountry === code && !selectedCountry && (
              <TooltipContent side="top" className="bg-card border-border">
                <p className="font-medium">{countryNames[code]}</p>
                <p className="text-xs text-muted-foreground">Click for details</p>
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </ComposableMap>

      {/* Selected event tooltip */}
      <AnimatePresence>
        {selectedEvent && !selectedCountry && (
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
