import { useContext } from 'react';
import CookieConsentContext from '../contexts/CookieConsentContext';

/**
 * Custom hook to use the cookie consent context
 * @returns {Object} Object containing consent status and methods to update it
 */
const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  
  return context;
};

export default useCookieConsent;
