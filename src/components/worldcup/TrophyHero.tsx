import { motion } from "framer-motion";

export default function TrophyHero() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto"
      style={{ width: 180, height: 220 }}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.25, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle, rgba(255,215,0,0.45) 0%, rgba(245,166,35,0) 70%)", filter: "blur(8px)" }}
      />
      <motion.svg
        viewBox="0 0 200 240"
        className="relative"
        animate={{ y: [0, -6, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 12px 28px rgba(245,166,35,0.45))" }}
      >
        <defs>
          <linearGradient id="gold" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFE27A" />
            <stop offset="50%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#B07515" />
          </linearGradient>
        </defs>
        {/* globe */}
        <ellipse cx="100" cy="70" rx="42" ry="46" fill="url(#gold)" stroke="#FFD700" strokeWidth="1.5" />
        <path d="M58 70 Q100 50 142 70 Q100 90 58 70 Z" fill="none" stroke="#B07515" strokeWidth="1" opacity="0.6" />
        <ellipse cx="100" cy="70" rx="14" ry="46" fill="none" stroke="#B07515" strokeWidth="1" opacity="0.6" />
        {/* twisted body */}
        <path d="M88 100 Q70 130 88 160 L112 160 Q130 130 112 100 Z" fill="url(#gold)" stroke="#FFD700" strokeWidth="1.5" />
        <path d="M92 105 Q80 132 92 155" stroke="#B07515" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M108 105 Q120 132 108 155" stroke="#B07515" strokeWidth="1" fill="none" opacity="0.5" />
        {/* base */}
        <rect x="70" y="160" width="60" height="14" rx="2" fill="url(#gold)" stroke="#FFD700" />
        <rect x="62" y="174" width="76" height="22" rx="3" fill="#1a1206" stroke="#F5A623" strokeWidth="1.5" />
        <rect x="56" y="196" width="88" height="14" rx="2" fill="url(#gold)" stroke="#FFD700" />
        <text x="100" y="190" textAnchor="middle" fill="#F5A623" fontSize="6" fontFamily="JetBrains Mono" letterSpacing="2">
          FIFA WORLD CUP
        </text>
      </motion.svg>
    </motion.div>
  );
}
