/**
 * Utility functions for GDPR-compliant cookie handling
 */

/**
 * Sets a cookie with the provided name, value, and options
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {Object} options - Cookie options (domain, path, maxAge, expires, secure, httpOnly, sameSite)
 */
export const setCookie = (name, value, options = {}) => {
  if (typeof document === 'undefined') return;

  const defaultOptions = {
    path: '/',
    sameSite: 'strict',
    // Add other defaults if needed
  };

  const cookieOptions = { ...defaultOptions, ...options };
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  // Add options to cookie string
  for (const optionKey in cookieOptions) {
    const optionValue = cookieOptions[optionKey];
    if (optionValue === undefined) continue;

    if (optionKey === 'maxAge') {
      cookieString += `; max-age=${optionValue}`;
    } else if (optionKey === 'expires') {
      const expirationDate = 
        optionValue instanceof Date 
          ? optionValue.toUTCString() 
          : new Date(optionValue).toUTCString();
      cookieString += `; expires=${expirationDate}`;
    } else if (optionKey === 'secure' || optionKey === 'httpOnly') {
      if (optionValue) {
        cookieString += `; ${optionKey}`;
      }
    } else {
      cookieString += `; ${optionKey}=${optionValue}`;
    }
  }

  // Set the cookie
  document.cookie = cookieString;
};

/**
 * Gets a cookie by name
 * @param {string} name - Cookie name
 * @returns {string|null} - Cookie value or null if not found
 */
export const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (decodeURIComponent(cookieName) === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

/**
 * Deletes a cookie by name
 * @param {string} name - Cookie name
 * @param {Object} options - Cookie options (domain, path)
 */
export const deleteCookie = (name, options = {}) => {
  const defaultOptions = { path: '/' };
  const cookieOptions = { ...defaultOptions, ...options };
  
  // Set cookie with expiration in the past
  setCookie(name, '', {
    ...cookieOptions,
    expires: new Date(0),
  });
};

/**
 * Checks if all necessary cookies are allowed based on user preferences
 * @returns {boolean} - Whether necessary cookies are allowed
 */
export const areNecessaryCookiesAllowed = () => {
  // Necessary cookies are always allowed
  return true;
};

/**
 * Checks if functional cookies are allowed based on user preferences
 * @returns {boolean} - Whether functional cookies are allowed
 */
export const areFunctionalCookiesAllowed = () => {
  const consentStatus = localStorage.getItem('cookieConsent');
  if (consentStatus === 'accepted') return true;
  
  // Check detailed preferences if partial consent
  if (consentStatus === 'partial') {
    try {
      const preferences = JSON.parse(localStorage.getItem('cookiePreferencesDetailed'));
      return preferences?.functional === true;
    } catch {
      return false;
    }
  }
  
  return false;
};

/**
 * Checks if analytics cookies are allowed based on user preferences
 * @returns {boolean} - Whether analytics cookies are allowed
 */
export const areAnalyticsCookiesAllowed = () => {
  const consentStatus = localStorage.getItem('cookieConsent');
  if (consentStatus === 'accepted') return true;
  
  // Check detailed preferences if partial consent
  if (consentStatus === 'partial') {
    try {
      const preferences = JSON.parse(localStorage.getItem('cookiePreferencesDetailed'));
      return preferences?.analytics === true;
    } catch {
      return false;
    }
  }
  
  return false;
};
