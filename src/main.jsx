import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import i18n from './i18n' // Import i18n instance
import App from './App.jsx'
import store from '@/state/store'

window.store = store

// Check for URL language parameter before React loads
// This is a direct approach to handle language from URL
try {
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  
  // Check for Facebook or other social crawlers in user agent
  const userAgent = navigator.userAgent.toLowerCase();
  const isSocialCrawler = 
    userAgent.includes('facebookexternalhit') || 
    userAgent.includes('twitterbot') || 
    userAgent.includes('linkedinbot');
  
  // Set language from URL parameter
  if (langParam && ['en', 'sv', 'fa'].includes(langParam)) {
    console.log(`Setting initial language from URL parameter: ${langParam}`);
    i18n.changeLanguage(langParam);
  } 
  // For social media crawlers, default to English if no lang parameter
  else if (isSocialCrawler) {
    console.log('Social media crawler detected, ensuring language is set');
    // Keep current language or set to English if none is set
    const currentLang = i18n.language || 'en';
    if (!['en', 'sv', 'fa'].includes(currentLang)) {
      i18n.changeLanguage('en');
    }
  }
} catch (error) {
  console.error("Error pre-setting language from URL parameter:", error);
}

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </HelmetProvider>
)
