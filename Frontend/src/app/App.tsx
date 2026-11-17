import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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

// Admin Portal Components
import AdminLoginPage from './components/admin/AdminLoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
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
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      
      {/* Show navigation only on public user-facing website */}
      {!isAdminRoute && <Navigation />}

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

          {/* ADMIN PORTAL ROUTES */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          {/* Catch-all route to redirect 404s to Home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Show footer and floating tools only on public site */}
      {!isAdminRoute && (
        <>
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
                    <div className="text-left">
                      <span className="font-display text-xl font-bold tracking-wider text-white block group-hover:text-gold-300 transition-colors">
                        BHAGYANETRAM
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
                        Vastu &amp; Astrology
                      </span>
                    </div>
                  </Link>

                  <p className="text-ivory-200/70 text-sm leading-relaxed mb-6 font-sans">
                    Ancient Vedic wisdom meets modern spiritual consultation. Harmonizing energies for personal, residential, and corporate enlightenment.
                  </p>

                  <div className="text-xs text-gold-300 font-medium">
                    ISO Certified Vedic Institute &amp; Research Center
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="font-display text-base font-semibold text-white tracking-wider uppercase mb-5 border-l-2 border-gold-400 pl-3">
                    Vedic Services
                  </h4>
                  <ul className="space-y-2.5 text-sm">
                    <li>
                      <Link to="/free-kundli" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                        Free Janam Kundli
                      </Link>
                    </li>
                    <li>
                      <Link to="/panchang" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                        Today's Panchang &amp; Muhurat
                      </Link>
                    </li>
                    <li>
                      <Link to="/kundli-matching" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                        Kundli Milan (Matchmaking)
                      </Link>
                    </li>
                    <li>
                      <Link to="/birth-chart" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                        Comprehensive Birth Chart
                      </Link>
                    </li>
                    <li>
                      <Link to="/festivals" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                        Hindu Festival Calendar
                      </Link>
                    </li>
                    <li>
                      <Link to="/planet-chart" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                        Live Planetary Gochar
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Vastu Shastra */}
                <div>
                  <h4 className="font-display text-base font-semibold text-white tracking-wider uppercase mb-5 border-l-2 border-gold-400 pl-3">
                    Vastu Shastra
                  </h4>
                  <ul className="space-y-2.5 text-sm">
                    <li>
                      <Link to="/vastu-main-door" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                        Main Door Vastu
                      </Link>
                    </li>
                    <li>
                      <Link to="/vastu-bedroom" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                        Master Bedroom Alignment
                      </Link>
                    </li>
                    <li>
                      <Link to="/vastu-kitchen" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                        Kitchen Fire Energy
                      </Link>
                    </li>
                    <li>
                      <Link to="/vastu-temple" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                        Pooja Room Sanctity
                      </Link>
                    </li>
                    <li>
                      <Link to="/vastu-office" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                        Commercial &amp; Office Vastu
                      </Link>
                    </li>
                    <li>
                      <Link to="/vastu-vault" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                        Wealth &amp; Tijori Placement
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Support & Admin Link */}
                <div>
                  <h4 className="font-display text-base font-semibold text-white tracking-wider uppercase mb-5 border-l-2 border-gold-400 pl-3">
                    Spiritual Guidance
                  </h4>
                  <ul className="space-y-2.5 text-sm mb-6">
                    <li>
                      <Link to="/blog" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                        Wisdom &amp; Articles
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                        Book Personal Audit
                      </Link>
                    </li>
                    <li>
                      <Link to="/palmistry" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                        AI Palmistry Reading
                      </Link>
                    </li>
                    <li>
                      <Link to="/tarot" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                        Vedic Tarot &amp; Card Guidance
                      </Link>
                    </li>
                    
                  </ul>
                </div>
              </div>

              {/* Copyright */}
              <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-ivory-200/60 gap-4">
                <p>&copy; {new Date().getFullYear()} BhagyaNetram. All rights reserved. Guided by Sanatana Dharma.</p>
                <div className="flex items-center gap-6">
                  <Link to="/privacy-policy" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/terms-and-conditions" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
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
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
