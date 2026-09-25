import React, { useState } from 'react';
import { fetchNumerology } from '../../../api/astrologyApi';

export default function NumerologyPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', dob: '', gender: 'male' });
  const [error, setError] = useState('');

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetchNumerology(formData);
      if (res.success) setResult(res.data);
      else setError('Failed to calculate numerology.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-indigo-950 mb-3 tracking-tight">Vedic Numerology</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">Discover your core numbers, ruling planets, and auspicious directions based on the Chaldean system.</p>
      </div>
      
      <form onSubmit={handleCalculate} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-indigo-100 grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
        {error && <div className="md:col-span-3 p-3 bg-red-50 text-red-700 rounded text-sm font-semibold">{error}</div>}
        
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Full Name</label>
          <input required type="text" placeholder="e.g. Sharad Bansal" className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Date of Birth</label>
          <input required type="date" className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" onChange={e => setFormData({...formData, dob: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Gender</label>
          <select className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" onChange={e => setFormData({...formData, gender: e.target.value})} value={formData.gender}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button disabled={loading} className="md:col-span-3 bg-indigo-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30 disabled:opacity-70 flex justify-center items-center gap-2">
          {loading ? 'Calculating Vibrations...' : 'Reveal My Numbers'}
        </button>
      </form>

      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Core Numbers Display */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-6 rounded-2xl border border-orange-200 text-center shadow-sm">
              <span className="text-xs font-bold text-orange-800 uppercase tracking-widest block mb-2">Radical (Life Path)</span>
              <span className="text-5xl font-black text-orange-600">{result.numbers.radical_number}</span>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 p-6 rounded-2xl border border-indigo-200 text-center shadow-sm">
              <span className="text-xs font-bold text-indigo-800 uppercase tracking-widest block mb-2">Destiny</span>
              <span className="text-5xl font-black text-indigo-600">{result.numbers.destiny_number}</span>
            </div>
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 p-6 rounded-2xl border border-emerald-200 text-center shadow-sm">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-2">Name</span>
              <span className="text-5xl font-black text-emerald-600">{result.numbers.name_number}</span>
            </div>
            <div className="bg-gradient-to-br from-rose-100 to-rose-50 p-6 rounded-2xl border border-rose-200 text-center shadow-sm">
              <span className="text-xs font-bold text-rose-800 uppercase tracking-widest block mb-2">Soul Urge</span>
              <span className="text-5xl font-black text-rose-600">{result.numbers.soul_urge_number}</span>
            </div>
            <div className="bg-gradient-to-br from-violet-100 to-violet-50 p-6 rounded-2xl border border-violet-200 text-center shadow-sm md:col-span-1 col-span-2">
              <span className="text-xs font-bold text-violet-800 uppercase tracking-widest block mb-2">Personality</span>
              <span className="text-5xl font-black text-violet-600">{result.numbers.personality_number}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Radical Profile */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-orange-50 p-6 border-b border-orange-100">
                <h3 className="text-2xl font-bold text-orange-900 mb-1">Radical Profile</h3>
                <p className="text-sm font-semibold text-orange-700">Ruled by {result.radical_profile.ruling_planet} • Favorable God: {result.radical_profile.favourable_god}</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Personality Overview</h4>
                  <p className="text-slate-700 leading-relaxed font-medium">{result.radical_profile.personality.summary}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Strengths</h4>
                    <ul className="text-sm text-slate-700 space-y-1 list-disc pl-4">
                      {result.radical_profile.personality.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Challenges</h4>
                    <ul className="text-sm text-slate-700 space-y-1 list-disc pl-4">
                      {result.radical_profile.personality.challenges.map((s: string, i: number) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Favorable Elements</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold">Gem: {result.radical_profile.gemstone}</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold">Metal: {result.radical_profile.metal}</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold">Direction: {result.radical_profile.direction}</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold">Days: {result.radical_profile.favourable_days.join(', ')}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.radical_profile.favourable_colors.map((c: string, i: number) => (
                      <span key={i} className="px-3 py-1 border border-slate-200 text-slate-600 rounded-full text-xs font-semibold">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Destiny Profile */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-indigo-50 p-6 border-b border-indigo-100">
                <h3 className="text-2xl font-bold text-indigo-900 mb-1">Destiny Profile</h3>
                <p className="text-sm font-semibold text-indigo-700">Ruled by {result.destiny_profile.ruling_planet} • Favorable God: {result.destiny_profile.favourable_god}</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Destiny Overview</h4>
                  <p className="text-slate-700 leading-relaxed font-medium">{result.destiny_profile.personality.summary}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Strengths</h4>
                    <ul className="text-sm text-slate-700 space-y-1 list-disc pl-4">
                      {result.destiny_profile.personality.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Challenges</h4>
                    <ul className="text-sm text-slate-700 space-y-1 list-disc pl-4">
                      {result.destiny_profile.personality.challenges.map((s: string, i: number) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Favorable Elements</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold">Gem: {result.destiny_profile.gemstone}</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold">Metal: {result.destiny_profile.metal}</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold">Direction: {result.destiny_profile.direction}</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold">Days: {result.destiny_profile.favourable_days.join(', ')}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.destiny_profile.favourable_colors.map((c: string, i: number) => (
                      <span key={i} className="px-3 py-1 border border-slate-200 text-slate-600 rounded-full text-xs font-semibold">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feng Shui / Kua Directions */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Auspicious Directions</h3>
                <p className="text-slate-500 font-medium">Based on Kua Number {result.directions.kua_number} ({result.directions.group} Group)</p>
              </div>
              <div className="mt-4 md:mt-0 text-sm font-semibold text-rose-600 bg-rose-50 px-4 py-2 rounded-lg border border-rose-100">
                Avoid Facing: {result.directions.inauspicious_directions.join(', ')}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">{result.directions.success.direction}</span>
                  <h4 className="font-bold text-slate-800">Success</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{result.directions.success.meaning}</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">{result.directions.health.direction}</span>
                  <h4 className="font-bold text-slate-800">Health</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{result.directions.health.meaning}</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-pink-200 hover:bg-pink-50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold">{result.directions.relationship.direction}</span>
                  <h4 className="font-bold text-slate-800">Relationships</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{result.directions.relationship.meaning}</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">{result.directions.wisdom.direction}</span>
                  <h4 className="font-bold text-slate-800">Wisdom</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{result.directions.wisdom.meaning}</p>
              </div>
            </div>
          </div>
          
          <p className="text-center text-xs text-slate-400 mt-4 italic">{result.note}</p>
        </div>
      )}
    </div>
  );
}