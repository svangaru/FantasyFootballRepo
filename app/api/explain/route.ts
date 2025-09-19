// app/api/explain/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Ensure we run on the Node runtime (not Edge) so the OpenAI SDK works reliably.
export const runtime = "nodejs";

type WaiverReason = {
  type: "waiver";
  player: string;
  evor?: number;
  note?: string;
};

type StartSitReason = {
  type: "start_sit";
  decision: "start" | "sit";
  over?: string;
  margin?: number;
  risk_note?: string;
};

type Reason = WaiverReason | StartSitReason;

function fallbackText(reasons: Reason[]) {
  const parts: string[] = [];
  for (const r of reasons) {
    if (r.type === "waiver") {
      parts.push(
        `Waiver: ${r.player} adds ~${Number(r.evor ?? 0).toFixed(1)} pts. ${r.note ?? ""}`.trim()
      );
    } else if (r.type === "start_sit") {
      parts.push(
        `Start/Sit: ${r.decision} over ${r.over ?? "other"} by ${Number(r.margin ?? 0).toFixed(1)} pts. ${
          r.risk_note ? `(${r.risk_note})` : ""
        }`.trim()
      );
    }
  }
  return parts.join(" ");
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    reasons?: Reason[];
    style?: "short" | "detailed";
  };

  const reasons = Array.isArray(body?.reasons) ? body!.reasons! : [];
  const style = body?.style ?? "short";

  // If no reasons sent, fail fast.
  if (reasons.length === 0) {
    return NextResponse.json(
      { error: "Send { reasons: [...] } in the request body" },
      { status: 400 }
    );
  }

  // If no API key configured, return your current string builder.
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ text: fallbackText(reasons) });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const system = [
      "You are a fantasy football assistant.",
      "Explain the given waiver and start/sit decisions USING ONLY the numbers and facts provided.",
      "Do not invent statistics or probabilities.",
      style === "short"
        ? "Write brief bullet points, 1–2 lines per item."
        : "Write concise, friendly paragraphs; avoid repetition."
    ].join(" ");

    const userContent =
      "Here are the machine-computed reasons in JSON. Turn them into user-friendly explanations:\n\n" +
      JSON.stringify(reasons, null, 2);

    const resp = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: system },
        { role: "user", content: userContent }
      ]
    });

    const text =
      resp.choices?.[0]?.message?.content?.trim() || fallbackText(reasons);

    return NextResponse.json({ text });
  } catch (err: any) {
    console.error("explain route error:", err);
    // Fall back to deterministic text on any error so the UI still works.
    return NextResponse.json(
      { text: fallbackText(reasons), warning: "LLM explanation failed; using fallback." },
      { status: 200 }
    );
  }
}
