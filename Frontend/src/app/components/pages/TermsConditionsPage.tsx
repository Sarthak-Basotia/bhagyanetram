import { Helmet } from 'react-helmet-async';
import { Scale, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title>Terms & Conditions | Bhagyanetram</title>
        <meta name="description" content="Terms and Conditions governing the use of BhagyaNetram astrology, Vastu Shastra, and spiritual consultation services." />
        <link rel="canonical" href="https://bhagyanetram.com/terms-and-conditions" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-24 bg-cosmic-900 celestial-grid-bg text-white text-center overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-xs font-medium uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Dharmic Service Agreement</span>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500/20 to-cosmic-800 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-6 text-gold-300">
              <Scale className="w-8 h-8" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Terms & <span className="gold-gradient-text">Conditions</span>
            </h1>
            <p className="font-editorial text-lg text-ivory-200/90 italic">
              Last Updated: 27th September, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-gold-card border border-gold-500/30 text-cosmic-800 leading-relaxed font-sans space-y-6">
          <p>
            Welcome to Bhagya Netram ("we," "us," "our," or the "Website"), accessible at https://bhagyanetram.com/. These Terms and Conditions govern your engagement with our Vedic astrology, horoscope forecasting, and Vastu Shastra consultation services.
          </p>

          <h2 className="font-display text-2xl font-bold text-cosmic-900 mt-8 mb-4 border-b border-gold-500/20 pb-2">
            1. Nature of Astrological Guidance
          </h2>
          <p>
            Bhagya Netram delivers authentic consultations grounded in classical Parashari, Jaimini, and Vastu Shastra traditions. Astrological interpretations illuminate energetic potentials, planetary cycles, and karmic tendencies.
          </p>
          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 text-amber-950 text-sm leading-relaxed">
            <strong>Advisory Notice:</strong> Vedic astrology consultations are spiritual and holistic in nature. They do not substitute for certified clinical medical diagnosis, qualified legal counsel, or licensed financial planning. Clients retain sovereign free will and responsibility for all life decisions.
          </div>

          <h2 className="font-display text-2xl font-bold text-cosmic-900 mt-8 mb-4 border-b border-gold-500/20 pb-2">
            2. Client Accuracy Responsibilities
          </h2>
          <p>
            The precision of a Janma Kundli reading relies on the veracity of the birth time, date, and geographical coordinates provided. If your birth time is uncertain, please notify the astrologer so that Birth Time Rectification (BTR) may be scheduled prior to prediction analysis.
          </p>

          <h2 className="font-display text-2xl font-bold text-cosmic-900 mt-8 mb-4 border-b border-gold-500/20 pb-2">
            3. Intellectual Property
          </h2>
          <p>
            All custom chart software, calculators, yantra imagery, and educational articles hosted on BhagyaNetram are protected by applicable intellectual property rights and may not be reproduced without written permission.
          </p>

          <h2 className="font-display text-2xl font-bold text-cosmic-900 mt-8 mb-4 border-b border-gold-500/20 pb-2">
            4. Jurisdiction
          </h2>
          <p>
            Any disputes arising from services or website usage shall be governed exclusively by the laws of India and subject to the courts of Prayagraj, Uttar Pradesh.
          </p>

          <h2 className="font-display text-2xl font-bold text-cosmic-900 mt-8 mb-4 border-b border-gold-500/20 pb-2">
            5. Contact Us
          </h2>
          <div className="bg-ivory-100/70 p-5 rounded-2xl border border-gold-500/20 inline-block mt-2">
            <p className="font-semibold text-cosmic-900">BhagyaNetram Spiritual Desk</p>
            <p className="text-sm text-cosmic-700">Email: contact@bhagyanetram.com</p>
            <p className="text-sm text-cosmic-700">Phone: +91 79057 55326</p>
            <p className="text-sm text-cosmic-700">Prayagraj, Uttar Pradesh, India</p>
          </div>
        </div>
      </div>
    </div>
  );
}