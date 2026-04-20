import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Cyber Saathi, a friendly and knowledgeable defensive cybersecurity AI assistant for the CyberGuard security operations center. You help security analysts and curious users understand threats, analyze suspicious content, and learn about cybersecurity.

## How To Respond

You have TWO response modes — pick the right one based on the user's message:

### MODE 1 — Conversational (DEFAULT)
For ALL of these, respond in **plain natural language** with markdown formatting (headings, bullets, bold). DO NOT output JSON.
- General questions ("what is phishing?", "explain ransomware", "how does 2FA work?")
- Greetings, small talk, follow-up questions, clarifications
- Educational explanations, definitions, best-practice advice
- Any message that is NOT a request to analyze a specific artifact

Be helpful, clear, and concise. Use markdown for readability.

### MODE 2 — Structured Analysis (ONLY when analyzing a real artifact)
ONLY output the JSON format below when the user submits a SPECIFIC artifact to analyze, such as:
- A URL/domain to scan (analysisType = "url")
- A file with scan results in context (analysisType = "file")
- A screenshot/image to inspect for phishing (analysisType = "screenshot")
- A request to summarize threat logs with logs in context (analysisType = "logs")

When in MODE 2, respond ONLY with this JSON object — no extra prose around it:
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

The system passes an "analysisType" hint. If analysisType is "url", "file", "screenshot", or "logs" → use MODE 2. If it is "general", missing, or the user is just chatting/asking questions → use MODE 1 (conversational, NO JSON).

## Safety Guardrails (STRICT)
- NEVER provide instructions for creating malware, exploits, or working phishing kits
- NEVER explain how to hack, compromise, or attack systems offensively
- NEVER provide credential theft techniques or social engineering scripts
- If asked for offensive help, politely refuse and redirect to defensive guidance
- Always recommend contacting security professionals for serious live incidents

## Defensive Topics You Help With
Threat analysis, IOC extraction, incident documentation, security controls, best practices, explaining attacks for defense, recommending containment and remediation steps.`;

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

    // Determine if this is a structured-analysis request or a conversational one
    const isStructured =
      analysisType === "url" ||
      analysisType === "file" ||
      analysisType === "screenshot" ||
      analysisType === "logs";

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

    if (isStructured) {
      contextMessage += `\n\n## Active Mode: STRUCTURED ANALYSIS (analysisType=${analysisType})
Respond ONLY with the JSON object specified in MODE 2. No extra prose.`;
    } else {
      contextMessage += `\n\n## Active Mode: CONVERSATIONAL
The user is asking a general question or chatting. Respond in plain natural language with markdown — DO NOT output the analysis JSON.`;
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
