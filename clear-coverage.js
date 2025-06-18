// This script manually clears the Istanbul coverage cache
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to remove
const dirsToClean = [
  '.nyc_output',
  'coverage',
  '.nyc_tmp',
  '.nyc_cache',
  '.cypress-coverage'
];

// Remove old coverage files
dirsToClean.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    console.log(`Removing ${dir}...`);
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`Removed ${dir}`);
  } else {
    console.log(`${dir} doesn't exist, skipping...`);
  }
});

console.log('Coverage cache cleared successfully!');

// Create an empty .nycrc-temp file to reset Istanbul cache
const nycrcPath = path.join(__dirname, '.nycrc-temp');
fs.writeFileSync(nycrcPath, JSON.stringify({
  "all": true,
  "include": ["src/**/*.js", "src/**/*.jsx"],
  "exclude": [
    "**/*.spec.js",
    "**/*.test.js", 
    "**/*.cy.js", 
    "**/node_modules/**",
    "src/views/chat/**",
    "src/views/main/**"
  ],
  "cache": false,
  "sourceMap": false,
  "instrument": true,
  "report-dir": "./coverage"
}, null, 2));
console.log('Created temporary NYC config');

// Move to actual .nycrc after cleaning
console.log('Now run "yarn coverage:reset" to regenerate coverage with clean state');
