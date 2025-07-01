import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

function LanguageSwitcher({ isDesktop = true, onLanguageChange = () => {} }) {
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsDropdownOpen(false);
    onLanguageChange();
  };

  // Close dropdown when clicking outside (for desktop view)
  useEffect(() => {
    if (!isDesktop) return;

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDesktop]);

  // Desktop version of the language switcher
  if (isDesktop) {
    return (
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
          ) : (
            // Default to English for any non-Swedish language (including Farsi)
            <div className="flex items-center">
              <BritishFlag 
                data-cy="current-flag-en" 
                className="w-6 h-4 border border-brand-khaki"
              />
              <span className="text-sm font-medium text-brand-charcoal ml-2">EN</span>
            </div>
          )
          /* Temporarily disabled Farsi language display
          : (
            <div className="flex items-center">
              <PersianFlag 
                data-cy="current-flag-fa" 
                className="w-6 h-4 border border-brand-khaki"
              />
              <span className="text-sm font-medium text-brand-charcoal ml-2">فا</span>
            </div>
          )
          */}
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
            {/* Temporarily disabled Farsi language option
            <button
              data-cy="language-option-fa"
              onClick={() => changeLanguage('fa')}
              className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-brand-khaki hover:bg-opacity-20 text-sm text-brand-charcoal"
            >
              <PersianFlag data-cy="flag-fa" className="w-6 h-4 border border-brand-khaki" />
              <span>فارسی</span>
            </button>
            */}
          </div>
        )}
      </div>
    );
  }

  // Mobile version of the language switcher
  return (
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
        {/* Temporarily disabled Farsi language option
        <button
          data-cy="mobile-language-fa"
          onClick={() => changeLanguage('fa')}
          className={`flex items-center gap-2 px-3 py-2 ${currentLanguage === 'fa' ? 'bg-brand-khaki bg-opacity-30 text-brand-black font-medium' : 'bg-brand-linen text-brand-charcoal'}`}
        >
          <PersianFlag className="w-6 h-4 border border-brand-khaki" />
          <span>فارسی</span>
        </button>
        */}
      </div>
    </div>
  );
}

export default LanguageSwitcher;
