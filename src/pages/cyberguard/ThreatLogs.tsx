import { motion } from "framer-motion";
import { ScrollText, Trash2, Link2, FileSearch, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CyberGuardNavbar from "@/components/cyberguard/CyberGuardNavbar";
import ThreatLevelBadge from "@/components/cyberguard/ThreatLevelBadge";
import { useThreatStore } from "@/lib/cyberguard/threat-store";

const ThreatLogs = () => {
  const { logs, clearLogs } = useThreatStore();

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background dark">
      <CyberGuardNavbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/20">
                <ScrollText className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Threat Logs</h1>
            </div>
            <p className="text-muted-foreground">
              Real-time security event monitoring and threat activity timeline.
            </p>
          </div>

          {logs.length > 0 && (
            <Button
              onClick={clearLogs}
              variant="outline"
              className="gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
              Clear Logs
            </Button>
          )}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground">Total Events</p>
            <p className="text-2xl font-bold text-foreground">{logs.length}</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground">Safe</p>
            <p className="text-2xl font-bold text-emerald-500">
              {logs.filter(l => l.threatLevel === "safe").length}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground">Suspicious</p>
            <p className="text-2xl font-bold text-amber-500">
              {logs.filter(l => l.threatLevel === "suspicious").length}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground">Dangerous</p>
            <p className="text-2xl font-bold text-red-500">
              {logs.filter(l => l.threatLevel === "dangerous").length}
            </p>
          </div>
        </motion.div>

        {/* Logs List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {logs.length === 0 ? (
              <div className="text-center py-12">
                <ScrollText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No security events recorded yet.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Scan URLs or files to see activity here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {logs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-muted">
                      {log.type === "url" ? (
                        <Link2 className="w-5 h-5 text-primary" />
                      ) : (
                        <FileSearch className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-medium text-foreground">
                          {log.type === "url" ? "URL Scan" : "File Scan"}
                        </span>
                        <ThreatLevelBadge level={log.threatLevel} size="sm" />
                        <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-muted">
                          Risk: {log.riskScore}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground truncate mb-1">
                        {log.target}
                      </p>
                      
                      <p className="text-xs text-muted-foreground">
                        {log.details}
                      </p>
                    </div>
                    
                    <div className="text-right text-xs text-muted-foreground whitespace-nowrap">
                      <p>{formatTime(log.timestamp)}</p>
                      <p>{formatDate(log.timestamp)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ThreatLogs;
