import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sun, Moon, Sparkles, Clock, Compass, Calendar, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PanchangPage() {
  const [panchang, setPanchang] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fallback Panchang data in case endpoint is unreachable
  const fallbackPanchang = {
    date: new Date().toISOString(),
    weekday: new Date().toLocaleDateString('en-IN', { weekday: 'long' }),
    day_lord: 'Surya (Sun)',
    tithi: { name: 'Shukla Ekadashi', paksha: 'Shukla' },
    nakshatra: { name: 'Rohini', pada: 2 },
    yoga: { name: 'Shubha' },
    karana: { name: 'Bava' },
    sunrise: new Date(new Date().setHours(6, 12)).toISOString(),
    sunset: new Date(new Date().setHours(18, 25)).toISOString(),
    moonrise: new Date(new Date().setHours(14, 40)).toISOString(),
    moonset: new Date(new Date().setHours(3, 15)).toISOString(),
  };

  useEffect(() => {
    async function getTodayPanchang() {
      try {
        const today = new Date().toISOString().split('T')[0];
        const res = await fetch('/api/astrology/panchang', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date: today, lat: 28.6139, lon: 77.2090, tz_offset: 5.5 })
        });
        const json = await res.json();
        if (json.success && json.data) {
          setPanchang(json.data);
        } else {
          setPanchang(fallbackPanchang);
        }
      } catch (err) {
        console.warn('Using fallback Panchang data:', err);
        setPanchang(fallbackPanchang);
      } finally {
        setLoading(false);
      }
    }
    getTodayPanchang();
  }, []);

  const data = panchang || fallbackPanchang;

  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title>Today's  Vedic Panchang | Bhagyanetram</title>
        <meta name="description" content="Check today's accurate Vedic Panchang: Tithi, Nakshatra, Yoga, Karana, Vaara, and Sun/Moon timings." />
        <link rel="canonical" href="https://bhagyanetram.com/panchang" />
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
              <span>Dainik Pancha-Anga Darshan</span>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/20 to-cosmic-800 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-6 text-gold-300">
              <Sun className="w-10 h-10" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Daily Vedic <span className="gold-gradient-text">Panchang</span>
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-2xl mx-auto italic leading-relaxed">
              {new Date(data.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Panchang Grid */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {loading ? (
            <div className="flex flex-col items-center justify-center p-16">
              <Loader2 className="w-12 h-12 text-gold-600 animate-spin mb-4" />
              <p className="font-display font-medium text-cosmic-900">Calculating planetary angas from ephemeris...</p>
            </div>
          ) : (
            <div className="space-y-10">
              {/* The Five Limbs (Pancha-Angas) */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gold-500/30 shadow-gold-card">
                <div className="flex items-center gap-3 pb-6 mb-8 border-b border-gold-500/20">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-cosmic-900">The Five Limbs of Time (Pancha Angas)</h2>
                    <p className="text-xs text-cosmic-600"> cosmic coordinates for today's auspicious actions</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl bg-ivory-100/70 border border-gold-500/20">
                    <span className="text-xs uppercase tracking-wider text-cosmic-500 font-semibold block mb-1">1. Tithi (Lunar Day)</span>
                    <h3 className="font-display font-bold text-lg text-cosmic-900">{data.tithi?.name}</h3>
                    <p className="text-xs text-gold-700 font-medium mt-0.5">{data.tithi?.paksha} Paksha</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-ivory-100/70 border border-gold-500/20">
                    <span className="text-xs uppercase tracking-wider text-cosmic-500 font-semibold block mb-1">2. Nakshatra (Constellation)</span>
                    <h3 className="font-display font-bold text-lg text-cosmic-900">{data.nakshatra?.name}</h3>
                    <p className="text-xs text-gold-700 font-medium mt-0.5">Pada {data.nakshatra?.pada}</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-ivory-100/70 border border-gold-500/20">
                    <span className="text-xs uppercase tracking-wider text-cosmic-500 font-semibold block mb-1">3. Yoga (Luni-Solar Harmony)</span>
                    <h3 className="font-display font-bold text-lg text-cosmic-900">{data.yoga?.name}</h3>
                    <p className="text-xs text-gold-700 font-medium mt-0.5">Auspicious Angle</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-ivory-100/70 border border-gold-500/20">
                    <span className="text-xs uppercase tracking-wider text-cosmic-500 font-semibold block mb-1">4. Karana (Half Lunar Day)</span>
                    <h3 className="font-display font-bold text-lg text-cosmic-900">{data.karana?.name}</h3>
                    <p className="text-xs text-gold-700 font-medium mt-0.5">Sub-division of Tithi</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-ivory-100/70 border border-gold-500/20 sm:col-span-2 lg:col-span-2">
                    <span className="text-xs uppercase tracking-wider text-cosmic-500 font-semibold block mb-1">5. Vaara (Solar Weekday & Lord)</span>
                    <h3 className="font-display font-bold text-lg text-cosmic-900">{data.weekday}</h3>
                    <p className="text-xs text-gold-700 font-medium mt-0.5">Governing Deity: <strong>{data.day_lord}</strong></p>
                  </div>
                </div>
              </div>

              {/* Sun & Moon Horology */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Solar Timings */}
                <div className="bg-white rounded-3xl p-8 border border-gold-500/30 shadow-gold-card">
                  <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gold-500/20">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600">
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-cosmic-900">Surya Chakra (Solar)</h3>
                      <p className="text-xs text-cosmic-600">Solar transit & daylight span</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-ivory-100/70 border border-gold-500/20">
                      <span className="text-sm font-semibold text-cosmic-700">Surya Udaya (Sunrise):</span>
                      <span className="font-display font-bold text-gold-800 text-sm">
                        {new Date(data.sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-ivory-100/70 border border-gold-500/20">
                      <span className="text-sm font-semibold text-cosmic-700">Surya Asta (Sunset):</span>
                      <span className="font-display font-bold text-gold-800 text-sm">
                        {new Date(data.sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lunar Timings */}
                <div className="bg-white rounded-3xl p-8 border border-gold-500/30 shadow-gold-card">
                  <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gold-500/20">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600">
                      <Moon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-cosmic-900">Chandra Chakra (Lunar)</h3>
                      <p className="text-xs text-cosmic-600">Lunar rise & setting phase</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-ivory-100/70 border border-gold-500/20">
                      <span className="text-sm font-semibold text-cosmic-700">Chandra Udaya (Moonrise):</span>
                      <span className="font-display font-bold text-cosmic-900 text-sm">
                        {data.moonrise ? new Date(data.moonrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Night Phase'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-ivory-100/70 border border-gold-500/20">
                      <span className="text-sm font-semibold text-cosmic-700">Chandra Asta (Moonset):</span>
                      <span className="font-display font-bold text-cosmic-900 text-sm">
                        {data.moonset ? new Date(data.moonset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Dawn Phase'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Callout */}
              <div className="bg-cosmic-900 celestial-grid-bg text-white rounded-3xl p-8 sm:p-10 border border-gold-500/30 shadow-gold-card text-center">
                <h3 className="font-display text-2xl font-bold mb-2">Planning an Auspicious Muhurat?</h3>
                <p className="font-editorial text-lg text-ivory-200 italic mb-6 max-w-xl mx-auto">
                  Find the most auspicious Shubh Muhurat for weddings, Griha Pravesh, vehicle purchases, or business inauguration.
                </p>
                <a
                  href="/contact"
                  className="gold-btn px-8 py-3.5 rounded-full font-display font-semibold text-xs shadow-gold-glow inline-flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  <span>Request Custom Muhurat Calculation</span>
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}