// Netlify Edge Function for detecting crawlers and serving prerendered content

// Define social media and search engine crawler user agents
const CRAWLER_USER_AGENTS = [
  'facebookexternalhit',
  'Facebot',
  'LinkedInBot', 
  'Twitter',
  'bot',
  'googlebot',
  'baiduspider',
  'pinterest',
  'vkShare',
  'W3C_Validator',
  'whatsapp',
  'flipboard',
  'tumblr',
  'SocialShareURL',
  'developers.google.com',
  'lighthouse',
  'yandex',
  'bing',
  'slack',
  'discord',
];

export default async (request, context) => {
  // Get the user agent from the request
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check if this is a crawler
  const isCrawler = CRAWLER_USER_AGENTS.some(ua => 
    userAgent.toLowerCase().includes(ua.toLowerCase())
  );
  
  // If it's a crawler, set the Crawler header for the redirect rules in netlify.toml
  if (isCrawler) {
    console.log(`[Edge] Crawler detected: ${userAgent}`);
    
    // Add a header that will trigger the crawler condition in netlify.toml redirects
    context.headers.set('Crawler', 'true');
    
    // Preserve any query parameters in the URL
    const url = new URL(request.url);
    const lang = url.searchParams.get('lang');
    
    // Pass the language parameter to the SSR function if it exists
    if (lang && ['sv', 'en', 'fa'].includes(lang)) {
      context.headers.set('X-Language', lang);
    }
  }

  // Let the request continue through to the next processing step
  return context.next();
};

// Export the config for the edge function
export const config = {
  // Run on all paths
  path: "/*",
};
