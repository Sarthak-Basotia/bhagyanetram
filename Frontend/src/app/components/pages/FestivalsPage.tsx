// src/app/components/pages/FestivalsPage.tsx
import React, { useState, useEffect } from 'react';

// Example structured data (replace with a fetch call to your new endpoint)
const mockFeb2026 = {
  westernMonthName: "FEBRUARY 2026",
  hinduMonthNames: "माघ           फाल्गुन",
  days: [
    { date: 1, dayOfWeek: "SUN", tithiHindi: "माघ पूर्णिमा", tithiEnglish: "Magh Punam / Full Moon", isMajorFestival: false },
    { date: 2, dayOfWeek: "MON", tithiHindi: "फाल्गुन मास प्रारम्भ", tithiEnglish: "Falgun Month begins", isMajorFestival: false },
    // ... skipping to the 15th for the example ...
    { date: 15, dayOfWeek: "SUN", festivalHindi: "महाशिवरात्रि", festivalEnglish: "MAHA SHIVRATRI", isMajorFestival: true },
    // ...
  ]
};

const daysOfWeek = [
  { hi: "रवि", en: "SUN" }, { hi: "सोम", en: "MON" }, { hi: "मंगल", en: "TUE" },
  { hi: "बुध", en: "WED" }, { hi: "गुरु", en: "THU" }, { hi: "शुक्र", en: "FRI" }, { hi: "शनि", en: "SAT" }
];

export default function FestivalsPage() {
  const [calendarData, setCalendarData] = useState(mockFeb2026);
  
  // You would add useEffect here to fetch the real data from your backend
  // based on the currently selected month.

  // Helper to calculate empty grid cells before the 1st of the month
  const getEmptyCells = (firstDayOfWeek: string) => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const emptyCount = days.indexOf(firstDayOfWeek);
    return Array.from({ length: emptyCount });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#D35400] mb-2">Hindu Festival Calendar</h1>
          <p className="text-slate-600">Panchang timings and major auspicious days</p>
        </div>

        {/* The Calendar Container (styled like the image) */}
        <div className="border-[12px] border-[#0A0A9C] bg-white rounded-md shadow-2xl p-1 relative">
          
          {/* Decorative Inner Border */}
          <div className="border-[6px] border-[#F4C542] p-1">
            <div className="border-[4px] border-[#E83C3C] p-2">
              
              {/* Header: Month Names */}
              <div className="bg-[#F9ED34] py-3 text-center mb-1">
                <h2 className="text-[#D31F1F] text-3xl md:text-5xl font-black tracking-wider flex justify-around items-center">
                  <span>माघ</span>
                  <span className="font-sans">{calendarData.westernMonthName}</span>
                  <span>फाल्गुन</span>
                </h2>
              </div>

              {/* Grid System */}
              <div className="grid grid-cols-7 border-l-2 border-t-2 border-[#0A0A9C]">
                
                {/* Days of Week Header */}
                {daysOfWeek.map((day, idx) => (
                  <div key={idx} className="border-r-2 border-b-2 border-[#0A0A9C] py-2 text-center bg-white flex justify-center items-center gap-1">
                    <span className="text-[#D31F1F] font-bold text-lg md:text-xl">{day.hi}</span>
                    <span className="text-[#D31F1F] font-bold text-lg md:text-xl">{day.en}</span>
                  </div>
                ))}

                {/* Empty Cells for alignment */}
                {getEmptyCells(calendarData.days[0].dayOfWeek).map((_, idx) => (
                  <div key={`empty-${idx}`} className="border-r-2 border-b-2 border-[#0A0A9C] min-h-[120px] bg-slate-50/50"></div>
                ))}

                {/* Actual Calendar Days */}
                {calendarData.days.map((day) => (
                  <div key={day.date} className="border-r-2 border-b-2 border-[#0A0A9C] min-h-[120px] p-2 flex flex-col relative bg-white hover:bg-slate-50 transition-colors">
                    
                    {/* Date Number */}
                    <span className="text-[#D31F1F] font-black text-xl mb-1">{day.date}</span>
                    
                    {/* Conditional rendering for standard tithi vs Major Festival */}
                    {day.isMajorFestival ? (
                      <div className="border-2 border-[#D31F1F] p-1 mt-auto mb-1 text-center bg-white">
                        <div className="text-[#8B008B] font-bold leading-tight mb-1">{day.festivalHindi}</div>
                        <div className="text-[#D31F1F] font-bold text-sm leading-tight uppercase">{day.festivalEnglish}</div>
                      </div>
                    ) : (
                      <div className="text-center mt-auto mb-2">
                        <div className="text-[#8B008B] font-semibold text-sm leading-tight mb-1">{day.tithiHindi}</div>
                        <div className="text-[#8B008B] text-xs leading-tight">{day.tithiEnglish}</div>
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