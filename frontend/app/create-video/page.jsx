"use client";

import { useMemo, useState } from "react";

const starterScenes = [
  { n: 1, duration: 8, visual: "Opening hero shot — describe location, subject, lighting and camera movement.", voice: "Write the exact voiceover for this scene.", onScreenText: "" },
  { n: 2, duration: 7, visual: "Show the product or service in use. Keep the subject consistent with the previous scene.", voice: "Continue the message naturally.", onScreenText: "" },
  { n: 3, duration: 8, visual: "Close with the strongest benefit and a clean brand moment.", voice: "Finish with the CTA.", onScreenText: "" },
];

function Icon({ name }) {
  const icons = {
    script: <svg viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5"/><path d="M8 12h8"/><path d="M8 16h5"/></svg>,
    scenes: <svg viewBox="0 0 24 24"><rect x="3" y="5" width="5" height="14" rx="2"/><rect x="10" y="3" width="5" height="18" rx="2"/><rect x="17" y="7" width="4" height="10" rx="2"/></svg>,
    voice: <svg viewBox="0 0 24 24"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/><path d="M9 21h6"/></svg>,
    edit: <svg viewBox="0 0 24 24"><path d="m4 16 10-10 4 4L8 20H4v-4Z"/><path d="m13 7 4 4"/><path d="M16 4l4 4"/></svg>,
    brand: <svg viewBox="0 0 24 24"><path d="M12 3 20 8v8l-8 5-8-5V8l8-5Z"/><path d="M12 8v8"/><path d="m8 10 4-2 4 2"/></svg>,
  };
  return <span className="a2z-icon text-white">{icons[name]}</span>;
}

export default function CreateVideo() {
  const [script, setScript] = useState("");
  const [duration, setDuration] = useState("60");
  const [style, setStyle] = useState("Cinematic");
  const [voiceName, setVoiceName] = useState("Kore");
  const [scenes, setScenes] = useState(starterScenes);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [voiceBusy, setVoiceBusy] = useState({});
  const [voiceErrors, setVoiceErrors] = useState({});
  const [audioUrls, setAudioUrls] = useState({});
  const total = useMemo(() => scenes.reduce((a, s) => a + Number(s.duration || 0), 0), [scenes]);

  async function generate() {
    setBusy(true);
    setStatus("");
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script, context: { targetDuration: Number(duration), style } }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Scene generation failed.");
      if (Array.isArray(data.scenes)) {
        setScenes(data.scenes.map((s, i) => ({
          n: s.scene || i + 1,
          duration: Number(s.duration) || 5,
          visual: [s.visual, s.camera].filter(Boolean).join(" · "),
          voice: s.voice || "",
          onScreenText: s.onScreenText || "",
        })));
        setAudioUrls({});
        setVoiceErrors({});
      }
      setStatus("Gemini scene plan generated. Now generate Gemini voice for each scene.");
    } catch (e) {
      setStatus(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function generateVoice(i) {
    const scene = scenes[i];
    if (!scene?.voice?.trim()) {
      setVoiceErrors((prev) => ({ ...prev, [i]: "Add voiceover text first." }));
      return;
    }

    setVoiceBusy((prev) => ({ ...prev, [i]: true }));
    setVoiceErrors((prev) => ({ ...prev, [i]: "" }));

    try {
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: scene.voice,
          voice: voiceName,
          style: `${style}, natural professional commercial narration, clear pacing`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gemini voice generation failed.");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrls((prev) => {
        if (prev[i]) URL.revokeObjectURL(prev[i]);
        return { ...prev, [i]: url };
      });
    } catch (e) {
      setVoiceErrors((prev) => ({ ...prev, [i]: e.message }));
    } finally {
      setVoiceBusy((prev) => ({ ...prev, [i]: false }));
    }
  }

  function updateScene(i, key, value) {
    setScenes(scenes.map((s, idx) => idx === i ? { ...s, [key]: value } : s));
  }

  return <main className="a2z-shell a2z-grid min-h-screen text-white">
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <a href="/" className="font-bold tracking-tight">A2ZCreate<span className="text-violet-400">.</span></a>
      <a href="/dashboard" className="text-sm text-zinc-400 hover:text-white">← Dashboard</a>
    </header>

    <section className="mx-auto max-w-7xl px-6 pb-20 pt-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_.78fr] lg:items-end">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs text-zinc-300"><span className="h-1.5 w-1.5 rounded-full bg-violet-400"/> Gemini video + voice studio</div>
          <h1 className="text-5xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">Script in. <span className="text-zinc-500">Scenes + voice out.</span></h1>
          <p className="mt-5 leading-7 text-zinc-400">Gemini plans short scenes and can now generate narration for each scene from the same API key.</p>
        </div>
        <div className="a2z-card p-5">
          <div className="grid grid-cols-3 gap-3 text-center"><div className="rounded-2xl bg-white/[.035] p-4"><p className="text-2xl font-semibold">{scenes.length}</p><p className="mt-1 text-xs text-zinc-500">Scenes</p></div><div className="rounded-2xl bg-white/[.035] p-4"><p className="text-2xl font-semibold">{total}s</p><p className="mt-1 text-xs text-zinc-500">Planned</p></div><div className="rounded-2xl bg-white/[.035] p-4"><p className="text-2xl font-semibold">AI</p><p className="mt-1 text-xs text-zinc-500">Director</p></div></div>
        </div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <section className="a2z-card p-6">
          <div className="flex items-start gap-4"><Icon name="script"/><div><h2 className="text-xl font-semibold">Creative script</h2><p className="mt-1 text-sm text-zinc-500">Write voice and visual instructions directly in the script.</p></div></div>
          <textarea value={script} onChange={e => setScript(e.target.value)} className="a2z-input mt-6 min-h-72 resize-y" placeholder={'Scene 1\nVisual: drone shot of a modern building at golden hour.\nVoice: Welcome to a better way to live.\nDuration: 8 sec\n\nScene 2\nVisual: family enters the apartment...'} />
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div><label className="a2z-label">Video length</label><select className="a2z-input" value={duration} onChange={e => setDuration(e.target.value)}>{["30", "60", "90", "120", "180"].map(x => <option key={x}>{x}</option>)}</select></div>
            <div><label className="a2z-label">Visual style</label><select className="a2z-input" value={style} onChange={e => setStyle(e.target.value)}>{["Cinematic", "Realistic", "Commercial", "Documentary", "Social-first", "Minimal"].map(x => <option key={x}>{x}</option>)}</select></div>
            <div><label className="a2z-label">Gemini voice</label><select className="a2z-input" value={voiceName} onChange={e => setVoiceName(e.target.value)}>{["Kore", "Puck", "Achernar", "Charon", "Fenrir"].map(x => <option key={x}>{x}</option>)}</select></div>
          </div>
          <button disabled={busy} onClick={generate} className="a2z-btn a2z-btn-primary mt-6 w-full disabled:cursor-wait disabled:opacity-50">{busy ? "Planning scenes…" : "Break script into scenes →"}</button>
          {status && <p className="mt-4 rounded-xl border border-violet-400/20 bg-violet-400/5 p-3 text-sm text-violet-200">{status}</p>}
        </section>

        <aside className="a2z-card p-6">
          <div className="flex items-start justify-between gap-4"><div className="flex items-start gap-4"><Icon name="scenes"/><div><p className="text-xs uppercase tracking-[.18em] text-zinc-500">Editable timeline</p><h2 className="mt-1 text-xl font-semibold">Scene cards</h2></div></div><span className="rounded-full bg-white/[.04] px-3 py-1 text-xs text-zinc-400">{total}s</span></div>
          <div className="mt-6 space-y-3">{scenes.map((s, i) => <div key={s.n} className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
            <div className="flex items-center justify-between"><span className="inline-flex items-center gap-2 text-sm font-semibold"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[.06] text-xs text-zinc-400">{s.n}</span> Scene {s.n}</span><div className="flex items-center gap-2"><input value={s.duration} onChange={e => updateScene(i, "duration", Number(e.target.value) || 1)} className="w-16 rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-center text-xs"/><span className="text-xs text-zinc-500">sec</span></div></div>
            <label className="mt-4 block text-[11px] uppercase tracking-wider text-zinc-600">Visual prompt</label><textarea value={s.visual} onChange={e => updateScene(i, "visual", e.target.value)} className="a2z-input mt-1 min-h-20 text-sm"/>
            <label className="mt-3 block text-[11px] uppercase tracking-wider text-zinc-600">Voiceover</label><textarea value={s.voice} onChange={e => updateScene(i, "voice", e.target.value)} className="a2z-input mt-1 min-h-16 text-sm"/>
            <div className="mt-3 flex flex-col gap-3">
              <button type="button" disabled={voiceBusy[i] || !s.voice?.trim()} onClick={() => generateVoice(i)} className="a2z-btn a2z-btn-secondary w-full text-sm disabled:cursor-wait disabled:opacity-50">{voiceBusy[i] ? "Generating Gemini voice…" : audioUrls[i] ? "Regenerate voice" : "Generate Gemini voice ▶"}</button>
              {audioUrls[i] && <audio className="w-full" controls src={audioUrls[i]} />}
              {voiceErrors[i] && <p className="text-xs text-red-300">{voiceErrors[i]}</p>}
            </div>
          </div>)}</div>
        </aside>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="a2z-card a2z-card-hover p-5"><Icon name="voice"/><p className="mt-5 text-xs text-zinc-500">VOICE</p><p className="mt-2 font-medium">Gemini TTS voiceover</p><p className="mt-1 text-sm text-zinc-500">Generate and preview narration scene by scene.</p></div>
        <div className="a2z-card a2z-card-hover p-5"><Icon name="edit"/><p className="mt-5 text-xs text-zinc-500">EDIT</p><p className="mt-2 font-medium">Music + cuts + subtitles</p><p className="mt-1 text-sm text-zinc-500">Prepare final render instructions.</p></div>
        <div className="a2z-card a2z-card-hover p-5"><Icon name="brand"/><p className="mt-5 text-xs text-zinc-500">BRAND</p><p className="mt-2 font-medium">Logo + footer</p><p className="mt-1 text-sm text-zinc-500">Keep every scene on brand.</p></div>
      </div>
    </section>
  </main>;
}
