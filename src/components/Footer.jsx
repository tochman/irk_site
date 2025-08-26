import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { openCookieSettings } from '@/components/CookieConsent/cookieConsentUtil';
import PhoneNumber from './PhoneNumber';

/**
 * Professional footer component with comprehensive company information
 */
const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-brand-charcoal text-brand-linen">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Information */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img 
                src="/images/eagle_logo_2.svg" 
                alt="Reconstructor" 
                className="h-12 w-auto mb-4 filter brightness-0 invert"
              />
              <h3 className="text-xl font-bold mb-3">Reconstructor</h3>
              <p className="text-brand-linen opacity-80 text-sm leading-relaxed">
                {t('footer.company.description', 'Professional help for companies in financial difficulties. We offer confidential consultations and expert guidance to help save your business.')}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-khaki">
              {t('contact.info.title')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-brand-khaki mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <PhoneNumber number="+46 722 441585" isLink={true} className="text-brand-linen hover:text-brand-khaki transition-colors" />
                  <p className="text-xs text-brand-linen opacity-70">{t('contact.info.phone.hours')}</p>
                </div>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-brand-khaki mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <a href="mailto:info@reconstructor.se" className="text-brand-linen hover:text-brand-khaki transition-colors">
                    info@reconstructor.se
                  </a>
                  <p className="text-xs text-brand-linen opacity-70">{t('contact.info.email.response')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-khaki">
              {t('footer.services.title', 'Our Services')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/rekonstruktion" className="text-brand-linen opacity-80 hover:opacity-100 hover:text-brand-khaki transition-colors text-sm">
                  {t('navigation.reconstruction')}
                </Link>
              </li>
              <li>
                <Link to="/ackord" className="text-brand-linen opacity-80 hover:opacity-100 hover:text-brand-khaki transition-colors text-sm">
                  {t('navigation.ackord')}
                </Link>
              </li>
              <li>
                <Link to="/konkurs-likvidation" className="text-brand-linen opacity-80 hover:opacity-100 hover:text-brand-khaki transition-colors text-sm">
                  {t('footer.services.bankruptcy', 'Bankruptcy')}
                </Link>
              </li>
              <li>
                <Link to="/konkurs-likvidation" className="text-brand-linen opacity-80 hover:opacity-100 hover:text-brand-khaki transition-colors text-sm">
                  {t('footer.services.liquidation', 'Liquidation')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-khaki">
              {t('footer.support.title', 'Support')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/kontakt" className="text-brand-linen opacity-80 hover:opacity-100 hover:text-brand-khaki transition-colors text-sm">
                  {t('navigation.contact')}
                </Link>
              </li>
              <li>
                <a 
                  href="/integrity"
                  className="text-brand-linen opacity-80 hover:opacity-100 hover:text-brand-khaki transition-colors text-sm"
                >
                  {t('cookieConsent.privacyPolicy')}
                </a>
              </li>
              <li>
                <button 
                  onClick={openCookieSettings}
                  className="text-brand-linen opacity-80 hover:opacity-100 hover:text-brand-khaki transition-colors text-sm text-left"
                >
                  {t('cookieConsent.settings')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Emergency Contact Banner */}
        <div className="mt-12 bg-brand-umber bg-opacity-30 border border-brand-umber border-opacity-50 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-brand-khaki mb-2">
                {t('contact.emergency.title')}
              </h4>
              <p className="text-brand-linen opacity-90 text-sm">
                {t('contact.emergency.description')}
              </p>
            </div>
            <Link
              to="/kontakt"
              className="bg-brand-khaki text-brand-black px-6 py-3 font-semibold hover:bg-opacity-90 transition-colors whitespace-nowrap"
            >
              {t('contact.emergency.button')}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-linen border-opacity-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-brand-linen opacity-70 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Communitals Labs / Reconstructor. {t('footer.rights', 'All rights reserved.')}{' '}
              <span className="text-brand-khaki">{t('footer.confidential', 'All consultations are confidential.')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
