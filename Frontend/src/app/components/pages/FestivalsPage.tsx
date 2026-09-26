import React, { useState, useEffect } from 'react';
import { fetchFestivals } from '../../../api/astrologyApi';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFDF2]">
        <Loader2 className="w-12 h-12 animate-spin text-[#D35400] mb-4" />
        <p className="text-slate-600 font-medium">Consulting the Panchang...</p>
      </div>
    );
  }

  if (error || calendars.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF2]">
        <p className="text-red-500 font-bold">{error || 'Calendar initializing, please try again later.'}</p>
      </div>
    );
  }

  const currentMonthData = calendars[currentIndex];

  return (
    <div className="min-h-screen bg-[#FFFDF2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-[#D35400] mb-2">Hindu Festival Calendar</h1>
          <p className="text-slate-600 mb-8">Panchang timings and major auspicious days</p>
          
          {/* Month Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <button 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
              className="p-2 rounded-full bg-slate-200 text-slate-700 disabled:opacity-30 hover:bg-[#D35400] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-xl font-bold text-slate-800 w-48 text-center">
              {currentMonthData.westernMonthName}
            </span>
            <button 
              onClick={handleNext} 
              disabled={currentIndex === calendars.length - 1}
              className="p-2 rounded-full bg-slate-200 text-slate-700 disabled:opacity-30 hover:bg-[#D35400] hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* The Calendar Container */}
        <div className="border-[12px] border-[#0A0A9C] bg-white rounded-md shadow-2xl p-1 relative">
          <div className="border-[6px] border-[#F4C542] p-1">
            <div className="border-[4px] border-[#E83C3C] p-2">
              
              {/* Header: Month Names */}
              <div className="bg-[#F9ED34] py-3 text-center mb-1">
                <h2 className="text-[#D31F1F] text-2xl md:text-5xl font-black tracking-wider flex justify-around items-center">
                  <span className="w-1/3 text-left pl-4">{currentMonthData.hinduMonthNames.split('/')[0] || ''}</span>
                  <span className="font-sans w-1/3">{currentMonthData.westernMonthName}</span>
                  <span className="w-1/3 text-right pr-4">{currentMonthData.hinduMonthNames.split('/')[1] || ''}</span>
                </h2>
              </div>

              {/* Grid System */}
              <div className="grid grid-cols-7 border-l-2 border-t-2 border-[#0A0A9C]">
                
                {/* Days of Week Header */}
                {daysOfWeek.map((day, idx) => (
                  <div key={`header-${idx}`} className="border-r-2 border-b-2 border-[#0A0A9C] py-2 text-center bg-white flex justify-center items-center gap-1">
                    <span className="text-[#D31F1F] font-bold text-base md:text-xl">{day.hi}</span>
                    <span className="text-[#D31F1F] font-bold text-base md:text-xl hidden md:inline">{day.en}</span>
                  </div>
                ))}

                {/* Empty Cells for alignment */}
                {getEmptyCells(currentMonthData.days[0].dayOfWeek).map((_, idx) => (
                  <div key={`empty-${idx}`} className="border-r-2 border-b-2 border-[#0A0A9C] min-h-[120px] bg-slate-50/50"></div>
                ))}

                {/* Actual Calendar Days */}
                {currentMonthData.days.map((day: any) => (
                  <div key={day.date} className="border-r-2 border-b-2 border-[#0A0A9C] min-h-[120px] p-2 flex flex-col relative bg-white hover:bg-slate-50 transition-colors">
                    
                    <span className="text-[#D31F1F] font-black text-xl mb-1">{day.date}</span>
                    
                    {day.isMajorFestival || (day.festivalHindi && day.festivalHindi.length > 0) ? (
                      <div className="border-2 border-[#D31F1F] p-1 mt-auto mb-1 text-center bg-white">
                        <div className="text-[#8B008B] font-bold text-xs md:text-sm leading-tight mb-1">{day.festivalHindi}</div>
                        <div className="text-[#D31F1F] font-bold text-[10px] md:text-xs leading-tight uppercase">{day.festivalEnglish}</div>
                      </div>
                    ) : (
                      <div className="text-center mt-auto mb-2">
                        <div className="text-[#8B008B] font-semibold text-xs md:text-sm leading-tight mb-1">{day.tithiHindi}</div>
                        <div className="text-[#8B008B] text-[10px] md:text-xs leading-tight">{day.tithiEnglish}</div>
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