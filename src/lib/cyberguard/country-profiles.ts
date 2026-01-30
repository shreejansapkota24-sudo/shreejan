import type { SeverityLevel, AttackType } from "./threat-map-data";
import { attackTypes, countryNames } from "./threat-map-data";

// Seeded random number generator for stable country profiles
function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  
  return function() {
    hash = Math.sin(hash) * 10000;
    return hash - Math.floor(hash);
  };
}

export type RiskLevel = "Safe" | "Moderate" | "High Risk" | "Critical";

export interface CountryProfile {
  countryCode: string;
  countryName: string;
  riskLevel: RiskLevel;
  baseAttacks24h: number;
  baseIncoming1h: number;
  baseOutgoing1h: number;
  commonAttackType: AttackType;
  baseSeverityScore: number;
  attackTypeBreakdown: Record<string, number>;
  isAttacker: boolean; // More often a source than target
}

const attackerCountries = new Set(["CN", "RU", "IR", "KR", "NG", "PK", "VN", "UA", "TR", "BR"]);
const targetCountries = new Set(["US", "GB", "DE", "FR", "JP", "AU", "CA", "NL", "SG", "IL"]);

export function generateCountryProfile(countryCode: string): CountryProfile {
  const random = seededRandom(countryCode + "_profile_v2");
  const countryName = countryNames[countryCode] || countryCode;
  
  // Determine if country is primarily attacker or target
  const isAttacker = attackerCountries.has(countryCode) || 
    (!targetCountries.has(countryCode) && random() > 0.5);
  
  // Risk level based on country type and random factor
  const riskRand = random();
  let riskLevel: RiskLevel;
  if (isAttacker) {
    if (riskRand < 0.3) riskLevel = "Critical";
    else if (riskRand < 0.6) riskLevel = "High Risk";
    else if (riskRand < 0.85) riskLevel = "Moderate";
    else riskLevel = "Safe";
  } else {
    if (riskRand < 0.15) riskLevel = "Critical";
    else if (riskRand < 0.35) riskLevel = "High Risk";
    else if (riskRand < 0.65) riskLevel = "Moderate";
    else riskLevel = "Safe";
  }
  
  // Base attack numbers (scaled by risk)
  const riskMultiplier = 
    riskLevel === "Critical" ? 4 :
    riskLevel === "High Risk" ? 2.5 :
    riskLevel === "Moderate" ? 1.5 : 1;
  
  const baseAttacks24h = Math.floor((500 + random() * 2000) * riskMultiplier);
  const baseIncoming1h = Math.floor((20 + random() * 100) * riskMultiplier * (isAttacker ? 0.3 : 1));
  const baseOutgoing1h = Math.floor((20 + random() * 100) * riskMultiplier * (isAttacker ? 1 : 0.3));
  
  // Most common attack type
  const attackTypeIndex = Math.floor(random() * attackTypes.length);
  const commonAttackType = attackTypes[attackTypeIndex];
  
  // Severity score
  const baseSeverityScore = Math.floor(
    riskLevel === "Critical" ? 75 + random() * 25 :
    riskLevel === "High Risk" ? 50 + random() * 25 :
    riskLevel === "Moderate" ? 25 + random() * 25 :
    random() * 25
  );
  
  // Attack type breakdown
  const attackTypeBreakdown: Record<string, number> = {};
  const breakdownTypes = ["DDoS", "Phishing", "Malware", "Ransomware", "Port Scan", "Credential Stuffing"];
  let remaining = 100;
  
  breakdownTypes.forEach((type, index) => {
    if (index === breakdownTypes.length - 1) {
      attackTypeBreakdown[type] = remaining;
    } else {
      const value = Math.floor(random() * (remaining / 2));
      attackTypeBreakdown[type] = value;
      remaining -= value;
    }
  });
  
  return {
    countryCode,
    countryName,
    riskLevel,
    baseAttacks24h,
    baseIncoming1h,
    baseOutgoing1h,
    commonAttackType,
    baseSeverityScore,
    attackTypeBreakdown,
    isAttacker,
  };
}

// Cache profiles for consistency
const profileCache = new Map<string, CountryProfile>();

export function getCountryProfile(countryCode: string): CountryProfile {
  if (!profileCache.has(countryCode)) {
    profileCache.set(countryCode, generateCountryProfile(countryCode));
  }
  return profileCache.get(countryCode)!;
}

export const riskLevelColors: Record<RiskLevel, string> = {
  "Safe": "#22c55e",
  "Moderate": "#eab308",
  "High Risk": "#f97316",
  "Critical": "#ef4444",
};

export const riskLevelBgClasses: Record<RiskLevel, string> = {
  "Safe": "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
  "Moderate": "bg-amber-500/20 text-amber-400 border-amber-500/40",
  "High Risk": "bg-orange-500/20 text-orange-400 border-orange-500/40",
  "Critical": "bg-red-500/20 text-red-400 border-red-500/40",
};
