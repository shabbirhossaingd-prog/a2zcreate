export default function Home(){
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <section className="max-w-6xl mx-auto py-20 text-center">
        <h1 className="text-6xl font-bold">A2ZCreate AI Studio</h1>
        <p className="mt-6 text-xl text-gray-300">Create videos, posters and marketing content with AI. Script to scene, voice and final creative.</p>
        <button className="mt-10 px-8 py-4 rounded-xl bg-white text-black font-semibold">Start Creating</button>
      </section>
      <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {['AI Video Creator','AI Poster Generator','Brand Memory'].map((item)=>(
          <div key={item} className="border border-gray-700 rounded-2xl p-6 bg-zinc-900">
            <h2 className="text-2xl font-semibold">{item}</h2>
            <p className="mt-3 text-gray-400">Powered by Gemini, ElevenLabs and AI creative workflow.</p>
          </div>
        ))}
      </section>
    </main>
  )
}