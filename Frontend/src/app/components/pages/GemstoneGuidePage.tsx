import React, { useState } from 'react';
import { fetchGemstones } from '../../../api/astrologyApi';
import { Sparkles, Gem, Star, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GemstoneGuidePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '', dob: '', time: '',
    lat: 28.6139, lon: 77.2090, tz_offset: 5.5, gender: 'male'
  });

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetchGemstones(formData);
      if (res.success) setResult(res.data);
      else setError('Failed to calculate gemstones.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-950 mb-4 flex items-center justify-center gap-3">
            <Gem className="w-10 h-10 text-teal-600" />
            Complete Gemstone Guide
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover your personalized lucky gemstones derived from both your precise Vedic Birth Chart and Chaldean Numerology.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCalculate} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-teal-100 max-w-4xl mx-auto mb-12">
          {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-semibold">{error}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Full Name</label>
              <input required type="text" className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all" onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Gender</label>
              <select className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all" onChange={e => setFormData({...formData, gender: e.target.value})} value={formData.gender}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Date of Birth</label>
              <input required type="date" className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all" onChange={e => setFormData({...formData, dob: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Time of Birth</label>
              <input required type="time" className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all" onChange={e => setFormData({...formData, time: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Latitude (Birth City)</label>
              <input required type="number" step="any" value={formData.lat} className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 outline-none" onChange={e => setFormData({...formData, lat: parseFloat(e.target.value)})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Longitude (Birth City)</label>
              <input required type="number" step="any" value={formData.lon} className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 outline-none" onChange={e => setFormData({...formData, lon: parseFloat(e.target.value)})} />
            </div>
          </div>
          <button disabled={loading} className="w-full bg-teal-600 text-white p-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-teal-500/30 disabled:opacity-70" style={{background: '#d35400'}}>
            {loading ? 'Analyzing Celestial Alignments...' : 'Generate Gemstone Guide'}
          </button>
        </form>

        {/* Results */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* Section 1: Kundli Astrological Stones */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 md:p-8 border-b border-teal-100 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-teal-950 mb-1">Astrological Gemstones (Kundli)</h2>
                  <p className="text-teal-700 font-medium">Calculated based on your Ascendant: <strong className="text-teal-900">{result.astrology.ascendant}</strong></p>
                </div>
                <Star className="w-10 h-10 text-teal-500 opacity-50 hidden sm:block" />
              </div>
              
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Life Stone (1st House) */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Life Stone (Lagna)</span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{result.astrology.gems.life.stone}</h3>
                  <p className="text-sm font-semibold text-slate-500 mb-4">Ruled by {result.astrology.gems.life.planet}</p>
                  <p className="text-slate-700 text-sm leading-relaxed">{result.astrology.gems.life.benefit}</p>
                </div>
                
                {/* Lucky Stone (5th House) */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Lucky Stone (5th Lord)</span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{result.astrology.gems.lucky.stone}</h3>
                  <p className="text-sm font-semibold text-slate-500 mb-4">Ruled by {result.astrology.gems.lucky.planet}</p>
                  <p className="text-slate-700 text-sm leading-relaxed">{result.astrology.gems.lucky.benefit}</p>
                </div>

                {/* Fortune Stone (9th House) */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Fortune Stone (9th Lord)</span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{result.astrology.gems.fortune.stone}</h3>
                  <p className="text-sm font-semibold text-slate-500 mb-4">Ruled by {result.astrology.gems.fortune.planet}</p>
                  <p className="text-slate-700 text-sm leading-relaxed">{result.astrology.gems.fortune.benefit}</p>
                </div>
              </div>
            </div>

            {/* Section 2: Numerology Stones */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 md:p-8 border-b border-indigo-100 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-indigo-950 mb-1">Numerology Gemstones</h2>
                  <p className="text-indigo-700 font-medium">Calculated from your Birth Date & Name</p>
                </div>
                <Sparkles className="w-10 h-10 text-indigo-500 opacity-50 hidden sm:block" />
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-black text-indigo-600 flex-shrink-0">
                    {result.numerology.radical.number}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Radical Number Stone</span>
                    <h3 className="text-xl font-bold text-slate-900">{result.numerology.radical.gemstone}</h3>
                    <p className="text-sm text-slate-600 mt-1">Recommended Metal: {result.numerology.radical.metal}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-black text-blue-600 flex-shrink-0">
                    {result.numerology.destiny.number}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Destiny Number Stone</span>
                    <h3 className="text-xl font-bold text-slate-900">{result.numerology.destiny.gemstone}</h3>
                    <p className="text-sm text-slate-600 mt-1">Recommended Metal: {result.numerology.destiny.metal}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-4">
              <Shield className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-relaxed">
                <strong>Important:</strong> Astrological and numerological gemstones often overlap, but sometimes conflict. It is highly recommended to consult with one of our expert astrologers before purchasing or wearing any gemstone to ensure it aligns perfectly with your planetary dashas (current periods).
              </p>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
}