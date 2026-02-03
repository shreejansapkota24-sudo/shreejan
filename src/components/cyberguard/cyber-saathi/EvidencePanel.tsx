import { Shield, AlertTriangle, CheckCircle, XCircle, Globe, FileText, Hash, Wallet, Tag, ChevronRight, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { AnalysisResult } from '@/lib/cyberguard/cyber-saathi-types';
import { getRiskLabel } from '@/lib/cyberguard/ioc-extractor';

interface EvidencePanelProps {
  analysis: AnalysisResult | null;
  onCreateIncident?: () => void;
}

export default function EvidencePanel({ analysis, onCreateIncident }: EvidencePanelProps) {
  if (!analysis) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-medium mb-1">No Analysis Yet</h3>
        <p className="text-sm text-muted-foreground">
          Submit content for analysis to see extracted evidence and indicators.
        </p>
      </div>
    );
  }

  const riskLabel = getRiskLabel(analysis.riskScore);
  const riskColors = {
    Low: 'text-emerald-400 bg-emerald-500/20',
    Medium: 'text-amber-400 bg-amber-500/20',
    High: 'text-orange-400 bg-orange-500/20',
    Critical: 'text-red-400 bg-red-500/20',
  };

  const verdictIcon = {
    'Likely Safe': <CheckCircle className="w-5 h-5 text-emerald-400" />,
    'Suspicious': <AlertTriangle className="w-5 h-5 text-amber-400" />,
    'Likely Malicious': <XCircle className="w-5 h-5 text-red-400" />,
  };

  const hasIOCs = 
    analysis.iocs.domains.length > 0 ||
    analysis.iocs.urls.length > 0 ||
    analysis.iocs.ips.length > 0 ||
    analysis.iocs.hashes.length > 0 ||
    analysis.iocs.wallets.length > 0 ||
    analysis.iocs.keywords.length > 0;

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {/* Verdict Card */}
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {verdictIcon[analysis.verdict]}
              Verdict
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <Badge
                variant="outline"
                className={
                  analysis.verdict === 'Likely Safe' ? 'border-emerald-500/50 text-emerald-400' :
                  analysis.verdict === 'Suspicious' ? 'border-amber-500/50 text-amber-400' :
                  'border-red-500/50 text-red-400'
                }
              >
                {analysis.verdict}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {analysis.confidence}% confidence
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Risk Score */}
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-2">
              <div className="text-3xl font-bold">{analysis.riskScore}</div>
              <Badge className={riskColors[riskLabel]}>{riskLabel}</Badge>
            </div>
            <Progress 
              value={analysis.riskScore} 
              className="h-2"
            />
          </CardContent>
        </Card>

        {/* IOCs */}
        {hasIOCs && (
          <Card className="bg-card/50 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Indicators of Compromise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.iocs.domains.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Globe className="w-3.5 h-3.5" />
                    Domains ({analysis.iocs.domains.length})
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {analysis.iocs.domains.slice(0, 5).map((d, i) => (
                      <Badge key={i} variant="secondary" className="text-xs font-mono">
                        {d}
                      </Badge>
                    ))}
                    {analysis.iocs.domains.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{analysis.iocs.domains.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {analysis.iocs.urls.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Globe className="w-3.5 h-3.5" />
                    URLs ({analysis.iocs.urls.length})
                  </div>
                  <div className="space-y-1">
                    {analysis.iocs.urls.slice(0, 3).map((u, i) => (
                      <div key={i} className="text-xs font-mono bg-muted p-1.5 rounded truncate">
                        {u}
                      </div>
                    ))}
                    {analysis.iocs.urls.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{analysis.iocs.urls.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {analysis.iocs.hashes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Hash className="w-3.5 h-3.5" />
                    File Hashes ({analysis.iocs.hashes.length})
                  </div>
                  <div className="space-y-1">
                    {analysis.iocs.hashes.slice(0, 2).map((h, i) => (
                      <div key={i} className="text-xs font-mono bg-muted p-1.5 rounded truncate">
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analysis.iocs.wallets.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Wallet className="w-3.5 h-3.5" />
                    Wallet Addresses ({analysis.iocs.wallets.length})
                  </div>
                  <div className="space-y-1">
                    {analysis.iocs.wallets.map((w, i) => (
                      <div key={i} className="text-xs font-mono bg-muted p-1.5 rounded truncate">
                        {w}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analysis.iocs.keywords.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Tag className="w-3.5 h-3.5" />
                    Suspicious Keywords ({analysis.iocs.keywords.length})
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {analysis.iocs.keywords.map((k, i) => (
                      <Badge key={i} variant="destructive" className="text-xs">
                        {k}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Reasons */}
        {analysis.reasons.length > 0 && (
          <Card className="bg-card/50 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Analysis Reasons</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.reasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Recommended Actions */}
        {analysis.recommendedActions.length > 0 && (
          <Card className="bg-card/50 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.recommendedActions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Create Incident Button */}
        {analysis.verdict !== 'Likely Safe' && onCreateIncident && (
          <Button
            onClick={onCreateIncident}
            className="w-full gap-2"
            variant="outline"
          >
            <Plus className="w-4 h-4" />
            Create Incident Report
          </Button>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center px-4">
          {analysis.disclaimer}
        </p>
      </div>
    </ScrollArea>
  );
}
