import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import DesktopNavigation from './navigation/DesktopNavigation';
import MobileNavigation from './navigation/MobileNavigation';

function Header() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const headerRef = useRef(null);

  // Handle scroll for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerBottom = headerRef.current.offsetTop + headerRef.current.offsetHeight;
        const scrollY = window.scrollY;
        setShowScrollToTop(scrollY > headerBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <header ref={headerRef} data-cy="main-header" className="bg-brand-linen shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Site Logo/Title */}
          <div className="flex items-center">
            <Link to="/" data-cy="site-title-link" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                {/* R Logo */}
                <div className="w-10 h-10 flex items-center justify-center">
                  <img 
                    src="/images/logo_r.svg" 
                    alt="Reconstructor Logo" 
                    className="w-full h-full object-contain hover:opacity-80 transition-opacity"
                  />
                </div>
                
                <div className="text-left">
                  <h1 className="font-sans font-bold text-xl text-brand-black leading-tight" data-cy="site-title">
                    {t('brand.name')}
                  </h1>
                  <p className="text-xs text-brand-charcoal font-medium leading-tight">
                    {t('brand.tagline')}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              data-cy="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-charcoal hover:text-brand-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-umber"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation and Language Switcher */}
          <DesktopNavigation />
        </div>

        {/* Mobile Menu */}
        <MobileNavigation 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
      </nav>
    </header>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-brand-umber text-brand-linen p-3 rounded-full shadow-lg hover:bg-brand-black transition-all duration-300 z-50 hover:scale-110"
          aria-label={t('scroll_to_top')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
}

export default Header;