import React, { useState, useEffect, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { fetchPlanetTransit } from '../../../api/astrologyApi';
import { NorthIndianChart } from '../NorthIndianChart';
import { Loader2, Settings2, Table as TableIcon, Sparkles, Compass, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Helper to get local time formatted for the HTML datetime-local input
const getLocalDatetimeString = (date: Date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

export default function PlanetTransitPage() {
  const [chartData, setChartData] = useState<{ ascendant: number, planets: any[], rawDetails: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  // Form State (Defaults to current time and New Delhi coordinates)
  const [datetime, setDatetime] = useState(getLocalDatetimeString(new Date()));
  const [lat, setLat] = useState<number>(28.6139);
  const [lon, setLon] = useState<number>(77.2090);
  const [tzOffset, setTzOffset] = useState<number>(5.5);

  const fetchChart = async (dtStr: string, latitude: number, longitude: number, tz: number) => {
    setLoading(true);
    setError('');
    try {
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

  useEffect(() => {
    fetchChart(datetime, lat, lon, tzOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    if (!agreedToPolicy) {
      setError('Please agree to the Terms & Conditions and Privacy Policy before proceeding.');
      return;
    }
    fetchChart(datetime, lat, lon, tzOffset);
  };

  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title>Live Planetary Transit (Gochar) & Sky Map | Bhagyanetram</title>
        <meta name="description" content="Calculate real-time celestial planetary alignments, Gochar positions, and live North Indian Kundli chart for any moment." />
        <link rel="canonical" href="https://bhagyanetram.com/planet-transit" />
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
              <span>Real-Time Gochara Positions</span>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/20 to-cosmic-800 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-6 text-gold-300">
              <Compass className="w-10 h-10" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Live Planetary <span className="gold-gradient-text">Transit (Gochar)</span>
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-3xl mx-auto italic leading-relaxed">
              Real-time positions of the Nava Grahas across the 12 celestial houses calculated with astronomical precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

          {/* LEFT COLUMN: Input Form */}
          <div className="lg:col-span-4 bg-white p-7 sm:p-8 rounded-3xl border border-gold-500/30 shadow-gold-card h-fit">
            <div className="flex items-center gap-2.5 mb-6 border-b border-gold-500/20 pb-4">
              <Settings2 className="w-5 h-5 text-gold-600" />
              <h2 className="font-display text-xl font-bold text-cosmic-900">Transit Coordinates</h2>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Date & Time *</label>
                <input
                  type="datetime-local"
                  value={datetime}
                  onChange={(e) => setDatetime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Latitude *</label>
                  <input
                    type="number"
                    step="any"
                    value={lat}
                    onChange={(e) => setLat(parseFloat(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-xs focus:outline-none focus:border-gold-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Longitude *</label>
                  <input
                    type="number"
                    step="any"
                    value={lon}
                    onChange={(e) => setLon(parseFloat(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-xs focus:outline-none focus:border-gold-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">Timezone Offset (Hours)</label>
                <input
                  type="number"
                  step="0.5"
                  value={tzOffset}
                  onChange={(e) => setTzOffset(parseFloat(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-xs focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="transit-agree-policy"
                  required
                  checked={agreedToPolicy}
                  onChange={(e) => setAgreedToPolicy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gold-500/50 text-gold-600 focus:ring-gold-500 cursor-pointer accent-gold-600"
                />
                <label htmlFor="transit-agree-policy" className="text-xs text-cosmic-800 leading-snug cursor-pointer select-none">
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
                type="submit"
                disabled={loading}
                className="gold-btn w-full py-3.5 rounded-full font-display font-semibold text-xs shadow-gold-glow flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Recalculating Sky Map...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Transit Chart</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: The Chart */}
          <div className="lg:col-span-8 flex items-center justify-center bg-white p-8 rounded-3xl shadow-gold-card border border-gold-500/30">
            {loading ? (
              <div className="flex flex-col items-center py-16">
                <Loader2 className="w-12 h-12 animate-spin text-gold-600 mb-4" />
                <p className="font-display font-medium text-cosmic-900 text-sm">Consulting Astronomical Planetary Ephemeris...</p>
              </div>
            ) : error ? (
              <p className="text-rose-600 font-bold text-sm">{error}</p>
            ) : chartData ? (
              <div className="w-full max-w-lg p-2">
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
          <div className="bg-white rounded-3xl shadow-gold-card border border-gold-500/30 overflow-hidden mb-12">
            <div className="bg-cosmic-900 text-white p-6 border-b border-gold-500/30 flex items-center gap-2.5">
              <TableIcon className="w-5 h-5 text-gold-400" />
              <h2 className="font-display text-xl font-bold">Planetary Positions & Dignities (Gochara Ephemeris)</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm text-cosmic-900">
                <thead>
                  <tr className="bg-ivory-100 text-cosmic-800 font-display text-xs uppercase tracking-wider border-b border-gold-500/20">
                    <th className="p-4 font-bold">Graha (Planet)</th>
                    <th className="p-4 font-bold">Rashi (Sign)</th>
                    <th className="p-4 font-bold">Degree</th>
                    <th className="p-4 font-bold">Nakshatra (Pada)</th>
                    <th className="p-4 font-bold">Motion (Gati)</th>
                    <th className="p-4 font-bold">Dignity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold-500/10">
                  {chartData.rawDetails.map((p: any, idx: number) => (
                    <tr key={idx} className="hover:bg-ivory-100/60 transition-colors">
                      <td className="p-4 font-display font-bold text-cosmic-900">{p.planet}</td>
                      <td className="p-4 text-cosmic-800 font-medium">{p.sign}</td>
                      <td className="p-4 font-mono text-xs text-cosmic-700">
                        {typeof p.degree_in_sign === 'number' ? p.degree_in_sign.toFixed(2) : p.degree_in_sign}°
                      </td>
                      <td className="p-4 text-cosmic-700">
                        {p.nakshatra} ({p.pada})
                      </td>
                      <td className="p-4">
                        {p.retrograde ? (
                          <span className="bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-display font-bold px-2.5 py-0.5 rounded-full uppercase">
                            Vakri (Retrograde)
                          </span>
                        ) : (
                          <span className="text-cosmic-500 font-medium text-xs">Marga (Direct)</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-display font-bold px-2.5 py-0.5 rounded-full uppercase ${
                          p.dignity === 'exalted' ? 'bg-gold-500/20 text-gold-900 border border-gold-500/30' :
                          p.dignity === 'debilitated' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                          p.dignity === 'own' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                          'bg-ivory-100 text-cosmic-600'
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