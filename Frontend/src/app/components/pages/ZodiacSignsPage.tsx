import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Star, Heart, Gem, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function ZodiacSignsPage() {
  const zodiacDetails = [
    {
      id: 'aries',
      name: 'Aries',
      symbol: '♈',
      emoji: '🐏',
      dates: 'Mar 21 - Apr 19',
      element: 'Fire',
      rulingPlanet: 'Mars',
      luckyColor: 'Red',
      traits: ['Courageous', 'Energetic', 'Dynamic', 'Quick-witted'],
      compatibility: 'Leo, Sagittarius, Gemini',
      description: 'Bold and ambitious, Aries dives headfirst into challenges. Natural leaders with pioneering spirits.',
    },
    {
      id: 'taurus',
      name: 'Taurus',
      symbol: '♉',
      emoji: '🐂',
      dates: 'Apr 20 - May 20',
      element: 'Earth',
      rulingPlanet: 'Venus',
      luckyColor: 'Green',
      traits: ['Reliable', 'Patient', 'Practical', 'Devoted'],
      compatibility: 'Virgo, Capricorn, Cancer',
      description: 'Grounded and practical, Taurus values stability and comfort. Known for loyalty and determination.',
    },
    {
      id: 'gemini',
      name: 'Gemini',
      symbol: '♊',
      emoji: '👯',
      dates: 'May 21 - Jun 20',
      element: 'Air',
      rulingPlanet: 'Mercury',
      luckyColor: 'Yellow',
      traits: ['Adaptable', 'Communicative', 'Witty', 'Curious'],
      compatibility: 'Libra, Aquarius, Aries',
      description: 'Versatile and expressive, Gemini thrives on communication and intellectual stimulation.',
    },
    {
      id: 'cancer',
      name: 'Cancer',
      symbol: '♋',
      emoji: '🦀',
      dates: 'Jun 21 - Jul 22',
      element: 'Water',
      rulingPlanet: 'Moon',
      luckyColor: 'Silver',
      traits: ['Intuitive', 'Emotional', 'Protective', 'Caring'],
      compatibility: 'Scorpio, Pisces, Taurus',
      description: 'Deeply intuitive and sentimental, Cancer is all about home and family. Highly protective of loved ones.',
    },
    {
      id: 'leo',
      name: 'Leo',
      symbol: '♌',
      emoji: '🦁',
      dates: 'Jul 23 - Aug 22',
      element: 'Fire',
      rulingPlanet: 'Sun',
      luckyColor: 'Gold',
      traits: ['Confident', 'Generous', 'Creative', 'Passionate'],
      compatibility: 'Aries, Sagittarius, Gemini',
      description: 'Charismatic and confident, Leo is a natural performer who loves to be in the spotlight.',
    },
    {
      id: 'virgo',
      name: 'Virgo',
      symbol: '♍',
      emoji: '👸',
      dates: 'Aug 23 - Sep 22',
      element: 'Earth',
      rulingPlanet: 'Mercury',
      luckyColor: 'Navy Blue',
      traits: ['Analytical', 'Practical', 'Meticulous', 'Loyal'],
      compatibility: 'Taurus, Capricorn, Cancer',
      description: 'Detail-oriented and analytical, Virgo seeks perfection and has a strong sense of service.',
    },
    {
      id: 'libra',
      name: 'Libra',
      symbol: '♎',
      emoji: '⚖️',
      dates: 'Sep 23 - Oct 22',
      element: 'Air',
      rulingPlanet: 'Venus',
      luckyColor: 'Pink',
      traits: ['Diplomatic', 'Gracious', 'Fair-minded', 'Social'],
      compatibility: 'Gemini, Aquarius, Leo',
      description: 'Balanced and harmonious, Libra seeks justice and beauty in all things. Natural peacemakers.',
    },
    {
      id: 'scorpio',
      name: 'Scorpio',
      symbol: '♏',
      emoji: '🦂',
      dates: 'Oct 23 - Nov 21',
      element: 'Water',
      rulingPlanet: 'Pluto',
      luckyColor: 'Maroon',
      traits: ['Passionate', 'Resourceful', 'Brave', 'Determined'],
      compatibility: 'Cancer, Pisces, Virgo',
      description: 'Intense and mysterious, Scorpio possesses tremendous emotional depth and transformative power.',
    },
    {
      id: 'sagittarius',
      name: 'Sagittarius',
      symbol: '♐',
      emoji: '🏹',
      dates: 'Nov 22 - Dec 21',
      element: 'Fire',
      rulingPlanet: 'Jupiter',
      luckyColor: 'Purple',
      traits: ['Optimistic', 'Adventurous', 'Independent', 'Philosophical'],
      compatibility: 'Aries, Leo, Libra',
      description: 'Free-spirited and philosophical, Sagittarius loves adventure and seeks truth and wisdom.',
    },
    {
      id: 'capricorn',
      name: 'Capricorn',
      symbol: '♑',
      emoji: '🐐',
      dates: 'Dec 22 - Jan 19',
      element: 'Earth',
      rulingPlanet: 'Saturn',
      luckyColor: 'Brown',
      traits: ['Disciplined', 'Ambitious', 'Practical', 'Patient'],
      compatibility: 'Taurus, Virgo, Scorpio',
      description: 'Ambitious and disciplined, Capricorn is a master of self-control and achieves goals through perseverance.',
    },
    {
      id: 'aquarius',
      name: 'Aquarius',
      symbol: '♒',
      emoji: '🏺',
      dates: 'Jan 20 - Feb 18',
      element: 'Air',
      rulingPlanet: 'Uranus',
      luckyColor: 'Electric Blue',
      traits: ['Progressive', 'Independent', 'Humanitarian', 'Original'],
      compatibility: 'Gemini, Libra, Sagittarius',
      description: 'Innovative and visionary, Aquarius is a humanitarian who thinks outside the box and values independence.',
    },
    {
      id: 'pisces',
      name: 'Pisces',
      symbol: '♓',
      emoji: '🐟',
      dates: 'Feb 19 - Mar 20',
      element: 'Water',
      rulingPlanet: 'Neptune',
      luckyColor: 'Sea Green',
      traits: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle'],
      compatibility: 'Cancer, Scorpio, Capricorn',
      description: 'Deeply empathetic and artistic, Pisces is a dreamer with a rich inner world and spiritual depth.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 celestial-gradient " style={{color: '#C46D29'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"  >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 animate-float" />
            <h1 className="text-5xl mb-6">The 12 Zodiac Signs</h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90" style={{color: '#C46D29'}}>
              Discover the unique characteristics, traits, and cosmic connections of each zodiac sign
            </p>
          </motion.div>
        </div>
      </section>

      {/* Zodiac Cards */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {zodiacDetails.map((zodiac, index) => (
              <motion.div
                key={zodiac.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full flex"
              >
                <Card className="h-full w-full border-slate-200 hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col">
                  
                  {/* Card Header matching screenshot */}
                  <CardHeader className="text-center bg-[#FAF9F6] border-b border-slate-100 py-8 flex flex-col items-center">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform drop-shadow-sm">
                      {zodiac.emoji}
                    </div>
                    <CardTitle className="text-2xl text-[#D35400] font-bold tracking-wide">
                      {zodiac.name}
                    </CardTitle>
                    <p className="text-sm font-medium text-slate-500 mt-1">
                      {zodiac.dates}
                    </p>
                  </CardHeader>
                  
                  {/* Card Body matching screenshot */}
                  <CardContent className="pt-6 px-6 pb-8 flex flex-col flex-grow">
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                      {zodiac.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <Sparkles className="w-4 h-4 text-[#D35400] flex-shrink-0" />
                        <span className="font-bold text-slate-700 w-24">Element:</span>
                        <span className="text-slate-600">{zodiac.element}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm">
                        <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                        <span className="font-bold text-slate-700 w-24">Ruling Planet:</span>
                        <span className="text-slate-600">{zodiac.rulingPlanet}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm">
                        <Gem className="w-4 h-4 text-amber-700 flex-shrink-0" />
                        <span className="font-bold text-slate-700 w-24">Lucky Color:</span>
                        <span className="text-slate-600">{zodiac.luckyColor}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm">
                        <Heart className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="font-bold text-slate-700 w-24">Best Match:</span>
                        <span className="text-slate-600">{zodiac.compatibility}</span>
                      </div>
                    </div>

                    {/* Traits Tags matching screenshot */}
                    <div>
                      <p className="text-sm font-bold text-slate-900 mb-3">Key Traits:</p>
                      <div className="flex flex-wrap gap-2">
                        {zodiac.traits.map((trait) => (
                          <span
                            key={trait}
                            className="px-3 py-1 bg-[#FFF4ED] text-[#D35400] border border-[#FFE4D6] rounded-full text-xs font-semibold"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}