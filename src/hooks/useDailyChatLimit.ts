import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'cyber-saathi-daily-usage';
export const DAILY_LIMIT = 7;

interface UsageRecord {
  date: string; // YYYY-MM-DD (local)
  count: number;
}

const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const readUsage = (): UsageRecord => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: todayKey(), count: 0 };
    const parsed = JSON.parse(raw) as UsageRecord;
    if (parsed.date !== todayKey()) return { date: todayKey(), count: 0 };
    return parsed;
  } catch {
    return { date: todayKey(), count: 0 };
  }
};

const writeUsage = (rec: UsageRecord) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rec));
  } catch {
    /* ignore */
  }
};

export function useDailyChatLimit() {
  const [count, setCount] = useState<number>(() => readUsage().count);

  // Re-sync at midnight rollover or when tab regains focus
  useEffect(() => {
    const sync = () => setCount(readUsage().count);
    window.addEventListener('focus', sync);
    const interval = window.setInterval(sync, 60_000);
    return () => {
      window.removeEventListener('focus', sync);
      window.clearInterval(interval);
    };
  }, []);

  const remaining = Math.max(0, DAILY_LIMIT - count);
  const limitReached = count >= DAILY_LIMIT;

  const increment = useCallback(() => {
    const current = readUsage();
    const next = { date: todayKey(), count: current.count + 1 };
    writeUsage(next);
    setCount(next.count);
  }, []);

  return { count, remaining, limitReached, limit: DAILY_LIMIT, increment };
}
