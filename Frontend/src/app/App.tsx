import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { HoroscopePage } from './components/pages/HoroscopePage';
import { ZodiacSignsPage } from './components/pages/ZodiacSignsPage';
import { VastuMainDoor } from './components/pages/VastuMainDoor';
import { VastuBedroom } from './components/pages/VastuBedroom';
import { VastuDiningLiving } from './components/pages/VastuDiningLiving';
import { VastuConstruction } from './components/pages/VastuConstruction';
import { VastuKitchen } from './components/pages/VastuKitchen';
import { VastuStudyRoom } from './components/pages/VastuStudyRoom';
import { VastuTemple } from './components/pages/VastuTemple';
import { VastuOffice } from './components/pages/VastuOffice';
import { VastuVault } from './components/pages/VastuVault';
import { VastuToilet } from './components/pages/VastuToilet';
import { BlogPage } from './components/pages/BlogPage';
import { ContactPage } from './components/pages/ContactPage';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Button } from './components/ui/button';
import FreeKundli from './components/pages/FreeKundli';
import PanchangPage from './components/pages/PanchangPage';
import MatchmakingPage from './components/pages/MatchmakingPage';
import { ChevronUp } from 'lucide-react';
import logoImage from 'figma:asset/d5457f2df4c5864ece0203437258a94768a0cf00.png';
import BirthChartPage from './components/pages/BirthChartPage';
import NumerologyPage from './components/pages/NumerologyPage';
import GemstoneGuidePage from './components/pages/GemstoneGuidePage';
import FestivalsPage from './components/pages/FestivalsPage';
import PlanetTransitPage from './components/pages/PlanetTransitPage';
import ScrollToTop from './components/ScrollToTop';
import PrivacyPolicyPage from './components/pages/PrivacyPolicyPage';
import TermsConditionsPage from './components/pages/TermsConditionsPage';
import TarotReadingPage from './components/pages/TarotReadingPage';
import YantraMeditationPage from './components/pages/YantraMeditationPage';
import PalmistryPage from './components/pages/PalmistryPage';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        {/* Navigation component will also need to be updated to use <Link> inside it */}
        <Navigation />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/horoscope" element={<HoroscopePage />} />
            <Route path="/zodiac" element={<ZodiacSignsPage />} />
            <Route path="/vastu-main-door" element={<VastuMainDoor />} />
            <Route path="/vastu-bedroom" element={<VastuBedroom />} />
            <Route path="/vastu-dining-living" element={<VastuDiningLiving />} />
            <Route path="/vastu-construction" element={<VastuConstruction />} />
            <Route path="/vastu-kitchen" element={<VastuKitchen />} />
            <Route path="/vastu-study-room" element={<VastuStudyRoom />} />
            <Route path="/vastu-temple" element={<VastuTemple />} />
            <Route path="/vastu-office" element={<VastuOffice />} />
            <Route path="/vastu-vault" element={<VastuVault />} />
            <Route path="/vastu-toilet" element={<VastuToilet />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/free-kundli" element={<FreeKundli />} />
            <Route path="/panchang" element={<PanchangPage />} />
            <Route path="/kundli-matching" element={<MatchmakingPage />} />
            <Route path="/birth-chart" element={<BirthChartPage />} />
            <Route path="/numerology" element={<NumerologyPage />} />
            <Route path="/gem-guide" element={<GemstoneGuidePage />} />
            <Route path="/festivals" element={<FestivalsPage />} />
            <Route path="/planet-chart" element={<PlanetTransitPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
            <Route path="/tarot" element={<TarotReadingPage />} />
            <Route path="/yantra-meditation" element={<YantraMeditationPage />} />
            <Route path="/palmistry" element={<PalmistryPage />} />
            {/* Catch-all route to redirect 404s to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-cosmic-950 text-ivory-200/85 border-t border-gold-500/20 pt-16 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gold-500/15">
              {/* Brand Column */}
              <div>
                <Link to="/" onClick={scrollToTop} className="inline-flex items-center gap-3 mb-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/95 p-1 border border-gold-500/40 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden shadow-xs shrink-0">
                    <img
                      src={logoImage}
                      alt="BhagyaNetram Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-display text-xl font-bold tracking-[0.14em] text-white group-hover:text-gold-300 transition-colors">
                    BHAGYANETRAM
                  </span>
                </Link>
                <p className="text-sm text-ivory-200/75 leading-relaxed">
                  Expert Vedic Astrology and Vastu Shastra consultations for harmony, prosperity, and success.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-display text-base font-bold text-gold-300 uppercase tracking-wider mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <Link to="/" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/horoscope" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                      Horoscope
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Our Services */}
              <div>
                <h3 className="font-display text-base font-bold text-gold-300 uppercase tracking-wider mb-4">
                  Our Services
                </h3>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <Link to="/zodiac" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                      Vedic Astrology
                    </Link>
                  </li>
                  <li>
                    <Link to="/vastu-main-door" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                      Vastu Shastra
                    </Link>
                  </li>
                  <li>
                    <Link to="/birth-chart" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                      Birth Chart Reading
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                      Book Consultation
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Us */}
              <div>
                <h3 className="font-display text-base font-bold text-gold-300 uppercase tracking-wider mb-4">
                  Contact Us
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2.5">
                    <span>📞</span>
                    <a href="tel:+917905755326" className="hover:text-gold-400 transition-colors">+91 79057 55326</a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span>✉️</span>
                    <a href="mailto:contact@bhagyanetram.com" className="hover:text-gold-400 transition-colors">contact@bhagyanetram.com</a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span>📍</span>
                    <span>Prayagraj, India</span>
                  </li>
                </ul>

                <div className="mt-5">
                  <span className="block text-xs uppercase tracking-wider text-gold-400/90 font-semibold mb-2.5">Follow Us</span>
                  <div className="flex items-center gap-3">
                    <a href="https://www.facebook.com/BhagyaNetram/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-cosmic-800 border border-gold-500/30 flex items-center justify-center text-ivory-100 hover:bg-gold-500 hover:text-cosmic-900 transition-colors">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                    </a>
                    <a href="https://www.instagram.com/bhagyanetram/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-cosmic-800 border border-gold-500/30 flex items-center justify-center text-ivory-100 hover:bg-gold-500 hover:text-cosmic-900 transition-colors">
                      <svg className="w-4 h-4 fill-none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
                    </a>
                    <a href="https://www.youtube.com/@BhagyaNetram" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-full bg-cosmic-800 border border-gold-500/30 flex items-center justify-center text-ivory-100 hover:bg-gold-500 hover:text-cosmic-900 transition-colors">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory-200/65 text-center md:text-left">
              <div>© 2026 Bhagyanetram. All rights reserved.</div>
              <div className="text-gold-400/85 font-medium">Professional Vedic Astrology &amp; Vastu Shastra Consultations</div>
              <div className="flex items-center gap-5">
                <Link 
                  to="/privacy-policy" 
                  onClick={scrollToTop} 
                  className="hover:text-gold-400 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/terms-and-conditions" 
                  onClick={scrollToTop} 
                  className="hover:text-gold-400 transition-colors"
                >
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </div>
        </footer>

        <WhatsAppButton />

        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            size="icon"
            className="fixed bottom-24 right-6 z-40 rounded-full w-12 h-12 bg-cosmic-900 hover:bg-cosmic-800 text-gold-300 border border-gold-500/40 shadow-gold-glow hover:scale-105 transition-all cursor-pointer"
          >
            <ChevronUp className="w-5 h-5 text-gold-400" />
          </Button>
        )}
      </div>
    </Router>
  );
}