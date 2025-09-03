import { useTranslation } from 'react-i18next';
import ReconstructionCalculator from '@/components/ReconstructionCalculator';
import SEOHead from '@/components/SEOHead';

function Kalkylator() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead 
        title={t('calculator.title')}
        description={t('calculator.description')}
        keywords="rekonstruktion, kalkylator, kostnad, företagsrekonstruktion, ackord, advokat"
      />
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-6">
            {t('calculator.title')}
          </h1>
          <p className="text-xl text-brand-charcoal max-w-3xl mx-auto leading-relaxed">
            {t('calculator.description')}
          </p>
        </div>

        {/* Calculator Component */}
        <div className="max-w-4xl mx-auto">
          <ReconstructionCalculator />
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-brand-charcoal text-brand-linen rounded-sm p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              {t('landing.cta.title', 'Vill du veta mer?')}
            </h2>
            <p className="text-brand-linen opacity-90 mb-6">
              {t('landing.cta.subtitle', 'Få en personlig konsultation om ditt företags situation och möjligheter.')}
            </p>
            <a
              href="/kontakt"
              className="inline-block bg-brand-khaki text-brand-black px-8 py-3 font-medium hover:bg-brand-umber hover:text-brand-linen transition-colors"
            >
              {t('navigation.contact', 'Kontakta oss')}
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default Kalkylator;
