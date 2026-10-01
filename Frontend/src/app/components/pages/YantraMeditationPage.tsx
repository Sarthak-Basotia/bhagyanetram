import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Focus, Infinity, Sunrise, HeartPulse, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { BookingModal } from '../BookingModal';

export default function YantraMeditationPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const yantras = [
    {
      name: 'Shri Yantra',
      description: 'The supreme Yantra of the Divine Mother. Used for spiritual evolution, material wealth, and manifesting desires. It aligns you with the cosmic energy of abundance.',
      image: 'https://images.unsplash.com/photo-1515082159828-56df8a9a239c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    },
    {
      name: 'Sri Chakra',
      description: 'A powerful tool for deep meditation and chakra alignment. It helps in purifying the mind, improving focus, and bringing inner tranquility.',
      image: 'https://images.unsplash.com/photo-1545383569-8a39bc6bc9a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    },
    {
      name: 'Kuber Yantra',
      description: 'Dedicated to Lord Kuber, the god of wealth. Meditating on this Yantra removes financial blocks and attracts prosperity and stability in business.',
      image: 'https://images.unsplash.com/photo-1605658607421-4f1cc0332f7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Yantra Meditation | Bhagyanetram</title>
        <meta name="description" content="Discover the power of sacred geometry. Learn Yantra meditation for peace, focus, and spiritual growth, and consult our experts." />
      </Helmet>

      <div className="min-h-screen bg-[#FFFDF2] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#D35400] mb-6 flex items-center justify-center gap-3">
              <Focus className="w-10 h-10" />
              Yantra Meditation
            </h1>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Yantras are ancient sacred geometric diagrams that hold powerful cosmic energies. Meditating upon a Yantra focuses the mind, removes obstacles, and harmonizes your physical and spiritual realms.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <HeartPulse className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Deep Inner Peace</h3>
              <p className="text-slate-600">Alleviates anxiety and stress by giving your mind a singular geometric focal point.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                <Focus className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Enhanced Focus</h3>
              <p className="text-slate-600">The intricate patterns train your brain to maintain unbroken concentration.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <Infinity className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Spiritual Alignment</h3>
              <p className="text-slate-600">Resonates with universal frequencies to unblock chakras and elevate consciousness.</p>
            </div>
          </div>

          {/* Featured Yantras */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">Common Yantras for Practice</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {yantras.map((yantra, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden group">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={yantra.image} 
                      alt={yantra.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-[#D35400] mb-3">{yantra.name}</h3>
                    <p className="text-slate-600 leading-relaxed">{yantra.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation CTA */}
          <div className="bg-gradient-to-r from-[#0A0A9C] to-blue-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')] bg-cover bg-center"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Yantra</h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
                Not every Yantra is suited for everyone. Based on your birth chart and planetary positions, our expert astrologers can recommend the exact Yantra and mantra you need for maximum benefit.
              </p>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-white text-[#0A0A9C] hover:bg-blue-50 font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2 mx-auto"
              >
                <BookOpen className="w-5 h-5" />
                Book a Yantra Consultation
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
    </>
  );
}
