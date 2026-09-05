"use client";

import { useState } from "react";

function Icon({ name }) {
  const icons = {
    inspiration: <svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8 15 3-3 2 2 3-4 2 5"/><circle cx="9" cy="9" r="1"/></svg>,
    product: <svg viewBox="0 0 24 24"><path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5"/><path d="M12 12v9"/></svg>,
    logo: <svg viewBox="0 0 24 24"><path d="M12 3 20 8v8l-8 5-8-5V8l8-5Z"/><path d="m9 12 2 2 4-5"/></svg>,
    brief: <svg viewBox="0 0 24 24"><path d="M7 4h10a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2Z"/><path d="M9 9h6"/><path d="M9 13h5"/></svg>,
    sparkle: <svg viewBox="0 0 24 24"><path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/><path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"/></svg>,
  };
  return <span className="a2z-icon text-white">{icons[name]}</span>;
}

function UploadBox({ label, hint, file, onChange, accept, icon, tone }) {
  return <label className="group a2z-card a2z-card-hover flex min-h-44 cursor-pointer flex-col justify-between p-5">
    <input type="file" accept={accept} className="hidden" onChange={(e) => onChange(e.target.files?.[0] || null)} />
    <div className="flex items-start justify-between gap-4"><Icon name={icon}/><span className={`rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[.16em] ${tone || "text-zinc-400"}`}>{file ? "Uploaded" : "Upload"}</span></div>
    <div><p className="font-semibold">{label}</p><p className="mt-1 text-sm leading-6 text-zinc-500">{hint}</p><p className="mt-4 truncate rounded-xl border border-white/10 bg-white/[.025] px-3 py-2 text-xs text-zinc-400">{file ? file.name : "Click to select file"}</p></div>
  </label>;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function CreatePoster() {
  const [inspiration, setInspiration] = useState(null);
  const [product, setProduct] = useState(null);
  const [logo, setLogo] = useState(null);
  const [company, setCompany] = useState("");
  const [script, setScript] = useState("");
  const [audience, setAudience] = useState("");
  const [theme, setTheme] = useState("Modern");
  const [footer, setFooter] = useState(true);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  async function generate() {
    setBusy(true); setStatus(""); setResult(null);
    try {
      const payload = {
        company, audience, script, theme, footer,
        inspirationDataUrl: await fileToDataUrl(inspiration),
        productDataUrl: await fileToDataUrl(product),
        logoDataUrl: await fileToDataUrl(logo),
      };
      const res = await fetch("/api/poster/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Poster analysis failed.");
      setResult(data);
      setStatus("Poster direction generated successfully. The next render step can turn this spec into final artwork.");
    } catch (e) { setStatus(e.message); } finally { setBusy(false); }
  }

  return <main className="a2z-shell a2z-grid min-h-screen text-white">
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6"><a href="/" className="font-bold tracking-tight">A2ZCreate<span className="text-violet-400">.</span></a><a href="/dashboard" className="text-sm text-zinc-400 hover:text-white">← Dashboard</a></header>
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_.72fr] lg:items-end"><div className="max-w-3xl"><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs text-zinc-300"><span className="h-1.5 w-1.5 rounded-full bg-blue-400"/> Inspiration aware poster maker</div><h1 className="text-5xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">Upload reference. <span className="text-zinc-500">Create original.</span></h1><p className="mt-5 leading-7 text-zinc-400">Upload a Pinterest-style inspiration poster, product photo and logo. AI extracts layout mood but creates a new composition with your script and footer.</p></div><div className="a2z-card p-5"><div className="grid grid-cols-3 gap-3 text-center"><div className="rounded-2xl bg-white/[.035] p-4"><p className="text-2xl font-semibold">4:5</p><p className="mt-1 text-xs text-zinc-500">Poster</p></div><div className="rounded-2xl bg-white/[.035] p-4"><p className="text-2xl font-semibold">AI</p><p className="mt-1 text-xs text-zinc-500">Vision</p></div><div className="rounded-2xl bg-white/[.035] p-4"><p className="text-2xl font-semibold">PNG</p><p className="mt-1 text-xs text-zinc-500">Ready</p></div></div></div></div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <UploadBox label="Inspiration poster" hint="Upload a reference for layout, mood, typography and spacing." file={inspiration} onChange={setInspiration} accept="image/*" icon="inspiration" tone="text-violet-300"/>
        <UploadBox label="Product image" hint="Upload the exact product, property or service visual to feature." file={product} onChange={setProduct} accept="image/*" icon="product" tone="text-emerald-300"/>
        <UploadBox label="Brand logo" hint="Transparent PNG is best for clean placement and footer branding." file={logo} onChange={setLogo} accept="image/*" icon="logo" tone="text-blue-300"/>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <section className="a2z-card p-6"><div className="mb-6 flex items-start gap-4"><Icon name="brief"/><div><h2 className="text-xl font-semibold">Creative brief</h2><p className="mt-1 text-sm text-zinc-500">Tell the AI what the poster needs to communicate.</p></div></div>
          <div className="grid gap-5 md:grid-cols-2"><div><label className="a2z-label">Company / brand</label><input className="a2z-input" value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. Apon Asset"/></div><div><label className="a2z-label">Target audience</label><input className="a2z-input" value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g. Young families and investors"/></div></div>
          <div className="mt-5"><label className="a2z-label">Poster script / message</label><textarea className="a2z-input min-h-36 resize-y" value={script} onChange={e => setScript(e.target.value)} placeholder="Headline, offer, supporting text, CTA or a simple campaign brief..."/></div>
          <div className="mt-5 grid gap-5 md:grid-cols-2"><div><label className="a2z-label">Visual theme</label><select className="a2z-input" value={theme} onChange={e => setTheme(e.target.value)}>{["Modern", "Luxury", "Minimal", "Corporate", "Bold", "Editorial", "Festival"].map(x => <option key={x}>{x}</option>)}</select></div><div><label className="a2z-label">Footer</label><button type="button" onClick={() => setFooter(!footer)} className="a2z-input text-left">{footer ? "✓ Footer enabled" : "○ Footer disabled"}<span className="ml-2 text-xs text-zinc-500">Website • phone • CTA • QR</span></button></div></div>
          <button disabled={busy} onClick={generate} className="a2z-btn a2z-btn-primary mt-7 w-full disabled:cursor-wait disabled:opacity-50">{busy ? "Analyzing reference…" : "Analyze & create direction →"}</button>{status && <p className="mt-4 rounded-xl border border-violet-400/20 bg-violet-400/5 p-3 text-sm text-violet-200">{status}</p>}
          {result && <div className="mt-5 rounded-2xl border border-white/10 bg-white/[.025] p-5"><p className="text-xs uppercase tracking-[.18em] text-zinc-500">AI direction</p><h3 className="mt-3 text-2xl font-semibold">{result.headline}</h3><p className="mt-2 text-zinc-400">{result.supportingText}</p><p className="mt-3 text-sm font-medium">CTA: {result.cta}</p><div className="mt-4 grid gap-3 text-sm text-zinc-400 md:grid-cols-2"><p>Layout: {result.layout}</p><p>Typography: {result.typography}</p><p>Product: {result.productPlacement}</p><p>Logo: {result.logoPlacement}</p></div></div>}
        </section>

        <aside className="a2z-card overflow-hidden p-6"><div className="flex items-start gap-4"><Icon name="sparkle"/><div><p className="text-xs uppercase tracking-[.18em] text-zinc-500">Live preview</p><h2 className="mt-1 text-xl font-semibold">Poster composition</h2></div></div><div className="relative mx-auto mt-6 aspect-[4/5] max-w-sm overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-5 shadow-2xl"><div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/20 blur-2xl"/><div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-blue-500/15 blur-2xl"/><div className="relative flex items-center justify-between"><div className="h-8 w-24 rounded-full bg-white/10"/><div className="h-8 w-8 rounded-full border border-white/15 bg-white/5"/></div><div className="relative mt-14"><div className="mb-3 h-3 w-28 rounded-full bg-violet-400/40"/><div className="h-8 w-60 rounded-full bg-white/85"/><div className="mt-3 h-8 w-44 rounded-full bg-white/55"/><div className="mt-6 h-20 rounded-3xl border border-white/10 bg-white/[.04]"/></div><div className="relative mt-12 grid grid-cols-2 gap-3"><div className="h-28 rounded-3xl border border-white/10 bg-white/[.06]"/><div className="h-28 rounded-3xl border border-white/10 bg-white/[.03]"/></div><div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-3 text-[10px] text-zinc-500"><span>website.com</span><span>QR</span></div></div><div className="mt-6 space-y-3 text-sm text-zinc-400"><p>• Inspired by reference mood, not copied.</p><p>• Product and logo stay controlled.</p><p>• Footer stays readable for social media.</p></div></aside>
      </div>
    </section>
  </main>;
}
