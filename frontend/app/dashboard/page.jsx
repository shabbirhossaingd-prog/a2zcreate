const tools = [
  { title: "Create Video", desc: "Script → 5–10 sec scenes → voice → final video", href: "/create-video", icon: "video", accent: "from-violet-500/25 to-fuchsia-500/10", stat: "Scene Studio" },
  { title: "Create Poster", desc: "Inspiration + product + logo → poster direction", href: "/create-poster", icon: "poster", accent: "from-blue-500/25 to-cyan-500/10", stat: "Design AI" },
  { title: "Brand Kit", desc: "Save audience, logo, tone and colors once", href: "/brand-kit", icon: "brand", accent: "from-amber-500/25 to-orange-500/10", stat: "Brand Memory" },
  { title: "Projects", desc: "Manage generated videos, posters and assets", href: "/projects", icon: "folder", accent: "from-emerald-500/25 to-teal-500/10", stat: "Library" },
];

function StudioIcon({ name }) {
  const common = "h-6 w-6";
  const icons = {
    video: <svg className={common} viewBox="0 0 24 24"><rect x="3" y="6" width="13" height="12" rx="3"/><path d="m16 10 5-3v10l-5-3"/><path d="M7 10h5"/><path d="M7 14h3"/></svg>,
    poster: <svg className={common} viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="3"/><path d="M8 8h8"/><path d="M8 12h5"/><path d="M8 16h8"/><circle cx="16" cy="12" r="1"/></svg>,
    brand: <svg className={common} viewBox="0 0 24 24"><path d="M12 3 20 8v8l-8 5-8-5V8l8-5Z"/><path d="M12 8v8"/><path d="m8 10 4-2 4 2"/><path d="m8 14 4 2 4-2"/></svg>,
    folder: <svg className={common} viewBox="0 0 24 24"><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z"/><path d="M7 13h10"/></svg>,
  };
  return <span className="a2z-icon text-white">{icons[name]}</span>;
}

export default function Dashboard(){
 return <main className="a2z-shell a2z-grid min-h-screen text-white">
  <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
    <a href="/" className="text-lg font-bold tracking-tight">A2ZCreate<span className="text-violet-400">.</span></a>
    <div className="flex gap-5 text-sm text-zinc-500"><a href="/brand-kit" className="hover:text-white">Brand Kit</a><a href="/projects" className="hover:text-white">Projects</a></div>
  </header>
  <section className="mx-auto max-w-7xl px-6 pb-20 pt-12">
    <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
      <div><p className="text-xs uppercase tracking-[.2em] text-violet-400">Workspace</p><h1 className="mt-3 max-w-3xl text-5xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">Your AI creative control room.</h1><p className="mt-4 max-w-2xl leading-7 text-zinc-400">Choose a tool, add your brand context and generate ready-to-review creative directions for videos and posters.</p></div>
      <div className="a2z-card p-5"><div className="grid grid-cols-3 gap-3 text-center"><div className="rounded-2xl bg-white/[.035] p-4"><p className="text-2xl font-semibold">05</p><p className="mt-1 text-xs text-zinc-500">Tools</p></div><div className="rounded-2xl bg-white/[.035] p-4"><p className="text-2xl font-semibold">AI</p><p className="mt-1 text-xs text-zinc-500">Planning</p></div><div className="rounded-2xl bg-white/[.035] p-4"><p className="text-2xl font-semibold">4:5</p><p className="mt-1 text-xs text-zinc-500">Poster</p></div></div></div>
    </div>
    <div className="mt-10 grid gap-5 md:grid-cols-2">
      {tools.map(t=><a href={t.href} key={t.title} className="a2z-card a2z-card-hover group overflow-hidden p-6">
        <div className={`-mx-6 -mt-6 mb-6 h-24 bg-gradient-to-br ${t.accent} opacity-90`}></div>
        <div className="flex items-start justify-between"><StudioIcon name={t.icon}/><span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[.16em] text-zinc-400">{t.stat}</span></div>
        <h2 className="mt-8 text-2xl font-semibold tracking-tight">{t.title}</h2>
        <p className="mt-3 leading-7 text-zinc-400">{t.desc}</p>
        <div className="mt-8 flex items-center justify-between text-sm"><span className="text-zinc-500">Open tool</span><span className="text-zinc-500 transition group-hover:translate-x-1 group-hover:text-white">→</span></div>
      </a>)}
    </div>
    <div className="a2z-card mt-6 p-6">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center"><div><p className="text-xs uppercase tracking-[.18em] text-zinc-500">Suggested workflow</p><h2 className="mt-2 text-xl font-semibold">Create with brand-first consistency</h2></div><a href="/brand-kit" className="a2z-btn a2z-btn-secondary text-sm">Set brand rules</a></div>
      <div className="mt-5 grid gap-3 md:grid-cols-5">{['Brand Kit','Brief','AI Plan','Review','Export'].map((x,i)=><div key={x} className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="text-xs text-zinc-600">0{i+1}</p><p className="mt-2 text-sm font-medium">{x}</p></div>)}</div>
    </div>
  </section>
 </main>
}
