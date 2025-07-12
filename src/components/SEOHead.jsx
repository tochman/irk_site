import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

function SEOHead({ 
  title, 
  description, 
  keywords, 
  image,
  type = "website" 
}) {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Get language-specific preview image
    const getPreviewImage = () => {
      if (image) return image; // Use provided image if specified
      
      const baseUrl = "https://reconstructor.se/images";
      switch (i18n.language) {
        case 'sv':
          return `${baseUrl}/reconstructor_screen_sv.png`;
        case 'fa':
          return `${baseUrl}/reconstructor_screen_en.png`; // Use EN for FA until FA image is available
        default:
          return `${baseUrl}/reconstructor_screen_en.png`;
      }
    };

    // Default SEO content based on current language
    const defaultSEO = {
      title: t('seo.default.title', 'Reconstructor - International Restructuring Specialists'),
      description: t('seo.default.description', 'Professional solutions for companies facing financial difficulties. We help through reconstruction, composition or company acquisition. Give your business a second chance.'),
      keywords: t('seo.default.keywords', 'business restructuring, company turnaround, financial difficulties, bankruptcy prevention, business recovery, company reconstruction, debt restructuring, business acquisition, insolvency help')
    };
    
    // Page-specific SEO content
    const getPageSEO = () => {
      const path = location.pathname;
      
      if (path === '/' || path === '') {
        return {
          title: t('seo.home.title', defaultSEO.title),
          description: t('seo.home.description', defaultSEO.description),
          keywords: t('seo.home.keywords', defaultSEO.keywords)
        };
      }
      
      if (path.includes('/kontakt')) {
        return {
          title: t('seo.contact.title', 'Contact Us - Reconstructor'),
          description: t('seo.contact.description', 'Get confidential help for your company\'s financial difficulties. Contact our restructuring specialists for professional guidance and solutions.'),
          keywords: t('seo.contact.keywords', 'contact restructuring specialist, business help, financial crisis consultation, company rescue contact')
        };
      }
      
      if (path.includes('/om-oss')) {
        return {
          title: t('seo.about.title', 'About Us - Reconstructor'),
          description: t('seo.about.description', 'Learn about our team of international restructuring specialists and our mission to help companies overcome financial difficulties.'),
          keywords: t('seo.about.keywords', 'about reconstructor, restructuring team, business turnaround experts, company recovery specialists')
        };
      }
      
      if (path.includes('/foretagsrekonstruktion')) {
        return {
          title: t('seo.reconstruction.title', 'Company Reconstruction - Reconstructor'),
          description: t('seo.reconstruction.description', 'Company reconstruction provides legal protection and time to recover financially. Learn how this process can save your business from bankruptcy.'),
          keywords: t('seo.reconstruction.keywords', 'company reconstruction, business restructuring, bankruptcy protection, financial recovery, debt restructuring')
        };
      }
      
      if (path.includes('/consent')) {
        return {
          title: t('seo.consent.title', 'Cookie Consent - Reconstructor'),
          description: t('seo.consent.description', 'Learn about our cookie policy and manage your consent preferences for a better browsing experience.'),
          keywords: t('seo.consent.keywords', 'cookie policy, privacy consent, data protection, GDPR compliance')
        };
      }
      
      if (path.includes('/integrity')) {
        return {
          title: t('seo.privacy.title', 'Privacy Policy - Reconstructor'),
          description: t('seo.privacy.description', 'Our commitment to protecting your privacy and personal data. Learn how we collect, use and protect your information.'),
          keywords: t('seo.privacy.keywords', 'privacy policy, data protection, GDPR, personal information, data security')
        };
      }
      
      return defaultSEO;
    };

    const pageSEO = getPageSEO();
    const finalTitle = title || pageSEO.title;
    const finalDescription = description || pageSEO.description;
    const finalKeywords = keywords || pageSEO.keywords;
    const finalImage = getPreviewImage();
    const currentUrl = `https://reconstructor.se${location.pathname}`;
    
    // Update document title
    document.title = finalTitle;
    
    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Update basic SEO tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('language', i18n.language === 'sv' ? 'sv' : i18n.language === 'fa' ? 'fa' : 'en');
    
    // Update Open Graph tags
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:image', finalImage, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:locale', 
      i18n.language === 'sv' ? 'sv_SE' : 
      i18n.language === 'fa' ? 'fa_IR' : 'en_US', true);
    
    // Update Twitter Card tags
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalImage);
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);
    
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', i18n.language);
    
  }, [title, description, keywords, image, type, location.pathname, i18n.language, t]);

  return null; // This component doesn't render anything
}

export default SEOHead;
