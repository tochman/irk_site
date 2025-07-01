import { useTranslation } from 'react-i18next';
import PhoneNumber from './PhoneNumber';

function ConfirmationMessage({ onClose }) {
  const { t } = useTranslation();

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h3 className="text-2xl font-bold mb-4">
          {t('confirmation.title')}
        </h3>
        
        <p className="text-lg mb-4">
          {t('confirmation.message')}
        </p>
        
        <p className="mb-6 opacity-90">
          {t('confirmation.next_steps')}
        </p>
        
        <div className="bg-brand-linen bg-opacity-20 p-4 rounded mb-6">
          <p className="text-sm opacity-90">
            {t('confirmation.confidential')}
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="bg-brand-linen text-brand-umber px-6 py-3 font-medium hover:bg-brand-khaki hover:bg-opacity-90 transition-colors duration-300"
      >
        {t('confirmation.close')}
      </button>
      
      <div className="mt-4 text-sm opacity-80">
        <p>{t('confirmation.urgent')} <strong><PhoneNumber number="+46 708 281225" /></strong></p>
      </div>
    </div>
  );
}

export default ConfirmationMessage;
