import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Compass, AlertTriangle, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FreeKundli() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [formData, setFormData] = useState({
    name: '', dob: '', time: '', lat: 28.6139, lon: 77.2090, tz_offset: 5.5
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToPolicy) {
      alert('Please agree to the Terms & Conditions and Privacy Policy to generate your Kundli.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/astrology/kundli', {
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
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title>Free Online Janma Kundli Generator | Bhagyanetram</title>
        <meta name="description" content="Generate your complete Vedic Janma Kundli birth chart online with planetary positions, ascendant, and Manglik Dosha report." />
        <link rel="canonical" href="https://bhagyanetram.com/free-kundli" />
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
              <span>Accurate Vedic Ephemeris</span>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/20 to-cosmic-800 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-6 text-gold-300">
              <Compass className="w-10 h-10" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Free Janma <span className="gold-gradient-text">Kundli Analysis</span>
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-3xl mx-auto italic leading-relaxed">
              Calculate your precise planetary houses, Lagna ascendant, Moon Nakshatra, and Mangal Dosha using classical Parashari algorithms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Form Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gold-500/30 shadow-gold-card">
            <div className="text-center mb-8 pb-6 border-b border-gold-500/20">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-700 mb-1 font-display">Birth Coordinates</p>
              <h2 className="font-display text-2xl font-bold text-cosmic-900">Enter Your Natal Birth Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">
                  Full Name *
                </label>
                <input 
                  className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" 
                  required 
                  placeholder="e.g. Aditi Sharma" 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">
                  Date of Birth *
                </label>
                <input 
                  className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" 
                  required 
                  type="date" 
                  onChange={e => setFormData({...formData, dob: e.target.value})} 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">
                  Time of Birth (Exact) *
                </label>
                <input 
                  className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" 
                  required 
                  type="time" 
                  onChange={e => setFormData({...formData, time: e.target.value})} 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">
                  Birth City Coordinates (Default: Delhi)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    className="w-full px-3 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-xs focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" 
                    type="number" 
                    step="any" 
                    placeholder="Lat (28.61)" 
                    onChange={e => setFormData({...formData, lat: parseFloat(e.target.value)})} 
                  />
                  <input 
                    className="w-full px-3 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-xs focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" 
                    type="number" 
                    step="any" 
                    placeholder="Lon (77.20)" 
                    onChange={e => setFormData({...formData, lon: parseFloat(e.target.value)})} 
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="kundli-agree-policy"
                  required
                  checked={agreedToPolicy}
                  onChange={(e) => setAgreedToPolicy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gold-500/50 text-gold-600 focus:ring-gold-500 cursor-pointer accent-gold-600"
                />
                <label htmlFor="kundli-agree-policy" className="text-xs text-cosmic-800 leading-snug cursor-pointer select-none">
                  I agree to the{' '}
                  <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-gold-700 underline font-semibold hover:text-gold-800">
                    Terms &amp; Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gold-700 underline font-semibold hover:text-gold-800">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <div className="md:col-span-2 pt-3">
                <button 
                  disabled={loading} 
                  type="submit"
                  className="gold-btn w-full py-4 rounded-full font-display font-semibold text-sm shadow-gold-glow flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Aligning Nava Grahas & Ephemeris...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Kundli Chart</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 space-y-6"
            >
              {/* Profile Card */}
              <div className="bg-white p-8 rounded-3xl border border-gold-500/30 shadow-gold-card">
                <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-gold-500/20">
                  <Sparkles className="w-5 h-5 text-gold-600" />
                  <h3 className="font-display text-xl font-bold text-cosmic-900">Astrological Profile</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-ivory-100/70 p-4 rounded-2xl border border-gold-500/20 text-center">
                    <span className="text-xs uppercase tracking-wider text-cosmic-500 font-semibold block mb-1">Ascendant</span>
                    <span className="font-display font-bold text-cosmic-900 text-base">{result.basicDetails?.ascendant || 'Aries'}</span>
                  </div>
                  <div className="bg-ivory-100/70 p-4 rounded-2xl border border-gold-500/20 text-center">
                    <span className="text-xs uppercase tracking-wider text-cosmic-500 font-semibold block mb-1">Moon Sign</span>
                    <span className="font-display font-bold text-cosmic-900 text-base">{result.basicDetails?.moonSign || 'Taurus'}</span>
                  </div>
                  <div className="bg-ivory-100/70 p-4 rounded-2xl border border-gold-500/20 text-center">
                    <span className="text-xs uppercase tracking-wider text-cosmic-500 font-semibold block mb-1">Sun Sign</span>
                    <span className="font-display font-bold text-cosmic-900 text-base">{result.basicDetails?.sunSign || 'Leo'}</span>
                  </div>
                  <div className="bg-ivory-100/70 p-4 rounded-2xl border border-gold-500/20 text-center">
                    <span className="text-xs uppercase tracking-wider text-cosmic-500 font-semibold block mb-1">Nakshatra</span>
                    <span className="font-display font-bold text-cosmic-900 text-base">{result.basicDetails?.nakshatra || 'Rohini'}</span>
                  </div>
                </div>
              </div>

              {/* Manglik Check */}
              <div className={`p-8 rounded-3xl border shadow-gold-card ${
                result.doshaCheck?.mangalDosha 
                  ? 'bg-rose-50/70 border-rose-300' 
                  : 'bg-emerald-50/70 border-emerald-300'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {result.doshaCheck?.mangalDosha ? (
                    <AlertTriangle className="w-6 h-6 text-rose-600" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  )}
                  <h3 className="font-display text-xl font-bold text-cosmic-900">
                    Manglik Dosha Assessment
                  </h3>
                </div>
                <p className="font-display font-semibold text-base mb-2">
                  {result.doshaCheck?.mangalDosha ? "⚠️ Manglik Dosha Present in Chart" : "✅ No Afflictive Manglik Dosha Detected"}
                </p>
                <p className="text-cosmic-700 text-sm leading-relaxed">{result.doshaCheck?.description}</p>
              </div>

              {/* Predictions */}
              <div className="bg-white p-8 rounded-3xl border border-gold-500/30 shadow-gold-card space-y-5">
                <div className="pb-4 border-b border-gold-500/20">
                  <h3 className="font-display text-xl font-bold text-cosmic-900">Key Planetary Insights</h3>
                </div>
                <div className="p-4 rounded-2xl bg-ivory-100/60 border border-gold-500/20">
                  <h4 className="font-display font-bold text-cosmic-900 text-sm mb-1 text-gold-800">Personality & Swabhava</h4>
                  <p className="text-cosmic-700 text-sm leading-relaxed">{result.lifePredictions?.personality}</p>
                </div>
                <div className="p-4 rounded-2xl bg-ivory-100/60 border border-gold-500/20">
                  <h4 className="font-display font-bold text-cosmic-900 text-sm mb-1 text-gold-800">Career & Karma Kshetra</h4>
                  <p className="text-cosmic-700 text-sm leading-relaxed">{result.lifePredictions?.career}</p>
                </div>
                <div className="p-4 rounded-2xl bg-ivory-100/60 border border-gold-500/20">
                  <h4 className="font-display font-bold text-cosmic-900 text-sm mb-1 text-gold-800">Relationships & Vivah</h4>
                  <p className="text-cosmic-700 text-sm leading-relaxed">{result.lifePredictions?.relationships}</p>
                </div>

                <div className="pt-4 text-center">
                  <a
                    href="/contact"
                    className="gold-btn px-8 py-3.5 rounded-full font-display font-semibold text-xs shadow-gold-glow inline-flex items-center gap-2"
                  >
                    <span>Request In-Depth Consultation with Pandit Pranav</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}