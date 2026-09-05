import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { text, voice = "Kore", style = "natural, confident commercial narration", language } = await request.json();

    if (!text?.trim()) {
      return NextResponse.json({ error: "Voice text is required." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY_ || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY_ is not configured." }, { status: 503 });
    }

    const model = process.env.GEMINI_TTS_MODEL || "gemini-3.1-flash-tts-preview";
    const spokenPrompt = `Read the following text exactly as written. Voice direction: ${style}. Do not add, remove, translate, or explain any words.\n\n${text.trim()}`;
    const speechConfig = language ? [{ voice, language }] : [{ voice }];

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
        "Api-Revision": "2026-05-20"
      },
      body: JSON.stringify({
        model,
        input: spokenPrompt,
        response_format: {
          type: "audio",
          mime_type: "audio/wav",
          delivery: "inline"
        },
        generation_config: {
          speech_config: speechConfig
        }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data?.error?.message || "Gemini voice request failed." }, { status: response.status });
    }

    const audio = data?.steps
      ?.flatMap((step) => Array.isArray(step?.content) ? step.content : [])
      ?.find((item) => item?.type === "audio" && item?.data);

    if (!audio?.data) {
      return NextResponse.json({ error: "Gemini did not return audio data." }, { status: 502 });
    }

    const audioBuffer = Buffer.from(audio.data, "base64");
    return new Response(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": audio.mime_type || "audio/wav",
        "Cache-Control": "no-store",
        "X-Voice-Provider": "gemini"
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unexpected server error." }, { status: 500 });
  }
}
