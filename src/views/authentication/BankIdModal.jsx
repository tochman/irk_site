import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import QRCode from "./QRCode";

/**
 * BankIDModal Component
 *
 * @param {boolean} isOpen - Whether the modal is open
 * @param {function} onClose - Callback when the modal is closed
 * @param {string} orderRef - Reference ID for the BankID authentication session
 * @param {string} qrCodeData - Base64 QR code image data
 * @param {string} autoStartToken - Token for auto-starting BankID
 * @param {string} authMessage - Message to display during authentication
 * @param {string} errorMessage - Error message to display
 * @param {boolean} isLoading - Show spinner during loading state
 * @param {boolean} isNetworkError - Indicates a network/API connection error
 */
const BankIDModal = ({
  isOpen,
  onClose,
  orderRef,
  qrCodeData,
  autoStartToken,
  authMessage,
  errorMessage,
  isLoading,
  isNetworkError = false,
}) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(isOpen);
  const [showQrCodeSpinner, setShowQrCodeSpinner] = useState(true);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);
  
  // Control QR code spinner visibility
  useEffect(() => {
    if (qrCodeData) {
      // Hide spinner when QR code is available
      setShowQrCodeSpinner(false);
    } else if (isOpen) {
      // Show spinner when modal is open but QR code isn't loaded yet
      setShowQrCodeSpinner(true);
    }
  }, [qrCodeData, isOpen]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-brand-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-md w-full mx-auto p-6 shadow-xl max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-brand-black">
            {t("bankID.header")}
          </h2>
          <button
            onClick={onClose}
            className="text-brand-charcoal hover:text-brand-black p-2"
            aria-label="Stäng"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* QR Code Section */}
          {qrCodeData && !errorMessage && (
            <div className="text-center">
              <div className="mb-4">
                <QRCode data={qrCodeData} />
              </div>
              <p className="text-sm text-brand-charcoal">
                {t("bankID.scanQrInstructions")}
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && !qrCodeData && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-umber mx-auto mb-4"></div>
              <p className="text-brand-charcoal">
                {t("bankID.qrCodeLoading")}
              </p>
            </div>
          )}

          {/* Auth Message */}
          {authMessage && !errorMessage && (
            <div className="bg-brand-linen p-4 text-center">
              <p className="text-brand-charcoal font-medium">{authMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <h3 className="font-semibold text-red-800 mb-2">
                {isNetworkError ? "Anslutningsfel" : "Autentiseringsfel"}
              </h3>
              <p className="text-red-700 text-sm mb-3">{errorMessage}</p>
              {isNetworkError && (
                <p className="text-red-600 text-xs mb-3">
                  Kontrollera din internetanslutning och försök igen.
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-brand-charcoal text-brand-linen px-4 py-2 hover:bg-brand-black transition-colors"
            >
              {errorMessage ? "Stäng" : "Avbryt"}
            </button>
            {errorMessage && (
              <button
                onClick={() => {
                  // Restart authentication
                  window.location.reload();
                }}
                className="flex-1 bg-brand-umber text-brand-linen px-4 py-2 hover:bg-brand-black transition-colors"
              >
                Försök igen
              </button>
            )}
          </div>

          {/* Security Notice */}
          <div className="bg-brand-linen p-4 border-l-4 border-brand-umber">
            <h4 className="font-semibold text-brand-black text-sm mb-2">
              {t("bankID.security.title")}
            </h4>
            <ul className="text-xs text-brand-charcoal space-y-1">
              <li>• {t("bankID.security.encrypted")}</li>
              <li>• {t("bankID.security.noStorage")}</li>
              <li>• {t("bankID.security.official")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankIDModal;
