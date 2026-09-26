import React, { useState, useEffect } from 'react';
import { fetchPlanetTransit } from '../../../api/astrologyApi';
import { NorthIndianChart } from '../NorthIndianChart';
import { Loader2 } from 'lucide-react';

export default function PlanetTransitPage() {
  const [chartData, setChartData] = useState<{ ascendant: number, planets: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLiveTransit = async () => {
      try {
        const now = new Date();
        const datetime = now.toISOString().split('.')[0]; 
        
        const res = await fetchPlanetTransit({
          datetime, lat: 28.6139, lon: 77.2090, tz_offset: 5.5
        });

        if (res.success) {
          // The backend now returns exactly what the SVG needs
          setChartData({
            ascendant: res.data.ascendant,
            planets: res.data.planets
          });
        }
      } catch (err) {
        console.error("Chart load failed", err);
      } finally {
        setLoading(false);
      }
    };
    getLiveTransit();
  }, []);

  if (loading) return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-20" />;
  if (!chartData) return <div className="text-center mt-20 text-red-500">Failed to load chart</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Live Planet Transit</h1>
        
        {/* Render the SVG Chart */}
        <NorthIndianChart 
          ascendant={chartData.ascendant} 
          planets={chartData.planets} 
        />
        
      </div>
    </div>
  );
}