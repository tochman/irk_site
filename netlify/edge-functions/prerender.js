export default async (request, context) => {
  const url = new URL(request.url);
  
  // Check if the request is from a crawler/bot
  const userAgent = request.headers.get('user-agent') || '';
  const isCrawler = /bot|crawler|spider|facebook|twitter|linkedin|whatsapp|telegram|slack|google|bing|yahoo|duckduckgo/i.test(userAgent);
  
  // List of crawler user agents that need prerendered content
  const crawlerPatterns = [
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'telegrambot',
    'slackbot',
    'googlebot',
    'bingbot',
    'yahoobot',
    'duckduckbot',
    'applebot',
    'discordbot'
  ];
  
  const isKnownCrawler = crawlerPatterns.some(pattern => 
    userAgent.toLowerCase().includes(pattern)
  );
  
  // If it's not a crawler, serve the normal SPA
  if (!isCrawler && !isKnownCrawler) {
    return context.next();
  }
  
  // For crawlers, we'll add essential meta tags to the response
  const response = await context.next();
  
  if (response.headers.get('content-type')?.includes('text/html')) {
    let html = await response.text();
    
    // Add essential meta tags for social media
    const metaTags = `
    <!-- Essential SEO Meta Tags (for crawlers) -->
    <meta name="description" content="Professional help for companies in financial difficulties. We offer confidential consultations and expert guidance to help save your business." />
    <meta name="keywords" content="company reconstruction, business restructuring, financial recovery, debt restructuring, bankruptcy, liquidation, turnaround specialists" />
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Reconstructor" />
    <meta property="og:title" content="Reconstructor - International Restructuring Specialists" />
    <meta property="og:description" content="Professional help for companies in financial difficulties. We offer confidential consultations and expert guidance to help save your business." />
    <meta property="og:image" content="https://reconstructor.se/images/eagle_logo_2.svg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Reconstructor - International Restructuring Specialists" />
    <meta property="og:url" content="https://reconstructor.se${url.pathname}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:locale:alternate" content="sv_SE" />
    <meta property="og:locale:alternate" content="fa_IR" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Reconstructor - International Restructuring Specialists" />
    <meta name="twitter:description" content="Professional help for companies in financial difficulties. We offer confidential consultations and expert guidance to help save your business." />
    <meta name="twitter:image" content="https://reconstructor.se/images/eagle_logo_2.svg" />
    <meta name="twitter:image:alt" content="Reconstructor - International Restructuring Specialists" />
    <meta name="twitter:site" content="@reconstructor" />
    <meta name="twitter:creator" content="@reconstructor" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://reconstructor.se${url.pathname}" />
    `;
    
    // Insert meta tags after the existing head opening tag
    html = html.replace(
      /<head>/i,
      `<head>${metaTags}`
    );
    
    // Update the title based on the route
    let pageTitle = "Reconstructor - International Restructuring Specialists";
    
    switch (url.pathname) {
      case '/rekonstruktion':
        pageTitle = "Company Reconstruction Services - Expert Legal Protection | Reconstructor";
        break;
      case '/ackord':
        pageTitle = "Composition Agreements - Debt Restructuring Solutions | Reconstructor";
        break;
      case '/konkurs-likvidation':
        pageTitle = "Bankruptcy & Liquidation - Expert Legal Guidance | Reconstructor";
        break;
      case '/kontakt':
        pageTitle = "Contact Us - Professional Business Recovery Consultation | Reconstructor";
        break;
      case '/om-oss':
        pageTitle = "About Us - International Restructuring Specialists | Reconstructor";
        break;
    }
    
    // Update the title
    html = html.replace(
      /<title>[^<]*<\/title>/i,
      `<title>${pageTitle}</title>`
    );
    
    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...response.headers,
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=3600' // Cache for crawlers
      }
    });
  }
  
  return response;
};
