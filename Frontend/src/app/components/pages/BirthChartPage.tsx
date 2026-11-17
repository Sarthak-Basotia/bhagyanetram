import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Compass, AlertTriangle, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchAdvancedKundli } from '../../../api/astrologyApi';

export default function BirthChartPage() {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'D1' | 'D9' | 'YOGAS'>('D1');
  const [error, setError] = useState('');
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  // Default form state (Using New Delhi coordinates as fallback)
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    time: '',
    lat: 28.61,
    lon: 77.20,
    tz_offset: 5.5
  });

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToPolicy) {
      setError('Please agree to the Terms & Conditions and Privacy Policy to proceed.');
      return;
    }
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
  const PlanetTable = ({ chart }: { chart: any }) => {
    const safeDegree = (val: any) => {
      const num = val?.degree ?? val?.normDegree ?? val?.longitude ?? 0;
      return Number(num).toFixed(2);
    };

    return (
      <div className="overflow-x-auto bg-white rounded-2xl shadow-gold-card border border-gold-500/30">
        <table className="w-full text-left text-sm text-cosmic-900">
          <thead className="bg-cosmic-900 text-gold-300 border-b border-gold-500/30 font-display text-xs uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3.5 font-bold">Graha (Planet)</th>
              <th className="px-5 py-3.5 font-bold">Rashi (Sign)</th>
              <th className="px-5 py-3.5 font-bold">Degree</th>
              <th className="px-5 py-3.5 font-bold">Bhava (House)</th>
              <th className="px-5 py-3.5 font-bold">Nakshatra</th>
              <th className="px-5 py-3.5 font-bold">Gati (Status)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold-500/10">
            {/* Ascendant Row */}
            {chart?.ascendant && (
              <tr className="bg-gold-500/10 font-medium">
                <td className="px-5 py-3.5 font-bold text-gold-800 flex items-center gap-1.5 font-display">
                  <Sparkles className="w-4 h-4 text-gold-600" />
                  <span>Ascendant (Lagna)</span>
                </td>
                <td className="px-5 py-3.5 font-display font-semibold text-cosmic-950">{chart.ascendant.sign || '-'}</td>
                <td className="px-5 py-3.5 font-mono">{safeDegree(chart.ascendant)}°</td>
                <td className="px-5 py-3.5 font-display font-bold">1st House</td>
                <td className="px-5 py-3.5 font-medium">{chart.ascendant.nakshatra || '-'}</td>
                <td className="px-5 py-3.5 text-xs text-cosmic-500">-</td>
              </tr>
            )}
            
            {/* Planets Rows */}
            {chart?.planets?.map((p: any, idx: number) => (
              <tr key={idx} className="hover:bg-ivory-100/70 transition-colors">
                <td className="px-5 py-3.5 font-display font-bold text-cosmic-900">
                  {p.planet}
                </td>
                <td className="px-5 py-3.5 font-medium text-cosmic-800">{p.sign || '-'}</td>
                <td className="px-5 py-3.5 font-mono text-xs">{safeDegree(p)}°</td>
                <td className="px-5 py-3.5 font-medium text-cosmic-800">{p.house || '-'}</td>
                <td className="px-5 py-3.5 text-cosmic-700">{p.nakshatra || '-'}</td>
                <td className="px-5 py-3.5 text-xs">
                  {p.is_retrograde ? (
                    <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 border border-rose-300 rounded-full font-display font-bold text-[10px] uppercase">
                      Vakri (Retrograde)
                    </span>
                  ) : (
                    <span className="text-cosmic-500 font-medium">Marga (Direct)</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title>Detailed Vedic Birth Chart (Janma Kundli & Navamsa) | Bhagyanetram</title>
        <meta name="description" content="Calculate high-precision D1 Lagna and D9 Navamsa birth charts using the Swiss Ephemeris astronomical engine." />
        <link rel="canonical" href="https://bhagyanetram.com/birth-chart" />
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
              <span>Swiss Ephemeris Calculations</span>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/20 to-cosmic-800 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-6 text-gold-300">
              <Compass className="w-10 h-10" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Detailed <span className="gold-gradient-text">Birth Chart (Kundli)</span>
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-3xl mx-auto italic leading-relaxed">
              Ascertain exact planetary longitudes, D1 Rashi chakra, D9 Navamsa micro-positions, and auspicious Yogas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Container */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Input Form */}
          <div className="lg:col-span-4">
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-gold-500/30 shadow-gold-card space-y-5 sticky top-8">
              <div className="border-b border-gold-500/20 pb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-700 mb-1 font-display">Natal Data</p>
                <h2 className="font-display text-xl font-bold text-cosmic-900">Enter Birth Coordinates</h2>
              </div>
              
              {error && <div className="p-3.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs">{error}</div>}

              <form onSubmit={handleCalculate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Full Name *</label>
                  <input required type="text" placeholder="e.g. John Doe" className="w-full px-4 py-2.5 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Date of Birth *</label>
                    <input required type="date" className="w-full px-3 py-2.5 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-xs focus:outline-none focus:border-gold-500" onChange={e => setFormData({...formData, dob: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Time of Birth *</label>
                    <input required type="time" className="w-full px-3 py-2.5 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-xs focus:outline-none focus:border-gold-500" onChange={e => setFormData({...formData, time: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Latitude *</label>
                    <input required type="number" step="any" placeholder="28.61" defaultValue={28.61} className="w-full px-3 py-2.5 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-xs focus:outline-none focus:border-gold-500" onChange={e => setFormData({...formData, lat: parseFloat(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Longitude *</label>
                    <input required type="number" step="any" placeholder="77.20" defaultValue={77.20} className="w-full px-3 py-2.5 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-xs focus:outline-none focus:border-gold-500" onChange={e => setFormData({...formData, lon: parseFloat(e.target.value)})} />
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="birthchart-agree-policy"
                    required
                    checked={agreedToPolicy}
                    onChange={(e) => setAgreedToPolicy(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-gold-500/50 text-gold-600 focus:ring-gold-500 cursor-pointer accent-gold-600"
                  />
                  <label htmlFor="birthchart-agree-policy" className="text-xs text-cosmic-800 leading-snug cursor-pointer select-none">
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

                <button
                  disabled={loading}
                  type="submit"
                  className="gold-btn w-full py-3.5 rounded-full font-display font-semibold text-xs shadow-gold-glow flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Computing Ephemeris...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Full Kundli</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Results Display */}
          <div className="lg:col-span-8">
            {!chartData ? (
              <div className="h-full flex flex-col items-center justify-center min-h-[420px] border-2 border-dashed border-gold-500/40 rounded-3xl bg-white p-8 text-center shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600 mb-4">
                  <Compass className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-cosmic-900 mb-2">Awaiting Natal Coordinates</h3>
                <p className="text-cosmic-600 max-w-sm text-sm leading-relaxed">
                  Submit the birth form to compute your D1 Rashi chakra, D9 Navamsa chart, and detected Yogas.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Profile Summary Header */}
                <div className="bg-cosmic-900 celestial-grid-bg text-white p-7 rounded-3xl shadow-gold-card border border-gold-500/30 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">{formData.name || "Native"}'s Chart</h2>
                    <p className="text-gold-300 text-xs mt-1">Born: {formData.dob} at {formData.time} (Lat: {formData.lat}, Lon: {formData.lon})</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-cosmic-950/70 px-4 py-2 rounded-xl border border-gold-500/30 text-center">
                      <span className="block text-[10px] text-gold-400 uppercase font-display font-bold tracking-wider">Lagna</span>
                      <span className="font-display font-bold text-white text-sm">{chartData.lagna?.ascendant?.sign || 'Aries'}</span>
                    </div>
                    <div className="bg-cosmic-950/70 px-4 py-2 rounded-xl border border-gold-500/30 text-center">
                      <span className="block text-[10px] text-gold-400 uppercase font-display font-bold tracking-wider">Moon Sign</span>
                      <span className="font-display font-bold text-white text-sm">
                        {chartData.lagna?.planets?.find((p: any) => p.planet === 'Moon')?.sign || 'Taurus'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-gold-500/30 pb-px">
                  <button 
                    onClick={() => setActiveTab('D1')} 
                    className={`px-5 py-2.5 text-xs font-display font-bold rounded-t-xl transition-all ${
                      activeTab === 'D1' 
                        ? 'bg-white text-cosmic-900 border border-gold-500/40 border-b-white shadow-xs' 
                        : 'text-cosmic-600 hover:text-cosmic-900 hover:bg-ivory-100'
                    }`}
                  >
                    D1 Lagna Rashi Chart
                  </button>
                  <button 
                    onClick={() => setActiveTab('D9')} 
                    className={`px-5 py-2.5 text-xs font-display font-bold rounded-t-xl transition-all ${
                      activeTab === 'D9' 
                        ? 'bg-white text-cosmic-900 border border-gold-500/40 border-b-white shadow-xs' 
                        : 'text-cosmic-600 hover:text-cosmic-900 hover:bg-ivory-100'
                    }`}
                  >
                    D9 Navamsa Chart
                  </button>
                  <button 
                    onClick={() => setActiveTab('YOGAS')} 
                    className={`px-5 py-2.5 text-xs font-display font-bold rounded-t-xl transition-all ${
                      activeTab === 'YOGAS' 
                        ? 'bg-white text-cosmic-900 border border-gold-500/40 border-b-white shadow-xs' 
                        : 'text-cosmic-600 hover:text-cosmic-900 hover:bg-ivory-100'
                    }`}
                  >
                    Yogas & Planetary Combinations
                  </button>
                </div>

                {/* Tab Content */}
                <div className="space-y-4">
                  {activeTab === 'D1' && (
                    <div>
                      <h3 className="font-display text-lg font-bold text-cosmic-900 mb-1">D1 Lagna Rashi Positions</h3>
                      <p className="text-xs text-cosmic-600 mb-4">Exact zodiac degrees and nakshatras at your exact time and place of birth.</p>
                      <PlanetTable chart={chartData.lagna} />
                    </div>
                  )}

                  {activeTab === 'D9' && (
                    <div>
                      <h3 className="font-display text-lg font-bold text-cosmic-900 mb-1">D9 Navamsa Harmonic Chart</h3>
                      <p className="text-xs text-cosmic-600 mb-4">Harmonic 9th-division chart detailing dharma, marital destiny, and soul purpose.</p>
                      <PlanetTable chart={chartData.navamsa} />
                    </div>
                  )}

                  {activeTab === 'YOGAS' && (
                    <div className="space-y-6">
                      <div className="bg-white p-7 rounded-3xl border border-gold-500/30 shadow-gold-card">
                         <h3 className="font-display text-xl font-bold text-cosmic-900 mb-4 flex items-center gap-2">
                           <Sparkles className="w-5 h-5 text-gold-600" />
                           <span>Detected Auspicious Yogas</span>
                         </h3>
                         {chartData.combinations?.yogas && chartData.combinations.yogas.length > 0 ? (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {chartData.combinations.yogas.map((yoga: any, i: number) => (
                               <div key={i} className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-300">
                                 <h4 className="font-display font-bold text-emerald-900 text-sm">{yoga.name}</h4>
                                 <p className="text-xs text-emerald-800 mt-1 leading-relaxed">{yoga.description}</p>
                               </div>
                             ))}
                           </div>
                         ) : (
                           <p className="text-cosmic-500 text-sm italic">No major Raja Yogas detected in this introductory pass.</p>
                         )}
                      </div>

                      <div className="bg-white p-7 rounded-3xl border border-gold-500/30 shadow-gold-card">
                         <h3 className="font-display text-xl font-bold text-cosmic-900 mb-4 flex items-center gap-2">
                           <AlertTriangle className="w-5 h-5 text-rose-600" />
                           <span>Afflictions & Planetary Doshas</span>
                         </h3>
                         {chartData.combinations?.doshas && chartData.combinations.doshas.length > 0 ? (
                           <div className="space-y-3">
                             {chartData.combinations.doshas.map((dosha: any, i: number) => (
                               <div key={i} className="bg-rose-50/60 p-4 rounded-2xl border border-rose-300 flex gap-3.5 items-start">
                                 <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                                 <div>
                                   <h4 className="font-display font-bold text-rose-900 text-sm">{dosha.name}</h4>
                                   <p className="text-xs text-rose-800 mt-0.5 leading-relaxed">{dosha.description}</p>
                                   {dosha.remedies && (
                                     <p className="text-xs font-semibold text-rose-700 mt-2">Remedies: {dosha.remedies.join(', ')}</p>
                                   )}
                                 </div>
                               </div>
                             ))}
                           </div>
                         ) : (
                           <p className="text-cosmic-700 text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Chart is free of severe classical doshas.</p>
                         )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Consultation Link */}
                <div className="text-center pt-4">
                  <a
                    href="/contact"
                    className="gold-btn px-8 py-3.5 rounded-full font-display font-semibold text-xs shadow-gold-glow inline-flex items-center gap-2"
                  >
                    <span>Consult Pandit Pranav for Complete 12-House Analysis</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}