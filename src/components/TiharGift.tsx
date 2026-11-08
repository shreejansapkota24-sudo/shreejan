import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Diyo, Fireworks } from "./TiharFestive";

type Stage = "closed" | "idle" | "shake" | "open" | "card";
const KEY = "tihar-gift-seen";

const TiharGift = () => {
  const [stage, setStage] = useState<Stage>("closed");

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;
    const t = setTimeout(() => setStage("idle"), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => { sessionStorage.setItem(KEY, "1"); setStage("closed"); };
  const open = () => {
    setStage("shake");
    setTimeout(() => setStage("open"), 900);
    setTimeout(() => setStage("card"), 2100);
  };
  const opened = stage === "open" || stage === "card";

  return (
    <AnimatePresence>
      {stage !== "closed" && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
          style={{ background: "rgba(10,12,30,0.78)", backdropFilter: "blur(6px)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          role="dialog" aria-modal="true" aria-label="Tihar surprise"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          {opened && <Fireworks intense />}
          <button onClick={close} aria-label="Close" className="absolute top-5 right-5 z-[1002] rounded-full p-2.5" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}>
            <X className="w-5 h-5" />
          </button>

          {stage !== "card" ? (
            <div className="relative flex flex-col items-center text-center z-[1002]">
              <p className="font-mono-syne text-[12px] mb-3" style={{ color: "#ffd166", letterSpacing: "0.25em" }}>HAPPY TIHAR · शुभ तिहार</p>
              <h2 className="text-[26px] md:text-[38px] leading-tight mb-10 max-w-[520px]" style={{ color: "#fff" }}>A Little Tihar Surprise for You!</h2>

              <motion.div
                className="relative" style={{ width: 170, height: 170 }}
                animate={stage === "shake" ? { rotate: [0, -6, 6, -8, 8, -4, 4, 0] } : stage === "idle" ? { y: [0, -10, 0] } : {}}
                transition={stage === "shake" ? { duration: 0.9 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* glow */}
                <motion.div className="absolute inset-[-40px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,209,102,0.55), transparent 65%)" }}
                  animate={opened ? { scale: [1, 2.6], opacity: [1, 0.9] } : { opacity: [0.5, 0.9, 0.5] }}
                  transition={opened ? { duration: 0.8 } : { duration: 2.4, repeat: Infinity }} />
                {/* box */}
                <div className="absolute bottom-0 left-[10px] right-[10px] h-[110px] rounded-md" style={{ background: "linear-gradient(135deg,#e11d48,#9f1239)", boxShadow: "inset -14px -10px 0 rgba(0,0,0,0.18), 0 20px 40px rgba(0,0,0,0.4)" }}>
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[20px]" style={{ background: "linear-gradient(90deg,#fbbf24,#f59e0b)" }} />
                </div>
                {/* lid */}
                <motion.div className="absolute left-0 right-0 top-[38px] h-[30px] rounded-md origin-bottom-left"
                  style={{ background: "linear-gradient(135deg,#f43f5e,#be123c)", boxShadow: "0 6px 10px rgba(0,0,0,0.25)" }}
                  animate={opened ? { rotate: -35, y: -70, x: -30, opacity: 0.9 } : {}}
                  transition={{ duration: 0.7, ease: "easeOut" }}>
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[20px]" style={{ background: "#fbbf24" }} />
                  {/* bow */}
                  <motion.div className="absolute -top-[26px] left-1/2 -translate-x-1/2 flex" animate={opened ? { scale: 0.6, rotate: 30 } : {}}>
                    <span style={{ width: 34, height: 26, borderRadius: "50% 50% 10% 50%", border: "7px solid #fbbf24", transform: "rotate(-20deg)" }} />
                    <span style={{ width: 34, height: 26, borderRadius: "50% 50% 50% 10%", border: "7px solid #fbbf24", transform: "rotate(20deg)" }} />
                  </motion.div>
                </motion.div>
                {/* confetti */}
                {opened && Array.from({ length: 36 }).map((_, i) => {
                  const a = (i / 36) * Math.PI * 2;
                  return (
                    <motion.span key={i} className="absolute left-1/2 top-1/2" style={{ width: 8, height: 12, background: ["#ffd166", "#ff4d6d", "#4cc9f0", "#06d6a0", "#fb8500"][i % 5], borderRadius: 2 }}
                      initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                      animate={{ x: Math.cos(a) * (140 + (i % 4) * 30), y: Math.sin(a) * (140 + (i % 3) * 30) + 60, opacity: 0, rotate: 360 }}
                      transition={{ duration: 1.4, ease: "easeOut" }} />
                  );
                })}
              </motion.div>

              {stage === "idle" && (
                <motion.button onClick={open} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                  className="mt-12 rounded-full px-8 py-3.5 text-[15px] font-semibold"
                  style={{ background: "linear-gradient(135deg,#ffd166,#fb8500)", color: "#3b1d00", boxShadow: "0 10px 30px rgba(251,133,0,0.45)" }}>
                  Open Your Gift 🎁
                </motion.button>
              )}
            </div>
          ) : (
            <motion.div
              className="relative z-[1002] w-full max-w-[480px] rounded-2xl p-8 md:p-10 text-center"
              style={{ background: "linear-gradient(160deg,#3b0a2a,#7c2d12 60%,#92400e)", border: "2px solid #fbbf24", boxShadow: "0 0 60px rgba(251,191,36,0.45)", color: "#fff7e6" }}
              initial={{ scale: 0.3, rotateY: 90, opacity: 0 }} animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
            >
              <div className="flex justify-center gap-4 mb-5">
                <Diyo size={38} /><Diyo size={46} /><Diyo size={38} />
              </div>
              <h2 className="text-[32px] md:text-[40px] mb-4" style={{ color: "#ffd166" }}>Happy Tihar! 🪔✨</h2>
              <p className="text-[15px] leading-[1.8] mb-4">
                May your life shine as brightly as the diyas, your days be filled with happiness, and your future be full of success and prosperity.
              </p>
              <p className="text-[15px] leading-[1.8] mb-7 font-semibold">Wishing you and your family a wonderful Tihar!</p>
              <p className="font-mono-syne text-[11px] mb-7" style={{ color: "#fcd34d", letterSpacing: "0.2em" }}>— SHREEJAN SAPKOTA</p>
              <button onClick={close} className="rounded-full px-7 py-3 text-[14px] font-semibold" style={{ background: "#ffd166", color: "#3b1d00" }}>
                Explore Portfolio
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TiharGift;
