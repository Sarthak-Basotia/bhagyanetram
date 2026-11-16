import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { BookingModal } from './BookingModal';
import logoImage from 'figma:asset/d5457f2df4c5864ece0203437258a94768a0cf00.png';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vastuDropdownOpen, setVastuDropdownOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const handleVastuMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setVastuDropdownOpen(true);
  };

  const handleVastuMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    // Hold menu open for 3 seconds after mouse leaves
    closeTimeoutRef.current = setTimeout(() => {
      setVastuDropdownOpen(false);
    }, 3000);
  };

  const handleCloseVastuImmediate = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setVastuDropdownOpen(false);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const vastuPages = [
    { id: 'vastu-main-door', label: 'Main Door' },
    { id: 'vastu-bedroom', label: 'Bedroom' },
    { id: 'vastu-dining-living', label: 'Dining and Living Room' },
    { id: 'vastu-construction', label: 'Under Construction Properties' },
    { id: 'vastu-kitchen', label: 'Kitchen' },
    { id: 'vastu-study-room', label: 'Study Room / Study Desk' },
    { id: 'vastu-temple', label: 'Temple / Poojasthaan' },
    { id: 'vastu-office', label: 'Office and Study Room' },
    { id: 'vastu-vault', label: 'Vault / Tijori / Cash Drawer' },
    { id: 'vastu-toilet', label: 'Toilet' },
  ];

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/horoscope', label: 'Horoscope' },
    { path: '/zodiac', label: 'Zodiac Signs' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-cosmic-900/95 backdrop-blur-md border-b border-gold-500/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Emblem & Title */}
            <Link to="/" className="flex items-center gap-3.5 group focus:outline-none">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl overflow-hidden bg-white/95 p-1 border border-gold-500/40 group-hover:border-gold-400 group-hover:scale-105 transition-all shadow-xs shrink-0">
                <img
                  src={logoImage}
                  alt="BhagyaNetram Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="block font-display text-lg sm:text-xl font-bold tracking-[0.14em] text-white group-hover:text-gold-300 transition-colors">
                  BHAGYANETRAM
                </span>
                <span className="block text-[11px] uppercase tracking-[0.22em] text-gold-400/90 font-medium">
                  Vastu &amp; Astrology
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-ivory-200/90">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`py-2 transition-colors relative ${
                      isActive ? 'text-gold-300 font-semibold' : 'hover:text-gold-400'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400 to-saffron-500 rounded-full" />
                    )}
                  </Link>
                );
              })}

              {/* Vastu Shastra Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleVastuMouseEnter}
                onMouseLeave={handleVastuMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (vastuDropdownOpen) {
                      handleCloseVastuImmediate();
                    } else {
                      handleVastuMouseEnter();
                    }
                  }}
                  className={`flex items-center gap-1.5 py-2 transition-colors cursor-pointer ${
                    location.pathname.includes('/vastu')
                      ? 'text-gold-300 font-semibold'
                      : 'hover:text-gold-400'
                  }`}
                >
                  <span>Vastu Shastra</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${vastuDropdownOpen ? 'rotate-180 text-gold-400' : ''}`} />
                </button>

                {vastuDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 w-72 bg-cosmic-900/95 backdrop-blur-md rounded-2xl shadow-cosmic-card border border-gold-500/30 py-3 mt-1 z-50 animate-in fade-in slide-in-from-top-2 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
                    onMouseEnter={handleVastuMouseEnter}
                    onMouseLeave={handleVastuMouseLeave}
                  >
                    <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-400/80 border-b border-gold-500/20 mb-2">
                      Vastu Categories
                    </div>
                    {vastuPages.map((page) => {
                      const isPageActive = location.pathname === `/${page.id}`;
                      return (
                        <Link
                          key={page.id}
                          to={`/${page.id}`}
                          onClick={handleCloseVastuImmediate}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isPageActive
                              ? 'bg-gold-500/15 text-gold-300 font-semibold border-l-2 border-gold-400'
                              : 'text-ivory-100 hover:bg-cosmic-800 hover:text-gold-300'
                          }`}
                        >
                          {page.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                to="/blog"
                className={`py-2 transition-colors ${
                  location.pathname === '/blog' ? 'text-gold-300 font-semibold' : 'hover:text-gold-400'
                }`}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className={`py-2 transition-colors ${
                  location.pathname === '/contact' ? 'text-gold-300 font-semibold' : 'hover:text-gold-400'
                }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Desktop CTA & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 gold-btn font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-md cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cosmic-950" />
                <span>Get FREE Consultation</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
                className="lg:hidden p-2.5 rounded-xl border border-gold-500/30 text-gold-300 hover:bg-cosmic-800 focus:outline-none cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-cosmic-900 border-t border-gold-500/20 px-4 pt-3 pb-6 space-y-1 animate-in fade-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-cosmic-800 text-gold-300 font-semibold'
                    : 'text-ivory-100 hover:bg-cosmic-800 hover:text-gold-400'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Vastu Shastra Section in Mobile */}
            <div className="pt-2">
              <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-400/80">
                Vastu Shastra
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1 pl-2">
                {vastuPages.map((page) => (
                  <Link
                    key={page.id}
                    to={`/${page.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm text-ivory-200 hover:bg-cosmic-800 hover:text-gold-300"
                  >
                    • {page.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-ivory-100 hover:bg-cosmic-800 hover:text-gold-400 font-medium"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-ivory-100 hover:bg-cosmic-800 hover:text-gold-400 font-medium"
            >
              Contact Us
            </Link>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookingModalOpen(true);
                }}
                className="w-full gold-btn font-semibold text-sm py-3 rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cosmic-950" />
                <span>Get FREE Consultation</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Navigation Booking Modal */}
      <BookingModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        reason="Navigation Bar - Get FREE Consultation"
      />
    </>
  );
}
