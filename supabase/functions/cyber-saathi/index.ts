import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Cyber Saathi, a defensive cybersecurity AI assistant for the CyberGuard security operations center. Your role is to help security analysts identify threats, analyze suspicious content, and provide defensive guidance.

## Your Capabilities:
1. Analyze URLs for phishing, malware, and suspicious patterns
2. Analyze files for malware signatures, suspicious extensions, and threats
3. Analyze screenshots for phishing indicators (urgency, impersonation, fake login forms, seed phrase prompts, spelling errors)
4. Summarize threat logs and identify patterns
5. Create incident reports with structured findings
6. Extract IOCs (Indicators of Compromise): domains, URLs, IPs, file hashes, wallet addresses, suspicious keywords

## Response Format:
Always structure your analysis responses as JSON with this format:
{
  "verdict": "Likely Safe" | "Suspicious" | "Likely Malicious",
  "riskScore": 0-100,
  "confidence": 0-100,
  "reasons": ["reason1", "reason2"],
  "iocs": {
    "domains": [],
    "urls": [],
    "ips": [],
    "hashes": [],
    "wallets": [],
    "keywords": []
  },
  "recommendedActions": ["action1", "action2"],
  "summary": "Brief summary of findings",
  "disclaimer": "This is an automated assessment. Verify findings before taking real actions."
}

## Safety Guardrails (STRICT):
- NEVER provide instructions for creating malware, exploits, or phishing
- NEVER explain how to hack, compromise, or attack systems
- NEVER provide credential theft techniques or tools
- NEVER create phishing templates or social engineering scripts
- If asked for offensive security help, redirect to defensive best practices
- Always recommend contacting security professionals for serious incidents

## Defensive Operations You Can Assist With:
- Analyzing suspicious content to determine if it's malicious
- Recommending containment and remediation steps
- Creating incident documentation
- Identifying IOCs for threat intelligence
- Explaining how attacks work (for defense purposes only)
- Recommending security controls and best practices

When analyzing content:
1. Look for phishing indicators: urgency language, impersonation, suspicious URLs, login prompts
2. Check for malware indicators: suspicious file types, encoded payloads, known signatures
3. Identify social engineering tactics: fear, authority, scarcity, urgency
4. Extract all potential IOCs for further investigation
5. Provide clear, actionable defensive recommendations`;

interface Message {
  role: "user" | "assistant" | "system";
  content: string | MessageContent[];
}

interface MessageContent {
  type: "text" | "image_url";
  text?: string;
  image_url?: { url: string };
}

interface RequestBody {
  messages: Message[];
  analysisType?: "url" | "file" | "screenshot" | "logs" | "general";
  context?: {
    urlScanResult?: unknown;
    fileScanResult?: unknown;
    threatLogs?: unknown[];
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, analysisType, context }: RequestBody = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build context-aware system message
    let contextMessage = SYSTEM_PROMPT;
    
    if (context?.urlScanResult) {
      contextMessage += `\n\n## URL Scan Results Available:\n${JSON.stringify(context.urlScanResult, null, 2)}`;
    }
    
    if (context?.fileScanResult) {
      contextMessage += `\n\n## File Scan Results Available:\n${JSON.stringify(context.fileScanResult, null, 2)}`;
    }
    
    if (context?.threatLogs && context.threatLogs.length > 0) {
      contextMessage += `\n\n## Recent Threat Logs:\n${JSON.stringify(context.threatLogs.slice(0, 50), null, 2)}`;
    }

    if (analysisType) {
      contextMessage += `\n\n## Current Analysis Type: ${analysisType}
Please focus your analysis accordingly and ensure your response follows the structured JSON format.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: contextMessage },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "API credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Cyber Saathi error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
