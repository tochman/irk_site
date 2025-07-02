import React from 'react';
import { useTranslation } from 'react-i18next';
import { openCookieSettings } from '@/components/CookieConsent/cookieConsentUtil';

/**
 * Footer component that includes links to privacy policy and cookie settings
 */
const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-brand-gray-dark text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} Communitals Labs / Reconstructor. All rights reserved.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <a 
              href="/integrity"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {t('cookieConsent.privacyPolicy')}
            </a>
            
            <button 
              onClick={openCookieSettings}
              className="text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              {t('cookieConsent.settings')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
