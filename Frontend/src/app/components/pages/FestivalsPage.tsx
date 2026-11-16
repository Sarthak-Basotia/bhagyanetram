import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchFestivals } from '../../../api/astrologyApi';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Calendar as CalendarIcon, 
  CalendarDays,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  ALL_FESTIVALS_2026, 
  MonthCalendar, 
  FestivalDay 
} from '../../../data/festivalsData';

const daysOfWeek = [
  { hi: "रवि", en: "SUN", shortEn: "Su" },
  { hi: "सोम", en: "MON", shortEn: "Mo" },
  { hi: "मंगल", en: "TUE", shortEn: "Tu" },
  { hi: "बुध", en: "WED", shortEn: "We" },
  { hi: "गुरु", en: "THU", shortEn: "Th" },
  { hi: "शुक्र", en: "FRI", shortEn: "Fr" },
  { hi: "शनि", en: "SAT", shortEn: "Sa" }
];

export default function FestivalsPage() {
  // 100% authentic, verified Drik Panchang 2026 calendar (immutable source of truth)
  const calendars = ALL_FESTIVALS_2026;
  
  // Set default month: November (10) as shown in reference or current 2026 month
  const [currentIndex, setCurrentIndex] = useState(() => {
    const today = new Date();
    return today.getFullYear() === 2026 ? today.getMonth() : 10;
  });

  const [selectedDay, setSelectedDay] = useState<FestivalDay | null>(null);

  // Update selected day whenever current month index changes
  useEffect(() => {
    const currentMonth = calendars[currentIndex];
    if (currentMonth && currentMonth.days && currentMonth.days.length > 0) {
      // Prioritize the first major festival of the month, or the first day
      const firstMajor = currentMonth.days.find(d => d.isMajorFestival || (d.festivalHindi && d.festivalHindi.length > 0));
      setSelectedDay(firstMajor || currentMonth.days[0]);
    }
  }, [currentIndex, calendars]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : calendars.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < calendars.length - 1 ? prev + 1 : 0));
  };

  const getEmptyCells = (firstDayOfWeek: string) => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const emptyCount = days.indexOf(firstDayOfWeek);
    return Array.from({ length: emptyCount === -1 ? 0 : emptyCount });
  };

  const currentMonthData = calendars[currentIndex] || ALL_FESTIVALS_2026[currentIndex] || ALL_FESTIVALS_2026[0];

  const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title>Hindu Festival Calendar & Vrat Tithis 2026 | Bhagyanetram</title>
        <meta name="description" content="View monthly Hindu festival dates, Ekadashi, Purnima, Amavasya, and major celebrations." />
        <link rel="canonical" href="https://bhagyanetram.com/festivals" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-cosmic-900 celestial-grid-bg text-white text-center overflow-hidden">
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
              <span>Sanatana Vrat & Utsav Panchang 2026</span>
            </div>

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gold-500/20 to-cosmic-800 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-6 text-gold-300">
              <CalendarIcon className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-6">
              Vedic <span className="gold-gradient-text">Festival Calendar</span>
            </h1>
            <p className="font-editorial text-lg sm:text-2xl text-ivory-200/90 max-w-2xl mx-auto italic leading-relaxed px-2">
              Traditional Vikram Samvat festival dates, Ekadashi vrat observances, and auspicious celestial events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-8 sm:py-14 px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* 12-Month Quick Selector Pills */}
        <div className="mb-6">
          <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto py-2 px-1 scrollbar-none">
            {monthShortNames.map((name, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={name}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                    isActive 
                      ? 'bg-cosmic-900 text-gold-400 border-gold-500 shadow-gold-glow scale-105 font-bold' 
                      : 'bg-white text-cosmic-800 border-gold-500/20 hover:bg-gold-50 hover:border-gold-500/40'
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Month Navigation Controls */}
        <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-6 mb-6 px-1">
          <button 
            onClick={handlePrev} 
            title="Previous Month"
            aria-label="Previous Month"
            className="p-2.5 sm:p-3 rounded-full bg-white border border-gold-500/40 text-cosmic-900 hover:bg-cosmic-900 hover:text-gold-300 transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center shrink-0"
          >
            <ChevronLeft className="w-5 h-5 text-gold-700" />
          </button>
          
          <div className="text-center px-4 sm:px-8 py-2 bg-white rounded-2xl border border-gold-500/40 shadow-gold-card flex-1 sm:flex-initial min-w-[200px] sm:min-w-[280px]">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold-700 block font-display">
              Active Month
            </span>
            <span className="text-base sm:text-xl font-display font-bold text-cosmic-900 uppercase block tracking-wide">
              {currentMonthData.westernMonthName}
            </span>
            <span className="text-[11px] sm:text-xs text-gold-800 font-medium block mt-0.5">
              {currentMonthData.hinduMonthNames}
            </span>
          </div>

          <button 
            onClick={handleNext} 
            title="Next Month"
            aria-label="Next Month"
            className="p-2.5 sm:p-3 rounded-full bg-white border border-gold-500/40 text-cosmic-900 hover:bg-cosmic-900 hover:text-gold-300 transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center shrink-0"
          >
            <ChevronRight className="w-5 h-5 text-gold-700" />
          </button>
        </div>

        {/* 100% Screen-Fit Traditional Calendar View (No Horizontal Slider on Mobile) */}
        <div className="w-full max-w-full pb-6">
          <div className="w-full max-w-full border-2 sm:border-4 border-gold-500/40 bg-white rounded-2xl sm:rounded-3xl shadow-gold-card p-1 sm:p-3 relative mx-auto overflow-hidden">
            <div className="border border-gold-500/20 sm:border-2 rounded-xl sm:rounded-2xl p-1 sm:p-2 bg-ivory-50/50">
              
              {/* Header: Month & Masa Info */}
              <div className="bg-cosmic-900 celestial-grid-bg text-white py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl text-center mb-2 sm:mb-3 border border-gold-500/30 px-2 sm:px-4">
                <div className="flex flex-row justify-between items-center text-center">
                  <span className="text-[11px] sm:text-sm md:text-base font-display text-gold-300 font-semibold text-left truncate">
                    {currentMonthData.hinduMonthNames?.split('/')[0]?.trim()}
                  </span>
                  <h2 className="text-xs sm:text-lg md:text-2xl font-display font-bold tracking-wider text-white uppercase text-center px-1">
                    {currentMonthData.westernMonthName}
                  </h2>
                  <span className="text-[11px] sm:text-sm md:text-base font-display text-gold-300 font-semibold text-right truncate">
                    {currentMonthData.hinduMonthNames?.split('/')[1]?.trim()}
                  </span>
                </div>
              </div>

              {/* 7-Column Grid strictly fitting mobile width */}
              <div className="grid grid-cols-7 border-l border-t border-gold-500/20 rounded-lg sm:rounded-xl overflow-hidden bg-white">
                
                {/* Days of Week Header */}
                {daysOfWeek.map((day, idx) => (
                  <div 
                    key={`header-${idx}`} 
                    className="border-r border-b border-gold-500/20 py-1 sm:py-2.5 text-center bg-ivory-100 flex flex-col sm:flex-row justify-center items-center gap-0 sm:gap-1"
                  >
                    <span className="text-gold-900 font-bold font-display text-[10px] sm:text-xs md:text-base">
                      {day.hi}
                    </span>
                    <span className="text-cosmic-500 font-semibold text-[8px] sm:text-[10px] md:text-xs">
                      ({day.shortEn})
                    </span>
                  </div>
                ))}

                {/* Empty Leading Cells */}
                {getEmptyCells(currentMonthData.days?.[0]?.dayOfWeek || "SUN").map((_, idx) => (
                  <div 
                    key={`empty-${idx}`} 
                    className="border-r border-b border-gold-500/20 min-h-[50px] sm:min-h-[85px] md:min-h-[105px] bg-ivory-50/40"
                  />
                ))}

                {/* Calendar Days */}
                {currentMonthData.days?.map((day: FestivalDay) => {
                  const isSelected = selectedDay?.date === day.date;
                  const hasFestival = day.isMajorFestival || (day.festivalHindi && day.festivalHindi.length > 0);

                  return (
                    <div 
                      key={day.date}
                      onClick={() => setSelectedDay(day)}
                      className={`border-r border-b border-gold-500/20 min-h-[50px] sm:min-h-[85px] md:min-h-[105px] p-0.5 sm:p-1.5 flex flex-col justify-between relative transition-all duration-150 cursor-pointer select-none ${
                        isSelected 
                          ? 'bg-gold-500/20 ring-2 ring-gold-600 z-10' 
                          : hasFestival
                          ? 'bg-amber-50/40 hover:bg-gold-500/10'
                          : 'bg-white hover:bg-gold-500/5'
                      }`}
                    >
                      {/* Top Header of Cell: Date + Indicators */}
                      <div className="flex items-center justify-between px-0.5">
                        <span className={`font-display font-bold text-xs sm:text-base leading-tight ${
                          isSelected ? 'text-gold-900 font-black' : hasFestival ? 'text-amber-950' : 'text-cosmic-900'
                        }`}>
                          {day.date}
                        </span>

                        <div className="flex items-center gap-0.5">
                          {day.isFullMoon && (
                            <span title="Purnima" className="text-[8px] sm:text-xs leading-none">🌕</span>
                          )}
                          {day.isNewMoon && (
                            <span title="Amavasya" className="text-[8px] sm:text-xs leading-none">🌑</span>
                          )}
                          {day.isMajorFestival && (
                            <span title="Major Festival" className="text-gold-600 text-[8px] sm:text-xs leading-none">⭐</span>
                          )}
                        </div>
                      </div>

                      {/* Mobile View: Compact festival / tithi badge (Fits 100% phone screen) */}
                      <div className="sm:hidden flex flex-col justify-end w-full overflow-hidden mt-0.5">
                        {hasFestival ? (
                          <div className={`w-full rounded px-0.5 py-0.5 text-center border ${
                            day.isMajorFestival 
                              ? 'bg-gold-500/25 border-gold-500/50 text-gold-950 font-bold' 
                              : 'bg-gold-500/10 border-gold-500/20 text-gold-900 font-semibold'
                          }`}>
                            <span className="block text-[7px] leading-tight truncate">
                              {day.festivalHindi}
                            </span>
                          </div>
                        ) : (
                          <div className="text-center w-full px-0.5">
                            <span className="block text-[6.5px] leading-tight text-cosmic-600 truncate">
                              {day.tithiHindi}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Desktop View: Full rich cell display */}
                      <div className="hidden sm:block w-full mt-1">
                        {hasFestival ? (
                          <div className={`border p-1 md:p-1.5 rounded-lg text-center ${
                            day.isMajorFestival 
                              ? 'border-gold-500/60 bg-gradient-to-br from-gold-500/20 to-amber-500/10 shadow-xs' 
                              : 'border-gold-500/30 bg-gold-500/10'
                          }`}>
                            <div className="text-gold-950 font-bold text-[10px] md:text-xs leading-tight truncate">
                              {day.festivalHindi}
                            </div>
                            <div className="text-cosmic-600 font-semibold text-[8px] md:text-[9.5px] uppercase truncate">
                              {day.festivalEnglish}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center pb-0.5">
                            <div className="text-cosmic-800 font-medium text-[9px] md:text-[11px] leading-tight truncate">
                              {day.tithiHindi}
                            </div>
                            <div className="text-cosmic-500 text-[8px] md:text-[10px] leading-tight truncate">
                              {day.tithiEnglish}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Day Full Details Inspector Card (Especially useful on Mobile) */}
        {selectedDay && (
          <motion.div
            key={`selected-${selectedDay.date}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-6 bg-white rounded-2xl border-2 border-gold-500/40 shadow-gold-card mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gold-500/20 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-amber-600 text-cosmic-950 flex flex-col items-center justify-center font-display shadow-md shrink-0">
                  <span className="text-[10px] uppercase font-bold leading-none">{selectedDay.dayOfWeek}</span>
                  <span className="text-xl font-bold leading-none mt-0.5">{selectedDay.date}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-gold-700 font-bold block">
                    {currentMonthData.westernMonthName} • {currentMonthData.hinduMonthNames}
                  </span>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-cosmic-950">
                    {selectedDay.date} {currentMonthData.westernMonthName} ({selectedDay.dayOfWeek})
                  </h3>
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-2">
                {selectedDay.isMajorFestival && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold-500/20 text-gold-950 border border-gold-500/40 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                    Major Vedic Utsav
                  </span>
                )}
                {selectedDay.isFullMoon && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-900 border border-indigo-200 text-xs font-semibold">
                    🌕 Purnima (पूर्णिमा)
                  </span>
                )}
                {selectedDay.isNewMoon && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 border border-stone-300 text-xs font-semibold">
                    🌑 Amavasya (अमावस्या)
                  </span>
                )}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Festival info if present */}
              {selectedDay.festivalHindi ? (
                <div className="p-4 rounded-xl bg-gradient-to-r from-gold-500/15 to-amber-500/5 border border-gold-500/30">
                  <div className="flex items-center gap-1.5 text-xs text-gold-800 font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                    <span>Utsav & Vrat Observance (पर्व एवं व्रत)</span>
                  </div>
                  <div className="text-xl font-display font-bold text-cosmic-950 mb-0.5">
                    {selectedDay.festivalHindi}
                  </div>
                  <div className="text-sm text-cosmic-700 font-medium">
                    {selectedDay.festivalEnglish}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-ivory-100/80 border border-gold-500/20">
                  <div className="flex items-center gap-1.5 text-xs text-cosmic-600 font-semibold uppercase tracking-wider mb-1">
                    <Info className="w-3.5 h-3.5 text-gold-600" />
                    <span>Nitya Puja Observance</span>
                  </div>
                  <div className="text-base font-display font-medium text-cosmic-900">
                    Auspicious Vedic Calendar Day
                  </div>
                  <div className="text-xs text-cosmic-500 mt-0.5">
                    Optimal for daily prayers, meditation, and chanting.
                  </div>
                </div>
              )}

              {/* Tithi info */}
              <div className="p-4 rounded-xl bg-ivory-100/80 border border-gold-500/20">
                <span className="text-xs text-gold-800 font-semibold block uppercase tracking-wider mb-1">
                  Panchang Tithi (वैदिक तिथि)
                </span>
                <div className="text-xl font-display font-bold text-cosmic-950 mb-0.5">
                  {selectedDay.tithiHindi}
                </div>
                <div className="text-sm text-cosmic-700 font-medium">
                  {selectedDay.tithiEnglish} • {currentMonthData.hinduMonthNames}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Monthly Festivals & Vrat Quick Reference List */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="w-5 h-5 text-gold-600" />
            <h3 className="text-xl sm:text-2xl font-display font-bold text-cosmic-950">
              Key Festivals in {currentMonthData.westernMonthName}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentMonthData.days
              ?.filter((d: FestivalDay) => d.festivalHindi && d.festivalHindi.length > 0)
              .map((fest: FestivalDay) => {
                const isSelected = selectedDay?.date === fest.date;
                return (
                  <div
                    key={`month-fest-${fest.date}`}
                    onClick={() => setSelectedDay(fest)}
                    className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isSelected 
                        ? 'bg-gold-500/15 border-gold-500 shadow-xs' 
                        : 'bg-white border-gold-500/20 hover:border-gold-500/50 hover:bg-gold-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center font-bold text-xs shrink-0 ${
                        fest.isMajorFestival 
                          ? 'bg-gold-500 text-cosmic-950 shadow-xs' 
                          : 'bg-cosmic-900 text-gold-400'
                      }`}>
                        <span className="text-[9px] uppercase leading-none">{fest.dayOfWeek}</span>
                        <span className="text-sm leading-none mt-0.5">{fest.date}</span>
                      </div>
                      <div>
                        <div className="font-display font-bold text-sm text-cosmic-950 leading-tight">
                          {fest.festivalHindi}
                        </div>
                        <div className="text-xs text-cosmic-600 mt-0.5">
                          {fest.festivalEnglish}
                        </div>
                      </div>
                    </div>
                    {fest.isMajorFestival && (
                      <span className="text-[10px] bg-gold-500/20 text-gold-950 border border-gold-500/40 px-2 py-0.5 rounded-full font-bold shrink-0">
                        Major
                      </span>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

      </div>
    </div>
  );
}
