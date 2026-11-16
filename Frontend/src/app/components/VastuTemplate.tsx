import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CheckCircle2, XCircle, Compass, Star, Lightbulb, Wind, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface VastuTip {
  category: 'do' | 'dont';
  text: string;
}

interface VastuTemplateProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
  tips: VastuTip[];
  planetInfluence?: {
    planet: string;
    description: string;
  };
  directions?: string[];
  benefits?: string[];
  elements?: {
    primary: string;
    secondary?: string;
    description: string;
  };
  colors?: {
    recommended: string[];
    avoid: string[];
  };
  remedies?: string[];
}

export function VastuTemplate({
  title,
  description,
  imageUrl,
  icon,
  tips,
  planetInfluence,
  directions,
  benefits,
  elements,
  colors,
  remedies,
}: VastuTemplateProps) {
  const navigate = useNavigate();
  const dos = tips.filter((tip) => tip.category === 'do');
  const donts = tips.filter((tip) => tip.category === 'dont');

  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-24 bg-cosmic-900 celestial-grid-bg text-white overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-xs font-medium uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span> Vastu Shastra</span>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/20 to-cosmic-800 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-6 text-gold-300">
              {icon}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              {title}
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-3xl mx-auto italic leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Image Showcase */}
          <div className="mb-14 relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-gold-card">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-80 sm:h-96 md:h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950/80 via-transparent to-transparent flex items-end p-8">
              <div className="text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-1">Architectural Alignment</p>
                <h3 className="font-display text-2xl font-bold">{title} Energy Harmony</h3>
              </div>
            </div>
          </div>

          {/* Elements & Directions Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Directions */}
            {directions && directions.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gold-500/30 shadow-gold-card">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold-500/20">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-cosmic-900">Auspicious Directions</h3>
                    <p className="text-xs text-cosmic-600">Optimal magnetic and solar alignment</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {directions.map((direction, index) => (
                    <div
                      key={index}
                      className="bg-ivory-100/70 border border-gold-500/20 p-3.5 rounded-xl text-center font-display font-medium text-cosmic-900 text-sm shadow-xs"
                    >
                      <span className="text-gold-600 mr-1.5 font-bold">✦</span> {direction}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Elements */}
            {elements && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gold-500/30 shadow-gold-card">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold-500/20">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600">
                    <Wind className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-cosmic-900">Pancha Mahabhuta Element</h3>
                    <p className="text-xs text-cosmic-600">Elemental balance and flow</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-ivory-100/70 border border-gold-500/20">
                    <span className="text-sm font-semibold text-cosmic-700">Primary Element:</span>
                    <span className="font-display font-bold text-gold-700 text-sm">{elements.primary}</span>
                  </div>
                  {elements.secondary && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-ivory-100/70 border border-gold-500/20">
                      <span className="text-sm font-semibold text-cosmic-700">Secondary Element:</span>
                      <span className="font-display font-bold text-cosmic-900 text-sm">{elements.secondary}</span>
                    </div>
                  )}
                  <p className="text-cosmic-700 text-sm leading-relaxed mt-2 p-2">
                    {elements.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Do's and Don'ts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Do's */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-500/30 shadow-gold-card">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-500/20">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-emerald-800">Auspicious Practices (Do's)</h3>
                  <p className="text-xs text-emerald-600">Attract positive pranic vitality</p>
                </div>
              </div>
              <ul className="space-y-3.5">
                {dos.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-500/10"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-cosmic-800 text-sm leading-relaxed">{tip.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Don'ts */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-rose-500/30 shadow-gold-card">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-rose-500/20">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-500/30 flex items-center justify-center text-rose-600">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-rose-800">Vastu Doshas to Avoid (Don'ts)</h3>
                  <p className="text-xs text-rose-600">Prevent energy drain and blockages</p>
                </div>
              </div>
              <ul className="space-y-3.5">
                {donts.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/50 border border-rose-500/10"
                  >
                    <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-cosmic-800 text-sm leading-relaxed">{tip.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Planet Influence */}
          {planetInfluence && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gold-500/30 shadow-gold-card mb-12">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold-500/20">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-cosmic-900">Planetary Lordship & Graha Resonance</h3>
                  <p className="text-xs text-cosmic-600">Celestial planetary alignment</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-ivory-100/70 border border-gold-500/20 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">Ruling Planet</span>
                <h4 className="font-display text-xl font-bold text-cosmic-900 mt-0.5">
                  {planetInfluence.planet}
                </h4>
              </div>
              <p className="text-cosmic-700 leading-relaxed text-sm sm:text-base">
                {planetInfluence.description}
              </p>
            </div>
          )}

          {/* Colors */}
          {colors && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gold-500/30 shadow-gold-card mb-12">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold-500/20">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-cosmic-900">Vedic Color Vibrations</h3>
                  <p className="text-xs text-cosmic-600">Color harmony according to elemental nature</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-500/20">
                  <h4 className="font-display font-bold text-emerald-800 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" /> Auspicious Colors
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {colors.recommended.map((color, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-white text-emerald-800 border border-emerald-500/30 rounded-full text-xs font-semibold shadow-xs"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-500/20">
                  <h4 className="font-display font-bold text-rose-800 mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-600" /> Inauspicious Colors to Avoid
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {colors.avoid.map((color, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-white text-rose-800 border border-rose-500/30 rounded-full text-xs font-semibold shadow-xs"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Benefits */}
          {benefits && benefits.length > 0 && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gold-500/30 shadow-gold-card mb-12">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold-500/20">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-cosmic-900">Life Benefits of Vastu Alignment</h3>
                  <p className="text-xs text-cosmic-600">Manifesting peace, vitality, and wealth</p>
                </div>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-ivory-100/60 border border-gold-500/20"
                  >
                    <div className="w-2 h-2 bg-gold-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-cosmic-800 text-sm leading-relaxed">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Remedies */}
          {remedies && remedies.length > 0 && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gold-500/30 shadow-gold-card mb-12">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold-500/20">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-cosmic-900">Corrective Vedic Remedies (Without Demolition)</h3>
                  <p className="text-xs text-cosmic-600">Practical astrological & elemental rectifications</p>
                </div>
              </div>
              <ul className="space-y-3.5">
                {remedies.map((remedy, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-ivory-100/60 border border-gold-500/20"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gold-500/20 border border-gold-500/30 flex items-center justify-center flex-shrink-0 text-gold-700 font-display font-bold text-xs">
                      {index + 1}
                    </div>
                    <span className="text-cosmic-800 text-sm leading-relaxed mt-0.5">{remedy}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Consultation CTA Card */}
          <div className="rounded-3xl bg-cosmic-900 celestial-grid-bg text-white p-8 sm:p-12 border border-gold-500/30 shadow-gold-card text-center relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
            <h3 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Need a Custom Vastu Blueprint for Your Property?
            </h3>
            <p className="font-editorial text-lg sm:text-xl text-ivory-200/90 max-w-2xl mx-auto italic mb-8">
              Consult with Pandit Pranav Shastri for an in-depth room-by-room orientation report tailored to your birth chart.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="gold-btn px-8 py-4 rounded-full font-display font-semibold text-sm shadow-gold-glow inline-flex items-center gap-2"
            >
              <span>Book Expert Vastu Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
