import { useState, useCallback } from 'react';
import { Bot, Trash2, Zap, AlertTriangle, Instagram, ArrowLeft, Mail, Linkedin, Github, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MessageList from '@/components/cyberguard/cyber-saathi/MessageList';
import ChatInput from '@/components/cyberguard/cyber-saathi/ChatInput';
import EvidencePanel from '@/components/cyberguard/cyber-saathi/EvidencePanel';
import { useCyberSaathi } from '@/hooks/useCyberSaathi';
import { useDailyChatLimit } from '@/hooks/useDailyChatLimit';
import { useIsMobile } from '@/hooks/use-mobile';
import CyberGuardNavbar from '@/components/cyberguard/CyberGuardNavbar';
import type { Attachment } from '@/lib/cyberguard/cyber-saathi-types';

const INSTAGRAM_URL = 'https://www.instagram.com/sapkota.shreejan/';
const LINKEDIN_URL = 'https://www.linkedin.com/in/shreejan-sapkota-0449b023b/';
const GITHUB_URL = 'https://github.com/shreejansapkota24-sudo';
const EMAIL_URL = 'mailto:shreejansapkota24@gmail.com';

const isWithinHours = () => {
  const h = new Date().getHours();
  return h >= 9 && h < 19;
};

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

  const [limitDialogOpen, setLimitDialogOpen] = useState(false);

  const handleSendWithLimit = useCallback(
    async (msg: string, attachments: Attachment[], analysisType?: string) => {
      if (limitReached) {
        setLimitDialogOpen(true);
        return;
      }
      increment();
      await sendMessage(msg, attachments, analysisType);
    },
    [limitReached, increment, sendMessage]
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
              <Link to="/" className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-muted-foreground hover:text-primary transition">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </Link>
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Cyber Saathi</h1>
                <p className="text-sm text-muted-foreground">Your personal AI assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Daily usage badge */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium font-cyber ${
                  limitReached
                    ? 'border-destructive/40 bg-destructive/10 text-destructive'
                    : remaining <= 2
                    ? 'border-yellow-500/40 bg-yellow-500/10 text-yellow-500'
                    : 'border-primary/30 bg-primary/10 text-primary'
                }`}
                title="5 free messages per day · No login required"
              >
                {limitReached ? <AlertTriangle className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{limit} free messages per day · No login required</span>
                <span className="sm:hidden">{count}/{limit}</span>
              </div>

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
              {limitReached && (
                <div className="px-4 py-3 bg-white/5 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white font-medium">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>You've reached today's free limit of {limit} messages.</span>
                  </div>
                  <p className="text-xs text-white/60">
                    Contact me directly · Available 9:00 AM – 7:00 PM (NPT). Outside these hours I'll get back to you the next day.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-mono text-[10px]">
                      <Instagram className="w-3.5 h-3.5" /> Instagram
                    </a>
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-mono text-[10px]">
                      <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                    </a>
                    <a href={EMAIL_URL} className="btn-mono text-[10px]" style={{ background: '#FFFFFF', color: '#0A0A0A', borderColor: '#FFFFFF' }}>
                      <Mail className="w-3.5 h-3.5" /> Email
                    </a>
                  </div>
                </div>
              )}
              <ChatInput
                onSend={handleSendWithLimit}
                isLoading={isLoading}
                onCancel={cancelRequest}
                disabled={limitReached}
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

      {/* Daily Limit Reached Dialog */}
      <Dialog open={limitDialogOpen} onOpenChange={setLimitDialogOpen}>
        <DialogContent className="bg-[#0A0A0A] border border-[#242424] rounded-none max-w-md p-0 overflow-hidden">
          {/* corner ticks */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white pointer-events-none" />
          <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white pointer-events-none" />
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white pointer-events-none" />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white pointer-events-none" />

          <div className="p-8">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-white/50 mb-4">
              <span className="w-1.5 h-1.5 bg-white animate-pulse" />
              Daily Limit Reached
            </div>

            <DialogHeader className="text-left space-y-3">
              <DialogTitle className="text-3xl font-display text-white" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                Let's take this further
              </DialogTitle>
              <DialogDescription className="text-[#9A9A9A] text-[13px] leading-relaxed">
                You've used all {limit} free messages today. To continue the conversation, reach out to me directly through any of my channels below.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 border border-[#242424] p-4 flex items-start gap-3">
              <Clock className="w-4 h-4 text-white mt-0.5 shrink-0" />
              <div className="font-mono text-[11px] tracking-wider text-white/80">
                <div className="uppercase text-white/50 text-[9px] tracking-[0.3em] mb-1">Available</div>
                <div>09:00 AM — 07:00 PM (NPT)</div>
                <div className={`mt-1 text-[10px] ${isWithinHours() ? 'text-white' : 'text-white/40'}`}>
                  {isWithinHours()
                    ? '● Online — usually replies within an hour'
                    : '○ Currently offline — please contact during available hours'}
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-mono justify-center">
                <Instagram className="w-3.5 h-3.5" /> Instagram
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-mono justify-center">
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-mono justify-center">
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
              <a href={EMAIL_URL} className="btn-mono justify-center" style={{ background: '#FFFFFF', color: '#0A0A0A', borderColor: '#FFFFFF' }}>
                <Mail className="w-3.5 h-3.5" /> Email
              </a>
            </div>

            <button
              onClick={() => setLimitDialogOpen(false)}
              className="mt-5 w-full text-center font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 hover:text-white transition"
            >
              [ Try again tomorrow ]
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
