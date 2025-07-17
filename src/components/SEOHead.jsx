import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

function SEOHead() {
  const { t, i18n, ready } = useTranslation();

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

  // Simple test values
  const testTitle = t('seo.home.title');
  const testDescription = t('seo.home.description');
  
  console.log('Test values:', { testTitle, testDescription });

  return (
    <Helmet>
      <title>{testTitle}</title>
      <meta name="description" content={testDescription} />
      <meta property="og:title" content={testTitle} />
      <meta property="og:description" content={testDescription} />
      <meta name="twitter:title" content={testTitle} />
      <meta name="twitter:description" content={testDescription} />
    </Helmet>
  );
}

export default SEOHead;
