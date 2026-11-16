import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Focus, Infinity, HeartPulse, Sparkles, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BookingModal } from '../BookingModal';

export default function YantraMeditationPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const yantras = [
    {
      name: 'Shri Yantra (Maha Meru)',
      sanskrit: 'त्रैलोक्य मोहन चक्र',
      description: 'The supreme  diagram of the Divine Mother Tripura Sundari. Aligns 9 interlocking triangles to manifest boundless spiritual evolution, material abundance, and cosmic order.',
      image: 'Shri_Yantra.png',
      benefit: 'Cosmic Abundance & Soul Harmony',
    },
    {
      name: 'Sri Chakra Mandala',
      sanskrit: 'सर्व आनन्दमय चक्र',
      description: 'A profound meditative instrument for kundalini awakening and chakra alignment. Purifies sensory perception, dissolves mental chatter, and anchors unwavering inner stillness.',
      image: 'Sri_Chakra.png',
      benefit: 'Deep Trance & Mental Silence',
    },
    {
      name: 'Kuber Yantra',
      sanskrit: 'धन आकर्षण यन्त्र',
      description: 'Dedicated to Lord Yaksharaja Kubera, the celestial guardian of universal treasures. Neutralizes financial blockages, restores trade vitality, and stabilizes family assets.',
      image: 'Kubera_Yantra.png',
      benefit: 'Wealth Inflow & Asset Protection',
    },
  ];

  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title> Yantra Meditation &  Geometry | Bhagyanetram</title>
        <meta name="description" content="Discover the power of  geometric yantras. Meditate upon Shri Yantra and consult our Vedic scholars for consecrated personal yantras." />
        <link rel="canonical" href="https://bhagyanetram.com/yantra-meditation" />
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
              <span> Geometric Sadhana</span>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/20 to-cosmic-800 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-6 text-gold-300">
              <Focus className="w-10 h-10" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
               <span className="gold-gradient-text">Yantra Meditation</span>
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-3xl mx-auto italic leading-relaxed">
              Yantras are the visual vibration bodies of cosmic mantras. Meditating on  geometry harmonizes the subtle nadis, quietens the mind, and attracts divine Grace.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Container */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-8 rounded-3xl border border-gold-500/30 shadow-gold-card text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-gold-500/10 border border-gold-500/30 rounded-2xl flex items-center justify-center mb-5 text-gold-600">
                <HeartPulse className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-cosmic-900 mb-2">Deep Pranic Balance</h3>
              <p className="text-cosmic-600 text-sm leading-relaxed">
                Alleviates psychic tension and autonomic stress by locking attention onto the Bindu (central focal nucleus).
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gold-500/30 shadow-gold-card text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-gold-500/10 border border-gold-500/30 rounded-2xl flex items-center justify-center mb-5 text-gold-600">
                <Focus className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-cosmic-900 mb-2">Laser Dharana Focus</h3>
              <p className="text-cosmic-600 text-sm leading-relaxed">
                The precise fractal geometry conditions the brain waves into theta states, strengthening uninterrupted meditation.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gold-500/30 shadow-gold-card text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-gold-500/10 border border-gold-500/30 rounded-2xl flex items-center justify-center mb-5 text-gold-600">
                <Infinity className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-cosmic-900 mb-2">Cosmic Consciousness</h3>
              <p className="text-cosmic-600 text-sm leading-relaxed">
                Emits subtle acoustic and electromagnetic frequencies that recalibrate home vibrations and spiritual consciousness.
              </p>
            </div>
          </div>

          {/* Featured Yantras */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-700 mb-2 font-display"> Geometries</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-cosmic-900">
                Time-Tested Yantras for Daily Meditation
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {yantras.map((yantra, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl border border-gold-500/30 shadow-gold-card overflow-hidden group hover:border-gold-500/70 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-64 overflow-hidden bg-cosmic-950/5 relative border-b border-gold-500/20 p-6 flex items-center justify-center">
                      <img 
                        src={yantra.image} 
                        alt={yantra.name} 
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-cosmic-900/90 text-gold-300 border border-gold-500/30 rounded-full text-[10px] font-display font-bold uppercase tracking-wider">
                        {yantra.benefit}
                      </div>
                    </div>
                    <div className="p-7">
                      <p className="text-xs font-bold text-gold-700 font-display mb-1">{yantra.sanskrit}</p>
                      <h3 className="font-display text-2xl font-bold text-cosmic-900 mb-3">{yantra.name}</h3>
                      <p className="text-cosmic-600 text-sm leading-relaxed">{yantra.description}</p>
                    </div>
                  </div>
                  <div className="p-7 pt-0">
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full py-3 rounded-full bg-ivory-100 hover:bg-cosmic-900 hover:text-gold-300 border border-gold-500/30 font-display font-semibold text-xs text-cosmic-900 transition flex items-center justify-center gap-2"
                    >
                      <Compass className="w-4 h-4 text-gold-600" />
                      <span>Learn Proper Meditation Protocol</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation CTA */}
          <div className="bg-cosmic-900 celestial-grid-bg rounded-3xl p-8 md:p-14 text-center text-white shadow-gold-card border border-gold-500/40 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-xs font-medium uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Pran-Pratishtha Consecration</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">
                Discover Your Personal <span className="gold-gradient-text">Ishta Devata Yantra</span>
              </h2>
              <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 mb-8 italic leading-relaxed">
                Every birth chart resonates with a distinct geometric geometry. Our senior acharyas evaluate your 5th and 9th houses to prescribe the consecrated Yantra suited for your spiritual elevation.
              </p>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="gold-btn px-10 py-4 rounded-full font-display font-semibold text-sm shadow-gold-glow flex items-center gap-2 mx-auto"
              >
                <BookOpen className="w-4 h-4" />
                <span>Book Yantra Meditation Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <BookingModal 
        open={isBookingOpen} 
        onOpenChange={setIsBookingOpen} 
        reason="Yantra Meditation Consultation"
      />
    </div>
  );
}
