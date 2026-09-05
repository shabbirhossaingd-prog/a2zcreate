"use client";
import { useState } from "react";

function Icon({ name }) {
  const icons = {
    brand: <svg viewBox="0 0 24 24"><path d="M12 3 20 8v8l-8 5-8-5V8l8-5Z"/><path d="M12 8v8"/><path d="m8 10 4-2 4 2"/><path d="m8 14 4 2 4-2"/></svg>,
    logo: <svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="5"/><path d="M9 15.5 12 8l3 7.5"/><path d="M10.2 13h3.6"/></svg>,
    color: <svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 .7-3.87 1.7 1.7 0 0 1 .6-3.3H16a5 5 0 0 0 0-10H12Z"/><circle cx="7.5" cy="10" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="13.5" cy="7.5" r="1"/></svg>,
    audience: <svg viewBox="0 0 24 24"><path d="M16 11a4 4 0 1 0-8 0"/><path d="M4 20a8 8 0 0 1 16 0"/><path d="M18.5 8.5a2.5 2.5 0 0 1 0 5"/><path d="M21 20a5 5 0 0 0-3-4.6"/></svg>,
    tone: <svg viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M7 12h10"/><path d="M9 17h6"/><path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"/></svg>,
  };
  return <span className="a2z-icon text-white">{icons[name]}</span>;
}

const memory = [
  { title: "Logo system", text: "Store primary logo, dark logo and watermark placement.", icon: "logo" },
  { title: "Color palette", text: "Keep primary, accent and background colors ready for AI.", icon: "color" },
  { title: "Audience profile", text: "Tell AI who the creative should speak to first.", icon: "audience" },
  { title: "Brand tone", text: "Premium, friendly, corporate, bold or local-market tone.", icon: "tone" },
];

export default function BrandKit(){
 const [saved,setSaved]=useState(false);
 return <main className="a2z-shell a2z-grid min-h-screen text-white">
  <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6"><a href="/" className="font-bold tracking-tight">A2ZCreate<span className="text-violet-400">.</span></a><a href="/dashboard" className="text-sm text-zinc-400 hover:text-white">← Dashboard</a></header>
  <section className="mx-auto max-w-7xl px-6 pb-20 pt-8">
    <div className="grid gap-8 lg:grid-cols-[1fr_.75fr] lg:items-end"><div className="max-w-3xl"><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs text-zinc-300"><span className="h-1.5 w-1.5 rounded-full bg-amber-400"/> Brand memory system</div><h1 className="text-5xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">Your brand, <span className="text-zinc-500">remembered.</span></h1><p className="mt-5 max-w-2xl leading-7 text-zinc-400">Save the context AI should follow whenever it creates a poster, video, caption or social asset.</p></div><div className="a2z-card p-5"><div className="flex items-center gap-4"><Icon name="brand"/><div><p className="text-xs uppercase tracking-[.18em] text-zinc-500">Reusable identity</p><p className="mt-1 text-lg font-semibold">One setup, every creative</p></div></div></div></div>

    <div className="mt-10 grid gap-5 lg:grid-cols-4">{memory.map(item => <div key={item.title} className="a2z-card a2z-card-hover p-5"><Icon name={item.icon}/><h2 className="mt-6 font-semibold">{item.title}</h2><p className="mt-2 text-sm leading-6 text-zinc-500">{item.text}</p></div>)}</div>

    <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
      <section className="a2z-card p-6"><div className="flex items-start gap-4"><Icon name="brand"/><div><h2 className="text-xl font-semibold">Brand profile</h2><p className="mt-1 text-sm text-zinc-500">This information will guide future poster and video generations.</p></div></div>
        <div className="mt-6 grid gap-5 md:grid-cols-2"><div><label className="a2z-label">Company name</label><input className="a2z-input" placeholder="Your company" /></div><div><label className="a2z-label">Industry</label><input className="a2z-input" placeholder="Real estate, education, ecommerce..." /></div><div><label className="a2z-label">Target audience</label><textarea className="a2z-input min-h-28" placeholder="Who should this content speak to?" /></div><div><label className="a2z-label">Brand personality</label><textarea className="a2z-input min-h-28" placeholder="Professional, premium, friendly, bold..." /></div><div><label className="a2z-label">Logo</label><input className="a2z-input" type="file" accept="image/*" /></div><div><label className="a2z-label">Primary brand color</label><div className="flex gap-3"><input type="color" defaultValue="#7c3aed" className="h-12 w-16 rounded-xl border border-white/10 bg-transparent p-1"/><input className="a2z-input" defaultValue="#7C3AED"/></div></div></div>
        <button onClick={()=>setSaved(true)} className="a2z-btn a2z-btn-primary mt-7">{saved ? "✓ Brand profile saved" : "Save brand profile"}</button>{saved && <p className="mt-3 text-sm text-emerald-300">Ready to reuse across future creatives.</p>}
      </section>
      <aside className="a2z-card p-6"><p className="text-xs uppercase tracking-[.18em] text-zinc-500">Brand preview</p><div className="mt-5 rounded-[28px] border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-5"><div className="flex items-center justify-between"><div className="h-12 w-12 rounded-2xl bg-violet-500/25"/><div className="h-3 w-24 rounded-full bg-white/20"/></div><div className="mt-16 h-8 w-48 rounded-full bg-white/80"/><div className="mt-3 h-8 w-32 rounded-full bg-white/40"/><div className="mt-8 grid grid-cols-3 gap-3"><div className="h-16 rounded-2xl bg-white/[.06]"/><div className="h-16 rounded-2xl bg-violet-500/20"/><div className="h-16 rounded-2xl bg-white/[.06]"/></div></div><div className="mt-5 space-y-3 text-sm text-zinc-400"><p>• Logo placement rules</p><p>• Brand color memory</p><p>• Target audience guidance</p><p>• Same visual language across posts</p></div></aside>
    </div>
  </section>
 </main>
}
