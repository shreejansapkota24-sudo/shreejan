import { useEffect, useRef, useState } from "react";
import { X, Send, Shield } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cyber-saathi`;
const PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const SUGGESTED = [
  "Who is Shreejan?",
  "What projects has he built?",
  "What's his tech stack?",
];

const FloatingAI = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi — I'm **Cyber Saathi**, Shreejan's AI assistant. Ask me about his cybersecurity work, projects, or how to get in touch." },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${PUBLISHABLE_KEY}` },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let acc = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const p = JSON.parse(jsonStr);
            const delta = p.choices?.[0]?.delta?.content as string | undefined;
            if (delta) {
              acc += delta;
              setMessages((m) => {
                const copy = m.slice();
                copy[copy.length - 1] = { role: "assistant", content: acc };
                return copy;
              });
            }
          } catch { buf = line + "\n" + buf; break; }
        }
      }
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry — I couldn't reach the AI service. Please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close Cyber Saathi" : "Open Cyber Saathi"}
        className="group fixed z-[999] flex items-center justify-center transition-transform duration-300 hover:scale-105"
        style={{
          bottom: 32, right: 32,
          width: 56, height: 56,
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, #1a1a1a, #0a0a0a)",
          border: "1px solid var(--line2)",
          boxShadow: "0 12px 32px -8px rgba(139,123,249,0.25)",
        }}
      >
        <span
          className="absolute inset-[-6px] rounded-full ring-spin pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, transparent, var(--accent), transparent 70%)",
            mask: "radial-gradient(circle, transparent 26px, #000 27px)",
            WebkitMask: "radial-gradient(circle, transparent 26px, #000 27px)",
            opacity: 0.6,
          }}
        />
        {open ? (
          <X className="w-5 h-5" style={{ color: "var(--accent)" }} />
        ) : (
          <Shield className="w-5 h-5 pulse-soft" style={{ color: "var(--accent)" }} />
        )}

        {!open && (
          <span
            className="absolute right-[70px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-mono-syne whitespace-nowrap px-3 py-1.5"
            style={{ background: "var(--bg2)", border: "1px solid var(--line2)", color: "var(--accent)" }}
          >
            Cyber Saathi
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed z-[998] flex flex-col"
          style={{
            bottom: 100, right: 32,
            width: "min(360px, calc(100vw - 32px))",
            height: "min(520px, calc(100vh - 140px))",
            background: "var(--bg)",
            border: "1px solid var(--line2)",
            boxShadow: "0 24px 60px -12px rgba(0,0,0,0.6)",
            animation: "fade-up 0.3s cubic-bezier(0.22,1,0.36,1)",
          }}
          role="dialog"
          aria-label="AI assistant"
        >
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--line)" }}>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full pulse-soft" style={{ background: "#22c55e" }} />
              <Shield className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
              <span className="font-mono-syne" style={{ color: "var(--accent)" }}>Cyber Saathi</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <X className="w-4 h-4" style={{ color: "var(--white2)" }} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className="text-[13.5px] leading-[1.65] px-4 py-3 max-w-[88%]"
                style={{
                  background: m.role === "user" ? "var(--bg3)" : "transparent",
                  border: m.role === "user" ? "1px solid var(--line)" : "none",
                  color: m.role === "user" ? "var(--white)" : "var(--white)",
                  marginLeft: m.role === "user" ? "auto" : 0,
                }}
              >
                {m.role === "assistant" ? (
                  <div className="prose prose-invert prose-sm max-w-none [&_p]:my-1 [&_code]:text-[var(--accent)]">
                    <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                  </div>
                ) : (
                  m.content
                )}
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex items-center gap-1.5 px-4 py-3">
                <span className="w-1.5 h-1.5 rounded-full dot-1" style={{ background: "var(--accent)" }} />
                <span className="w-1.5 h-1.5 rounded-full dot-2" style={{ background: "var(--accent)" }} />
                <span className="w-1.5 h-1.5 rounded-full dot-3" style={{ background: "var(--accent)" }} />
              </div>
            )}
            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[11px] px-3 py-1.5 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    style={{ background: "var(--bg2)", border: "1px solid var(--line)", color: "var(--white2)", fontFamily: "Syne Mono, monospace", letterSpacing: "0.08em" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything…"
              disabled={loading}
              className="flex-1 bg-transparent outline-none text-[14px] py-2"
              style={{ color: "var(--white)" }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="w-9 h-9 flex items-center justify-center transition-all hover:bg-[var(--accent)] disabled:opacity-40"
              style={{ background: "var(--bg3)", border: "1px solid var(--line2)", color: "var(--accent)" }}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingAI;
