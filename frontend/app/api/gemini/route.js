import { NextResponse } from "next/server";

function addImagePart(parts, dataUrl, label) {
  if (!dataUrl?.startsWith("data:image/")) return;
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) return;
  parts.push(
    { text: label },
    { inline_data: { mime_type: match[1], data: match[2] } }
  );
}

export async function POST(request) {
  try {
    const {
      script,
      context = {},
      referenceDataUrl,
      logoDataUrl,
      footerDataUrl,
    } = await request.json();

    if (!script?.trim()) {
      return NextResponse.json({ error: "Script is required." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY_ || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY_ is not configured." }, { status: 503 });
    }

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const prompt = `You are the creative director for A2ZCreate. Convert the user's brief into a production-ready scene plan for a marketing video.

Rules:
- Split long videos into 5-10 second scenes.
- Preserve explicit visual and voice instructions.
- If a visual reference image is supplied, use it only for visual direction such as mood, lighting, framing, color, composition and pacing. Do not copy distinctive copyrighted artwork or exact composition.
- If a brand logo is supplied, keep the logo unchanged and describe where it should appear. Do not redraw or alter the logo.
- If a footer reference is supplied, treat it as the footer/end-card branding direction and keep text readable.
- Respect footer text supplied in brand context.
- Keep recurring subjects visually consistent across scenes.
- Return ONLY valid JSON.

Return this shape:
{"scenes":[{"scene":1,"duration":8,"visual":"...","camera":"...","voice":"...","onScreenText":"...","logoUse":"...","footerUse":"..."}],"style":"...","referenceDirection":"...","brandDirection":"..."}

Brand and production context: ${JSON.stringify(context)}

User brief:
${script}`;

    const parts = [{ text: prompt }];
    addImagePart(parts, referenceDataUrl, "VISUAL REFERENCE IMAGE — analyze style, mood, framing and visual direction only.");
    addImagePart(parts, logoDataUrl, "BRAND LOGO — preserve this logo accurately and specify appropriate placement in the video.");
    addImagePart(parts, footerDataUrl, "FOOTER / END-CARD REFERENCE — use this as footer branding and layout direction while keeping text readable.");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts }] }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "Gemini request failed." },
        { status: response.status }
      );
    }

    const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
    const clean = text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();

    try {
      return NextResponse.json(JSON.parse(clean));
    } catch {
      return NextResponse.json(
        { error: "Gemini returned invalid JSON.", raw: text },
        { status: 502 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Unexpected server error." },
      { status: 500 }
    );
  }
}
