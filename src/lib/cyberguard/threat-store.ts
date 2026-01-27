import { create } from 'zustand';
import type { ThreatLog, DashboardStats } from './types';

interface ThreatStore {
  logs: ThreatLog[];
  addLog: (log: Omit<ThreatLog, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
  getStats: () => DashboardStats;
}

export const useThreatStore = create<ThreatStore>((set, get) => ({
  logs: [],
  
  addLog: (log) => {
    const newLog: ThreatLog = {
      ...log,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    set((state) => ({
      logs: [newLog, ...state.logs].slice(0, 100), // Keep last 100 logs
    }));
  },

  clearLogs: () => set({ logs: [] }),

  getStats: () => {
    const logs = get().logs;
    const urlScans = logs.filter(l => l.type === 'url');
    const fileScans = logs.filter(l => l.type === 'file');
    const threats = logs.filter(l => l.threatLevel !== 'safe');
    const avgRisk = logs.length > 0 
      ? logs.reduce((sum, l) => sum + l.riskScore, 0) / logs.length 
      : 0;

    return {
      totalScans: logs.length,
      threatsDetected: threats.length,
      urlsScanned: urlScans.length,
      filesScanned: fileScans.length,
      averageRiskScore: Math.round(avgRisk),
    };
  },
}));
