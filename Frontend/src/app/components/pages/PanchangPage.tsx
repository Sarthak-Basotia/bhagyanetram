import { useState, useEffect } from 'react';

export default function PanchangPage() {
  const [panchang, setPanchang] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTodayPanchang() {
      try {
        const today = new Date().toISOString().split('T')[0];
        const res = await fetch('http://localhost:5000/api/astrology/panchang', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date: today, lat: 28.6139, lon: 77.2090, tz_offset: 5.5 })
        });
        const json = await res.json();
        if (json.success) setPanchang(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getTodayPanchang();
  }, []);

  if (loading) return <div className="text-center p-12">Calculating today's cosmic alignments...</div>;
  if (!panchang) return <div className="text-center p-12 text-red-500">Failed to load Panchang.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#F1C40F] mb-6 text-center drop-shadow-sm">Today's Panchang</h1>
      <p className="text-center text-gray-600 mb-8">{new Date(panchang.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h2 className="font-bold text-yellow-800 text-lg mb-4">The Five Limbs (Angas)</h2>
          <ul className="space-y-3 text-gray-800">
            <li><strong>Tithi:</strong> {panchang.tithi.name} ({panchang.tithi.paksha} Paksha)</li>
            <li><strong>Nakshatra:</strong> {panchang.nakshatra.name} (Pada {panchang.nakshatra.pada})</li>
            <li><strong>Yoga:</strong> {panchang.yoga.name}</li>
            <li><strong>Karana:</strong> {panchang.karana.name}</li>
            <li><strong>Vaara:</strong> {panchang.weekday} (Lord: {panchang.day_lord})</li>
          </ul>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h2 className="font-bold text-blue-800 text-lg mb-4">Sun & Moon Timings</h2>
          <ul className="space-y-3 text-gray-800">
            <li><strong>Sunrise:</strong> {new Date(panchang.sunrise).toLocaleTimeString()}</li>
            <li><strong>Sunset:</strong> {new Date(panchang.sunset).toLocaleTimeString()}</li>
            {panchang.moonrise && <li><strong>Moonrise:</strong> {new Date(panchang.moonrise).toLocaleTimeString()}</li>}
            {panchang.moonset && <li><strong>Moonset:</strong> {new Date(panchang.moonset).toLocaleTimeString()}</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}