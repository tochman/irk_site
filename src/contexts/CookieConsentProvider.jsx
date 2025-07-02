import React, { useState, useEffect } from 'react';
import CookieConsentContext from './CookieConsentContext';

/**
 * CookieConsentProvider component
 * Manages the cookie consent state throughout the application
 */
const CookieConsentProvider = ({ children }) => {
  // Store cookie consent state
  const [consentStatus, setConsentStatus] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Load consent status from localStorage on component mount
  useEffect(() => {
    const storedConsent = localStorage.getItem('cookieConsent');
    setConsentStatus(storedConsent);
    setLoaded(true);
  }, []);

  // Update consent status and store it in localStorage
  const updateConsentStatus = (status) => {
    localStorage.setItem('cookieConsent', status);
    setConsentStatus(status);
  };

  // Accept cookies
  const acceptCookies = () => updateConsentStatus('accepted');

  // Decline cookies
  const declineCookies = () => updateConsentStatus('declined');

  // Reset cookie consent (will cause banner to show again)
  const resetCookieConsent = () => {
    localStorage.removeItem('cookieConsent');
    setConsentStatus(null);
  };

  // Check if cookies are accepted
  const hasAcceptedCookies = consentStatus === 'accepted';

  // Context value
  const value = {
    consentStatus,
    loaded,
    acceptCookies,
    declineCookies,
    resetCookieConsent,
    hasAcceptedCookies,
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export default CookieConsentProvider;
