import { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Star, TrendingUp, Heart, Briefcase, Loader2, Sparkles, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';

const API_BASE_URL = "https://api.bhagyanetram.com";

const getPeriodDateString = (period: string) => {
  const now = new Date();
  switch (period) {
    case 'daily':
      return format(now, 'MMMM d, yyyy');
    case 'weekly': {
      const start = startOfWeek(now, { weekStartsOn: 1 });
      const end = endOfWeek(now, { weekStartsOn: 1 });
      if (start.getMonth() === end.getMonth()) {
         return `${format(start, 'MMM d')} - ${format(end, 'd, yyyy')}`;
      }
      return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
    }
    case 'monthly':
      return format(now, 'MMMM yyyy');
    case 'yearly':
      return format(now, 'yyyy');
    default:
      return '';
  }
};

export function HoroscopePage() {
  const [selectedZodiac, setSelectedZodiac] = useState('aries');
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [loading, setLoading] = useState(false);

  const fallbackContent = {
    overview: "Today brings opportunities for growth and positive change. The planetary transits align favorably to support your personal endeavors and clear longstanding subconscious blockages.",
    love: "Venus casts an auspicious glance. Single individuals may meet someone with deep soul alignment, while committed partners experience heightened mutual trust.",
    career: "Professional clarity manifests. Sun and Mercury bless your communicative presence—step forward to present initiatives and lead key discussions.",
    health: "Maintain balanced hydration, light sattvic nourishment, and morning pranayama. Vital energy flows steadily; avoid unnecessary mental fatigue.",
    lucky: { number: 7, color: "Golden Yellow", time: "2:00 PM - 4:00 PM" }
  };

  const [content, setContent] = useState(fallbackContent);

  const zodiacSigns = [
    { id: 'aries', name: 'Aries', sanskrit: 'Mesha', symbol: '♈', emoji: '🐏', dates: 'Mar 21 - Apr 19' },
    { id: 'taurus', name: 'Taurus', sanskrit: 'Vrishabha', symbol: '♉', emoji: '🐂', dates: 'Apr 20 - May 20' },
    { id: 'gemini', name: 'Gemini', sanskrit: 'Mithuna', symbol: '♊', emoji: '👯', dates: 'May 21 - Jun 20' },
    { id: 'cancer', name: 'Cancer', sanskrit: 'Karka', symbol: '♋', emoji: '🦀', dates: 'Jun 21 - Jul 22' },
    { id: 'leo', name: 'Leo', sanskrit: 'Simha', symbol: '♌', emoji: '🦁', dates: 'Jul 23 - Aug 22' },
    { id: 'virgo', name: 'Virgo', sanskrit: 'Kanya', symbol: '♍', emoji: '👸', dates: 'Aug 23 - Sep 22' },
    { id: 'libra', name: 'Libra', sanskrit: 'Tula', symbol: '♎', emoji: '⚖️', dates: 'Sep 23 - Oct 22' },
    { id: 'scorpio', name: 'Scorpio', sanskrit: 'Vrishchika', symbol: '♏', emoji: '🦂', dates: 'Oct 23 - Nov 21' },
    { id: 'sagittarius', name: 'Sagittarius', sanskrit: 'Dhanu', symbol: '♐', emoji: '🏹', dates: 'Nov 22 - Dec 21' },
    { id: 'capricorn', name: 'Capricorn', sanskrit: 'Makara', symbol: '♑', emoji: '🐐', dates: 'Dec 22 - Jan 19' },
    { id: 'aquarius', name: 'Aquarius', sanskrit: 'Kumbha', symbol: '♒', emoji: '🏺', dates: 'Jan 20 - Feb 18' },
    { id: 'pisces', name: 'Pisces', sanskrit: 'Meena', symbol: '♓', emoji: '🐟', dates: 'Feb 19 - Mar 20' },
  ];

  useEffect(() => {
    let isMounted = true;

    async function fetchHoroscopeData() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/horoscope?sign=${selectedZodiac}&timeframe=${selectedPeriod}`);
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        if (isMounted) setContent(data);
      } catch (err) {
        console.warn("Using fallback horoscope data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchHoroscopeData();

    return () => {
      isMounted = false;
    };
  }, [selectedZodiac, selectedPeriod]);

  const selectedSign = zodiacSigns.find(sign => sign.id === selectedZodiac) || zodiacSigns[0];

  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title>Daily & Periodic Vedic Horoscope | Bhagyanetram</title>
        <meta name="description" content="Discover today's accurate Vedic rashifal and planetary horoscopes for all 12 rashis." />
        <link rel="canonical" href="https://bhagyanetram.com/horoscope" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-cosmic-900 celestial-grid-bg text-white overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-10 w-80 h-80 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-xs font-medium uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Vedic Rashi Bhavishya</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Planetary <span className="gold-gradient-text">Horoscope Guidance</span>
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-3xl mx-auto italic leading-relaxed">
              Understand the movements of the Nava Grahas and align your daily actions with cosmic timing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Zodiac Sign Selector */}
          <div className="mb-14">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-700 mb-2 font-display">Choose Your Moon Sign / Rashi</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-cosmic-900">Select Your Zodiac Sign</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {zodiacSigns.map((sign) => {
                const isSelected = selectedZodiac === sign.id;
                return (
                  <motion.button
                    key={sign.id}
                    onClick={() => setSelectedZodiac(sign.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`p-4 rounded-2xl border transition-all text-center relative ${
                      isSelected
                        ? 'bg-cosmic-900 text-white border-gold-500 shadow-gold-glow ring-2 ring-gold-500/50'
                        : 'bg-white hover:bg-ivory-100 text-cosmic-900 border-gold-500/30 shadow-xs'
                    }`}
                  >
                    <div className="text-3xl sm:text-4xl mb-2">{sign.emoji}</div>
                    <p className={`font-display font-bold text-sm ${isSelected ? 'text-gold-300' : 'text-cosmic-900'}`}>{sign.name}</p>
                    <p className={`text-xs ${isSelected ? 'text-gold-400/80 font-medium' : 'text-gold-700 font-semibold'}`}>{sign.sanskrit}</p>
                    <p className={`text-[10px] mt-1 ${isSelected ? 'text-ivory-300' : 'text-cosmic-500'}`}>{sign.dates}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Timeframe Selection */}
          <div className="mb-12 max-w-xl mx-auto">
            <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
              <TabsList className="grid w-full grid-cols-4 p-1.5 bg-ivory-200/80 rounded-2xl border border-gold-500/30">
                <TabsTrigger 
                  value="daily" 
                  className="rounded-xl font-display text-xs sm:text-sm font-semibold data-[state=active]:bg-cosmic-900 data-[state=active]:text-gold-300 data-[state=active]:shadow-sm"
                >
                  Daily
                </TabsTrigger>
                <TabsTrigger 
                  value="weekly" 
                  className="rounded-xl font-display text-xs sm:text-sm font-semibold data-[state=active]:bg-cosmic-900 data-[state=active]:text-gold-300 data-[state=active]:shadow-sm"
                >
                  Weekly
                </TabsTrigger>
                <TabsTrigger 
                  value="monthly" 
                  className="rounded-xl font-display text-xs sm:text-sm font-semibold data-[state=active]:bg-cosmic-900 data-[state=active]:text-gold-300 data-[state=active]:shadow-sm"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger 
                  value="yearly" 
                  className="rounded-xl font-display text-xs sm:text-sm font-semibold data-[state=active]:bg-cosmic-900 data-[state=active]:text-gold-300 data-[state=active]:shadow-sm"
                >
                  Yearly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Horoscope Content Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-gold-500/40 shadow-gold-card relative overflow-hidden">
              {loading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-xs z-20 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-4 border-gold-300 border-t-gold-600 animate-spin mb-3"></div>
                  <p className="font-display font-medium text-cosmic-900 text-sm">Consulting Ephemeris & Transits...</p>
                </div>
              )}

              {/* Header */}
              <div className="p-8 sm:p-10 bg-cosmic-900 celestial-grid-bg text-white text-center relative border-b border-gold-500/30">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/20 to-cosmic-800 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-4 text-4xl">
                  {selectedSign.emoji}
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  {selectedSign.sanskrit} Rashi
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold">
                  {selectedSign.name} — <span className="gold-gradient-text">{selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Forecast</span>
                </h3>
                <p className="font-editorial text-lg text-ivory-200 italic mt-1">
                  {getPeriodDateString(selectedPeriod)}
                </p>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-10 space-y-8">
                {/* Overview */}
                <div className="p-6 rounded-2xl bg-ivory-100/70 border border-gold-500/20">
                  <h4 className="font-display text-lg font-bold text-cosmic-900 flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-gold-600" />
                    <span>Cosmic Overview</span>
                  </h4>
                  <p className="text-cosmic-800 leading-relaxed text-sm sm:text-base">{content.overview}</p>
                </div>

                {/* 3 Grid Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Love */}
                  <div className="p-5 rounded-2xl bg-white border border-rose-500/30 shadow-xs">
                    <div className="flex items-center gap-2 text-rose-700 font-display font-bold text-base mb-2">
                      <Heart className="w-5 h-5 text-rose-500" />
                      <span>Love & Kinship</span>
                    </div>
                    <p className="text-cosmic-700 text-sm leading-relaxed">{content.love}</p>
                  </div>

                  {/* Career */}
                  <div className="p-5 rounded-2xl bg-white border border-emerald-500/30 shadow-xs">
                    <div className="flex items-center gap-2 text-emerald-700 font-display font-bold text-base mb-2">
                      <Briefcase className="w-5 h-5 text-emerald-500" />
                      <span>Career & Artha</span>
                    </div>
                    <p className="text-cosmic-700 text-sm leading-relaxed">{content.career}</p>
                  </div>

                  {/* Health */}
                  <div className="p-5 rounded-2xl bg-white border border-blue-500/30 shadow-xs">
                    <div className="flex items-center gap-2 text-blue-700 font-display font-bold text-base mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                      <span>Prana & Vitality</span>
                    </div>
                    <p className="text-cosmic-700 text-sm leading-relaxed">{content.health}</p>
                  </div>
                </div>

                {/* Lucky Elements */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gold-500/10 via-ivory-100 to-gold-500/5 border border-gold-500/30">
                  <h4 className="font-display text-base font-bold text-gold-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-600" /> Auspicious Vibrations & Muhurat
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-white/80 p-4 rounded-xl border border-gold-500/20 shadow-xs">
                      <p className="text-xs uppercase tracking-wider text-cosmic-500 font-medium mb-1">Lucky Number</p>
                      <p className="font-display text-2xl font-bold text-cosmic-900">{content.lucky.number}</p>
                    </div>
                    <div className="bg-white/80 p-4 rounded-xl border border-gold-500/20 shadow-xs">
                      <p className="text-xs uppercase tracking-wider text-cosmic-500 font-medium mb-1">Auspicious Color</p>
                      <p className="font-display text-xl font-bold text-cosmic-900">{content.lucky.color}</p>
                    </div>
                    <div className="bg-white/80 p-4 rounded-xl border border-gold-500/20 shadow-xs">
                      <p className="text-xs uppercase tracking-wider text-cosmic-500 font-medium mb-1">Auspicious Time</p>
                      <p className="font-display text-lg font-bold text-gold-700">{content.lucky.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}