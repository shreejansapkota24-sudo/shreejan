import { useState, useEffect, useCallback, useRef } from "react";
import type { ThreatEvent } from "@/lib/cyberguard/threat-map-data";
import { generateRandomEvent } from "@/lib/cyberguard/threat-map-data";

const MAX_EVENTS = 60;
const ANIMATION_DURATION = 3000;
const ANIMATION_INTERVAL = 50;

interface UseThreatSimulationOptions {
  isSimulating: boolean;
  intensity: number;
}

interface UseThreatSimulationResult {
  events: ThreatEvent[];
  attacksPerMinute: number;
  getCountryEvents: (countryCode: string) => ThreatEvent[];
  getIncomingAttacks: (countryCode: string) => ThreatEvent[];
  getOutgoingAttacks: (countryCode: string) => ThreatEvent[];
}

export function useThreatSimulation({
  isSimulating,
  intensity,
}: UseThreatSimulationOptions): UseThreatSimulationResult {
  const [events, setEvents] = useState<ThreatEvent[]>([]);
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
            animationProgress:
              event.animationProgress + ANIMATION_INTERVAL / ANIMATION_DURATION,
          }))
          .filter((event) => event.animationProgress < 1.5)
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

    const getInterval = () => {
      const baseMin = 2500 - intensity * 400;
      const baseMax = 2500 - intensity * 300;
      return Math.random() * (baseMax - baseMin) + baseMin;
    };

    let timeoutId: NodeJS.Timeout;

    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        generateEvent();
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

  const getCountryEvents = useCallback(
    (countryCode: string) => {
      return events.filter(
        (e) => e.sourceCountry === countryCode || e.targetCountry === countryCode
      );
    },
    [events]
  );

  const getIncomingAttacks = useCallback(
    (countryCode: string) => {
      return events.filter((e) => e.targetCountry === countryCode);
    },
    [events]
  );

  const getOutgoingAttacks = useCallback(
    (countryCode: string) => {
      return events.filter((e) => e.sourceCountry === countryCode);
    },
    [events]
  );

  return {
    events,
    attacksPerMinute,
    getCountryEvents,
    getIncomingAttacks,
    getOutgoingAttacks,
  };
}
