import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';
import useWeb3Forms from '@web3forms/react';
import useFacebookPixel from '@/hooks/useFacebookPixel';
import EmergencyConsultation from '../components/EmergencyConsultation';
import PhoneNumber from '../components/PhoneNumber';

function Kontakt() {
  const { t } = useTranslation();
  const { trackContactFormSubmit, trackLead } = useFacebookPixel();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
  });
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false);
  const formRef = useRef();

  const { submit, loading } = useWeb3Forms({
    access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
    settings: {
      from_name: t('contact.form.from_name', 'Reconstructor Contact Form'),
      subject: t('contact.form.subject', 'New Contact Form Submission from Reconstructor Website')
    },
    onSuccess: () => {
      setIsSubmitSuccess(true);
      setIsSubmitError(false);
      
      // Track successful contact form submission with Facebook Pixel
      trackContactFormSubmit({
        content_name: 'Contact Form',
        content_category: 'Lead Generation',
        value: 1,
        currency: 'SEK'
      });
      
      // Also track as a lead
      trackLead({
        content_name: 'Website Contact Form',
        content_category: 'Contact'
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
      });
      window.scrollTo({ top: formRef.current.offsetTop - 100, behavior: 'smooth' });
    },
    onError: (error) => {
      console.log(error);
      setIsSubmitError(true);
      window.scrollTo({ top: formRef.current.offsetTop - 100, behavior: 'smooth' });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitSuccess(false);
    setIsSubmitError(false);
    await submit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setIsSubmitSuccess(false);
    setIsSubmitError(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-charcoal to-brand-umber text-brand-linen py-16">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-black bg-opacity-40 backdrop-blur-sm px-8 py-12 border border-white border-opacity-20">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {t('contact.hero.title')}
              </h1>
              <p className="text-xl text-white opacity-95">
                {t('contact.hero.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-brand-linen">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-brand-black mb-6">
            {t('contact.intro.title')}
          </h2>
          <p className="text-lg text-brand-charcoal leading-relaxed">
            {t('contact.intro.description')}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div ref={formRef}>
              <h2 className="text-3xl font-bold text-brand-black mb-6">
                {t('contact.form.title')}
              </h2>
              <p className="text-brand-charcoal mb-8">
                {t('contact.form.subtitle')}
              </p>
              
              {isSubmitSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-green-800">
                      {t('contact.form.success_title', 'Thank you for your message!')}
                    </h3>
                  </div>
                  <p className="text-green-700 mb-4">
                    {t('contact.form.success_message', 'We have received your inquiry and will get back to you as soon as possible.')}
                  </p>
                  <p className="text-green-700 mb-6">
                    {t('contact.form.success_details', 'A member of our team will review your message and contact you within 24 hours.')}
                  </p>
                  <button 
                    onClick={resetForm}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    {t('contact.form.send_another', 'Send another message')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {isSubmitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            {t('contact.form.error_title', 'There was a problem sending your message')}
                          </h3>
                          <p className="mt-2 text-sm text-red-700">
                            {t('contact.form.error_message', 'Please try again or contact us directly via email or phone.')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-black mb-2">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-brand-khaki bg-white focus:ring-2 focus:ring-brand-umber focus:border-brand-umber"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-2">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-brand-khaki bg-white focus:ring-2 focus:ring-brand-umber focus:border-brand-umber"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-black mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-brand-khaki bg-white focus:ring-2 focus:ring-brand-umber focus:border-brand-umber"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-brand-black mb-2">
                      {t('contact.form.company')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-brand-khaki bg-white focus:ring-2 focus:ring-brand-umber focus:border-brand-umber"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-black mb-2">
                      {t('contact.form.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contact.form.message_placeholder')}
                      className="w-full px-4 py-3 border border-brand-khaki bg-white focus:ring-2 focus:ring-brand-umber focus:border-brand-umber"
                    />
                  </div>
                  
                  <div className="bg-brand-linen p-4 text-sm text-brand-charcoal">
                    {t('contact.form.privacy_notice')}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-umber text-brand-linen px-8 py-3 font-semibold hover:bg-brand-black transition-colors disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('contact.form.submitting', 'Sending...')}
                      </span>
                    ) : t('contact.form.submit')}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-brand-black mb-6">
                {t('contact.info.title')}
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-brand-khaki bg-opacity-30 p-3 mr-4">
                    <svg className="w-6 h-6 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-brand-black">
                      {t('contact.info.phone.title')}
                    </h3>
                    <p className="text-brand-charcoal mb-1">
                      <PhoneNumber number="+46 722 441585" isLink={true} className="hover:text-brand-umber" />
                    </p>
                    <p className="text-sm text-brand-charcoal opacity-80">
                      {t('contact.info.phone.hours')}
                    </p>
                    <p className="text-sm text-brand-umber font-medium">
                      {t('contact.info.phone.note')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-khaki bg-opacity-30 p-3 mr-4">
                    <svg className="w-6 h-6 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-brand-black">
                      {t('contact.info.email.title')}
                    </h3>
                    <p className="text-brand-charcoal mb-1">
                      <a href="mailto:info@reconstructor.se" className="hover:text-brand-umber">info@reconstructor.se</a>
                    </p>
                    <p className="text-sm text-brand-charcoal opacity-80">
                      {t('contact.info.email.response')}
                    </p>
                    <p className="text-sm text-brand-umber font-medium">
                      {t('contact.info.email.note')}
                    </p>
                  </div>
                </div>

                {/* Address section commented out for now
                <div className="flex items-start">
                  <div className="bg-brand-khaki bg-opacity-30 p-3 mr-4">
                    <svg className="w-6 h-6 text-brand-umber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-brand-black">
                      {t('contact.info.address.title')}
                    </h3>
                    <div className="text-brand-charcoal space-y-4">
                      <div>
                        <p className="font-medium text-brand-black">Stockholm</p>
                        <p>Stureplan 15, 114 35 Stockholm</p>
                        <p>Tel: <PhoneNumber number="+46 708 281225" /></p>
                      </div>
                      <div>
                        <p className="font-medium text-brand-black">Göteborg</p>
                        <p>Avenyn 42, 411 36 Göteborg</p>
                        <p>Tel: <PhoneNumber number="010 20 40 402" /></p>
                      </div>
                    </div>
                  </div>
                </div>
                */}
              </div>

              {/* Emergency Contact */}
              <div className="mt-12 bg-brand-umber bg-opacity-10 p-6">
                <h3 className="font-semibold text-lg mb-2 text-brand-black">
                  {t('contact.emergency.title')}
                </h3>
                <p className="text-brand-charcoal mb-4">
                  {t('contact.emergency.description')}
                </p>
                <button 
                  onClick={() => setShowEmergencyModal(true)}
                  className="bg-brand-umber text-brand-linen px-6 py-2 font-semibold hover:bg-brand-black transition-colors"
                >
                  {t('contact.emergency.button')}
                </button>
              </div>

              {/* Call-to-Action */}
              <div className="mt-12 bg-brand-khaki bg-opacity-20 p-6">
                <h3 className="font-semibold text-lg mb-2 text-brand-black">
                  {t('contact.callback.title')}
                </h3>
                <p className="text-brand-charcoal mb-4">
                  {t('contact.callback.description')}
                </p>
                <button 
                  onClick={() => setShowCallbackModal(true)}
                  className="bg-brand-khaki text-brand-black px-6 py-2 font-semibold hover:bg-opacity-80 transition-colors"
                >
                  {t('contact.callback.button')}
                </button>
              </div>
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

      {/* Callback Modal */}
      <EmergencyConsultation 
        isOpen={showCallbackModal}
        onClose={() => setShowCallbackModal(false)}
        type="callback"
      />
    </div>
  );
}

export default Kontakt;
