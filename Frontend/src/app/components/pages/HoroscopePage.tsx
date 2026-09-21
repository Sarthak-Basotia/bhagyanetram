import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Star, TrendingUp, Heart, Briefcase, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

const API_BASE_URL = "https://api.bhagyanetram.com"; // Adjust if testing locally

export function HoroscopePage() {
  const [selectedZodiac, setSelectedZodiac] = useState('aries');
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [loading, setLoading] = useState(false);

  const fallbackContent = {
    overview: "Today brings opportunities for growth and positive change. The planets align favorably to support your endeavors.",
    love: "Romance is in the air! Single individuals may meet someone special, while couples will experience deeper connection.",
    career: "Professional opportunities knock at your door. Stay alert and be ready to showcase your talents.",
    health: "Maintain a balanced diet and exercise routine. Your energy levels are high, use them wisely.",
    lucky: { number: 7, color: "Blue", time: "2-4 PM" }
  };

  const [content, setContent] = useState(fallbackContent);

  const zodiacSigns = [
    { id: 'aries', name: 'Aries', symbol: '♈', emoji: '🐏', dates: 'Mar 21 - Apr 19' },
    { id: 'taurus', name: 'Taurus', symbol: '♉', emoji: '🐂', dates: 'Apr 20 - May 20' },
    { id: 'gemini', name: 'Gemini', symbol: '♊', emoji: '👯', dates: 'May 21 - Jun 20' },
    { id: 'cancer', name: 'Cancer', symbol: '♋', emoji: '🦀', dates: 'Jun 21 - Jul 22' },
    { id: 'leo', name: 'Leo', symbol: '♌', emoji: '🦁', dates: 'Jul 23 - Aug 22' },
    { id: 'virgo', name: 'Virgo', symbol: '♍', emoji: '👸', dates: 'Aug 23 - Sep 22' },
    { id: 'libra', name: 'Libra', symbol: '♎', emoji: '⚖️', dates: 'Sep 23 - Oct 22' },
    { id: 'scorpio', name: 'Scorpio', symbol: '♏', emoji: '🦂', dates: 'Oct 23 - Nov 21' },
    { id: 'sagittarius', name: 'Sagittarius', symbol: '♐', emoji: '🏹', dates: 'Nov 22 - Dec 21' },
    { id: 'capricorn', name: 'Capricorn', symbol: '♑', emoji: '🐐', dates: 'Dec 22 - Jan 19' },
    { id: 'aquarius', name: 'Aquarius', symbol: '♒', emoji: '🏺', dates: 'Jan 20 - Feb 18' },
    { id: 'pisces', name: 'Pisces', symbol: '♓', emoji: '🐟', dates: 'Feb 19 - Mar 20' },
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 celestial-gradient" style={{ color: '#C46D29' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Star className="w-16 h-16 mx-auto mb-6 animate-float" />
            <h1 className="text-5xl mb-6">Daily Horoscope</h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#C46D29' }}>
              Unlock the secrets of the cosmos and discover what the stars have in store for you
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Zodiac Sign Selection */}
          <div className="mb-12">
            <h2 className="text-3xl text-center mb-8 text-primary">Select Your Zodiac Sign</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {zodiacSigns.map((sign) => (
                <motion.button
                  key={sign.id}
                  onClick={() => setSelectedZodiac(sign.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedZodiac === sign.id
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-primary/20 hover:border-primary/40'
                  }`}
                >
                  <div className="text-4xl mb-2">{sign.emoji}</div>
                  <p className="text-sm font-medium">{sign.name}</p>
                  <p className="text-xs text-muted-foreground">{sign.dates}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Period Selection */}
          <div className="mb-12">
            <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Horoscope Content Card */}
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8 border-primary/20 relative">
              {loading && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}
              <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="text-6xl mb-4">{selectedSign.emoji}</div>
                <CardTitle className="text-3xl text-primary">
                  {selectedSign.name} - {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Horoscope
                </CardTitle>
                <p className="text-muted-foreground">{selectedSign.dates}</p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Overview */}
                  <div>
                    <h3 className="text-xl mb-3 text-primary flex items-center gap-2 font-semibold">
                      <Star className="w-5 h-5" />
                      Overview
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{content.overview}</p>
                  </div>

                  {/* Love */}
                  <div>
                    <h3 className="text-xl mb-3 text-primary flex items-center gap-2 font-semibold">
                      <Heart className="w-5 h-5" />
                      Love & Relationships
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{content.love}</p>
                  </div>

                  {/* Career */}
                  <div>
                    <h3 className="text-xl mb-3 text-primary flex items-center gap-2 font-semibold">
                      <Briefcase className="w-5 h-5" />
                      Career & Finance
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{content.career}</p>
                  </div>

                  {/* Health */}
                  <div>
                    <h3 className="text-xl mb-3 text-primary flex items-center gap-2 font-semibold">
                      <TrendingUp className="w-5 h-5" />
                      Health & Wellness
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{content.health}</p>
                  </div>

                  {/* Lucky Elements */}
                  <div className="bg-gradient-to-r from-[#d4af37]/10 to-secondary/10 p-6 rounded-lg">
                    <h3 className="text-xl mb-4 text-primary font-semibold">Lucky Elements</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Number</p>
                        <p className="text-2xl font-bold text-primary">{content.lucky.number}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Color</p>
                        <p className="text-2xl font-bold text-primary">{content.lucky.color}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Time</p>
                        <p className="text-2xl font-bold text-primary">{content.lucky.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}