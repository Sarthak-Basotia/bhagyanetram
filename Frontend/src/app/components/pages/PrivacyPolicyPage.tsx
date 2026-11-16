import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title>Privacy Policy | Bhagyanetram</title>
        <meta name="description" content="Privacy Policy for BhagyaNetram. Learn how we safeguard your birth details, contact information, and personal consultations." />
        <link rel="canonical" href="https://bhagyanetram.com/privacy-policy" />
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
              <span> Discretion & Trust</span>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500/20 to-cosmic-800 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-6 text-gold-300">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Privacy <span className="gold-gradient-text">Policy</span>
            </h1>
            <p className="font-editorial text-lg text-ivory-200/90 italic">
              Last Updated: 27th September, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Legal Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-gold-card border border-gold-500/30 text-cosmic-800 leading-relaxed font-sans space-y-6">
          <p>
            Welcome to Bhagya Netram ("we," "us," "our," or the "Website"), accessible at https://bhagyanetram.com/. We provide Vedic astrology, Vastu Shastra, and spiritual consultation services. This Privacy Policy outlines how your personal details, birth coordinates, and inquiry data are collected, utilized, and rigorously protected.
          </p>
          <p>
            By accessing our Website or booking a consultation, you consent to the collection and handling of your information in accordance with this Privacy Policy.
          </p>

          <h2 className="font-display text-2xl font-bold text-cosmic-900 mt-8 mb-4 border-b border-gold-500/20 pb-2">
            1. Information We Collect
          </h2>
          <p>We collect information voluntarily provided by you through our contact forms, consultation requests, or direct correspondence:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Contact Data:</strong> Full name, verified email address, and WhatsApp/telephone number.</li>
            <li><strong>Astrological Natal Data:</strong> Exact Date of Birth, Time of Birth, and City/State/Country of Birth necessary to calculate planetary ephemeris houses.</li>
            <li><strong>Vastu Architectural Data:</strong> Property floor plans, cardinal directions, and personal living challenges shared for room-by-room Vastu audits.</li>
          </ul>
          <p>We do <strong>not</strong> store payment card details, bank credentials, or government identity numbers on our servers.</p>

          <h2 className="font-display text-2xl font-bold text-cosmic-900 mt-8 mb-4 border-b border-gold-500/20 pb-2">
            2. How We Use Your Information
          </h2>
          <p>Your data is used exclusively to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Generate customized Janma Kundlis, Ashtakoot matchmaking reports, and Vastu recommendations.</li>
            <li>Coordinate telephonic or video consultation sessions with our senior astrologers.</li>
            <li>Transmit your post-consultation written remedial reports securely.</li>
            <li>Uphold legitimate legal and regulatory compliance.</li>
          </ul>
          <p>We never sell, rent, monetize, or trade your personal information with external advertisers.</p>

          <h2 className="font-display text-2xl font-bold text-cosmic-900 mt-8 mb-4 border-b border-gold-500/20 pb-2">
            3. Data Confidentiality & Protection
          </h2>
          <p>We employ administrative and industry-standard technical measures (SSL/TLS encryption, secure database servers) to safeguard your consultations against unauthorized access. In alignment with  Vedic practitioner ethics, all personal confessions and astrological findings remain strictly private.</p>

          <h2 className="font-display text-2xl font-bold text-cosmic-900 mt-8 mb-4 border-b border-gold-500/20 pb-2">
            4. Contact Us
          </h2>
          <p>For any privacy requests or inquiries regarding your stored information, contact our desk:</p>
          <div className="bg-ivory-100/70 p-5 rounded-2xl border border-gold-500/20 inline-block mt-2">
            <p className="font-semibold text-cosmic-900">BhagyaNetram Spiritual Desk</p>
            <p className="text-sm text-cosmic-700">Email: contact@bhagyanetram.com</p>
            <p className="text-sm text-cosmic-700">Phone: +91 79057 55326</p>
            <p className="text-sm text-cosmic-700">Location: Prayagraj, Uttar Pradesh, India</p>
          </div>
        </div>
      </div>
    </div>
  );
}