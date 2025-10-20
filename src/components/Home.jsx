import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import EmergencyConsultation from './EmergencyConsultation';

function Home() {
  const { t } = useTranslation();
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

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
                {t('landing.hero.title')}
              </h1>
              <p 
                data-cy="hero-subtitle"
                className="text-xl mb-8 text-brand-linen opacity-90"
              >
                {t('landing.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/kontakt"
                  data-cy="hero-cta-primary"
                  className="bg-brand-khaki text-brand-black px-8 py-3 font-semibold hover:bg-opacity-90 transition-colors text-center"
                >
                  {t('landing.hero.cta_primary')}
                </Link>
                <a
                  href="#services-details"
                  data-cy="hero-cta-secondary"
                  className="border-2 border-brand-linen text-brand-linen px-8 py-3 font-semibold hover:bg-brand-linen hover:text-brand-charcoal transition-colors text-center inline-block"
                >
                  {t('landing.hero.cta_secondary')}
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/images/poster_boy_1.jpg"
                alt={t('landing.hero.image_alt')}
                className="shadow-xl object-cover h-96 w-full rounded-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-brand-linen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
              {t('landing.services.title')}
            </h2>
            <p className="text-brand-charcoal text-lg max-w-3xl mx-auto">
              {t('landing.services.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/rekonstruktion" className="bg-white p-8 shadow-md hover:shadow-lg transition-shadow group">
              <div className="bg-brand-khaki bg-opacity-30 w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-opacity-50 transition-colors">
                <svg className="w-8 h-8 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-black text-center group-hover:text-brand-umber transition-colors">
                {t('landing.services.reconstruction.title')}
              </h3>
              <p className="text-brand-charcoal text-center leading-relaxed">
                {t('landing.services.reconstruction.description')}
              </p>
            </Link>
            <Link to="/ackord" className="bg-white p-8 shadow-md hover:shadow-lg transition-shadow group">
              <div className="bg-brand-khaki bg-opacity-30 w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-opacity-50 transition-colors">
                <svg className="w-8 h-8 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-black text-center group-hover:text-brand-umber transition-colors">
                {t('landing.services.settlement.title')}
              </h3>
              <p className="text-brand-charcoal text-center leading-relaxed">
                {t('landing.services.settlement.description')}
              </p>
            </Link>
            <Link to="/foretagskop" className="bg-white p-8 shadow-md hover:shadow-lg transition-shadow group">
              <div className="bg-brand-khaki bg-opacity-30 w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-opacity-50 transition-colors">
                <svg className="w-8 h-8 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-black text-center group-hover:text-brand-umber transition-colors">
                {t('landing.services.acquisition.title')}
              </h3>
              <p className="text-brand-charcoal text-center leading-relaxed">
                {t('landing.services.acquisition.description')}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
            {t('landing.who_we_help.title')}
          </h2>
          <p className="text-brand-charcoal text-lg mb-8 max-w-3xl mx-auto">
            {t('landing.who_we_help.description')}
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="bg-brand-khaki bg-opacity-20 w-20 h-20 flex items-center justify-center mx-auto mb-4 rounded-full">
                <svg className="w-10 h-10 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-brand-black">
                {t('landing.who_we_help.companies.title')}
              </h3>
              <p className="text-brand-charcoal text-sm">
                {t('landing.who_we_help.companies.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-khaki bg-opacity-20 w-20 h-20 flex items-center justify-center mx-auto mb-4 rounded-full">
                <svg className="w-10 h-10 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-brand-black">
                {t('landing.who_we_help.partnerships.title')}
              </h3>
              <p className="text-brand-charcoal text-sm">
                {t('landing.who_we_help.partnerships.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-khaki bg-opacity-20 w-20 h-20 flex items-center justify-center mx-auto mb-4 rounded-full">
                <svg className="w-10 h-10 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-brand-black">
                {t('landing.who_we_help.sole_proprietorship.title')}
              </h3>
              <p className="text-brand-charcoal text-sm">
                {t('landing.who_we_help.sole_proprietorship.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - After Who We Help */}
      <section className="py-16 bg-brand-charcoal text-brand-linen">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('landing.cta_early.title')}
          </h2>
          <p className="text-xl mb-2 text-brand-linen opacity-90">
            {t('landing.cta_early.subtitle')}
          </p>
          <p className="text-xl mb-8 text-brand-linen opacity-90 font-semibold">
            {t('landing.cta_early.free')}
          </p>
          <Link
            to="/kontakt"
            className="bg-brand-khaki text-brand-black px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors text-lg"
          >
            {t('landing.cta_early.button')}
          </Link>
        </div>
      </section>

      {/* Emergency Consultation Section */}
      <section className="bg-gradient-to-br from-brand-umber to-brand-black text-brand-linen py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('emergency.title')}
            </h2>
            
            <p className="text-xl mb-8 opacity-90">
              {t('emergency.description')}
            </p>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">
                {t('emergency.consultation_title')}
              </h3>
              
              <p className="text-lg mb-6 opacity-90">
                {t('emergency.callback_question')}
              </p>
              
              <p className="mb-8 opacity-90">
                {t('emergency.callback_description')}
              </p>

              <button
                onClick={() => setShowEmergencyModal(true)}
                className="bg-brand-linen text-brand-umber px-8 py-4 font-bold text-lg hover:bg-brand-khaki hover:bg-opacity-90 transition-colors duration-300 inline-flex items-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {t('emergency.request_callback')}
              </button>
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
                {t('landing.about.title')}
              </h2>
              <p className="text-brand-charcoal mb-4">
                {t('landing.about.subtitle')}
              </p>
              <p className="text-brand-charcoal mb-4">
                {t('landing.about.human_factor')}
              </p>
              <p className="text-brand-charcoal mb-4">
                {t('landing.about.description')}
              </p>
              <p className="text-brand-charcoal mb-6">
                {t('landing.about.expertise')}
              </p>
              <Link
                to="/kontakt"
                className="bg-brand-umber text-brand-linen px-6 py-3 font-semibold hover:bg-brand-black transition-colors"
              >
                {t('landing.about.cta')}
              </Link>
            </div>
            <div>
              <img
                src="/images/poster_boy_1.jpg"
                alt={t('landing.about.team_image_alt')}
                className="shadow-lg object-cover h-80 w-full rounded-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Details Section */}
      <section id="services-details" className="py-16 bg-brand-linen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
              {t('landing.services_details.title')}
            </h2>
            <p className="text-brand-charcoal text-lg max-w-3xl mx-auto">
              {t('landing.services_details.subtitle')}
            </p>
          </div>
          
          <div className="space-y-16">
            {/* Rekonstruktion */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Link to="/rekonstruktion">
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-black mb-6 hover:text-brand-umber transition-colors cursor-pointer">
                    {t('landing.services_details.reconstruction.title')}
                  </h3>
                </Link>
                <p className="text-brand-charcoal mb-4 leading-relaxed">
                  {t('landing.services_details.reconstruction.description')}
                </p>
                <p className="text-brand-charcoal leading-relaxed">
                  {t('landing.services_details.reconstruction.details')}
                </p>
              </div>
              <div className="bg-white p-8 shadow-lg">
                <h4 className="font-semibold text-lg mb-4 text-brand-black">
                  {t('landing.services_details.reconstruction.benefits_title')}
                </h4>
                <ul className="space-y-2 text-brand-charcoal">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-brand-khaki mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('landing.services_details.reconstruction.benefit1')}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-brand-khaki mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('landing.services_details.reconstruction.benefit2')}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-brand-khaki mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('landing.services_details.reconstruction.benefit3')}
                  </li>
                </ul>
                <div className="mt-6">
                  <Link
                    to="/rekonstruktion"
                    className="inline-flex items-center text-brand-umber font-medium hover:text-brand-black transition-colors"
                  >
                    {t('landing.services_details.reconstruction.learn_more')}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Ackord */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <Link to="/ackord">
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-black mb-6 hover:text-brand-umber transition-colors cursor-pointer">
                    {t('landing.services_details.settlement.title')}
                  </h3>
                </Link>
                <p className="text-brand-charcoal mb-4 leading-relaxed">
                  {t('landing.services_details.settlement.description')}
                </p>
                <p className="text-brand-charcoal leading-relaxed">
                  {t('landing.services_details.settlement.details')}
                </p>
              </div>
              <div className="bg-white p-8 shadow-lg md:order-1">
                <h4 className="font-semibold text-lg mb-4 text-brand-black">
                  {t('landing.services_details.settlement.benefits_title')}
                </h4>
                <ul className="space-y-2 text-brand-charcoal">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-brand-khaki mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('landing.services_details.settlement.benefit1')}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-brand-khaki mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('landing.services_details.settlement.benefit2')}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-brand-khaki mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('landing.services_details.settlement.benefit3')}
                  </li>
                </ul>
                <div className="mt-6">
                  <Link
                    to="/ackord"
                    className="inline-flex items-center text-brand-umber font-medium hover:text-brand-black transition-colors"
                  >
                    {t('landing.services_details.settlement.learn_more')}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Vi köper ditt företag */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Link to="/foretagskop">
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-black mb-6 hover:text-brand-umber transition-colors cursor-pointer">
                    {t('landing.services_details.acquisition.title')}
                  </h3>
                </Link>
                <p className="text-brand-charcoal mb-4 leading-relaxed">
                  {t('landing.services_details.acquisition.description')}
                </p>
                <p className="text-brand-charcoal leading-relaxed">
                  {t('landing.services_details.acquisition.details')}
                </p>
              </div>
              <div className="bg-white p-8 shadow-lg">
                <h4 className="font-semibold text-lg mb-4 text-brand-black">
                  {t('landing.services_details.acquisition.benefits_title')}
                </h4>
                <ul className="space-y-2 text-brand-charcoal">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-brand-khaki mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('landing.services_details.acquisition.benefit1')}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-brand-khaki mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('landing.services_details.acquisition.benefit2')}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-brand-khaki mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('landing.services_details.acquisition.benefit3')}
                  </li>
                </ul>
                <div className="mt-6">
                  <Link
                    to="/foretagskop"
                    className="inline-flex items-center text-brand-umber font-medium hover:text-brand-black transition-colors"
                  >
                    {t('landing.services_details.acquisition.learn_more')}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Support Section - Standalone Service */}
      <section className="py-16 bg-gradient-to-r from-brand-khaki/10 to-brand-umber/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
              {t('operationalSupport.title')}
            </h2>
            <p className="text-brand-charcoal text-lg max-w-3xl mx-auto">
              {t('operationalSupport.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['finance', 'supply_chain', 'marketing', 'sales', 'operations', 'hr'].map((service) => (
              <div key={service} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-brand-khaki bg-opacity-20 w-14 h-14 flex items-center justify-center mb-4 rounded-sm">
                  <svg className="w-7 h-7 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-brand-black">
                  {t(`operationalSupport.areas.${service}.title`)}
                </h3>
                <p className="text-brand-charcoal text-sm leading-relaxed">
                  {t(`operationalSupport.areas.${service}.description`)}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/kontakt"
              className="inline-block bg-brand-charcoal text-brand-linen px-8 py-3 font-semibold hover:bg-brand-umber transition-colors rounded-sm"
            >
              {t('operationalSupport.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Personal Liability Expertise Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-brand-charcoal text-brand-linen p-12 rounded-sm">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('landing.liability_expertise.title')}
              </h2>
              <p className="text-xl text-brand-linen opacity-90 max-w-4xl mx-auto">
                {t('landing.liability_expertise.subtitle')}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-brand-khaki">
                  {t('landing.liability_expertise.protection.title')}
                </h3>
                <p className="text-brand-linen mb-4 leading-relaxed">
                  {t('landing.liability_expertise.protection.description')}
                </p>
                <ul className="space-y-3 text-brand-linen">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-brand-khaki mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('landing.liability_expertise.protection.benefit1')}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-brand-khaki mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('landing.liability_expertise.protection.benefit2')}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-brand-khaki mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('landing.liability_expertise.protection.benefit3')}
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-brand-khaki bg-opacity-20 w-32 h-32 flex items-center justify-center mx-auto mb-6 rounded-full">
                  <svg className="w-16 h-16 text-brand-khaki" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-brand-linen italic text-lg">
                  {t('landing.liability_expertise.quote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-charcoal text-brand-linen">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('landing.cta.title')}
          </h2>
          <p className="text-xl mb-8 text-brand-linen opacity-90">
            {t('landing.cta.subtitle')}
          </p>
          <Link
            to="/kontakt"
            className="bg-brand-khaki text-brand-black px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors text-lg"
          >
            {t('landing.cta.button')}
          </Link>
        </div>
      </section>

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <EmergencyConsultation 
          isOpen={showEmergencyModal}
          type="emergency"
          onClose={() => setShowEmergencyModal(false)} 
        />
      )}
    </div>
  );
}

export default Home;
