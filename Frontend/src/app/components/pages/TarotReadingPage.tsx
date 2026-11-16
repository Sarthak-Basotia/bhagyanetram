import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, RefreshCcw, Moon, ArrowRight } from 'lucide-react';
import { tarotCards } from '../../../data/tarotData';
import { motion } from 'framer-motion';

const getImageUrl = (imagePath: string) => {
  return imagePath.replace('/tarotdeck', 'https://cdn.jsdelivr.net/gh/krates98/tarotcardapi@main/images');
};

export default function TarotReadingPage() {
  const [deck, setDeck] = useState<typeof tarotCards>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [readingMode, setReadingMode] = useState(false);

  // Shuffle deck on mount
  useEffect(() => {
    shuffleDeck();
  }, []);

  const shuffleDeck = () => {
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setSelectedCardIndex(null);
    setReadingMode(false);
  };

  const handleCardSelect = (index: number) => {
    if (selectedCardIndex !== null) return;
    setSelectedCardIndex(index);
    
    // Wait for the flip animation, then switch to reading mode
    setTimeout(() => {
      setReadingMode(true);
    }, 1000);
  };

  const currentCard = selectedCardIndex !== null ? deck[selectedCardIndex] : null;

  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title>Daily Cosmic Tarot Reading | Bhagyanetram</title>
        <meta name="description" content="Discover your daily tarot reading. Draw a  card and explore its archetype and cosmic guidance." />
        <link rel="canonical" href="https://bhagyanetram.com/tarot-reading" />
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
              <span> Divination Oracle</span>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/20 to-cosmic-800 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-6 text-gold-300">
              <Moon className="w-10 h-10" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Cosmic <span className="gold-gradient-text">Tarot Oracle</span>
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-2xl mx-auto italic leading-relaxed">
              {!readingMode 
                ? "Calm your breath, center your focus on your most pressing life question, and draw a consecrated card from the deck."
                : "The veil parts. Meditate upon the symbols and messages channeled through this  card."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Reading Table */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {!readingMode ? (
            <div className="bg-white rounded-3xl shadow-gold-card border border-gold-500/30 p-6 md:p-12 text-center">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-700 mb-1 font-display"> 78-Card Arcana</p>
                <h3 className="font-display text-2xl font-bold text-cosmic-900">Select Your Guiding Card</h3>
              </div>

              <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5">
                {deck.map((card, index) => {
                  const isSelected = selectedCardIndex === index;
                  const isHidden = selectedCardIndex !== null && !isSelected;

                  return (
                    <div 
                      key={index}
                      onClick={() => handleCardSelect(index)}
                      className={`relative w-11 h-20 sm:w-16 sm:h-28 md:w-20 md:h-34 rounded-xl shadow-sm cursor-pointer transition-all duration-700 transform hover:-translate-y-3 
                        ${isHidden ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'} 
                        ${isSelected ? 'scale-125 z-20 shadow-gold-glow' : ''}
                      `}
                      style={{ perspective: '1000px' }}
                    >
                      <div 
                        className={`w-full h-full relative transition-transform duration-700 ${isSelected ? '[transform:rotateY(180deg)]' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* Card Back */}
                        <div className="absolute w-full h-full bg-gradient-to-br from-cosmic-950 via-cosmic-900 to-cosmic-950 rounded-xl border-2 border-gold-500/50 flex flex-col items-center justify-center [backface-visibility:hidden] shadow-md">
                          <div className="w-6 h-6 rounded-full border border-gold-500/40 flex items-center justify-center">
                            <Moon className="w-3.5 h-3.5 text-gold-400" />
                          </div>
                        </div>
                        {/* Card Front */}
                        <div className="absolute w-full h-full bg-white rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden border-2 border-gold-500 shadow-gold-glow">
                          <img 
                            src={getImageUrl(card.image)} 
                            alt={card.name} 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 pt-6 border-t border-gold-500/20">
                <button
                  onClick={shuffleDeck}
                  className="px-6 py-2.5 rounded-full border border-gold-500/40 font-display font-semibold text-xs text-cosmic-800 hover:bg-ivory-100 transition inline-flex items-center gap-2"
                >
                  <RefreshCcw className="w-3.5 h-3.5 text-gold-600" />
                  <span>Reshuffle Tarot Deck</span>
                </button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-gold-card border border-gold-500/40 overflow-hidden"
            >
              <div className="p-8 md:p-14 flex flex-col md:flex-row gap-10 items-center md:items-start">
                
                {/* Card Image Area */}
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <div className="relative w-64 h-[440px] rounded-2xl overflow-hidden shadow-gold-glow border-2 border-gold-500">
                    <img 
                      src={getImageUrl(currentCard!.image)} 
                      alt={currentCard!.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <button
                    onClick={shuffleDeck}
                    className="mt-8 w-full gold-btn py-3.5 px-6 rounded-full font-display font-semibold text-xs shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    <span>Draw Another Card</span>
                  </button>
                </div>

                {/* Card Details Area */}
                <div className="w-full md:w-2/3">
                  <div className="h-full flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-800 text-xs font-display font-semibold uppercase tracking-wider mb-3 w-fit">
                      <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                      <span>Revealed Archetype</span>
                    </div>

                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-cosmic-900 mb-6 pb-4 border-b border-gold-500/20">
                      {currentCard!.name}
                    </h2>
                    
                    <div className="space-y-4">
                      {currentCard!.description.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="text-cosmic-800 leading-relaxed text-base sm:text-lg font-sans">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-xs text-cosmic-500 italic">
                        Need deeper clarity? Combine this reading with a full natal birth chart consultation.
                      </p>
                      <a
                        href="/contact"
                        className="text-xs font-display font-bold uppercase tracking-wider text-gold-700 hover:text-gold-600 flex items-center gap-1.5 flex-shrink-0"
                      >
                        <span>Consult Astrologer</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
                
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
