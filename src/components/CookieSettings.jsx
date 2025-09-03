import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useCookieConsent from '@/hooks/useCookieConsent';

/**
 * A component that allows users to manage their cookie preferences in detail.
 * Can be opened from links in the footer or other parts of the site.
 */
const CookieSettings = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { acceptCookies, declineCookies } = useCookieConsent();
  
  // Individual cookie category states
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always required, cannot be disabled
    functional: true,
    analytics: true
  });

  // If the modal is not open, don't render anything
  if (!isOpen) return null;
  
  // Handle changes to individual cookie categories
  const handleCookieCategoryChange = (category) => {
    // Necessary cookies cannot be disabled
    if (category === 'necessary') return;
    
    setCookiePreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  // Save preferences and close the modal
  const handleSavePreferences = () => {
    // If all cookies are accepted
    if (cookiePreferences.functional && cookiePreferences.analytics) {
      acceptCookies();
    } 
    // If all non-necessary cookies are declined
    else if (!cookiePreferences.functional && !cookiePreferences.analytics) {
      declineCookies();
    } 
    // If some cookies are accepted and some are declined
    else {
      // Store detailed preferences in localStorage
      localStorage.setItem('cookiePreferencesDetailed', JSON.stringify(cookiePreferences));
      localStorage.setItem('cookieConsent', 'partial');
    }
    
    onClose();
  };
  
  // Accept all cookies
  const handleAcceptAll = () => {
    setCookiePreferences({
      necessary: true,
      functional: true,
      analytics: true
    });
    acceptCookies();
    onClose();
  };
  
  // Decline all cookies except necessary ones
  const handleDeclineAll = () => {
    setCookiePreferences({
      necessary: true,
      functional: false,
      analytics: false
    });
    declineCookies();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white dark:bg-gray-800 rounded-sm w-full max-w-md mx-4 p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t('cookieConsent.settings')}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {t('cookieConsent.message')}
          </p>
          <a 
            href="/privacy-policy" 
            className="text-sm text-blue-600 dark:text-blue-400 underline"
          >
            {t('cookieConsent.privacyPolicy')}
          </a>
        </div>
        
        <div className="space-y-4 mb-6">
          {/* Necessary cookies */}
          <div className="flex items-start justify-between pb-3 border-b">
            <div>
              <h3 className="font-medium">
                {t('cookieConsent.categories.necessary.title')}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('cookieConsent.categories.necessary.description')}
              </p>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={cookiePreferences.necessary}
                disabled={true} // Always required
                className="opacity-50 cursor-not-allowed"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                {t('cookieConsent.alwaysActive')}
              </span>
            </div>
          </div>
          
          {/* Functional cookies */}
          <div className="flex items-start justify-between pb-3 border-b">
            <div>
              <h3 className="font-medium">
                {t('cookieConsent.categories.functional.title')}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('cookieConsent.categories.functional.description')}
              </p>
            </div>
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={cookiePreferences.functional}
                onChange={() => handleCookieCategoryChange('functional')}
                className="mr-2 cursor-pointer"
              />
            </div>
          </div>
          
          {/* Analytics cookies */}
          <div className="flex items-start justify-between pb-3">
            <div>
              <h3 className="font-medium">
                {t('cookieConsent.categories.analytics.title')}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('cookieConsent.categories.analytics.description')}
              </p>
            </div>
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={cookiePreferences.analytics}
                onChange={() => handleCookieCategoryChange('analytics')}
                className="mr-2 cursor-pointer"
              />
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-wrap justify-between gap-2">
          <button
            onClick={handleDeclineAll}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            {t('cookieConsent.decline')}
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={handleSavePreferences}
              className="px-4 py-2 text-sm font-medium text-blue-700 border border-blue-700 rounded hover:bg-blue-50"
            >
              {t('cookieConsent.savePreferences')}
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded hover:bg-blue-700"
            >
              {t('cookieConsent.accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieSettings;
