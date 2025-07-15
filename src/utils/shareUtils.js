/**
 * Utility functions for generating shareable URLs with language parameters
 */

/**
 * Generate a shareable URL with language parameter
 * @param {string} path - The path to share (e.g., '/kontakt', '/om-oss')
 * @param {string} language - The language code (e.g., 'sv', 'fa', 'en')
 * @returns {string} - Complete shareable URL
 */
export function generateShareableURL(path = '', language = 'en') {
  const baseUrl = 'https://reconstructor.se';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const langParam = language !== 'en' ? `?lang=${language}` : '';
  return `${baseUrl}${cleanPath}${langParam}`;
}

/**
 * Get the current language from URL query parameters
 * @returns {string} - Language code or 'en' as default
 */
export function getLanguageFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang');
  const supportedLanguages = ['sv', 'fa', 'en'];
  return supportedLanguages.includes(lang) ? lang : 'en';
}

/**
 * Update URL with language parameter without page reload
 * @param {string} language - The language code
 */
export function updateURLWithLanguage(language) {
  const url = new URL(window.location);
  if (language !== 'en') {
    url.searchParams.set('lang', language);
  } else {
    url.searchParams.delete('lang');
  }
  window.history.replaceState({}, '', url);
}

/**
 * Generate share URLs for social media platforms
 * @param {string} url - The URL to share
 * @param {string} title - The title for sharing
 * @param {string} description - The description for sharing
 * @returns {object} - Object containing URLs for different platforms
 */
export function generateSocialShareURLs(url, title = '', description = '') {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  };
}
