import { useEffect, useRef, useState } from "react";
import { X, Sparkles, Send, Square } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };
const URL_ = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cyber-saathi`;
const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const GREETING: Msg = { role: "assistant", content: "Hi! I'm **AI Saathi** — ask me about Shreejan, his projects, or anything about AI." };

const FloatingAI = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { const h = () => setOpen(true); window.addEventListener("open-ai-saathi", h); return () => window.removeEventListener("open-ai-saathi", h); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setError(null);
    const history = [...msgs, { role: "user" as const, content: text }];
    setMsgs([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const res = await fetch(URL_, {
        method: "POST",
        signal: ctrl.signal,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${KEY}`, apikey: KEY },
        body: JSON.stringify({ messages: history.slice(1).slice(-20) }),
      });
      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "AI Saathi is unavailable right now.");
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "", acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          const l = line.trim();
          if (!l.startsWith("data:")) continue;
          const data = l.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const d = JSON.parse(data).choices?.[0]?.delta?.content;
            if (d) { acc += d; setMsgs([...history, { role: "assistant", content: acc }]); }
          } catch { /* partial */ }
        }
      }
      if (!acc) setMsgs(history);
    } catch (e: any) {
      if (e.name !== "AbortError") { setError(e.message); setMsgs(history); }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI Saathi" : "Open AI Saathi"}
        className="fixed z-[999] flex items-center justify-center transition-transform duration-300 hover:-translate-y-1"
        style={{ bottom: 24, right: 24, width: 56, height: 56, borderRadius: "50%", background: "var(--accent)", border: "1px solid var(--line2)", boxShadow: "var(--shadow-soft)" }}
      >
        {open ? <X className="w-5 h-5" style={{ color: "var(--accent-contrast)" }} /> : <Sparkles className="w-5 h-5" style={{ color: "var(--accent-contrast)" }} />}
      </button>

      {open && (
        <div
          role="dialog" aria-label="AI Saathi chat"
          className="fixed z-[998] flex flex-col"
          style={{ bottom: 92, right: 16, width: "min(380px, calc(100vw - 32px))", height: "min(540px, calc(100vh - 120px))", background: "var(--bg)", border: "1px solid var(--line2)", borderRadius: 16, boxShadow: "var(--shadow-panel)", animation: "fade-up 0.3s cubic-bezier(0.22,1,0.36,1)" }}
        >
          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: "1px solid var(--line)" }}>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full pulse-soft" style={{ background: "var(--accent)" }} />
              <span className="font-mono-syne" style={{ color: "var(--accent)" }}>AI Saathi · Live</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close"><X className="w-4 h-4" style={{ color: "var(--white2)" }} /></button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                <div
                  className="text-[13.5px] leading-[1.65] prose-sm max-w-[88%] [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_a]:underline"
                  style={m.role === "user" ? { background: "var(--accent)", color: "var(--accent-contrast)", padding: "8px 12px", borderRadius: 12 } : { color: "var(--white)" }}
                >
                  {m.content ? <ReactMarkdown>{m.content}</ReactMarkdown> : <span style={{ color: "var(--white2)" }}>Thinking…</span>}
                </div>
              </div>
            ))}
            {error && <p className="text-[12.5px]" style={{ color: "hsl(var(--destructive))" }}>{error}</p>}
            <div ref={endRef} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-end gap-2 p-3" style={{ borderTop: "1px solid var(--line)" }}>
            <textarea
              value={input} onChange={(e) => setInput(e.target.value)} rows={1} maxLength={2000}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Ask AI Saathi…"
              className="flex-1 resize-none bg-transparent text-[13.5px] px-3 py-2 outline-none"
              style={{ border: "1px solid var(--line2)", borderRadius: 10, color: "var(--white)", maxHeight: 120 }}
            />
            {loading ? (
              <button type="button" onClick={() => abortRef.current?.abort()} aria-label="Stop" className="w-10 h-10 shrink-0 flex items-center justify-center rounded-[10px]" style={{ background: "var(--bg3)", border: "1px solid var(--line2)" }}>
                <Square className="w-4 h-4" style={{ color: "var(--accent)" }} />
              </button>
            ) : (
              <button type="submit" aria-label="Send" disabled={!input.trim()} className="w-10 h-10 shrink-0 flex items-center justify-center rounded-[10px] disabled:opacity-50" style={{ background: "var(--accent)" }}>
                <Send className="w-4 h-4" style={{ color: "var(--accent-contrast)" }} />
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingAI;
