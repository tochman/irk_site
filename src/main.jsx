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
  if (langParam && ['en', 'sv', 'fa'].includes(langParam)) {
    console.log(`Setting initial language from URL parameter: ${langParam}`);
    i18n.changeLanguage(langParam);
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
