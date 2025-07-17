import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import EmergencyConsultation from '../components/EmergencyConsultation';

function KonkursLikvidation() {
  const { t } = useTranslation();
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

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
                {t('bankruptcyLiquidation.hero.title', 'Bankruptcy & Liquidation')}
              </h1>
              <p className="text-xl text-white opacity-95">
                {t('bankruptcyLiquidation.hero.subtitle', 'Expert guidance through complex proceedings when other solutions are not viable')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-brand-linen">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-brand-black mb-6">
            {t('bankruptcyLiquidation.intro.title', 'Professional Support When You Need It Most')}
          </h2>
          <p className="text-lg text-brand-charcoal leading-relaxed mb-8">
            {t('bankruptcyLiquidation.intro.description', 'When reconstruction or composition are not viable options, bankruptcy and liquidation proceedings become necessary. These are complex processes that require specialized expertise to navigate properly and minimize personal exposure.')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            
            {/* Bankruptcy Section */}
            <div>
              <div className="bg-brand-khaki bg-opacity-20 p-6 mb-6">
                <h3 className="text-2xl font-bold text-brand-black mb-4">
                  {t('bankruptcyLiquidation.bankruptcy.title', 'Bankruptcy Proceedings')}
                </h3>
                <p className="text-brand-charcoal mb-4">
                  {t('bankruptcyLiquidation.bankruptcy.description', 'Bankruptcy is a legal process where a company\'s assets are liquidated to pay creditors when the company cannot meet its financial obligations. While often seen as a last resort, proper handling can minimize damage and protect personal interests.')}
                </p>
                <p className="text-brand-charcoal">
                  {t('bankruptcyLiquidation.bankruptcy.process', 'Our expertise ensures the process is handled correctly, efficiently, and with minimal personal exposure for directors and board members.')}
                </p>
              </div>
            </div>

            {/* Liquidation Section */}
            <div>
              <div className="bg-brand-umber bg-opacity-20 p-6 mb-6">
                <h3 className="text-2xl font-bold text-brand-black mb-4">
                  {t('bankruptcyLiquidation.liquidation.title', 'Voluntary Liquidation')}
                </h3>
                <p className="text-brand-charcoal mb-4">
                  {t('bankruptcyLiquidation.liquidation.description', 'Voluntary liquidation is when company owners decide to wind up the business in an orderly manner. This controlled process allows for better asset recovery and can be more favorable than involuntary bankruptcy.')}
                </p>
                <p className="text-brand-charcoal">
                  {t('bankruptcyLiquidation.liquidation.process', 'We guide you through each step to ensure compliance with legal requirements while maximizing value recovery and protecting your interests.')}
                </p>
              </div>
            </div>
          </div>

          {/* Personal Board Liability Section - Highlighted */}
          <div className="bg-gradient-to-r from-brand-charcoal to-brand-umber text-brand-linen p-12 mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-brand-khaki text-brand-black inline-block px-4 py-2 font-semibold mb-6">
                {t('bankruptcyLiquidation.liability.badge', 'Specialist Expertise')}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('bankruptcyLiquidation.liability.title', 'Specialists in Personal Board Liability')}
              </h2>
              <p className="text-xl mb-8 opacity-95">
                {t('bankruptcyLiquidation.liability.subtitle', 'One of our most important areas of expertise is minimizing your personal exposure and risk.')}
              </p>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-brand-khaki">
                    {t('bankruptcyLiquidation.liability.protection.title', 'Personal Protection')}
                  </h4>
                  <p className="text-brand-linen opacity-90">
                    {t('bankruptcyLiquidation.liability.protection.description', 'We analyze potential personal liability risks and implement strategies to protect directors and board members from personal financial exposure.')}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-brand-khaki">
                    {t('bankruptcyLiquidation.liability.expertise.title', 'Legal Expertise')}
                  </h4>
                  <p className="text-brand-linen opacity-90">
                    {t('bankruptcyLiquidation.liability.expertise.description', 'Our deep understanding of liability laws and regulations ensures proper procedures are followed to minimize personal risk throughout the process.')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* When We Can Help */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-brand-black mb-8 text-center">
              {t('bankruptcyLiquidation.whenHelp.title', 'When We Can Assist')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-brand-khaki bg-opacity-30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-brand-black">
                  {t('bankruptcyLiquidation.whenHelp.complex.title', 'Complex Proceedings')}
                </h3>
                <p className="text-brand-charcoal text-sm">
                  {t('bankruptcyLiquidation.whenHelp.complex.description', 'When bankruptcy or liquidation involves complex asset structures, multiple jurisdictions, or significant personal liability risks.')}
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-brand-khaki bg-opacity-30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-brand-black">
                  {t('bankruptcyLiquidation.whenHelp.liability.title', 'Liability Concerns')}
                </h3>
                <p className="text-brand-charcoal text-sm">
                  {t('bankruptcyLiquidation.whenHelp.liability.description', 'When directors or board members face potential personal liability and need expert protection strategies.')}
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-brand-khaki bg-opacity-30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-brand-black">
                  {t('bankruptcyLiquidation.whenHelp.urgent.title', 'Urgent Situations')}
                </h3>
                <p className="text-brand-charcoal text-sm">
                  {t('bankruptcyLiquidation.whenHelp.urgent.description', 'When immediate action is required to protect assets and minimize exposure in time-sensitive situations.')}
                </p>
              </div>
            </div>
          </div>

          {/* Process Overview */}
          <div className="bg-brand-linen p-8 mb-16">
            <h2 className="text-3xl font-bold text-brand-black mb-8 text-center">
              {t('bankruptcyLiquidation.process.title', 'Our Support Process')}
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-brand-umber text-brand-linen w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  1
                </div>
                <h4 className="font-semibold mb-2 text-brand-black">
                  {t('bankruptcyLiquidation.process.step1.title', 'Assessment')}
                </h4>
                <p className="text-sm text-brand-charcoal">
                  {t('bankruptcyLiquidation.process.step1.description', 'Comprehensive analysis of the situation and liability exposure')}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-brand-umber text-brand-linen w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  2
                </div>
                <h4 className="font-semibold mb-2 text-brand-black">
                  {t('bankruptcyLiquidation.process.step2.title', 'Strategy')}
                </h4>
                <p className="text-sm text-brand-charcoal">
                  {t('bankruptcyLiquidation.process.step2.description', 'Development of protection strategies and process planning')}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-brand-umber text-brand-linen w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  3
                </div>
                <h4 className="font-semibold mb-2 text-brand-black">
                  {t('bankruptcyLiquidation.process.step3.title', 'Implementation')}
                </h4>
                <p className="text-sm text-brand-charcoal">
                  {t('bankruptcyLiquidation.process.step3.description', 'Execution of proceedings with continuous risk monitoring')}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-brand-umber text-brand-linen w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  4
                </div>
                <h4 className="font-semibold mb-2 text-brand-black">
                  {t('bankruptcyLiquidation.process.step4.title', 'Follow-up')}
                </h4>
                <p className="text-sm text-brand-charcoal">
                  {t('bankruptcyLiquidation.process.step4.description', 'Post-process support and final protection measures')}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-brand-umber text-brand-linen p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {t('bankruptcyLiquidation.cta.title', 'Need Expert Guidance?')}
            </h2>
            <p className="text-xl mb-8 opacity-95 max-w-3xl mx-auto">
              {t('bankruptcyLiquidation.cta.description', 'Bankruptcy and liquidation proceedings are complex and carry significant personal risks. Our expertise can help protect your interests and minimize exposure.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/kontakt"
                className="bg-brand-khaki text-brand-black px-8 py-3 font-semibold hover:bg-opacity-90 transition-colors"
              >
                {t('bankruptcyLiquidation.cta.contact', 'Get Confidential Consultation')}
              </Link>
              <button
                onClick={() => setShowEmergencyModal(true)}
                className="border-2 border-brand-khaki text-brand-khaki px-8 py-3 font-semibold hover:bg-brand-khaki hover:text-brand-black transition-colors"
              >
                {t('bankruptcyLiquidation.cta.emergency', 'Emergency Consultation')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Consultation Modal */}
      <EmergencyConsultation 
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        type="emergency"
      />
    </div>
  );
}

export default KonkursLikvidation;
