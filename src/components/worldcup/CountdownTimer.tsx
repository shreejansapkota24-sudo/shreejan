import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NEXT_WC_DATE } from "@/data/worldcup/mockData";

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms / 3600000) % 24);
  const m = Math.floor((ms / 60000) % 60);
  const s = Math.floor((ms / 1000) % 60);
  return { d, h, m, s };
}

const Unit = ({ value, label }: { value: number; label: string }) => (
  <div
    className="flex flex-col items-center justify-center overflow-hidden"
    style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(245,166,35,0.35)",
      borderRadius: 14,
      padding: "20px 18px",
      minWidth: 92,
      backdropFilter: "blur(8px)",
      boxShadow: "0 0 24px rgba(245,166,35,0.08)",
    }}
  >
    <div className="relative h-[58px] w-full flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -40, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: 40, opacity: 0, rotateX: 90 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="wc-display tabular-nums"
          style={{ fontSize: 54, lineHeight: 1, color: "#FFD700", textShadow: "0 0 18px rgba(245,166,35,0.4)" }}
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="mt-2 text-[10px] tracking-[0.3em] uppercase" style={{ color: "#9CA3AF", fontFamily: "'JetBrains Mono', monospace" }}>
      {label}
    </span>
  </div>
);

export default function CountdownTimer() {
  const [t, setT] = useState(() => diff(NEXT_WC_DATE));
  useEffect(() => {
    const id = setInterval(() => setT(diff(NEXT_WC_DATE)), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
      <Unit value={t.d} label="Days" />
      <Unit value={t.h} label="Hours" />
      <Unit value={t.m} label="Minutes" />
      <Unit value={t.s} label="Seconds" />
    </div>
  );
}
