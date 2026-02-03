// Country coordinates (approximate centers)
export const countryCoordinates: Record<string, [number, number]> = {
  US: [-95.7, 37.0],
  CN: [104.2, 35.9],
  RU: [105.3, 61.5],
  IN: [78.9, 20.6],
  BR: [-51.9, -14.2],
  DE: [10.5, 51.2],
  FR: [2.2, 46.2],
  GB: [-3.4, 55.4],
  JP: [138.3, 36.2],
  KR: [127.8, 35.9],
  AU: [133.8, -25.3],
  ZA: [22.9, -30.6],
  NG: [8.7, 9.1],
  MX: [-102.5, 23.6],
  CA: [-106.3, 56.1],
  TR: [35.2, 38.9],
  IR: [53.7, 32.4],
  ID: [113.9, -0.8],
  PK: [69.3, 30.4],
  ES: [-3.7, 40.5],
  IT: [12.6, 41.9],
  NL: [5.3, 52.1],
  SE: [18.6, 60.1],
  UA: [31.2, 48.4],
  PL: [19.1, 51.9],
  SG: [103.8, 1.4],
  IL: [34.9, 31.0],
  VN: [108.3, 14.1],
  NP: [84.1, 28.4],
};

export const countryNames: Record<string, string> = {
  US: "United States",
  CN: "China",
  RU: "Russia",
  IN: "India",
  BR: "Brazil",
  DE: "Germany",
  FR: "France",
  GB: "United Kingdom",
  JP: "Japan",
  KR: "South Korea",
  AU: "Australia",
  ZA: "South Africa",
  NG: "Nigeria",
  MX: "Mexico",
  CA: "Canada",
  TR: "Turkey",
  IR: "Iran",
  ID: "Indonesia",
  PK: "Pakistan",
  ES: "Spain",
  IT: "Italy",
  NL: "Netherlands",
  SE: "Sweden",
  UA: "Ukraine",
  PL: "Poland",
  SG: "Singapore",
  IL: "Israel",
  VN: "Vietnam",
  NP: "Nepal",
};

export const attackTypes = [
  "DDoS",
  "Phishing",
  "Malware",
  "Ransomware",
  "Bruteforce",
  "Exploit Attempt",
  "SQL Injection",
  "XSS Attack",
  "Port Scan",
  "Data Exfiltration",
] as const;

export type AttackType = (typeof attackTypes)[number];

export const severityLevels = ["Low", "Medium", "High", "Critical"] as const;
export type SeverityLevel = (typeof severityLevels)[number];

export const protocols = ["TCP", "UDP", "HTTP", "HTTPS", "SSH", "FTP", "SMTP", "DNS"] as const;
export type Protocol = (typeof protocols)[number];

export const commonPorts = [21, 22, 23, 25, 53, 80, 110, 143, 443, 445, 993, 995, 3306, 3389, 5432, 8080, 8443];

export interface ThreatEvent {
  id: string;
  time: Date;
  sourceCountry: string;
  targetCountry: string;
  attackType: AttackType;
  severity: SeverityLevel;
  protocol: Protocol;
  port: number;
  animationProgress: number;
}

export const severityColors: Record<SeverityLevel, string> = {
  Low: "#22c55e",
  Medium: "#eab308",
  High: "#f97316",
  Critical: "#ef4444",
};

export const severityWeights: Record<SeverityLevel, number> = {
  Low: 5,
  Medium: 15,
  High: 30,
  Critical: 50,
};

// Weighted random selection for more realistic attack origins
const attackerCountries = ["CN", "RU", "US", "IR", "KR", "IN", "BR", "NG", "PK", "VN", "UA", "TR"];
const targetCountries = ["US", "GB", "DE", "FR", "JP", "AU", "CA", "NL", "SG", "IL", "ES", "IT"];

export function generateRandomEvent(): Omit<ThreatEvent, "animationProgress"> {
  const countries = Object.keys(countryCoordinates);
  
  // Weighted selection for more realistic patterns
  const useWeighted = Math.random() > 0.3;
  const sourceCountry = useWeighted 
    ? attackerCountries[Math.floor(Math.random() * attackerCountries.length)]
    : countries[Math.floor(Math.random() * countries.length)];
  
  let targetCountry = useWeighted
    ? targetCountries[Math.floor(Math.random() * targetCountries.length)]
    : countries[Math.floor(Math.random() * countries.length)];
  
  // Ensure source and target are different
  while (targetCountry === sourceCountry) {
    targetCountry = countries[Math.floor(Math.random() * countries.length)];
  }

  // Weighted severity (more medium/high, fewer critical)
  const severityRand = Math.random();
  let severity: SeverityLevel;
  if (severityRand < 0.35) severity = "Low";
  else if (severityRand < 0.65) severity = "Medium";
  else if (severityRand < 0.90) severity = "High";
  else severity = "Critical";

  return {
    id: crypto.randomUUID(),
    time: new Date(),
    sourceCountry,
    targetCountry,
    attackType: attackTypes[Math.floor(Math.random() * attackTypes.length)],
    severity,
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    port: commonPorts[Math.floor(Math.random() * commonPorts.length)],
  };
}

export function calculateRiskScore(events: ThreatEvent[]): number {
  if (events.length === 0) return 0;
  
  const recentEvents = events.slice(0, 30);
  const totalWeight = recentEvents.reduce((sum, event) => sum + severityWeights[event.severity], 0);
  const maxPossible = 30 * severityWeights.Critical;
  
  return Math.min(100, Math.round((totalWeight / maxPossible) * 100 * 2.5));
}

export function getTopItem<T>(events: ThreatEvent[], getter: (e: ThreatEvent) => T): T | null {
  if (events.length === 0) return null;
  
  const counts = new Map<T, number>();
  events.forEach(e => {
    const key = getter(e);
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  
  let maxCount = 0;
  let topItem: T | null = null;
  counts.forEach((count, item) => {
    if (count > maxCount) {
      maxCount = count;
      topItem = item;
    }
  });
  
  return topItem;
}
