import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BankIDModal from "./BankIdModal";
import { loginUser } from "../../state/actions/userActions";
import useBankIdAuth from "../../services/useBankIdAuth";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Authentication = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user?.currentUser);
  const { t } = useTranslation(); // Destructure t from useTranslation

  // Pull everything from the hook
  const {
    startAuthentication,
    stopAuthentication,
    qrCode,
    autoStartToken,
    orderRef,
    authMessage,
    errorMessage,
    isLoading,
    isAuthenticated,
    authenticatedUser,
    isNetworkError,
  } = useBankIdAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("🎯 Authentication component - errorMessage:", errorMessage);
  console.log("🎯 Authentication component - isModalOpen:", isModalOpen);
  console.log("🎯 Authentication component - isAuthenticated:", isAuthenticated);
  console.log("🎯 Authentication component - authMessage:", authMessage);

  const handleStartAuthentication = () => {
    startAuthentication();
    setIsModalOpen(true);
  };

  const handleStopAuthentication = () => {
    stopAuthentication();
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    // Add logout logic here
    dispatch({ type: 'LOGOUT_USER' });
  };

  useEffect(() => {
    // if user is now authenticated, close the modal and dispatch login
    if (isAuthenticated && authenticatedUser) {
      dispatch(loginUser(authenticatedUser));
      setIsModalOpen(false);
    }
  }, [isAuthenticated, authenticatedUser, dispatch]);

  // Close modal when there's an error
  useEffect(() => {
    if (errorMessage) {
      setIsModalOpen(false);
    }
  }, [errorMessage]);

  return (
    <div className="bg-brand-linen min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-charcoal to-brand-umber text-brand-linen py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('bankID.authentication')}
          </h1>
          <p className="text-xl text-brand-linen opacity-90">
            {t('bankID.header')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                {t('bankID.header')}
              </h2>
              <p className="text-brand-charcoal">
                Logga in säkert med ditt BankID för att komma åt ditt konto.
              </p>
            </div>

            {/* Current User Display */}
            {currentUser && (
              <div className="mb-6 p-4 bg-brand-linen text-center">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Inloggad som:
                </h3>
                <p className="text-brand-charcoal">{currentUser.personalNumber}</p>
                <p className="text-brand-charcoal">{currentUser.name}</p>
              </div>
            )}

            {/* Authentication Controls */}
            <div className="space-y-6">
              {!currentUser && !isAuthenticated && !isLoading && (
                <div className="text-center">
                  <button
                    onClick={handleStartAuthentication}
                    className="bg-brand-umber text-brand-linen px-8 py-3 font-semibold hover:bg-brand-black transition-colors"
                  >
                    Starta BankID-autentisering
                  </button>
                </div>
              )}

              {isLoading && (
                <div className="text-center">
                  <div className="bg-brand-linen p-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-umber mx-auto mb-4"></div>
                    <p className="text-brand-charcoal font-medium">
                      {authMessage || "Startar BankID..."}
                    </p>
                    {qrCode && (
                      <div className="mt-6">
                        <p className="text-sm text-brand-charcoal mb-4">
                          {t('bankID.scanQrInstructions')}
                        </p>
                        <div className="bg-white p-4 inline-block">
                          <img 
                            src={`data:image/png;base64,${qrCode}`} 
                            alt={t('bankID.qrCodeAlt')}
                            className="mx-auto"
                          />
                        </div>
                      </div>
                    )}
                    <button
                      onClick={handleStopAuthentication}
                      className="mt-4 bg-brand-charcoal text-brand-linen px-6 py-2 hover:bg-brand-black transition-colors"
                    >
                      Avbryt
                    </button>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <p className="text-red-800 font-medium">Fel:</p>
                  <p className="text-red-700">{errorMessage}</p>
                  {isNetworkError && (
                    <p className="text-sm text-red-600 mt-2">
                      Kontrollera din internetanslutning och försök igen.
                    </p>
                  )}
                  <button
                    onClick={handleStartAuthentication}
                    className="mt-4 bg-brand-umber text-brand-linen px-6 py-2 hover:bg-brand-black transition-colors"
                  >
                    Försök igen
                  </button>
                </div>
              )}

              {(isAuthenticated || currentUser) && (
                <div className="bg-brand-linen border-l-4 border-brand-umber p-4 text-center">
                  <p className="text-brand-black font-medium mb-4">
                    ✅ Autentisering genomförd framgångsrikt!
                  </p>
                  {authenticatedUser && (
                    <div className="text-brand-charcoal mb-4">
                      <p>Namn: {authenticatedUser.name}</p>
                      <p>Personnummer: {authenticatedUser.personalNumber}</p>
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="bg-brand-charcoal text-brand-linen px-6 py-2 hover:bg-brand-black transition-colors"
                  >
                    Logga ut
                  </button>
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-brand-linen border-l-4 border-brand-umber">
              <h4 className="font-semibold text-brand-black mb-2">
                {t('bankID.security.title')}
              </h4>
              <ul className="text-sm text-brand-charcoal space-y-1">
                <li>• {t('bankID.security.encrypted')}</li>
                <li>• {t('bankID.security.noStorage')}</li>
                <li>• {t('bankID.security.official')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BankID Modal */}
      <BankIDModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        qrCode={qrCode}
        authMessage={authMessage}
        errorMessage={errorMessage}
        isLoading={isLoading}
        onStart={handleStartAuthentication}
        onStop={handleStopAuthentication}
      />
    </div>
  );
};

export default Authentication;
