import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookingModal } from './BookingModal';
import {
  Star,
  Phone,
  MessageCircle,
  Calendar,
  Sparkles,
  Heart,
  Briefcase,
  Home,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Mail,
  Shield,
  Clock,
  Compass,
  Award,
  Layers,
  Sparkle
} from 'lucide-react';
import { motion } from 'motion/react';
import nidhiJi from '/src/assets/Nidhi-Ji.png';
import panditPranav from '/src/assets/Pandit-Pranav_2.jpeg';
import gargiJi from '/src/assets/Gargi_Ji.jpeg';
import { fetchPublicAstrologers } from '../../api/publicContentApi';
import { fetchPublicReviews } from '../../api/adminApi';


export function HomePage() {
  const navigate = useNavigate();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingReason, setBookingReason] = useState('');
  const [selectedAstrologer, setSelectedAstrologer] = useState<string | null>(null);
  const [activeAstroTab, setActiveAstroTab] = useState<'all' | 'vedic' | 'western' | 'natal'>('all');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleOpenBooking = (reason: string, astrologerName: string | null = null) => {
    setBookingReason(reason);
    setSelectedAstrologer(astrologerName);
    setBookingModalOpen(true);
  };

  // Subtle celestial starfield canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Array<{ x: number; y: number; r: number; alpha: number; delta: number }> = [];

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      stars = Array.from({ length: 65 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        delta: (Math.random() * 0.015 + 0.004) * (Math.random() < 0.5 ? 1 : -1)
      }));
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.alpha += s.delta;
        if (s.alpha > 0.95 || s.alpha < 0.15) s.delta *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 213, 122, ${s.alpha})`;
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(drawStars);
    };

    resizeCanvas();
    drawStars();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const topAstrologers = [
    {
      name: 'Pandit Pranav',
      image: panditPranav,
      specialization: 'Vedic Astrology, Vastu',
      experience: '10 Years Experience',
      languages: 'Hindi, English',
      rating: 4.9,
      reviews: '10K+',
      available: true,
    },
    {
      name: 'Gargi Ji',
      image: gargiJi,
      specialization: 'Palmistry, Astro, Vastu',
      experience: '7 Years Experience',
      languages: 'Hindi',
      rating: 4.9,
      reviews: '2011',
      available: true,
    },
    {
      name: 'Nidhi Ji',
      image: nidhiJi,
      specialization: 'Vedic Astrology, Vastu',
      experience: '7 Years Experience',
      languages: 'Hindi, English',
      rating: 4.9,
      reviews: '3156',
      available: true,
    },
  ];

  const [astrologersList, setAstrologersList] = useState(topAstrologers);

  useEffect(() => {
    fetchPublicAstrologers()
      .then((res) => {
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map((a: any) => {
            let resolvedImg = a.image;
            if (a.image && (a.image.startsWith('data:image/') || a.image.startsWith('http://') || a.image.startsWith('https://'))) {
              resolvedImg = a.image;
            } else if (!resolvedImg || resolvedImg.includes('Pandit-Pranav') || a.name?.includes('Pranav')) {
              resolvedImg = panditPranav;
            } else if (resolvedImg.includes('Gargi_Ji') || resolvedImg.includes('gargi') || a.name?.includes('Gargi')) {
              resolvedImg = gargiJi;
            } else if (resolvedImg.includes('Nidhi-Ji') || resolvedImg.includes('nidhi') || a.name?.includes('Nidhi')) {
              resolvedImg = nidhiJi;
            }
            return {
              ...a,
              image: resolvedImg,
            };
          });
          setAstrologersList(mapped);
        }
      })
      .catch((err) => console.warn('Could not fetch dynamic astrologers:', err));
  }, []);

  const quickActions = [
    {
      title: 'Talk to Astrologer',
      subtitle: 'Get instant guidance',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      action: () => handleOpenBooking('Quick Action - Talk to Astrologer'),
    },
    {
      title: 'Chat with Astrologer',
      subtitle: 'Ask your questions',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      action: () => navigate('/contact'),
    },
    {
      title: 'Free Kundli',
      subtitle: 'Generate birth chart',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="3" x2="21" y2="21" />
          <line x1="21" y1="3" x2="3" y2="21" />
          <polygon points="12,3 21,12 12,21 3,12" />
        </svg>
      ),
      action: () => navigate('/free-kundli'),
    },
    {
      title: 'Daily Horoscope',
      subtitle: 'Know your day',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
        </svg>
      ),
      action: () => navigate('/horoscope'),
    },
  ];

  const freeServices = [
    {
      title: 'Match Making',
      route: '/kundli-matching',
      description: 'Check compatibility for marriage',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: 'Panchang',
      route: '/panchang',
      description: 'Daily auspicious timings',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Tarot Reading',
      route: '/tarot',
      description: 'Card-based predictions',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="6" y="3" width="12" height="18" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8l1.2 2.4 2.6.4-1.9 1.8.5 2.6L12 14l-2.4 1.2.5-2.6-1.9-1.8 2.6-.4L12 8z" />
        </svg>
      ),
    },
    {
      title: 'Birth Chart',
      route: '/birth-chart',
      description: 'Complete natal chart analysis',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="3" y1="12" x2="21" y2="12" />
        </svg>
      ),
    },
    {
      title: 'Palmistry',
      route: '/palmistry',
      description: 'Hand reading insights',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      ),
    },
    {
      title: 'Numerology',
      route: '/numerology',
      description: 'Number-based predictions',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      ),
    },
    {
      title: 'Gemstone Guide',
      route: '/gem-guide',
      description: 'Lucky stones for you',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <polygon points="6,4 18,4 22,10 12,21 2,10" />
          <line x1="2" y1="10" x2="22" y2="10" />
          <polyline points="6,4 12,10 18,4" />
        </svg>
      ),
    },
    {
      title: 'Planet Transit',
      route: '/planet-chart',
      description: 'Current planetary positions',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-25 12 12)" />
        </svg>
      ),
    },
    {
      title: 'Vastu Tips',
      route: '/vastu-main-door',
      description: 'Home harmony solutions',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      title: 'Zodiac Signs',
      route: '/zodiac',
      description: 'Know your sun sign traits',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
    {
      title: 'Festivals',
      route: '/festivals',
      description: 'Upcoming Hindu festivals',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-2.5 3-4 5.5-4 8a4 4 0 008 0c0-2.5-1.5-5-4-8z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 17c2.5 2 11.5 2 14 0l-2 4H7l-2-4z" />
        </svg>
      ),
    },
    {
      title: 'Yantra Meditation',
      route: '/yantra-meditation',
      description: ' geometry for peace',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <polygon points="12,3 21,19 3,19" />
          <polygon points="12,21 21,5 3,5" />
        </svg>
      ),
    },
  ];

  const categories = [
    {
      title: 'Love & Relationship',
      consultations: '2,847',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: 'Marriage & Kundli',
      consultations: '2,563',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Career Guidance',
      consultations: '8,234',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Business & Finance',
      consultations: '9,876',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: 'Vastu Consultation',
      consultations: '4,329',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      title: 'Spiritual Guidance',
      consultations: '1,092',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m0-12.728l1.414 1.414m9.9 9.9l1.414 1.414" />
        </svg>
      ),
    },
  ];

  const defaultTestimonials = [
    {
      name: 'Sheeshpal Singh',
      initials: 'SS',
      location: 'Mumbai',
      text: 'The Vastu consultation changed my life completely. Within 3 months of implementing the suggestions, my business started flourishing and family relationships improved dramatically.',
      rating: 5,
      date: '2 days ago',
    },
    {
      name: 'Shanti Agarwal',
      initials: 'SA',
      location: 'Ahmedabad',
      text: "Pranav Bhaiya's birth chart reading was incredibly accurate. The remedies he suggested for my career have shown results faster than I expected. Highly recommend!",
      rating: 5,
      date: '5 days ago',
    },
    {
      name: 'Kavita Reddy',
      initials: 'KR',
      location: 'Gurugram',
      text: 'I was skeptical at first, but the predictions about my relationship were spot on. The guidance helped me make the right decision. Forever grateful!',
      rating: 5,
      date: '1 week ago',
    },
  ];

  const [testimonials, setTestimonials] = useState<any[]>(defaultTestimonials);

  useEffect(() => {
    fetchPublicReviews()
      .then((res) => {
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setTestimonials(res.data);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch public reviews, using defaults:', err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-950 font-sans selection:bg-gold-500 selection:text-cosmic-900">
      <Helmet>
        <title>BHAGYANETRAM — Vastu &amp; Astrology | Your Life's Guiding Light</title>
        <meta
          name="description"
          content="Get instant guidance from India's top astrologers. Talk to experts in Vedic Astrology, Tarot, Numerology, and Vastu Shastra."
        />
        <link rel="canonical" href="https://bhagyanetram.com/" />
      </Helmet>

      {/* =========================================================
           1. HERO SECTION (Deep Cosmic Midnight +  Geometry)
      ========================================================= */}
      <section id="home" className="relative bg-cosmic-900 celestial-grid-bg text-white overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle Cosmic Starfield Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-65" />

        {/* Rotating  Zodiac & Sri Yantra Mandala Backdrop */}
        <div className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 w-[560px] h-[560px] lg:w-[740px] lg:h-[740px] opacity-20">
          <svg className="w-full h-full animate-spin-slow text-gold-400" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">S
            <circle cx="300" cy="300" r="290" stroke="currentColor" strokeWidth="1" />
            <circle cx="300" cy="300" r="260" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle cx="300" cy="300" r="215" stroke="currentColor" strokeWidth="1" />
            <circle cx="300" cy="300" r="165" stroke="currentColor" strokeWidth="1.2" />
            <g stroke="currentColor" strokeWidth="0.9">
              <line x1="300" y1="10" x2="300" y2="590" />
              <line x1="10" y1="300" x2="590" y2="300" />
              <line x1="95" y1="95" x2="505" y2="505" />
              <line x1="505" y1="95" x2="95" y2="505" />
              <line x1="155" y1="48" x2="445" y2="552" />
              <line x1="48" y1="155" x2="552" y2="445" />
              <line x1="445" y1="48" x2="155" y2="552" />
              <line x1="552" y1="155" x2="48" y2="445" />
            </g>
            <polygon points="300,75 495,412 105,412" stroke="currentColor" strokeWidth="1.4" />
            <polygon points="300,525 495,188 105,188" stroke="currentColor" strokeWidth="1.4" />
            <polygon points="300,125 452,388 148,388" stroke="currentColor" strokeWidth="1" />
            <polygon points="300,475 452,212 148,212" stroke="currentColor" strokeWidth="1" />
            <circle cx="300" cy="300" r="45" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Main Hero Copy */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/35 text-gold-300 text-xs sm:text-sm font-medium tracking-wide mb-6">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
                <span>Bhagyanetram</span>
                <span className="text-gold-500/60">•</span>
                <span className="italic font-editorial text-base text-gold-200">Your Life's Guiding Light</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.45rem] font-bold leading-[1.15] tracking-tight text-white mb-6">
                Confused About Your <span className="gold-gradient-text">Life Decisions?</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-ivory-200/85 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
                Get instant guidance from India's top astrologers. Talk to experts in Vedic Astrology, Tarot, Numerology, and Vastu Shastra.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenBooking('Hero Banner - Get FREE Consultation')}
                  className="w-full sm:w-auto gold-btn font-bold text-base px-8 py-4 rounded-2xl shadow-gold-glow inline-flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-cosmic-950" />
                  <span>Get FREE Consultation</span>
                  <ArrowRight className="w-5 h-5 text-cosmic-950" />
                </button>

                {/* <a
                  href="#astrologers"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl border border-gold-500/40 bg-cosmic-800/50 hover:bg-cosmic-800 text-gold-200 font-semibold text-base transition-all inline-flex items-center justify-center gap-2"
                >
                  <span>Top Online Astrologers</span>
                </a> */}
              </div>
            </motion.div>

            {/* Right  Celestial Emblem Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-md rounded-3xl glass-dark p-7 sm:p-8 shadow-cosmic-card text-center">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cosmic-950 border border-gold-500/50 text-[11px] uppercase tracking-[0.2em] text-gold-300 font-semibold shadow-md">
                  Bhagyanetram
                </div>

                {/* Pandit Pranav Portrait */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto my-3 rounded-2xl overflow-hidden border-2 border-gold-500/60 shadow-gold-glow group">
                  <img
                    src="/Pandit_Pranav_2.jpeg"
                    alt="Pandit Pranav Shastri"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950/80 via-transparent to-transparent flex items-end justify-center pb-2.5">
                    <span className="text-xs font-display font-bold text-gold-300 tracking-wider">Pandit Pranav Ji</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gold-500/20 text-xs">
                  <div>
                    <span className="block font-display font-bold text-gold-400 text-base">10+</span>
                    <span className="text-ivory-200/75">Yrs Exp</span>
                  </div>
                  <div className="border-x border-gold-500/20">
                    <span className="block font-display font-bold text-gold-400 text-base">10k+</span>
                    <span className="text-ivory-200/75">Consults</span>
                  </div>
                  <div>
                    <span className="block font-display font-bold text-gold-400 text-base">4.9/5</span>
                    <span className="text-ivory-200/75">Rating</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 4 Quick-Action Feature Cards */}
          <div className="mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {quickActions.map((action, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={action.action}
                whileHover={{ y: -4 }}
                className="group text-left glass-dark rounded-2xl p-5 sm:p-6 transition-all duration-300 flex items-center gap-4 cursor-pointer"
              >
                <div className="w-13 h-13 shrink-0 rounded-2xl bg-gradient-to-br from-gold-400/25 to-gold-600/10 border border-gold-500/40 flex items-center justify-center text-gold-300 group-hover:scale-105 transition-transform p-3">
                  {action.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-gold-300 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-ivory-200/75 mt-0.5">{action.subtitle}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
           2. TOP ONLINE ASTROLOGERS (Warm Temple Parchment Section)
      ========================================================= */}
      <section id="astrologers" className="py-20 lg:py-24 bg-ivory-100 ivory--bg border-b border-ivory-300/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-gold-700 font-semibold text-xs uppercase tracking-[0.22em] mb-3">
              <span className="w-6 h-px bg-gold-600" />
              <span>Verified Vedic Masters</span>
              <span className="w-6 h-px bg-gold-600" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-cosmic-900">
              Top Online Astrologers
            </h2>
            <p className="mt-3 text-base sm:text-lg text-cosmic-800/80">
              Connect with certified experts for personalized guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
            {astrologersList.map((astrologer, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-white rounded-3xl border border-gold-500/30 p-7 shadow-gold-card hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-gold-600 via-gold-400 to-saffron-600" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="inline-flex items-center gap-1.5 bg-ivory-100 border border-gold-500/30 px-3 py-1 rounded-full text-sm font-bold text-cosmic-900">
                      <Star className="w-4 h-4 text-gold-500 fill-current" />
                      <span>{astrologer.rating}</span>
                      <span className="text-xs font-medium text-cosmic-700/70">({astrologer.reviews})</span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Verified
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-gold-400 shrink-0 shadow-md bg-cosmic-900 flex items-center justify-center">
                      <img
                        src={astrologer.image}
                        alt={astrologer.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const name = (astrologer.name || '').toLowerCase();
                          if (name.includes('gargi')) e.currentTarget.src = gargiJi;
                          else if (name.includes('nidhi')) e.currentTarget.src = nidhiJi;
                          else e.currentTarget.src = panditPranav;
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-cosmic-900 group-hover:text-gold-700 transition-colors">
                        {astrologer.name}
                      </h3>
                      <p className="text-sm font-semibold text-saffron-600 mt-0.5">
                        {astrologer.specialization}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-ivory-200 text-sm text-cosmic-800">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-gold-600 shrink-0" />
                      <span>{astrologer.experience}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MessageCircle className="w-4 h-4 text-gold-600 shrink-0" />
                      <span>{astrologer.languages}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenBooking(`Consultation Request — ${astrologer.name}`, astrologer.name)}
                  className="mt-7 w-full py-3.5 px-5 rounded-xl bg-cosmic-900 hover:bg-cosmic-800 text-gold-300 font-semibold text-sm border border-gold-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Consult Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
           3. COMPREHENSIVE ASTROLOGY SERVICES (Authentic Kundli Charts)
      ========================================================= */}
      <section id="horoscope" className="py-20 lg:py-24 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-cosmic-900 leading-snug">
              Bhagyanetram Provides Comprehensive And All-Inclusive Astrology Services
            </h2>
            <p className="mt-3 text-base sm:text-lg text-cosmic-800/80">
              Some of the services we provide are:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service 1: Free Kundli (With Authentic North-Indian 12-House Kundli Diagram) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl border border-gold-500/35 p-7 sm:p-8 shadow-gold-card flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="w-full h-48 rounded-2xl bg-cosmic-900 p-3 mb-6 flex items-center justify-center border border-gold-500/30 relative overflow-hidden">
                  <svg viewBox="0 0 240 160" className="w-full h-full max-w-[230px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="10" width="200" height="140" rx="4" stroke="#D4AF37" strokeWidth="1.5" fill="rgba(212,175,55,0.05)" />
                    <line x1="20" y1="10" x2="220" y2="150" stroke="#D4AF37" strokeWidth="1.2" />
                    <line x1="220" y1="10" x2="20" y2="150" stroke="#D4AF37" strokeWidth="1.2" />
                    <polygon points="120,10 220,80 120,150 20,80" stroke="#F0D57A" strokeWidth="1.4" />
                    <g fill="#F0D57A" fontFamily="Cinzel, serif" fontSize="10" fontWeight="700" textAnchor="middle">
                      <text x="120" y="46">1</text>
                      <text x="72" y="27">2</text>
                      <text x="40" y="48">3</text>
                      <text x="74" y="83">4</text>
                      <text x="40" y="120">5</text>
                      <text x="72" y="141">6</text>
                      <text x="120" y="122">7</text>
                      <text x="168" y="141">8</text>
                      <text x="200" y="120">9</text>
                      <text x="166" y="83">10</text>
                      <text x="200" y="48">11</text>
                      <text x="168" y="27">12</text>
                    </g>
                  </svg>
                </div>

                <h3 className="font-display text-2xl font-bold text-cosmic-900 mb-4">
                  Free Kundli
                </h3>
                <ul className="space-y-3 text-cosmic-800 text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron-600 mt-2 shrink-0" />
                    <span>Find out your destiny</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron-600 mt-2 shrink-0" />
                    <span>Inspect the positions of celestial bodies</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron-600 mt-2 shrink-0" />
                    <span>Enable yourself to make better decisions</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => navigate('/free-kundli')}
                className="mt-7 w-full py-3 rounded-xl border border-gold-600/40 bg-ivory-100 hover:bg-gold-500 hover:text-cosmic-900 text-cosmic-900 font-semibold text-sm transition-colors cursor-pointer"
              >
                Know More
              </button>
            </motion.div>

            {/* Service 2: Today Panchang (With South-Indian 12-House Kundli Diagram) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl border border-gold-500/35 p-7 sm:p-8 shadow-gold-card flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="w-full h-48 rounded-2xl bg-cosmic-900 p-3 mb-6 flex items-center justify-center border border-gold-500/30">
                  <svg viewBox="0 0 240 160" className="w-full h-full max-w-[230px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="10" width="200" height="140" rx="4" stroke="#D4AF37" strokeWidth="1.5" fill="rgba(212,175,55,0.05)" />
                    <line x1="70" y1="10" x2="70" y2="150" stroke="#D4AF37" strokeWidth="1.2" />
                    <line x1="170" y1="10" x2="170" y2="150" stroke="#D4AF37" strokeWidth="1.2" />
                    <line x1="120" y1="10" x2="120" y2="45" stroke="#D4AF37" strokeWidth="1.2" />
                    <line x1="120" y1="115" x2="120" y2="150" stroke="#D4AF37" strokeWidth="1.2" />
                    <line x1="20" y1="45" x2="220" y2="45" stroke="#D4AF37" strokeWidth="1.2" />
                    <line x1="20" y1="115" x2="220" y2="115" stroke="#D4AF37" strokeWidth="1.2" />
                    <line x1="20" y1="80" x2="70" y2="80" stroke="#D4AF37" strokeWidth="1.2" />
                    <line x1="170" y1="80" x2="220" y2="80" stroke="#D4AF37" strokeWidth="1.2" />
                    <g fill="#F0D57A" fontFamily="Cinzel, serif" fontSize="10" fontWeight="700" textAnchor="middle">
                      <text x="45" y="31">12</text>
                      <text x="95" y="31">1</text>
                      <text x="145" y="31">2</text>
                      <text x="195" y="31">3</text>
                      <text x="45" y="66">11</text>
                      <text x="195" y="66">4</text>
                      <text x="45" y="101">10</text>
                      <text x="195" y="101">5</text>
                      <text x="45" y="136">9</text>
                      <text x="95" y="136">8</text>
                      <text x="145" y="136">7</text>
                      <text x="195" y="136">6</text>
                    </g>
                    <text x="120" y="84" fill="#D4AF37" fontFamily="Cinzel, serif" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="1.5">PANCHANG</text>
                  </svg>
                </div>

                <h3 className="font-display text-2xl font-bold text-cosmic-900 mb-4">
                  Today Panchang
                </h3>
                <ul className="space-y-3 text-cosmic-800 text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron-600 mt-2 shrink-0" />
                    <span>Embrace positivity</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron-600 mt-2 shrink-0" />
                    <span>Accomplish tasks with ease</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron-600 mt-2 shrink-0" />
                    <span>Positivity in your life</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => navigate('/panchang')}
                className="mt-7 w-full py-3 rounded-xl border border-gold-600/40 bg-ivory-100 hover:bg-gold-500 hover:text-cosmic-900 text-cosmic-900 font-semibold text-sm transition-colors cursor-pointer"
              >
                Know More
              </button>
            </motion.div>

            {/* Service 3: Kundli Matching (With Dual Ashtakoot Compatibility Mandala) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl border border-gold-500/35 p-7 sm:p-8 shadow-gold-card flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="w-full h-48 rounded-2xl bg-cosmic-900 p-3 mb-6 flex items-center justify-center border border-gold-500/30">
                  <svg viewBox="0 0 240 160" className="w-full h-full max-w-[230px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="95" cy="80" r="48" stroke="#D4AF37" strokeWidth="1.4" fill="rgba(212,175,55,0.06)" />
                    <circle cx="145" cy="80" r="48" stroke="#F0D57A" strokeWidth="1.4" fill="rgba(200,90,50,0.08)" />
                    <polygon points="95,42 128,99 62,99" stroke="#D4AF37" strokeWidth="1" />
                    <polygon points="145,118 178,61 112,61" stroke="#F0D57A" strokeWidth="1" />
                    <circle cx="120" cy="80" r="18" fill="#0D0B1E" stroke="#D4AF37" strokeWidth="1.4" />
                    <text x="120" y="78" fill="#F0D57A" fontFamily="Cinzel, serif" fontSize="10" fontWeight="700" textAnchor="middle">36</text>
                    <text x="120" y="89" fill="#D4AF37" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">GUNAS</text>
                  </svg>
                </div>

                <h3 className="font-display text-2xl font-bold text-cosmic-900 mb-4">
                  Kundli Matching
                </h3>
                <ul className="space-y-3 text-cosmic-800 text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron-600 mt-2 shrink-0" />
                    <span>Precise results</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron-600 mt-2 shrink-0" />
                    <span>36 gunas for compatibility</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron-600 mt-2 shrink-0" />
                    <span>Foresee the troubles</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => navigate('/kundli-matching')}
                className="mt-7 w-full py-3 rounded-xl border border-gold-600/40 bg-ivory-100 hover:bg-gold-500 hover:text-cosmic-900 text-cosmic-900 font-semibold text-sm transition-colors cursor-pointer"
              >
                Know More
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
           4. LEARN ABOUT ASTROLOGY (Editorial  Science Section)
      ========================================================= */}
      <section id="about" className="py-20 lg:py-28 bg-ivory-100 border-y border-ivory-300/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.24em] text-saffron-600 mb-2">
              Learn About Astrology
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cosmic-900">
              Understanding Vedic Science
            </h2>
            <p className="mt-4 text-base sm:text-lg text-cosmic-800/85">
              Explore the ancient wisdom of astrology and how it can guide your life decisions
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          {/* <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {[
              { id: 'all', label: 'All Pillars' },
              { id: 'vedic', label: 'Indian Astrology (Vedic Astrology)' },
              { id: 'western', label: 'Western Astrology' },
              { id: 'natal', label: 'Astrology Chart (Natal Chart)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveAstroTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeAstroTab === tab.id
                    ? 'bg-cosmic-900 text-gold-300 border border-gold-500/40 shadow-sm'
                    : 'bg-white text-cosmic-900 border border-gold-500/30 hover:border-gold-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div> */}

          {/* 3 Editorial Pillars */}
          <div className="space-y-8">
            {/* Pillar 1: Indian Astrology */}
            {(activeAstroTab === 'all' || activeAstroTab === 'vedic') && (
              <article className="bg-white rounded-3xl border border-gold-500/30 p-7 sm:p-10 shadow-gold-card">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="lg:w-1/3">
                    {/* <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cosmic-900 text-gold-400 font-display font-bold text-lg mb-4">
                      01
                    </div> */}
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-cosmic-900 leading-snug">
                      Indian Astrology (Vedic Astrology)
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-gold-700">
                      <span className="px-3 py-1 rounded-full bg-ivory-100 border border-gold-500/30">27 Constellations</span>
                      <span className="px-3 py-1 rounded-full bg-ivory-100 border border-gold-500/30">9 Planets</span>
                      <span className="px-3 py-1 rounded-full bg-ivory-100 border border-gold-500/30">12 Zodiac Signs</span>
                      <span className="px-3 py-1 rounded-full bg-ivory-100 border border-gold-500/30">12 Houses</span>
                    </div>
                  </div>
                  <div className="lg:w-2/3 space-y-4 text-cosmic-800/90 leading-relaxed text-base">
                    <p>
                      Indian astrology, also known as Vedic astrology, boasts a rich history dating back centuries. It is based on the movements of stars and planets, incorporating astrological signs and their corresponding dates (zodiacs) for a comprehensive understanding.
                    </p>
                    <p>
                      Vedic astrology considers 27 constellations, 9 planets, 12 zodiac signs, and 12 houses, analyzing their influence on an individual's life. Astrology by date of birth is used to create a horoscope chart, which displays the placement of the 9 planets within the 12 houses at the time of birth.
                    </p>
                    <p>
                      Expert astrologers interpret this chart to assess the impact of planetary positions on various life aspects, offering personalized horoscope readings and astrological signs interpretations. Vedic astrology is used for predicting marriage compatibility, career prospects, financial trends, and health outcomes.
                    </p>
                  </div>
                </div>
              </article>
            )}

            {/* Pillar 2: Western Astrology */}
            {(activeAstroTab === 'all' || activeAstroTab === 'western') && (
              <article className="bg-white rounded-3xl border border-gold-500/30 p-7 sm:p-10 shadow-gold-card">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="lg:w-1/3">
                    {/* <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cosmic-900 text-gold-400 font-display font-bold text-lg mb-4">
                      02
                    </div> */}
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-cosmic-900 leading-snug">
                      Western Astrology
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-gold-700">
                      <span className="px-3 py-1 rounded-full bg-ivory-100 border border-gold-500/30">Equatorial Zodiac</span>
                      <span className="px-3 py-1 rounded-full bg-ivory-100 border border-gold-500/30">Transit Analysis</span>
                      <span className="px-3 py-1 rounded-full bg-ivory-100 border border-gold-500/30">Progression Analysis</span>
                    </div>
                  </div>
                  <div className="lg:w-2/3 space-y-4 text-cosmic-800/90 leading-relaxed text-base">
                    <p>
                      Western astrology employs an equatorial zodiac system based on the equator points. This system emphasizes the precise time of birth for generating horoscopes and making predictions.
                    </p>
                    <p>
                      Western astrology tracks the movements of the Sun, planets, and Moon, considering their positions in the 12 houses of a birth chart. Similar to Vedic astrology, Western astrology uses birth chart analysis to understand an individual's personality, strengths, and weaknesses.
                    </p>
                    <p>
                      However, Western astrology differs from Vedic astrology in its interpretation of planetary influences and the emphasis on psychological aspects of personality. Western astrologers often use techniques like transit analysis and progression analysis to predict future trends and events.
                    </p>
                  </div>
                </div>
              </article>
            )}

            {/* Pillar 3: Astrology Chart */}
            {(activeAstroTab === 'all' || activeAstroTab === 'natal') && (
              <article className="bg-white rounded-3xl border border-gold-500/30 p-7 sm:p-10 shadow-gold-card">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="lg:w-1/3">
                    {/* <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cosmic-900 text-gold-400 font-display font-bold text-lg mb-4">
                      03
                    </div> */}
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-cosmic-900 leading-snug">
                      Astrology Chart (Natal Chart)
                    </h3>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => navigate('/birth-chart')}
                        className="gold-btn font-bold text-sm px-6 py-3.5 rounded-xl shadow-md inline-flex items-center gap-2 cursor-pointer"
                      >
                        <span>Get Your Free Birth Chart</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="lg:w-2/3 space-y-4 text-cosmic-800/90 leading-relaxed text-base">
                    <p>
                      An astrology chart, also known as a natal chart, maps the positions of the planets around the Sun at the moment of an individual's birth. This chart reveals a person's inherent strengths and weaknesses, indicating opportune times for decision-making and personal growth.
                    </p>
                    <p>
                      Birth chart analysis is a cornerstone of both Vedic and Western astrology, providing valuable insights for astrological signs and horoscope readings. Here's what astrologers consider when analyzing a birth chart:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <li className="flex items-start gap-3 bg-ivory-100/80 border border-gold-500/25 rounded-xl p-3.5 text-sm font-medium text-cosmic-900">
                        <CheckCircle className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                        <span>The position of each planet in the 12 houses</span>
                      </li>
                      <li className="flex items-start gap-3 bg-ivory-100/80 border border-gold-500/25 rounded-xl p-3.5 text-sm font-medium text-cosmic-900">
                        <CheckCircle className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                        <span>The placement of the Moon, Venus, and Mars</span>
                      </li>
                      <li className="flex items-start gap-3 bg-ivory-100/80 border border-gold-500/25 rounded-xl p-3.5 text-sm font-medium text-cosmic-900">
                        <CheckCircle className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                        <span>Jupiter's placement for luck and opportunities</span>
                      </li>
                      <li className="flex items-start gap-3 bg-ivory-100/80 border border-gold-500/25 rounded-xl p-3.5 text-sm font-medium text-cosmic-900">
                        <CheckCircle className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                        <span>Planetary aspects and their significance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
           5. FREE ASTROLOGY SERVICES (12-Card  Tool Grid)
      ========================================================= */}
      <section id="zodiac-signs" className="py-20 lg:py-24 bg-ivory-50">
        <div id="vastu-shastra" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-gold-700 font-semibold text-xs uppercase tracking-[0.22em] mb-3">
              <span className="w-6 h-px bg-gold-600" />
              <span> Tools &amp; Insights</span>
              <span className="w-6 h-px bg-gold-600" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cosmic-900">
              Free Astrology Services
            </h2>
            <p className="mt-3 text-base sm:text-lg text-cosmic-800/80">
              Explore our comprehensive range of free astrological tools and insights
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {freeServices.map((service, index) => (
              <motion.button
                key={index}
                type="button"
                onClick={() => service.route ? navigate(service.route) : null}
                whileHover={{ y: -4 }}
                className="group text-left bg-white hover:bg-cosmic-900 rounded-2xl border border-gold-500/30 p-6 shadow-sm hover:shadow-gold-glow transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-ivory-100 group-hover:bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-600 group-hover:text-gold-300 mb-4 transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-cosmic-900 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-cosmic-800/75 group-hover:text-ivory-200/80 mt-1 transition-colors">
                  {service.description}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
           6. SPECIALIZED CONSULTATIONS (Deep Cosmic Dark Section)
      ========================================================= */}
      <section className="py-20 lg:py-24 bg-cosmic-900 celestial-grid-bg text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-gold-400 font-semibold text-xs uppercase tracking-[0.22em] mb-3">
              <span className="w-6 h-px bg-gold-500" />
              <span>Focused Guidance</span>
              <span className="w-6 h-px bg-gold-500" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Specialized Consultations
            </h2>
            <p className="mt-3 text-base sm:text-lg text-ivory-200/80">
              Expert guidance for every aspect of your life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="glass-dark rounded-3xl p-7 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-saffron-600/20 border border-saffron-500/40 flex items-center justify-center text-gold-300">
                      {category.icon}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gold-500/15 text-gold-300 border border-gold-500/30">
                      {category.consultations} consultations
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {category.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenBooking(`Specialized Consultation - ${category.title}`)}
                  className="mt-6 w-full py-3 rounded-xl bg-gold-500/15 hover:bg-gold-500 text-gold-300 hover:text-cosmic-900 border border-gold-500/40 font-semibold text-sm transition-all cursor-pointer"
                >
                  Consult Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
           7. WHY CHOOSE US (Trust Metrics + 9 Pillars)
      ========================================================= */}
      <section className="py-20 lg:py-24 bg-ivory-100 ivory--bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cosmic-900">
              Why Choose Us
            </h2>
            <p className="mt-3 text-base sm:text-lg text-cosmic-800/80">
              India's most trusted astrology platform with proven results
            </p>
          </div>

          {/* Stat Highlights Banner (3 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-14">
            {[
              { number: '10+ Years', label: 'Vedic Experience' },
              { number: '10,000+', label: 'Happy Clients' },
              { number: '4.9/5', label: 'Average Rating' },
            ].map((stat, i) => (
              <div key={i} className="bg-cosmic-900 text-white rounded-3xl p-6 sm:p-7 text-center border border-gold-500/35 shadow-lg">
                <div className="font-display text-3xl sm:text-4xl font-bold gold-gradient-text">{stat.number}</div>
                <div className="text-xs sm:text-sm uppercase tracking-wider text-ivory-200/85 mt-2 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* 9 Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Verified Expert Astrologers',
                description: 'All our astrologers are thoroughly vetted, certified, and have minimum 10+ years of experience in Vedic astrology and related sciences.',
              },
              {
                title: '100% Confidential',
                description: 'Your personal information and consultation details are completely secure and never shared with third parties.',
              },
              {
                title: 'Accurate Predictions',
                description: 'Our astrologers have a proven track record of accurate predictions based on detailed birth chart analysis and planetary positions.',
              },
              {
                title: 'Instant Connection',
                description: 'Connect with expert astrologers instantly via call or chat. No waiting, no appointments needed for quick guidance.',
              },
              {
                title: 'Personalized Solutions',
                description: 'Receive customized remedies, gemstone recommendations, and puja suggestions tailored to your specific planetary positions.',
              },
              {
                title: 'Proven Track Record',
                description: 'Over 25,000 successful consultations with 95% client satisfaction rate and countless positive life transformations.',
              },
              {
                title: 'Comprehensive Services',
                description: 'From Kundli making to Vastu consultation, marriage matching to career guidance - all under one roof.',
              },
              {
                title: 'Multilingual Support',
                description: 'Get consultation in Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, and more regional languages.',
              },
              {
                title: 'Follow-up Support',
                description: 'Not just one-time consultation - get ongoing support and guidance as you implement the suggested remedies.',
              },
            ].map((reason, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gold-500/25 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-ivory-100 border border-gold-500/30 flex items-center justify-center text-gold-600 mb-4">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-cosmic-900 mb-2">{reason.title}</h3>
                <p className="text-sm text-cosmic-800/80 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
           8. WHAT OUR CLIENTS SAY (Testimonials Section)
      ========================================================= */}
      <section id="blog" className="py-20 lg:py-24 bg-ivory-50 border-t border-ivory-300/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-gold-700 font-semibold text-xs uppercase tracking-[0.22em] mb-3">
              <span className="w-6 h-px bg-gold-600" />
              <span>Client Experiences</span>
              <span className="w-6 h-px bg-gold-600" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cosmic-900">
              What Our Clients Say
            </h2>
            <p className="mt-3 text-base sm:text-lg text-cosmic-800/80">
              Real stories from real people
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {testimonials.map((testimonial, index) => (
              <article key={testimonial._id || index} className="bg-white rounded-3xl border border-gold-500/30 p-7 sm:p-8 shadow-gold-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-gold-500 mb-5">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>

                  <blockquote className="font-editorial italic text-xl text-cosmic-900 leading-relaxed mb-6">
                    "{testimonial.text}"
                  </blockquote>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-ivory-200">
                  <div className="flex items-center gap-3">
                    {/* <div className="w-11 h-11 rounded-full bg-cosmic-900 text-gold-300 font-display font-bold flex items-center justify-center text-sm">
                      {testimonial.initials || (testimonial.name ? testimonial.name.slice(0, 2).toUpperCase() : '✦')}
                    </div> */}
                    <div>
                      <div className="font-display font-bold text-cosmic-900 text-sm">{testimonial.name}</div>
                      <div className="text-xs text-cosmic-700/75">{testimonial.location || 'India'}</div>
                    </div>
                  </div>
                  <span className="text-xs text-cosmic-700/65 font-medium">{testimonial.date || 'Recently'}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
           9. GET EXPERT GUIDANCE & CONTACT HUB
      ========================================================= */}
      <section id="contact" className="py-20 lg:py-28 bg-ivory-100 border-t border-ivory-300/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.24em] text-saffron-600 mb-2">
              Get Expert Guidance
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cosmic-900">
              Why You Should Contact Us Today
            </h2>
            <p className="mt-4 text-base sm:text-lg text-cosmic-800/85 leading-relaxed">
              Don't let uncertainty hold you back. Our expert astrologers are here to provide clarity, direction, and practical solutions for all your life challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-3xl border border-gold-500/30 p-7 shadow-sm">
              <h3 className="font-display text-xl font-bold text-cosmic-900 mb-2">
                Facing Life Challenges?
              </h3>
              <p className="text-cosmic-800/85 text-sm sm:text-base leading-relaxed">
                Whether it's career confusion, relationship issues, financial stress, or health concerns - get personalized astrological guidance.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gold-500/30 p-7 shadow-sm">
              <h3 className="font-display text-xl font-bold text-cosmic-900 mb-2">
                Making Important Decisions?
              </h3>
              <p className="text-cosmic-800/85 text-sm sm:text-base leading-relaxed">
                Planning marriage, changing jobs, starting a business, or buying property? Know the most auspicious time through Vedic astrology.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gold-500/30 p-7 shadow-sm">
              <h3 className="font-display text-xl font-bold text-cosmic-900 mb-2">
                Seeking Peace &amp; Prosperity?
              </h3>
              <p className="text-cosmic-800/85 text-sm sm:text-base leading-relaxed">
                Transform your home and workplace with Vastu Shastra. Create harmonious spaces that attract positive energy and success.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gold-500/30 p-7 shadow-sm">
              <h3 className="font-display text-xl font-bold text-cosmic-900 mb-2">
                Want to Understand Your Destiny?
              </h3>
              <p className="text-cosmic-800/85 text-sm sm:text-base leading-relaxed">
                Discover your life path, strengths, challenges, and opportunities through detailed birth chart analysis.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="tel:+917905755326"
              className="w-full sm:w-auto gold-btn font-bold text-base px-8 py-4 rounded-2xl shadow-md inline-flex items-center justify-center gap-2.5"
            >
              <Phone className="w-5 h-5 text-cosmic-950" />
              <span>Call Now for FREE Consultation</span>
            </a>

            <button
              type="button"
              onClick={() => handleOpenBooking('Contact Us Section - Send Message')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-cosmic-900 hover:bg-cosmic-800 text-gold-300 border border-gold-500/40 font-semibold text-base transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Mail className="w-5 h-5 text-gold-400" />
              <span>Send Message</span>
            </button>
          </div>

          {/* Checklist & Direct Contact Channels Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 7 Cols: What You Get */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gold-500/35 p-7 sm:p-10 shadow-gold-card">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-cosmic-900 mb-6">
                What You Get When You Contact Us
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-cosmic-800">
                {[
                  'Instant connection with verified astrologers',
                  'Detailed birth chart analysis and interpretation',
                  'Personalized predictions for career, marriage, health',
                  'Relationship compatibility and marriage matching',
                  'Vastu consultation for home and office',
                  'Business and financial growth guidance',
                  'Effective remedies - mantras, gemstones, pujas',
                  'Auspicious dates for important events',
                  'Follow-up support and ongoing guidance',
                  'Written consultation report via email',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right 5 Cols: Offer + 3 Contact Cards */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* <div className="rounded-3xl bg-gradient-to-br from-cosmic-900 via-cosmic-850 to-cosmic-800 text-white p-6 border border-gold-400/50 shadow-lg">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-gold-300 mb-1">
                  First Time Users
                </span>
                <h4 className="font-display text-2xl sm:text-3xl font-bold gold-gradient-text">
                  FREE 15 Minutes
                </h4>
                <p className="text-sm text-ivory-200/90 mt-1">
                  Get your first consultation absolutely free!
                </p>
              </div> */}

              <div className="bg-white rounded-2xl border border-gold-500/30 p-5 flex items-center justify-between gap-4 shadow-sm">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-saffron-600">Call Us Directly</div>
                  <div className="font-display font-bold text-lg text-cosmic-900 mt-0.5">+91 79057 55326</div>
                  <div className="text-xs text-cosmic-700/80 mt-0.5">Available Mon-Sat, 9 AM - 7 PM</div>
                </div>
                <a href="tel:+917905755326" className="shrink-0 px-4 py-2.5 rounded-xl bg-cosmic-900 hover:bg-cosmic-800 text-gold-300 text-xs font-semibold transition-colors">
                  Call Now
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-gold-500/30 p-5 flex items-center justify-between gap-4 shadow-sm">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">WhatsApp Chat</div>
                  <div className="font-display font-bold text-lg text-cosmic-900 mt-0.5">Instant Response</div>
                  <div className="text-xs text-cosmic-700/80 mt-0.5">24/7 automated replies</div>
                </div>
                <a href="https://wa.me/917905755326" target="_blank" rel="noopener noreferrer" className="shrink-0 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors">
                  Chat on WhatsApp
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-gold-500/30 p-5 flex items-center justify-between gap-4 shadow-sm">
                <div className="min-w-0">
                  <div className="text-xs font-bold uppercase tracking-wider text-gold-700">Email Consultation</div>
                  <div className="font-semibold text-sm sm:text-base text-cosmic-900 mt-0.5 truncate">contact@bhagyanetram.com</div>
                  <div className="text-xs text-cosmic-700/80 mt-0.5">Response within 24 hours</div>
                </div>
                <a href="mailto:contact@bhagyanetram.com" className="shrink-0 px-4 py-2.5 rounded-xl border border-gold-600/40 bg-ivory-100 hover:bg-gold-500 text-cosmic-900 text-xs font-semibold transition-colors">
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
           10. BOTTOM CTA BANNER
      ========================================================= */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-cosmic-950 via-cosmic-900 to-cosmic-950 border-t border-gold-500/30 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-base sm:text-xl text-ivory-200/85 mb-8">
            Get instant access to India's top astrologers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleOpenBooking('Bottom Banner - Talk to Astrologer Now')}
              className="w-full sm:w-auto gold-btn font-bold text-base px-8 py-4 rounded-2xl shadow-gold-glow cursor-pointer"
            >
              Talk to Astrologer Now
            </button>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-gold-500/45 bg-cosmic-800/60 hover:bg-cosmic-800 text-gold-200 font-semibold text-base transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Consultation Booking Modal */}
      <BookingModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        reason={bookingReason}
        astrologerName={selectedAstrologer}
      />
    </div>
  );
}
