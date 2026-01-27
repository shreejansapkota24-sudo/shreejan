export type ThreatLevel = 'safe' | 'suspicious' | 'dangerous';
export type ScanType = 'url' | 'file';

export interface ThreatLog {
  id: string;
  timestamp: Date;
  type: ScanType;
  target: string;
  threatLevel: ThreatLevel;
  details: string;
  riskScore: number;
}

export interface URLScanResult {
  url: string;
  threatLevel: ThreatLevel;
  riskScore: number;
  details: string[];
  matchedPatterns: string[];
  scanTime: number;
}

export interface FileScanResult {
  fileName: string;
  fileSize: number;
  hash: string;
  threatLevel: ThreatLevel;
  riskScore: number;
  details: string[];
  matchedSignatures: string[];
  scanTime: number;
}

export interface DashboardStats {
  totalScans: number;
  threatsDetected: number;
  urlsScanned: number;
  filesScanned: number;
  averageRiskScore: number;
}
