import { useRef, useState } from 'react';
import { Send, Paperclip, X, Link2, FileText, Image, ScrollText, Loader2, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { Attachment, QuickAction } from '@/lib/cyberguard/cyber-saathi-types';

interface ChatInputProps {
  onSend: (message: string, attachments: Attachment[], analysisType?: string) => void;
  isLoading: boolean;
  onCancel: () => void;
}

const quickActions: { id: QuickAction; label: string; icon: React.ElementType; prompt: string }[] = [
  { id: 'analyze_url', label: 'Analyze URL', icon: Link2, prompt: 'Please analyze this URL for potential threats:' },
  { id: 'analyze_file', label: 'Analyze File', icon: FileText, prompt: 'Please analyze this file for malware or suspicious content:' },
  { id: 'analyze_screenshot', label: 'Analyze Screenshot', icon: Image, prompt: 'Please analyze this screenshot for phishing indicators, suspicious elements, or security threats:' },
  { id: 'summarize_logs', label: 'Summarize Logs', icon: ScrollText, prompt: 'Please summarize the recent threat logs and identify any patterns or concerning trends.' },
];

export default function ChatInput({ onSend, isLoading, onCancel }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!message.trim() && attachments.length === 0) return;
    
    const analysisType = attachments.find(a => a.type === 'url') ? 'url' :
                         attachments.find(a => a.type === 'file') ? 'file' :
                         attachments.find(a => a.type === 'image') ? 'screenshot' : 'general';
    
    onSend(message, attachments, analysisType);
    setMessage('');
    setAttachments([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const attachment: Attachment = {
        id: crypto.randomUUID(),
        type,
        name: file.name,
        data: reader.result as string,
        size: file.size,
        mimeType: file.type,
      };
      setAttachments(prev => [...prev, attachment]);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    
    const attachment: Attachment = {
      id: crypto.randomUUID(),
      type: 'url',
      name: urlInput,
      url: urlInput.startsWith('http') ? urlInput : `https://${urlInput}`,
    };
    setAttachments(prev => [...prev, attachment]);
    setUrlInput('');
    setShowUrlInput(false);
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const handleQuickAction = (action: typeof quickActions[number]) => {
    if (action.id === 'analyze_url') {
      setShowUrlInput(true);
      setMessage(action.prompt);
    } else if (action.id === 'analyze_file') {
      fileInputRef.current?.click();
      setMessage(action.prompt);
    } else if (action.id === 'analyze_screenshot') {
      imageInputRef.current?.click();
      setMessage(action.prompt);
    } else if (action.id === 'summarize_logs') {
      onSend(action.prompt, [], 'logs');
    }
  };

  return (
    <div className="border-t border-border bg-card/50 p-4 space-y-3">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        {quickActions.map(action => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction(action)}
            disabled={isLoading}
            className="gap-1.5 text-xs bg-background/50 hover:bg-primary/10 hover:text-primary hover:border-primary/50"
            aria-label={action.label}
          >
            <action.icon className="w-3.5 h-3.5" />
            {action.label}
          </Button>
        ))}
      </div>

      {/* URL Input */}
      {showUrlInput && (
        <div className="flex gap-2">
          <Input
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            placeholder="Enter URL to analyze..."
            className="flex-1 bg-background"
            onKeyDown={e => e.key === 'Enter' && handleAddUrl()}
            aria-label="URL to analyze"
          />
          <Button size="sm" onClick={handleAddUrl}>Add</Button>
          <Button size="sm" variant="ghost" onClick={() => setShowUrlInput(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachments.map(att => (
            <div
              key={att.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-sm"
            >
              {att.type === 'url' && <Link2 className="w-4 h-4 text-primary" />}
              {att.type === 'file' && <FileText className="w-4 h-4 text-primary" />}
              {att.type === 'image' && <Image className="w-4 h-4 text-primary" />}
              <span className="max-w-[150px] truncate">{att.name}</span>
              <button
                onClick={() => removeAttachment(att.id)}
                className="hover:text-destructive"
                aria-label={`Remove ${att.name}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Message Input */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Cyber Saathi to analyze a threat..."
            className="min-h-[60px] max-h-[150px] resize-none pr-24 bg-background"
            disabled={isLoading}
            aria-label="Message input"
          />
          
          {/* Attachment Buttons */}
          <div className="absolute right-2 bottom-2 flex gap-1">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => imageInputRef.current?.click()}
              disabled={isLoading}
              className="h-8 w-8 hover:bg-primary/10"
              aria-label="Attach screenshot"
            >
              <Image className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="h-8 w-8 hover:bg-primary/10"
              aria-label="Attach file"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <Button
            onClick={onCancel}
            variant="destructive"
            size="icon"
            className="h-[60px] w-[60px]"
            aria-label="Cancel analysis"
          >
            <Square className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            onClick={handleSend}
            disabled={!message.trim() && attachments.length === 0}
            size="icon"
            className="h-[60px] w-[60px] bg-primary hover:bg-primary/90"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={e => handleFileSelect(e, 'file')}
        className="hidden"
        aria-hidden="true"
      />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={e => handleFileSelect(e, 'image')}
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
}
