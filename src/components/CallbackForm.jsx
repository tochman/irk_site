import { useState } from "react";
import { useTranslation } from "react-i18next";
import useWeb3Forms from '@web3forms/react';
import PhoneNumber from "./PhoneNumber";
import ConfirmationMessage from "./ConfirmationMessage";

function CallbackForm({ onClose, type = 'emergency' }) {
  const { t } = useTranslation();
  // Make sure we have the access key
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  console.log('Access key initialized:', !!accessKey);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    preferredTime: "asap",
    gdprConsent: false,
    access_key: accessKey
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validatePhone = (phone) => {
    // Basic Swedish phone number validation
    const phoneRegex = /^(\+46|0)[1-9]\d{7,9}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ""));
  };
  
  // Debug Web3Forms access key
  console.log('Web3Forms access key present:', !!import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
  
  // Setup Web3Forms hook
  const { submit, loading: isSubmitting } = useWeb3Forms({
    access_key: accessKey, // Use the variable we defined above
    settings: {
      from_name: t('emergency.form.from_name', 'Reconstructor Callback Form'),
      subject: t('emergency.form.subject', 'Urgent Callback Request from Reconstructor Website')
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = t("form.errors.name_required");
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t(
        "form.errors.phone_required"
      );
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = t(
        "form.errors.phone_invalid"
      );
    }
    if (!formData.gdprConsent) {
      newErrors.gdprConsent = t(
        "form.errors.gdpr_required"
      );
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Ensure we have proper formatting and all required fields for Web3Forms
    const formDataToSubmit = {
      access_key: accessKey,
      name: formData.name,
      email: 'info@reconstructor.se', // Adding default email since Web3Forms might require it
      phone: formData.phone,
      message: `
Request Type: ${type === 'emergency' ? 'Emergency Consultation' : 'Callback Request'}
Preferred Time: ${formData.preferredTime === 'asap' ? t('form.time_asap') : 
                 formData.preferredTime === 'within_hour' ? t('form.time_hour') :
                 formData.preferredTime === 'today' ? t('form.time_today') :
                 formData.preferredTime === 'tomorrow' ? t('form.time_tomorrow') : formData.preferredTime}
GDPR Consent: ${formData.gdprConsent ? 'Accepted' : 'Not Accepted (This should not happen as form validation prevents it)'}
      `,
      subject: type === 'emergency' 
        ? t('emergency.form.subject_emergency', 'Urgent Consultation Request') 
        : t('emergency.form.subject_callback', 'Callback Request')
    };
    
    console.log('Submitting form with type:', type);
    console.log('Form data being submitted:', formDataToSubmit);
    
    try {
      // Make sure the data is passed correctly
      const result = await submit({
        ...formDataToSubmit,
        botcheck: false, // Add this to pass bot detection
      });
      console.log('Form submission completed successfully', result);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  
  // We'll keep this function commented out for now as it's not being used,
  // but we might want to add a "Send another request" button later
  /*
  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      preferredTime: "asap",
      gdprConsent: false,
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    });
    setErrors({});
    setIsSubmitted(false);
  };
  */

  if (isSubmitted) {
    return <ConfirmationMessage onClose={onClose} />;
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold">
          {t("form.title")}
        </h3>
        <button
          onClick={onClose}
          className="text-brand-linen hover:text-brand-khaki transition-colors"
          aria-label={t("form.close")}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            {t("form.name_label")} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 text-brand-black border-2 ${
              errors.name ? "border-red-500" : "border-brand-khaki"
            } focus:border-brand-linen focus:outline-none`}
            placeholder={t("form.name_placeholder")}
          />
          {errors.name && (
            <p className="text-red-300 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            {t("form.phone_label")} *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 text-brand-black border-2 ${
              errors.phone ? "border-red-500" : "border-brand-khaki"
            } focus:border-brand-linen focus:outline-none`}
            placeholder={t("form.phone_placeholder")}
          />
          {errors.phone && (
            <p className="text-red-300 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Preferred Time */}
        <div>
          <label
            htmlFor="preferredTime"
            className="block text-sm font-medium mb-2"
          >
            {t("form.time_label")}
          </label>
          <select
            id="preferredTime"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleInputChange}
            className="w-full px-4 py-3 text-brand-black border-2 border-brand-khaki focus:border-brand-linen focus:outline-none"
          >
            <option value="asap">
              {t("form.time_asap")}
            </option>
            <option value="within_hour">
              {t("form.time_hour")}
            </option>
            <option value="today">
              {t("form.time_today")}
            </option>
            <option value="tomorrow">
              {t("form.time_tomorrow")}
            </option>
          </select>
        </div>

        {/* GDPR Consent */}
        <div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="gdprConsent"
              checked={formData.gdprConsent}
              onChange={handleInputChange}
              className="mt-1 w-4 h-4 text-brand-umber border-2 border-brand-khaki focus:ring-brand-linen"
            />
            <span className="text-sm">
              {t(
                "form.gdpr_text",
                "Jag godkänner att mina personuppgifter behandlas enligt GDPR för att genomföra denna konsultation. Uppgifterna raderas efter avslutad kontakt."
              )}{" "}
              *
            </span>
          </label>
          {errors.gdprConsent && (
            <p className="text-red-300 text-sm mt-1">{errors.gdprConsent}</p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-red-500 bg-opacity-20 border border-red-300 p-4 rounded">
            <p className="text-red-200 text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-linen text-brand-umber px-6 py-4 font-bold text-lg hover:bg-brand-khaki hover:bg-opacity-90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
              {t("form.submitting")}
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              {t("form.submit")}
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm opacity-80">
        <p>
          {t("form.alternative")}{" "}
          <strong><PhoneNumber number="+46 708 281225" /></strong>
        </p>
      </div>
    </div>
  );
}

export default CallbackForm;
