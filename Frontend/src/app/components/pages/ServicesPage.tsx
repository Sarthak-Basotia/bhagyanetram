import { Star, Heart, Gem, Users, TrendingUp, BookOpen, Phone, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Award, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function ServicesPage() {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Star className="w-8 h-8 text-gold-500" />,
      title: 'Personalized Birth Chart Reading',
      subtitle: 'Janma Kundli Deep Dive',
      description: 'Comprehensive analysis of your natal chart revealing your life purpose, career highs, karmic debts, and optimal timing for major life decisions.',
      features: ['Complete 12-House Kundli Analysis', 'Planetary Strengths (Shadbala)', 'Vimshottari Dasha Milestones', 'Personalized Gem & Mantra Remedies'],
      price: '₹2,999',
      popular: true,
    },
    {
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      title: 'Kundli Matching & Vivah Milan',
      subtitle: 'Ashtakoota 36 Guna Milan',
      description: 'Authentic Vedic matchmaking analyzing emotional, mental, and physical compatibility, Manglik dosha evaluation, and mutual longevity.',
      features: ['36-Point Ashtakoot Score', 'Manglik & Nadi Dosha Assessment', 'Graha Maitri & Bhakoot Remedies', 'Spousal Prosperity Alignment'],
      price: '₹1,999',
      popular: false,
    },
    {
      icon: <Gem className="w-8 h-8 text-gold-400" />,
      title: 'Certified Gemstone Consultation',
      subtitle: 'Ratna Paramarsh',
      description: 'Discover the exact high-frequency gemstones that strengthen auspicious yogas and nullify malefic planetary afflictions without side effects.',
      features: ['Primary & Secondary Ratna Selection', 'Metal, Finger & Auspicious Muhurat', 'Pran-Pratishtha Consecration Guide', 'Certified Sourced Gemstone Advice'],
      price: '₹999',
      popular: false,
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-emerald-500" />,
      title: 'Career, Wealth & Business Jyotish',
      subtitle: 'Artha & Vyapar Shastra',
      description: 'Navigate career transitions, investment timing, business partnerships, and financial expansion using precision transit (Gochara) timing.',
      features: ['Optimal Career Shifts & Promotion Timing', 'Business Launch & Incorporation Muhurat', 'Wealth Inflow Yogas & Blockage Clearing', 'Stock & Property Investment Cycles'],
      price: '₹3,499',
      popular: true,
    },
    {
      icon: <Users className="w-8 h-8 text-saffron-500" />,
      title: 'Relationship & Family Counseling',
      subtitle: 'Bandhan & Sambandh Shanti',
      description: 'Heal interpersonal conflicts, parent-child dynamics, and marital distress through karmic behavioral insights and  pacification rituals.',
      features: ['Synastry Compatibility Analysis', 'Dasha Synergy Alignment', 'Conflict Neutralization Remedies', 'Daily Communication Harmony Advice'],
      price: '₹2,499',
      popular: false,
    },
    {
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      title: ' Vedic Numerology Reading',
      subtitle: 'Anka Vidya & Name Correction',
      description: 'Harmonize your name vibration with your birth number and destiny path to eliminate subtle subconscious obstacles and attract prosperity.',
      features: ['Life Path, Destiny & Soul Numbers', 'Spelling & Business Name Optimization', 'Personal Year & Month Vibrations', 'Lucky Signature & Daily Colors'],
      price: '₹1,499',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title>Our  Astrology & Vastu Services | Bhagyanetram</title>
        <meta name="description" content="Explore our authentic Vedic astrology services including Birth Chart Reading, Kundli Matching, Gemstone Consultation, and Career Astrology." />
        <link rel="canonical" href="https://bhagyanetram.com/services" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-cosmic-900 celestial-grid-bg text-white overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-xs font-medium uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Authentic Vedic Consultations</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Our  <span className="gold-gradient-text">Astrology Services</span>
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-3xl mx-auto italic leading-relaxed">
              Illuminating your destiny with timeless celestial wisdom, algorithmic astronomical precision, and empathetic personal guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-700 mb-2 font-display">Customized Consultations</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cosmic-900">
              Guidance For Every Phase of Your Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className={`h-full flex flex-col justify-between bg-white rounded-3xl p-8 border ${
                  service.popular ? 'border-gold-500 shadow-gold-glow' : 'border-gold-500/30 shadow-gold-card'
                } hover:border-gold-500/70 hover:shadow-xl transition-all duration-300`}>
                  {service.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold-600 to-gold-400 text-cosmic-950 font-display font-bold text-xs uppercase tracking-wider shadow-md">
                      Most Requested
                    </div>
                  )}

                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-ivory-100 border border-gold-500/20 flex items-center justify-center mb-6">
                      {service.icon}
                    </div>

                    <p className="text-xs font-bold uppercase tracking-wider text-gold-700 mb-1">{service.subtitle}</p>
                    <h3 className="font-display text-2xl font-bold text-cosmic-900 mb-3">{service.title}</h3>
                    <p className="text-cosmic-700 text-sm leading-relaxed mb-6">{service.description}</p>
                    
                    <div className="space-y-3 mb-8 pt-4 border-t border-gold-500/20">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-sm text-cosmic-800">
                          <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gold-500/20">
                    <div className="flex items-baseline justify-between mb-5">
                      <div>
                        <span className="text-xs text-cosmic-500 uppercase tracking-wider">Dakshina</span>
                        <p className="font-display text-3xl font-bold text-cosmic-900">{service.price}</p>
                      </div>
                      <span className="text-xs text-cosmic-500">Includes Full Written Report</span>
                    </div>
                    <button
                      onClick={() => navigate('/contact')}
                      className={`w-full py-3.5 rounded-full font-display font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                        service.popular
                          ? 'gold-btn shadow-gold-glow'
                          : 'bg-cosmic-900 hover:bg-cosmic-800 text-gold-300 border border-gold-500/30'
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      <span>Book Consultation</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose BhagyaNetram */}
      <section className="py-20 bg-ivory-100/70 border-y border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-700 mb-2 font-display">Uncompromising Integrity</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cosmic-900">
              Why Devotees Trust BhagyaNetram
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gold-500/30 shadow-gold-card text-center">
              <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6 text-gold-600">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-cosmic-900 mb-3">Authentic Lineage</h3>
              <p className="text-cosmic-700 text-sm leading-relaxed">
                Over 15 years of uninterrupted practice steeped in Parashari, Jaimini, and Brihat Samhita classical traditions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gold-500/30 shadow-gold-card text-center">
              <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6 text-gold-600">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-cosmic-900 mb-3">Empowering Remedies</h3>
              <p className="text-cosmic-700 text-sm leading-relaxed">
                Zero fear-mongering. We prescribe practical, non-destructive Vastu rectifications and high-efficacy Vedic remedial karmas.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gold-500/30 shadow-gold-card text-center">
              <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6 text-gold-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-cosmic-900 mb-3">100%  Confidentiality</h3>
              <p className="text-cosmic-700 text-sm leading-relaxed">
                Your birth details and personal revelations remain strictly private, protected with  practitioner ethics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cosmic-900 celestial-grid-bg text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Discover Your <span className="gold-gradient-text">Cosmic Blueprint?</span>
          </h2>
          <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 mb-8 italic">
            Schedule a private one-on-one session with our senior astrologers and gain absolute clarity over life's defining moments.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="gold-btn px-10 py-4 rounded-full font-display font-semibold text-base shadow-gold-glow inline-flex items-center gap-2"
          >
            <span>Schedule Private Consultation</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}