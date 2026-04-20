import { useState, useCallback } from 'react';
import { Bot, Trash2, Zap, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import MessageList from '@/components/cyberguard/cyber-saathi/MessageList';
import ChatInput from '@/components/cyberguard/cyber-saathi/ChatInput';
import EvidencePanel from '@/components/cyberguard/cyber-saathi/EvidencePanel';
import { useCyberSaathi } from '@/hooks/useCyberSaathi';
import { useDailyChatLimit } from '@/hooks/useDailyChatLimit';
import { useIsMobile } from '@/hooks/use-mobile';
import CyberGuardNavbar from '@/components/cyberguard/CyberGuardNavbar';
import type { Attachment } from '@/lib/cyberguard/cyber-saathi-types';

export default function CyberSaathiPage() {
  const isMobile = useIsMobile();
  const [showEvidence, setShowEvidence] = useState(false);
  const [incidentDialogOpen, setIncidentDialogOpen] = useState(false);
  const [incidentTitle, setIncidentTitle] = useState('');
  
  const {
    messages,
    isLoading,
    currentAnalysis,
    sendMessage,
    cancelRequest,
    clearChat,
    createIncident,
  } = useCyberSaathi();

  const { count, remaining, limitReached, limit, increment } = useDailyChatLimit();

  const handleSendWithLimit = useCallback(
    async (msg: string, attachments: Attachment[], analysisType?: string) => {
      if (limitReached) {
        toast.error(`Daily limit reached`, {
          description: `You've used all ${limit} chats for today. Please come back tomorrow.`,
        });
        return;
      }
      increment();
      await sendMessage(msg, attachments, analysisType);
    },
    [limitReached, limit, increment, sendMessage]
  );

  const handleCreateIncident = () => {
    if (currentAnalysis && incidentTitle.trim()) {
      createIncident(incidentTitle, currentAnalysis);
      setIncidentDialogOpen(false);
      setIncidentTitle('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CyberGuardNavbar />

      <main className="pt-24 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Cyber Saathi</h1>
                <p className="text-sm text-muted-foreground">AI Security Analyst</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="gap-1.5 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear</span>
                </Button>
              )}
              
              {isMobile && currentAnalysis && (
                <Sheet open={showEvidence} onOpenChange={setShowEvidence}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      Evidence
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[70vh]">
                    <SheetHeader>
                      <SheetTitle>Analysis Evidence</SheetTitle>
                    </SheetHeader>
                    <EvidencePanel 
                      analysis={currentAnalysis}
                      onCreateIncident={() => setIncidentDialogOpen(true)}
                    />
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
            {/* Chat Panel */}
            <div className="lg:col-span-2 flex flex-col bg-card/30 rounded-xl border border-border overflow-hidden">
              <MessageList messages={messages} isLoading={isLoading} />
              <ChatInput
                onSend={sendMessage}
                isLoading={isLoading}
                onCancel={cancelRequest}
              />
            </div>

            {/* Evidence Panel - Desktop */}
            {!isMobile && (
              <div className="bg-card/30 rounded-xl border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h2 className="font-semibold">Evidence Panel</h2>
                  <p className="text-xs text-muted-foreground">Extracted indicators</p>
                </div>
                <EvidencePanel 
                  analysis={currentAnalysis}
                  onCreateIncident={() => setIncidentDialogOpen(true)}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create Incident Dialog */}
      <Dialog open={incidentDialogOpen} onOpenChange={setIncidentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Incident Report</DialogTitle>
            <DialogDescription>
              This will add an incident to the Threat Logs for tracking.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="incident-title">Incident Title</Label>
              <Input
                id="incident-title"
                value={incidentTitle}
                onChange={e => setIncidentTitle(e.target.value)}
                placeholder="e.g., Phishing attempt targeting finance team"
              />
            </div>
            {currentAnalysis && (
              <div className="text-sm text-muted-foreground">
                <p>Verdict: {currentAnalysis.verdict}</p>
                <p>Risk Score: {currentAnalysis.riskScore}/100</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIncidentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateIncident} disabled={!incidentTitle.trim()}>
              Create Incident
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
