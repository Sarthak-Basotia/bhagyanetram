import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, Sparkles, CheckCircle2, AlertTriangle, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MatchmakingPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const [boy, setBoy] = useState({ name: '', dob: '', time: '', lat: 28.61, lon: 77.20, tz_offset: 5.5 });
  const [girl, setGirl] = useState({ name: '', dob: '', time: '', lat: 28.61, lon: 77.20, tz_offset: 5.5 });

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
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title>Vedic Kundli Matching (36 Guna Ashtakoot Milan) | Bhagyanetram</title>
        <meta name="description" content="Calculate authentic 36-point Ashtakoot Guna Milan for marriage compatibility, Manglik dosha, and Nadi harmony." />
        <link rel="canonical" href="https://bhagyanetram.com/matchmaking" />
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
              <span>Ashtakoota 36 Guna Milan</span>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/20 to-cosmic-800 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-6 text-gold-300">
              <Heart className="w-10 h-10" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Vedic <span className="gold-gradient-text">Kundli Matching</span>
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-3xl mx-auto italic leading-relaxed">
              Ascertain  psychological, emotional, and physical marital compatibility through the classical Ashtakoot Milan system.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Matching Form Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          <form onSubmit={handleMatch} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Boy's Details */}
            <div className="bg-white p-8 rounded-3xl border border-gold-500/30 shadow-gold-card">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gold-500/20">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-display font-bold">
                  ♂
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-cosmic-900">Groom's Birth Details (Var)</h3>
                  <p className="text-xs text-cosmic-500">Natal coordinates for the boy</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Groom Name</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" placeholder="e.g. Rahul" onChange={e => setBoy({...boy, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Date of Birth *</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" required type="date" onChange={e => setBoy({...boy, dob: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Exact Birth Time *</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" required type="time" onChange={e => setBoy({...boy, time: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Birth Coordinates (Lat / Lon)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input className="w-full px-3 py-2.5 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-xs focus:outline-none focus:border-gold-500" type="number" step="any" placeholder="Lat (28.61)" onChange={e => setBoy({...boy, lat: parseFloat(e.target.value)})} />
                    <input className="w-full px-3 py-2.5 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-xs focus:outline-none focus:border-gold-500" type="number" step="any" placeholder="Lon (77.20)" onChange={e => setBoy({...boy, lon: parseFloat(e.target.value)})} />
                  </div>
                </div>
              </div>
            </div>

            {/* Girl's Details */}
            <div className="bg-white p-8 rounded-3xl border border-gold-500/30 shadow-gold-card">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gold-500/20">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 font-display font-bold">
                  ♀
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-cosmic-900">Bride's Birth Details (Kanya)</h3>
                  <p className="text-xs text-cosmic-500">Natal coordinates for the girl</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Bride Name</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" placeholder="e.g. Priya" onChange={e => setGirl({...girl, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Date of Birth *</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" required type="date" onChange={e => setGirl({...girl, dob: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Exact Birth Time *</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" required type="time" onChange={e => setGirl({...girl, time: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Birth Coordinates (Lat / Lon)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input className="w-full px-3 py-2.5 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-xs focus:outline-none focus:border-gold-500" type="number" step="any" placeholder="Lat (28.61)" onChange={e => setGirl({...girl, lat: parseFloat(e.target.value)})} />
                    <input className="w-full px-3 py-2.5 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-xs focus:outline-none focus:border-gold-500" type="number" step="any" placeholder="Lon (77.20)" onChange={e => setGirl({...girl, lon: parseFloat(e.target.value)})} />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                disabled={loading}
                type="submit"
                className="gold-btn w-full py-4 rounded-full font-display font-semibold text-sm shadow-gold-glow flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Calculating 36 Guna Ashtakoot Milan...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4" />
                    <span>Calculate Compatibility Score</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Results Container */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-gold-card border border-gold-500/30 overflow-hidden"
            >
              {/* Score Header */}
              <div className="bg-cosmic-900 celestial-grid-bg text-white p-8 sm:p-10 text-center relative border-b border-gold-500/30">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-2 block font-display">Ashtakoot Guna Score</span>
                <h2 className="font-display text-5xl sm:text-6xl font-bold mb-2 text-white">
                  {result.totalScore} <span className="text-2xl text-gold-400 font-normal">/ 36 Gunas</span>
                </h2>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-gold-300 mb-3">{result.compatibilityLevel}</h3>
                <p className="font-editorial text-lg text-ivory-200/90 max-w-2xl mx-auto italic leading-relaxed">
                  {result.conclusion}
                </p>
              </div>
              
              {/* Breakdown Pillars */}
              <div className="p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-ivory-100/70 p-6 rounded-2xl border border-gold-500/20">
                  <h4 className="font-display font-bold text-cosmic-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <Sparkles className="w-4 h-4 text-gold-600" />
                    <span>Bhakoot (Emotional Resonance)</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-cosmic-700 leading-relaxed">{result.analysis?.bhakoot}</p>
                </div>
                <div className="bg-ivory-100/70 p-6 rounded-2xl border border-gold-500/20">
                  <h4 className="font-display font-bold text-cosmic-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <Sparkles className="w-4 h-4 text-gold-600" />
                    <span>Nadi (Health & Genetic Lineage)</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-cosmic-700 leading-relaxed">{result.analysis?.nadi}</p>
                </div>
                <div className="bg-ivory-100/70 p-6 rounded-2xl border border-gold-500/20">
                  <h4 className="font-display font-bold text-cosmic-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <Sparkles className="w-4 h-4 text-gold-600" />
                    <span>Varna & Tara (Spiritual Alignment)</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-cosmic-700 leading-relaxed">{result.analysis?.varna}</p>
                </div>
              </div>

              {/* Remedies Section */}
              {result.remedies && result.remedies.length > 0 && (
                <div className="p-8 bg-ivory-100/80 border-t border-gold-500/20">
                  <h4 className="font-display font-bold text-cosmic-900 text-base mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-gold-600" />
                    <span>Prescribed Vedic Rectifications & Remedies</span>
                  </h4>
                  <ul className="space-y-2">
                    {result.remedies.map((remedy: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-cosmic-800">
                        <span className="text-gold-600 font-bold">✦</span>
                        <span>{remedy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Expert CTA */}
              <div className="p-8 text-center border-t border-gold-500/20">
                <a
                  href="/contact"
                  className="gold-btn px-8 py-3.5 rounded-full font-display font-semibold text-xs shadow-gold-glow inline-flex items-center gap-2"
                >
                  <span>Book In-Depth Kundli Milan Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}