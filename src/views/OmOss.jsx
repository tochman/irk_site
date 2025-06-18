import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function OmOss() {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-charcoal to-brand-umber text-brand-linen py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('about.hero.title', 'Om Internationella Rekonstruktions Gruppen')}
            </h1>
            <p className="text-xl text-brand-linen opacity-90">
              {t('about.hero.subtitle', 'Ledande experter inom företagsrekonstruktion och affärsåterhämtning')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
              {t('about.mission.title', 'Vårt uppdrag')}
            </h2>
            <p className="text-lg text-brand-charcoal leading-relaxed">
              {t('about.mission.description', 'Vi hjälper företag i ekonomiska svårigheter att rekonstruera och återhämta sig genom professionell, konfidentiell vägledning. Vårt mål är att bevara arbeitsplatser, affärsvärde och möjliggöra hållbar tillväxt.')}
            </p>
          </div>
        </div>
      </section>

      {/* Team Image Section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1326&q=80" 
              alt={t('about.team.image_alt', 'Vårt team av rekonstruktionsexperter')}
              className="shadow-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 bg-brand-linen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
              {t('about.expertise.title', 'Vår expertis')}
            </h2>
            <p className="text-lg text-brand-charcoal">
              {t('about.expertise.subtitle', 'Djup kunskap och mångårig erfarenhet inom företagsrekonstruktion')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-brand-khaki bg-opacity-30 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-black">
                {t('about.expertise.legal.title', 'Juridisk expertis')}
              </h3>
              <p className="text-brand-charcoal">
                {t('about.expertise.legal.description', 'Djup kunskap inom rekonstruktionsrätt och insolvensförfaranden')}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-khaki bg-opacity-30 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-black">
                {t('about.expertise.financial.title', 'Finansiell analys')}
              </h3>
              <p className="text-brand-charcoal">
                {t('about.expertise.financial.description', 'Omfattande ekonomisk analys och omstrukturering av verksamheter')}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-khaki bg-opacity-30 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-black">
                {t('about.expertise.strategic.title', 'Strategisk rådgivning')}
              </h3>
              <p className="text-brand-charcoal">
                {t('about.expertise.strategic.description', 'Långsiktig strategisk planering för hållbar affärsåterhämtning')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-brand-linen p-8 mb-16">
            <h2 className="text-3xl font-bold text-brand-black mb-6 text-center">
              {t('about.approach.title', 'Vårt tillvägagångssätt')}
            </h2>
            <p className="text-lg text-brand-charcoal leading-relaxed text-center">
              {t('about.approach.description', 'Vi tror att varje företag förtjänar en andra chans. Vårt tillvägagångssätt är alltid konfidentiellt, professionellt och skräddarsytt för varje klients unika situation. Vi arbetar nära våra klienter för att utveckla realistiska och hållbara lösningar.')}
            </p>
          </div>

          {/* Team Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-black mb-6">
              {t('about.team.title', 'Vårt team')}
            </h2>
            <p className="text-lg text-brand-charcoal max-w-3xl mx-auto">
              {t('about.team.description', 'Vårt team består av erfarna professionella inom juridik, ekonomi och affärsutveckling. Vi har framgångsrikt hjälpt hundratals företag genom svåra ekonomiska situationer.')}
            </p>
          </div>

          {/* Values Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-black mb-12">
              {t('about.values.title', 'Våra värderingar')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3 text-brand-black">
                  {t('about.values.value1.title', 'Konfidentialitet')}
                </h3>
                <p className="text-brand-charcoal">
                  {t('about.values.value1.description', 'Alla våra konsultationer och processer är helt konfidentiella.')}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3 text-brand-black">
                  {t('about.values.value2.title', 'Professionalism')}
                </h3>
                <p className="text-brand-charcoal">
                  {t('about.values.value2.description', 'Vi upprätthåller högsta professionella standarder i allt vårt arbete.')}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3 text-brand-black">
                  {t('about.values.value3.title', 'Resultat')}
                </h3>
                <p className="text-brand-charcoal">
                  {t('about.values.value3.description', 'Vi fokuserar på att leverera konkreta resultat för våra klienter.')}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-black mb-4">
              {t('about.cta.title', 'Redo att samarbeta med oss?')}
            </h2>
            <p className="text-lg text-brand-charcoal mb-8">
              {t('about.cta.description', 'Kontakta oss idag för en konfidentiell, förutsättningslös konsultation om hur vi kan hjälpa ditt företag.')}
            </p>
            <Link
              to="/kontakt"
              className="bg-brand-umber text-brand-linen px-8 py-3 font-semibold hover:bg-brand-black transition-colors"
            >
              {t('about.cta.button', 'Få kostnadsfri konsultation')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OmOss;
