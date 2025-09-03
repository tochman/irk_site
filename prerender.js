import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define all routes to be prerendered
const routes = [
  '/',
  '/rekonstruktion',
  '/ackord', 
  '/kalkylator',
  '/konkurs-likvidation',
  '/kontakt',
  '/om-oss'
];

// Include all routes for prerendering (deduplicated)
const prerenderRoutes = Array.from(new Set(['/'].concat(routes)));

// All languages to prerender for
const languages = ['en', 'sv', 'fa'];

async function prerender() {
  console.log('🚀 Starting prerendering process...');
  
  try {
    // Read the index.html file
    const indexHtmlPath = resolve(__dirname, 'dist/index.html');
    const indexHtml = readFileSync(indexHtmlPath, 'utf8');
    
    for (const route of prerenderRoutes) {
      for (const lang of languages) {
        try {
          console.log(`📄 Creating HTML for ${route} (${lang})...`);
          
          // Add language attributes to the HTML
          let updatedHtml = indexHtml;
          const langAttribute = lang === 'fa' ? 'lang="fa" dir="rtl"' : `lang="${lang}"`;
          updatedHtml = updatedHtml.replace('<html', `<html ${langAttribute}`);
          
          // Add meta tags for language
          const langMetaTag = `<meta http-equiv="content-language" content="${lang}">`;
          updatedHtml = updatedHtml.replace('</head>', `${langMetaTag}\n</head>`);
          
          // Create the output path
          let outputPath;
          if (route === '/') {
            outputPath = lang === 'en' ? 
              resolve(__dirname, 'dist/index.html') : 
              resolve(__dirname, `dist/index-${lang}.html`);
          } else {
            const routePath = route.substring(1); // Remove leading slash
            
            // Create directory if it doesn't exist
            const routeDir = resolve(__dirname, `dist/${routePath}`);
            if (!existsSync(routeDir)) {
              mkdirSync(routeDir, { recursive: true });
            }
            
            outputPath = lang === 'en' ? 
              resolve(__dirname, `dist/${routePath}/index.html`) : 
              resolve(__dirname, `dist/${routePath}/index-${lang}.html`);
          }
          
          // Write the HTML file
          writeFileSync(outputPath, updatedHtml);
          console.log(`✅ Generated: ${outputPath}`);
          
        } catch (error) {
          console.error(`❌ Error creating HTML for ${route} (${lang}):`, error.message);
        }
      }
    }
    
    console.log('🎉 Prerendering completed!');
  } catch (error) {
    console.error('❌ Prerendering failed:', error.message);
    // Don't exit with error code, let the build continue
    console.log('🔄 Continuing with the build process despite prerendering errors');
  }
  
  console.log('✅ Prerender script completed execution');
  return;
}

// Start the prerendering process
prerender().catch(error => {
  console.error('❌ Unexpected error during prerendering:', error);
  console.log('Prerendering skipped, continuing build without error');
});
