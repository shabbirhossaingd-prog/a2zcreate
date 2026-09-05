import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body?.scenes?.length) return NextResponse.json({ error: "At least one scene is required." }, { status: 400 });
  return NextResponse.json({
    status: "queued",
    message: "Render manifest created. Connect a persistent worker or external FFmpeg service for final MP4 rendering; Vercel Functions should not be used for long-running video encoding.",
    manifest: {
      scenes: body.scenes,
      voice: body.voice || null,
      music: body.music || null,
      subtitles: Boolean(body.subtitles),
      logo: body.logo || null,
      footer: body.footer || null,
    },
  });
}
