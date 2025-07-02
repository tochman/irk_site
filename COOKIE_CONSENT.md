# GDPR Compliant Cookie Consent System

This document explains the cookie consent system implemented in this project to ensure GDPR compliance. The implementation is based on the approach from AgileVentures/homechef_ui.

## Overview

The cookie consent system provides users with control over which cookies and tracking technologies are used on the website. It consists of:

1. **Cookie Banner**: Displays on first visit, asking users to accept or decline cookies.
2. **Cookie Settings**: A detailed interface where users can manage individual cookie categories.
3. **Privacy Policy**: A page explaining the website's cookie usage and privacy practices.
4. **Settings Button**: Available in the footer for users to update their preferences.

## Components

### CookieConsent Component

The main component that handles cookie consent logic:
- Displays a consent banner when no preferences have been saved
- Allows users to accept all, reject all, or customize their preferences
- Persists user choices in localStorage
- Provides detailed settings view with toggles for different cookie categories

Located at `src/components/CookieConsent/index.jsx`

### Utility Functions

Located at `src/components/CookieConsent/cookieConsentUtil.js`, these functions:
- Check if consent has been given for specific cookie categories
- Check if any consent has been recorded
- Provide an event-based API for opening the cookie settings dialog

### GoogleAnalytics Component

A consent-aware Google Analytics integration that:
- Only loads Google Analytics when the user has consented to statistics cookies
- Uses the measurement ID from environment variables

Located at `src/components/GoogleAnalytics.jsx`

### Cookie Categories

1. **Necessary**: Always enabled, required for basic website functionality
2. **Preferences**: For storing user preferences and customizations
3. **Statistics**: Analytics and tracking cookies (including Google Analytics)
4. **Marketing**: Advertising and marketing-related cookies

## How to Use

### Implementing Google Analytics

1. Create a `.env` file in the project root with your Google Analytics Measurement ID:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. The GoogleAnalytics component is already integrated in App.jsx and will respect user consent.

### Adding a Settings Button

The "Cookie Settings" button in the Footer already uses the API to open the settings dialog:

```jsx
import { openCookieSettings } from '@/components/CookieConsent/cookieConsentUtil';

// Then in your component:
<button onClick={openCookieSettings}>
  Cookie Settings
</button>
```

### Checking for Consent in Your Code

To check if a user has consented to a specific cookie category:

```jsx
import { isConsentGiven } from '@/components/CookieConsent/cookieConsentUtil';

// To check if statistics/analytics cookies are allowed:
if (isConsentGiven('statistics')) {
  // Load analytics or tracking script
}

// Available categories:
// - 'necessary' (always returns true)
// - 'preferences'
// - 'statistics'
// - 'marketing'
```

## Translation Support

The cookie consent system is fully translatable. All user-facing text is managed through the i18n system with keys under the `cookieConsent` namespace.

Example of required translation keys:
```json
{
  "cookieConsent": {
    "title": "Cookie Preferences",
    "description": "This website uses cookies to enhance your experience.",
    "acceptAll": "Accept All",
    "rejectAll": "Reject All",
    "customize": "Customize",
    "save": "Save Preferences",
    "close": "Close",
    "privacyPolicy": "Privacy Policy",
    "settings": "Cookie Settings",
    "necessary": {
      "title": "Necessary Cookies",
      "description": "These cookies are required for the website to function properly."
    },
    "preferences": {
      "title": "Preference Cookies",
      "description": "These cookies remember your preferences and settings."
    },
    "statistics": {
      "title": "Statistics Cookies",
      "description": "These cookies collect information about how you use our website."
    },
    "marketing": {
      "title": "Marketing Cookies",
      "description": "These cookies track your online activity to help advertisers deliver more relevant advertising."
    }
  }
}
```

## Testing Compliance

To test the cookie consent system:

1. Clear browser cookies and local storage
2. Visit the site and verify the banner appears
3. Test each option (accept all, decline all, customize)
4. Verify that only allowed cookie categories are being set
