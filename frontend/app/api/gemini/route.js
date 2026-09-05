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
      mode = "advanced",
      context = {},
      referenceDataUrl,
      productDataUrl,
      logoDataUrl,
      footerDataUrl,
    } = await request.json();

    if (!script?.trim()) {
      return NextResponse.json({ error: "Script / storyboard is required." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY_ || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY_ is not configured." }, { status: 503 });
    }

    const rawModel = process.env.GEMINI_MODEL || "gemini-3.6-flash";
    const model = rawModel.replace(/^models\//, "");

    const prompt = `You are A2ZCreate's elite AI Video Director, cinematographer and production parser.

The user may paste either a short video brief or a long, scene-by-scene storyboard containing headings such as VIDEO SPECIFICATIONS, SCENE 1, Visual AI Prompt, SFX, On-Screen Text, Voiceover, VO, timestamps and duration. Parse the brief accurately instead of rewriting away explicit instructions.

MODE: ${mode}

PRODUCTION RULES:
- Respect explicit scene numbers, timestamps, durations, visual prompts, SFX, on-screen text and voiceover when supplied.
- If timestamps are present, preserve them. If not, create a logical 5-10 second scene structure.
- Keep the total duration as close as possible to the requested target duration.
- Preserve Bengali text exactly when the user provides Bengali voiceover or on-screen copy.
- Keep recurring people, products, clothing, locations and visual identity consistent across scenes.
- Turn each visual into a generation-ready cinematic prompt suitable for an image/video generation engine.
- Include camera framing/movement, lighting, environment, subject action, realism and continuity notes.
- Do not claim a clip has been rendered; this endpoint produces the production plan only.
- If a visual reference is supplied, use it only for mood, color, framing, lighting, editing rhythm and overall direction; do not duplicate distinctive artwork or exact composition.
- If a product image is supplied, keep that product as the hero subject and do not invent a materially different product.
- If a logo is supplied, preserve the logo unchanged. Never redraw or modify it. Follow logo placement policy from context.
- If a footer/end-card reference is supplied, use it as layout/branding direction. Follow footer policy from context.
- Keep CTA, website, phone, address and footer copy readable.
- If subtitles are enabled, return subtitle text for every voiced scene.
- Return ONLY valid JSON. No markdown fences.

RETURN EXACTLY THIS JSON SHAPE:
{
  "project": {
    "title": "...",
    "targetDuration": 60,
    "aspectRatio": "16:9",
    "language": "Bengali",
    "visualStyle": "...",
    "musicMood": "...",
    "voiceStyle": "..."
  },
  "scenes": [
    {
      "scene": 1,
      "title": "...",
      "start": "00:00",
      "end": "00:08",
      "duration": 8,
      "visual": "generation-ready visual prompt",
      "camera": "shot size + camera movement",
      "continuity": "subject/product continuity notes",
      "voice": "exact voiceover",
      "onScreenText": "exact screen text",
      "subtitle": "subtitle text",
      "sfx": "sound effects",
      "music": "music direction for this scene",
      "logoUse": "logo placement instruction or none",
      "footerUse": "footer/end-card instruction or none"
    }
  ],
  "globalDirection": {
    "referenceDirection": "...",
    "brandDirection": "...",
    "colorAndLighting": "...",
    "editingRhythm": "...",
    "audioArc": "...",
    "renderNotes": "..."
  }
}

PRODUCTION CONTEXT:
${JSON.stringify(context)}

USER SCRIPT / STORYBOARD:
${script}`;

    const parts = [{ text: prompt }];
    addImagePart(parts, referenceDataUrl, "VISUAL REFERENCE — extract mood, framing, lighting, color and pacing only; create a new composition.");
    addImagePart(parts, productDataUrl, "PRODUCT REFERENCE — preserve this exact product identity and appearance in relevant scenes.");
    addImagePart(parts, logoDataUrl, "OFFICIAL BRAND LOGO — keep unchanged and use only according to the requested logo placement policy.");
    addImagePart(parts, footerDataUrl, "FOOTER / END-CARD REFERENCE — use as branding/layout direction while keeping all text readable.");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: { responseMimeType: "application/json" },
        }),
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
      const parsed = JSON.parse(clean);
      return NextResponse.json(parsed);
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
