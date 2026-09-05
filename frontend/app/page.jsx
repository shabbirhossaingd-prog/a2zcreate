const Icon = ({ type }) => {
  const common = { viewBox: "0 0 24 24", "aria-hidden": "true" };
  if (type === "video") return <svg {...common}><rect x="3" y="5" width="13" height="14" rx="3"/><path d="m16 10 5-3v10l-5-3z"/></svg>;
  if (type === "poster") return <svg {...common}><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="9" cy="9" r="1.5"/><path d="m6.5 17 4-4 2.5 2.5 2-2 2.5 3.5"/></svg>;
  return <svg {...common}><circle cx="12" cy="8" r="3"/><path d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5"/><path d="M18 4h3v3"/></svg>;
};

const Arrow = () => <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;

const tools = [
  { title: "AI Video Creator", text: "Turn a script into short scenes, voiceover and a ready-to-edit video workflow.", href: "/create-video", tag: "VIDEO", icon: "video" },
  { title: "AI Poster Generator", text: "Bring your product, logo and visual references together for fresh campaign creatives.", href: "/create-poster", tag: "DESIGN", icon: "poster" },
  { title: "Brand Memory", text: "Keep your logo, colors, audience and brand personality ready for every generation.", href: "/brand-kit", tag: "BRAND", icon: "brand" },
];

export default function Home() {
  return (
    <main className="a2z-shell a2z-grid min-h-screen text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between border-b border-white/[.06] px-6 py-5">
        <a href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-black text-xs">A2</span>A2ZCreate<span className="text-violet-400">.</span></a>
        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex"><a href="#features" className="transition hover:text-white">Features</a><a href="#workflow" className="transition hover:text-white">Workflow</a><a href="#pricing" className="transition hover:text-white">Pricing</a></div>
        <a href="/dashboard" className="a2z-btn a2z-btn-secondary text-sm">Open Studio <Arrow /></a>
      </nav>

      <section className="relative mx-auto max-w-7xl overflow-hidden px-6 pb-24 pt-20 md:pt-28">
        <div className="a2z-orb right-10 top-16 h-64 w-64 bg-violet-500/10 blur-3xl" />
        <div className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.045] px-3.5 py-2 text-xs font-medium text-zinc-300"><span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_14px_rgba(167,139,250,.8)]"/> AI creative studio</div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-.045em] md:text-7xl">One brief.<br/><span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">A complete creative.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">Create marketing videos and posters from a simple brief. A2ZCreate understands your audience, brand, product and visual direction.</p>
            <div className="mt-9 flex flex-wrap gap-3"><a href="/create-video" className="a2z-btn a2z-btn-primary">Create a video <Arrow /></a><a href="/create-poster" className="a2z-btn a2z-btn-secondary">Create a poster</a></div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-500"><span>✦ Gemini planning</span><span>✦ ElevenLabs voice</span><span>✦ Brand-aware workflow</span></div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-6 rounded-[40px] bg-violet-500/[.06] blur-2xl" />
            <div className="a2z-card relative overflow-hidden p-5">
              <div className="mb-4 flex items-center justify-between border-b border-white/[.07] pb-4"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400"/><span className="text-xs font-medium text-zinc-300">Creative workspace</span></div><span className="text-[10px] uppercase tracking-[.18em] text-zinc-600">LIVE PREVIEW</span></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/[.07] bg-white/[.035] p-4"><div className="a2z-icon mb-8 text-violet-300"><Icon type="video"/></div><p className="text-sm font-semibold">Video</p><p className="mt-1 text-xs leading-5 text-zinc-500">Script → scenes → voice</p><div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-3/4 rounded-full bg-violet-400/70"/></div></div>
                <div className="rounded-2xl border border-white/[.07] bg-white/[.035] p-4"><div className="a2z-icon mb-8 text-blue-300"><Icon type="poster"/></div><p className="text-sm font-semibold">Poster</p><p className="mt-1 text-xs leading-5 text-zinc-500">Product → reference → design</p><div className="mt-6 flex gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-blue-300"/><span className="h-1.5 w-6 rounded-full bg-white/10"/><span className="h-1.5 w-3 rounded-full bg-white/10"/></div></div>
                <div className="col-span-2 rounded-2xl border border-white/[.07] bg-black/20 p-4"><div className="flex items-center gap-3"><div className="a2z-icon h-10 w-10 rounded-xl text-emerald-300"><Icon type="brand"/></div><div><p className="text-sm font-semibold">Brand Memory</p><p className="text-xs text-zinc-500">Your visual identity stays consistent across every creative.</p></div><span className="ml-auto text-zinc-600"><Arrow /></span></div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-5 md:grid-cols-3" id="features">
          {tools.map((tool) => <a key={tool.title} href={tool.href} className="a2z-card a2z-card-hover group p-6">
            <div className="mb-10 flex items-start justify-between"><div className="a2z-icon text-zinc-200"><Icon type={tool.icon}/></div><span className="rounded-full border border-white/[.07] px-2.5 py-1 text-[10px] font-semibold tracking-[.16em] text-zinc-500">{tool.tag}</span></div>
            <h2 className="text-xl font-semibold tracking-tight">{tool.title}</h2><p className="mt-3 min-h-14 leading-7 text-zinc-400">{tool.text}</p><div className="mt-7 flex items-center gap-2 text-sm font-medium text-zinc-300 transition group-hover:text-white">Open tool <Arrow /></div>
          </a>)}
        </div>

        <section id="workflow" className="mt-24 grid gap-8 md:grid-cols-[.85fr_1.15fr] md:items-center">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-400">How it works</p><h2 className="mt-3 text-4xl font-semibold tracking-tight">From idea to ready-to-publish.</h2><p className="mt-4 max-w-lg leading-7 text-zinc-400">A clean creative workflow that turns your brief into structured scenes, visual direction, voice and final production steps.</p></div>
          <div className="a2z-card p-5"><div className="space-y-2">{['Brief + brand context','AI scene & design plan','Scene / poster generation','Voice + music + edits','Final creative'].map((x,i)=><div key={x} className="flex items-center gap-4 rounded-xl border border-white/[.05] bg-white/[.025] p-4"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[.06] text-[10px] font-semibold text-zinc-500">0{i+1}</span><span className="font-medium text-zinc-200">{x}</span><span className="ml-auto text-zinc-700"><Arrow /></span></div>)}</div></div>
        </section>

        <section id="pricing" className="mt-24 border-t border-white/10 pt-16"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-xs uppercase tracking-[.2em] text-zinc-500">Start simple</p><h2 className="mt-2 text-3xl font-semibold">Build your first creative.</h2></div><a href="/dashboard" className="a2z-btn a2z-btn-primary">Enter A2ZCreate <Arrow /></a></div></section>
      </section>
    </main>
  );
}
