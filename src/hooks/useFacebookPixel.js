import { useEffect } from 'react';

const FACEBOOK_PIXEL_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID;

// Hook for Facebook Pixel tracking
export const useFacebookPixel = () => {
  useEffect(() => {
    // Only initialize if Facebook Pixel ID is available
    if (!FACEBOOK_PIXEL_ID) {
      console.warn('Facebook Pixel ID not found in environment variables');
      return;
    }

    // Initialize Facebook Pixel if not already done
    if (typeof window !== 'undefined' && !window.fbq) {
      (function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)})(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      
      window.fbq('init', FACEBOOK_PIXEL_ID);
      window.fbq('track', 'PageView');
    }
  }, []);

  // Function to track custom events
  const trackEvent = (eventName, parameters = {}) => {
    if (!FACEBOOK_PIXEL_ID) {
      console.warn('Facebook Pixel ID not available - tracking skipped');
      return;
    }
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, parameters);
    }
  };

  // Predefined tracking functions for common events
  const trackContactFormSubmit = (parameters = {}) => {
    trackEvent('Contact', parameters);
  };

  const trackLead = (parameters = {}) => {
    trackEvent('Lead', parameters);
  };

  const trackCompleteRegistration = (parameters = {}) => {
    trackEvent('CompleteRegistration', parameters);
  };

  const trackViewContent = (contentName) => {
    trackEvent('ViewContent', { content_name: contentName });
  };

  return {
    trackEvent,
    trackContactFormSubmit,
    trackLead,
    trackCompleteRegistration,
    trackViewContent
  };
};

export default useFacebookPixel;
