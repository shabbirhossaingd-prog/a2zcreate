export default function CreatePoster(){
 return <main className="p-8 space-y-6">
  <h1 className="text-3xl font-bold">AI Poster Generator</h1>
  <input placeholder="Upload Logo" type="file" />
  <input className="border p-3 w-full" placeholder="Company Name" />
  <textarea className="border p-3 w-full" placeholder="Company description and target audience" />
  <select className="border p-3 w-full"><option>Luxury</option><option>Modern</option><option>Corporate</option></select>
  <button className="bg-black text-white px-6 py-3 rounded">Generate Poster</button>
 </main>
}
