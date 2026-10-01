import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, RefreshCcw } from 'lucide-react';
import { tarotCards } from '../../../data/tarotData';

// Replace the relative image path from the API with the jsDelivr CDN link to the github repo images
const getImageUrl = (imagePath: string) => {
  return imagePath.replace('/tarotdeck', 'https://cdn.jsdelivr.net/gh/krates98/tarotcardapi@main/images');
};

export default function TarotReadingPage() {
  const [currentCard, setCurrentCard] = useState<typeof tarotCards[0] | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const drawCard = () => {
    setIsFlipping(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * tarotCards.length);
      setCurrentCard(tarotCards[randomIndex]);
      setIsFlipping(false);
    }, 600); // 600ms to allow flip animation or just a smooth transition
  };

  useEffect(() => {
    drawCard();
  }, []);

  return (
    <>
      <Helmet>
        <title>Daily Tarot Reading | Bhagyanetram</title>
        <meta name="description" content="Discover your daily tarot reading. Draw a random tarot card and explore its meaning and interpretations." />
      </Helmet>
      
      <div className="min-h-screen bg-[#FFFDF2] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#D35400] mb-4 flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8" />
              Daily Tarot Reading
              <Sparkles className="w-8 h-8" />
            </h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Seek guidance, reflect on your current path, and explore the mysteries of the Tarot. Draw a card to reveal your message.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center md:items-start">
              
              {/* Card Image Area */}
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div 
                  className={`relative w-64 h-[440px] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 transform ${isFlipping ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}
                >
                  {currentCard ? (
                    <img 
                      src={getImageUrl(currentCard.image)} 
                      alt={currentCard.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#0A0A9C] flex items-center justify-center text-white p-4 text-center">
                      <p>Shuffling the deck...</p>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={drawCard}
                  disabled={isFlipping}
                  className="mt-8 w-full flex items-center justify-center gap-2 bg-[#0A0A9C] hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-full transition-all shadow-md active:scale-95 disabled:opacity-70"
                >
                  <RefreshCcw className={`w-5 h-5 ${isFlipping ? 'animate-spin' : ''}`} />
                  Draw Another Card
                </button>
              </div>

              {/* Card Details Area */}
              <div className={`w-full md:w-2/3 transition-opacity duration-500 ${isFlipping ? 'opacity-0' : 'opacity-100'}`}>
                {currentCard && (
                  <div className="h-full flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2 border-b-2 border-[#D35400] pb-4 inline-block">
                      {currentCard.name}
                    </h2>
                    
                    <div className="mt-6 prose prose-lg prose-slate max-w-none">
                      {currentCard.description.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="text-slate-700 leading-relaxed mb-4 text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
