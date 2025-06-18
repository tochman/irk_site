import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * QRCode Component for BankID authentication
 * 
 * @param {string} qrCode - Base64 QR code image data
 * @param {string} autoStartToken - Token for auto-starting BankID
 * @param {string} orderRef - Reference ID for the BankID authentication session
 */
const QRCode = ({ qrCode, autoStartToken, orderRef }) => {
  const { t } = useTranslation();
  
  useEffect(() => {
    // Auto-start logic for mobile devices
    if (autoStartToken && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      const bankIdUrl = `bankid:///?autostarttoken=${autoStartToken}&redirect=null`;
      window.location.href = bankIdUrl;
    }
  }, [autoStartToken]);

  console.log('QRCode component props:', { qrCode, autoStartToken, orderRef });

  return (
    <div 
      data-cy="qr-code-container"
      className="flex flex-col items-center space-y-4"
    >
      <div 
        data-cy="qr-code-wrapper"
        className="p-4 bg-white border border-brand-khaki"
      >
        {qrCode ? (
          <img 
            data-cy="qr-code-image"
            src={`data:image/png;base64,${qrCode}`} 
            alt={t('bankID.qrCodeAlt')} 
            className="w-48 h-48"
            onError={(e) => {
              console.error('Failed to load QR code image:', e);
              console.log('QR code data:', qrCode);
            }}
          />
        ) : (
          <div 
            data-cy="qr-code-placeholder"
            className="w-48 h-48 flex items-center justify-center bg-brand-linen"
          >
            <p className="text-brand-charcoal text-sm">{t('bankID.qrCodeLoading')}</p>
          </div>
        )}
      </div>
      
      <p 
        data-cy="qr-code-instructions"
        className="text-center text-sm text-brand-charcoal"
      >
        {t('bankID.scanQrInstructions')}
      </p>
    </div>
  );
};

export default QRCode;
