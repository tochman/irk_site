import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useFacebookPixel from '@/hooks/useFacebookPixel';

function Foretagsrekonstruktion() {
  const { t } = useTranslation();
  const { trackViewContent } = useFacebookPixel();

  useEffect(() => {
    // Track page view for reconstruction service
    trackViewContent('Company Reconstruction');
  }, [trackViewContent]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-charcoal to-brand-umber text-brand-linen py-16">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-black bg-opacity-40 backdrop-blur-sm px-8 py-12 border border-white border-opacity-20">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {t('reconstruction.hero.title')}
              </h1>
              <p className="text-xl text-white opacity-95">
                {t('reconstruction.hero.subtitle')}
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
              {t('reconstruction.what_is.title')}
            </h2>
            <p className="text-brand-charcoal mb-8">
              {t('reconstruction.what_is.description')}
            </p>

            {/* Visual break with image */}
            <div className="my-12">
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt={t('reconstruction.process_image_alt')}
                className="w-full h-64 object-cover shadow-lg"
              />
            </div>

            <h2 className="text-3xl font-bold text-brand-black mb-6">
              {t('reconstruction.process.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-brand-linen p-6">
                <h3 className="text-xl font-semibold mb-4 text-brand-black">
                  {t('reconstruction.process.step1.title')}
                </h3>
                <p className="text-brand-charcoal">
                  {t('reconstruction.process.step1.description')}
                </p>
              </div>
              <div className="bg-brand-linen p-6">
                <h3 className="text-xl font-semibold mb-4 text-brand-black">
                  {t('reconstruction.process.step2.title')}
                </h3>
                <p className="text-brand-charcoal">
                  {t('reconstruction.process.step2.description')}
                </p>
              </div>
              <div className="bg-brand-linen p-6">
                <h3 className="text-xl font-semibold mb-4 text-brand-black">
                  {t('reconstruction.process.step3.title')}
                </h3>
                <p className="text-brand-charcoal">
                  {t('reconstruction.process.step3.description')}
                </p>
              </div>
              <div className="bg-brand-linen p-6">
                <h3 className="text-xl font-semibold mb-4 text-brand-black">
                  {t('reconstruction.process.step4.title')}
                </h3>
                <p className="text-brand-charcoal">
                  {t('reconstruction.process.step4.description')}
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-brand-black mb-6">
              {t('reconstruction.benefits.title')}
            </h2>
            <ul className="list-disc list-inside space-y-3 text-brand-charcoal mb-12">
              <li>{t('reconstruction.benefits.benefit1')}</li>
              <li>{t('reconstruction.benefits.benefit2')}</li>
              <li>{t('reconstruction.benefits.benefit3')}</li>
              <li>{t('reconstruction.benefits.benefit4')}</li>
              <li>{t('reconstruction.benefits.benefit5')}</li>
            </ul>

            <div className="bg-brand-khaki bg-opacity-20 p-8 text-center">
              <h3 className="text-2xl font-bold text-brand-black mb-4">
                {t('reconstruction.cta.title')}
              </h3>
              <p className="text-brand-charcoal mb-6">
                {t('reconstruction.cta.description')}
              </p>
              <Link
                to="/kontakt"
                className="bg-brand-umber text-brand-linen px-8 py-3 font-semibold hover:bg-brand-black transition-colors"
              >
                {t('reconstruction.cta.button')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Foretagsrekonstruktion;
