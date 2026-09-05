"use client";

import { useState } from "react";

function UploadBox({ label, hint, file, onChange, accept, accent }) {
  return <label className="group flex min-h-36 cursor-pointer flex-col justify-between rounded-2xl border border-dashed border-white/10 bg-white/[.025] p-5 transition hover:border-white/25 hover:bg-white/[.04]">
    <input type="file" accept={accept} className="hidden" onChange={(e) => onChange(e.target.files?.[0] || null)} />
    <div className="flex items-start justify-between"><div><p className="font-semibold">{label}</p><p className="mt-1 text-xs text-zinc-500">{hint}</p></div><span className="text-xl text-zinc-500">{file ? "✓" : "+"}</span></div>
    <p className={`text-xs ${accent || "text-zinc-400"}`}>{file ? file.name : "Click to upload"}</p>
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
  const [inspiration, setInspiration] = useState(null), [product, setProduct] = useState(null), [logo, setLogo] = useState(null);
  const [company, setCompany] = useState(""), [script, setScript] = useState(""), [audience, setAudience] = useState(""), [theme, setTheme] = useState("Modern"), [footer, setFooter] = useState(true);
  const [status, setStatus] = useState(""), [result, setResult] = useState(null), [busy, setBusy] = useState(false);

  async function generate() {
    setBusy(true); setStatus(""); setResult(null);
    try {
      const payload = { company, audience, script, theme, footer, inspirationDataUrl: await fileToDataUrl(inspiration), productDataUrl: await fileToDataUrl(product), logoDataUrl: await fileToDataUrl(logo) };
      const res = await fetch("/api/poster/analyze", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload) });
      const data = await res.json(); if (!res.ok) throw new Error(data.error || "Poster analysis failed.");
      setResult(data); setStatus("Poster direction generated successfully. The next render step can turn this spec into the final artwork.");
    } catch (e) { setStatus(e.message); } finally { setBusy(false); }
  }

  return <main className="a2z-shell min-h-screen text-white"><header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6"><a href="/" className="font-bold">A2ZCreate<span className="text-violet-400">.</span></a><a href="/dashboard" className="text-sm text-zinc-400 hover:text-white">← Dashboard</a></header>
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-8"><div className="max-w-3xl"><p className="text-xs uppercase tracking-[.2em] text-violet-400">AI poster studio</p><h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Create a poster from your idea — or your inspiration.</h1><p className="mt-4 leading-7 text-zinc-400">Upload an inspiration poster, your product and logo. The AI studies the reference for visual direction while your content, branding and product stay in control.</p></div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3"><UploadBox label="Inspiration poster" hint="PNG, JPG, WEBP" file={inspiration} onChange={setInspiration} accept="image/*" accent="text-violet-300"/><UploadBox label="Product image" hint="Use the exact product you want shown" file={product} onChange={setProduct} accept="image/*" accent="text-emerald-300"/><UploadBox label="Brand logo" hint="Transparent PNG recommended" file={logo} onChange={setLogo} accept="image/*" accent="text-blue-300"/></div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_.65fr]"><section className="a2z-card p-6"><div className="mb-6"><h2 className="text-xl font-semibold">Creative brief</h2><p className="mt-1 text-sm text-zinc-500">Tell the AI what the poster needs to communicate.</p></div>
        <div className="grid gap-5 md:grid-cols-2"><div><label className="a2z-label">Company / brand</label><input className="a2z-input" value={company} onChange={e=>setCompany(e.target.value)} placeholder="e.g. Apon Asset"/></div><div><label className="a2z-label">Target audience</label><input className="a2z-input" value={audience} onChange={e=>setAudience(e.target.value)} placeholder="e.g. Young families and investors"/></div></div>
        <div className="mt-5"><label className="a2z-label">Poster script / message</label><textarea className="a2z-input min-h-36 resize-y" value={script} onChange={e=>setScript(e.target.value)} placeholder="Headline, offer, supporting text, CTA or a simple campaign brief..."/></div>
        <div className="mt-5 grid gap-5 md:grid-cols-2"><div><label className="a2z-label">Visual theme</label><select className="a2z-input" value={theme} onChange={e=>setTheme(e.target.value)}>{['Modern','Luxury','Minimal','Corporate','Bold','Editorial','Festival'].map(x=><option key={x}>{x}</option>)}</select></div><div><label className="a2z-label">Footer</label><button type="button" onClick={()=>setFooter(!footer)} className="a2z-input text-left">{footer?'✓ Footer enabled':'○ Footer disabled'}<span className="ml-2 text-xs text-zinc-500">Website • phone • CTA • QR</span></button></div></div>
        <button disabled={busy} onClick={generate} className="a2z-btn a2z-btn-primary mt-7 w-full disabled:cursor-wait disabled:opacity-50">{busy?'Analyzing reference…':'Analyze & create direction →'}</button>{status&&<p className="mt-4 rounded-xl border border-violet-400/20 bg-violet-400/5 p-3 text-sm text-violet-200">{status}</p>}
        {result&&<div className="mt-5 rounded-2xl border border-white/10 bg-white/[.025] p-5"><p className="text-xs uppercase tracking-[.18em] text-zinc-500">AI direction</p><h3 className="mt-3 text-2xl font-semibold">{result.headline}</h3><p className="mt-2 text-zinc-400">{result.supportingText}</p><p className="mt-3 text-sm font-medium">CTA: {result.cta}</p><div className="mt-4 grid gap-3 text-sm text-zinc-400 md:grid-cols-2"><p>Layout: {result.layout}</p><p>Typography: {result.typography}</p><p>Product: {result.productPlacement}</p><p>Logo: {result.logoPlacement}</p></div></div>}</section>
        <aside className="a2z-card p-6"><p className="text-xs uppercase tracking-[.18em] text-zinc-500">Reference rules</p><h2 className="mt-3 text-xl font-semibold">Inspired, not copied.</h2><div className="mt-5 space-y-3 text-sm text-zinc-400"><p>• Analyze layout, hierarchy, spacing and mood.</p><p>• Rebuild with your own product, logo and copy.</p><p>• Keep footer information readable and consistent.</p><p>• Generate a new composition instead of duplicating the reference.</p></div><div className="mt-7 rounded-xl border border-white/10 bg-white/[.03] p-4"><p className="text-xs text-zinc-500">Current inputs</p><p className="mt-2 text-sm">{inspiration?'Inspiration ✓':'Inspiration —'} · {product?'Product ✓':'Product —'} · {logo?'Logo ✓':'Logo —'}</p></div></aside>
      </div></section></main>;
}
