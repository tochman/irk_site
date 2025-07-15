import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SEOHead() {
  const { t, i18n, ready } = useTranslation();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until component is mounted and i18next is ready
  if (!mounted || !ready) {
    return null;
  }

  // Additional check: ensure the current language's translations are loaded
  const hasTranslations = i18n.hasResourceBundle(i18n.language, 'translation');
  if (!hasTranslations) {
    return null;
  }

  // Determine page type based on current route
  const getPageType = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/rekonstruktion' || path === '/foretagsrekonstruktion') return 'reconstruction';
    if (path === '/ackord') return 'accord';
    if (path === '/foretagskop') return 'acquisition';
    if (path === '/om-oss') return 'about';
    if (path === '/kontakt') return 'contact';
    if (path === '/consent') return 'consent';
    if (path === '/integrity') return 'privacy';
    return 'home'; // fallback
  };

  const pageType = getPageType();
  const currentUrl = `${window.location.origin}${location.pathname}`;
  
  // Get page-specific content
  const title = t(`seo.${pageType}.title`);
  const description = t(`seo.${pageType}.description`);
  const keywords = t(`seo.${pageType}.keywords`);
  
  // Language-specific OG image
  const ogImage = `${window.location.origin}/images/og-preview-${i18n.language}.jpg`;
  
  // Language and alternate URLs
  const alternateUrls = ['en', 'sv', 'fa'].map(lang => ({
    lang,
    url: `${window.location.origin}${location.pathname}?lang=${lang}`
  }));

  return (
    <Helmet defer={false}>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <html lang={i18n.language} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Reconstructor" />
      <meta property="og:locale" content={i18n.language === 'sv' ? 'sv_SE' : i18n.language === 'fa' ? 'fa_IR' : 'en_US'} />
      
      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Language Alternates */}
      {alternateUrls.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${window.location.origin}${location.pathname}`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-TileColor" content="#5e503f" />
      <meta name="application-name" content="Reconstructor" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Reconstructor",
          "alternateName": "Communitals Labs",
          "url": window.location.origin,
          "logo": `${window.location.origin}/images/logo.svg`,
          "description": t('seo.home.description'),
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "SE"
          },
          "sameAs": [
            // Add social media URLs here if available
          ],
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${window.location.origin}/?search={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
}

export default SEOHead;
