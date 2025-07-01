import { isRtlLang } from 'rtl-detect';

// RTL languages that we support
export const RTL_LANGUAGES = ['fa']; // Farsi/Persian

// Check if current language is RTL
export const isRTL = (language) => {
  return RTL_LANGUAGES.includes(language) || isRtlLang(language);
};

// Get text direction based on language
export const getTextDirection = (language) => {
  return isRTL(language) ? 'rtl' : 'ltr';
};

// Apply RTL-aware CSS classes
export const getRTLClasses = (language, classes) => {
  const direction = getTextDirection(language);
  const baseClasses = typeof classes === 'string' ? classes : classes.base || '';
  
  if (direction === 'rtl') {
    const rtlClasses = typeof classes === 'string' ? '' : classes.rtl || '';
    return `${baseClasses} ${rtlClasses} dir-rtl`.trim();
  }
  
  const ltrClasses = typeof classes === 'string' ? '' : classes.ltr || '';
  return `${baseClasses} ${ltrClasses} dir-ltr`.trim();
};

// RTL-aware margin/padding helpers
export const getRTLSpacing = (language) => ({
  marginLeft: isRTL(language) ? 'mr' : 'ml',
  marginRight: isRTL(language) ? 'ml' : 'mr',
  paddingLeft: isRTL(language) ? 'pr' : 'pl',
  paddingRight: isRTL(language) ? 'pl' : 'pr',
  textAlign: {
    left: isRTL(language) ? 'text-right' : 'text-left',
    right: isRTL(language) ? 'text-left' : 'text-right'
  }
});

// Apply RTL direction to document
export const applyRTLDirection = (language) => {
  const direction = getTextDirection(language);
  const html = document.documentElement;
  
  html.setAttribute('dir', direction);
  html.setAttribute('lang', language);
  
  // Add direction class for CSS targeting
  html.classList.remove('dir-ltr', 'dir-rtl');
  html.classList.add(`dir-${direction}`);
};
