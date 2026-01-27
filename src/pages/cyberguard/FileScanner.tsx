import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileSearch, Upload, AlertTriangle, CheckCircle, XCircle, Loader2, File, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CyberGuardNavbar from "@/components/cyberguard/CyberGuardNavbar";
import RiskScoreMeter from "@/components/cyberguard/RiskScoreMeter";
import ThreatLevelBadge from "@/components/cyberguard/ThreatLevelBadge";
import { scanFile, formatFileSize } from "@/lib/cyberguard/security-service";
import { useThreatStore } from "@/lib/cyberguard/threat-store";
import type { FileScanResult } from "@/lib/cyberguard/types";

const FileScanner = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<FileScanResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const addLog = useThreatStore((state) => state.addLog);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setResult(null);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleScan = async () => {
    if (!file) return;

    setIsScanning(true);
    setResult(null);

    try {
      const scanResult = await scanFile(file);
      setResult(scanResult);

      // Add to threat logs
      addLog({
        type: "file",
        target: file.name,
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
              <FileSearch className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">File Scanner</h1>
          </div>
          <p className="text-muted-foreground">
            Upload files to scan for malware signatures using SHA-256 hash comparison against our threat intelligence database.
          </p>
        </motion.div>

        {/* File Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card border-border mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Upload File
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                className={`
                  relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
                  ${isDragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}
                  ${file ? "bg-muted/30" : ""}
                `}
              >
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {file ? (
                  <div className="space-y-3">
                    <File className="w-12 h-12 mx-auto text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                    <Button
                      onClick={(e) => { e.stopPropagation(); setFile(null); setResult(null); }}
                      variant="outline"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Drop file here or click to upload</p>
                      <p className="text-sm text-muted-foreground">Supports any file type for hash analysis</p>
                    </div>
                  </div>
                )}
              </div>

              {file && (
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="gap-2"
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <FileSearch className="w-4 h-4" />
                        Scan File
                      </>
                    )}
                  </Button>
                </div>
              )}
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
              <p className="mt-4 text-muted-foreground">Generating hash and comparing signatures...</p>
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
                      
                      <p className="text-muted-foreground mb-1">
                        <span className="text-foreground font-medium">File:</span> {result.fileName}
                      </p>
                      <p className="text-muted-foreground mb-1">
                        <span className="text-foreground font-medium">Size:</span> {formatFileSize(result.fileSize)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Scan completed in {result.scanTime.toFixed(0)}ms
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hash Info */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Hash className="w-5 h-5 text-primary" />
                    SHA-256 Hash
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <code className="block p-3 bg-muted rounded-lg text-sm text-muted-foreground font-mono break-all">
                    {result.hash}
                  </code>
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

                {/* Matched Signatures */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Malware Signatures</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result.matchedSignatures.length > 0 ? (
                      <ul className="space-y-2">
                        {result.matchedSignatures.map((sig, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                            {sig}
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex items-center gap-2 text-emerald-500">
                        <CheckCircle className="w-5 h-5" />
                        <span>No malware signatures detected</span>
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

export default FileScanner;
