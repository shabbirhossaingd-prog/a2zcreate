import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { company, audience, script, theme, footer, inspirationDataUrl, productDataUrl, logoDataUrl } = body;
    if (!script?.trim()) return NextResponse.json({ error: "Poster message is required." }, { status: 400 });

    const apiKey = process.env.GEMINI_API_KEY_ || process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "GEMINI_API_KEY_ is not configured." }, { status: 503 });

    const parts = [{ text: `Act as a senior social media art director. Create a NEW poster design specification using the supplied inspiration only as visual direction. Do not reproduce distinctive artwork, logos, brand marks, or exact composition. Prioritize the user's own product, logo, copy and footer. Return ONLY JSON: {"headline":"...","supportingText":"...","cta":"...","layout":"...","palette":["#..."],"typography":"...","productPlacement":"...","logoPlacement":"...","footerPlacement":"...","visualPrompt":"..."}. Brand: ${company || "Not provided"}. Audience: ${audience || "Not provided"}. Theme: ${theme || "Modern"}. Footer enabled: ${Boolean(footer)}. Brief: ${script}` }];

    const addImage = (dataUrl, label) => {
      if (!dataUrl?.startsWith("data:image/")) return;
      const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
      if (match) parts.push({ text: label }, { inline_data: { mime_type: match[1], data: match[2] } });
    };

    addImage(inspirationDataUrl, "INSPIRATION IMAGE — analyze layout, hierarchy, color and mood only.");
    addImage(productDataUrl, "PRODUCT IMAGE — preserve this product as the hero subject.");
    addImage(logoDataUrl, "LOGO — preserve this logo accurately.");

    const rawModel = process.env.GEMINI_MODEL || "gemini-3.6-flash";
    const model = rawModel.replace(/^models\//, "");
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts }] })
    });

    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data?.error?.message || "Gemini request failed." }, { status: response.status });

    const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
    const clean = text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    try {
      return NextResponse.json(JSON.parse(clean));
    } catch {
      return NextResponse.json({ error: "Gemini returned invalid JSON.", raw: text }, { status: 502 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unexpected server error." }, { status: 500 });
  }
}
