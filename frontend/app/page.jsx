const tools = [
  { title: "AI Video Creator", text: "Turn a script into 5–10 second scenes, voiceover and a finished video.", href: "/create-video", tag: "VIDEO" },
  { title: "AI Poster Generator", text: "Use your product, logo, footer and an inspiration design to create a fresh poster.", href: "/create-poster", tag: "DESIGN" },
  { title: "Brand Memory", text: "Save your logo, audience, colors and brand personality once and reuse them everywhere.", href: "/brand-kit", tag: "BRAND" },
];

export default function Home() {
  return (
    <main className="a2z-shell a2z-grid min-h-screen text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="/" className="text-xl font-bold tracking-tight">A2ZCreate<span className="text-violet-400">.</span></a>
        <div className="hidden gap-7 text-sm text-zinc-400 md:flex"><a href="#features" className="hover:text-white">Features</a><a href="#workflow" className="hover:text-white">Workflow</a><a href="#pricing" className="hover:text-white">Pricing</a></div>
        <a href="/dashboard" className="a2z-btn a2z-btn-secondary text-sm">Open Studio</a>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:pt-24">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300"><span className="h-1.5 w-1.5 rounded-full bg-violet-400"/> AI creative studio</div>
          <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-.04em] md:text-7xl">One brief.<br/><span className="text-zinc-400">A complete creative.</span></h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">Create marketing videos and posters from a simple script. A2ZCreate understands your audience, brand, product and visual direction.</p>
          <div className="mt-9 flex flex-wrap gap-3"><a href="/create-video" className="a2z-btn a2z-btn-primary">Create a video →</a><a href="/create-poster" className="a2z-btn a2z-btn-secondary">Create a poster</a></div>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-3" id="features">
          {tools.map((tool) => <a key={tool.title} href={tool.href} className="a2z-card group p-6 hover:border-white/20">
            <div className="mb-10 flex items-center justify-between"><span className="text-[11px] font-semibold tracking-[.18em] text-zinc-500">{tool.tag}</span><span className="text-zinc-500 group-hover:text-white">↗</span></div>
            <h2 className="text-2xl font-semibold">{tool.title}</h2><p className="mt-3 leading-7 text-zinc-400">{tool.text}</p>
          </a>)}
        </div>

        <section id="workflow" className="mt-24 grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-400">How it works</p><h2 className="mt-3 text-4xl font-semibold tracking-tight">From idea to ready-to-publish.</h2><p className="mt-4 text-zinc-400">Break long videos into short scenes, generate voice separately, then assemble everything with an editing pipeline.</p></div>
          <div className="a2z-card p-6"><div className="space-y-3">{['Brief + brand context','AI scene & design plan','Scene / poster generation','Voice + music + edits','Final creative'].map((x,i)=><div key={x} className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[.03] p-4"><span className="text-xs text-zinc-600">0{i+1}</span><span className="font-medium">{x}</span></div>)}</div></div>
        </section>

        <section id="pricing" className="mt-24 border-t border-white/10 pt-16"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-xs uppercase tracking-[.2em] text-zinc-500">Start simple</p><h2 className="mt-2 text-3xl font-semibold">Build your first creative.</h2></div><a href="/dashboard" className="a2z-btn a2z-btn-primary">Enter A2ZCreate</a></div></section>
      </section>
    </main>
  );
}
