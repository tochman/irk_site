import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

function Header() {
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const dropdownRef = useRef(null);
  const headerRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsDropdownOpen(false);
    // Close mobile menu immediately to ensure tests pass
    setIsMobileMenuOpen(false);
  };

  const currentLanguage = i18n.language;

  // Flag components
  const SwedishFlag = ({ className, ...props }) => (
    <svg className={className} viewBox="0 0 32 20" fill="none" {...props}>
      <rect width="32" height="20" fill="#006AA7"/>
      <rect x="10" y="0" width="4" height="20" fill="#FECC00"/>
      <rect x="0" y="8" width="32" height="4" fill="#FECC00"/>
    </svg>
  );

  const BritishFlag = ({ className, ...props }) => (
    <svg className={className} viewBox="0 0 32 20" fill="none" {...props}>
      <rect width="32" height="20" fill="#012169"/>
      <path d="M0 0L32 20M32 0L0 20" stroke="white" strokeWidth="2"/>
      <path d="M0 0L32 20M32 0L0 20" stroke="#C8102E" strokeWidth="1"/>
      <rect x="13" y="0" width="6" height="20" fill="white"/>
      <rect x="0" y="7" width="32" height="6" fill="white"/>
      <rect x="14" y="0" width="4" height="20" fill="#C8102E"/>
      <rect x="0" y="8" width="32" height="4" fill="#C8102E"/>
    </svg>
  );

  const PersianFlag = ({ className, ...props }) => (
    <svg className={className} viewBox="0 0 32 20" fill="none" {...props}>
      <rect width="32" height="20" fill="#239F40"/>
      <rect x="0" y="0" width="32" height="7" fill="#239F40"/>
      <rect x="0" y="7" width="32" height="6" fill="white"/>
      <rect x="0" y="13" width="32" height="7" fill="#DA0000"/>
      <g transform="translate(16,10)">
        <circle cx="0" cy="0" r="2" fill="none" stroke="#DA0000" strokeWidth="0.5"/>
        <text x="0" y="1" textAnchor="middle" fontSize="2" fill="#DA0000">الله</text>
      </g>
    </svg>
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          <div className="hidden md:flex md:items-center md:gap-8">
            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              <Link 
                to="/rekonstruktion" 
                data-cy="nav-reconstruction"
                className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
              >
                {t('navigation.reconstruction')}
              </Link>
              <Link 
                to="/ackord" 
                data-cy="nav-ackord"
                className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
              >
                {t('navigation.ackord')}
              </Link>
              <Link 
                to="/foretagskop" 
                data-cy="nav-foretagskop"
                className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
              >
                {t('navigation.foretagskop')}
              </Link>
              <Link 
                to="/om-oss" 
                data-cy="nav-about"
                className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
              >
                {t('navigation.about')}
              </Link>
              <Link 
                to="/kontakt" 
                data-cy="nav-contact"
                className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
              >
                {t('navigation.contact')}
              </Link>
              {/* Login button - commented out for now, will use later
              <Link 
                to="/authentication" 
                data-cy="nav-authentication"
                className="bg-brand-umber text-brand-linen px-4 py-2 font-medium hover:bg-brand-black transition-colors"
              >
                {t('navigation.login')}
              </Link>
              */}
            </div>

            {/* Language Switcher Dropdown */}
            <div data-cy="language-switcher" className="relative" ref={dropdownRef}>
            <button
              data-cy="language-dropdown-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-brand-linen border border-brand-khaki shadow-sm hover:bg-brand-khaki hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-brand-umber focus:border-brand-umber"
            >
              {currentLanguage === 'sv' ? (
                <div className="flex items-center">
                  <SwedishFlag 
                    data-cy="current-flag-sv" 
                    className="w-6 h-4 border border-brand-khaki"
                  />
                  <span className="text-sm font-medium text-brand-charcoal ml-2">SV</span>
                </div>
              ) : currentLanguage === 'en' ? (
                <div className="flex items-center">
                  <BritishFlag 
                    data-cy="current-flag-en" 
                    className="w-6 h-4 border border-brand-khaki"
                  />
                  <span className="text-sm font-medium text-brand-charcoal ml-2">EN</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <PersianFlag 
                    data-cy="current-flag-fa" 
                    className="w-6 h-4 border border-brand-khaki"
                  />
                  <span className="text-sm font-medium text-brand-charcoal ml-2">فا</span>
                </div>
              )}
              <svg className="w-4 h-4 text-brand-charcoal opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div 
                data-cy="language-dropdown-menu"
                className="absolute right-0 mt-2 w-32 bg-brand-linen border border-brand-khaki shadow-lg z-10"
              >
                <button
                  data-cy="language-option-sv"
                  onClick={() => changeLanguage('sv')}
                  className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-brand-khaki hover:bg-opacity-20 text-sm text-brand-charcoal"
                >
                  <SwedishFlag data-cy="flag-sv" className="w-6 h-4 border border-brand-khaki" />
                  <span>Svenska</span>
                </button>
                <button
                  data-cy="language-option-en"
                  onClick={() => changeLanguage('en')}
                  className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-brand-khaki hover:bg-opacity-20 text-sm text-brand-charcoal"
                >
                  <BritishFlag data-cy="flag-en" className="w-6 h-4 border border-brand-khaki" />
                  <span>English</span>
                </button>
                <button
                  data-cy="language-option-fa"
                  onClick={() => changeLanguage('fa')}
                  className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-brand-khaki hover:bg-opacity-20 text-sm text-brand-charcoal"
                >
                  <PersianFlag data-cy="flag-fa" className="w-6 h-4 border border-brand-khaki" />
                  <span>فارسی</span>
                </button>
              </div>
            )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-brand-khaki" data-cy="mobile-menu">
            <div className="flex flex-col gap-4">
              <Link 
                to="/rekonstruktion" 
                data-cy="mobile-nav-reconstruction"
                className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation.reconstruction')}
              </Link>
              <Link 
                to="/ackord" 
                data-cy="mobile-nav-ackord"
                className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation.ackord')}
              </Link>
              <Link 
                to="/foretagskop" 
                data-cy="mobile-nav-foretagskop"
                className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation.foretagskop')}
              </Link>
              <Link 
                to="/om-oss" 
                data-cy="mobile-nav-about"
                className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation.about')}
              </Link>
              <Link 
                to="/kontakt" 
                data-cy="mobile-nav-contact"
                className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation.contact')}
              </Link>
              {/* Mobile login button - commented out for now, will use later
              <Link 
                to="/authentication" 
                data-cy="mobile-nav-authentication"
                className="bg-brand-umber text-brand-linen px-4 py-2 font-medium hover:bg-brand-black transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation.login')}
              </Link>
              */}
              
              {/* Mobile Language Switcher */}
              <div data-cy="mobile-language-switcher" className="pt-2 border-t border-brand-khaki border-opacity-30">
                <p className="text-sm text-brand-charcoal mb-2">{t('navigation.language')}</p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    data-cy="mobile-language-sv"
                    onClick={() => changeLanguage('sv')}
                    className={`flex items-center gap-2 px-3 py-2 ${currentLanguage === 'sv' ? 'bg-brand-khaki bg-opacity-30 text-brand-black font-medium' : 'bg-brand-linen text-brand-charcoal'}`}
                  >
                    <SwedishFlag className="w-6 h-4 border border-brand-khaki" />
                    <span>Svenska</span>
                  </button>
                  <button
                    data-cy="mobile-language-en"
                    onClick={() => changeLanguage('en')}
                    className={`flex items-center gap-2 px-3 py-2 ${currentLanguage === 'en' ? 'bg-brand-khaki bg-opacity-30 text-brand-black font-medium' : 'bg-brand-linen text-brand-charcoal'}`}
                  >
                    <BritishFlag className="w-6 h-4 border border-brand-khaki" />
                    <span>English</span>
                  </button>
                  <button
                    data-cy="mobile-language-fa"
                    onClick={() => changeLanguage('fa')}
                    className={`flex items-center gap-2 px-3 py-2 ${currentLanguage === 'fa' ? 'bg-brand-khaki bg-opacity-30 text-brand-black font-medium' : 'bg-brand-linen text-brand-charcoal'}`}
                  >
                    <PersianFlag className="w-6 h-4 border border-brand-khaki" />
                    <span>فارسی</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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