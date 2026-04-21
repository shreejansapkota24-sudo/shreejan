import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages }: RequestBody = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
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
          JSON.stringify({ error: "AI credits exhausted. Please contact the site owner." }),
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
