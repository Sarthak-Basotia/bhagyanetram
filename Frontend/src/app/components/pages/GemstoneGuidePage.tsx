import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchGemstones } from '../../../api/astrologyApi';
import { Sparkles, Gem, Star, Shield, Loader2, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title>Vedic Gemstone Guide (Ratna Shastra Recommendation) | Bhagyanetram</title>
        <meta name="description" content="Discover your auspicious Vedic gemstones derived from your birth chart Lagna, 5th lord, 9th lord, and numerology numbers." />
        <link rel="canonical" href="https://bhagyanetram.com/gemstones" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-cosmic-900 celestial-grid-bg text-white text-center overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-xs font-medium uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span> Ratna Shastra</span>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/20 to-cosmic-800 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-6 text-gold-300">
              <Gem className="w-10 h-10" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
               <span className="gold-gradient-text">Gemstone Guide</span>
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-3xl mx-auto italic leading-relaxed">
              Harmonize cosmic planetary frequencies with pure Jyotish-quality gemstones tailored to your Ascendant, 5th, and 9th houses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Body */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Form */}
        <form onSubmit={handleCalculate} className="bg-white p-8 sm:p-10 rounded-3xl shadow-gold-card border border-gold-500/30 max-w-4xl mx-auto mb-14">
          <div className="text-center mb-8 pb-4 border-b border-gold-500/20">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-700 mb-1 font-display">Auspicious Prescription</p>
            <h2 className="font-display text-2xl font-bold text-cosmic-900">Enter Your Natal Coordinates</h2>
          </div>

          {error && <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm">{error}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">Full Name *</label>
              <input required type="text" placeholder="e.g. Meera Kapoor" className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">Gender *</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" onChange={e => setFormData({...formData, gender: e.target.value})} value={formData.gender}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">Date of Birth *</label>
              <input required type="date" className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" onChange={e => setFormData({...formData, dob: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">Time of Birth *</label>
              <input required type="time" className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" onChange={e => setFormData({...formData, time: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">Birth City Latitude</label>
              <input required type="number" step="any" defaultValue={28.61} className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500" onChange={e => setFormData({...formData, lat: parseFloat(e.target.value)})} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">Birth City Longitude</label>
              <input required type="number" step="any" defaultValue={77.20} className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500" onChange={e => setFormData({...formData, lon: parseFloat(e.target.value)})} />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="gold-btn w-full py-4 rounded-full font-display font-semibold text-sm shadow-gold-glow flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Evaluating Planetary Lordships...</span>
              </>
            ) : (
              <>
                <Gem className="w-4 h-4" />
                <span>Reveal Auspicious Ratnas</span>
              </>
            )}
          </button>
        </form>

        {/* Results */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            
            {/* Section 1: Kundli Astrological Stones */}
            <div className="bg-white rounded-3xl border border-gold-500/30 shadow-gold-card overflow-hidden">
              <div className="bg-cosmic-900 celestial-grid-bg text-white p-7 sm:p-9 border-b border-gold-500/30 flex justify-between items-center">
                <div>
                  <span className="text-xs uppercase tracking-widest text-gold-400 font-display font-bold block mb-1">Janma Kundli Alignment</span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold">Astrological Gemstones</h2>
                  <p className="text-ivory-200 text-sm mt-1">Calculated for Ascendant: <strong className="text-gold-300 font-display">{result.astrology?.ascendant}</strong></p>
                </div>
                <Star className="w-12 h-12 text-gold-400/40 hidden sm:block" />
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Life Stone (1st House) */}
                <div className="bg-ivory-100/70 rounded-2xl p-6 border border-gold-500/20">
                  <span className="bg-gold-500/20 text-gold-900 border border-gold-500/30 text-xs font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                    Life Stone (Lagna)
                  </span>
                  <h3 className="font-display text-2xl font-bold text-cosmic-900 mb-1">{result.astrology?.gems?.life?.stone}</h3>
                  <p className="text-xs font-semibold text-gold-700 uppercase tracking-wider mb-3">Ruled by {result.astrology?.gems?.life?.planet}</p>
                  <p className="text-cosmic-700 text-sm leading-relaxed">{result.astrology?.gems?.life?.benefit}</p>
                </div>
                
                {/* Lucky Stone (5th House) */}
                <div className="bg-ivory-100/70 rounded-2xl p-6 border border-gold-500/20">
                  <span className="bg-gold-500/20 text-gold-900 border border-gold-500/30 text-xs font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                    Lucky Stone (5th Lord)
                  </span>
                  <h3 className="font-display text-2xl font-bold text-cosmic-900 mb-1">{result.astrology?.gems?.lucky?.stone}</h3>
                  <p className="text-xs font-semibold text-gold-700 uppercase tracking-wider mb-3">Ruled by {result.astrology?.gems?.lucky?.planet}</p>
                  <p className="text-cosmic-700 text-sm leading-relaxed">{result.astrology?.gems?.lucky?.benefit}</p>
                </div>

                {/* Fortune Stone (9th House) */}
                <div className="bg-ivory-100/70 rounded-2xl p-6 border border-gold-500/20">
                  <span className="bg-gold-500/20 text-gold-900 border border-gold-500/30 text-xs font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                    Bhagya Stone (9th Lord)
                  </span>
                  <h3 className="font-display text-2xl font-bold text-cosmic-900 mb-1">{result.astrology?.gems?.fortune?.stone}</h3>
                  <p className="text-xs font-semibold text-gold-700 uppercase tracking-wider mb-3">Ruled by {result.astrology?.gems?.fortune?.planet}</p>
                  <p className="text-cosmic-700 text-sm leading-relaxed">{result.astrology?.gems?.fortune?.benefit}</p>
                </div>
              </div>
            </div>

            {/* Section 2: Numerology Stones */}
            {result.numerology && (
              <div className="bg-white rounded-3xl border border-gold-500/30 shadow-gold-card overflow-hidden">
                <div className="p-7 sm:p-9 border-b border-gold-500/20 bg-ivory-100/60 flex justify-between items-center">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-cosmic-900 mb-1">Numerology Harmonic Gemstones</h2>
                    <p className="text-xs text-cosmic-600">Calculated from your Birth Date & Name Vibrations</p>
                  </div>
                  <Sparkles className="w-8 h-8 text-gold-600 opacity-60 hidden sm:block" />
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-5 bg-ivory-50 p-6 rounded-2xl border border-gold-500/20">
                    <div className="w-16 h-16 rounded-2xl bg-cosmic-900 border border-gold-500/40 text-gold-300 flex items-center justify-center text-2xl font-display font-bold flex-shrink-0">
                      {result.numerology.radical?.number}
                    </div>
                    <div>
                      <span className="text-xs font-display font-semibold text-cosmic-500 uppercase tracking-wider block mb-1">Radical Number Stone</span>
                      <h3 className="font-display text-xl font-bold text-cosmic-900">{result.numerology.radical?.gemstone}</h3>
                      <p className="text-xs text-cosmic-600 mt-1">Recommended Metal: <strong className="text-gold-700">{result.numerology.radical?.metal}</strong></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 bg-ivory-50 p-6 rounded-2xl border border-gold-500/20">
                    <div className="w-16 h-16 rounded-2xl bg-cosmic-900 border border-gold-500/40 text-gold-300 flex items-center justify-center text-2xl font-display font-bold flex-shrink-0">
                      {result.numerology.destiny?.number}
                    </div>
                    <div>
                      <span className="text-xs font-display font-semibold text-cosmic-500 uppercase tracking-wider block mb-1">Destiny Number Stone</span>
                      <h3 className="font-display text-xl font-bold text-cosmic-900">{result.numerology.destiny?.gemstone}</h3>
                      <p className="text-xs text-cosmic-600 mt-1">Recommended Metal: <strong className="text-gold-700">{result.numerology.destiny?.metal}</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Disclaimer & Astrologer Notice */}
            <div className="bg-white border border-gold-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-gold-card">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-gold-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-cosmic-700 leading-relaxed">
                  <strong> Consecration Notice:</strong> Gemstones channel powerful cosmic rays. Wearing stones ruled by conflicting houses (6th, 8th, 12th) can trigger friction. Always get your active Mahadasha verified before purchasing gemstones.
                </p>
              </div>
              <a
                href="/contact"
                className="gold-btn px-6 py-3 rounded-full font-display font-semibold text-xs shadow-gold-glow flex-shrink-0 inline-flex items-center gap-1.5"
              >
                <span>Consult on Gemstones</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
}