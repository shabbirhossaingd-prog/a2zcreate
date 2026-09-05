const projects = [
 { name: "Luxury Campaign", type: "Video", status: "Ready", meta: "60 sec · 5 scenes", tone: "violet" },
 { name: "Product Launch", type: "Poster", status: "Draft", meta: "1080 × 1350", tone: "blue" },
 { name: "Brand Intro", type: "Video", status: "Draft", meta: "30 sec · 3 scenes", tone: "emerald" },
];

function Icon({ type }) {
  const icons = {
    Video: <svg viewBox="0 0 24 24"><rect x="3" y="6" width="13" height="12" rx="3"/><path d="m16 10 5-3v10l-5-3"/><path d="M7 10h5"/><path d="M7 14h3"/></svg>,
    Poster: <svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="3"/><path d="M8 8h8"/><path d="M8 12h5"/><path d="M8 16h8"/><circle cx="16" cy="12" r="1"/></svg>,
    Folder: <svg viewBox="0 0 24 24"><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z"/><path d="M7 13h10"/></svg>,
  };
  return <span className="a2z-icon text-white">{icons[type]}</span>;
}

export default function Projects(){return <main className="a2z-shell a2z-grid min-h-screen text-white">
 <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6"><a href="/" className="font-bold tracking-tight">A2ZCreate<span className="text-violet-400">.</span></a><a href="/dashboard" className="text-sm text-zinc-400 hover:text-white">← Dashboard</a></header>
 <section className="mx-auto max-w-7xl px-6 pb-20 pt-8">
  <div className="grid gap-8 lg:grid-cols-[1fr_.75fr] lg:items-end"><div><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs text-zinc-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/> Creative library</div><h1 className="text-5xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">Projects</h1><p className="mt-5 max-w-2xl leading-7 text-zinc-400">Your generated videos, posters and creative assets in one premium workspace.</p></div><div className="a2z-card p-5"><div className="flex items-center gap-4"><Icon type="Folder"/><div><p className="text-xs uppercase tracking-[.18em] text-zinc-500">Asset control</p><p className="mt-1 text-lg font-semibold">Review, edit and export</p></div></div></div></div>
  <div className="mt-10 flex flex-wrap gap-2"><a href="/create-video" className="a2z-btn a2z-btn-primary text-sm">+ New video</a><a href="/create-poster" className="a2z-btn a2z-btn-secondary text-sm">+ New poster</a><a href="/brand-kit" className="a2z-btn a2z-btn-secondary text-sm">Brand kit</a></div>
  <div className="mt-6 grid gap-5 lg:grid-cols-3">{projects.map(p => <div key={p.name} className="a2z-card a2z-card-hover overflow-hidden"><div className={`h-28 ${p.tone === "violet" ? "bg-violet-500/15" : p.tone === "blue" ? "bg-blue-500/15" : "bg-emerald-500/15"}`}></div><div className="p-6"><div className="flex items-start justify-between"><Icon type={p.type}/><span className={`rounded-full px-3 py-1 text-xs ${p.status === "Ready" ? "bg-emerald-400/10 text-emerald-300" : "bg-white/[.06] text-zinc-400"}`}>{p.status}</span></div><h2 className="mt-7 text-xl font-semibold">{p.name}</h2><p className="mt-2 text-sm text-zinc-500">{p.type} · {p.meta}</p><div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.025] px-4 py-3"><span className="text-xs text-zinc-500">Last edited recently</span><button className="text-sm text-zinc-400 hover:text-white">Open →</button></div></div></div>)}</div>
  <div className="a2z-card mt-6 p-6"><p className="text-xs uppercase tracking-[.18em] text-zinc-500">Coming next</p><div className="mt-4 grid gap-3 md:grid-cols-4">{["Canvas editor", "Download PNG", "MP4 export", "Version history"].map((x, i) => <div key={x} className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="text-xs text-zinc-600">0{i+1}</p><p className="mt-2 text-sm font-medium">{x}</p></div>)}</div></div>
 </section>
</main>}
