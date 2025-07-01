# Translation Management

## Current Status
- ✅ All fallback strings have been removed from t() calls
- ✅ Both Swedish and Farsi translation files have exactly the same keys (326 keys)
- ✅ All keys used in code are present in both translation files
- ⚠️ There are 61 unused translation keys (see check-unused-translations.js output)

## Tools Created
1. `check-translations.js` - Checks if both translation files (sv and fa) have the same keys
2. `check-unused-translations.js` - Identifies translation keys that aren't used in code

## Handling RTL Languages (e.g., Farsi)

### Phone Numbers in RTL Languages
When displaying phone numbers in RTL language contexts, use the `PhoneNumber` component to ensure they appear correctly:

```jsx
import PhoneNumber from '../components/PhoneNumber';

// For displaying a phone number
<PhoneNumber number="+46 708 281225" />

// For displaying a clickable phone number
<PhoneNumber number="+46 708 281225" isLink={true} className="hover:text-brand-umber" />
```

## Recommendations for Future Development
1. **CI/CD Integration**: Add a step to your CI pipeline to run `check-translations.js` to ensure both files stay in sync
2. **ESLint Rule**: Consider adding an ESLint rule to prevent fallback strings in t() calls
3. **Cleanup**: Consider removing unused translation keys for better maintainability, or document why they're kept
4. **Documentation**: Update your developer guidelines to include best practices for translations
5. **RTL Testing**: Always test the application in RTL languages to ensure proper display of content

## Running the Translation Scripts
```bash
# Check if translation files are synchronized
node check-translations.js

# Check for unused translation keys
node check-unused-translations.js
```
