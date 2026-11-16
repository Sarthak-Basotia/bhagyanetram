import { Star, Heart, Gem, Sparkles, Compass, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';

export function ZodiacSignsPage() {
  const zodiacDetails = [
    {
      id: 'aries',
      name: 'Aries',
      sanskrit: 'Mesha',
      symbol: '♈',
      emoji: '🐏',
      dates: 'Mar 21 - Apr 19',
      element: 'Fire (Agni)',
      rulingPlanet: 'Mars (Mangal)',
      luckyColor: 'Coral Red & Crimson',
      traits: ['Courageous', 'Pioneering', 'Passionate', 'Dynamic'],
      compatibility: 'Leo, Sagittarius, Gemini',
      description: 'Dynamic and pioneering, Mesha represents the primordial spark of cosmic will. Ruled by Mangal, natives possess natural leadership and unyielding courage.',
    },
    {
      id: 'taurus',
      name: 'Taurus',
      sanskrit: 'Vrishabha',
      symbol: '♉',
      emoji: '🐂',
      dates: 'Apr 20 - May 20',
      element: 'Earth (Prithvi)',
      rulingPlanet: 'Venus (Shukra)',
      luckyColor: 'Emerald Green & White',
      traits: ['Steadfast', 'Patient', 'Aesthetic', 'Devoted'],
      compatibility: 'Virgo, Capricorn, Cancer',
      description: 'Grounded and aesthetic, Vrishabha embodies stability, material beauty, and enduring devotion. Ruled by Shukra, natives cultivate elegance and sustainable wealth.',
    },
    {
      id: 'gemini',
      name: 'Gemini',
      sanskrit: 'Mithuna',
      symbol: '♊',
      emoji: '👯',
      dates: 'May 21 - Jun 20',
      element: 'Air (Vayu)',
      rulingPlanet: 'Mercury (Budha)',
      luckyColor: 'Golden Yellow & Mint',
      traits: ['Intellectual', 'Adaptable', 'Eloquent', 'Witty'],
      compatibility: 'Libra, Aquarius, Aries',
      description: 'Swift and inquisitive, Mithuna symbolizes intellectual exchange and communicative brilliance. Ruled by Budha, natives excel in analytical synthesis and wit.',
    },
    {
      id: 'cancer',
      name: 'Cancer',
      sanskrit: 'Karka',
      symbol: '♋',
      emoji: '🦀',
      dates: 'Jun 21 - Jul 22',
      element: 'Water (Jala)',
      rulingPlanet: 'Moon (Chandra)',
      luckyColor: 'Pearl White & Silver',
      traits: ['Empathetic', 'Intuitive', 'Nurturing', 'Protective'],
      compatibility: 'Scorpio, Pisces, Taurus',
      description: 'Deeply intuitive and emotional, Karka governs the sanctuary of the heart and domestic bliss. Ruled by Chandra, natives harbor boundless maternal warmth.',
    },
    {
      id: 'leo',
      name: 'Leo',
      sanskrit: 'Simha',
      symbol: '♌',
      emoji: '🦁',
      dates: 'Jul 23 - Aug 22',
      element: 'Fire (Agni)',
      rulingPlanet: 'Sun (Surya)',
      luckyColor: 'Imperial Gold & Orange',
      traits: ['Majestic', 'Magnanimous', 'Radiant', 'Regal'],
      compatibility: 'Aries, Sagittarius, Gemini',
      description: 'Sovereign and luminous, Simha reflects divine solar authority and boundless generosity. Ruled by Surya, natives inspire reverence and command natural honor.',
    },
    {
      id: 'virgo',
      name: 'Virgo',
      sanskrit: 'Kanya',
      symbol: '♍',
      emoji: '👸',
      dates: 'Aug 23 - Sep 22',
      element: 'Earth (Prithvi)',
      rulingPlanet: 'Mercury (Budha)',
      luckyColor: 'Sage Green & Navy',
      traits: ['Precise', 'Discerning', 'Selfless', 'Systematic'],
      compatibility: 'Taurus, Capricorn, Cancer',
      description: 'Meticulous and service-oriented, Kanya harmonizes chaotic energies with divine craftsmanship and healing pragmatism. Ruled by Budha, natives are masters of detail.',
    },
    {
      id: 'libra',
      name: 'Libra',
      sanskrit: 'Tula',
      symbol: '♎',
      emoji: '⚖️',
      dates: 'Sep 23 - Oct 22',
      element: 'Air (Vayu)',
      rulingPlanet: 'Venus (Shukra)',
      luckyColor: 'Rose Pink & Sky Blue',
      traits: ['Harmonious', 'Diplomatic', 'Graceful', 'Just'],
      compatibility: 'Gemini, Aquarius, Leo',
      description: 'Poised and equitable, Tula balances the celestial scales of dharma, beauty, and righteous alliance. Ruled by Shukra, natives cultivate refined social grace.',
    },
    {
      id: 'scorpio',
      name: 'Scorpio',
      sanskrit: 'Vrishchika',
      symbol: '♏',
      emoji: '🦂',
      dates: 'Oct 23 - Nov 21',
      element: 'Water (Jala)',
      rulingPlanet: 'Mars & Ketu',
      luckyColor: 'Deep Maroon & Rust',
      traits: ['Mystical', 'Resilient', 'Profound', 'Incisive'],
      compatibility: 'Cancer, Pisces, Virgo',
      description: 'Esoteric and alchemical, Vrishchika plumbs the psychological and spiritual depths of transformation. Possesses immense psychic insight and regenerative power.',
    },
    {
      id: 'sagittarius',
      name: 'Sagittarius',
      sanskrit: 'Dhanu',
      symbol: '♐',
      emoji: '🏹',
      dates: 'Nov 22 - Dec 21',
      element: 'Fire (Agni)',
      rulingPlanet: 'Jupiter (Guru)',
      luckyColor: 'Royal Yellow & Saffron',
      traits: ['Dharmic', 'Philosophical', 'Expansive', 'Truth-seeking'],
      compatibility: 'Aries, Leo, Libra',
      description: 'Aspiring toward cosmic truth, Dhanu directs the arrow of higher wisdom and spiritual pilgrimage. Ruled by Brihaspati/Guru, natives embody optimism and dharma.',
    },
    {
      id: 'capricorn',
      name: 'Capricorn',
      sanskrit: 'Makara',
      symbol: '♑',
      emoji: '🐐',
      dates: 'Dec 22 - Jan 19',
      element: 'Earth (Prithvi)',
      rulingPlanet: 'Saturn (Shani)',
      luckyColor: 'Charcoal, Indigo & Earth',
      traits: ['Disciplined', 'Tenacious', 'Honorable', 'Structured'],
      compatibility: 'Taurus, Virgo, Scorpio',
      description: 'Steadfast climber of karmic peaks, Makara turns persistent discipline into generational legacy. Ruled by Shani, natives gain supreme endurance and mastery.',
    },
    {
      id: 'aquarius',
      name: 'Aquarius',
      sanskrit: 'Kumbha',
      symbol: '♒',
      emoji: '🏺',
      dates: 'Jan 20 - Feb 18',
      element: 'Air (Vayu)',
      rulingPlanet: 'Saturn & Rahu',
      luckyColor: 'Electric Cyan & Violet',
      traits: ['Visionary', 'Altruistic', 'Unconventional', 'Eclectic'],
      compatibility: 'Gemini, Libra, Sagittarius',
      description: 'Pourer of the nectar of universal consciousness, Kumbha envisions humanitarian progress and futuristic realms. Bridges tradition with visionary innovation.',
    },
    {
      id: 'pisces',
      name: 'Pisces',
      sanskrit: 'Meena',
      symbol: '♓',
      emoji: '🐟',
      dates: 'Feb 19 - Mar 20',
      element: 'Water (Jala)',
      rulingPlanet: 'Jupiter (Guru)',
      luckyColor: 'Golden Ochre & Aquamarine',
      traits: ['Transcendent', 'Spiritual', 'Compassionate', 'Mystic'],
      compatibility: 'Cancer, Scorpio, Capricorn',
      description: 'The culmination of the zodiac wheel, Meena represents moksha, boundless universal compassion, and deep meditative communion with the divine.',
    },
  ];

  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title>The 12  Vedic Rashis (Zodiac Signs) | Bhagyanetram</title>
        <meta name="description" content="Explore the deep spiritual characteristics, ruling Grahas, elements, and traits of all 12 Vedic rashis." />
        <link rel="canonical" href="https://bhagyanetram.com/zodiac-signs" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-cosmic-900 celestial-grid-bg text-white overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-xs font-medium uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Dwadasha Rashi Chakra</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              The 12  <span className="gold-gradient-text">Zodiac Signs</span>
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-3xl mx-auto italic leading-relaxed">
              Explore the profound archetypes, elemental balances, and planetary lords that govern the human soul's earthly journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Zodiac Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {zodiacDetails.map((zodiac, index) => (
              <motion.div
                key={zodiac.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="h-full flex"
              >
                <div className="h-full w-full bg-white rounded-3xl border border-gold-500/30 shadow-gold-card hover:shadow-xl hover:border-gold-500/70 transition-all duration-300 group overflow-hidden flex flex-col">
                  
                  {/* Card Header */}
                  <div className="text-center bg-gradient-to-b from-ivory-100 to-white border-b border-gold-500/20 py-8 px-6 flex flex-col items-center relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/10 to-cosmic-900/5 border border-gold-500/30 flex items-center justify-center text-5xl mb-4 group-hover:scale-110 transition-transform shadow-xs">
                      {zodiac.emoji}
                    </div>
                    <div className="inline-block px-3 py-0.5 rounded-full bg-gold-500/15 text-gold-700 text-xs font-semibold uppercase tracking-wider mb-1">
                      {zodiac.sanskrit} Rashi
                    </div>
                    <h3 className="font-display text-2xl font-bold text-cosmic-900 tracking-wide">
                      {zodiac.name} <span className="text-gold-600 font-normal">({zodiac.symbol})</span>
                    </h3>
                    <p className="text-xs font-medium text-cosmic-500 mt-1">
                      {zodiac.dates}
                    </p>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex flex-col flex-grow">
                    <p className="text-cosmic-700 text-sm leading-relaxed mb-6 flex-grow">
                      {zodiac.description}
                    </p>

                    <div className="space-y-3 mb-6 p-4 rounded-2xl bg-ivory-100/60 border border-gold-500/20">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-cosmic-600 flex items-center gap-1.5">
                          <Compass className="w-4 h-4 text-gold-600" /> Element:
                        </span>
                        <span className="font-display font-medium text-cosmic-900">{zodiac.element}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-cosmic-600 flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-gold-600" /> Ruling Graha:
                        </span>
                        <span className="font-display font-medium text-cosmic-900">{zodiac.rulingPlanet}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-cosmic-600 flex items-center gap-1.5">
                          <Gem className="w-4 h-4 text-gold-600" /> Auspicious Color:
                        </span>
                        <span className="font-display font-medium text-cosmic-900">{zodiac.luckyColor}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-cosmic-600 flex items-center gap-1.5">
                          <Heart className="w-4 h-4 text-rose-500" /> Best Harmony:
                        </span>
                        <span className="font-display font-medium text-cosmic-900">{zodiac.compatibility}</span>
                      </div>
                    </div>

                    {/* Traits Tags */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-cosmic-600 mb-2.5">Key Karmic Traits:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {zodiac.traits.map((trait) => (
                          <span
                            key={trait}
                            className="px-2.5 py-1 bg-white text-cosmic-900 border border-gold-500/30 rounded-lg text-xs font-medium shadow-2xs"
                          >
                            ✦ {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}