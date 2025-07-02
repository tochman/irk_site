import { useEffect, useState } from 'react';
import { isConsentGiven } from './CookieConsent/cookieConsentUtil';

function GoogleAnalytics({ measurementId }) {
  const [hasConsent, setHasConsent] = useState(false);
  
  // Check for consent on the client side only
  useEffect(() => {
    setHasConsent(isConsentGiven('statistics'));
    
    // Listen for changes to cookie consent
    const handleStorageChange = () => {
      setHasConsent(isConsentGiven('statistics'));
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  // Don't render without consent or if no ID provided
  if (!hasConsent || !measurementId) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

export default GoogleAnalytics;
