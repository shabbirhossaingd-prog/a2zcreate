import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { text, voiceId } = await request.json();
    if (!text?.trim()) return NextResponse.json({ error: "Voice text is required." }, { status: 400 });
    if (!process.env.ELEVENLABS_API_KEY) return NextResponse.json({ error: "ELEVENLABS_API_KEY is not configured." }, { status: 503 });

    const id = voiceId || process.env.ELEVENLABS_VOICE_ID;
    if (!id) return NextResponse.json({ error: "ELEVENLABS_VOICE_ID is not configured." }, { status: 503 });
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${id}`, {
      method: "POST",
      headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({ text, model_id: process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2", voice_settings: { stability: 0.45, similarity_boost: 0.8 } })
    });
    if (!response.ok) {
      const message = await response.text();
      return NextResponse.json({ error: message || "ElevenLabs request failed." }, { status: response.status });
    }
    return new Response(await response.arrayBuffer(), { status: 200, headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" } });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unexpected server error." }, { status: 500 });
  }
}
