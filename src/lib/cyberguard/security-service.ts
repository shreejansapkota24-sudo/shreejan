import type { URLScanResult, FileScanResult, ThreatLevel } from './types';

// Suspicious URL patterns (phishing indicators)
const SUSPICIOUS_PATTERNS = [
  /paypal.*login/i,
  /secure.*bank/i,
  /verify.*account/i,
  /update.*password/i,
  /confirm.*identity/i,
  /\.ru\//i,
  /\.cn\//i,
  /bit\.ly/i,
  /tinyurl/i,
  /free.*gift/i,
  /winner.*prize/i,
  /urgent.*action/i,
  /suspended.*account/i,
  /\.xyz\//i,
  /\.tk\//i,
];

// Known malicious URL blacklist (sample)
const URL_BLACKLIST = [
  'malware-site.com',
  'phishing-example.net',
  'fake-bank-login.com',
  'steal-credentials.org',
  'virus-download.xyz',
  'ransomware-host.ru',
];

// Suspicious keywords
const SUSPICIOUS_KEYWORDS = [
  'login', 'password', 'verify', 'account', 'secure', 'bank',
  'paypal', 'amazon', 'microsoft', 'apple', 'google', 'facebook',
  'suspended', 'urgent', 'winner', 'prize', 'free', 'gift',
];

// Known malware hashes (sample SHA-256)
const MALWARE_HASHES: Record<string, string> = {
  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855': 'Empty File Signature',
  '275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f': 'EICAR Test Virus',
  '5d41402abc4b2a76b9719d911017c592': 'Trojan.Generic.12345',
  '098f6bcd4621d373cade4e832627b4f6': 'Malware.Ransomware.WannaCry',
  'd8e8fca2dc0f896fd7cb4cb0031ba249': 'Backdoor.Agent.XYZ',
  '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8': 'Spyware.KeyLogger.123',
  'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3': 'Worm.Conficker.A',
  '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12': 'Rootkit.Hidden.Process',
};

// Suspicious file extensions
const SUSPICIOUS_EXTENSIONS = [
  '.exe', '.bat', '.cmd', '.scr', '.pif', '.com',
  '.vbs', '.js', '.jar', '.msi', '.dll', '.ps1',
];

export async function scanURL(url: string): Promise<URLScanResult> {
  const startTime = performance.now();
  const matchedPatterns: string[] = [];
  const details: string[] = [];
  let riskScore = 0;

  // Normalize URL
  const normalizedUrl = url.toLowerCase();

  // Check blacklist
  for (const blacklisted of URL_BLACKLIST) {
    if (normalizedUrl.includes(blacklisted)) {
      matchedPatterns.push(`Blacklisted domain: ${blacklisted}`);
      riskScore += 50;
      details.push('URL found in known malicious domain blacklist');
    }
  }

  // Check suspicious patterns
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(normalizedUrl)) {
      matchedPatterns.push(`Pattern match: ${pattern.source}`);
      riskScore += 15;
    }
  }

  // Check suspicious keywords
  let keywordCount = 0;
  for (const keyword of SUSPICIOUS_KEYWORDS) {
    if (normalizedUrl.includes(keyword)) {
      keywordCount++;
    }
  }
  if (keywordCount > 0) {
    riskScore += keywordCount * 5;
    details.push(`Found ${keywordCount} suspicious keyword(s)`);
  }

  // Check for IP address instead of domain
  const ipPattern = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
  if (ipPattern.test(normalizedUrl)) {
    riskScore += 20;
    details.push('URL uses IP address instead of domain name');
    matchedPatterns.push('IP-based URL detected');
  }

  // Check for HTTP (not HTTPS)
  if (normalizedUrl.startsWith('http://')) {
    riskScore += 10;
    details.push('Insecure HTTP protocol detected');
  }

  // Check URL length (very long URLs are suspicious)
  if (url.length > 100) {
    riskScore += 10;
    details.push('Unusually long URL detected');
  }

  // Check for multiple subdomains
  const subdomainMatch = url.match(/\./g);
  if (subdomainMatch && subdomainMatch.length > 4) {
    riskScore += 15;
    details.push('Excessive subdomain depth detected');
  }

  // Cap risk score at 100
  riskScore = Math.min(riskScore, 100);

  // Determine threat level
  let threatLevel: ThreatLevel = 'safe';
  if (riskScore >= 60) {
    threatLevel = 'dangerous';
    details.unshift('HIGH RISK: Multiple threat indicators detected');
  } else if (riskScore >= 30) {
    threatLevel = 'suspicious';
    details.unshift('MEDIUM RISK: Some suspicious patterns found');
  } else {
    details.unshift('LOW RISK: No significant threats detected');
  }

  const scanTime = performance.now() - startTime;

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

  return {
    url,
    threatLevel,
    riskScore,
    details,
    matchedPatterns,
    scanTime,
  };
}

export async function generateFileHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function scanFile(file: File): Promise<FileScanResult> {
  const startTime = performance.now();
  const details: string[] = [];
  const matchedSignatures: string[] = [];
  let riskScore = 0;

  // Generate file hash
  const hash = await generateFileHash(file);

  // Check against known malware hashes
  if (MALWARE_HASHES[hash]) {
    riskScore = 100;
    matchedSignatures.push(MALWARE_HASHES[hash]);
    details.push(`CRITICAL: Known malware signature detected - ${MALWARE_HASHES[hash]}`);
  }

  // Check file extension
  const fileName = file.name.toLowerCase();
  for (const ext of SUSPICIOUS_EXTENSIONS) {
    if (fileName.endsWith(ext)) {
      riskScore += 25;
      details.push(`Potentially dangerous file extension: ${ext}`);
      matchedSignatures.push(`Suspicious extension: ${ext}`);
      break;
    }
  }

  // Check file size (very small or very large files)
  if (file.size < 100) {
    riskScore += 10;
    details.push('Unusually small file size');
  } else if (file.size > 100 * 1024 * 1024) {
    riskScore += 5;
    details.push('Large file size detected');
  }

  // Simulate heuristic analysis
  const heuristicScore = Math.random() * 20;
  if (heuristicScore > 15) {
    riskScore += 15;
    details.push('Heuristic analysis detected suspicious patterns');
  }

  // Cap risk score
  riskScore = Math.min(riskScore, 100);

  // Determine threat level
  let threatLevel: ThreatLevel = 'safe';
  if (riskScore >= 60) {
    threatLevel = 'dangerous';
    details.unshift('HIGH RISK: Malware indicators detected');
  } else if (riskScore >= 30) {
    threatLevel = 'suspicious';
    details.unshift('MEDIUM RISK: File requires further analysis');
  } else {
    details.unshift('LOW RISK: No malware signatures detected');
  }

  const scanTime = performance.now() - startTime;

  // Simulate scan delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

  return {
    fileName: file.name,
    fileSize: file.size,
    hash,
    threatLevel,
    riskScore,
    details,
    matchedSignatures,
    scanTime,
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getThreatColor(level: ThreatLevel): string {
  switch (level) {
    case 'safe': return 'text-emerald-500';
    case 'suspicious': return 'text-amber-500';
    case 'dangerous': return 'text-red-500';
  }
}

export function getThreatBgColor(level: ThreatLevel): string {
  switch (level) {
    case 'safe': return 'bg-emerald-500/20 border-emerald-500/50';
    case 'suspicious': return 'bg-amber-500/20 border-amber-500/50';
    case 'dangerous': return 'bg-red-500/20 border-red-500/50';
  }
}
