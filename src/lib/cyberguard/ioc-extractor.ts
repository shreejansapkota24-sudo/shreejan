// IOC (Indicators of Compromise) extraction utilities

export interface ExtractedIOCs {
  domains: string[];
  urls: string[];
  ips: string[];
  hashes: string[];
  wallets: string[];
  keywords: string[];
}

// Regex patterns for IOC extraction
const patterns = {
  // Domain pattern (simplified)
  domain: /(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}/g,
  
  // URL pattern
  url: /https?:\/\/[^\s<>"{}|\\^`\[\]]+/gi,
  
  // IPv4 pattern
  ipv4: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
  
  // IPv6 pattern (simplified)
  ipv6: /(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}/g,
  
  // MD5 hash
  md5: /\b[a-fA-F0-9]{32}\b/g,
  
  // SHA1 hash
  sha1: /\b[a-fA-F0-9]{40}\b/g,
  
  // SHA256 hash
  sha256: /\b[a-fA-F0-9]{64}\b/g,
  
  // Bitcoin address
  bitcoin: /\b[13][a-km-zA-HJ-NP-Z1-9]{25,34}\b/g,
  
  // Ethereum address
  ethereum: /\b0x[a-fA-F0-9]{40}\b/g,
};

// Suspicious keywords for phishing/malware detection
const suspiciousKeywords = [
  'urgent', 'immediately', 'verify your account', 'suspended',
  'unusual activity', 'confirm your identity', 'click here',
  'limited time', 'act now', 'password expired', 'security alert',
  'unauthorized access', 'login required', 'update payment',
  'seed phrase', 'recovery phrase', 'private key', 'wallet connect',
  'airdrop', 'claim your', 'winner', 'congratulations', 'prize',
  'free gift', 'exclusive offer', 'bitcoin', 'cryptocurrency',
  'transfer funds', 'wire transfer', 'gift card', 'itunes',
];

export function extractIOCs(text: string): ExtractedIOCs {
  const iocs: ExtractedIOCs = {
    domains: [],
    urls: [],
    ips: [],
    hashes: [],
    wallets: [],
    keywords: [],
  };

  if (!text) return iocs;

  const lowerText = text.toLowerCase();

  // Extract URLs
  const urls = text.match(patterns.url) || [];
  iocs.urls = [...new Set(urls)];

  // Extract domains (exclude common safe domains)
  const safeDomains = ['google.com', 'microsoft.com', 'apple.com', 'amazon.com', 'facebook.com'];
  const domains = text.match(patterns.domain) || [];
  iocs.domains = [...new Set(domains)]
    .filter(d => !safeDomains.some(safe => d.endsWith(safe)))
    .filter(d => !d.includes('@')); // Exclude email-like patterns

  // Extract IPs
  const ipv4s = text.match(patterns.ipv4) || [];
  const ipv6s = text.match(patterns.ipv6) || [];
  iocs.ips = [...new Set([...ipv4s, ...ipv6s])];

  // Extract hashes
  const md5s = text.match(patterns.md5) || [];
  const sha1s = text.match(patterns.sha1) || [];
  const sha256s = text.match(patterns.sha256) || [];
  iocs.hashes = [...new Set([...md5s, ...sha1s, ...sha256s])];

  // Extract wallet addresses
  const bitcoins = text.match(patterns.bitcoin) || [];
  const ethereums = text.match(patterns.ethereum) || [];
  iocs.wallets = [...new Set([...bitcoins, ...ethereums])];

  // Find suspicious keywords
  iocs.keywords = suspiciousKeywords.filter(keyword => 
    lowerText.includes(keyword.toLowerCase())
  );

  return iocs;
}

export function calculateRiskScore(iocs: ExtractedIOCs): { score: number; confidence: number } {
  let score = 0;
  let factors = 0;

  // Keywords are strong indicators
  score += Math.min(iocs.keywords.length * 15, 40);
  if (iocs.keywords.length > 0) factors++;

  // Suspicious domains
  const suspiciousTLDs = ['.ru', '.cn', '.xyz', '.tk', '.top', '.pw'];
  const suspDomains = iocs.domains.filter(d => 
    suspiciousTLDs.some(tld => d.endsWith(tld))
  );
  score += suspDomains.length * 10;
  if (iocs.domains.length > 0) factors++;

  // Wallet addresses often indicate crypto scams
  score += iocs.wallets.length * 20;
  if (iocs.wallets.length > 0) factors++;

  // Multiple hashes might indicate malware discussion
  if (iocs.hashes.length > 2) {
    score += 10;
    factors++;
  }

  // Raw IPs instead of domains is suspicious
  score += iocs.ips.length * 8;
  if (iocs.ips.length > 0) factors++;

  // Cap score at 100
  score = Math.min(score, 100);

  // Confidence based on number of factors found
  const confidence = Math.min(30 + factors * 15, 95);

  return { score, confidence };
}

export function getVerdict(score: number): 'Likely Safe' | 'Suspicious' | 'Likely Malicious' {
  if (score >= 60) return 'Likely Malicious';
  if (score >= 30) return 'Suspicious';
  return 'Likely Safe';
}

export function getRiskLabel(score: number): 'Low' | 'Medium' | 'High' | 'Critical' {
  if (score >= 75) return 'Critical';
  if (score >= 50) return 'High';
  if (score >= 25) return 'Medium';
  return 'Low';
}
