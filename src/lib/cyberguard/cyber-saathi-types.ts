import type { ExtractedIOCs } from './ioc-extractor';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
  analysis?: AnalysisResult;
}

export interface Attachment {
  id: string;
  type: 'image' | 'file' | 'url' | 'text';
  name: string;
  data?: string; // Base64 for images, content for text
  url?: string;
  size?: number;
  mimeType?: string;
}

export interface AnalysisResult {
  verdict: 'Likely Safe' | 'Suspicious' | 'Likely Malicious';
  riskScore: number;
  confidence: number;
  reasons: string[];
  iocs: ExtractedIOCs;
  recommendedActions: string[];
  summary: string;
  disclaimer: string;
}

export interface IncidentReport {
  id: string;
  timestamp: Date;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  iocs: ExtractedIOCs;
  recommendations: string[];
  relatedScans: {
    urlScans?: string[];
    fileScans?: string[];
  };
  status: 'open' | 'investigating' | 'resolved';
}

export type QuickAction = 
  | 'analyze_url'
  | 'analyze_file'
  | 'analyze_screenshot'
  | 'summarize_logs'
  | 'create_incident';
