import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Ackord() {
  const { t } = useTranslation();

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
                {t('ackord.hero.title', 'Ackord')}
              </h1>
              <p className="text-xl text-white opacity-95">
                {t('ackord.hero.subtitle', 'Förhandla fram en överenskommelse med borgenärer')}
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
              {t('ackord.what_is.title', 'Vad är ackord?')}
            </h2>
            <p className="text-brand-charcoal mb-8">
              {t('ackord.what_is.description', 'Ackord är en överenskommelse mellan ett företag och dess borgenärer som innebär att borgenärerna accepterar en lägre betalning än vad som ursprungligen var skyldig. Detta kan vara en effektiv lösning för företag som har ekonomiska svårigheter men som fortfarande har potential att bli lönsamma.')}
            </p>

            {/* Visual break with image */}
            <div className="my-12">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt={t('ackord.process_image_alt', 'Professionellt team som arbetar med ackordsförhandlingar')}
                className="w-full h-64 object-cover shadow-lg"
              />
            </div>

            <h3 className="text-2xl font-bold text-brand-black mb-4">
              {t('ackord.how_it_works.title', 'Hur fungerar ackord?')}
            </h3>
            <div className="space-y-6 mb-10">
              <div className="bg-brand-linen p-6 border-l-4 border-brand-umber">
                <h4 className="font-bold text-brand-black mb-2">
                  {t('ackord.step1.title', '1. Analys och förberedelse')}
                </h4>
                <p className="text-brand-charcoal">
                  {t('ackord.step1.description', 'Vi gör en grundlig analys av företagets ekonomiska situation och identifierar möjligheterna för en framgångsrik ackordsöverenskommelse.')}
                </p>
              </div>
              
              <div className="bg-brand-linen p-6 border-l-4 border-brand-umber">
                <h4 className="font-bold text-brand-black mb-2">
                  {t('ackord.step2.title', '2. Förhandling med borgenärer')}
                </h4>
                <p className="text-brand-charcoal">
                  {t('ackord.step2.description', 'Vi förhandlar med borgenärerna för att nå en överenskommelse som både är acceptabel för dem och hållbar för företaget.')}
                </p>
              </div>
              
              <div className="bg-brand-linen p-6 border-l-4 border-brand-umber">
                <h4 className="font-bold text-brand-black mb-2">
                  {t('ackord.step3.title', '3. Genomförande och uppföljning')}
                </h4>
                <p className="text-brand-charcoal">
                  {t('ackord.step3.description', 'När överenskommelsen är på plats hjälper vi till med genomförandet och följer upp att företaget lever upp till sina åtaganden.')}
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-brand-black mb-4">
              {t('ackord.benefits.title', 'Fördelar med ackord')}
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-10 text-brand-charcoal">
              <li>{t('ackord.benefits.1', 'Undviker konkurs och dess negativa konsekvenser')}</li>
              <li>{t('ackord.benefits.2', 'Minskar skuldbördan och förbättrar kassaflödet')}</li>
              <li>{t('ackord.benefits.3', 'Behåller kontrollen över företaget')}</li>
              <li>{t('ackord.benefits.4', 'Snabbare process än rekonstruktion')}</li>
              <li>{t('ackord.benefits.5', 'Mindre formell och kostsam än andra alternativ')}</li>
            </ul>

            <h3 className="text-2xl font-bold text-brand-black mb-4">
              {t('ackord.when_suitable.title', 'När är ackord lämpligt?')}
            </h3>
            <p className="text-brand-charcoal mb-6">
              {t('ackord.when_suitable.description', 'Ackord är särskilt lämpligt när:')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-10 text-brand-charcoal">
              <li>{t('ackord.suitable.1', 'Företaget har tillfälliga ekonomiska svårigheter')}</li>
              <li>{t('ackord.suitable.2', 'Det finns en klar plan för återhämtning')}</li>
              <li>{t('ackord.suitable.3', 'Borgenärerna är öppna för förhandling')}</li>
              <li>{t('ackord.suitable.4', 'Företaget vill undvika de formella processerna')}</li>
            </ul>

            {/* Call to Action */}
            <div className="bg-brand-khaki bg-opacity-20 p-8 mt-12 text-center">
              <h3 className="text-2xl font-bold text-brand-black mb-4">
                {t('ackord.cta.title', 'Behöver du hjälp med ackord?')}
              </h3>
              <p className="text-brand-charcoal mb-6">
                {t('ackord.cta.description', 'Kontakta oss för en kostnadsfri konsultation om hur ackord kan hjälpa ditt företag.')}
              </p>
              <Link 
                to="/kontakt" 
                className="inline-block bg-brand-umber text-brand-linen px-8 py-3 font-semibold hover:bg-brand-black transition-colors"
              >
                {t('ackord.cta.button', 'Kontakta oss idag')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ackord;
