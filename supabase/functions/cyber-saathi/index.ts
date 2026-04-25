import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are Cyber Saathi — Shreejan Sapkota's personal AI assistant on his portfolio website. You are a friendly, smart, multipurpose assistant (similar to Gemini or ChatGPT) that helps visitors with a wide variety of tasks.

## Your Personality
- Warm, helpful, and conversational
- Clear and concise — no unnecessary fluff
- Use markdown formatting (headings, bullets, **bold**, code blocks) for readability
- If the user greets you, greet back naturally and offer to help

## What You Help With
You're a general-purpose assistant. Help confidently with:
- **General questions** — facts, explanations, how things work
- **Writing & rewriting** — emails, essays, captions, polishing text
- **Summarizing** — articles, notes, long passages
- **Brainstorming** — ideas, names, plans, creative angles
- **Coding & debugging** — explain code, fix bugs, suggest improvements (any language)
- **Study help** — explain concepts, solve problems, quiz prep
- **Productivity** — to-do plans, scheduling tips, decision frameworks
- **Casual conversation** — small talk, recommendations, opinions
- **Cybersecurity questions** — you do still know security topics; answer them like any other topic in plain language

## Response Format
**ALWAYS respond in plain natural language with markdown.**
- NEVER output raw JSON
- NEVER output structured analysis blocks like {"verdict":..., "riskScore":...}
- Just be a helpful assistant having a natural conversation

## Safety
- Don't help with creating malware, real exploits, hacking instructions, or illegal activity
- For sensitive topics (medical, legal, financial), suggest consulting a professional
- Refuse politely and offer a safer alternative when needed

Be the kind of AI assistant people enjoy chatting with — useful, smart, and human.`;

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
}

// ---- Limits ----
const MAX_PAYLOAD_BYTES = 200_000; // ~200 KB (allows small base64 images)
const MAX_MESSAGES = 30;
const MAX_TEXT_LEN = 8_000; // per text part / string content
const MAX_IMAGE_DATA_URL_LEN = 180_000; // ~130 KB image after base64

// ---- Per-IP rate limiting (best-effort, in-memory) ----
const RATE_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_MAX = 15;              // 15 chat requests / minute / IP
const ipHits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || entry.resetAt < now) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

function validateMessages(messages: unknown): { ok: true; value: Message[] } | { ok: false; error: string } {
  if (!Array.isArray(messages)) return { ok: false, error: "messages must be an array" };
  if (messages.length === 0) return { ok: false, error: "messages is empty" };
  if (messages.length > MAX_MESSAGES) return { ok: false, error: "Too many messages" };

  const out: Message[] = [];
  for (const m of messages) {
    if (!m || typeof m !== "object") return { ok: false, error: "Invalid message" };
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant" && role !== "system") {
      return { ok: false, error: "Invalid message role" };
    }
    if (typeof content === "string") {
      if (content.length > MAX_TEXT_LEN) return { ok: false, error: "Message too long" };
      out.push({ role, content });
      continue;
    }
    if (Array.isArray(content)) {
      const parts: MessageContent[] = [];
      for (const p of content) {
        if (!p || typeof p !== "object") return { ok: false, error: "Invalid content part" };
        const type = (p as { type?: unknown }).type;
        if (type === "text") {
          const text = (p as { text?: unknown }).text;
          if (typeof text !== "string" || text.length > MAX_TEXT_LEN) {
            return { ok: false, error: "Invalid text part" };
          }
          parts.push({ type: "text", text });
        } else if (type === "image_url") {
          const url = (p as { image_url?: { url?: unknown } }).image_url?.url;
          if (typeof url !== "string") return { ok: false, error: "Invalid image_url" };
          if (!url.startsWith("data:image/") && !url.startsWith("https://")) {
            return { ok: false, error: "Image URL not allowed" };
          }
          if (url.length > MAX_IMAGE_DATA_URL_LEN) {
            return { ok: false, error: "Image too large" };
          }
          parts.push({ type: "image_url", image_url: { url } });
        } else {
          return { ok: false, error: "Unknown content type" };
        }
      }
      out.push({ role, content: parts });
      continue;
    }
    return { ok: false, error: "Invalid message content" };
  }
  return { ok: true, value: out };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const ip = req.headers.get("cf-connecting-ip")
      ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      ?? "unknown";

    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: "Too many requests. Please slow down." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const raw = await req.text();
    if (raw.length > MAX_PAYLOAD_BYTES) {
      return new Response(JSON.stringify({ error: "Payload too large" }), {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let body: RequestBody;
    try {
      body = JSON.parse(raw);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const validation = validateMessages(body.messages);
    if (!validation.ok) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Service unavailable" }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
          { role: "system", content: SYSTEM_PROMPT },
          ...validation.value,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please contact the site owner." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Cyber Saathi error:", error);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
