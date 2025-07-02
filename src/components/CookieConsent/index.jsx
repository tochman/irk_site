import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { COOKIE_SETTINGS_EVENTS } from "./cookieConsentUtil";

/**
 * @typedef {Object} CookieConsent
 * @property {boolean} necessary - Always required cookies
 * @property {boolean} preferences - Cookies for user preferences
 * @property {boolean} statistics - Cookies for analytics and statistics
 * @property {boolean} marketing - Cookies for marketing and advertising
 * @property {string|null} acceptedAt - Timestamp when consent was given
 */

/** @type {CookieConsent} */
const defaultConsent = {
  necessary: true, // Necessary cookies are always enabled
  preferences: false,
  statistics: false,
  marketing: false,
  acceptedAt: null,
};

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState(defaultConsent);
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  // Listen for external events to open cookie settings
  useEffect(() => {
    const handleOpenSettings = () => {
      setIsOpen(true);
      setShowDetails(true);
    };

    window.addEventListener(COOKIE_SETTINGS_EVENTS.OPEN, handleOpenSettings);
    return () => {
      window.removeEventListener(COOKIE_SETTINGS_EVENTS.OPEN, handleOpenSettings);
    };
  }, []);

  // Load consent settings from localStorage
  useEffect(() => {
    setMounted(true);
    const savedConsent = localStorage.getItem("cookieConsent");
    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent);
        setConsent(parsedConsent);
        setIsOpen(false);
      } catch (error) {
        console.error("Error parsing stored cookie consent:", error);
        setIsOpen(true);
      }
    } else {
      setIsOpen(true);
    }
  }, []);

  // Save consent settings to localStorage
  const saveConsent = (newConsent) => {
    localStorage.setItem("cookieConsent", JSON.stringify(newConsent));
    setConsent(newConsent);
    setIsOpen(false);
    
    // Dispatch storage event so other components can react to the change
    window.dispatchEvent(new Event('storage'));
  };

  // Handle accepting all cookies
  const acceptAll = () => {
    const newConsent = {
      necessary: true,
      preferences: true,
      statistics: true,
      marketing: true,
      acceptedAt: new Date().toISOString(),
    };
    saveConsent(newConsent);
  };

  // Handle accepting only necessary cookies
  const acceptNecessary = () => {
    const newConsent = {
      ...defaultConsent,
      acceptedAt: new Date().toISOString(),
    };
    saveConsent(newConsent);
  };

  // Handle saving custom cookie preferences
  const savePreferences = () => {
    const newConsent = {
      ...consent,
      acceptedAt: new Date().toISOString(),
    };
    saveConsent(newConsent);
  };

  // Handle checkbox toggle for each cookie type
  const handleCheckboxChange = (type) => {
    if (type === "necessary") return; // Necessary cookies cannot be disabled
    
    setConsent({
      ...consent,
      [type]: !consent[type],
    });
  };

  // Open cookie settings
  const openCookieSettings = () => {
    setIsOpen(true);
    setShowDetails(true);
  };
  
  // Handle policy link clicks - close the banner
  const handlePolicyClick = () => {
    setIsOpen(false);
  };

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  // Don't show banner if consent has already been given
  if (!isOpen) {
    return (
      <button
        className="fixed bottom-4 left-4 z-50 p-3 bg-brand-umber text-white rounded-full shadow-lg hover:bg-brand-charcoal transition-colors"
        onClick={openCookieSettings}
        aria-label="Cookieinställningar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
        </svg>
      </button>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      
      {/* Cookie consent banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-brand-linen shadow-lg z-50 animate-modalFadeIn">
        <div className="container mx-auto max-w-screen-xl p-4 md:p-6">
          
          {/* Main content */}
          <div className="flex flex-col">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="text-brand-umber" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 0 0-6.8 12.1c.2.3.3.5.3.8v2.5c0 .4.2.6.5.8.3.2.6.2.9.1l2.7-1c.5.1.9.1 1.4.1a8 8 0 1 0 0-16Zm0 15c-.4 0-.7 0-1.1-.1h-.1L4.5 16v-2.2a.8.8 0 0 0-.1-.4 7 7 0 1 1 8.7-9.1 7 7 0 0 1-5 10.8Z"/>
                  <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                  <path d="M5.5 5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM8 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
                <h2 className="text-xl font-semibold text-brand-charcoal">
                  {t('cookieConsent.settings')}
                </h2>
              </div>
              {consent.acceptedAt && (
                <button
                  className="text-brand-charcoal hover:text-brand-black"
                  onClick={() => setIsOpen(false)}
                  aria-label={t('cookieConsent.close')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                  </svg>
                </button>
              )}
            </div>
            
            <div className="mt-4">
              <p className="text-brand-charcoal text-sm md:text-base">
                {t('cookieConsent.message')}
              </p>
              
              <div className="mt-4">
                {!showDetails ? (
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-brand-umber flex items-center hover:underline text-sm md:text-base transition-colors"
                  >
                    {t('cookieConsent.showDetails')}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="ml-1" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-brand-umber flex items-center hover:underline text-sm md:text-base transition-colors"
                  >
                    {t('cookieConsent.hideDetails')}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="ml-1" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            {/* Detailed cookie options */}
            {showDetails && (
              <div className="mt-4 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-brand-charcoal">{t('cookieConsent.necessary.title')}</h3>
                    <p className="text-xs text-brand-charcoal/80 mt-1">
                      {t('cookieConsent.necessary.description')}
                    </p>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={consent.necessary}
                      disabled
                      className="sr-only peer"
                      id="necessary-cookie"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-checked:bg-brand-umber rounded-full peer peer-disabled:bg-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"></div>
                    <div className="absolute left-[2px] top-[2px] peer-checked:left-[22px] peer-disabled:peer-checked:left-[22px] w-5 h-5 bg-white rounded-full transition peer-disabled:cursor-not-allowed"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-brand-charcoal">{t('cookieConsent.preferences.title')}</h3>
                    <p className="text-xs text-brand-charcoal/80 mt-1">
                      {t('cookieConsent.preferences.description')}
                    </p>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={consent.preferences}
                      onChange={() => handleCheckboxChange('preferences')}
                      className="sr-only peer"
                      id="preferences-cookie"
                    />
                    <label htmlFor="preferences-cookie" className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-checked:bg-brand-umber rounded-full peer cursor-pointer"></label>
                    <div className="absolute left-[2px] top-[2px] peer-checked:left-[22px] w-5 h-5 bg-white rounded-full transition"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-brand-charcoal">{t('cookieConsent.statistics.title')}</h3>
                    <p className="text-xs text-brand-charcoal/80 mt-1">
                      {t('cookieConsent.statistics.description')}
                    </p>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={consent.statistics}
                      onChange={() => handleCheckboxChange('statistics')}
                      className="sr-only peer"
                      id="statistics-cookie"
                    />
                    <label htmlFor="statistics-cookie" className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-checked:bg-brand-umber rounded-full peer cursor-pointer"></label>
                    <div className="absolute left-[2px] top-[2px] peer-checked:left-[22px] w-5 h-5 bg-white rounded-full transition"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-brand-charcoal">{t('cookieConsent.marketing.title')}</h3>
                    <p className="text-xs text-brand-charcoal/80 mt-1">
                      {t('cookieConsent.marketing.description')}
                    </p>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={consent.marketing}
                      onChange={() => handleCheckboxChange('marketing')}
                      className="sr-only peer"
                      id="marketing-cookie"
                    />
                    <label htmlFor="marketing-cookie" className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-checked:bg-brand-umber rounded-full peer cursor-pointer"></label>
                    <div className="absolute left-[2px] top-[2px] peer-checked:left-[22px] w-5 h-5 bg-white rounded-full transition"></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Footer with links and buttons */}
            <div className="flex flex-col md:flex-row md:justify-between mt-6 gap-4">
              <div className="flex items-center text-xs text-brand-charcoal/80 flex-wrap gap-x-4">
                <Link 
                  to="/integrity" 
                  className="hover:text-brand-umber underline transition-colors"
                  onClick={handlePolicyClick}
                >
                  {t("cookieConsent.privacyPolicy")}
                </Link>
                <Link 
                  to="/consent" 
                  className="hover:text-brand-umber underline transition-colors"
                  onClick={handlePolicyClick}
                >
                  {t("cookieConsent.cookiePolicy")}
                </Link>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                {!consent.acceptedAt && (
                  <button
                    onClick={acceptNecessary}
                    className="px-4 py-2 border border-gray-300 text-brand-charcoal hover:bg-gray-100 text-sm transition-colors"
                  >
                    {t('cookieConsent.acceptNecessary')}
                  </button>
                )}
                
                <button
                  onClick={showDetails ? savePreferences : acceptAll}
                  className="px-4 py-2 bg-brand-umber hover:bg-brand-umber/90 text-white text-sm transition-colors"
                >
                  {showDetails ? t('cookieConsent.savePreferences') : t('cookieConsent.acceptAll')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
