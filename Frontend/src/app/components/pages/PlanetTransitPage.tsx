import React, { useState, useEffect, FormEvent } from 'react';
import { fetchPlanetTransit } from '../../../api/astrologyApi';
import { NorthIndianChart } from '../NorthIndianChart';
import { Loader2, Settings2, Table as TableIcon } from 'lucide-react';

// Helper to get local time formatted for the HTML datetime-local input
const getLocalDatetimeString = (date: Date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

export default function PlanetTransitPage() {
  const [chartData, setChartData] = useState<{ ascendant: number, planets: any[], rawDetails: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form State (Defaults to current time and New Delhi coordinates)
  const [datetime, setDatetime] = useState(getLocalDatetimeString(new Date()));
  const [lat, setLat] = useState<number>(28.6139);
  const [lon, setLon] = useState<number>(77.2090);
  const [tzOffset, setTzOffset] = useState<number>(5.5);

  const fetchChart = async (dtStr: string, latitude: number, longitude: number, tz: number) => {
    setLoading(true);
    setError('');
    try {
      // Format the HTML datetime string (YYYY-MM-DDTHH:mm) to add seconds for the Python API
      const apiDatetime = `${dtStr}:00`; 
      
      const res = await fetchPlanetTransit({
        datetime: apiDatetime, 
        lat: latitude, 
        lon: longitude, 
        tz_offset: tz
      });

      if (res.success) {
        setChartData({
          ascendant: res.data.ascendant,
          planets: res.data.planets,
          rawDetails: res.data.rawDetails || []
        });
      } else {
        setError('Failed to calculate planetary positions.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Engine connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchChart(datetime, lat, lon, tzOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    fetchChart(datetime, lat, lon, tzOffset);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF2] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#D35400] mb-2">Live Planet Transit (Gochar)</h1>
          <p className="text-slate-600">Calculate exact planetary alignments for any given time and location.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT COLUMN: Input Form */}
          <div className="lg:col-span-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <Settings2 className="w-5 h-5 text-[#0A0A9C]" />
              <h2 className="text-lg font-bold text-slate-800">Chart Parameters</h2>
            </div>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Date & Time</label>
                <input 
                  type="datetime-local" 
                  value={datetime}
                  onChange={(e) => setDatetime(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#D35400] focus:border-transparent outline-none"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Latitude</label>
                  <input 
                    type="number" 
                    step="any"
                    value={lat}
                    onChange={(e) => setLat(parseFloat(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#D35400] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Longitude</label>
                  <input 
                    type="number" 
                    step="any"
                    value={lon}
                    onChange={(e) => setLon(parseFloat(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#D35400] outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Timezone Offset (Hours)</label>
                <input 
                  type="number" 
                  step="0.5"
                  value={tzOffset}
                  onChange={(e) => setTzOffset(parseFloat(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#D35400] outline-none"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full mt-4 bg-[#0A0A9C] text-white font-bold py-3 px-4 rounded hover:bg-blue-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Calculating...' : 'Generate Chart'}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: The Chart */}
          <div className="lg:col-span-8 flex items-center justify-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            {loading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-10 h-10 animate-spin text-[#D35400] mb-4" />
                <p className="text-slate-500 font-medium">Consulting Ephemeris...</p>
              </div>
            ) : error ? (
              <p className="text-red-500 font-bold">{error}</p>
            ) : chartData ? (
              <div className="w-full max-w-lg">
                <NorthIndianChart 
                  ascendant={chartData.ascendant} 
                  planets={chartData.planets} 
                />
              </div>
            ) : null}
          </div>
        </div>

        {/* BOTTOM SECTION: Detailed Planetary Info */}
        {!loading && chartData && chartData.rawDetails && chartData.rawDetails.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-12">
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2">
              <TableIcon className="w-5 h-5 text-[#0A0A9C]" />
              <h2 className="text-lg font-bold text-slate-800">Planetary Positions & Dignities</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 text-sm uppercase tracking-wider">
                    <th className="p-4 font-semibold">Planet</th>
                    <th className="p-4 font-semibold">Sign</th>
                    <th className="p-4 font-semibold">Degree</th>
                    <th className="p-4 font-semibold">Nakshatra (Pada)</th>
                    <th className="p-4 font-semibold">Motion</th>
                    <th className="p-4 font-semibold">Dignity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {chartData.rawDetails.map((p: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#0A0A9C]">{p.planet}</td>
                      <td className="p-4 text-slate-700 font-medium">{p.sign}</td>
                      <td className="p-4 text-slate-600">
                        {typeof p.degree_in_sign === 'number' ? p.degree_in_sign.toFixed(2) : p.degree_in_sign}°
                      </td>
                      <td className="p-4 text-slate-600">
                        {p.nakshatra} ({p.pada})
                      </td>
                      <td className="p-4">
                        {p.retrograde ? (
                          <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded uppercase">Retrograde</span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded uppercase">Direct</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${
                          p.dignity === 'exalted' ? 'bg-amber-100 text-amber-700' :
                          p.dignity === 'debilitated' ? 'bg-red-100 text-red-700' :
                          p.dignity === 'own' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {p.dignity || 'Neutral'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}