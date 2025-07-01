import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Foretagskop() {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-charcoal to-brand-umber text-brand-linen py-16">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-black bg-opacity-40 backdrop-blur-sm px-8 py-12 border border-white border-opacity-20">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {t('foretagskop.hero.title')}
              </h1>
              <p className="text-xl text-white opacity-95">
                {t('foretagskop.hero.subtitle')}
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
              {t('foretagskop.why_sell.title')}
            </h2>
            <p className="text-brand-charcoal mb-8">
              {t('foretagskop.why_sell.description')}
            </p>

            {/* Visual break with image */}
            <div className="my-12">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt={t('foretagskop.handshake_image_alt')}
                className="w-full h-64 object-cover shadow-lg"
              />
            </div>

            <h3 className="text-2xl font-bold text-brand-black mb-4">
              {t('foretagskop.our_approach.title')}
            </h3>
            <div className="space-y-6 mb-10">
              <div className="bg-brand-linen p-6 border-l-4 border-brand-umber">
                <h4 className="font-bold text-brand-black mb-2">
                  {t('foretagskop.step1.title')}
                </h4>
                <p className="text-brand-charcoal">
                  {t('foretagskop.step1.description')}
                </p>
              </div>
              
              <div className="bg-brand-linen p-6 border-l-4 border-brand-umber">
                <h4 className="font-bold text-brand-black mb-2">
                  {t('foretagskop.step2.title')}
                </h4>
                <p className="text-brand-charcoal">
                  {t('foretagskop.step2.description')}
                </p>
              </div>
              
              <div className="bg-brand-linen p-6 border-l-4 border-brand-umber">
                <h4 className="font-bold text-brand-black mb-2">
                  {t('foretagskop.step3.title')}
                </h4>
                <p className="text-brand-charcoal">
                  {t('foretagskop.step3.description')}
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-brand-black mb-4">
              {t('foretagskop.what_we_buy.title')}
            </h3>
            <p className="text-brand-charcoal mb-6">
              {t('foretagskop.what_we_buy.description')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-10 text-brand-charcoal">
              <li>{t('foretagskop.sectors.1')}</li>
              <li>{t('foretagskop.sectors.2')}</li>
              <li>{t('foretagskop.sectors.3')}</li>
              <li>{t('foretagskop.sectors.4')}</li>
              <li>{t('foretagskop.sectors.5')}</li>
            </ul>

            <h3 className="text-2xl font-bold text-brand-black mb-4">
              {t('foretagskop.advantages.title')}
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-10 text-brand-charcoal">
              <li>{t('foretagskop.advantages.1')}</li>
              <li>{t('foretagskop.advantages.2')}</li>
              <li>{t('foretagskop.advantages.3')}</li>
              <li>{t('foretagskop.advantages.4')}</li>
              <li>{t('foretagskop.advantages.5')}</li>
              <li>{t('foretagskop.advantages.6')}</li>
            </ul>

            <h3 className="text-2xl font-bold text-brand-black mb-4">
              {t('foretagskop.when_suitable.title')}
            </h3>
            <p className="text-brand-charcoal mb-6">
              {t('foretagskop.when_suitable.description')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-10 text-brand-charcoal">
              <li>{t('foretagskop.suitable.1')}</li>
              <li>{t('foretagskop.suitable.2')}</li>
              <li>{t('foretagskop.suitable.3')}</li>
              <li>{t('foretagskop.suitable.4')}</li>
              <li>{t('foretagskop.suitable.5')}</li>
            </ul>

            <div className="bg-brand-khaki bg-opacity-10 p-6 mb-10">
              <h4 className="font-bold text-brand-black mb-3">
                {t('foretagskop.confidentiality.title')}
              </h4>
              <p className="text-brand-charcoal">
                {t('foretagskop.confidentiality.description')}
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-brand-khaki bg-opacity-20 p-8 mt-12 text-center">
              <h3 className="text-2xl font-bold text-brand-black mb-4">
                {t('foretagskop.cta.title')}
              </h3>
              <p className="text-brand-charcoal mb-6">
                {t('foretagskop.cta.description')}
              </p>
              <Link 
                to="/kontakt" 
                className="inline-block bg-brand-umber text-brand-linen px-8 py-3 font-semibold hover:bg-brand-black transition-colors"
              >
                {t('foretagskop.cta.button')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Foretagskop;
