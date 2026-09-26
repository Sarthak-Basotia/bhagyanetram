import React from 'react';

interface Planet {
  name: string;      // e.g., "Su", "Mo", "Ma"
  house: number;     // 1 through 12
  isRetrograde?: boolean; 
  color?: string;    // Optional specific color (e.g., "#E83C3C")
}

interface NorthIndianChartProps {
  ascendant: number; // The zodiac sign number in the 1st House (top center)
  planets: Planet[];
}

export const NorthIndianChart: React.FC<NorthIndianChartProps> = ({ ascendant, planets }) => {
  // Helper to calculate the zodiac sign number for any given house (1-12)
  const getSignForHouse = (houseNumber: number) => {
    let sign = ascendant + (houseNumber - 1);
    if (sign > 12) sign -= 12;
    return sign;
  };

  // Helper to filter and format planets for a specific house
  const getPlanetsForHouse = (houseNumber: number) => {
    const housePlanets = planets.filter(p => p.house === houseNumber);
    return housePlanets.map((p, idx) => (
      <tspan key={idx} fill={p.color || "#0A0A9C"} fontWeight="bold" fontSize="14">
        {p.name}{p.isRetrograde ? "®" : ""}
        {idx < housePlanets.length - 1 ? " " : ""}
      </tspan>
    ));
  };

  // Coordinates for the zodiac sign numbers (placed near the inner edges)
  const signCoords = {
    1: { x: 200, y: 170 }, // Top Center (Ascendant)
    2: { x: 100, y: 70 },  // Top Left Inner
    3: { x: 40, y: 130 },  // Top Left Outer
    4: { x: 130, y: 200 }, // Left Center
    5: { x: 40, y: 270 },  // Bottom Left Outer
    6: { x: 100, y: 330 }, // Bottom Left Inner
    7: { x: 200, y: 230 }, // Bottom Center
    8: { x: 300, y: 330 }, // Bottom Right Inner
    9: { x: 360, y: 270 }, // Bottom Right Outer
    10: { x: 270, y: 200 },// Right Center
    11: { x: 360, y: 130 },// Top Right Outer
    12: { x: 300, y: 70 }  // Top Right Inner
  };

  // Coordinates for placing planet names centrally within each house triangle/diamond
  const planetCoords = {
    1: { x: 200, y: 100 }, 
    2: { x: 100, y: 40 },  
    3: { x: 40, y: 100 },  
    4: { x: 100, y: 200 }, 
    5: { x: 40, y: 300 },  
    6: { x: 100, y: 360 }, 
    7: { x: 200, y: 300 }, 
    8: { x: 300, y: 360 }, 
    9: { x: 360, y: 300 }, 
    10: { x: 300, y: 200 },
    11: { x: 360, y: 100 },
    12: { x: 300, y: 40 }  
  };

  return (
    <div className="w-full max-w-md mx-auto aspect-square bg-[#FAF9F6] border-4 border-[#C8B273] rounded-sm p-2 shadow-sm relative">
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Outer Square */}
        <rect x="5" y="5" width="390" height="390" fill="transparent" stroke="#C8B273" strokeWidth="2"/>
        <rect x="10" y="10" width="380" height="380" fill="transparent" stroke="#C8B273" strokeWidth="1"/>

        {/* Diagonal Cross Lines (X) */}
        <line x1="10" y1="10" x2="390" y2="390" stroke="#C8B273" strokeWidth="1.5"/>
        <line x1="390" y1="10" x2="10" y2="390" stroke="#C8B273" strokeWidth="1.5"/>

        {/* Inner Diamond */}
        <polygon points="200,10 390,200 200,390 10,200" fill="transparent" stroke="#C8B273" strokeWidth="1.5"/>

        {/* Render Houses (1 through 12) */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((house) => (
          <g key={`house-${house}`}>
            {/* Zodiac Sign Number */}
            <text 
              x={signCoords[house as keyof typeof signCoords].x} 
              y={signCoords[house as keyof typeof signCoords].y} 
              textAnchor="middle" 
              fill="#8B7355" 
              fontSize="12" 
              fontWeight="bold"
            >
              {getSignForHouse(house)}
            </text>

            {/* Planets in the House */}
            <text 
              x={planetCoords[house as keyof typeof planetCoords].x} 
              y={planetCoords[house as keyof typeof planetCoords].y} 
              textAnchor="middle"
            >
              {getPlanetsForHouse(house)}
            </text>
          </g>
        ))}

        {/* Ascendant Label (Optional: matches the pink 'Asc' in your reference images) */}
        <text x="200" y="140" textAnchor="middle" fill="#9C27B0" fontSize="12" fontWeight="bold">Asc</text>
      </svg>
    </div>
  );
};