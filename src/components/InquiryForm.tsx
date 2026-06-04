import { useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { getFreshTurnstileToken, isPreviewHost } from "@/lib/turnstile";

const SUBMIT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-inquiry`;
const PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(2000),
});

type FieldName = "name" | "email" | "message";

const fieldLabel: Record<FieldName, string> = {
  name: "Name",
  email: "Email",
  message: "Message",
};

const InquiryForm = () => {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [shake, setShake] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const setField = (k: FieldName) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const triggerShake = (k: FieldName) => {
    setShake((s) => ({ ...s, [k]: true }));
    setTimeout(() => setShake((s) => ({ ...s, [k]: false })), 450);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || cooldown) return;
    if (honeypotRef.current?.value) return;

    setErrors({});
    const result = inquirySchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<FieldName, string>> = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as FieldName | undefined;
        if (key) {
          fieldErrors[key] = err.message;
          triggerShake(key);
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      let turnstileToken = "preview-skip";
      if (!isPreviewHost()) {
        try {
          turnstileToken = await getFreshTurnstileToken();
        } catch {
          toast.error("Verification failed", { description: "Please refresh the page and try again." });
          setSubmitting(false);
          return;
        }
      }

      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ ...result.data, turnstileToken }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      toast.success("Message sent", { description: "Thanks for reaching out. I'll reply soon." });
      setValues({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Inquiry submission error:", err);
      toast.error("Something went wrong", {
        description: err instanceof Error ? err.message : "Please try again later.",
      });
    } finally {
      setSubmitting(false);
      setCooldown(true);
      setTimeout(() => setCooldown(false), 3000);
    }
  };

  const inputStyle = (k: FieldName): React.CSSProperties => ({
    background: "transparent",
    border: "none",
    borderBottom: errors[k]
      ? "1px solid #d14343"
      : "1px solid var(--sp-border)",
    borderRadius: 0,
    color: "var(--sp-charcoal)",
    padding: "12px 2px",
    width: "100%",
    outline: "none",
    fontFamily: '"Inter", sans-serif',
    fontSize: 15,
    transition: "border-color 0.3s ease",
  });

  return (
    <section id="inquiry" className="py-28 md:py-36 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow mb-6 inline-flex">Inquiry</span>
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: '"Playfair Display", serif', fontWeight: 500, letterSpacing: "-0.025em" }}
          >
            Send a{" "}
            <span style={{ fontStyle: "italic", color: "var(--sp-mid-dark)" }}>message.</span>
          </h2>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="sp-card p-8 md:p-10 space-y-8"
          noValidate
        >
          <input
            ref={honeypotRef}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none", height: 0, width: 0 }}
          />

          {(["name", "email"] as FieldName[]).map((k) => (
            <motion.div
              key={k}
              animate={shake[k] ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <label
                htmlFor={`inq-${k}`}
                className="block mb-2 font-mono-label"
              >
                {fieldLabel[k]}
              </label>
              <input
                id={`inq-${k}`}
                type={k === "email" ? "email" : "text"}
                value={values[k]}
                onChange={setField(k)}
                disabled={submitting}
                maxLength={k === "email" ? 255 : 100}
                placeholder={k === "email" ? "you@example.com" : "Your name"}
                style={inputStyle(k)}
                aria-label={fieldLabel[k]}
                aria-invalid={!!errors[k]}
                onFocus={(e) => {
                  if (!errors[k]) e.target.style.borderBottomColor = "var(--sp-charcoal)";
                }}
                onBlur={(e) => {
                  if (!errors[k]) e.target.style.borderBottomColor = "var(--sp-border)";
                }}
              />
              {errors[k] && <p className="mt-2 text-[12px]" style={{ color: "#d14343" }}>{errors[k]}</p>}
            </motion.div>
          ))}

          <motion.div
            animate={shake.message ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <label htmlFor="inq-message" className="block mb-2 font-mono-label">
              Message
            </label>
            <textarea
              id="inq-message"
              value={values.message}
              onChange={setField("message")}
              disabled={submitting}
              maxLength={2000}
              placeholder="Tell me what you'd like to discuss…"
              style={{ ...inputStyle("message"), height: 160, resize: "vertical" }}
              aria-label="Message"
              aria-invalid={!!errors.message}
              onFocus={(e) => {
                if (!errors.message) e.target.style.borderBottomColor = "var(--sp-charcoal)";
              }}
              onBlur={(e) => {
                if (!errors.message) e.target.style.borderBottomColor = "var(--sp-border)";
              }}
            />
            <div className="flex justify-between items-center mt-2">
              {errors.message ? (
                <p className="text-[12px]" style={{ color: "#d14343" }}>{errors.message}</p>
              ) : (
                <span className="text-[12px]" style={{ color: "var(--sp-mid)" }}>Min 10 characters</span>
              )}
              <span className="font-mono text-[11px]" style={{ color: "var(--sp-mid)" }}>
                {values.message.length}/2000
              </span>
            </div>
          </motion.div>

          <button
            type="submit"
            disabled={submitting || cooldown}
            aria-label="Send inquiry"
            className="btn-mono w-full justify-center group/btn disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send Message
                <Send className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default InquiryForm;
