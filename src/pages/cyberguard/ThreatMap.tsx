import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Globe, Shield } from "lucide-react";
import CyberGuardNavbar from "@/components/cyberguard/CyberGuardNavbar";
import WorldMap from "@/components/cyberguard/WorldMap";
import ThreatFeed from "@/components/cyberguard/ThreatFeed";
import ThreatMapStats from "@/components/cyberguard/ThreatMapStats";
import ThreatMapControls from "@/components/cyberguard/ThreatMapControls";
import CountryDetailsPanel from "@/components/cyberguard/CountryDetailsPanel";
import { useThreatSimulation } from "@/hooks/useThreatSimulation";
import type { ThreatEvent } from "@/lib/cyberguard/threat-map-data";

const ThreatMap = () => {
  const [isSimulating, setIsSimulating] = useState(true);
  const [intensity, setIntensity] = useState(3);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const { events, attacksPerMinute } = useThreatSimulation({
    isSimulating,
    intensity,
  });

  const handleEventClick = useCallback((event: ThreatEvent) => {
    setSelectedEventId((prev) => (prev === event.id ? null : event.id));
    setSelectedCountry(null);
  }, []);

  const handleEventHover = useCallback((event: ThreatEvent | null) => {
    if (event && !selectedCountry) {
      setSelectedEventId(event.id);
    }
  }, [selectedCountry]);

  const handleCountryClick = useCallback((countryCode: string) => {
    setSelectedCountry((prev) => (prev === countryCode ? null : countryCode));
    setSelectedEventId(null);
  }, []);

  const handleCloseCountryPanel = useCallback(() => {
    setSelectedCountry(null);
  }, []);

  return (
    <div className="min-h-screen bg-background dark">
      <CyberGuardNavbar />

      <main className="pt-24 pb-6 px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/20">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                CyberGuard <span className="text-primary">Threat Map</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Simulated live threat telemetry for demonstration
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <ThreatMapStats events={events} attacksPerMinute={attacksPerMinute} />
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <ThreatMapControls
            isSimulating={isSimulating}
            onToggleSimulation={() => setIsSimulating(!isSimulating)}
            intensity={intensity}
            onIntensityChange={setIntensity}
          />
        </motion.div>

        {/* Main Content: Map + Feed/Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid lg:grid-cols-[1fr_320px] gap-4 h-[calc(100vh-340px)] min-h-[400px]"
        >
          {/* World Map */}
          <div className="relative">
            <WorldMap
              events={events}
              selectedEventId={selectedEventId}
              selectedCountry={selectedCountry}
              onEventHover={handleEventHover}
              onEventClick={handleEventClick}
              onCountryClick={handleCountryClick}
            />
          </div>

          {/* Right Panel: Country Details or Threat Feed */}
          <div className="h-full">
            {selectedCountry ? (
              <CountryDetailsPanel
                countryCode={selectedCountry}
                events={events}
                onClose={handleCloseCountryPanel}
                className="h-full"
              />
            ) : (
              <ThreatFeed
                events={events}
                selectedEventId={selectedEventId}
                onEventClick={handleEventClick}
              />
            )}
          </div>
        </motion.div>

        {/* Mobile Country Panel (bottom drawer style) */}
        {selectedCountry && (
          <div className="lg:hidden mt-4">
            <CountryDetailsPanel
              countryCode={selectedCountry}
              events={events}
              onClose={handleCloseCountryPanel}
              className="max-h-[60vh]"
            />
          </div>
        )}

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            Simulated data for demonstration purposes only
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default ThreatMap;
