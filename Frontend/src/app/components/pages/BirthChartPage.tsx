import React, { useState } from 'react';
import { fetchAdvancedKundli } from '../../../api/astrologyApi';

export default function BirthChartPage() {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'D1' | 'D9' | 'YOGAS'>('D1');
  const [error, setError] = useState('');

  // Default form state (Using New Delhi coordinates as fallback)
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    time: '',
    lat: 28.6139,
    lon: 77.2090,
    tz_offset: 5.5
  });

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await fetchAdvancedKundli(formData);
      if (result.success) {
        setChartData(result.data);
      } else {
        setError('Failed to calculate birth chart.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while fetching the chart.');
    } finally {
      setLoading(false);
    }
  };

  // Helper component to render planetary tables beautifully
  const PlanetTable = ({ chart }: { chart: any }) => (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
      <table className="w-full text-left text-sm text-slate-700">
        <thead className="bg-slate-50 text-slate-900 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 font-semibold">Planet</th>
            <th className="px-4 py-3 font-semibold">Sign</th>
            <th className="px-4 py-3 font-semibold">Degree</th>
            <th className="px-4 py-3 font-semibold">House</th>
            <th className="px-4 py-3 font-semibold">Nakshatra</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {/* Ascendant Row */}
          <tr className="bg-orange-50/50">
            <td className="px-4 py-3 font-bold text-orange-800">Ascendant (Lagna)</td>
            <td className="px-4 py-3 font-medium">{chart.ascendant.sign}</td>
            <td className="px-4 py-3">{chart.ascendant.degree.toFixed(2)}°</td>
            <td className="px-4 py-3 font-medium">1st</td>
            <td className="px-4 py-3">{chart.ascendant.nakshatra}</td>
            <td className="px-4 py-3">-</td>
          </tr>
          {/* Planets Rows */}
          {chart.planets.map((p: any, idx: number) => (
            <tr key={idx} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 font-semibold text-slate-900 flex items-center gap-2">
                {p.planet}
              </td>
              <td className="px-4 py-3 font-medium">{p.sign}</td>
              <td className="px-4 py-3">{p.degree.toFixed(2)}°</td>
              <td className="px-4 py-3 font-medium">{p.house}</td>
              <td className="px-4 py-3">{p.nakshatra}</td>
              <td className="px-4 py-3 text-xs">
                {p.is_retrograde && <span className="px-2 py-1 bg-red-100 text-red-700 rounded font-bold">Retrograde</span>}
                {!p.is_retrograde && <span className="text-slate-400">Direct</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50">
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#D35400] mb-2">Detailed Birth Chart (Kundli)</h1>
        <p className="text-slate-600">Calculate precise planetary positions using the Swiss Ephemeris engine.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Input Form */}
        <div className="lg:col-span-4">
          <form onSubmit={handleCalculate} className="bg-white p-6 rounded-2xl shadow-md border border-orange-100 space-y-5 sticky top-8">
            <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Birth Details</h2>
            
            {error && <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded text-sm">{error}</div>}

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <input required type="text" placeholder="e.g. Sharad Bansal" className="w-full border p-2.5 rounded-lg bg-slate-50 focus:ring-2 focus:ring-orange-500 outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Date of Birth</label>
                <input required type="date" className="w-full border p-2.5 rounded-lg bg-slate-50 outline-none" onChange={e => setFormData({...formData, dob: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Time of Birth</label>
                <input required type="time" className="w-full border p-2.5 rounded-lg bg-slate-50 outline-none" onChange={e => setFormData({...formData, time: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Latitude</label>
                <input required type="number" step="any" value={formData.lat} className="w-full border p-2.5 rounded-lg bg-slate-50 outline-none" onChange={e => setFormData({...formData, lat: parseFloat(e.target.value)})} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Longitude</label>
                <input required type="number" step="any" value={formData.lon} className="w-full border p-2.5 rounded-lg bg-slate-50 outline-none" onChange={e => setFormData({...formData, lon: parseFloat(e.target.value)})} />
              </div>
            </div>

            <button disabled={loading} className="w-full bg-[#D35400] text-white p-3.5 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-500/30 disabled:opacity-70 mt-2">
              {loading ? 'Calculating Mathematics...' : 'Generate Birth Chart'}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Results Display */}
        <div className="lg:col-span-8">
          {!chartData ? (
            <div className="h-full flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-slate-300 rounded-2xl bg-slate-100/50 text-slate-400">
              <span className="text-4xl mb-4">✨</span>
              <p className="font-medium">Enter birth details to view your astronomical charts.</p>
            </div>
          ) : (
            <div className="animate-in fade-in duration-300">
              
              {/* Profile Summary Header */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg mb-6 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{formData.name || "Native"}'s Chart</h2>
                  <p className="text-slate-400 text-sm mt-1">{formData.dob} at {formData.time} • Coordinates: {formData.lat}, {formData.lon}</p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 text-center">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Lagna Sign</span>
                    <span className="font-semibold text-emerald-400">{chartData.lagna.ascendant.sign}</span>
                  </div>
                  <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 text-center">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Moon Sign</span>
                    <span className="font-semibold text-sky-400">
                      {chartData.lagna.planets.find((p: any) => p.planet === 'Moon')?.sign || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-slate-200 pb-px">
                <button 
                  onClick={() => setActiveTab('D1')} 
                  className={`px-5 py-2.5 text-sm font-bold rounded-t-lg transition-colors ${activeTab === 'D1' ? 'bg-white text-orange-600 border border-slate-200 border-b-white shadow-[0_-2px_0_0_#ea580c] relative z-10 translate-y-px' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
                >
                  D1 Lagna Chart
                </button>
                <button 
                  onClick={() => setActiveTab('D9')} 
                  className={`px-5 py-2.5 text-sm font-bold rounded-t-lg transition-colors ${activeTab === 'D9' ? 'bg-white text-orange-600 border border-slate-200 border-b-white shadow-[0_-2px_0_0_#ea580c] relative z-10 translate-y-px' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
                >
                  D9 Navamsa Chart
                </button>
                <button 
                  onClick={() => setActiveTab('YOGAS')} 
                  className={`px-5 py-2.5 text-sm font-bold rounded-t-lg transition-colors ${activeTab === 'YOGAS' ? 'bg-white text-orange-600 border border-slate-200 border-b-white shadow-[0_-2px_0_0_#ea580c] relative z-10 translate-y-px' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
                >
                  Yogas & Doshas
                </button>
              </div>

              {/* Tab Content */}
              <div className="bg-transparent">
                {activeTab === 'D1' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <h3 className="text-lg font-bold text-slate-800">Lagna Chart Data (Main Birth Chart)</h3>
                    <p className="text-sm text-slate-600 mb-2">This represents the exact celestial positions of planets at the moment of your birth.</p>
                    <PlanetTable chart={chartData.lagna} />
                  </div>
                )}

                {activeTab === 'D9' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <h3 className="text-lg font-bold text-slate-800">Navamsa Chart Data (D9 Divisional)</h3>
                    <p className="text-sm text-slate-600 mb-2">The D9 chart provides a microscopic view of the 9th house, governing marriage, inner self, and destiny.</p>
                    <PlanetTable chart={chartData.navamsa} />
                  </div>
                )}

                {activeTab === 'YOGAS' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                       <h3 className="text-lg font-bold text-slate-800 mb-4">Detected Yogas (Auspicious Combinations)</h3>
                       {chartData.combinations?.yogas && chartData.combinations.yogas.length > 0 ? (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {chartData.combinations.yogas.map((yoga: any, i: number) => (
                             <div key={i} className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                               <h4 className="font-bold text-emerald-800">{yoga.name}</h4>
                               <p className="text-sm text-emerald-700 mt-1">{yoga.description}</p>
                             </div>
                           ))}
                         </div>
                       ) : (
                         <p className="text-slate-500 italic">No major yogas detected in this specific analysis.</p>
                       )}
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                       <h3 className="text-lg font-bold text-slate-800 mb-4">Detected Doshas (Inauspicious Combinations)</h3>
                       {chartData.combinations?.doshas && chartData.combinations.doshas.length > 0 ? (
                         <div className="space-y-3">
                           {chartData.combinations.doshas.map((dosha: any, i: number) => (
                             <div key={i} className="bg-rose-50 p-4 rounded-lg border border-rose-100 flex gap-4 items-start">
                               <span className="text-2xl mt-0.5">⚠️</span>
                               <div>
                                 <h4 className="font-bold text-rose-800">{dosha.name}</h4>
                                 <p className="text-sm text-rose-700 mt-1">{dosha.description}</p>
                                 {dosha.remedies && (
                                   <p className="text-xs font-semibold text-rose-600 mt-2 mt-2">Remedies: {dosha.remedies.join(', ')}</p>
                                 )}
                               </div>
                             </div>
                           ))}
                         </div>
                       ) : (
                         <p className="text-slate-500 italic flex items-center gap-2"><span className="text-emerald-500">✓</span> Chart is free of major standard doshas.</p>
                       )}
                    </div>

                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}