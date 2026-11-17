import React, { useState, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Calculator, User, Star, Compass, AlertCircle, 
  CheckCircle2, Sparkles, Gem, Heart, Brain, Loader2, ArrowRight 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchNumerology } from '../../../api/astrologyApi'; 

export default function NumerologyPage() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('male');
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<any>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!agreedToPolicy) {
      setError('Please agree to the Terms & Conditions and Privacy Policy before proceeding.');
      return;
    }
    setLoading(true);
    setError('');
    
    try {
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
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title>Vedic & Chaldean Numerology Calculator (Anka Vidya) | Bhagyanetram</title>
        <meta name="description" content="Calculate your Mulank (Radical Number), Bhagyank (Destiny Number), and lucky vibrations using authentic Vedic numerology." />
        <link rel="canonical" href="https://bhagyanetram.com/numerology" />
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
              <span> Anka Jyotish</span>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/20 to-cosmic-800 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-6 text-gold-300">
              <Calculator className="w-10 h-10" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Vedic <span className="gold-gradient-text">Numerology Analysis</span>
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-3xl mx-auto italic leading-relaxed">
              Decode the  vibrations of your birth date and name to uncover your Mulank, Bhagyank, and auspicious life alignments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Form & Results */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Form */}
          <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-3xl shadow-gold-card border border-gold-500/30 mb-14">
            <div className="text-center mb-8 pb-4 border-b border-gold-500/20">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-700 mb-1 font-display">Numerological Input</p>
              <h2 className="font-display text-2xl font-bold text-cosmic-900">Enter Your Identity Vibration</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">
                  Full Name *
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">
                  Date of Birth *
                </label>
                <input 
                  type="date" 
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">
                  Gender *
                </label>
                <select 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="md:col-span-3 flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="numerology-agree-policy"
                  required
                  checked={agreedToPolicy}
                  onChange={(e) => setAgreedToPolicy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gold-500/50 text-gold-600 focus:ring-gold-500 cursor-pointer accent-gold-600"
                />
                <label htmlFor="numerology-agree-policy" className="text-xs text-cosmic-800 leading-snug cursor-pointer select-none">
                  I agree to the{' '}
                  <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-gold-700 underline font-semibold hover:text-gold-800">
                    Terms &amp; Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gold-700 underline font-semibold hover:text-gold-800">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <div className="md:col-span-3 pt-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="gold-btn w-full py-4 rounded-full font-display font-semibold text-sm shadow-gold-glow flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Calculating Vibrational Matrix...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Reveal Numerology Matrix</span>
                    </>
                  )}
                </button>
              </div>
            </form>
            {error && <p className="text-rose-600 font-bold text-xs mt-3 text-center">{error}</p>}
          </div>

          {/* Results Dashboard */}
          {data && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              
              {/* 5 Core Numbers Overview */}
              <div>
                <div className="text-center mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-700 mb-1 font-display">Fundamental Blueprint</p>
                  <h3 className="font-display text-2xl font-bold text-cosmic-900">Your 5  Pillar Numbers</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <NumberCard title="Mulank (Radical)" number={data.numbers?.radical_number} />
                  <NumberCard title="Bhagyank (Destiny)" number={data.numbers?.destiny_number} />
                  <NumberCard title="Namank (Name)" number={data.numbers?.name_number} />
                  <NumberCard title="Soul Urge" number={data.numbers?.soul_urge_number} />
                  <NumberCard title="Personality" number={data.numbers?.personality_number} />
                </div>
              </div>

              {/* Profiles Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ProfileSection 
                  title="Mulank Nature & Swabhava" 
                  profile={data.radical_profile} 
                  icon={<User className="w-6 h-6 text-gold-600" />} 
                />
                
                <ProfileSection 
                  title="Bhagyank Destiny & Life Path" 
                  profile={data.destiny_profile} 
                  icon={<Star className="w-6 h-6 text-gold-600" />} 
                />
              </div>

              {/* Favorable Elements Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <ElementCard title="Auspicious Colors" items={data.radical_profile?.favourable_colors || []} icon={<Sparkles className="w-5 h-5 text-gold-600" />} />
                <ElementCard title="Favorable Days" items={data.radical_profile?.favourable_days || []} icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />} />
                <ElementCard title="Lucky Dates (Monthly)" items={data.radical_profile?.favourable_dates_this_month || []} icon={<Star className="w-5 h-5 text-gold-600" />} />
                <ElementCard title="Resonant Gemstones" items={[data.radical_profile?.gemstone, data.destiny_profile?.gemstone].filter(Boolean)} icon={<Gem className="w-5 h-5 text-blue-600" />} />
              </div>

              {/* Kua Directions */}
              {data.directions && (
                <div className="bg-white rounded-3xl p-8 border border-gold-500/30 shadow-gold-card">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold-500/20">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-cosmic-900">Auspicious Kua Directions ({data.directions.group} Group)</h3>
                      <p className="text-xs text-cosmic-600">Optimal magnetic directions for workspace and restful sleep</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <DirectionCard title="Success & Wealth" data={data.directions.success} icon={<Star className="w-4 h-4 text-gold-600" />} />
                    <DirectionCard title="Health & Prana" data={data.directions.health} icon={<Heart className="w-4 h-4 text-rose-600" />} />
                    <DirectionCard title="Love & Harmony" data={data.directions.relationship} icon={<User className="w-4 h-4 text-emerald-600" />} />
                    <DirectionCard title="Wisdom & Study" data={data.directions.wisdom} icon={<Brain className="w-4 h-4 text-blue-600" />} />
                  </div>
                  
                  {data.directions.inauspicious_directions && (
                    <div className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-display font-bold text-rose-900 text-xs uppercase tracking-wider mb-0.5">Directions to Avoid Facing</h4>
                        <p className="text-rose-700 text-xs font-semibold">{data.directions.inauspicious_directions.join(", ")}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Consultation Callout */}
              <div className="p-8 text-center bg-cosmic-900 celestial-grid-bg text-white rounded-3xl border border-gold-500/30 shadow-gold-card">
                <h3 className="font-display text-2xl font-bold mb-2">Want a Personalized Name Spelling Correction?</h3>
                <p className="font-editorial text-lg text-ivory-200 italic mb-6 max-w-xl mx-auto">
                  Align your business or birth name spelling with your destiny number to dissolve stagnant blockages.
                </p>
                <a
                  href="/contact"
                  className="gold-btn px-8 py-3.5 rounded-full font-display font-semibold text-xs shadow-gold-glow inline-flex items-center gap-2"
                >
                  <span>Book Custom Name Correction Session</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Subcomponents ---

function NumberCard({ title, number }: { title: string, number: number | string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gold-500/30 shadow-gold-card flex flex-col items-center justify-center text-center">
      <span className="text-xs font-display font-semibold text-cosmic-600 uppercase tracking-wider mb-3">{title}</span>
      <div className="w-16 h-16 rounded-2xl bg-cosmic-900 border border-gold-500/50 shadow-gold-glow flex items-center justify-center text-3xl font-display font-bold text-gold-300">
        {number ?? '-'}
      </div>
    </div>
  );
}

function ProfileSection({ title, profile, icon }: { title: string, profile: any, icon: any }) {
  if (!profile) return null;
  return (
    <div className="bg-white rounded-3xl p-8 border border-gold-500/30 shadow-gold-card">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gold-500/20">
        <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-display text-xl font-bold text-cosmic-900">{title}</h3>
      </div>
      
      {profile.personality?.summary && (
        <p className="font-editorial text-lg italic text-cosmic-800 mb-6 leading-relaxed bg-ivory-100/70 p-4 rounded-2xl border border-gold-500/20">
          "{profile.personality.summary}"
        </p>
      )}

      <div className="space-y-3.5">
        <div className="flex justify-between items-center py-2 border-b border-gold-500/10 text-sm">
          <span className="font-semibold text-cosmic-600">Ruling Graha:</span>
          <span className="font-display font-bold text-cosmic-900">{profile.ruling_planet}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gold-500/10 text-sm">
          <span className="font-semibold text-cosmic-600">Presiding Deity:</span>
          <span className="font-display font-bold text-cosmic-900">{profile.favourable_god}</span>
        </div>
        
        {profile.personality?.strengths && (
          <div className="pt-2">
            <span className="block text-xs font-semibold uppercase tracking-wider text-cosmic-500 mb-2 font-display">Auspicious Strengths</span>
            <div className="flex flex-wrap gap-1.5">
              {profile.personality.strengths.map((s: string, i: number) => (
                <span key={i} className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold px-3 py-1 rounded-full">
                  ✦ {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {profile.personality?.challenges && (
          <div className="pt-2">
            <span className="block text-xs font-semibold uppercase tracking-wider text-cosmic-500 mb-2 font-display">Karmic Growth Areas</span>
            <div className="flex flex-wrap gap-1.5">
              {profile.personality.challenges.map((c: string, i: number) => (
                <span key={i} className="bg-rose-50 text-rose-800 border border-rose-300 text-xs font-semibold px-3 py-1 rounded-full">
                  ⚠️ {c}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ElementCard({ title, items, icon }: { title: string, items: (string | number)[], icon: any }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gold-500/30 shadow-gold-card flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-display font-bold text-cosmic-900 text-sm mb-2">{title}</h4>
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, idx) => (
            <span key={idx} className="text-xs font-medium text-cosmic-800 bg-ivory-100/90 border border-gold-500/20 px-2.5 py-1 rounded-lg">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DirectionCard({ title, data, icon }: { title: string, data: any, icon: any }) {
  if (!data) return null;
  return (
    <div className="bg-ivory-100/70 p-5 rounded-2xl border border-gold-500/20">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h4 className="font-display font-bold text-cosmic-900 text-xs uppercase tracking-wider">{title}</h4>
      </div>
      <div className="mb-2">
        <span className="font-display text-xl font-bold text-cosmic-950 text-gold-700">{data.direction}</span>
      </div>
      <p className="text-xs text-cosmic-600 leading-relaxed">{data.meaning}</p>
    </div>
  );
}