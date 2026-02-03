import { useRef, useEffect } from 'react';
import { Bot, User, AlertTriangle, CheckCircle, XCircle, Link2, FileText, Image } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { ChatMessage } from '@/lib/cyberguard/cyber-saathi-types';
import ReactMarkdown from 'react-markdown';

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          <Bot className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Cyber Saathi</h3>
        <p className="text-muted-foreground max-w-md">
          Your AI security analyst. Upload screenshots, files, or URLs to analyze threats.
          I can help identify phishing, malware, and suspicious activity.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border">
            <Image className="w-5 h-5 text-primary" />
            <span>Analyze screenshots</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border">
            <Link2 className="w-5 h-5 text-primary" />
            <span>Check URLs</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border">
            <FileText className="w-5 h-5 text-primary" />
            <span>Scan files</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Detect threats</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(msg => (
        <div
          key={msg.id}
          className={cn(
            'flex gap-3',
            msg.role === 'user' ? 'justify-end' : 'justify-start'
          )}
        >
          {msg.role === 'assistant' && (
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-primary" />
            </div>
          )}

          <div
            className={cn(
              'max-w-[80%] rounded-2xl p-4',
              msg.role === 'user'
                ? 'bg-primary text-primary-foreground rounded-br-md'
                : 'bg-card border border-border rounded-bl-md'
            )}
          >
            {/* Attachments */}
            {msg.attachments && msg.attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {msg.attachments.map(att => (
                  <div
                    key={att.id}
                    className={cn(
                      'flex items-center gap-1.5 px-2 py-1 rounded text-xs',
                      msg.role === 'user' ? 'bg-primary-foreground/20' : 'bg-muted'
                    )}
                  >
                    {att.type === 'url' && <Link2 className="w-3 h-3" />}
                    {att.type === 'file' && <FileText className="w-3 h-3" />}
                    {att.type === 'image' && <Image className="w-3 h-3" />}
                    <span className="max-w-[100px] truncate">{att.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Message Content */}
            <div className={cn(
              'prose prose-sm max-w-none',
              msg.role === 'user' ? 'prose-invert' : 'dark:prose-invert'
            )}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>

            {/* Analysis Result Badge */}
            {msg.analysis && (
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center gap-2">
                  {msg.analysis.verdict === 'Likely Safe' && (
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Likely Safe
                    </Badge>
                  )}
                  {msg.analysis.verdict === 'Suspicious' && (
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Suspicious
                    </Badge>
                  )}
                  {msg.analysis.verdict === 'Likely Malicious' && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                      <XCircle className="w-3 h-3 mr-1" />
                      Likely Malicious
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    Risk: {msg.analysis.riskScore}/100 • Confidence: {msg.analysis.confidence}%
                  </span>
                </div>
              </div>
            )}

            {/* Timestamp */}
            <div
              className={cn(
                'text-xs mt-2',
                msg.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
              )}
            >
              {format(msg.timestamp, 'HH:mm')}
            </div>
          </div>

          {msg.role === 'user' && (
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5" />
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <div className="bg-card border border-border rounded-2xl rounded-bl-md p-4">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}
