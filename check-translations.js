import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read translation files
const svTranslation = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'locales', 'sv', 'translation.json'), 'utf8'));
const faTranslation = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'locales', 'fa', 'translation.json'), 'utf8'));

// Function to extract all keys from a nested object
function extractKeys(obj, prefix = '') {
  let keys = [];
  
  Object.keys(obj).forEach(key => {
    const currentKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recursively extract keys from nested objects
      keys = [...keys, ...extractKeys(obj[key], currentKey)];
    } else {
      keys.push(currentKey);
    }
  });
  
  return keys;
}

// Extract all keys from both translation files
const svKeys = extractKeys(svTranslation).sort();
const faKeys = extractKeys(faTranslation).sort();

console.log(`Swedish translation keys: ${svKeys.length}`);
console.log(`Farsi translation keys: ${faKeys.length}`);

// Find missing keys in Farsi translation
const missingInFa = svKeys.filter(key => !faKeys.includes(key));
if (missingInFa.length > 0) {
  console.log('\nKeys missing in Farsi translation:');
  missingInFa.forEach(key => console.log(`- ${key}`));
}

// Find extra keys in Farsi translation
const extraInFa = faKeys.filter(key => !svKeys.includes(key));
if (extraInFa.length > 0) {
  console.log('\nExtra keys in Farsi translation (not in Swedish):');
  extraInFa.forEach(key => console.log(`- ${key}`));
}

// Check if both files have the exact same keys
if (missingInFa.length === 0 && extraInFa.length === 0) {
  console.log('\n✅ Both translation files have the same keys.');
} else {
  console.log('\n❌ Translation files have different keys.');
}
