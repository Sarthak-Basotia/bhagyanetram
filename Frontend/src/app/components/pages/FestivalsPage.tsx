import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FestivalsPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // Starts at Sept 2026
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMonthData = async (year: number, month: number) => {
    setLoading(true);
    try {
      // Adjust URL to your actual backend endpoint
      const res = await fetch(`/api/astrology/festivals?year=${year}&month=${month}`);
      const json = await res.json();
      if (json.success) setCalendarData(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthData(currentDate.getFullYear(), currentDate.getMonth() + 1);
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Generate blank cells for days before the 1st of the month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const blanks = Array(firstDayOfMonth).fill(null);
  
  const daysOfWeek = [
    { hi: 'रवि', en: 'SUN' }, { hi: 'सोम', en: 'MON' }, { hi: 'मंगल', en: 'TUE' }, 
    { hi: 'बुध', en: 'WED' }, { hi: 'गुरु', en: 'THU' }, { hi: 'शुक्र', en: 'FRI' }, { hi: 'शनि', en: 'SAT' }
  ];

  const monthNamesEn = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  const monthNamesHi = ["माघ", "फाल्गुन", "चैत्र", "वैशाख", "ज्येष्ठ", "आषाढ़", "श्रावण", "भाद्रपद", "आश्विन", "कार्तिक", "मार्गशीर्ष", "पौष"];

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#D35400] mb-2">Hindu Festival Calendar</h1>
          <p className="text-slate-600">Auspicious timings and major festivals</p>
        </div>

        {/* Traditional Calendar Wrapper */}
        <div className="bg-[#1A1A8C] p-4 rounded-xl shadow-2xl">
          <div className="bg-white border-[6px] border-[#E8C547] rounded p-1">
            
            {/* Header Section (Yellow & Red) */}
            <div className="bg-[#FFF000] border-b-2 border-[#1A1A8C] py-3 px-4 flex justify-between items-center text-[#D31027]">
              <button onClick={handlePrevMonth} className="px-4 py-1 bg-white/50 rounded hover:bg-white font-bold text-xl">{'<'}</button>
              <div className="text-center flex gap-6 items-center">
                <span className="text-2xl font-bold">{monthNamesHi[currentDate.getMonth()]}</span>
                <span className="text-3xl font-black">{monthNamesEn[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
              </div>
              <button onClick={handleNextMonth} className="px-4 py-1 bg-white/50 rounded hover:bg-white font-bold text-xl">{'>'}</button>
            </div>

            {/* Days of Week Row */}
            <div className="grid grid-cols-7 border-b-2 border-[#1A1A8C]">
              {daysOfWeek.map((day, i) => (
                <div key={i} className={`py-2 text-center border-r border-[#1A1A8C] last:border-r-0 ${i === 0 ? 'text-[#D31027]' : 'text-[#D31027]'}`}>
                  <div className="font-bold text-lg">{day.hi} {day.en}</div>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 bg-white">
              {blanks.map((_, i) => (
                <div key={`blank-${i}`} className="min-h-[120px] border-b border-r border-[#1A1A8C]/30 bg-slate-50"></div>
              ))}
              
              {loading ? (
                <div className="col-span-7 py-20 text-center font-bold text-[#1A1A8C]">Loading Panchang Data...</div>
              ) : (
                calendarData.map((dayData: any, i) => (
                  <div key={i} className="min-h-[120px] border-b border-r border-[#1A1A8C]/30 p-2 relative flex flex-col justify-between hover:bg-amber-50 transition-colors">
                    
                    {/* Date Number */}
                    <span className={`text-xl font-bold ${new Date(dayData.year, dayData.month - 1, dayData.day).getDay() === 0 ? 'text-[#D31027]' : 'text-[#D31027]'}`}>
                      {dayData.day}
                    </span>

                    {/* Major Festival Red Border Box */}
                    {dayData.is_major ? (
                      <div className="border-2 border-[#D31027] p-1 mt-1 text-center bg-red-50/50 rounded-sm">
                        <div className="text-[#D31027] text-sm font-bold leading-tight">{dayData.festival_hi}</div>
                        <div className="text-[#D31027] text-xs font-bold leading-tight mt-0.5">{dayData.festival_en}</div>
                      </div>
                    ) : (
                      <div className="text-center mt-1">
                        {dayData.festival_en && (
                          <>
                            <div className="text-[#1A1A8C] text-sm font-semibold leading-tight">{dayData.festival_hi}</div>
                            <div className="text-[#1A1A8C] text-xs font-semibold leading-tight">{dayData.festival_en}</div>
                          </>
                        )}
                      </div>
                    )}

                    {/* Tithi at bottom */}
                    <div className="text-center mt-2 pb-1">
                      <div className="text-[#C42475] text-xs font-semibold">{dayData.tithi_hi}</div>
                      <div className="text-[#C42475] text-[10px] font-bold">{dayData.tithi_en}</div>
                    </div>

                  </div>
                ))
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}