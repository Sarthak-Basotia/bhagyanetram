import { useState } from 'react';

export default function FreeKundli() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '', dob: '', time: '', lat: 28.6139, lon: 77.2090, tz_offset: 5.5
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/astrology/kundli', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#D35400] mb-6 text-center">Free AI Kundli Reading</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-orange-100 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border p-2 rounded" required placeholder="Full Name" onChange={e => setFormData({...formData, name: e.target.value})} />
        <input className="border p-2 rounded" required type="date" onChange={e => setFormData({...formData, dob: e.target.value})} />
        <input className="border p-2 rounded" required type="time" onChange={e => setFormData({...formData, time: e.target.value})} />
        {/* For production, replace lat/lon inputs with a City Autocomplete API */}
        <input className="border p-2 rounded" type="number" step="any" placeholder="Latitude (e.g. 28.61)" onChange={e => setFormData({...formData, lat: parseFloat(e.target.value)})} />
        <input className="border p-2 rounded" type="number" step="any" placeholder="Longitude (e.g. 77.20)" onChange={e => setFormData({...formData, lon: parseFloat(e.target.value)})} />
        <button disabled={loading} className="md:col-span-2 bg-[#D35400] text-white p-3 rounded-lg font-bold hover:bg-orange-700 transition">
          {loading ? 'Consulting the Stars...' : 'Generate Kundli'}
        </button>
      </form>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
            <h2 className="text-xl font-bold mb-4 text-orange-800">Astrological Profile</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded shadow-sm"><span className="text-sm text-gray-500 block">Ascendant</span><span className="font-bold">{result.basicDetails.ascendant}</span></div>
              <div className="bg-white p-3 rounded shadow-sm"><span className="text-sm text-gray-500 block">Moon Sign</span><span className="font-bold">{result.basicDetails.moonSign}</span></div>
              <div className="bg-white p-3 rounded shadow-sm"><span className="text-sm text-gray-500 block">Sun Sign</span><span className="font-bold">{result.basicDetails.sunSign}</span></div>
              <div className="bg-white p-3 rounded shadow-sm"><span className="text-sm text-gray-500 block">Nakshatra</span><span className="font-bold">{result.basicDetails.nakshatra}</span></div>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <h2 className="text-xl font-bold mb-2 text-red-800">Manglik Dosha Check</h2>
            <p className="font-semibold">{result.doshaCheck.mangalDosha ? "⚠️ Manglik Dosha Present" : "✅ No Manglik Dosha"}</p>
            <p className="text-gray-700 text-sm mt-1">{result.doshaCheck.description}</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Life Predictions</h2>
            <p className="mb-3"><strong>Personality:</strong> {result.lifePredictions.personality}</p>
            <p className="mb-3"><strong>Career:</strong> {result.lifePredictions.career}</p>
            <p><strong>Relationships:</strong> {result.lifePredictions.relationships}</p>
          </div>
        </div>
      )}
    </div>
  );
}