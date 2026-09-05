import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { script, context = {} } = await request.json();
    if (!script?.trim()) return NextResponse.json({ error: "Script is required." }, { status: 400 });

    const apiKey = process.env.GEMINI_API_KEY_ || process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "GEMINI_API_KEY_ is not configured." }, { status: 503 });

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const prompt = `You are the creative director for A2ZCreate. Convert the user's brief into a production-ready scene plan. Split a long video into 5-10 second scenes. Preserve explicit visual and voice instructions. Return ONLY valid JSON with this shape: {"scenes":[{"scene":1,"duration":8,"visual":"...","camera":"...","voice":"...","onScreenText":"..."}],"style":"..."}. Brand context: ${JSON.stringify(context)}\n\nUser brief:\n${script}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data?.error?.message || "Gemini request failed." }, { status: response.status });

    const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
    const clean = text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    let plan;
    try {
      plan = JSON.parse(clean);
    } catch {
      return NextResponse.json({ error: "Gemini returned invalid JSON.", raw: text }, { status: 502 });
    }

    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unexpected server error." }, { status: 500 });
  }
}
