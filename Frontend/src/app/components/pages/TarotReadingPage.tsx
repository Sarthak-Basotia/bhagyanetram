import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, RefreshCcw, Moon } from 'lucide-react';
import { tarotCards } from '../../../data/tarotData';

const getImageUrl = (imagePath: string) => {
  return imagePath.replace('/tarotdeck', 'https://cdn.jsdelivr.net/gh/krates98/tarotcardapi@main/images');
};

export default function TarotReadingPage() {
  const [deck, setDeck] = useState<typeof tarotCards>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [readingMode, setReadingMode] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  // Shuffle deck on mount
  useEffect(() => {
    shuffleDeck();
  }, []);

  const shuffleDeck = () => {
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setSelectedCardIndex(null);
    setReadingMode(false);
    setIsFlipping(false);
  };

  const handleCardSelect = (index: number) => {
    if (selectedCardIndex !== null) return; // Prevent selecting multiple
    setSelectedCardIndex(index);
    
    // Wait for the flip animation, then switch to reading mode
    setTimeout(() => {
      setReadingMode(true);
    }, 1000);
  };

  const currentCard = selectedCardIndex !== null ? deck[selectedCardIndex] : null;

  return (
    <>
      <Helmet>
        <title>Daily Tarot Reading | Bhagyanetram</title>
        <meta name="description" content="Discover your daily tarot reading. Draw a random tarot card and explore its meaning and interpretations." />
      </Helmet>
      
      <div className="min-h-screen bg-[#FFFDF2] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#D35400] mb-4 flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8" />
              Tarot Reading
              <Sparkles className="w-8 h-8" />
            </h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              {!readingMode 
                ? "Focus your energy on a question or situation, then select a card from the deck below."
                : "Here is your reading. Reflect on the message it brings."}
            </p>
          </div>

          {!readingMode ? (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-10">
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {deck.map((card, index) => {
                  const isSelected = selectedCardIndex === index;
                  const isHidden = selectedCardIndex !== null && !isSelected;

                  return (
                    <div 
                      key={index}
                      onClick={() => handleCardSelect(index)}
                      className={`relative w-12 h-20 sm:w-16 sm:h-24 md:w-20 md:h-32 rounded-md shadow-md cursor-pointer transition-all duration-700 transform hover:-translate-y-2 
                        ${isHidden ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'} 
                        ${isSelected ? 'scale-125 z-10' : ''}
                      `}
                      style={{ perspective: '1000px' }}
                    >
                      <div 
                        className={`w-full h-full relative transition-transform duration-700 ${isSelected ? '[transform:rotateY(180deg)]' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* Card Back */}
                        <div className="absolute w-full h-full bg-gradient-to-br from-[#0A0A9C] to-purple-900 rounded-md border-2 border-yellow-500/50 flex items-center justify-center [backface-visibility:hidden]">
                          <Moon className="w-4 h-4 md:w-6 md:h-6 text-yellow-400 opacity-50" />
                        </div>
                        {/* Card Front (Only visible after flip) */}
                        <div className="absolute w-full h-full bg-white rounded-md [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden border border-slate-200">
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
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-500">
              <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center md:items-start">
                
                {/* Card Image Area */}
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <div className="relative w-64 h-[440px] rounded-xl overflow-hidden shadow-2xl">
                    <img 
                      src={getImageUrl(currentCard!.image)} 
                      alt={currentCard!.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <button
                    onClick={shuffleDeck}
                    className="mt-8 w-full flex items-center justify-center gap-2 bg-[#0A0A9C] hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-full transition-all shadow-md active:scale-95"
                  >
                    <RefreshCcw className="w-5 h-5" />
                    Draw Another Card
                  </button>
                </div>

                {/* Card Details Area */}
                <div className="w-full md:w-2/3">
                  <div className="h-full flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2 border-b-2 border-[#D35400] pb-4 inline-block">
                      {currentCard!.name}
                    </h2>
                    
                    <div className="mt-6 prose prose-lg prose-slate max-w-none">
                      {currentCard!.description.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="text-slate-700 leading-relaxed mb-4 text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
