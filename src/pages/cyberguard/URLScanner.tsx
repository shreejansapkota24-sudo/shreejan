import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, Search, AlertTriangle, CheckCircle, XCircle, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import CyberGuardNavbar from "@/components/cyberguard/CyberGuardNavbar";
import RiskScoreMeter from "@/components/cyberguard/RiskScoreMeter";
import ThreatLevelBadge from "@/components/cyberguard/ThreatLevelBadge";
import { scanURL } from "@/lib/cyberguard/security-service";
import { useThreatStore } from "@/lib/cyberguard/threat-store";
import type { URLScanResult } from "@/lib/cyberguard/types";

const URLScanner = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<URLScanResult | null>(null);
  const addLog = useThreatStore((state) => state.addLog);

  const handleScan = async () => {
    if (!url.trim()) return;

    setIsScanning(true);
    setResult(null);

    try {
      const scanResult = await scanURL(url);
      setResult(scanResult);

      // Add to threat logs
      addLog({
        type: "url",
        target: url,
        threatLevel: scanResult.threatLevel,
        details: scanResult.details[0],
        riskScore: scanResult.riskScore,
      });
    } catch (error) {
      console.error("Scan failed:", error);
    } finally {
      setIsScanning(false);
    }
  };

  const sampleUrls = [
    { url: "https://secure-paypal-login.xyz/verify", label: "Phishing Example" },
    { url: "https://github.com", label: "Safe Site" },
    { url: "http://192.168.1.1/admin/login", label: "Suspicious IP" },
  ];

  return (
    <div className="min-h-screen bg-background dark">
      <CyberGuardNavbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/20">
              <Link2 className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">URL Scanner</h1>
          </div>
          <p className="text-muted-foreground">
            Analyze URLs for phishing attempts, malicious patterns, and security threats using our threat intelligence database.
          </p>
        </motion.div>

        {/* Scanner Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card border-border mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Enter URL to Scan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleScan()}
                    className="bg-background border-border text-foreground pr-10"
                  />
                  {url && (
                    <ExternalLink className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <Button
                  onClick={handleScan}
                  disabled={isScanning || !url.trim()}
                  className="gap-2"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Scan URL
                    </>
                  )}
                </Button>
              </div>

              {/* Sample URLs */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs text-muted-foreground">Try:</span>
                {sampleUrls.map((sample) => (
                  <Tooltip key={sample.url}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setUrl(sample.url)}
                        className="text-xs px-2 py-1 rounded bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {sample.label}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{sample.url}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Scanning Animation */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
              />
              <p className="mt-4 text-muted-foreground">Analyzing threat indicators...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && !isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Result Summary */}
              <Card className="bg-card border-border overflow-hidden">
                <div className={`h-1 ${
                  result.threatLevel === "safe" ? "bg-emerald-500" :
                  result.threatLevel === "suspicious" ? "bg-amber-500" : "bg-red-500"
                }`} />
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <RiskScoreMeter score={result.riskScore} size="lg" />
                    
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                        {result.threatLevel === "safe" && <CheckCircle className="w-8 h-8 text-emerald-500" />}
                        {result.threatLevel === "suspicious" && <AlertTriangle className="w-8 h-8 text-amber-500" />}
                        {result.threatLevel === "dangerous" && <XCircle className="w-8 h-8 text-red-500" />}
                        <ThreatLevelBadge level={result.threatLevel} size="lg" />
                      </div>
                      
                      <p className="text-muted-foreground mb-2 break-all">
                        <span className="text-foreground font-medium">Scanned URL:</span> {result.url}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Scan completed in {result.scanTime.toFixed(0)}ms
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Analysis */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Findings */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Analysis Findings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.details.map((detail, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                            index === 0 
                              ? result.threatLevel === "safe" ? "bg-emerald-500" 
                                : result.threatLevel === "suspicious" ? "bg-amber-500" 
                                : "bg-red-500"
                              : "bg-muted-foreground"
                          }`} />
                          <span className="text-muted-foreground">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Matched Patterns */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Threat Indicators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result.matchedPatterns.length > 0 ? (
                      <ul className="space-y-2">
                        {result.matchedPatterns.map((pattern, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                            {pattern}
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex items-center gap-2 text-emerald-500">
                        <CheckCircle className="w-5 h-5" />
                        <span>No threat indicators detected</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default URLScanner;
