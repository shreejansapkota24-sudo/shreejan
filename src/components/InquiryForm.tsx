import { useRef, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { getFreshTurnstileToken, isPreviewHost } from "@/lib/turnstile";

const SUBMIT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-inquiry`;
const PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "At least 10 characters").max(2000),
});

type Field = "name" | "email" | "message";

const InquiryForm = () => {
  const [v, setV] = useState({ name: "", email: "", message: "" });
  const [err, setErr] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const honey = useRef<HTMLInputElement>(null);

  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    if (err[k]) setErr((p) => ({ ...p, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state !== "idle") return;
    if (honey.current?.value) return;

    const parsed = schema.safeParse(v);
    if (!parsed.success) {
      const fe: Partial<Record<Field, string>> = {};
      parsed.error.errors.forEach((er) => {
        const k = er.path[0] as Field | undefined;
        if (k) fe[k] = er.message;
      });
      setErr(fe);
      return;
    }

    setState("sending");
    try {
      let token = "preview-skip";
      if (!isPreviewHost()) {
        try { token = await getFreshTurnstileToken(); }
        catch { toast.error("Verification failed", { description: "Refresh and try again." }); setState("idle"); return; }
      }
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${PUBLISHABLE_KEY}` },
        body: JSON.stringify({ ...parsed.data, turnstileToken: token }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || `Failed (${res.status})`);
      }
      setState("sent");
      setV({ name: "", email: "", message: "" });
      setTimeout(() => setState("idle"), 4000);
    } catch (e) {
      toast.error("Something went wrong", { description: e instanceof Error ? e.message : "Try again later." });
      setState("idle");
    }
  };

  const inp = (k: Field): React.CSSProperties => ({
    background: "transparent", border: "none",
    borderBottom: `1px solid ${err[k] ? "var(--red)" : "var(--line2)"}`,
    color: "var(--white)", padding: "14px 2px", width: "100%",
    outline: "none", fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 300,
    transition: "border-color 0.3s ease",
  });

  return (
    <section id="inquiry" className="px-6 md:px-16 py-28 md:py-36" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[720px] mx-auto">
        <span className="eyebrow fade-up">— Inquiry</span>
        <h2 className="mt-6 fade-up delay-1 leading-[0.95]" style={{ fontSize: "clamp(44px,7vw,96px)" }}>
          <span className="block">DROP ME</span>
          <span
            className="block"
            style={{
              fontFamily: 'Georgia, serif', fontStyle: "italic", fontWeight: 400,
              textTransform: "lowercase", color: "transparent",
              WebkitTextStroke: "1px var(--accent)",
            }}
          >
            a line.
          </span>
        </h2>

        <form onSubmit={onSubmit} className="mt-14 space-y-10 fade-up delay-2" noValidate>
          <input
            ref={honey} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden
            style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none", height: 0, width: 0 }}
          />

          <div className="grid md:grid-cols-2 gap-8">
            {(["name", "email"] as Field[]).map((k) => (
              <div key={k}>
                <label htmlFor={k} className="font-mono-syne block mb-3" style={{ color: "var(--white3)" }}>
                  {k === "email" ? "Email" : "Name"}
                </label>
                <input
                  id={k} type={k === "email" ? "email" : "text"}
                  value={v[k]} onChange={set(k)} disabled={state === "sending"}
                  placeholder={k === "email" ? "you@example.com" : "Your name"}
                  style={inp(k)} aria-invalid={!!err[k]}
                  onFocus={(e) => { if (!err[k]) e.currentTarget.style.borderBottomColor = "var(--accent)"; }}
                  onBlur={(e) => { if (!err[k]) e.currentTarget.style.borderBottomColor = "var(--line2)"; }}
                />
                {err[k] && <p className="mt-2 text-[12px]" style={{ color: "var(--red)" }}>{err[k]}</p>}
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="message" className="font-mono-syne block mb-3" style={{ color: "var(--white3)" }}>Message</label>
            <textarea
              id="message" value={v.message} onChange={set("message")} disabled={state === "sending"}
              placeholder="Tell me what you'd like to discuss…"
              style={{ ...inp("message"), minHeight: 120, resize: "vertical" }} aria-invalid={!!err.message}
              onFocus={(e) => { if (!err.message) e.currentTarget.style.borderBottomColor = "var(--accent)"; }}
              onBlur={(e) => { if (!err.message) e.currentTarget.style.borderBottomColor = "var(--line2)"; }}
            />
            {err.message && <p className="mt-2 text-[12px]" style={{ color: "var(--red)" }}>{err.message}</p>}
          </div>

          <button
            type="submit"
            disabled={state !== "idle"}
            className="w-full py-4 font-mono-syne transition-all duration-300"
            style={{
              background: state === "sent" ? "#22c55e" : "var(--white)",
              color: "var(--bg)",
              border: "1px solid var(--white)",
            }}
            onMouseEnter={(e) => {
              if (state === "idle") {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 14px 30px -10px rgba(232,213,163,0.4)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
              if (state === "idle") {
                e.currentTarget.style.background = "var(--white)";
                e.currentTarget.style.borderColor = "var(--white)";
              }
            }}
          >
            {state === "sending" ? "Sending…" : state === "sent" ? "Sent! I'll be in touch soon." : "Send Message →"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default InquiryForm;
