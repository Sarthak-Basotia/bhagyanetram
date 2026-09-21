import { useState, useEffect } from 'react';
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
import { ChevronUp } from 'lucide-react';
import logoImage from 'figma:asset/d5457f2df4c5864ece0203437258a94768a0cf00.png';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'horoscope':
        return <HoroscopePage />;
      case 'zodiac':
        return <ZodiacSignsPage />;
      case 'vastu-main-door':
        return <VastuMainDoor />;
      case 'vastu-bedroom':
        return <VastuBedroom />;
      case 'vastu-dining-living':
        return <VastuDiningLiving />;
      case 'vastu-construction':
        return <VastuConstruction />;
      case 'vastu-kitchen':
        return <VastuKitchen />;
      case 'vastu-study-room':
        return <VastuStudyRoom />;
      case 'vastu-temple':
        return <VastuTemple />;
      case 'vastu-office':
        return <VastuOffice />;
      case 'vastu-vault':
        return <VastuVault />;
      case 'vastu-toilet':
        return <VastuToilet />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main>{renderPage()}</main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About Column */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={logoImage} 
                  alt="Bhagyanetram Logo" 
                  className="w-10 h-10 object-contain brightness-100 rounded-md"
                />
                <h3 className="text-xl">BHAGYANETRAM</h3>
              </div>
              <p className="text-background/70 text-sm leading-relaxed">
                Expert Vedic Astrology and Vastu Shastra consultations for harmony, prosperity, and success.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 text-background">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => handleNavigate('home')}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('about')}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('horoscope')}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    Horoscope
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('blog')}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    Blog
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-4 text-background">Our Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => handleNavigate('zodiac')}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    Vedic Astrology
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('vastu-main-door')}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    Vastu Shastra
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('horoscope')}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    Birth Chart Reading
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('contact')}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    Book Consultation
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="mb-4 text-background">Contact Us</h4>
              <ul className="space-y-3 text-sm text-background/70">
                <li className="flex items-center gap-2">
                  <span>📞</span>
                  <span>+91 79057 55326</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✉️</span>
                  <span>contact@bhagyanetram.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Prayagraj, India</span>
                </li>
                <li className="pt-2">
                  <p className="text-xs text-background/50 mb-2">Follow Us</p>
                  <div className="flex gap-3">
                    <span className="cursor-pointer hover:scale-110 transition-transform opacity-70 hover:opacity-100">📘</span>
                    <span className="cursor-pointer hover:scale-110 transition-transform opacity-70 hover:opacity-100">📷</span>
                    <span className="cursor-pointer hover:scale-110 transition-transform opacity-70 hover:opacity-100">🐦</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-background/20 pt-8 text-center text-sm text-background/60">
            <p>© 2026 Bhagyanetram. All rights reserved.</p>
            <p className="mt-1 text-xs">Professional Vedic Astrology & Vastu Shastra Consultations</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-24 right-6 z-40 rounded-full w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
