import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CookieSettings from './CookieSettings';
import useCookieConsent from '@/hooks/useCookieConsent';

/**
 * CookieConsent component for GDPR compliance
 * Displays a banner on first visit and allows users to accept/decline cookies
 */
const CookieConsent = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { consentStatus, acceptCookies, declineCookies } = useCookieConsent();

  // Check local storage for cookie consent preference on component mount
  useEffect(() => {
    // If no consent has been given, show the banner
    if (consentStatus === null) {
      setIsVisible(true);
    }
  }, [consentStatus]);

  // Handle accepting cookies
  const handleAcceptCookies = () => {
    acceptCookies();
    setIsVisible(false);
  };

  // Handle declining cookies
  const handleDeclineCookies = () => {
    declineCookies();
    setIsVisible(false);
  };

  // Open cookie settings modal
  const openSettings = () => {
    setShowSettings(true);
  };

  // Close cookie settings modal
  const closeSettings = () => {
    setShowSettings(false);
  };

  // Return null if the banner shouldn't be visible
  if (!isVisible) return null;

  // Render the cookie consent banner
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 p-4 bg-gray-100 dark:bg-gray-800 shadow-lg">
        <div className="container mx-auto max-w-screen-xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm md:text-base dark:text-white">
                {t('cookieConsent.message')}
                <a 
                  href="/privacy-policy" 
                  className="ml-1 underline text-blue-600 dark:text-blue-400"
                >
                  {t('cookieConsent.privacyPolicy')}
                </a>
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleDeclineCookies}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                {t('cookieConsent.decline')}
              </button>
              <button
                onClick={openSettings}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                {t('cookieConsent.settings')}
              </button>
              <button
                onClick={handleAcceptCookies}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t('cookieConsent.accept')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      <CookieSettings isOpen={showSettings} onClose={closeSettings} />
    </>
  );
};

export default CookieConsent;
