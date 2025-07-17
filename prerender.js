import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define all routes to be prerendered
const routes = [
  '/',
  '/rekonstruktion',
  '/ackord', 
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
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });

  try {
    const page = await browser.newPage();
    
    // Set a reasonable viewport
    await page.setViewport({ width: 1200, height: 800 });

    for (const route of prerenderRoutes) {
      for (const lang of languages) {
        try {
          console.log(`📄 Prerendering ${route} (${lang})...`);
          
          // Always include the lang parameter for prerendering
          const url = `file://${resolve(__dirname, 'dist/index.html')}${route}?lang=${lang}`;
          await page.goto(url, { 
            waitUntil: 'networkidle0',
            timeout: 30000 
          });

          // Wait for React to hydrate and i18n to load
          await page.waitForFunction(
            () => {
              // Check if i18n exists in window scope or look for typical loaded elements
              return (window.i18n && window.i18n.isInitialized) || 
                     document.querySelector('[data-cy="main-content"]') ||
                     document.querySelector('[data-cy="main-header"]');
            },
            { timeout: 15000 }
          ).catch(() => {
            console.log(`⏰ Timeout waiting for i18n, continuing with ${route} (${lang})`);
          });

          // Additional wait for content to render - shorter to avoid Netlify timeouts
          await page.waitForTimeout(1000);

          // Get the rendered HTML
          const html = await page.content();
          
          // Create the output filename
          let outputPath;
          if (route === '/') {
            outputPath = lang === 'en' ? 
              resolve(__dirname, 'dist/index.html') : 
              resolve(__dirname, `dist/index-${lang}.html`);
          } else {
            const routePath = route.substring(1); // Remove leading slash
            outputPath = lang === 'en' ? 
              resolve(__dirname, `dist/${routePath}.html`) : 
              resolve(__dirname, `dist/${routePath}-${lang}.html`);
          }

          // Write the prerendered HTML
          writeFileSync(outputPath, html);
          console.log(`✅ Generated: ${outputPath}`);
          
        } catch (error) {
          console.error(`❌ Error prerendering ${route} (${lang}):`, error.message);
        }
      }
    }

    console.log('🎉 Prerendering completed!');
    
  } catch (error) {
    console.error('❌ Prerendering failed:', error);
    // Don't exit with error code, let the build continue
    console.log('🔄 Continuing with the build process despite prerendering errors');
  } finally {
    await browser.close();
  }
}

// Start the prerendering process
prerender().catch(console.error);
