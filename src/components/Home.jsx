import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-charcoal to-brand-umber text-brand-linen py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 
                data-cy="hero-title"
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                {t('landing.hero.title', 'Gör en rekonstruktion- undvik konkurs')}
              </h1>
              <p 
                data-cy="hero-subtitle"
                className="text-xl mb-8 text-brand-linen opacity-90"
              >
                {t('landing.hero.subtitle', 'RekonstruktionsGruppen hjälper företag med tillfälliga ekonomiska problem att åter bli lönsamma. Ge ditt företag en andra chans.')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/kontakt"
                  data-cy="hero-cta-primary"
                  className="bg-brand-khaki text-brand-black px-8 py-3 font-semibold hover:bg-opacity-90 transition-colors text-center"
                >
                  {t('landing.hero.cta_primary', 'Kontakta oss')}
                </Link>
                <Link
                  to="/foretagsrekonstruktion"
                  data-cy="hero-cta-secondary"
                  className="border-2 border-brand-linen text-brand-linen px-8 py-3 font-semibold hover:bg-brand-linen hover:text-brand-charcoal transition-colors text-center"
                >
                  {t('landing.hero.cta_secondary', 'Mer om företagsrekonstruktion')}
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=926&q=80"
                alt="Företagsrekonstruktion"
                className="shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-brand-linen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
              {t('landing.benefits.title', 'En rekonstruktion är lösningen för företag med tillfälliga ekonomiska problem')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-brand-khaki bg-opacity-30 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-brand-black">
                {t('landing.benefits.debt_reduction.title', 'Skuldnedskrivningar och skydd mot konkurs')}
              </h3>
              <p className="text-brand-charcoal">
                {t('landing.benefits.debt_reduction.description', 'Vi hjälper dig att minska skulder och undvika konkurs genom professionell rådgivning.')}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-khaki bg-opacity-30 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-brand-black">
                {t('landing.benefits.comprehensive.title', 'Helhetslösningar för dig och ditt företag')}
              </h3>
              <p className="text-brand-charcoal">
                {t('landing.benefits.comprehensive.description', 'Skräddarsydda juridiska lösningar som passar just din verksamhet och situation.')}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-khaki bg-opacity-30 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-brand-black">
                {t('landing.benefits.specialists.title', 'Specialister på rekonstruktion av företag')}
              </h3>
              <p className="text-brand-charcoal">
                {t('landing.benefits.specialists.description', 'Erfaren expertis inom företagsrekonstruktion och juridiska lösningar.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
                {t('landing.about.title', 'Internationella Rekonstruktions Gruppen')}
              </h2>
              <p className="text-brand-charcoal mb-4">
                {t('landing.about.subtitle', 'Din pålitliga partner för företagsrekonstruktion och affärsåterhämtning')}
              </p>
              <p className="text-brand-charcoal mb-6">
                {t('landing.about.description', 'Vi är specialister på företagsrekonstruktion med omfattande erfarenhet av att hjälpa företag att övervinna ekonomiska svårigheter.')}
              </p>
              <Link
                to="/kontakt"
                className="bg-brand-umber text-brand-linen px-6 py-3 font-semibold hover:bg-brand-black transition-colors"
              >
                {t('landing.about.cta', 'Kontakta oss')}
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                alt="Rekonstruktionsgruppen team"
                className="shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-brand-linen">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
              {t('landing.faq.title', 'Vanliga frågor och svar om rekonstruktion')}
            </h2>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6">
              <h3 className="font-semibold text-lg mb-2 text-brand-black">
                {t('landing.faq.what_is.question', 'Vad är en rekonstruktion?')}
              </h3>
              <p className="text-brand-charcoal">
                {t('landing.faq.what_is.answer', 'Rekonstruktion är en process där en företagare som bedöms ha en god affärsidé, men som har drabbats av ekonomiska problem, kan rekonstruera sin verksamhet utan att gå i konkurs.')}
              </p>
            </div>
            <div className="bg-white p-6">
              <h3 className="font-semibold text-lg mb-2 text-brand-black">
                {t('landing.faq.why_important.question', 'Varför är en rekonstruktion viktig?')}
              </h3>
              <p className="text-brand-charcoal">
                {t('landing.faq.why_important.answer', 'Rekonstruktion är en viktig process för företagare som har drabbats av ekonomiska problem, men som fortfarande tror på sin affärsidé och vill rädda sin verksamhet.')}
              </p>
            </div>
            <div className="bg-white p-6">
              <h3 className="font-semibold text-lg mb-2 text-brand-black">
                {t('landing.faq.who_can_apply.question', 'Vem kan ansöka om rekonstruktion?')}
              </h3>
              <p className="text-brand-charcoal">
                {t('landing.faq.who_can_apply.answer', 'Alla företagare som har drabbats av ekonomiska problem och som tror på sin affärsidé kan ansöka om rekonstruktion.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-charcoal text-brand-linen">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('landing.cta.title', 'Har du några frågor? Låt oss ringa upp dig.')}
          </h2>
          <p className="text-xl mb-8 text-brand-linen opacity-90">
            {t('landing.cta.subtitle', 'Vi står redo att hjälpa dig genom denna utmanande tid.')}
          </p>
          <Link
            to="/kontakt"
            className="bg-brand-khaki text-brand-black px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors text-lg"
          >
            {t('landing.cta.button', 'Bli uppringd')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
