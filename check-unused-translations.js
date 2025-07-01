import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read translation files
const svTranslation = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'locales', 'sv', 'translation.json'), 'utf8'));

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

// Extract all keys from the translation file
const allKeys = extractKeys(svTranslation);

console.log(`Total translation keys: ${allKeys.length}`);

// Find all t() calls in the code
const grepOutput = execSync('grep -r "t([\'\\"][^\'\\",)]*[\'\\"])" --include="*.jsx" --include="*.js" src/', { encoding: 'utf8' });

// Extract keys from t() calls
const usedKeys = new Set();
const regex = /t\(['"]([^'"]+)['"]\)/g;
let match;

while ((match = regex.exec(grepOutput)) !== null) {
  usedKeys.add(match[1]);
}

console.log(`Used translation keys found in code: ${usedKeys.size}`);

// Find unused translation keys
const unusedKeys = allKeys.filter(key => !usedKeys.has(key));

if (unusedKeys.length > 0) {
  console.log('\nUnused translation keys:');
  unusedKeys.forEach(key => console.log(`- ${key}`));
  console.log(`\nTotal unused keys: ${unusedKeys.length}`);
} else {
  console.log('\n✅ All translation keys are used in the code.');
}

// Find missing translations (used in code but not in translation files)
const missingKeys = [...usedKeys].filter(key => !allKeys.includes(key));

if (missingKeys.length > 0) {
  console.log('\nKeys used in code but missing from translation files:');
  missingKeys.forEach(key => console.log(`- ${key}`));
  console.log(`\nTotal missing keys: ${missingKeys.length}`);
} else {
  console.log('\n✅ All keys used in code have translations.');
}
