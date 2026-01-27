import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Activity, 
  Link2, 
  FileSearch, 
  AlertTriangle,
  TrendingUp,
  Clock,
  Target
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CyberGuardNavbar from "@/components/cyberguard/CyberGuardNavbar";
import StatCard from "@/components/cyberguard/StatCard";
import RiskScoreMeter from "@/components/cyberguard/RiskScoreMeter";
import ThreatLevelBadge from "@/components/cyberguard/ThreatLevelBadge";
import { useThreatStore } from "@/lib/cyberguard/threat-store";

const CyberGuardDashboard = () => {
  const { logs, getStats } = useThreatStore();
  const stats = getStats();

  const recentLogs = logs.slice(0, 5);

  return (
    <div className="min-h-screen bg-background dark">
      <CyberGuardNavbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="p-2 rounded-lg bg-primary/20"
            >
              <Shield className="w-6 h-6 text-primary" />
            </motion.div>
            <h1 className="text-3xl font-bold text-foreground">Security Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Real-time threat monitoring and security analytics overview.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Scans"
            value={stats.totalScans}
            icon={Activity}
            description="Total security scans performed"
            delay={0.1}
          />
          <StatCard
            title="Threats Detected"
            value={stats.threatsDetected}
            icon={AlertTriangle}
            description="Suspicious or dangerous items found"
            delay={0.2}
          />
          <StatCard
            title="URLs Scanned"
            value={stats.urlsScanned}
            icon={Link2}
            description="Website URLs analyzed for threats"
            delay={0.3}
          />
          <StatCard
            title="Files Scanned"
            value={stats.filesScanned}
            icon={FileSearch}
            description="Files checked for malware signatures"
            delay={0.4}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Risk Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-card border-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Average Risk Score
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <RiskScoreMeter score={stats.averageRiskScore} size="lg" />
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Based on {stats.totalScans} total scans
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-card border-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/cyberguard/url-scanner" className="block">
                  <Button className="w-full justify-start gap-3 h-auto py-4" variant="outline">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Link2 className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Scan URL</p>
                      <p className="text-xs text-muted-foreground">Check for phishing & malware</p>
                    </div>
                  </Button>
                </Link>

                <Link to="/cyberguard/file-scanner" className="block">
                  <Button className="w-full justify-start gap-3 h-auto py-4" variant="outline">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileSearch className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Scan File</p>
                      <p className="text-xs text-muted-foreground">Detect malware signatures</p>
                    </div>
                  </Button>
                </Link>

                <Link to="/cyberguard/threat-logs" className="block">
                  <Button className="w-full justify-start gap-3 h-auto py-4" variant="outline">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">View Logs</p>
                      <p className="text-xs text-muted-foreground">Review security events</p>
                    </div>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-card border-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentLogs.length === 0 ? (
                  <div className="text-center py-8">
                    <Activity className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No recent activity</p>
                    <p className="text-xs text-muted-foreground">Start scanning to see logs</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentLogs.map((log, index) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.05 }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        {log.type === "url" ? (
                          <Link2 className="w-4 h-4 text-primary flex-shrink-0" />
                        ) : (
                          <FileSearch className="w-4 h-4 text-primary flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate">{log.target}</p>
                        </div>
                        <ThreatLevelBadge level={log.threatLevel} size="sm" showIcon={false} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Threat Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Threat Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <p className="text-3xl font-bold text-emerald-500">
                    {logs.filter(l => l.threatLevel === "safe").length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Safe</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <p className="text-3xl font-bold text-amber-500">
                    {logs.filter(l => l.threatLevel === "suspicious").length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Suspicious</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-3xl font-bold text-red-500">
                    {logs.filter(l => l.threatLevel === "dangerous").length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Dangerous</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default CyberGuardDashboard;
