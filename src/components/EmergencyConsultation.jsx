import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CallbackForm from './CallbackForm';

function EmergencyConsultation({ isOpen, onClose, type = 'emergency' }) {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setShowForm(type === 'callback'); // Show form immediately for callback type
    } else {
      setShowForm(false);
    }
  }, [isOpen, type]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getTitle = () => {
    if (type === 'callback') {
      return t('emergency.callback_title', 'Begär återuppringning');
    }
    return t('emergency.title', 'Akut situation?');
  };

  const getDescription = () => {
    if (type === 'callback') {
      return t('emergency.callback_description', 'Lämna ditt telefonnummer så ringer vi upp dig inom kort för en förutsättningslös och konfidentiell konsultation. Samtalet sker i förtroende och utan förbindelser.');
    }
    return t('emergency.description', 'Om ditt företag står inför en akut finansiell kris, kontakta oss omedelbart för konfidentiell akutkonsultation.');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-charcoal hover:text-brand-black z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-gradient-to-br from-brand-umber to-brand-black text-brand-linen p-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {getTitle()}
            </h2>
            
            <p className="text-xl mb-8 opacity-90">
              {getDescription()}
            </p>

            {!showForm && type === 'emergency' ? (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">
                  {t('emergency.consultation_title', 'Akutkonsultation')}
                </h3>
                
                <p className="text-lg mb-6 opacity-90">
                  {t('emergency.callback_question', 'Vill du att vi ringer upp dig?')}
                </p>
                
                <p className="mb-8 opacity-90">
                  {t('emergency.callback_description', 'Lämna ditt telefonnummer så ringer vi upp dig inom kort för en förutsättningslös och konfidentiell konsultation. Samtalet sker i förtroende och utan förbindelser.')}
                </p>

                <button
                  onClick={() => setShowForm(true)}
                  className="bg-brand-linen text-brand-umber px-8 py-4 font-bold text-lg hover:bg-brand-khaki hover:bg-opacity-90 transition-colors duration-300 inline-flex items-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t('emergency.request_callback', 'Begär konfidentiell återuppringning')}
                </button>
              </div>
            ) : (
              <CallbackForm onClose={onClose} type={type} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyConsultation;
