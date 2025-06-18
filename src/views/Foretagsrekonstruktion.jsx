import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Foretagsrekonstruktion() {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-charcoal to-brand-umber text-brand-linen py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('reconstruction.hero.title', 'Företagsrekonstruktion')}
            </h1>
            <p className="text-xl text-brand-linen opacity-90">
              {t('reconstruction.hero.subtitle', 'En andra chans för ditt företag att bli lönsamt igen')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-brand-black mb-6">
              {t('reconstruction.what_is.title', 'Vad är företagsrekonstruktion?')}
            </h2>
            <p className="text-brand-charcoal mb-8">
              {t('reconstruction.what_is.description', 'Företagsrekonstruktion är en juridisk process som ger företag med tillfälliga ekonomiska svårigheter möjlighet att komma tillbaka på fötter utan att gå i konkurs. Genom rekonstruktionen får företaget skydd från fordringsägare och tid att omstrukturera sin verksamhet.')}
            </p>

            <h2 className="text-3xl font-bold text-brand-black mb-6">
              {t('reconstruction.process.title', 'Så går processen till')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-brand-linen p-6">
                <h3 className="text-xl font-semibold mb-4 text-brand-black">
                  {t('reconstruction.process.step1.title', '1. Ansökan')}
                </h3>
                <p className="text-brand-charcoal">
                  {t('reconstruction.process.step1.description', 'Företaget ansöker om rekonstruktion hos tingsrätten. Vi hjälper dig att förbereda ansökan och all nödvändig dokumentation.')}
                </p>
              </div>
              <div className="bg-brand-linen p-6">
                <h3 className="text-xl font-semibold mb-4 text-brand-black">
                  {t('reconstruction.process.step2.title', '2. Bedömning')}
                </h3>
                <p className="text-brand-charcoal">
                  {t('reconstruction.process.step2.description', 'Domstolen bedömer om företaget har förutsättningar för en framgångsrik rekonstruktion och utser en rekonstruktör.')}
                </p>
              </div>
              <div className="bg-brand-linen p-6">
                <h3 className="text-xl font-semibold mb-4 text-brand-black">
                  {t('reconstruction.process.step3.title', '3. Rekonstruktionsplan')}
                </h3>
                <p className="text-brand-charcoal">
                  {t('reconstruction.process.step3.description', 'En detaljerad plan tas fram för hur företaget ska återhämta sig ekonomiskt och bli lönsamt igen.')}
                </p>
              </div>
              <div className="bg-brand-linen p-6">
                <h3 className="text-xl font-semibold mb-4 text-brand-black">
                  {t('reconstruction.process.step4.title', '4. Genomförande')}
                </h3>
                <p className="text-brand-charcoal">
                  {t('reconstruction.process.step4.description', 'Planen genomförs under övervakning av rekonstruktören. Vi följer upp processen kontinuerligt.')}
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-brand-black mb-6">
              {t('reconstruction.benefits.title', 'Fördelar med rekonstruktion')}
            </h2>
            <ul className="list-disc list-inside space-y-3 text-brand-charcoal mb-12">
              <li>{t('reconstruction.benefits.benefit1', 'Skydd mot konkurs och avveckling')}</li>
              <li>{t('reconstruction.benefits.benefit2', 'Moratorium på betalning av skulder')}</li>
              <li>{t('reconstruction.benefits.benefit3', 'Möjlighet att förhandla ned skulder')}</li>
              <li>{t('reconstruction.benefits.benefit4', 'Behålla verksamheten och anställda')}</li>
              <li>{t('reconstruction.benefits.benefit5', 'Professionell vägledning genom hela processen')}</li>
            </ul>

            <div className="bg-brand-khaki bg-opacity-20 p-8 text-center">
              <h3 className="text-2xl font-bold text-brand-black mb-4">
                {t('reconstruction.cta.title', 'Behöver du hjälp med rekonstruktion?')}
              </h3>
              <p className="text-brand-charcoal mb-6">
                {t('reconstruction.cta.description', 'Kontakta oss för en förutsättningslös, konfidentiell konsultation och låt oss hjälpa dig att rädda ditt företag.')}
              </p>
              <Link
                to="/kontakt"
                className="bg-brand-umber text-brand-linen px-8 py-3 font-semibold hover:bg-brand-black transition-colors"
              >
                {t('reconstruction.cta.button', 'Förutsättningslös Konsultation')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Foretagsrekonstruktion;
