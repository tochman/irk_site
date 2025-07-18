// Netlify SSR function to render pages for crawlers
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

// Get directory name equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// A basic cache to prevent repeated processing of the same pages
const RENDER_CACHE = new Map();
const CACHE_TTL = 3600000; // 1 hour in milliseconds

export const handler = async (event) => {
  try {
    console.log("[SSR] Request headers:", JSON.stringify(event.headers));
    
    // Check if this is a Facebook crawler
    const userAgent = event.headers['user-agent'] || '';
    const isFacebookCrawler = userAgent.toLowerCase().includes('facebookexternalhit') || 
                             userAgent.toLowerCase().includes('facebot');
    
    if (isFacebookCrawler) {
      console.log(`[SSR] Facebook crawler detected: ${userAgent}`);
    }
    
    // Get the requested path and language
    const requestPath = event.path || '/';
    const language = event.headers['x-language'] || 
                     event.queryStringParameters?.lang || 
                     'sv'; // Default to Swedish
    
    // Check cache first
    const cacheKey = `${requestPath}-${language}`;
    const cachedResponse = RENDER_CACHE.get(cacheKey);
    const now = Date.now();
    
    if (cachedResponse && (now - cachedResponse.timestamp < CACHE_TTL)) {
      console.log(`[SSR] Cache hit for ${requestPath}`);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: cachedResponse.html,
      };
    }

    // Get the index.html content
    const indexPath = path.join(__dirname, '../../dist/index.html');
    const html = fs.readFileSync(indexPath, 'utf8');
    
    // Create a virtual DOM from the HTML
    const url = new URL(`https://${event.headers.host}${requestPath}`);
    if (language && language !== 'en') {
      url.searchParams.set('lang', language);
    }
    
    const dom = new JSDOM(html, {
      url: url.toString(),
      runScripts: 'outside-only',
      resources: 'usable',
      pretendToBeVisual: true,
    });
    
    // Add a simple script to set language from URL parameter only
    const script = dom.window.document.createElement('script');
    script.innerHTML = `
      (function() {
        try {
          // This script only runs during SSR for crawlers
          const urlParams = new URLSearchParams(window.location.search);
          const lang = urlParams.get('lang');
          if (lang && ['sv', 'en', 'fa'].includes(lang)) {
            // We only set the attribute for SEO purposes during SSR
            document.documentElement.setAttribute('lang', lang);
            if (lang === 'fa') {
              document.documentElement.setAttribute('dir', 'rtl');
            } else {
              document.documentElement.setAttribute('dir', 'ltr');
            }
          }
        } catch (e) {
          console.error('Error setting language from URL during SSR:', e);
        }
      })();
    `;
    dom.window.document.head.appendChild(script);

    // Enhance metadata for social sharing based on path
    enhanceMetaTags(dom, requestPath, language);
    
    // Store in cache
    const responseHtml = dom.serialize();
    RENDER_CACHE.set(cacheKey, {
      html: responseHtml,
      timestamp: now,
    });
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: responseHtml,
    };
  } catch (error) {
    console.error('[SSR] Error:', error);
    
    // Fall back to client-side rendering
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      body: fs.readFileSync(path.join(__dirname, '../../dist/index.html'), 'utf8'),
    };
  }
};

// Helper function to enhance meta tags based on the path
function enhanceMetaTags(dom, path, language = 'sv') {
  const document = dom.window.document;
  const { head } = document;
  
  // Set default values
  let title = language === 'en' ? 'Reconstruction' : 'Rekonstruktion';
  let description = language === 'en' ? 'Your site description here' : 'Din platsbeskrivning här';
  let imageUrl = `https://reconstructor.se/images/reconstructor_screen_${language === 'en' ? 'en' : 'sv'}.png`;
  
  // Customize based on path and language
  if (path.includes('/om-oss') || path.includes('/about')) {
    title = language === 'en' ? 'About Us | Reconstructor' : 'Om oss | Rekonstruktion';
    description = language === 'en' ? 'Learn more about our company and mission' : 'Läs mer om vårt företag och vår mission';
    imageUrl = 'https://reconstructor.se/images/team/team_hero.jpg';
  } else if (path.includes('/kontakt') || path.includes('/contact')) {
    title = language === 'en' ? 'Contact Us | Reconstructor' : 'Kontakt | Rekonstruktion';
    description = language === 'en' ? 'Get in touch with our team' : 'Kom i kontakt med vårt team';
    imageUrl = 'https://reconstructor.se/images/heroes/contact_hero.jpg';
  } else if (path.includes('/rekonstruktion')) {
    title = language === 'en' ? 'Company Reconstruction | Reconstructor' : 'Företagsrekonstruktion | Rekonstruktion';
    description = language === 'en' ? 'Expert guidance through company reconstruction' : 'Expert vägledning genom företagsrekonstruktion';
    imageUrl = 'https://reconstructor.se/images/reconstructor_screen_' + (language === 'en' ? 'en' : 'sv') + '.png';
  } else if (path.includes('/ackord')) {
    title = language === 'en' ? 'Composition Agreement | Reconstructor' : 'Ackord | Rekonstruktion';
    description = language === 'en' ? 'Expert guidance on composition agreements' : 'Expert vägledning om ackord';
    imageUrl = 'https://reconstructor.se/images/features/composition_feature.jpg';
  } else if (path.includes('/konkurs-likvidation')) {
    title = language === 'en' ? 'Bankruptcy & Liquidation | Reconstructor' : 'Konkurs & Likvidation | Rekonstruktion';
    description = language === 'en' ? 'Expert guidance through bankruptcy and liquidation' : 'Expert vägledning genom konkurs och likvidation';
    imageUrl = 'https://reconstructor.se/images/features/bankruptcy_feature.jpg';
  }
  
  // Update or create meta tags
  updateMetaTag(head, 'title', title);
  updateMetaTag(head, 'meta[name="description"]', description, 'content');
  updateMetaTag(head, 'meta[property="og:title"]', title, 'content');
  updateMetaTag(head, 'meta[property="og:description"]', description, 'content');
  updateMetaTag(head, 'meta[property="og:image"]', imageUrl, 'content');
  // Include language parameter in the URL if necessary
  const langParam = language && language !== 'en' ? `?lang=${language}` : '';
  updateMetaTag(head, 'meta[property="og:url"]', `https://${dom.window.location.host}${path}${langParam}`, 'content');
  updateMetaTag(head, 'meta[name="twitter:card"]', 'summary_large_image', 'content');
  
  // Set language meta tags
  updateMetaTag(head, 'meta[property="og:locale"]', language === 'sv' ? 'sv_SE' : language === 'fa' ? 'fa_IR' : 'en_US', 'content');
  updateMetaTag(head, 'meta[http-equiv="content-language"]', language, 'content');
  
  // Set HTML lang attribute
  try {
    dom.window.document.documentElement.setAttribute('lang', language);
    // Set RTL direction for Persian
    if (language === 'fa') {
      dom.window.document.documentElement.setAttribute('dir', 'rtl');
    } else {
      dom.window.document.documentElement.setAttribute('dir', 'ltr');
    }
  } catch (err) {
    console.error('Error setting document language attributes:', err);
  }
}

// Helper function to update meta tags
function updateMetaTag(head, selector, value, attribute = null) {
  let element = head.querySelector(selector);
  
  if (!element) {
    if (selector === 'title') {
      element = head.ownerDocument.createElement('title');
      head.appendChild(element);
      element.textContent = value;
    } else {
      const [tagName, attrSelector] = selector.split('[');
      element = head.ownerDocument.createElement(tagName);
      
      if (attrSelector) {
        const [name, attrValue] = attrSelector.replace(']', '').split('=');
        element.setAttribute(name.trim(), attrValue.replace(/"/g, '').trim());
      }
      
      head.appendChild(element);
    }
  }
  
  if (attribute) {
    element.setAttribute(attribute, value);
  } else if (selector === 'title') {
    element.textContent = value;
  }
}
