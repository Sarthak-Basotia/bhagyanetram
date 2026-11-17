import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Clock, Send, MessageCircle, Sparkles, 
  CheckCircle2, HelpCircle, Copy, Check, Tag, Compass, Sun, 
  ShieldCheck, Flame, Gift, ArrowRight 
} from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import logoImage from 'figma:asset/d5457f2df4c5864ece0203437258a94768a0cf00.png';
import { submitConsultationBooking } from '../../../api/publicContentApi';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Combined Vastu + Energy Mastery Visit (20% Off)',
    propertyType: 'Home / Apartment / Villa',
    city: 'Prayagraj',
    preferredDate: '',
    couponCode: 'VASTU20',
    message: '',
  });

  const [copiedCode, setCopiedCode] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const handleCopyCode = (code = 'VASTU20') => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleSelectVoucherService = (serviceName: string) => {
    setFormData(prev => ({ 
      ...prev, 
      service: serviceName, 
      couponCode: 'VASTU20' 
    }));
    const formElement = document.getElementById('inquiry-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToPolicy) {
      alert('Please agree to the Terms & Conditions and Privacy Policy to proceed.');
      return;
    }
    try {
      await submitConsultationBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        services: [formData.service || 'Vastu Site Visit'],
        date: formData.preferredDate || undefined,
        message: `Property: ${formData.propertyType} in ${formData.city}. Code: ${formData.couponCode}. Notes: ${formData.message || 'None'}`,
        source: 'contact_page',
      });
    } catch (err) {
      console.warn('Inquiry submission fallback warning:', err);
    }
    setSubmitted(true);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Namaste BhagyaNetram! I would like to inquire about ${formData.service} with the 20% OFF offer (Code: ${formData.couponCode}) for my property (${formData.propertyType}) in ${formData.city || 'Prayagraj'}. Name: ${formData.name || 'Devotee'}, Contact: ${formData.phone || 'Provided on site'}.`
    );
    window.open(`https://wa.me/917905755326?text=${text}`, '_blank');
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-gold-600" />,
      title: 'Direct Tele-Consultation',
      details: '+91 79057 55326',
      subdetails: 'Mon - Sat: 9:00 AM - 7:00 PM IST',
    },
    {
      icon: <Mail className="w-6 h-6 text-gold-600" />,
      title: 'Sacred Desk Email',
      details: 'contact@bhagyanetram.com',
      subdetails: 'Guaranteed reply within 24 hours',
    },
    {
      icon: <MapPin className="w-6 h-6 text-gold-600" />,
      title: 'Spiritual Center',
      details: 'Prayagraj, Uttar Pradesh, India',
      subdetails: 'On-Site Visits & Pan-India Coverage',
    },
    {
      icon: <Clock className="w-6 h-6 text-gold-600" />,
      title: 'Consultation Hours',
      details: 'Mon - Sat: 9:00 AM - 9:00 PM',
      subdetails: 'Sunday: Prior Appointment Only',
    },
  ];

  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title>Contact & Vastu Vouchers | BhagyaNetram — Flat 20% Off Vastu Visits</title>
        <meta 
          name="description" 
          content="Claim Flat 20% OFF on On-Site Vastu Visits & Energy Audits across Prayagraj & Pan-India. Use Code VASTU20. Book your Vedic consultation with Pandit Pranav Shastri." 
        />
        <link rel="canonical" href="https://bhagyanetram.com/contact" />
      </Helmet>

      {/* =========================================================
           1. HERO SECTION (Cosmic Dark + Privilege Voucher Ribbon)
      ========================================================= */}
      <section className="relative py-20 lg:py-28 bg-cosmic-900 celestial-grid-bg text-white overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-80 h-80 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-xs font-medium uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Connect With Sacred Guidance & Exclusive Privileges</span>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-white p-2 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-6">
              <img 
                src={logoImage} 
                alt="Bhagyanetram Logo" 
                className="w-full h-full object-contain"
              />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Contact <span className="gold-gradient-text">BhagyaNetram</span>
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-3xl mx-auto italic leading-relaxed mb-8">
              Harmonize your space and awaken your destiny. Schedule your personal astrology consultation or claim an exclusive privilege on our renowned on-site Vastu &amp; energy audits.
            </p>

            {/* Exclusive Privilege Voucher Callout Ribbon */}
            <div className="max-w-3xl mx-auto bg-cosmic-950/80 border-2 border-gold-500/50 rounded-2xl p-4 sm:p-5 shadow-gold-glow relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 bg-saffron-500 text-cosmic-950 text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-xs">
                Limited Privilege
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-saffron-500 text-cosmic-950 flex flex-col items-center justify-center shrink-0 shadow-md">
                    <span className="font-display text-xl font-extrabold leading-none">20%</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">OFF</span>
                  </div>
                  <div>
                    <h2 className="font-display text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <span>Vastu &amp; Energy Visit Privilege Offer</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-ivory-200/80 mt-0.5">
                      Flat 20% OFF on Residential &amp; Commercial On-Site Audits (Prayagraj &amp; Pan-India).
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-end shrink-0 w-full sm:w-auto">
                  <button 
                    type="button"
                    onClick={() => handleCopyCode('VASTU20')}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-cosmic-900 border border-dashed border-gold-500 text-gold-300 font-mono text-xs font-bold hover:bg-gold-500/10 transition cursor-pointer"
                    title="Click to copy voucher code"
                  >
                    <span>Code: VASTU20</span>
                    {copiedCode ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-gold-400" />
                    )}
                  </button>
                  <span className="text-[11px] text-emerald-400 mt-1 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{copiedCode ? 'Code copied to clipboard!' : 'Auto-applied at booking'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-ivory-200/75">
              <span className="flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-gold-400" /> Free 15-Min Initial Discovery
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold-400" /> 100% Non-Demolition Remedies
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-gold-400" /> Prayagraj &amp; Pan-India Visits
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
           2. CONTACT QUICK INFO CARDS
      ========================================================= */}
      <section className="py-14 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-2xl p-6 text-center border border-gold-500/30 shadow-gold-card hover:shadow-xl transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-4">
                      {info.icon}
                    </div>
                    <h3 className="font-display text-lg font-bold text-cosmic-900 mb-1">{info.title}</h3>
                    <p className="font-medium text-cosmic-800 text-sm mb-1">{info.details}</p>
                  </div>
                  <p className="text-xs text-cosmic-500 pt-3 border-t border-gold-500/10 mt-3">{info.subdetails}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
           3. FEATURED VOUCHERS & OFFERS SHOWCASE (From Voucher_Page.html)
      ========================================================= */}
      <section id="vouchers" className="py-16 sm:py-24 bg-ivory-100 ivory-sacred-bg border-y border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/35 text-gold-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Exclusive 20% Privilege Vouchers</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cosmic-900 mb-4">
              On-Site Vastu Visits &amp; Energy Audits
            </h2>
            <p className="text-cosmic-800/85 text-base sm:text-lg leading-relaxed">
              Every physical space carries subtle vibrational imprints that directly affect your peace, prosperity, and health. Choose your specialized on-site or energy audit below and enjoy an instant <strong className="text-cosmic-950 font-bold">Flat 20% Privilege Discount</strong> with Code <code className="bg-gold-500/15 px-2 py-0.5 rounded text-gold-800 font-bold">VASTU20</code>.
            </p>

            {/* Voucher Status Pill */}
            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 bg-white px-5 py-2.5 rounded-full shadow-md border border-gold-500/40">
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cosmic-900">
                <Tag className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Privilege Code:</span>
                <button
                  type="button"
                  onClick={() => handleCopyCode('VASTU20')}
                  className="font-mono text-gold-800 font-bold bg-gold-500/15 hover:bg-gold-500/25 px-2.5 py-0.5 rounded border border-gold-500/40 transition cursor-pointer flex items-center gap-1 text-xs"
                  title="Click to copy code"
                >
                  <span>VASTU20</span>
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-gold-600" />}
                </button>
              </span>
              <span className="hidden sm:inline text-gold-500/40">•</span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                20% OFF ACTIVE • CUSTOM RATES ON WHATSAPP
              </span>
            </div>
          </div>

          {/* 3 Specialized Visit Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-6">
            
            {/* Card 1: Comprehensive Vastu Visit */}
            <div className="bg-white rounded-3xl border border-gold-500/30 p-7 sm:p-8 shadow-gold-card hover:shadow-xl hover:border-gold-500 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-cosmic-900 text-gold-400 border border-gold-500/30 flex items-center justify-center text-xl shadow-xs shrink-0">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold tracking-wide border border-emerald-200">
                    20% OFF • VASTU20
                  </span>
                </div>

                <div className="min-h-[3.75rem] flex items-center mb-2">
                  <h3 className="font-display text-2xl font-bold text-cosmic-900 leading-snug">
                    Comprehensive Vastu Visit
                  </h3>
                </div>
                <p className="text-sm text-cosmic-700 mb-6 leading-relaxed min-h-[4.25rem]">
                  Complete directional, architectural &amp; 16-zone Vastu Shastra evaluation for homes, flats, corporate offices, and commercial plots.
                </p>

                {/* WhatsApp Rates Box */}
                <div className="bg-ivory-50 rounded-2xl p-4 mb-6 border border-gold-500/30 min-h-[5.5rem] flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                    <MessageCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>Inquire on WhatsApp for Custom Rates</span>
                  </div>
                  <p className="text-xs text-cosmic-600 mt-1 leading-relaxed">
                    Includes <strong className="text-cosmic-900 font-semibold">Flat 20% OFF</strong> tailored to your property dimensions and location.
                  </p>
                </div>

                <ul className="space-y-3 text-sm text-cosmic-800 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span><strong>16-Zone &amp; Panchatatva (5 Elements)</strong> balance mapping</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span><strong>Mukhya Dwar (Main Entrance)</strong> &amp; Brahmasthan energy check</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>Kitchen, Master Bedroom, Puja Room &amp; Cash Locker placement</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span><strong>100% Non-Demolition Remedies</strong> (colors, metals, yantras &amp; shifts)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>Detailed Written Vastu Report &amp; Post-Visit Guidance</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-gold-500/15">
                <button
                  type="button"
                  onClick={() => {
                    const text = encodeURIComponent(
                      "Namaste BhagyaNetram! Please share property rates for a Comprehensive Vastu Visit with the 20% OFF offer (Code: VASTU20)."
                    );
                    window.open(`https://wa.me/917905755326?text=${text}`, '_blank');
                  }}
                  className="w-full py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp for Property Rates</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectVoucherService('Comprehensive Vastu Visit (20% Off)')}
                  className="w-full py-2.5 px-4 rounded-xl bg-ivory-100 hover:bg-ivory-200 text-cosmic-900 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer border border-gold-500/25"
                >
                  <span>Apply 20% Off in Form</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-600" />
                </button>
              </div>
            </div>

            {/* Card 2: Combined Vastu + Energy Mastery Visit (Featured Most Chosen) */}
            <div className="bg-cosmic-900 text-white rounded-3xl border-2 border-gold-500 p-7 sm:p-8 shadow-gold-glow flex flex-col justify-between relative lg:-translate-y-3 z-10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full gold-gradient-bg text-cosmic-950 text-xs font-black uppercase tracking-wider shadow-gold-glow border border-gold-200 whitespace-nowrap z-20">
                ★ Most Chosen • Complete Spatial Harmony
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-5 mt-1 sm:mt-2">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400/25 to-saffron-600/25 text-gold-300 border border-gold-400/50 flex items-center justify-center text-xl shadow-xs shrink-0">
                    <Sun className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-saffron-500 to-amber-500 text-cosmic-950 text-xs font-extrabold tracking-wide shadow-xs">
                    20% OFF + FREE KUNDLI SYNC
                  </span>
                </div>

                <div className="min-h-[3.75rem] flex items-center mb-2">
                  <h3 className="font-display text-2xl font-bold text-white leading-snug">
                    Vastu + Energy Mastery Visit
                  </h3>
                </div>
                <p className="text-sm text-ivory-200/80 mb-6 leading-relaxed min-h-[4.25rem]">
                  Our signature holistic on-site visit combining structural Vastu Shastra, subtle Energy Scanning, and Astro-Vastu alignment.
                </p>

                {/* WhatsApp Rates Box */}
                <div className="bg-cosmic-950/80 rounded-2xl p-4 mb-6 border border-gold-500/40 min-h-[5.5rem] flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-gold-300 font-bold text-sm">
                    <MessageCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Inquire on WhatsApp for Custom Rates</span>
                  </div>
                  <p className="text-xs text-ivory-200/70 mt-1 leading-relaxed">
                    Includes <strong className="text-emerald-400 font-semibold">Flat 20% OFF</strong> + Space Purification + 30-Day Follow-Up.
                  </p>
                </div>

                <ul className="space-y-3 text-sm text-ivory-100/90 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span><strong>Everything in Vastu Visit + Energy Audit</strong> combined</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span><strong>Astro-Vastu Synergy:</strong> Aligning home zones with family Janma Kundlis</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>Geopathic stress, negative energy &amp; EMF hotspot neutralization</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span><strong>Vedic Space Purification</strong> &amp; prosperity activation ritual</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>Priority WhatsApp &amp; Call support during remedy implementation</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-gold-500/25">
                <button
                  type="button"
                  onClick={() => {
                    const text = encodeURIComponent(
                      "Namaste BhagyaNetram! I would like to claim 20% OFF and know property rates for the Combined Vastu + Energy Mastery Visit (Code: VASTU20)."
                    );
                    window.open(`https://wa.me/917905755326?text=${text}`, '_blank');
                  }}
                  className="w-full py-4 px-5 rounded-xl gold-btn font-extrabold text-sm shadow-gold-glow cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-cosmic-950" />
                  <span>Claim 20% OFF on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectVoucherService('Combined Vastu + Energy Mastery Visit (20% Off)')}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-ivory-100 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer border border-white/20"
                >
                  <span>Apply 20% Off in Form</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                </button>
              </div>
            </div>

            {/* Card 3: Energy & Aura Visit */}
            <div className="bg-white rounded-3xl border border-gold-500/30 p-7 sm:p-8 shadow-gold-card hover:shadow-xl hover:border-gold-500 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-cosmic-900 text-gold-400 border border-gold-500/30 flex items-center justify-center text-xl shadow-xs shrink-0">
                    <Flame className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold tracking-wide border border-emerald-200">
                    20% OFF • VASTU20
                  </span>
                </div>

                <div className="min-h-[3.75rem] flex items-center mb-2">
                  <h3 className="font-display text-2xl font-bold text-cosmic-900 leading-snug">
                    Energy &amp; Aura Visit
                  </h3>
                </div>
                <p className="text-sm text-cosmic-700 mb-6 leading-relaxed min-h-[4.25rem]">
                  Focused vibrational &amp; aura cleansing visit to clear stagnant blockages, unexplained heaviness, and frequent domestic or workplace friction.
                </p>

                {/* WhatsApp Rates Box */}
                <div className="bg-ivory-50 rounded-2xl p-4 mb-6 border border-gold-500/30 min-h-[5.5rem] flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                    <MessageCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>Inquire on WhatsApp for Custom Rates</span>
                  </div>
                  <p className="text-xs text-cosmic-600 mt-1 leading-relaxed">
                    Includes <strong className="text-cosmic-900 font-semibold">Flat 20% OFF</strong> for flats, rented properties &amp; workspaces.
                  </p>
                </div>

                <ul className="space-y-3 text-sm text-cosmic-800 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span><strong>Subtle Energy &amp; Chakra Frequency</strong> scanning across all rooms</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>Detection of stagnant emotional imprints &amp; geopathic stress lines</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>Vedic Dhoop, Mantra &amp; Elemental Aura Cleansing protocol</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>Crystal, Copper &amp; Sacred Geometry energy-upliftment placement</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>Daily positive vibration maintenance guide for family members</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-gold-500/15">
                <button
                  type="button"
                  onClick={() => {
                    const text = encodeURIComponent(
                      "Namaste BhagyaNetram! Please share rates for an Energy & Aura Visit with the 20% OFF offer (Code: VASTU20)."
                    );
                    window.open(`https://wa.me/917905755326?text=${text}`, '_blank');
                  }}
                  className="w-full py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp for Property Rates</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectVoucherService('Energy & Aura Visit (20% Off)')}
                  className="w-full py-2.5 px-4 rounded-xl bg-ivory-100 hover:bg-ivory-200 text-cosmic-900 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer border border-gold-500/25"
                >
                  <span>Apply 20% Off in Form</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-600" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
           4. 4-STEP CONSULTATION JOURNEY (From Voucher_Page.html)
      ========================================================= */}
      <section className="py-16 bg-white border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">Simple, Transparent &amp; Sacred</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-cosmic-900 mt-1">
              Your 4-Step Path to Spatial Harmony
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-ivory-50 p-6 rounded-2xl border border-gold-500/25 relative shadow-sm">
              <span className="font-display text-3xl font-black text-gold-600/30 block mb-2">01</span>
              <h3 className="font-display font-bold text-cosmic-900 mb-1.5 text-base">Claim 20% Offer</h3>
              <p className="text-xs text-cosmic-700 leading-relaxed">
                Select your Vastu Visit or Energy Visit with auto-applied code <strong>VASTU20</strong>.
              </p>
            </div>
            <div className="bg-ivory-50 p-6 rounded-2xl border border-gold-500/25 relative shadow-sm">
              <span className="font-display text-3xl font-black text-gold-600/30 block mb-2">02</span>
              <h3 className="font-display font-bold text-cosmic-900 mb-1.5 text-base">Free 15-Min Discovery</h3>
              <p className="text-xs text-cosmic-700 leading-relaxed">
                Discuss your property layout, challenges, and reserve your convenient date.
              </p>
            </div>
            <div className="bg-ivory-50 p-6 rounded-2xl border border-gold-500/25 relative shadow-sm">
              <span className="font-display text-3xl font-black text-gold-600/30 block mb-2">03</span>
              <h3 className="font-display font-bold text-cosmic-900 mb-1.5 text-base">On-Site / Energy Audit</h3>
              <p className="text-xs text-cosmic-700 leading-relaxed">
                Detailed directional mapping, elemental balance, and energy frequency check.
              </p>
            </div>
            <div className="bg-ivory-50 p-6 rounded-2xl border border-gold-500/25 relative shadow-sm">
              <span className="font-display text-3xl font-black text-gold-600/30 block mb-2">04</span>
              <h3 className="font-display font-bold text-cosmic-900 mb-1.5 text-base">Non-Demolition Remedies</h3>
              <p className="text-xs text-cosmic-700 leading-relaxed">
                Actionable written report, metal/color cures, and ongoing guidance during shifts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
           5. INTERACTIVE INQUIRY FORM & WHY CHOOSE US
      ========================================================= */}
      <section id="inquiry-form" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Form (7 columns) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gold-500/30 shadow-gold-card">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Privilege Code {formData.couponCode} Active</span>
                  </div>
                  <h2 className="font-display text-3xl font-bold text-cosmic-900 mb-2">
                    Reserve Visit or Send Sacred Inquiry
                  </h2>
                  <p className="text-cosmic-600 text-sm leading-relaxed">
                    Submit your details below to lock in the 20% discount on visits or request detailed birth chart consultations. We respond discreetly within 24 hours.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-cosmic-900 animate-in fade-in">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-display text-xl font-bold text-emerald-950">Inquiry &amp; 20% Privilege Reserved!</h4>
                        <p className="text-sm text-emerald-900 mt-1 leading-relaxed">
                          Thank you, <strong>{formData.name}</strong>. Your request for <strong>{formData.service}</strong> with Privilege Code <strong>{formData.couponCode}</strong> has been received. Our senior scholar will contact you via phone or WhatsApp shortly.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={handleWhatsAppInquiry}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Confirm Faster on WhatsApp (+91 79057 55326)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setSubmitted(false)}
                            className="px-4 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 font-semibold text-xs hover:bg-emerald-100/50 transition cursor-pointer"
                          >
                            Edit Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">
                          WhatsApp / Mobile Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="rahul@example.com"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                        />
                      </div>

                      <div>
                        <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">
                          Select Service (20% Off Eligible) *
                        </label>
                        <select
                          id="service"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                        >
                          <option value="Combined Vastu + Energy Mastery Visit (20% Off)">Combined Vastu + Energy Mastery Visit (20% Off)</option>
                          <option value="Comprehensive Vastu Visit (20% Off)">Comprehensive Vastu Visit (20% Off)</option>
                          <option value="Energy & Aura Visit (20% Off)">Energy &amp; Aura Visit (20% Off)</option>
                          <option value="Home & Office Vastu Visit (20% Off)">Home &amp; Office Vastu Visit (20% Off)</option>
                          <option value="Personalized Janma Kundli Reading">Personalized Janma Kundli Reading</option>
                          <option value="Ashtakoot Marriage Kundli Matching">Ashtakoot Marriage Kundli Matching</option>
                          <option value="Career & Financial Forecasting">Career &amp; Financial Forecasting</option>
                          <option value="Ratna & Gemstone Guidance">Ratna &amp; Gemstone Guidance</option>
                          <option value="Sacred Yantra & Dosha Remedies">Sacred Yantra &amp; Dosha Remedies</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="propertyType" className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">
                          Property / Space Type
                        </label>
                        <select
                          id="propertyType"
                          value={formData.propertyType}
                          onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                        >
                          <option value="Home / Apartment / Villa">Home / Apartment / Villa</option>
                          <option value="Office / Corporate Workspace">Office / Corporate Workspace</option>
                          <option value="Shop / Showroom / Commercial Space">Shop / Showroom / Commercial Space</option>
                          <option value="Industrial Plot / Factory">Industrial Plot / Factory</option>
                          <option value="New Plot / Under Construction">New Plot / Under Construction</option>
                          <option value="Personal Astrology Inquiry Only">Personal Astrology Inquiry Only</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="city" className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">
                          City / Location *
                        </label>
                        <input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Prayagraj, Varanasi, Lucknow, Delhi..."
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1.5 font-display">
                        Property Details, Birth Coordinates or Key Concerns *
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please share: Property size/approx sq ft, primary concerns (e.g. health, financial growth, relationship peace), or birth coordinates if seeking Kundli analysis..."
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-ivory-50/70 text-cosmic-900 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 resize-none"
                      />
                    </div>

                    {/* Consent & Privacy Policy Checkbox */}
                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="contact-agree-policy"
                        required
                        checked={agreedToPolicy}
                        onChange={(e) => setAgreedToPolicy(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-gold-500/50 text-gold-600 focus:ring-gold-500 cursor-pointer accent-gold-600"
                      />
                      <label htmlFor="contact-agree-policy" className="text-xs text-cosmic-800 leading-snug cursor-pointer select-none">
                        I agree to the{' '}
                        <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-gold-700 underline font-semibold hover:text-gold-800">
                          Terms &amp; Conditions
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gold-700 underline font-semibold hover:text-gold-800">
                          Privacy Policy
                        </Link>
                        .
                      </label>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={handleWhatsAppInquiry}
                        className="flex-1 py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>Inquire Rates on WhatsApp (20% Off)</span>
                      </button>
                      <button
                        type="submit"
                        className="py-4 px-6 rounded-xl gold-btn font-display font-semibold text-sm shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit &amp; Lock 20% Offer</span>
                      </button>
                    </div>

                    <p className="text-xs text-cosmic-500 text-center mt-3">
                      🔒 Strict Vedic secrecy. Your information is never shared with third parties.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Why Consult With Us & WhatsApp Card (5 columns) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              {/* WhatsApp Quick Connect Card */}
              <div className="bg-cosmic-900 celestial-grid-bg text-white rounded-3xl p-8 border border-gold-500/40 shadow-gold-card text-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">Instant WhatsApp Connect</h3>
                <p className="text-ivory-200/90 text-sm leading-relaxed mb-6">
                  Need an urgent consultation, property rate estimate, or quick remedy confirmation? Message our spiritual desk directly on WhatsApp.
                </p>
                <button
                  type="button"
                  onClick={() => window.open('https://wa.me/917905755326', '_blank')}
                  className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-display font-semibold text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (+91 79057 55326)</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="bg-white rounded-3xl p-8 border border-gold-500/30 shadow-gold-card">
                <h3 className="font-display text-xl font-bold text-cosmic-900 mb-6 pb-3 border-b border-gold-500/20 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold-600" />
                  <span>The BhagyaNetram Promise</span>
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      title: '10+ Years Classical Vedic Mastery',
                      description: 'Direct consultations backed by traditional shastric lineage and mathematical chart calculations.',
                    },
                    {
                      title: '100% Non-Demolition Vastu Remedies',
                      description: 'Effective energy balancing using mirrors, metals, crystals, colors, and sacred yantras without structural demolition.',
                    },
                    {
                      title: 'Flat 20% Privilege Guarantee',
                      description: 'Use code VASTU20 to claim exclusive savings on all on-site residential and commercial visits.',
                    },
                    {
                      title: 'Comprehensive Written Audit Report',
                      description: 'Every on-site visit includes a permanent, structured report of findings, directional shifts, and timings.',
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-ivory-100/60 border border-gold-500/20">
                      <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-display font-bold text-cosmic-900 text-sm">{item.title}</h4>
                        <p className="text-xs text-cosmic-600 leading-relaxed mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================
           6. EXTENDED FAQ SECTION (Including Vouchers & Visits)
      ========================================================= */}
      <section className="py-20 bg-ivory-100/70 border-t border-gold-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-700 mb-2 font-display">Clarity &amp; Confidence</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cosmic-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How do I claim the 20% Discount with Code VASTU20?',
                a: 'Simply select any of our eligible On-Site Vastu Visits or Energy Audits in the form above or mention Code VASTU20 when messaging us on WhatsApp (+91 79057 55326). The 20% discount is automatically deducted from your custom property consultation fee.',
              },
              {
                q: 'Do your Vastu remedies require breaking walls or demolition?',
                a: 'Never. BhagyaNetram adheres strictly to traditional non-demolition Vastu remedies. We harmonize directional imbalances and energy blockages using elemental shifts, metal strips, pyramid yantras, colors, mirrors, and sacred spatial purifications.',
              },
              {
                q: 'Do you provide on-site Vastu visits outside Prayagraj?',
                a: 'Yes. While our headquarters are in Prayagraj, Pandit Pranav Shastri and our senior scholars regularly conduct on-site Vastu and energy audits for residential and commercial clients across Uttar Pradesh, Delhi NCR, and pan-India.',
              },
              {
                q: 'What information is needed for an authentic astrology consultation?',
                a: 'For Janma Kundli analysis, we require your exact date of birth, time of birth (preferably from hospital records), and place of birth (city/state). If your exact birth time is uncertain, our scholars perform Birth Time Rectification (BTR).',
              },
              {
                q: 'What does the Free 15-Minute Discovery Call include?',
                a: 'Our complimentary 15-minute discovery call helps understand your core concerns, review your property type or primary planetary questions, and outline the exact roadmap and timeline for your session.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gold-500/30 shadow-gold-card">
                <h3 className="font-display font-bold text-cosmic-900 text-base sm:text-lg mb-2 flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-cosmic-700 text-sm leading-relaxed pl-7.5">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
