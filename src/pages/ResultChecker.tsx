import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  GraduationCap,
  Loader2,
  Search,
  Award,
  User as UserIcon,
  Hash,
  School,
  Calendar,
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
  X,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import CustomCursor from "@/components/CustomCursor";

interface SubjectRow {
  SUBJECT_NAME?: string;
  GRADE?: string;
  GP?: string | number;
  [k: string]: unknown;
}

interface ResultData {
  SYMBOL?: string;
  NAME?: string;
  DOB?: string;
  GPA?: string | number;
  SCHOOL_NAME?: string;
  SCHOOL?: string;
  DISTRICT?: string;
  RESULT?: string;
  SUBJECTS?: SubjectRow[];
  [k: string]: unknown;
}

const SOCIALS = [
  {
    label: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/shreejansapkota_/",
    color: "from-pink-500 to-orange-400",
  },
  {
    label: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/shreejansapkota",
    color: "from-blue-500 to-cyan-400",
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/shreejansapkota/",
    color: "from-sky-500 to-blue-600",
  },
  {
    label: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/9779800000000",
    color: "from-green-500 to-emerald-400",
  },
];

const ResultChecker = () => {
  const [symbol, setSymbol] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("see-result", {
        body: { symbol: symbol.trim(), dob: dob.trim() || undefined },
      });
      if (fnError) throw fnError;
      const payload = data as { code?: number; message?: string; data?: ResultData };
      if (payload?.code === 200 && payload.data) {
        setResult(payload.data);
        setTimeout(() => setShowPopup(true), 900);
      } else {
        setError(payload?.message || "Result not found. Please check your symbol number.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formattedDob = result?.DOB && result.DOB !== "20000101"
    ? result.DOB.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
    : "—";

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--mono-bg)" }}>
      <CustomCursor />
      {/* Aurora */}
      <div className="aurora-blob" style={{ top: "-10%", left: "-10%" }} />
      <div className="aurora-blob alt" style={{ bottom: "-15%", right: "-10%" }} />
      <div className="absolute inset-0 pointer-events-none arctic-noise opacity-40" />

      {/* Top bar */}
      <header className="relative z-10 border-b" style={{ borderColor: "var(--mono-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em]"
            style={{ color: "var(--mono-text-muted)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] arctic-gradient-text">
            <GraduationCap className="w-4 h-4" />
            SEE Result Checker
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.25em] border"
            style={{ color: "#FFB36B", borderColor: "rgba(255,138,30,0.3)", background: "rgba(255,138,30,0.05)" }}
          >
            <Sparkles className="w-3 h-3" /> Powered by Ekantipur Results
          </span>
          <h1
            className="mt-5 font-display font-bold text-4xl md:text-6xl leading-tight"
            style={{ color: "var(--mono-text)" }}
          >
            Check Your <span className="arctic-gradient-text">SEE Result</span>
          </h1>
          <p className="mt-4 text-base md:text-lg" style={{ color: "var(--mono-text-muted)" }}>
            Enter your symbol number to view your full marksheet — modern, fast, and beautifully designed.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-2xl mx-auto rounded-2xl p-6 md:p-8 border backdrop-blur-xl"
          style={{
            background: "rgba(17,17,17,0.55)",
            borderColor: "var(--mono-border)",
            boxShadow: "0 30px 80px -30px rgba(255,138,30,0.25)",
          }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-2" style={{ color: "var(--mono-text-muted)" }}>
                Symbol Number *
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--mono-text-faint)" }} />
                <input
                  type="text"
                  required
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  placeholder="e.g. 0284685K"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/40 border outline-none transition-all focus:border-[#FF8A1E] font-mono uppercase tracking-wider"
                  style={{ borderColor: "var(--mono-border)", color: "var(--mono-text)" }}
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-2" style={{ color: "var(--mono-text-muted)" }}>
                Date of Birth (optional)
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--mono-text-faint)" }} />
                <input
                  type="text"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="YYYY-MM-DD"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/40 border outline-none transition-all focus:border-[#FF8A1E] font-mono"
                  style={{ borderColor: "var(--mono-border)", color: "var(--mono-text)" }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !symbol.trim()}
            className="btn-mono w-full mt-6 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Checking your result…
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                View Result
              </>
            )}
          </button>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-center px-4 py-3 rounded-lg border"
              style={{ borderColor: "rgba(255,80,80,0.3)", background: "rgba(255,80,80,0.05)", color: "#FF9A9A" }}
            >
              {error}
            </motion.div>
          )}
        </motion.form>

        {/* Loading skeleton */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto mt-10 flex flex-col items-center gap-4"
            >
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-2 border-t-[#FF8A1E] border-white/10 animate-spin" />
                <GraduationCap className="absolute inset-0 m-auto w-6 h-6" style={{ color: "#FFB36B" }} />
              </div>
              <p className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: "var(--mono-text-muted)" }}>
                Fetching marksheet…
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl mx-auto mt-12 rounded-2xl border overflow-hidden backdrop-blur-xl"
              style={{
                background: "linear-gradient(180deg, rgba(20,20,20,0.7) 0%, rgba(10,10,10,0.85) 100%)",
                borderColor: "var(--mono-border)",
                boxShadow: "0 40px 100px -30px rgba(255,138,30,0.35)",
              }}
            >
              {/* Header strip */}
              <div
                className="px-6 md:px-8 py-5 flex items-center justify-between border-b"
                style={{
                  borderColor: "var(--mono-border)",
                  background: "linear-gradient(90deg, rgba(255,138,30,0.12), rgba(245,181,68,0.06))",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#FF8A1E,#F5B544)" }}
                  >
                    <Award className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em]" style={{ color: "var(--mono-text-muted)" }}>
                      Official Marksheet
                    </p>
                    <p className="font-display font-semibold" style={{ color: "var(--mono-text)" }}>
                      SEE Result {new Date().getFullYear()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: "var(--mono-text-muted)" }}>
                    GPA
                  </p>
                  <p className="font-display text-3xl md:text-4xl font-bold arctic-gradient-text">
                    {result.GPA ?? "—"}
                  </p>
                </div>
              </div>

              {/* Info grid */}
              <div className="grid md:grid-cols-2 gap-px" style={{ background: "var(--mono-border)" }}>
                <InfoRow icon={UserIcon} label="Student Name" value={result.NAME || symbol.toUpperCase()} />
                <InfoRow icon={Hash} label="Symbol Number" value={result.SYMBOL || symbol.toUpperCase()} />
                <InfoRow icon={School} label="School" value={result.SCHOOL_NAME || result.SCHOOL || "—"} />
                <InfoRow icon={Calendar} label="Date of Birth" value={formattedDob} />
              </div>

              {/* Subjects */}
              {Array.isArray(result.SUBJECTS) && result.SUBJECTS.length > 0 && (
                <div className="p-6 md:p-8">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-4" style={{ color: "var(--mono-text-muted)" }}>
                    Subject-wise Grades
                  </p>
                  <div className="overflow-x-auto rounded-lg border" style={{ borderColor: "var(--mono-border)" }}>
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: "rgba(255,138,30,0.08)" }}>
                          <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--mono-text-muted)" }}>Subject</th>
                          <th className="text-center px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--mono-text-muted)" }}>Grade</th>
                          <th className="text-center px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--mono-text-muted)" }}>GP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.SUBJECTS.map((s, i) => (
                          <tr key={i} className="border-t" style={{ borderColor: "var(--mono-border)" }}>
                            <td className="px-4 py-3" style={{ color: "var(--mono-text)" }}>{s.SUBJECT_NAME || "—"}</td>
                            <td className="px-4 py-3 text-center font-semibold" style={{ color: "#FFB36B" }}>{s.GRADE || "—"}</td>
                            <td className="px-4 py-3 text-center font-mono" style={{ color: "var(--mono-text-muted)" }}>{s.GP ?? "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 backdrop-blur-md"
              style={{ background: "rgba(0,0,0,0.7)" }}
              onClick={() => setShowPopup(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-lg w-full rounded-2xl border p-8 backdrop-blur-xl"
              style={{
                background: "linear-gradient(180deg, rgba(22,22,22,0.95), rgba(10,10,10,0.95))",
                borderColor: "rgba(255,138,30,0.35)",
                boxShadow: "0 50px 120px -20px rgba(255,138,30,0.5)",
              }}
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 transition"
                style={{ color: "var(--mono-text-muted)" }}
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#FF8A1E,#F5B544)" }}
                >
                  <GraduationCap className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em]" style={{ color: "#FFB36B" }}>
                    Free Counseling
                  </p>
                  <h3 className="font-display text-2xl font-bold" style={{ color: "var(--mono-text)" }}>
                    Need help choosing your +2 college?
                  </h3>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--mono-text-muted)" }}>
                If you're confused about which college, stream (Science, Management, Humanities), or subjects to choose
                after SEE — I can guide you. Reach out on any platform below.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-br ${s.color} text-white font-medium text-sm transition hover:scale-[1.03] hover:shadow-lg`}
                  >
                    <s.icon className="w-4 h-4" />
                    {s.label}
                  </a>
                ))}
              </div>

              <p className="mt-5 text-center text-[10px] font-mono uppercase tracking-[0.25em]" style={{ color: "var(--mono-text-faint)" }}>
                — Shreejan Sapkota
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) => (
  <div className="px-6 md:px-8 py-5 flex items-center gap-4" style={{ background: "var(--mono-bg)" }}>
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
      style={{ borderColor: "var(--mono-border)", background: "rgba(255,138,30,0.06)" }}
    >
      <Icon className="w-4 h-4" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: "var(--mono-text-muted)" }}>
        {label}
      </p>
      <p className="font-medium truncate" style={{ color: "var(--mono-text)" }}>
        {value}
      </p>
    </div>
  </div>
);

export default ResultChecker;
