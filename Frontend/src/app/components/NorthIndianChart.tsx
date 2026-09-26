import React from 'react';

interface Planet {
  name: string;      
  house: number;     
  isRetrograde?: boolean; 
  color?: string;    
}

interface NorthIndianChartProps {
  ascendant: number; 
  planets: Planet[];
}

export const NorthIndianChart: React.FC<NorthIndianChartProps> = ({ ascendant, planets }) => {
  const getSignForHouse = (houseNumber: number) => {
    let sign = ascendant + (houseNumber - 1);
    if (sign > 12) sign -= 12;
    return sign;
  };

  const signCoords = {
    1: { x: 200, y: 175 }, 2: { x: 145, y: 125 }, 3: { x: 125, y: 150 },  
    4: { x: 170, y: 204 }, 5: { x: 125, y: 260 }, 6: { x: 145, y: 285 }, 
    7: { x: 200, y: 235 }, 8: { x: 255, y: 285 }, 9: { x: 275, y: 260 }, 
    10: { x: 230, y: 204 }, 11: { x: 275, y: 150 }, 12: { x: 255, y: 125 }  
  };

  const planetCenters = {
    1: { cx: 200, cy: 95 }, 2: { cx: 100, cy: 55 }, 3: { cx: 55,  cy: 105 },  
    4: { cx: 105, cy: 200 }, 5: { cx: 55,  cy: 295 }, 6: { cx: 100, cy: 345 }, 
    7: { cx: 200, cy: 305 }, 8: { cx: 300, cy: 345 }, 9: { cx: 345, cy: 295 }, 
    10: { cx: 295, cy: 200 }, 11: { cx: 345, cy: 105 }, 12: { cx: 300, cy: 55 }  
  };

  // Premium Styling Palette
  const strokeColor = "#C8B273"; // Rich Gold
  const bgColor = "#FDFBF4";     // Warm traditional cream

  return (
    <div className="w-full max-w-md mx-auto aspect-square bg-white rounded-lg p-2 shadow-lg relative overflow-hidden border border-slate-100">
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Warm Background Fill */}
        <rect width="400" height="400" fill={bgColor} rx="4" />

        {/* Premium Layered Borders */}
        <rect x="5" y="5" width="390" height="390" fill="transparent" stroke={strokeColor} strokeWidth="3" rx="2"/>
        <rect x="12" y="12" width="376" height="376" fill="transparent" stroke={strokeColor} strokeWidth="1"/>
        <rect x="16" y="16" width="368" height="368" fill="transparent" stroke={strokeColor} strokeWidth="1"/>

        {/* Traditional Corner Ornaments */}
        <g fill="transparent" stroke={strokeColor} strokeWidth="1.5">
          {/* Top Left */}
          <rect x="12" y="12" width="12" height="12" />
          <circle cx="18" cy="18" r="3" fill={strokeColor} opacity="0.6"/>
          {/* Top Right */}
          <rect x="376" y="12" width="12" height="12" />
          <circle cx="382" cy="18" r="3" fill={strokeColor} opacity="0.6"/>
          {/* Bottom Left */}
          <rect x="12" y="376" width="12" height="12" />
          <circle cx="18" cy="382" r="3" fill={strokeColor} opacity="0.6"/>
          {/* Bottom Right */}
          <rect x="376" y="376" width="12" height="12" />
          <circle cx="382" cy="382" r="3" fill={strokeColor} opacity="0.6"/>
        </g>

        {/* Main Diagonal Cross Lines (X) */}
        <line x1="16" y1="16" x2="384" y2="384" stroke={strokeColor} strokeWidth="1.5"/>
        <line x1="384" y1="16" x2="16" y2="384" stroke={strokeColor} strokeWidth="1.5"/>

        {/* Inner Diamond */}
        <polygon points="200,16 384,200 200,384 16,200" fill="transparent" stroke={strokeColor} strokeWidth="1.5"/>

        {/* Render Houses (1 through 12) */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((house) => {
          const housePlanets = planets.filter(p => p.house === house);
          const center = planetCenters[house as keyof typeof planetCenters];
          
          return (
            <g key={`house-${house}`}>
              {/* Zodiac Sign Number (Faded Gold) */}
              <text 
                x={signCoords[house as keyof typeof signCoords].x} 
                y={signCoords[house as keyof typeof signCoords].y} 
                textAnchor="middle" 
                fill="#A69460" 
                fontSize="13" 
                fontWeight="600"
              >
                {getSignForHouse(house)}
              </text>

              {/* Planets using foreignObject for perfect flexbox wrapping */}
              <foreignObject
                x={center.cx - 45}
                y={house === 1 ? center.cy - 35 : center.cy - 25} 
                width="90"
                height="70"
              >
                <div 
                  xmlns="http://www.w3.org/1999/xhtml" 
                  className="w-full h-full flex flex-col items-center justify-center"
                >
                  {/* Ascendant Label */}
                  {house === 1 && (
                    <span className="text-[#9C27B0] text-[11px] font-bold uppercase tracking-widest mb-1 opacity-90 drop-shadow-sm">
                      Asc
                    </span>
                  )}
                  
                  {/* Planet List */}
                  <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 leading-none px-1">
                    {housePlanets.map((p, idx) => (
                      <span 
                        key={idx} 
                        style={{ color: p.color || "#0A0A9C" }} 
                        className="font-bold text-[14px] tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]"
                      >
                        {p.name}{p.isRetrograde ? "®" : ""}
                      </span>
                    ))}
                  </div>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
};