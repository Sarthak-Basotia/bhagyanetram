import { useState } from 'react';
import { Star, Award, Heart, BookOpen, Target, Check, GraduationCap, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { BookingModal } from '../BookingModal';
import panditPranav from '/src/assets/Pandit-Pranav.jpeg';
import logoImage from 'figma:asset/d5457f2df4c5864ece0203437258a94768a0cf00.png';

export function AboutPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-gold-500" />,
      title: 'Compassion & Empathy',
      description: 'Every consultation is approached with deep understanding and care for your unique situation',
    },
    {
      icon: <Star className="w-8 h-8 text-gold-500" />,
      title: 'Authentic Wisdom',
      description: 'Genuine guidance rooted in authentic Vedic principles and ancient  knowledge',
    },
    {
      icon: <BookOpen className="w-8 h-8 text-gold-500" />,
      title: 'Continuous Mastery',
      description: 'Dedicated to mastering astrological sciences and staying aligned with timeless research',
    },
    {
      icon: <Target className="w-8 h-8 text-gold-500" />,
      title: 'Practical Solutions',
      description: 'Accurate predictions combined with actionable remedies that seamlessly fit modern life',
    },
  ];

  const credentials = [
    'Advanced Diploma in Vastu Shastra',
    '10+ years of professional consulting experience',
    'Trained in KP System, Nadi Astrology, and Prasna Shastra',
    'Guided 10,000+ individuals, homes, and corporate offices across India',
  ];

  const achievements = [
    { number: '10,000+', label: 'Satisfied Clients Worldwide' },
    { number: '25,000+', label: 'Successful Consultations' },
    { number: '10+', label: 'Years of Vedic Expertise' },
    { number: '95%', label: 'Client Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-950 font-sans selection:bg-gold-500 selection:text-cosmic-900">
      <Helmet>
        <title>About Us | Bhagyanetram — Vedic Astrology &amp; Vastu Shastra</title>
        <meta
          name="description"
          content="Learn about Bhagyanetram, our mission, values, and expert consultants dedicated to bringing authentic Vedic wisdom and Vastu solutions."
        />
        <link rel="canonical" href="https://bhagyanetram.com/about" />
      </Helmet>

      {/* =========================================================
           1. HERO SECTION (Deep Cosmic Midnight +  Emblem)
      ========================================================= */}
      <section className="relative py-20 lg:py-28 bg-cosmic-900 celestial-grid-bg text-white overflow-hidden border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 text-center lg:text-left"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/95 p-1.5 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mb-6 mx-auto lg:mx-0 overflow-hidden">
                <img
                  src={logoImage}
                  alt="BhagyaNetram  Emblem"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/35 text-gold-300 text-xs sm:text-sm font-medium tracking-wide mb-6">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>Bhagyanetram</span>
                <span className="text-gold-500/60">•</span>
                <span className="italic font-editorial text-base text-gold-200">Our Heritage &amp; Vision</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] text-white mb-6">
                About <span className="gold-gradient-text">Bhagyanetram</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-ivory-200/90 leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0">
                A trusted sanctuary of authentic Vedic Astrology and Vastu Shastra, dedicated to helping individuals, families, and businesses find harmony, clarity, and prosperity.
              </p>
              <p className="text-sm sm:text-base text-ivory-200/75 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
                Founded with a mission to make profound cosmic guidance accessible to all, we unite traditional astrological calculations with contemporary understanding to provide compassionate, practical remedies for modern living.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full sm:w-auto gold-btn font-bold text-base px-8 py-4 rounded-2xl shadow-gold-glow inline-flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-cosmic-950" />
                  <span>Get FREE Consultation</span>
                </button>
                <a
                  href="#founder"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl border border-gold-500/40 bg-cosmic-800/60 hover:bg-cosmic-800 text-gold-200 font-semibold text-base transition-all inline-flex items-center justify-center gap-2"
                >
                  <span>Meet Our Expert</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-md rounded-3xl overflow-hidden border-2 border-gold-500/40 shadow-cosmic-card group">
                <img
                  src="https://images.unsplash.com/photo-1759244563340-9f67c4f615b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Ancient Vedic Wisdom and Manuscripts"
                  className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950/85 via-cosmic-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-900/90 border border-gold-500/40 text-gold-300 text-xs font-semibold mb-2">
                    Timeless Wisdom
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">Rooted in Ancient Shastras</h3>
                  <p className="text-xs text-ivory-200/80 mt-1">Preserving  cosmic sciences with modern scientific rigor.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
           2. ACHIEVEMENTS BANNER (Cosmic Dark Stat Bar)
      ========================================================= */}
      <section className="py-12 bg-cosmic-950 border-b border-gold-500/20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-4 rounded-2xl bg-cosmic-900/70 border border-gold-500/25"
              >
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold gold-gradient-text mb-1">
                  {achievement.number}
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-wider text-ivory-200/80 font-medium">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
           3. ABOUT THE FOUNDER / CHIEF CONSULTANT (Warm Parchment)
      ========================================================= */}
      <section id="founder" className="py-20 lg:py-28 bg-ivory-100 ivory--bg border-b border-ivory-300/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-gold-500/30 text-gold-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                <GraduationCap className="w-4 h-4 text-gold-600" />
                <span>Founder &amp; Chief Consultant</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cosmic-900 mb-6">
                Meet Our Expert — Pandit Pranav
              </h2>
              <p className="text-base sm:text-lg text-cosmic-800/90 mb-5 leading-relaxed">
                With over a decade of dedicated research and practice in Vedic Astrology, Kundli Milan, and Vastu Shastra, our chief consultant has guided thousands of individuals and families toward clarity and lasting transformation.
              </p>
              <p className="text-sm sm:text-base text-cosmic-800/80 mb-8 leading-relaxed">
                What began as a deep reverence for celestial alignments evolved into a life mission: deciphering complex planetary patterns and translating them into simple, actionable steps for career growth, emotional peace, and harmonious spaces.
              </p>

              <div className="space-y-3 mb-8">
                {credentials.map((credential, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gold-500/25 shadow-sm">
                    <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                    <p className="text-sm sm:text-base text-cosmic-900 font-medium">{credential}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="gold-btn font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                <span>Schedule a Private Session</span>
              </button>
            </motion.div>

            {/* Right Portrait */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-md rounded-3xl overflow-hidden border-2 border-gold-400 shadow-gold-card bg-cosmic-900">
                <img
                  src={panditPranav}
                  alt="Pandit Pranav - Chief Vedic Astrologer"
                  className="w-full h-[520px] object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-white/95 border border-emerald-300 px-3 py-1.5 rounded-full shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Master
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-cosmic-950 via-cosmic-950/70 to-transparent p-6 text-white">
                  <h3 className="font-display text-2xl font-bold text-gold-300">Pandit Pranav</h3>
                  <p className="text-sm text-ivory-200/90 mt-0.5">Vedic Astrology &amp; Vastu Shastra • 10+ Years</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
           4. CORE VALUES (Parchment Card Grid)
      ========================================================= */}
      <section className="py-20 lg:py-24 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-saffron-600 mb-2">
              Our Foundations
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cosmic-900">
              Our Core Values
            </h2>
            <p className="mt-3 text-base sm:text-lg text-cosmic-800/80">
              The ethical and spiritual principles that anchor our  consultations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-gold-500/30 p-7 shadow-gold-card hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-ivory-100 border border-gold-500/30 flex items-center justify-center mb-5">
                  {value.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-cosmic-900 mb-2">{value.title}</h3>
                <p className="text-sm text-cosmic-800/80 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
           5. OUR APPROACH (Holistic Methodology)
      ========================================================= */}
      <section className="py-20 lg:py-24 bg-ivory-100 border-t border-ivory-300/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-gold-700 mb-2">
              Methodology
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cosmic-900 mb-4">
              Our Consultative Approach
            </h2>
            <p className="text-base sm:text-lg text-cosmic-800/80">
              We believe in a holistic, personalized approach to astrology and Vastu guidance. Every client receives:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Detailed Birth Chart Analysis',
                description: 'Comprehensive study of planetary placements, Vimshottari dashas, and current Gochar transits specific to your exact birth time.',
              },
              {
                title: 'Personalized Consultations',
                description: 'Private one-on-one sessions addressing your core inquiries across career, marriage, health, and finance without generic templates.',
              },
              {
                title: 'Practical Remedies',
                description: 'Actionable Vedic remedies, gem guidance, mantra sadhana, and non-destructive Vastu adjustments that fit modern urban life.',
              },
              {
                title: 'Ongoing Support',
                description: 'Follow-up assistance and remedy tracking to make sure you achieve tangible improvements and spiritual equilibrium.',
              },
              {
                title: '100% Confidential Service',
                description: 'Complete privacy and discretion for all shared birth information, familial matters, and business consultation records.',
              },
              {
                title: 'Rational & Transparent Insights',
                description: 'Logical explanations combining ancient mathematical astronomy with compassionate, demystified interpretations.',
              },
            ].map((approach, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
                className="bg-white rounded-2xl border border-gold-500/25 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-cosmic-900 text-gold-400 font-display font-bold flex items-center justify-center text-xs">
                    0{index + 1}
                  </div>
                  <h3 className="font-display text-lg font-bold text-cosmic-900">{approach.title}</h3>
                </div>
                <p className="text-sm text-cosmic-800/80 leading-relaxed pl-11">
                  {approach.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
           6.  MISSION STATEMENT (Cosmic CTA)
      ========================================================= */}
      <section className="py-20 lg:py-24 bg-cosmic-900 celestial-grid-bg text-white border-t border-gold-500/30 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our  Mission
            </h2>
            <blockquote className="font-editorial italic text-xl sm:text-2xl text-ivory-200 leading-relaxed mb-8 max-w-3xl mx-auto">
              "To empower individuals with authentic Vedic wisdom, helping them make informed life decisions and cultivate prosperous, harmonious spaces while honoring the  traditions of the Rishis."
            </blockquote>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="gold-btn font-bold text-base px-8 py-4 rounded-2xl shadow-gold-glow cursor-pointer"
              >
                Book a Consultation • FREE 15 Min
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <BookingModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        reason="About Page - Book a Consultation"
      />
    </div>
  );
}
