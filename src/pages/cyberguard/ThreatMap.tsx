import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Globe, Shield } from "lucide-react";
import CyberGuardNavbar from "@/components/cyberguard/CyberGuardNavbar";
import WorldMap from "@/components/cyberguard/WorldMap";
import ThreatFeed from "@/components/cyberguard/ThreatFeed";
import ThreatMapStats from "@/components/cyberguard/ThreatMapStats";
import ThreatMapControls from "@/components/cyberguard/ThreatMapControls";
import type { ThreatEvent } from "@/lib/cyberguard/threat-map-data";
import { generateRandomEvent } from "@/lib/cyberguard/threat-map-data";

const MAX_EVENTS = 50;
const ANIMATION_DURATION = 3000; // 3 seconds per arc
const ANIMATION_INTERVAL = 50; // Update animation every 50ms

const ThreatMap = () => {
  const [events, setEvents] = useState<ThreatEvent[]>([]);
  const [isSimulating, setIsSimulating] = useState(true);
  const [intensity, setIntensity] = useState(3);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [attacksPerMinute, setAttacksPerMinute] = useState(0);
  
  const eventCountRef = useRef(0);
  const lastMinuteRef = useRef(Date.now());

  // Calculate attacks per minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = (now - lastMinuteRef.current) / 1000;
      if (elapsed >= 10) {
        setAttacksPerMinute((eventCountRef.current / elapsed) * 60);
        eventCountRef.current = 0;
        lastMinuteRef.current = now;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Animation loop for arc progress
  useEffect(() => {
    const animationLoop = setInterval(() => {
      setEvents((prev) =>
        prev
          .map((event) => ({
            ...event,
            animationProgress: event.animationProgress + ANIMATION_INTERVAL / ANIMATION_DURATION,
          }))
          .filter((event) => event.animationProgress < 1.5) // Keep slightly longer for fade out
      );
    }, ANIMATION_INTERVAL);

    return () => clearInterval(animationLoop);
  }, []);

  // Event generation based on intensity
  useEffect(() => {
    if (!isSimulating) return;

    const generateEvent = () => {
      const newEvent: ThreatEvent = {
        ...generateRandomEvent(),
        animationProgress: 0,
      };

      setEvents((prev) => [newEvent, ...prev].slice(0, MAX_EVENTS));
      eventCountRef.current += 1;
    };

    // Base interval: 800-2500ms, adjusted by intensity
    const getInterval = () => {
      const baseMin = 2500 - intensity * 400; // At intensity 5: 500ms
      const baseMax = 2500 - intensity * 300; // At intensity 5: 1000ms
      return Math.random() * (baseMax - baseMin) + baseMin;
    };

    let timeoutId: NodeJS.Timeout;

    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        generateEvent();
        // At high intensity, sometimes generate multiple events
        if (intensity >= 4 && Math.random() > 0.5) {
          setTimeout(generateEvent, 100);
        }
        if (intensity === 5 && Math.random() > 0.6) {
          setTimeout(generateEvent, 200);
        }
        scheduleNext();
      }, getInterval());
    };

    scheduleNext();

    return () => clearTimeout(timeoutId);
  }, [isSimulating, intensity]);

  const handleEventClick = useCallback((event: ThreatEvent) => {
    setSelectedEventId((prev) => (prev === event.id ? null : event.id));
  }, []);

  const handleEventHover = useCallback((event: ThreatEvent | null) => {
    if (event) {
      setSelectedEventId(event.id);
    }
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

        {/* Main Content: Map + Feed */}
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
              onEventHover={handleEventHover}
              onEventClick={handleEventClick}
            />
          </div>

          {/* Threat Feed */}
          <div className="h-full">
            <ThreatFeed
              events={events}
              selectedEventId={selectedEventId}
              onEventClick={handleEventClick}
            />
          </div>
        </motion.div>

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
