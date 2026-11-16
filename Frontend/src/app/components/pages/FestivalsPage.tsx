import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchFestivals } from '../../../api/astrologyApi';
import { ChevronLeft, ChevronRight, Loader2, Sparkles, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const daysOfWeek = [
  { hi: "रवि", en: "SUN" }, { hi: "सोम", en: "MON" }, { hi: "मंगल", en: "TUE" },
  { hi: "बुध", en: "WED" }, { hi: "गुरु", en: "THU" }, { hi: "शुक्र", en: "FRI" }, { hi: "शनि", en: "SAT" }
];

export default function FestivalsPage() {
  const [calendars, setCalendars] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getCalendarData = async () => {
      try {
        const res = await fetchFestivals();
        if (res.success && res.data.length > 0) {
          setCalendars(res.data);
        } else {
          setError('No calendar data available.');
        }
      } catch (err: any) {
        console.error(err);
        setError('Failed to load the festival calendar.');
      } finally {
        setLoading(false);
      }
    };
    getCalendarData();
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < calendars.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const getEmptyCells = (firstDayOfWeek: string) => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const emptyCount = days.indexOf(firstDayOfWeek);
    return Array.from({ length: emptyCount === -1 ? 0 : emptyCount });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ivory-50">
        <Loader2 className="w-12 h-12 animate-spin text-gold-600 mb-4" />
        <p className="font-display font-medium text-cosmic-900">Consulting Vedic Tithis & Panchang...</p>
      </div>
    );
  }

  const currentMonthData = calendars[currentIndex] || {
    westernMonthName: 'NOVEMBER 2026',
    hinduMonthNames: 'कार्तिक / मार्गशीर्ष',
    days: []
  };

  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title>Hindu Festival Calendar & Vrat Tithis | Bhagyanetram</title>
        <meta name="description" content="View monthly Hindu festival dates, Ekadashi, Purnima, Amavasya, and major celebrations." />
        <link rel="canonical" href="https://bhagyanetram.com/festivals" />
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
              <span>Sanatana Vrat & Utsav Panchang</span>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/20 to-cosmic-800 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-6 text-gold-300">
              <CalendarIcon className="w-10 h-10" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Vedic <span className="gold-gradient-text">Festival Calendar</span>
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-2xl mx-auto italic leading-relaxed">
              Traditional Vikram Samvat festival dates, Ekadashi vrat observances, and auspicious celestial events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendar Area */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Month Navigation Controls */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-8">
          <button 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-white border border-gold-500/30 text-cosmic-900 disabled:opacity-30 hover:bg-cosmic-900 hover:text-gold-300 transition shadow-xs"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="text-center px-6 py-2 bg-white rounded-2xl border border-gold-500/30 shadow-gold-card">
            <span className="text-sm font-semibold uppercase tracking-widest text-gold-700 block font-display">Active Month</span>
            <span className="text-lg md:text-xl font-display font-bold text-cosmic-900 uppercase">
              {currentMonthData.westernMonthName}
            </span>
          </div>

          <button 
            onClick={handleNext} 
            disabled={currentIndex === calendars.length - 1}
            className="p-3 rounded-full bg-white border border-gold-500/30 text-cosmic-900 disabled:opacity-30 hover:bg-cosmic-900 hover:text-gold-300 transition shadow-xs"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Traditional Calendar View */}
        <div className="w-full overflow-x-auto pb-6">
          <div className="min-w-[768px] border-4 border-gold-500/40 bg-white rounded-3xl shadow-gold-card p-3 relative mx-auto">
            <div className="border-2 border-gold-500/20 rounded-2xl p-2 bg-ivory-50/50">
              
              {/* Header: Month Names */}
              <div className="bg-cosmic-900 celestial-grid-bg text-white py-4 rounded-xl text-center mb-3 border border-gold-500/30">
                <h2 className="text-lg md:text-2xl font-display font-bold tracking-wider flex justify-around items-center px-4">
                  <span className="w-1/3 text-left text-gold-300">{currentMonthData.hinduMonthNames?.split('/')[0] || ''}</span>
                  <span className="w-1/3 text-center text-white">{currentMonthData.westernMonthName}</span>
                  <span className="w-1/3 text-right text-gold-300">{currentMonthData.hinduMonthNames?.split('/')[1] || ''}</span>
                </h2>
              </div>

              {/* Grid System */}
              <div className="grid grid-cols-7 border-l border-t border-gold-500/20 rounded-xl overflow-hidden bg-white">
                
                {/* Days of Week Header */}
                {daysOfWeek.map((day, idx) => (
                  <div key={`header-${idx}`} className="border-r border-b border-gold-500/20 py-2.5 text-center bg-ivory-100 flex justify-center items-center gap-1">
                    <span className="text-gold-800 font-bold font-display text-sm md:text-base">{day.hi}</span>
                    <span className="text-cosmic-500 font-semibold text-xs hidden md:inline">({day.en})</span>
                  </div>
                ))}

                {/* Empty Cells */}
                {getEmptyCells(currentMonthData.days?.[0]?.dayOfWeek || "SUN").map((_, idx) => (
                  <div key={`empty-${idx}`} className="border-r border-b border-gold-500/20 min-h-[90px] md:min-h-[110px] bg-ivory-50/40"></div>
                ))}

                {/* Calendar Days */}
                {currentMonthData.days?.map((day: any) => (
                  <div key={day.date} className="border-r border-b border-gold-500/20 min-h-[90px] md:min-h-[110px] p-2 flex flex-col justify-between relative bg-white hover:bg-gold-500/5 transition-colors">
                    
                    <span className="text-cosmic-900 font-display font-bold text-base md:text-lg">{day.date}</span>
                    
                    {day.isMajorFestival || (day.festivalHindi && day.festivalHindi.length > 0) ? (
                      <div className="border border-gold-500/40 p-1.5 rounded-lg text-center bg-gold-500/10">
                        <div className="text-gold-900 font-bold text-xs leading-tight mb-0.5 truncate whitespace-normal">{day.festivalHindi}</div>
                        <div className="text-cosmic-600 font-semibold text-[10px] uppercase truncate whitespace-normal">{day.festivalEnglish}</div>
                      </div>
                    ) : (
                      <div className="text-center pb-1">
                        <div className="text-cosmic-700 font-medium text-[11px] leading-tight mb-0.5">{day.tithiHindi}</div>
                        <div className="text-cosmic-500 text-[10px] leading-tight">{day.tithiEnglish}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}