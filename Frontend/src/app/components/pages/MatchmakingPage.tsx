import { useState } from 'react';

export default function MatchmakingPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const [boy, setBoy] = useState({ dob: '', time: '', lat: 28.61, lon: 77.20, tz_offset: 5.5 });
  const [girl, setGirl] = useState({ dob: '', time: '', lat: 28.61, lon: 77.20, tz_offset: 5.5 });

  const handleMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/astrology/matching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ boy, girl })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#C0392B] mb-8 text-center">Kundli Matching (Ashtakoota)</h1>
      
      <form onSubmit={handleMatch} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Boy's Details */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-blue-800 border-b pb-2">Boy's Details</h2>
          <div className="space-y-4">
            <input className="w-full border p-2 rounded" required type="date" onChange={e => setBoy({...boy, dob: e.target.value})} />
            <input className="w-full border p-2 rounded" required type="time" onChange={e => setBoy({...boy, time: e.target.value})} />
            <div className="flex gap-2">
              <input className="w-full border p-2 rounded" type="number" step="any" placeholder="Lat" onChange={e => setBoy({...boy, lat: parseFloat(e.target.value)})} />
              <input className="w-full border p-2 rounded" type="number" step="any" placeholder="Lon" onChange={e => setBoy({...boy, lon: parseFloat(e.target.value)})} />
            </div>
          </div>
        </div>

        {/* Girl's Details */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-pink-800 border-b pb-2">Girl's Details</h2>
          <div className="space-y-4">
            <input className="w-full border p-2 rounded" required type="date" onChange={e => setGirl({...girl, dob: e.target.value})} />
            <input className="w-full border p-2 rounded" required type="time" onChange={e => setGirl({...girl, time: e.target.value})} />
            <div className="flex gap-2">
              <input className="w-full border p-2 rounded" type="number" step="any" placeholder="Lat" onChange={e => setGirl({...girl, lat: parseFloat(e.target.value)})} />
              <input className="w-full border p-2 rounded" type="number" step="any" placeholder="Lon" onChange={e => setGirl({...girl, lon: parseFloat(e.target.value)})} />
            </div>
          </div>
        </div>

        <button disabled={loading} className="md:col-span-2 bg-[#C0392B] text-white p-4 rounded-xl font-bold text-lg hover:bg-red-800 transition">
          {loading ? 'Calculating 36 Gunas...' : 'Match Kundlis'}
        </button>
      </form>

      {result && (
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden">
          <div className="bg-red-50 p-6 text-center border-b border-red-100">
            <h2 className="text-4xl font-black text-red-600 mb-2">{result.totalScore} <span className="text-xl text-gray-500 font-normal">/ 36</span></h2>
            <h3 className="text-xl font-bold text-gray-800">{result.compatibilityLevel}</h3>
            <p className="mt-4 text-gray-700 max-w-2xl mx-auto">{result.conclusion}</p>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">Love & Emotion (Bhakoot)</h4>
              <p className="text-sm text-gray-600">{result.analysis.bhakoot}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">Health & Genes (Nadi)</h4>
              <p className="text-sm text-gray-600">{result.analysis.nadi}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">Spiritual (Varna)</h4>
              <p className="text-sm text-gray-600">{result.analysis.varna}</p>
            </div>
          </div>

          {result.remedies && result.remedies.length > 0 && (
            <div className="p-6 bg-amber-50 border-t border-amber-100">
              <h4 className="font-bold text-amber-800 mb-2">Suggested Remedies</h4>
              <ul className="list-disc pl-5 text-sm text-amber-900 space-y-1">
                {result.remedies.map((remedy: string, idx: number) => (
                  <li key={idx}>{remedy}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}