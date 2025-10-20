/**
 * Simple test function to verify Odoo connectivity
 * Uses built-in fetch (Node 18+)
 */

export const handler = async (event) => {
  const ODOO_URL = process.env.VITE_ODOO_URL;
  const ODOO_DATABASE = process.env.VITE_ODOO_DATABASE;
  const ODOO_USERNAME = process.env.VITE_ODOO_USERNAME;
  const ODOO_API_KEY = process.env.VITE_ODOO_API_KEY || process.env.VITE_CRM_API_KEY;

  console.log('Testing Odoo connection...');
  console.log('URL:', ODOO_URL);
  console.log('Database:', ODOO_DATABASE);
  console.log('Username:', ODOO_USERNAME);
  console.log('Has API Key:', !!ODOO_API_KEY);

  if (!ODOO_URL || !ODOO_DATABASE || !ODOO_USERNAME || !ODOO_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Missing configuration',
        config: {
          hasUrl: !!ODOO_URL,
          hasDb: !!ODOO_DATABASE,
          hasUsername: !!ODOO_USERNAME,
          hasApiKey: !!ODOO_API_KEY
        }
      })
    };
  }

  try {
    // Test 1: Check if URL is reachable
    console.log('Test 1: Checking URL reachability...');
    const urlTest = await fetch(ODOO_URL, { method: 'HEAD' });
    console.log('URL test status:', urlTest.status);

    // Test 2: Try authentication with short timeout
    console.log('Test 2: Attempting authentication...');
    const xmlBody = `<?xml version="1.0"?>
<methodCall>
  <methodName>authenticate</methodName>
  <params>
    <param><value><string>${ODOO_DATABASE}</string></value></param>
    <param><value><string>${ODOO_USERNAME}</string></value></param>
    <param><value><string>${ODOO_API_KEY}</string></value></param>
    <param><value><struct></struct></value></param>
  </params>
</methodCall>`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const startTime = Date.now();
    const response = await fetch(`${ODOO_URL}/xmlrpc/2/common`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: xmlBody,
      signal: controller.signal
    });
    const duration = Date.now() - startTime;
    
    clearTimeout(timeout);
    
    const xmlText = await response.text();
    console.log('Auth response time:', duration, 'ms');
    console.log('Auth response status:', response.status);
    console.log('Auth response (first 500 chars):', xmlText.substring(0, 500));

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        tests: {
          urlReachable: urlTest.status,
          authResponseTime: duration,
          authStatus: response.status,
          responsePreview: xmlText.substring(0, 200)
        }
      })
    };

  } catch (error) {
    console.error('Error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        type: error.name
      })
    };
  }
};
