export default function Dashboard(){
 const tools=['Create Video','Create Poster','Brand Kit','Projects'];
 return <main className="min-h-screen bg-black text-white p-10"><h1 className="text-4xl font-bold">AI Creative Dashboard</h1><div className="grid md:grid-cols-4 gap-5 mt-10">{tools.map(t=><div key={t} className="rounded-xl bg-zinc-900 border border-zinc-700 p-6">{t}</div>)}</div></main>
}