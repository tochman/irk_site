import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useFacebookPixel from '@/hooks/useFacebookPixel';

function Ackord() {
  const { t } = useTranslation();
  const { trackViewContent } = useFacebookPixel();

  useEffect(() => {
    // Track page view for composition service
    trackViewContent('Composition Agreement');
  }, [trackViewContent]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-charcoal to-brand-umber text-brand-linen py-16">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-black bg-opacity-40 backdrop-blur-sm px-8 py-12 border border-white border-opacity-20">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {t('ackord.hero.title')}
              </h1>
              <p className="text-xl text-white opacity-95">
                {t('ackord.hero.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-brand-black mb-6">
              {t('ackord.what_is.title')}
            </h2>
            <p className="text-brand-charcoal mb-8">
              {t('ackord.what_is.description')}
            </p>

            {/* Visual break with image */}
            <div className="my-12">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt={t('ackord.process_image_alt')}
                className="w-full h-64 object-cover shadow-lg"
              />
            </div>

            <h3 className="text-2xl font-bold text-brand-black mb-4">
              {t('ackord.how_it_works.title')}
            </h3>
            <div className="space-y-6 mb-10">
              <div className="bg-brand-linen p-6 border-l-4 border-brand-umber">
                <h4 className="font-bold text-brand-black mb-2">
                  {t('ackord.step1.title')}
                </h4>
                <p className="text-brand-charcoal">
                  {t('ackord.step1.description')}
                </p>
              </div>
              
              <div className="bg-brand-linen p-6 border-l-4 border-brand-umber">
                <h4 className="font-bold text-brand-black mb-2">
                  {t('ackord.step2.title')}
                </h4>
                <p className="text-brand-charcoal">
                  {t('ackord.step2.description')}
                </p>
              </div>
              
              <div className="bg-brand-linen p-6 border-l-4 border-brand-umber">
                <h4 className="font-bold text-brand-black mb-2">
                  {t('ackord.step3.title')}
                </h4>
                <p className="text-brand-charcoal">
                  {t('ackord.step3.description')}
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-brand-black mb-4">
              {t('ackord.benefits.title')}
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-10 text-brand-charcoal">
              <li>{t('ackord.benefits.1')}</li>
              <li>{t('ackord.benefits.2')}</li>
              <li>{t('ackord.benefits.3')}</li>
              <li>{t('ackord.benefits.4')}</li>
              <li>{t('ackord.benefits.5')}</li>
            </ul>

            <h3 className="text-2xl font-bold text-brand-black mb-4">
              {t('ackord.when_suitable.title')}
            </h3>
            <p className="text-brand-charcoal mb-6">
              {t('ackord.when_suitable.description')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-10 text-brand-charcoal">
              <li>{t('ackord.suitable.1')}</li>
              <li>{t('ackord.suitable.2')}</li>
              <li>{t('ackord.suitable.3')}</li>
              <li>{t('ackord.suitable.4')}</li>
            </ul>

            {/* Call to Action */}
            <div className="bg-brand-khaki bg-opacity-20 p-8 mt-12 text-center">
              <h3 className="text-2xl font-bold text-brand-black mb-4">
                {t('ackord.cta.title')}
              </h3>
              <p className="text-brand-charcoal mb-6">
                {t('ackord.cta.description')}
              </p>
              <Link 
                to="/kontakt" 
                className="inline-block bg-brand-umber text-brand-linen px-8 py-3 font-semibold hover:bg-brand-black transition-colors"
              >
                {t('ackord.cta.button')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ackord;
