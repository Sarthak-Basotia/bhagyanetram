import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import logoImage from 'figma:asset/d5457f2df4c5864ece0203437258a94768a0cf00.png';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vastuDropdownOpen, setVastuDropdownOpen] = useState(false);

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

  return (
    <nav className="sticky top-0 z-50 bg-card backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 group"
          >
            <img 
              src={logoImage} 
              alt="Bhagyanetram Logo" 
              className="w-12 h-12 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-xl text-foreground group-hover:text-primary transition-colors">
                BHAGYANETRAM
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Vastu & Astrology
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Button
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              onClick={() => onNavigate('home')}
              className={currentPage === 'home' ? 'bg-primary' : ''}
            >
              Home
            </Button>
            <Button
              variant={currentPage === 'about' ? 'default' : 'ghost'}
              onClick={() => onNavigate('about')}
              className={currentPage === 'about' ? 'bg-primary' : ''}
            >
              About
            </Button>
            <Button
              variant={currentPage === 'horoscope' ? 'default' : 'ghost'}
              onClick={() => onNavigate('horoscope')}
              className={currentPage === 'horoscope' ? 'bg-primary' : ''}
            >
              Horoscope
            </Button>
            <Button
              variant={currentPage === 'zodiac' ? 'default' : 'ghost'}
              onClick={() => onNavigate('zodiac')}
              className={currentPage === 'zodiac' ? 'bg-primary' : ''}
            >
              Zodiac Signs
            </Button>

            {/* Vastu Dropdown */}
            <div className="relative group">
              <Button
                variant="ghost"
                className="flex items-center gap-1"
                onMouseEnter={() => setVastuDropdownOpen(true)}
              >
                Vastu Shastra
                <ChevronDown className="w-4 h-4" />
              </Button>
              {vastuDropdownOpen && (
                <div
                  className="absolute top-full left-0 w-64 bg-card rounded-lg shadow-xl border border-primary/20 py-2 mt-1 z-50"
                  onMouseLeave={() => setVastuDropdownOpen(false)}
                >
                  {vastuPages.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => {
                        onNavigate(page.id);
                        setVastuDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-primary/10 hover:text-primary text-sm transition-colors"
                    >
                      {page.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant={currentPage === 'blog' ? 'default' : 'ghost'}
              onClick={() => onNavigate('blog')}
              className={currentPage === 'blog' ? 'bg-primary' : ''}
            >
              Blog
            </Button>
            <Button
              variant={currentPage === 'contact' ? 'default' : 'ghost'}
              onClick={() => onNavigate('contact')}
              className={currentPage === 'contact' ? 'bg-primary' : ''}
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-primary/10">
            <div className="flex flex-col space-y-2">
              <Button
                variant={currentPage === 'home' ? 'default' : 'ghost'}
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                Home
              </Button>
              <Button
                variant={currentPage === 'about' ? 'default' : 'ghost'}
                onClick={() => {
                  onNavigate('about');
                  setMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                About
              </Button>
              <Button
                variant={currentPage === 'horoscope' ? 'default' : 'ghost'}
                onClick={() => {
                  onNavigate('horoscope');
                  setMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                Horoscope
              </Button>
              <Button
                variant={currentPage === 'zodiac' ? 'default' : 'ghost'}
                onClick={() => {
                  onNavigate('zodiac');
                  setMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                Zodiac Signs
              </Button>

              {/* Vastu Shastra Mobile */}
              <div className="border-t border-primary/10 pt-2 mt-2">
                <p className="px-3 mb-2 text-sm text-muted-foreground">Vastu Shastra</p>
                {vastuPages.map((page) => (
                  <Button
                    key={page.id}
                    variant="ghost"
                    onClick={() => {
                      onNavigate(page.id);
                      setMobileMenuOpen(false);
                    }}
                    className="justify-start pl-6 w-full text-sm"
                  >
                    {page.label}
                  </Button>
                ))}
              </div>

              <Button
                variant={currentPage === 'blog' ? 'default' : 'ghost'}
                onClick={() => {
                  onNavigate('blog');
                  setMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                Blog
              </Button>
              <Button
                variant={currentPage === 'contact' ? 'default' : 'ghost'}
                onClick={() => {
                  onNavigate('contact');
                  setMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
