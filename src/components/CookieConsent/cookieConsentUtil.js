/**
 * @typedef {Object} CookieConsentType
 * @property {boolean} necessary - Always required cookies
 * @property {boolean} preferences - Cookies for user preferences
 * @property {boolean} statistics - Cookies for analytics and statistics
 * @property {boolean} marketing - Cookies for marketing and advertising
 * @property {string|null} acceptedAt - Timestamp when consent was given
 */

// Custom event names for cookie consent
export const COOKIE_SETTINGS_EVENTS = {
  OPEN: 'cookie-settings:open'
};

/**
 * Opens the cookie settings dialog
 */
export function openCookieSettings() {
  const event = new CustomEvent(COOKIE_SETTINGS_EVENTS.OPEN);
  window.dispatchEvent(event);
}

/**
 * Checks if a specific cookie category has been approved by the user
 * @param {string} category - The cookie category to check ('necessary', 'preferences', 'statistics', 'marketing')
 * @returns {boolean} - Indicating if the category is approved
 */
export function isConsentGiven(category) {
  // Necessary cookies are always allowed
  if (category === 'necessary') return true;
  
  // Check localStorage for consent
  try {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (!savedConsent) return false;
    
    const consent = JSON.parse(savedConsent);
    return !!consent[category];
  } catch (error) {
    console.error('Error checking cookie consent:', error);
    return false;
  }
}

/**
 * Checks if the user has given any consent (regardless of specific settings)
 * @returns {boolean} - Indicating if consent has been given
 */
export function hasConsentBeenGiven() {
  try {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (!savedConsent) return false;
    
    const consent = JSON.parse(savedConsent);
    return !!consent.acceptedAt;
  } catch (error) {
    console.error('Error checking if cookie consent exists:', error);
    return false;
  }
}

// This was previously exported at the top of the file
