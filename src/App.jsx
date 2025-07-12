import { Routes, Route, Navigate } from 'react-router-dom'
import Authentication from '@/views/authentication/Authentication'
import Home from '@/components/Home'
import Header from '@/components/Header'
import Foretagsrekonstruktion from '@/views/Foretagsrekonstruktion'
import Ackord from '@/views/Ackord'
import Foretagskop from '@/views/Foretagskop'
import OmOss from '@/views/OmOss'
import Kontakt from '@/views/Kontakt'
import CookieConsent from '@/components/CookieConsent/index'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import SEOHead from '@/components/SEOHead'
import PrivacyPolicy from '@/views/PrivacyPolicy'
import Consent from '@/views/Consent'
import Integrity from '@/views/Integrity'
import Footer from '@/components/Footer'

function App() {
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
      <CookieConsent />
    </div>
  )
}

export default App
