"use client";

import { useMemo, useState } from "react";

const starterScenes = [
  {
    n: 1,
    title: "Opening hook",
    start: "00:00",
    end: "00:08",
    duration: 8,
    visual: "Opening hero shot — describe location, subject, lighting and camera movement.",
    camera: "Slow cinematic push-in",
    continuity: "Keep the main subject consistent.",
    voice: "Write the exact voiceover for this scene.",
    onScreenText: "",
    subtitle: "",
    sfx: "",
    music: "",
    logoUse: "None",
    footerUse: "None",
  },
];

function Icon({ name }) {
  const icons = {
    script: <svg viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5"/><path d="M8 12h8"/><path d="M8 16h5"/></svg>,
    scenes: <svg viewBox="0 0 24 24"><rect x="3" y="5" width="5" height="14" rx="2"/><rect x="10" y="3" width="5" height="18" rx="2"/><rect x="17" y="7" width="4" height="10" rx="2"/></svg>,
    voice: <svg viewBox="0 0 24 24"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/><path d="M9 21h6"/></svg>,
    reference: <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m5 18 5-5 3 3 2-2 4 4"/></svg>,
    logo: <svg viewBox="0 0 24 24"><path d="M12 3 20 8v8l-8 5-8-5V8l8-5Z"/><circle cx="12" cy="12" r="3"/></svg>,
    footer: <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 15h18"/><path d="M7 18h4"/><path d="M14 18h3"/></svg>,
    product: <svg viewBox="0 0 24 24"><path d="m6 7 6-3 6 3v10l-6 3-6-3V7Z"/><path d="m6 7 6 3 6-3"/><path d="M12 10v10"/></svg>,
    settings: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.08-1l2-1.5-2-3.4-2.45 1a8 8 0 0 0-1.7-1L14.5 3h-5l-.27 3.1a8 8 0 0 0-1.7 1l-2.45-1-2 3.4L5.08 11a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.45-1a8 8 0 0 0 1.7 1L9.5 21h5l.27-3.1a8 8 0 0 0 1.7-1l2.45 1 2-3.4-2-1.5c.05-.33.08-.66.08-1Z"/></svg>,
  };
  return <span className="a2z-icon text-white">{icons[name]}</span>;
}

function AssetUpload({ label, hint, icon, file, onChange }) {
  return (
    <label className="a2z-card a2z-card-hover group cursor-pointer p-5">
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
      <div className="flex items-start justify-between gap-4">
        <Icon name={icon} />
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${file ? "bg-emerald-400/10 text-emerald-300" : "bg-white/[.04] text-zinc-500"}`}>
          {file ? "READY" : "UPLOAD"}
        </span>
      </div>
      <p className="mt-5 font-semibold">{label}</p>
      <p className="mt-1 min-h-10 text-sm leading-5 text-zinc-500">{file ? file.name : hint}</p>
      <p className="mt-4 text-xs text-violet-300">{file ? "Click to replace" : "+ Add image"}</p>
    </label>
  );
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    if (file.size > 3 * 1024 * 1024) return reject(new Error(`${file.name} is larger than 3 MB. Please compress it first.`));
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.readAsDataURL(file);
  });
}

const modeHelp = {
  simple: "Write a short idea. Gemini will create the storyboard for you.",
  advanced: "Paste a complete storyboard with SCENE, Visual Prompt, SFX, On-Screen Text and VO sections. Gemini will preserve and structure it.",
};

export default function CreateVideo() {
  const [mode, setMode] = useState("advanced");
  const [script, setScript] = useState("");
  const [duration, setDuration] = useState("60");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [style, setStyle] = useState("Cinematic documentary");
  const [language, setLanguage] = useState("Bengali");
  const [musicMood, setMusicMood] = useState("Emotional → inspiring crescendo");
  const [voiceStyle, setVoiceStyle] = useState("Heartfelt, professional, confident");
  const [voiceName, setVoiceName] = useState("Kore");
  const [subtitles, setSubtitles] = useState(true);
  const [backgroundMusic, setBackgroundMusic] = useState(true);
  const [referenceStrength, setReferenceStrength] = useState("Medium");
  const [logoPolicy, setLogoPolicy] = useState("Outro + key brand moments");
  const [footerPolicy, setFooterPolicy] = useState("CTA / outro only");

  const [reference, setReference] = useState(null);
  const [product, setProduct] = useState(null);
  const [logo, setLogo] = useState(null);
  const [footerReference, setFooterReference] = useState(null);
  const [footerText, setFooterText] = useState("");

  const [project, setProject] = useState(null);
  const [globalDirection, setGlobalDirection] = useState(null);
  const [scenes, setScenes] = useState(starterScenes);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [voiceBusy, setVoiceBusy] = useState({});
  const [voiceErrors, setVoiceErrors] = useState({});
  const [audioUrls, setAudioUrls] = useState({});

  const total = useMemo(() => scenes.reduce((sum, scene) => sum + Number(scene.duration || 0), 0), [scenes]);
  const assetsReady = [reference, product, logo, footerReference].filter(Boolean).length;

  async function generate() {
    setBusy(true);
    setStatus("");
    try {
      const [referenceDataUrl, productDataUrl, logoDataUrl, footerDataUrl] = await Promise.all([
        fileToDataUrl(reference),
        fileToDataUrl(product),
        fileToDataUrl(logo),
        fileToDataUrl(footerReference),
      ]);

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script,
          mode,
          context: {
            targetDuration: Number(duration),
            aspectRatio,
            visualStyle: style,
            language,
            musicMood,
            voiceStyle,
            subtitles,
            backgroundMusic,
            referenceStrength,
            logoPolicy,
            footerPolicy,
            footerText,
            hasReference: Boolean(reference),
            hasProduct: Boolean(product),
            hasLogo: Boolean(logo),
            hasFooterReference: Boolean(footerReference),
          },
          referenceDataUrl,
          productDataUrl,
          logoDataUrl,
          footerDataUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Storyboard generation failed.");

      setProject(data.project || null);
      setGlobalDirection(data.globalDirection || null);

      if (Array.isArray(data.scenes) && data.scenes.length) {
        setScenes(data.scenes.map((s, i) => ({
          n: s.scene || i + 1,
          title: s.title || `Scene ${i + 1}`,
          start: s.start || "",
          end: s.end || "",
          duration: Number(s.duration) || 5,
          visual: s.visual || "",
          camera: s.camera || "",
          continuity: s.continuity || "",
          voice: s.voice || "",
          onScreenText: s.onScreenText || "",
          subtitle: s.subtitle || s.voice || "",
          sfx: s.sfx || "",
          music: s.music || "",
          logoUse: s.logoUse || "None",
          footerUse: s.footerUse || "None",
        })));
        setAudioUrls({});
        setVoiceErrors({});
      }

      setStatus("Storyboard parsed successfully. Scene prompts, VO, SFX, text, logo and footer instructions are ready.");
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
          style: `${voiceStyle}. Language: ${language}. ${style}. Natural narration with clear pacing.`,
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

  async function generateAllVoices() {
    for (let i = 0; i < scenes.length; i += 1) {
      if (scenes[i]?.voice?.trim()) await generateVoice(i);
    }
  }

  function updateScene(i, key, value) {
    setScenes((current) => current.map((scene, idx) => idx === i ? { ...scene, [key]: value } : scene));
  }

  return (
    <main className="a2z-shell a2z-grid min-h-screen text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="/" className="font-bold tracking-tight">A2ZCreate<span className="text-violet-400">.</span></a>
        <a href="/dashboard" className="text-sm text-zinc-400 hover:text-white">← Dashboard</a>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_.78fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs text-zinc-300"><span className="h-1.5 w-1.5 rounded-full bg-violet-400"/> Storyboard → scenes → Gemini voice</div>
            <h1 className="text-5xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">Paste the whole storyboard. <span className="text-zinc-500">We structure it.</span></h1>
            <p className="mt-5 max-w-3xl leading-7 text-zinc-400">Use a simple brief or paste a detailed production document like your Foshol AI storyboard. A2ZCreate extracts every scene, VO, SFX, screen text, camera instruction and brand asset rule.</p>
          </div>

          <div className="a2z-card p-5">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-white/[.035] p-4"><p className="text-2xl font-semibold">{scenes.length}</p><p className="mt-1 text-xs text-zinc-500">Scenes</p></div>
              <div className="rounded-2xl bg-white/[.035] p-4"><p className="text-2xl font-semibold">{total}s</p><p className="mt-1 text-xs text-zinc-500">Planned</p></div>
              <div className="rounded-2xl bg-white/[.035] p-4"><p className="text-2xl font-semibold">{assetsReady}/4</p><p className="mt-1 text-xs text-zinc-500">Assets</p></div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-3 rounded-2xl border border-white/10 bg-white/[.025] p-2 sm:grid-cols-2">
          {[{ key: "simple", title: "Simple Prompt", desc: "Short idea → AI storyboard" }, { key: "advanced", title: "Advanced Storyboard", desc: "Full SCENE / VO / SFX script → structured plan" }].map((item) => (
            <button key={item.key} type="button" onClick={() => setMode(item.key)} className={`rounded-xl p-4 text-left transition ${mode === item.key ? "bg-white text-black" : "text-zinc-300 hover:bg-white/[.04]"}`}>
              <p className="font-semibold">{item.title}</p>
              <p className={`mt-1 text-xs ${mode === item.key ? "text-zinc-600" : "text-zinc-500"}`}>{item.desc}</p>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-zinc-500">{modeHelp[mode]}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AssetUpload label="Visual reference" hint="Moodboard, campaign frame or visual style reference" icon="reference" file={reference} onChange={setReference} />
          <AssetUpload label="Product / subject" hint="Exact product, packaging, property or hero subject" icon="product" file={product} onChange={setProduct} />
          <AssetUpload label="Official logo" hint="Transparent PNG preferred; logo stays unchanged" icon="logo" file={logo} onChange={setLogo} />
          <AssetUpload label="Footer / end card" hint="CTA bar, footer strip or outro reference" icon="footer" file={footerReference} onChange={setFooterReference} />
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
          <section className="a2z-card p-6">
            <div className="flex items-start gap-4"><Icon name="script"/><div><h2 className="text-xl font-semibold">Video brief / storyboard</h2><p className="mt-1 text-sm text-zinc-500">Paste the complete content. Advanced mode preserves scene-by-scene instructions.</p></div></div>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="a2z-input mt-6 min-h-[440px] resize-y font-mono text-sm leading-6"
              placeholder={mode === "advanced" ? "[VIDEO SPECIFICATIONS]\nTarget Duration: 60 Seconds\nAspect Ratio: 16:9\nLanguage: Bengali\n\n### SCENE 1: The Struggle (00:00 - 00:08)\nVisual AI Prompt: ...\nSFX: ...\nOn-Screen Text: ...\nBangla Voiceover (VO): ...\n\n### SCENE 2: ..." : "Create a 60-second cinematic promotional video for a smart agriculture platform in Bangladesh. Show farmer struggle, AI disease detection, Bengali voice assistance, weather, market prices and a hopeful CTA."}
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div><label className="a2z-label">Footer / CTA text</label><input className="a2z-input" value={footerText} onChange={(e) => setFooterText(e.target.value)} placeholder="Website • phone • CTA • app link"/></div>
              <div><label className="a2z-label">Reference strength</label><select className="a2z-input" value={referenceStrength} onChange={(e) => setReferenceStrength(e.target.value)}>{["Low", "Medium", "High"].map((x) => <option key={x} value={x}>{x}</option>)}</select></div>
            </div>

            <button disabled={busy || !script.trim()} onClick={generate} className="a2z-btn a2z-btn-primary mt-6 w-full disabled:cursor-wait disabled:opacity-50">
              {busy ? "Parsing storyboard + brand assets…" : "Auto-build production plan →"}
            </button>
            {status && <p className="mt-4 rounded-xl border border-violet-400/20 bg-violet-400/5 p-3 text-sm text-violet-200">{status}</p>}
          </section>

          <aside className="a2z-card p-6">
            <div className="flex items-start gap-4"><Icon name="settings"/><div><p className="text-xs uppercase tracking-[.18em] text-zinc-500">Production setup</p><h2 className="mt-1 text-xl font-semibold">Global settings</h2></div></div>
            <div className="mt-6 space-y-4">
              <div><label className="a2z-label">Target duration</label><select className="a2z-input" value={duration} onChange={(e) => setDuration(e.target.value)}>{["30", "45", "60", "90", "120", "180"].map((x) => <option key={x} value={x}>{x} sec</option>)}</select></div>
              <div><label className="a2z-label">Aspect ratio</label><select className="a2z-input" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}><option value="16:9">16:9</option><option value="9:16">9:16</option><option value="1:1">1:1</option><option value="4:5">4:5</option></select></div>
              <div><label className="a2z-label">Visual style</label><input className="a2z-input" value={style} onChange={(e) => setStyle(e.target.value)} placeholder="Cinematic documentary"/></div>
              <div><label className="a2z-label">Language</label><select className="a2z-input" value={language} onChange={(e) => setLanguage(e.target.value)}>{["Bengali", "English", "Hindi", "Urdu"].map((x) => <option key={x} value={x}>{x}</option>)}</select></div>
              <div><label className="a2z-label">Voice style</label><input className="a2z-input" value={voiceStyle} onChange={(e) => setVoiceStyle(e.target.value)} /></div>
              <div><label className="a2z-label">Gemini voice</label><select className="a2z-input" value={voiceName} onChange={(e) => setVoiceName(e.target.value)}>{["Kore", "Puck", "Achernar", "Charon", "Fenrir"].map((x) => <option key={x} value={x}>{x}</option>)}</select></div>
              <div><label className="a2z-label">Music mood</label><input className="a2z-input" value={musicMood} onChange={(e) => setMusicMood(e.target.value)} /></div>
              <div><label className="a2z-label">Logo placement</label><select className="a2z-input" value={logoPolicy} onChange={(e) => setLogoPolicy(e.target.value)}><option>Outro + key brand moments</option><option>Outro only</option><option>All scenes</option><option>AI decides</option></select></div>
              <div><label className="a2z-label">Footer placement</label><select className="a2z-input" value={footerPolicy} onChange={(e) => setFooterPolicy(e.target.value)}><option>CTA / outro only</option><option>All scenes</option><option>Selected scenes</option><option>AI decides</option></select></div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setSubtitles(!subtitles)} className="a2z-input text-left text-sm">{subtitles ? "✓" : "○"} Subtitles</button>
                <button type="button" onClick={() => setBackgroundMusic(!backgroundMusic)} className="a2z-input text-left text-sm">{backgroundMusic ? "✓" : "○"} Music</button>
              </div>
            </div>
          </aside>
        </div>

        {(project || globalDirection) && (
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {project && <div className="a2z-card p-5"><p className="text-xs uppercase tracking-[.18em] text-zinc-500">Detected project</p><h3 className="mt-2 text-xl font-semibold">{project.title || "Video project"}</h3><div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-400"><span className="rounded-full bg-white/[.04] px-3 py-1">{project.targetDuration || duration}s</span><span className="rounded-full bg-white/[.04] px-3 py-1">{project.aspectRatio || aspectRatio}</span><span className="rounded-full bg-white/[.04] px-3 py-1">{project.language || language}</span><span className="rounded-full bg-white/[.04] px-3 py-1">{project.visualStyle || style}</span></div></div>}
            {globalDirection && <div className="a2z-card p-5"><p className="text-xs uppercase tracking-[.18em] text-zinc-500">Director notes</p><p className="mt-3 text-sm leading-6 text-zinc-400">{globalDirection.colorAndLighting || globalDirection.brandDirection || globalDirection.referenceDirection}</p><p className="mt-3 text-sm leading-6 text-zinc-500">{globalDirection.audioArc || globalDirection.editingRhythm}</p></div>}
          </div>
        )}

        <section className="a2z-card mt-5 p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-start gap-4"><Icon name="scenes"/><div><p className="text-xs uppercase tracking-[.18em] text-zinc-500">Production timeline</p><h2 className="mt-1 text-xl font-semibold">{scenes.length} editable scenes · {total}s</h2></div></div>
            <button type="button" onClick={generateAllVoices} className="a2z-btn a2z-btn-secondary text-sm">Generate all Gemini voices ▶</button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {scenes.map((scene, i) => (
              <article key={`${scene.n}-${i}`} className="rounded-2xl border border-white/10 bg-white/[.025] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div><p className="text-xs font-semibold text-violet-300">SCENE {scene.n}</p><input value={scene.title} onChange={(e) => updateScene(i, "title", e.target.value)} className="mt-1 w-full bg-transparent text-lg font-semibold outline-none"/></div>
                  <div className="text-right"><p className="text-xs text-zinc-500">{scene.start}{scene.start && scene.end ? " → " : ""}{scene.end}</p><div className="mt-2 flex items-center gap-1"><input value={scene.duration} onChange={(e) => updateScene(i, "duration", Number(e.target.value) || 1)} className="w-14 rounded-lg border border-white/10 bg-black/20 px-2 py-1 text-center text-xs"/><span className="text-xs text-zinc-500">sec</span></div></div>
                </div>

                <label className="mt-4 block text-[11px] uppercase tracking-wider text-zinc-600">Visual generation prompt</label>
                <textarea value={scene.visual} onChange={(e) => updateScene(i, "visual", e.target.value)} className="a2z-input mt-1 min-h-28 text-sm"/>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div><label className="block text-[11px] uppercase tracking-wider text-zinc-600">Camera</label><textarea value={scene.camera} onChange={(e) => updateScene(i, "camera", e.target.value)} className="a2z-input mt-1 min-h-20 text-sm"/></div>
                  <div><label className="block text-[11px] uppercase tracking-wider text-zinc-600">Continuity</label><textarea value={scene.continuity} onChange={(e) => updateScene(i, "continuity", e.target.value)} className="a2z-input mt-1 min-h-20 text-sm"/></div>
                </div>

                <label className="mt-3 block text-[11px] uppercase tracking-wider text-zinc-600">Voiceover</label>
                <textarea value={scene.voice} onChange={(e) => updateScene(i, "voice", e.target.value)} className="a2z-input mt-1 min-h-24 text-sm"/>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div><label className="block text-[11px] uppercase tracking-wider text-zinc-600">On-screen text</label><textarea value={scene.onScreenText} onChange={(e) => updateScene(i, "onScreenText", e.target.value)} className="a2z-input mt-1 min-h-20 text-sm"/></div>
                  <div><label className="block text-[11px] uppercase tracking-wider text-zinc-600">SFX</label><textarea value={scene.sfx} onChange={(e) => updateScene(i, "sfx", e.target.value)} className="a2z-input mt-1 min-h-20 text-sm"/></div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/[.07] bg-white/[.025] p-3"><p className="text-[10px] uppercase tracking-wider text-zinc-600">Logo</p><p className="mt-1 text-xs leading-5 text-zinc-400">{scene.logoUse || "None"}</p></div>
                  <div className="rounded-xl border border-white/[.07] bg-white/[.025] p-3"><p className="text-[10px] uppercase tracking-wider text-zinc-600">Footer / end card</p><p className="mt-1 text-xs leading-5 text-zinc-400">{scene.footerUse || "None"}</p></div>
                </div>

                <div className="mt-4 space-y-3">
                  <button type="button" disabled={voiceBusy[i] || !scene.voice?.trim()} onClick={() => generateVoice(i)} className="a2z-btn a2z-btn-secondary w-full text-sm disabled:cursor-wait disabled:opacity-50">{voiceBusy[i] ? "Generating Gemini voice…" : audioUrls[i] ? "Regenerate Gemini voice" : "Generate Gemini voice ▶"}</button>
                  {audioUrls[i] && <audio className="w-full" controls src={audioUrls[i]} />}
                  {voiceErrors[i] && <p className="text-xs text-red-300">{voiceErrors[i]}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-5 rounded-2xl border border-amber-300/15 bg-amber-300/[.04] p-4 text-sm leading-6 text-amber-100/80">
          This studio now auto-parses the full storyboard and generates scene-ready prompts + Gemini voices. Final Veo/Imagen clip generation and MP4 assembly still require a connected video-generation/render provider; the UI does not pretend a final video was rendered before that step exists.
        </div>
      </section>
    </main>
  );
}
