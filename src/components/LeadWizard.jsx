import { useState } from "react";
import { useTranslation } from "react-i18next";
import useWeb3Forms from '@web3forms/react';
import PhoneNumber from "./PhoneNumber";
import ConfirmationMessage from "./ConfirmationMessage";

function LeadWizard() {
  const { t } = useTranslation();
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  
  // Get tomorrow's date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    revenue: "",
    email: "",
    phone: "",
    companyName: "",
    orgNumber: "",
    appointmentDate: getTomorrowDate(),
    appointmentTime: "",
    additionalNotes: "",
    gdprConsent: false,
    access_key: accessKey
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validatePhone = (phone) => {
    const cleanedPhone = phone.replace(/[\s\-()]/g, "");
    const phoneRegex = /^(\+\d{1,4}[0-9]{7,}|0[0-9]{7,}|[0-9]{7,})$/;
    return phoneRegex.test(cleanedPhone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateOrgNumber = (orgNumber) => {
    // Swedish organization number format: XXXXXX-XXXX
    const cleanedOrgNumber = orgNumber.replace(/[\s\-]/g, "");
    return cleanedOrgNumber.length >= 6;
  };

  const { submit, loading: isSubmitting } = useWeb3Forms({
    access_key: accessKey,
    settings: {
      from_name: t('lead.form.from_name', 'Reconstructor Lead Form'),
      subject: t('lead.form.subject', 'New Lead - Consultation Request')
    },
    onSuccess: (data) => {
      console.log('Web3Forms success response:', data);
      setIsSubmitted(true);
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
      setErrors({
        submit: t("form.errors.submit_failed")
      });
    }
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) {
          newErrors.firstName = t("lead.errors.first_name_required", "Förnamn krävs");
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = t("lead.errors.last_name_required", "Efternamn krävs");
        }
        if (!formData.revenue) {
          newErrors.revenue = t("lead.errors.revenue_required", "Välj omsättning");
        }
        break;

      case 2:
        if (!formData.email.trim()) {
          newErrors.email = t("lead.errors.email_required", "E-post krävs");
        } else if (!validateEmail(formData.email)) {
          newErrors.email = t("lead.errors.email_invalid", "Ogiltig e-postadress");
        }
        if (!formData.phone.trim()) {
          newErrors.phone = t("lead.errors.phone_required", "Telefonnummer krävs");
        } else if (!validatePhone(formData.phone)) {
          newErrors.phone = t("lead.errors.phone_invalid", "Ogiltigt telefonnummer");
        }
        break;

      case 3:
        if (!formData.companyName.trim()) {
          newErrors.companyName = t("lead.errors.company_name_required", "Företagsnamn krävs");
        }
        if (!formData.orgNumber.trim()) {
          newErrors.orgNumber = t("lead.errors.org_number_required", "Organisationsnummer krävs");
        } else if (!validateOrgNumber(formData.orgNumber)) {
          newErrors.orgNumber = t("lead.errors.org_number_invalid", "Ogiltigt organisationsnummer");
        }
        break;

      case 4:
        if (!formData.appointmentDate) {
          newErrors.appointmentDate = t("lead.errors.date_required", "Välj datum");
        }
        if (!formData.appointmentTime) {
          newErrors.appointmentTime = t("lead.errors.time_required", "Välj tid");
        }
        if (!formData.gdprConsent) {
          newErrors.gdprConsent = t("form.errors.gdpr_required", "Du måste godkänna GDPR");
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) {
      return;
    }

    // Generate calendar links for email
    const generateCalendarUrls = () => {
      const [hours, minutes] = formData.appointmentTime.split(':');
      const startDate = new Date(formData.appointmentDate);
      startDate.setHours(parseInt(hours), parseInt(minutes), 0);
      
      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + 45);

      const formatDateForCalendar = (date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
      };

      const title = 'Konsultation med Reconstructor';
      const description = 'Konfidentiell konsultation angående företagsrekonstruktion';
      const location = 'Telefonsamtal';

      const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatDateForCalendar(startDate)}/${formatDateForCalendar(endDate)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
      const outlookUrl = `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

      return { googleUrl, outlookUrl };
    };

    const calendarUrls = generateCalendarUrls();

    const formDataToSubmit = {
      access_key: accessKey,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      message: `
Förnamn: ${formData.firstName}
Efternamn: ${formData.lastName}
Omsättning: ${formData.revenue}
E-post: ${formData.email}
Telefon: ${formData.phone}
Företagsnamn: ${formData.companyName}
Org.nr: ${formData.orgNumber}
Önskat datum: ${formData.appointmentDate}
Önskad tid: ${formData.appointmentTime}
Konsultationslängd: 45 minuter
${formData.additionalNotes ? `\nMeddelande från kund:\n${formData.additionalNotes}` : ''}

--- Lägg till i kalender ---
Google Calendar: ${calendarUrls.googleUrl}
Outlook Calendar: ${calendarUrls.outlookUrl}

GDPR Godkänt: Ja
      `,
      subject: t('lead.form.subject', 'New Lead - Consultation Request')
    };
    
    console.log('Submitting lead form:', formDataToSubmit);
    
    try {
      // Submit to Web3Forms for email notification
      await submit({
        ...formDataToSubmit,
        botcheck: false,
      });
      console.log('✓ Lead form submitted successfully to Web3Forms');

      // Create lead in Odoo CRM via Netlify function
      try {
        const { createOdooLead } = await import('../services/odooClient');
        
        console.log('Creating lead in Odoo CRM...');
        const result = await createOdooLead(formData);
        console.log('✓ Lead created in Odoo with ID:', result.leadId);
      } catch (odooError) {
        console.error('✗ Failed to create lead in Odoo:', odooError.message);
        // Non-blocking - form was still submitted to Web3Forms
      }
    } catch (error) {
      console.error('Lead form submission error:', error);
    }
  };

  // Generate available time slots (45-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 16; hour++) {
      for (let minute = 0; minute < 60; minute += 45) {
        if (hour === 16 && minute > 0) break; // Stop at 16:00
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-brand-linen py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <ConfirmationMessage 
            userName={formData.firstName}
            appointmentDate={formData.appointmentDate}
            appointmentTime={formData.appointmentTime}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-linen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      step <= currentStep
                        ? 'bg-brand-umber text-brand-linen'
                        : 'bg-brand-khaki text-brand-charcoal'
                    }`}
                  >
                    {step}
                  </div>
                  <span className={`mt-3 text-sm text-center text-brand-charcoal ${currentStep === step ? 'font-bold' : ''}`}>
                    {t(`lead.step${step}.title`, ['Personuppgifter', 'Kontakt', 'Företag', 'Boka tid'][step - 1])}
                  </span>
                </div>
                {step < 4 && (
                  <div
                    className={`h-1 mx-2 flex-shrink-0 ${
                      step < currentStep ? 'bg-brand-umber' : 'bg-brand-khaki'
                    }`}
                    style={{ width: '60px' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-sm shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Heading */}
                <div className="mb-6 text-center">
                  <h1 className="text-3xl md:text-4xl font-bold text-brand-charcoal mb-3">
                    {t('lead.hero.main_heading', 'Vill du ge företaget en andra chans?')}
                  </h1>
                  <p className="text-xl md:text-2xl text-brand-umber font-semibold mb-2">
                    {t('lead.hero.sub_heading', 'Boka in 1 timmes fri telefonkonsultation')}
                  </p>
                  <p className="text-lg text-brand-charcoal">
                    {t('lead.hero.tagline', 'Helt kostnadsfritt & konfidentiellt')}
                  </p>
                </div>

                {/* Video */}
                <div className="mb-6">
                  <video 
                    controls
                    autoPlay
                    muted
                    playsInline
                    className="w-full rounded-sm shadow-lg"
                    poster="/KONKURS-poster.jpg"
                  >
                    <source src="/KONKURS-compressed.mp4" type="video/mp4" />
                    {t('lead.step1.video_not_supported', 'Din webbläsare stödjer inte videouppspelning.')}
                  </video>
                </div>

                <h2 className="text-2xl font-bold text-brand-charcoal mb-6">
                  {t('lead.step1.heading', 'Personuppgifter')}
                </h2>

                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-brand-charcoal mb-2">
                    {t('lead.step1.first_name', 'Förnamn')} *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-b-2 ${
                      errors.firstName ? 'border-red-500' : 'border-brand-khaki'
                    } focus:border-brand-umber focus:outline-none text-brand-charcoal bg-transparent`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-brand-charcoal mb-2">
                    {t('lead.step1.last_name', 'Efternamn')} *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-b-2 ${
                      errors.lastName ? 'border-red-500' : 'border-brand-khaki'
                    } focus:border-brand-umber focus:outline-none text-brand-charcoal bg-transparent`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-4">
                    {t('lead.step1.revenue', 'Hur mycket omsätter ditt företag?')} *
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 'less_than_10', label: t('lead.step1.revenue_less_than_10', '< 10 miljoner/år') },
                      { value: '10_to_30', label: t('lead.step1.revenue_10_to_30', '10-30 miljoner/år') },
                      { value: '30_to_50', label: t('lead.step1.revenue_30_to_50', '30-50 miljoner/år') },
                      { value: 'more_than_100', label: t('lead.step1.revenue_more_than_100', '100 < miljoner/år') },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="revenue"
                          value={option.value}
                          checked={formData.revenue === option.value}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-brand-umber border-brand-khaki focus:ring-brand-umber"
                        />
                        <span className="text-brand-charcoal">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.revenue && (
                    <p className="text-red-500 text-sm mt-2">{errors.revenue}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-brand-charcoal mb-6">
                  {t('lead.step2.heading', 'Kontaktuppgifter')}
                </h2>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-charcoal mb-2">
                    {t('lead.step2.email', 'E-post')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-b-2 ${
                      errors.email ? 'border-red-500' : 'border-brand-khaki'
                    } focus:border-brand-umber focus:outline-none text-brand-charcoal bg-transparent`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-brand-charcoal mb-2">
                    {t('lead.step2.phone', 'Telefonnummer')} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-b-2 ${
                      errors.phone ? 'border-red-500' : 'border-brand-khaki'
                    } focus:border-brand-umber focus:outline-none text-brand-charcoal bg-transparent`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Company Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-brand-charcoal mb-6">
                  {t('lead.step3.heading', 'Företagsinformation')}
                </h2>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-brand-charcoal mb-2">
                    {t('lead.step3.company_name', 'Vad heter ditt företag?')} *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-b-2 ${
                      errors.companyName ? 'border-red-500' : 'border-brand-khaki'
                    } focus:border-brand-umber focus:outline-none text-brand-charcoal bg-transparent`}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="orgNumber" className="block text-sm font-medium text-brand-charcoal mb-2">
                    {t('lead.step3.org_number', 'Org.nr')} *
                  </label>
                  <input
                    type="text"
                    id="orgNumber"
                    name="orgNumber"
                    value={formData.orgNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-b-2 ${
                      errors.orgNumber ? 'border-red-500' : 'border-brand-khaki'
                    } focus:border-brand-umber focus:outline-none text-brand-charcoal bg-transparent`}
                  />
                  {errors.orgNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.orgNumber}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Appointment Booking */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-brand-charcoal mb-6">
                  {t('lead.step4.heading', 'Välj Datum och Tid')}
                </h2>

                <div className="bg-brand-linen p-4 rounded-sm mb-6">
                  <div className="flex items-center space-x-2 text-brand-charcoal">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">
                      {t('lead.step4.duration', 'Konsultationslängd: 45 minuter')}
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="appointmentDate" className="block text-sm font-medium text-brand-charcoal mb-2">
                    {t('lead.step4.date', 'Datum')} *
                  </label>
                  <input
                    type="date"
                    id="appointmentDate"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    min={getMinDate()}
                    className={`w-full px-4 py-3 border-2 ${
                      errors.appointmentDate ? 'border-red-500' : 'border-brand-khaki'
                    } focus:border-brand-umber focus:outline-none text-brand-charcoal rounded`}
                  />
                  {errors.appointmentDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.appointmentDate}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="appointmentTime" className="block text-sm font-medium text-brand-charcoal mb-2">
                    {t('lead.step4.time', 'Tid')} *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, appointmentTime: time }));
                          if (errors.appointmentTime) {
                            setErrors((prev) => ({ ...prev, appointmentTime: "" }));
                          }
                        }}
                        className={`px-4 py-3 border-2 rounded font-medium transition-colors ${
                          formData.appointmentTime === time
                            ? 'bg-brand-umber text-brand-linen border-brand-umber'
                            : 'bg-white text-brand-charcoal border-brand-khaki hover:border-brand-umber'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {errors.appointmentTime && (
                    <p className="text-red-500 text-sm mt-2">{errors.appointmentTime}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-brand-charcoal mb-2">
                    {t('lead.step4.additional_notes', 'Finns det något du vill berätta innan mötet?')}
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-brand-khaki focus:border-brand-umber focus:outline-none text-brand-charcoal rounded resize-none"
                    placeholder={t('lead.step4.additional_notes_placeholder', 'T.ex. specifika frågor eller områden du vill diskutera...')}
                  />
                  <p className="text-xs text-brand-charcoal opacity-70 mt-1">
                    {t('lead.step4.additional_notes_help', 'Valfritt - hjälper oss att förbereda oss bättre för samtalet')}
                  </p>
                </div>

                <div>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="gdprConsent"
                      checked={formData.gdprConsent}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-brand-umber border-2 border-brand-khaki focus:ring-brand-umber"
                    />
                    <span className="text-sm text-brand-charcoal">
                      {t(
                        "form.gdpr_text",
                        "Jag godkänner att mina personuppgifter behandlas enligt GDPR för att genomföra denna konsultation. Uppgifterna raderas efter avslutad kontakt."
                      )}{" "}
                      *
                    </span>
                  </label>
                  {errors.gdprConsent && (
                    <p className="text-red-500 text-sm mt-1">{errors.gdprConsent}</p>
                  )}
                </div>

                {errors.submit && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p className="text-sm">{errors.submit}</p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex items-center space-x-2 px-6 py-3 bg-brand-umber text-brand-linen font-bold hover:bg-opacity-90 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>{t('lead.button.previous', 'Föregående')}</span>
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto flex items-center space-x-2 px-6 py-3 bg-brand-umber text-brand-linen font-bold hover:bg-opacity-90 transition-colors"
                >
                  <span>{t('lead.button.next', 'Nästa')}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-auto px-6 py-3 bg-brand-umber text-brand-linen font-bold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>{t("form.submitting", "Skickar...")}</span>
                    </>
                  ) : (
                    <span>{t('lead.button.submit', 'Skicka In')}</span>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-brand-charcoal">
          <p>
            {t("form.alternative", "Eller ring oss direkt på")}{" "}
            <strong><PhoneNumber number="+46 722 441585" /></strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LeadWizard;
