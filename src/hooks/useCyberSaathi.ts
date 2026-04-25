import { useState, useCallback, useRef } from 'react';
import type { ChatMessage, Attachment, AnalysisResult } from '@/lib/cyberguard/cyber-saathi-types';
import { extractIOCs, calculateRiskScore, getVerdict } from '@/lib/cyberguard/ioc-extractor';
import { scanURL, scanFile } from '@/lib/cyberguard/security-service';
import { useThreatStore } from '@/lib/cyberguard/threat-store';
import { getTurnstileToken, resetTurnstileToken } from '@/lib/turnstile';

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cyber-saathi`;

export function useCyberSaathi() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { logs, addLog } = useThreatStore();

  const parseAnalysisFromResponse = (content: string): AnalysisResult | null => {
    try {
      // Try to find JSON in the response
      const jsonMatch = content.match(/\{[\s\S]*"verdict"[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed as AnalysisResult;
      }
    } catch {
      // If parsing fails, extract IOCs from the text
      const iocs = extractIOCs(content);
      const { score, confidence } = calculateRiskScore(iocs);
      return {
        verdict: getVerdict(score),
        riskScore: score,
        confidence,
        reasons: ['Analysis completed'],
        iocs,
        recommendedActions: ['Review the findings above'],
        summary: content.slice(0, 200),
        disclaimer: 'This is an automated assessment. Verify findings before taking real actions.',
      };
    }
    return null;
  };

  const streamChat = async (
    userMessage: string,
    attachments: Attachment[],
    analysisType?: string
  ) => {
    setIsLoading(true);
    abortControllerRef.current = new AbortController();

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
      attachments,
    };

    setMessages(prev => [...prev, userMsg]);

    // Build message content
    let messageContent: any = userMessage;
    
    // Handle image attachments for vision analysis
    const imageAttachment = attachments.find(a => a.type === 'image');
    if (imageAttachment && imageAttachment.data) {
      messageContent = [
        { type: 'text', text: userMessage },
        { type: 'image_url', image_url: { url: imageAttachment.data } },
      ];
    }

    // Prepare context
    const context: any = {};
    
    // If URL attachment, run URL scan first
    const urlAttachment = attachments.find(a => a.type === 'url');
    if (urlAttachment && urlAttachment.url) {
      const urlResult = await scanURL(urlAttachment.url);
      context.urlScanResult = urlResult;
      
      // Log the scan
      addLog({
        type: 'url',
        target: urlAttachment.url,
        threatLevel: urlResult.threatLevel,
        details: urlResult.details.join('; '),
        riskScore: urlResult.riskScore,
      });
    }

    // If file attachment, run file scan
    const fileAttachment = attachments.find(a => a.type === 'file');
    if (fileAttachment && fileAttachment.data) {
      // Convert base64 back to file for scanning
      const byteString = atob(fileAttachment.data.split(',')[1] || fileAttachment.data);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: fileAttachment.mimeType || 'application/octet-stream' });
      const file = new File([blob], fileAttachment.name);
      
      const fileResult = await scanFile(file);
      context.fileScanResult = fileResult;
      
      // Log the scan
      addLog({
        type: 'file',
        target: fileAttachment.name,
        threatLevel: fileResult.threatLevel,
        details: fileResult.details.join('; '),
        riskScore: fileResult.riskScore,
      });
    }

    // Add threat logs context if summarizing
    if (analysisType === 'logs') {
      context.threatLogs = logs;
    }

    // Build conversation history
    const conversationHistory = messages.map(m => ({
      role: m.role,
      content: m.content,
    }));

    try {
      // Invisible human verification (cached per session after first success)
      let turnstileToken: string;
      try {
        turnstileToken = await getTurnstileToken();
      } catch (e) {
        throw new Error('Verification failed. Please refresh and try again.');
      }

      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            ...conversationHistory,
            { role: 'user', content: messageContent },
          ],
          analysisType,
          context,
          turnstileToken,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (resp.status === 401 || resp.status === 403) {
        resetTurnstileToken();
      }

      if (!resp.ok || !resp.body) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to start analysis');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let assistantContent = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              
              // Update assistant message
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant') {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [
                  ...prev,
                  {
                    id: crypto.randomUUID(),
                    role: 'assistant',
                    content: assistantContent,
                    timestamp: new Date(),
                  },
                ];
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Parse analysis from final response
      const analysis = parseAnalysisFromResponse(assistantContent);
      if (analysis) {
        setCurrentAnalysis(analysis);
        
        // Update the last message with analysis
        setMessages(prev =>
          prev.map((m, i) =>
            i === prev.length - 1 && m.role === 'assistant'
              ? { ...m, analysis }
              : m
          )
        );

        // Log AI analysis
        addLog({
          type: 'url', // Generic type for AI analysis
          target: 'AI Analysis',
          threatLevel: analysis.verdict === 'Likely Malicious' ? 'dangerous' :
                       analysis.verdict === 'Suspicious' ? 'suspicious' : 'safe',
          details: analysis.summary,
          riskScore: analysis.riskScore,
        });
      }
    } catch (error) {
      if ((error as Error).name === 'AbortError') return;
      
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `Error: ${(error as Error).message}. Please try again.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = useCallback(
    async (message: string, attachments: Attachment[] = [], analysisType?: string) => {
      await streamChat(message, attachments, analysisType);
    },
    [messages, logs]
  );

  const cancelRequest = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setCurrentAnalysis(null);
  }, []);

  const createIncident = useCallback(
    (title: string, analysis: AnalysisResult) => {
      addLog({
        type: 'url',
        target: `Incident: ${title}`,
        threatLevel: analysis.verdict === 'Likely Malicious' ? 'dangerous' :
                     analysis.verdict === 'Suspicious' ? 'suspicious' : 'safe',
        details: `AI Incident Report: ${analysis.summary}`,
        riskScore: analysis.riskScore,
      });
    },
    [addLog]
  );

  return {
    messages,
    isLoading,
    currentAnalysis,
    sendMessage,
    cancelRequest,
    clearChat,
    createIncident,
  };
}
