import { useState, useRef, useEffect } from "react";
import { Shield, Search, CheckCircle2, XCircle, Loader2, Info } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type LicenseRecord = {
  name: string;
  licenseNumber: string;
  category: string;
  office: string;
  printedDate: string;
};

type Status = "idle" | "loading" | "searching" | "found" | "notfound" | "error";

const CATEGORY_MAP: Record<string, string> = {
  A: "Motorcycle",
  B: "Car",
  K: "Scooter",
  F: "Truck",
  G: "Bus",
};

const normalize = (s: string) => s.replace(/[-\s]/g, "").toLowerCase();

let cachedMap: Map<string, LicenseRecord> | null = null;
let loadPromise: Promise<Map<string, LicenseRecord>> | null = null;

const loadLicenseData = (): Promise<Map<string, LicenseRecord>> => {
  if (cachedMap) return Promise.resolve(cachedMap);
  if (loadPromise) return loadPromise;
  loadPromise = fetch("/data/licenses.json")
    .then((r) => {
      if (!r.ok) throw new Error("Failed to load license data");
      return r.json();
    })
    .then((arr: [string, string, string, string][]) => {
      const map = new Map<string, LicenseRecord>();
      for (const [name, licenseNumber, category, printedDate] of arr) {
        map.set(normalize(licenseNumber), {
          name,
          licenseNumber,
          category,
          office: "Chabahil",
          printedDate,
        });
      }
      cachedMap = map;
      return map;
    });
  return loadPromise;
};

const LicenseCheck = () => {
  const [licenseInput, setLicenseInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<LicenseRecord | null>(null);
  const [searchedNumber, setSearchedNumber] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadLicenseData().catch(() => {});
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = licenseInput.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }
    setSearchedNumber(trimmed);
    setStatus("searching");
    setResult(null);
    try {
      const map = await loadLicenseData();
      await new Promise((res) => setTimeout(res, 900));
      const found = map.get(normalize(trimmed));
      if (found) {
        setResult(found);
        setStatus("found");
      } else {
        setStatus("notfound");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass border border-primary/40 box-glow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-cyber tracking-widest text-primary uppercase">
                Official Record
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-cyber text-primary text-glow-strong mb-4">
              License Verification System
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
              Check your driving license print status — Chabahil Transport Office
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="glass-strong rounded-2xl border border-primary/30 box-glow p-6 md:p-8 scanline-overlay animate-fade-in"
          >
            <div className="grid gap-5">
              <div>
                <label className="block text-xs font-cyber uppercase tracking-widest text-primary/80 mb-2">
                  Select Office
                </label>
                <Select value="chabahil" disabled>
                  <SelectTrigger className="bg-secondary/50 border-primary/30 text-foreground font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chabahil">Chabahil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs font-cyber uppercase tracking-widest text-primary/80 mb-2">
                  License Number
                </label>
                <Input
                  ref={inputRef}
                  value={licenseInput}
                  onChange={(e) => setLicenseInput(e.target.value)}
                  placeholder="e.g. 04-06-01453435"
                  autoComplete="off"
                  spellCheck={false}
                  className="bg-secondary/50 border-primary/30 focus-visible:ring-primary text-foreground placeholder:text-muted-foreground/60 font-mono tracking-wider h-12"
                />
              </div>

              <Button
                type="submit"
                disabled={status === "searching"}
                className="h-12 font-cyber tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_25px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.7)] transition-all"
              >
                {status === "searching" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Scanning Records...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Verify License
                  </>
                )}
              </Button>

              {status === "searching" && (
                <div className="relative h-1 w-full overflow-hidden rounded-full bg-primary/10">
                  <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-x shadow-[0_0_15px_hsl(var(--primary))]" />
                </div>
              )}
            </div>

            <div className="mt-5 flex items-start gap-2 text-xs text-muted-foreground border-t border-primary/10 pt-4">
              <Info className="w-4 h-4 text-primary/70 flex-shrink-0 mt-0.5" />
              <span>
                Only <span className="text-primary font-medium">Chabahil</span> office is available
                as of now. More offices will be launched later.
              </span>
            </div>
          </form>

          {status === "found" && result && (
            <ResultFound record={result} />
          )}
          {status === "notfound" && <ResultNotFound query={searchedNumber} />}
          {status === "error" && (
            <div className="mt-8 glass-strong rounded-2xl border border-destructive/50 p-6 text-center text-destructive animate-fade-in">
              Failed to load license database. Please try again.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ResultFound = ({ record }: { record: LicenseRecord }) => {
  const categories = record.category.split(",").map((c) => c.trim()).filter(Boolean);
  return (
    <div
      className="mt-8 rounded-2xl border border-primary/60 bg-primary/5 p-6 md:p-8 animate-fade-in shadow-[0_0_40px_hsl(var(--primary)/0.35)]"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 border border-primary/50">
          <CheckCircle2 className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="font-cyber text-xl md:text-2xl text-primary text-glow">
            License Verified
          </h2>
          <p className="text-sm text-muted-foreground">Valid Record Found</p>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_auto] gap-6">
        <div className="space-y-4">
          <Field label="Full Name" value={record.name} />
          <Field label="License Number" value={record.licenseNumber} mono />
          <div>
            <div className="text-[11px] font-cyber uppercase tracking-widest text-primary/70 mb-2">
              Category
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Badge
                  key={c}
                  className="bg-primary/15 text-primary border border-primary/40 font-cyber hover:bg-primary/20"
                >
                  {c} — {CATEGORY_MAP[c] || "Other"}
                </Badge>
              ))}
            </div>
          </div>
          <Field label="Office" value={record.office} />
          <Field label="Printed Date" value={record.printedDate} />
          <div>
            <div className="text-[11px] font-cyber uppercase tracking-widest text-primary/70 mb-2">
              Status
            </div>
            <Badge className="bg-primary text-primary-foreground font-cyber px-3 py-1 shadow-[0_0_15px_hsl(var(--primary)/0.6)]">
              ✓ Printed & Ready for Collection
            </Badge>
          </div>
        </div>

        <div className="flex flex-col items-center justify-start gap-2">
          <div className="p-3 rounded-xl bg-white border border-primary/40 box-glow">
            <QRCodeSVG value={record.licenseNumber} size={140} level="M" />
          </div>
          <span className="text-[10px] font-cyber uppercase tracking-widest text-muted-foreground">
            Scan to verify
          </span>
        </div>
      </div>
    </div>
  );
};

const ResultNotFound = ({ query }: { query: string }) => (
  <div className="mt-8 rounded-2xl border border-destructive/60 bg-destructive/5 p-6 md:p-8 animate-fade-in shadow-[0_0_40px_hsl(var(--destructive)/0.35)]">
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/20 border border-destructive/50">
        <XCircle className="w-6 h-6 text-destructive" />
      </div>
      <div>
        <h2 className="font-cyber text-xl md:text-2xl text-destructive">Not Found</h2>
        <p className="text-sm text-muted-foreground">
          No record matches this license number
        </p>
      </div>
    </div>
    <div className="mt-4 text-sm text-muted-foreground">
      Searched: <span className="font-mono text-foreground">{query}</span>
    </div>
    <div className="mt-3 text-xs text-muted-foreground">
      Please double-check the number, or your card may not yet be printed.
    </div>
  </div>
);

const Field = ({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) => (
  <div>
    <div className="text-[11px] font-cyber uppercase tracking-widest text-primary/70 mb-1">
      {label}
    </div>
    <div className={`text-base text-foreground ${mono ? "font-mono tracking-wider" : "font-medium"}`}>
      {value}
    </div>
  </div>
);

export default LicenseCheck;
