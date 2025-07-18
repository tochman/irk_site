import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

function SEOHead() {
  const { t, i18n, ready } = useTranslation();
  const location = useLocation();

  // Don't render until i18next is ready and translations are loaded
  if (!ready) {
    return null;
  }

  // Additional check: ensure the current language's translations are loaded
  const hasTranslations = i18n.hasResourceBundle(i18n.language, 'translation');
  if (!hasTranslations) {
    console.log(`Waiting for ${i18n.language} translations to load...`);
    return null;
  }

  console.log(`SEOHead rendering with language: ${i18n.language}`);

  // Get current URL
  const currentUrl = `https://reconstructor.se${location.pathname}`;
  
  // Get page-specific SEO data or use defaults
  const getPageSEO = () => {
    const path = location.pathname;
    
    switch(path) {
      case '/rekonstruktion':
        return {
          title: t('seo.reconstruction.title'),
          description: t('seo.reconstruction.description'),
          keywords: t('seo.reconstruction.keywords')
        };
      case '/ackord':
        return {
          title: t('seo.composition.title'),
          description: t('seo.composition.description'),
          keywords: t('seo.composition.keywords')
        };
      case '/konkurs-likvidation':
        return {
          title: t('seo.bankruptcyLiquidation.title', 'Bankruptcy & Liquidation - Expert Legal Guidance | Reconstructor'),
          description: t('seo.bankruptcyLiquidation.description', 'Expert guidance through bankruptcy and liquidation proceedings. Specialists in personal board liability protection. Minimize risk and exposure with professional support.'),
          keywords: t('seo.bankruptcyLiquidation.keywords', 'bankruptcy, liquidation, board liability, personal protection, legal proceedings, corporate restructuring')
        };
      case '/kontakt':
        return {
          title: t('seo.contact.title'),
          description: t('seo.contact.description'),
          keywords: t('seo.contact.keywords')
        };
      case '/om-oss':
        return {
          title: t('seo.about.title'),
          description: t('seo.about.description'),
          keywords: t('seo.about.keywords')
        };
      default:
        return {
          title: t('seo.home.title'),
          description: t('seo.home.description'),
          keywords: t('seo.home.keywords')
        };
    }
  };

  const seoData = getPageSEO();
  
  // Open Graph image - use PNG for better crawler support instead of SVG
  const ogImage = 'https://reconstructor.se/images/eagle_logo_2.png';
  const siteName = 'Reconstructor';
  
  console.log('SEO Data:', seoData);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <meta name="author" content="Reconstructor - International Restructuring Specialists" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={currentUrl} />
      
      {/* Language and Region */}
      <meta httpEquiv="content-language" content={i18n.language} />
      <meta name="language" content={i18n.language} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:alt" content="Reconstructor - International Restructuring Specialists" />
      <meta property="og:locale" content={i18n.language === 'sv' ? 'sv_SE' : i18n.language === 'fa' ? 'fa_IR' : 'en_US'} />
      
      {/* Facebook-specific tags - providing proper Open Graph data is sufficient for basic sharing */}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@reconstructor" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Reconstructor - International Restructuring Specialists" />
      
      {/* Additional Business-specific Meta Tags */}
      <meta name="geo.region" content="SE" />
      <meta name="geo.placename" content="Sweden" />
      <meta name="business:contact_data:street_address" content="Stockholm, Sweden" />
      <meta name="business:contact_data:locality" content="Stockholm" />
      <meta name="business:contact_data:region" content="Stockholm" />
      <meta name="business:contact_data:postal_code" content="114 35" />
      <meta name="business:contact_data:country_name" content="Sweden" />
      <meta name="business:contact_data:email" content="info@reconstructor.se" />
      <meta name="business:contact_data:phone_number" content="+46708281225" />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Reconstructor",
          "description": seoData.description,
          "url": "https://reconstructor.se",
          "logo": "https://reconstructor.se/images/eagle_logo_2.svg",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+46-708-281225",
            "contactType": "customer service",
            "email": "info@reconstructor.se",
            "availableLanguage": ["Swedish", "English", "Persian"]
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "SE",
            "addressRegion": "Stockholm",
            "addressLocality": "Stockholm"
          },
          "serviceArea": {
            "@type": "Place",
            "name": "Sweden"
          },
          "areaServed": "SE",
          "priceRange": "$$",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Business Restructuring Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Company Reconstruction",
                  "description": "Legal process providing protection from creditors"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Service",
                  "name": "Composition Agreement",
                  "description": "Negotiated agreements with creditors"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service", 
                  "name": "Bankruptcy & Liquidation",
                  "description": "Expert guidance through complex proceedings with board liability protection"
                }
              }
            ]
          }
        })}
      </script>
    </Helmet>
  );
}

export default SEOHead;
