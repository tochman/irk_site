import React from 'react';
import { useTranslation } from 'react-i18next';

function Consent() {
  const { t } = useTranslation();

  return (
    <div className="bg-brand-linen min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl md:text-4xl font-heading text-brand-umber mb-6">{t('cookiePolicy.title')}</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl text-brand-charcoal">{t('cookiePolicy.whatAreCookies')}</h2>
            <p>{t('cookiePolicy.cookiesExplanation')}</p>
            
            <h2 className="text-2xl text-brand-charcoal mt-8">{t('cookiePolicy.howWeUse')}</h2>
            <p>{t('cookiePolicy.useExplanation')}</p>
            
            <h3 className="text-xl text-brand-charcoal">{t('cookiePolicy.necessary.title')}</h3>
            <p>{t('cookiePolicy.necessary.description')}</p>
            
            <h3 className="text-xl text-brand-charcoal">{t('cookiePolicy.preferences.title')}</h3>
            <p>{t('cookiePolicy.preferences.description')}</p>
            
            <h3 className="text-xl text-brand-charcoal">{t('cookiePolicy.statistics.title')}</h3>
            <p>{t('cookiePolicy.statistics.description')}</p>
            
            <h3 className="text-xl text-brand-charcoal">{t('cookiePolicy.marketing.title')}</h3>
            <p>{t('cookiePolicy.marketing.description')}</p>
            
            <h2 className="text-2xl text-brand-charcoal mt-8">{t('cookiePolicy.manageTitle')}</h2>
            <p>{t('cookiePolicy.manageDescription')}</p>
            
            <div className="mt-6">
              <button 
                onClick={() => {
                  // Dispatch custom event to open cookie settings
                  const event = new Event('cookie-settings:open');
                  window.dispatchEvent(event);
                }}
                className="px-4 py-2 bg-brand-umber text-white rounded hover:bg-brand-umber/90 transition-colors"
              >
                {t('cookiePolicy.openSettings')}
              </button>
            </div>
            
            <h2 className="text-2xl text-brand-charcoal mt-8">{t('cookiePolicy.contactTitle')}</h2>
            <p>{t('cookiePolicy.contactDescription')}</p>
            
            <div className="border-t border-gray-200 pt-4 mt-8 text-sm text-gray-600">
              <p>{t('cookiePolicy.lastUpdated')}: 2025-07-01</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consent;
