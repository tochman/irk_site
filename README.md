# Ejra Frontend

## Translations
For detailed information about translations, please see [TRANSLATION_GUIDE.md](TRANSLATION_GUIDE.md).

### Translation Guidelines
1. All user-facing text should use the i18next translation system (`t()` function)
2. Never use fallback strings in t() calls, e.g., `t('key', 'fallback')` is not allowed
3. All translation keys must exist in all language files
4. Run the translation check scripts periodically to ensure consistency

### Adding New Translations
1. Add the new key to `/public/locales/sv/translation.json` (Swedish - default)
2. Add the same key to `/public/locales/fa/translation.json` (Farsi)
3. Use the key in your code with the t() function: `t('your.new.key')`
4. Verify using the check scripts that both files remain synchronized