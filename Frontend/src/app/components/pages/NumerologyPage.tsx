import React, { useState, FormEvent } from 'react';
import { 
  Calculator, User, Star, Compass, AlertCircle, 
  CheckCircle2, Sparkles, Gem, Heart, Brain 
} from 'lucide-react';
// Import your API function (Adjust path if needed)
import { fetchNumerology } from '../../../api/astrologyApi'; 

export default function NumerologyPage() {
  // 1. Added State for Name and Gender
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<any>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // 2. Updated to exactly match your TypeScript interface: { name, dob, gender }
      const response = await fetchNumerology({ name, dob, gender });
      
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError('Failed to calculate numerology profile.');
      }
    } catch (err) {
      console.error(err);
      setError('Engine connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF2] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#D35400] mb-3 flex items-center justify-center gap-3">
            <Calculator className="w-8 h-8 md:w-10 md:h-10" />
            Vedic Numerology
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover your core numbers, lucky elements, and auspicious directions based on the Chaldean system.
          </p>
        </div>

        {/* 3. Expanded Input Form for Name, DOB, and Gender */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-12">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
            
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#D35400] outline-none"
                required
              />
            </div>

            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-slate-700 mb-2">Date of Birth</label>
              <input 
                type="date" 
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#D35400] outline-none"
                required
              />
            </div>

            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-slate-700 mb-2">Gender</label>
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#D35400] outline-none bg-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#0A0A9C] text-white font-bold p-3 rounded-lg hover:bg-blue-800 transition-colors px-8 disabled:opacity-70 flex items-center justify-center w-full md:w-auto h-[50px]"
            >
              {loading ? 'Calculating...' : 'Reveal'}
            </button>
          </form>
          {error && <p className="text-red-500 font-bold text-sm mt-3 text-center">{error}</p>}
        </div>

        {/* Results Dashboard */}
        {data && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Core Numbers Overview (Now 5 columns) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <NumberCard title="Radical (Mulank)" number={data.numbers.radical_number} color="bg-amber-100 text-amber-700" />
              <NumberCard title="Destiny (Bhagyank)" number={data.numbers.destiny_number} color="bg-blue-100 text-blue-700" />
              <NumberCard title="Name Number" number={data.numbers.name_number} color="bg-emerald-100 text-emerald-700" />
              <NumberCard title="Soul Urge" number={data.numbers.soul_urge_number} color="bg-purple-100 text-purple-700" />
              <NumberCard title="Personality" number={data.numbers.personality_number} color="bg-rose-100 text-rose-700" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Radical Profile (Nature) */}
              <ProfileSection 
                title="Radical Profile (Your Nature)" 
                profile={data.radical_profile} 
                icon={<User className="w-6 h-6 text-amber-600" />} 
                accentColor="border-amber-200 bg-amber-50/30"
              />
              
              {/* Destiny Profile (Life Path) */}
              <ProfileSection 
                title="Destiny Profile (Your Life Path)" 
                profile={data.destiny_profile} 
                icon={<Star className="w-6 h-6 text-blue-600" />} 
                accentColor="border-blue-200 bg-blue-50/30"
              />
            </div>

            {/* Favorable Elements Row (Expanded) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ElementCard title="Lucky Colors" items={data.radical_profile.favourable_colors} icon={<Sparkles />} />
              <ElementCard title="Lucky Days" items={data.radical_profile.favourable_days} icon={<CheckCircle2 />} />
              <ElementCard title="Lucky Dates (This Month)" items={data.radical_profile.favourable_dates_this_month} icon={<Star />} />
              <ElementCard title="Gemstones" items={[data.radical_profile.gemstone, data.destiny_profile.gemstone]} icon={<Gem />} />
            </div>

            {/* Favorable Elements Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ElementCard title="Lucky Colors" items={data.radical_profile.favourable_colors} icon={<Sparkles />} />
              <ElementCard title="Lucky Days" items={data.radical_profile.favourable_days} icon={<CheckCircle2 />} />
              <ElementCard title="Recommended Gemstone" items={[data.radical_profile.gemstone, data.destiny_profile.gemstone]} icon={<Gem />} />
            </div>

            {/* Kua Directions (Feng Shui / Vastu) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <Compass className="w-6 h-6 text-emerald-600" />
                <h2 className="text-xl font-bold text-slate-800">Auspicious Directions (Kua Group: {data.directions.group})</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DirectionCard title="Success & Wealth" data={data.directions.success} icon={<Star className="w-5 h-5" />} color="text-amber-600" />
                <DirectionCard title="Health & Vitality" data={data.directions.health} icon={<Heart className="w-5 h-5" />} color="text-rose-600" />
                <DirectionCard title="Relationships" data={data.directions.relationship} icon={<User className="w-5 h-5" />} color="text-pink-600" />
                <DirectionCard title="Wisdom & Study" data={data.directions.wisdom} icon={<Brain className="w-5 h-5" />} color="text-blue-600" />
              </div>
              
              <div className="mt-6 p-4 bg-red-50 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-900 text-sm mb-1">Inauspicious Directions to Avoid</h4>
                  <p className="text-red-700 text-sm font-medium">{data.directions.inauspicious_directions.join(", ")}</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-center text-xs text-slate-400 font-medium pb-8">{data.note}</p>

          </div>
        )}
      </div>
    </div>
  );
}

// --- Subcomponents for clean code ---

function NumberCard({ title, number, color }: { title: string, number: number, color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
      <span className="text-sm font-bold text-slate-500 mb-2">{title}</span>
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-extrabold ${color}`}>
        {number}
      </div>
    </div>
  );
}

function ProfileSection({ title, profile, icon, accentColor }: { title: string, profile: any, icon: any, accentColor: string }) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border ${accentColor}`}>
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      </div>
      
      <p className="text-slate-700 italic mb-6 leading-relaxed bg-white/50 p-4 rounded-lg border border-white/60">
        "{profile.personality.summary}"
      </p>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-sm font-bold text-slate-500">Ruling Planet</span>
          <span className="font-bold text-slate-800">{profile.ruling_planet}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-sm font-bold text-slate-500">Favourable God</span>
          <span className="font-bold text-slate-800">{profile.favourable_god}</span>
        </div>
        
        <div className="pt-2">
          <span className="block text-sm font-bold text-slate-500 mb-2">Strengths</span>
          <div className="flex flex-wrap gap-2">
            {profile.personality.strengths.map((s: string, i: number) => (
              <span key={i} className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">{s}</span>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <span className="block text-sm font-bold text-slate-500 mb-2">Challenges</span>
          <div className="flex flex-wrap gap-2">
            {profile.personality.challenges.map((c: string, i: number) => (
              <span key={i} className="bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-1 rounded-full">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ElementCard({ title, items, icon }: { title: string, items: (string | number)[], icon: any }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-start gap-4">
      <div className="p-3 bg-slate-50 rounded-xl text-[#0A0A9C]">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-slate-700 text-sm mb-2">{title}</h3>
        <div className="flex flex-wrap gap-1">
          {items.map((item, idx) => (
            <span key={idx} className="text-sm font-medium text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DirectionCard({ title, data, icon, color }: { title: string, data: any, icon: any, color: string }) {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
      <div className="flex items-center gap-2 mb-2">
        <div className={color}>{icon}</div>
        <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-lg font-black ${color}`}>{data.direction}</span>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed">{data.meaning}</p>
    </div>
  );
}