import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = { role: "user" | "ai"; text: string };

const SUGGESTED = [
  "Who won the 2022 World Cup?",
  "Top scorer of all time?",
  "When is the next World Cup?",
  "Fastest goal ever?",
];

function answer(q: string): string {
  const t = q.toLowerCase();
  if (t.includes("2022")) return "🇦🇷 Argentina won the 2022 World Cup in Qatar, beating France 4–2 on penalties after a 3–3 draw. Messi finally lifted the trophy.";
  if (t.includes("top scorer") || t.includes("most goals")) return "Miroslav Klose (Germany) holds the all-time record with 16 World Cup goals across 2002–2014.";
  if (t.includes("next world cup") || t.includes("when")) return "FIFA World Cup 2026 kicks off June 11, 2026, hosted by USA, Canada & Mexico — the first 48-team edition.";
  if (t.includes("fastest")) return "Hakan Şükür (Turkey) scored just 11 seconds into Turkey vs South Korea in 2002 — the fastest World Cup goal ever.";
  if (t.includes("most wins") || t.includes("most titles")) return "Brazil leads with 5 World Cup titles (1958, 62, 70, 94, 2002).";
  if (t.includes("biggest win")) return "Hungary 10–1 El Salvador (1982) is the largest margin in World Cup history.";
  if (t.includes("messi")) return "Lionel Messi has 13 World Cup goals, 8 assists, and won the 2022 title — also won the Golden Ball in both 2014 and 2022.";
  if (t.includes("mbappé") || t.includes("mbappe")) return "Kylian Mbappé scored a hat-trick in the 2022 final and has 12 World Cup goals at age 26.";
  return "I can help with World Cup history, records, top scorers, host countries, and the 2026 edition. Try one of the suggestions!";
}

export default function WorldCupAI() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hi! I'm Cup Coach ⚽ — ask me anything about the FIFA World Cup." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, { role: "ai", text: answer(text) }]), 420);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        aria-label="Open Cup Coach AI"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #F5A623, #FFD700)",
          boxShadow: "0 8px 28px rgba(245,166,35,0.45), 0 0 0 0 rgba(245,166,35,0.5)",
        }}
      >
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-dashed"
          style={{ borderColor: "rgba(255,215,0,0.5)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <MessageCircle className="w-6 h-6 text-[#0A0E1A]" strokeWidth={2.4} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[min(380px,calc(100vw-32px))] flex flex-col overflow-hidden"
            style={{
              background: "rgba(17,24,39,0.95)",
              border: "1px solid rgba(245,166,35,0.3)",
              borderRadius: 18,
              backdropFilter: "blur(18px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              maxHeight: "70vh",
            }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(245,166,35,0.2)" }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F5A623, #FFD700)" }}>
                  <span>⚽</span>
                </div>
                <div>
                  <div className="wc-display text-sm" style={{ color: "#FFD700" }}>Cup Coach</div>
                  <div className="text-[10px]" style={{ color: "#9CA3AF" }}>World Cup AI assistant</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-[#9CA3AF] hover:text-[#F5A623]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2.5" style={{ scrollbarWidth: "thin" }}>
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] px-3.5 py-2.5 text-[13px] leading-relaxed rounded-2xl ${m.role === "user" ? "ml-auto" : ""}`}
                  style={{
                    background: m.role === "user" ? "rgba(245,166,35,0.18)" : "rgba(255,255,255,0.05)",
                    border: m.role === "user" ? "1px solid rgba(245,166,35,0.35)" : "1px solid rgba(255,255,255,0.08)",
                    color: "#F9FAFB",
                    wordBreak: "break-word",
                  }}
                >
                  {m.text}
                </motion.div>
              ))}
            </div>

            {msgs.length <= 2 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTED.map((s) => (
                  <button key={s} onClick={() => send(s)} className="text-[11px] px-2.5 py-1 rounded-full" style={{ background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.25)", color: "#F5A623" }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 p-3 border-t" style={{ borderColor: "rgba(245,166,35,0.2)" }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the World Cup…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#6B7280] text-[#F9FAFB]"
                aria-label="Type a message"
              />
              <button type="submit" aria-label="Send" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F5A623, #FFD700)" }}>
                <Send className="w-4 h-4 text-[#0A0E1A]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
