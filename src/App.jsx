import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Authentication from '@/views/authentication/Authentication'
import Home from '@/components/Home'
import Header from '@/components/Header'
import Foretagsrekonstruktion from '@/views/Foretagsrekonstruktion'
import Ackord from '@/views/Ackord'
import Foretagskop from '@/views/Foretagskop'
import OmOss from '@/views/OmOss'
import Kontakt from '@/views/Kontakt'
import KonkursLikvidation from '@/views/KonkursLikvidation'
import Kalkylator from '@/views/Kalkylator'
import CookieConsent from '@/components/CookieConsent/index'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import FacebookPixel from '@/components/FacebookPixel'
import SEOHead from '@/components/SEOHead'
import PrivacyPolicy from '@/views/PrivacyPolicy'
import Consent from '@/views/Consent'
import Integrity from '@/views/Integrity'
import Footer from '@/components/Footer'

function App() {
  const { ready, i18n } = useTranslation();

  // Check for language parameter in URL and set language accordingly
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      if (langParam && ['en', 'sv', 'fa'].includes(langParam) && i18n.language !== langParam) {
        console.log(`Setting language from URL parameter: ${langParam}`);
        i18n.changeLanguage(langParam);
      }
    } catch (error) {
      console.error("Error setting language from URL parameter:", error);
    }
  }, [i18n]);

  // Set document direction based on language
  useEffect(() => {
    const direction = i18n.language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  // Show loading state while i18next is initializing
  if (!ready) {
    return (
      <div className="min-h-screen bg-brand-linen flex items-center justify-center">
        <div className="text-brand-charcoal">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-linen">
      <SEOHead />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rekonstruktion" element={<Foretagsrekonstruktion />} />
        {/* Legacy route redirect */}
        <Route path="/foretagsrekonstruktion" element={<Navigate to="/rekonstruktion" replace />} />
        <Route path="/ackord" element={<Ackord />} />
        <Route path="/foretagskop" element={<Foretagskop />} />
        <Route path="/kalkylator" element={<Kalkylator />} />
        <Route path="/konkurs-likvidation" element={<KonkursLikvidation />} />
        <Route path="/konkurs" element={<Navigate to="/konkurs-likvidation" replace />} />
        <Route path="/likvidation" element={<Navigate to="/konkurs-likvidation" replace />} />
        <Route path="/om-oss" element={<OmOss />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="/integrity" element={<Integrity />} />
        <Route path="/authentication" element={
          <main 
            data-cy="main-content"
            className="container mx-auto px-6 py-8"
          >
            <Authentication />
          </main>
        } />
      </Routes>
      <Footer />
      <GoogleAnalytics measurementId={import.meta.env.VITE_GA_MEASUREMENT_ID || "G-YOUR-MEASUREMENT-ID"} />
      <FacebookPixel />
      <CookieConsent />
    </div>
  )
}

export default App
