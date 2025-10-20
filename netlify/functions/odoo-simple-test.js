/**
 * Simplest possible Odoo test - just authenticate
 */

export const handler = async (event) => {
  const ODOO_URL = process.env.VITE_ODOO_URL || 'https://reconstructor.odoo.com';
  const ODOO_DB = process.env.VITE_ODOO_DATABASE || 'reconstructor';
  const ODOO_USER = process.env.VITE_ODOO_USERNAME || 'thomas@agileventures.org';
  const ODOO_KEY = process.env.VITE_ODOO_API_KEY || process.env.VITE_CRM_API_KEY;

  console.log('=== ODOO SIMPLE TEST ===');
  console.log('URL:', ODOO_URL);
  console.log('DB:', ODOO_DB);
  console.log('User:', ODOO_USER);
  console.log('Has Key:', !!ODOO_KEY);

  try {
    // Simplest XML-RPC auth request
    const authXml = `<?xml version="1.0"?>
<methodCall>
  <methodName>authenticate</methodName>
  <params>
    <param><value><string>${ODOO_DB}</string></value></param>
    <param><value><string>${ODOO_USER}</string></value></param>
    <param><value><string>${ODOO_KEY}</string></value></param>
    <param><value><struct></struct></value></param>
  </params>
</methodCall>`;

    console.log('Sending auth request...');
    const startTime = Date.now();
    
    const response = await fetch(`${ODOO_URL}/xmlrpc/2/common`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: authXml
    });

    const duration = Date.now() - startTime;
    console.log('Response time:', duration, 'ms');
    console.log('Status:', response.status);

    const responseText = await response.text();
    console.log('Response:', responseText);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: response.ok,
        status: response.status,
        duration: duration,
        response: responseText.substring(0, 500),
        config: {
          url: ODOO_URL,
          db: ODOO_DB,
          user: ODOO_USER,
          hasKey: !!ODOO_KEY
        }
      })
    };

  } catch (error) {
    console.error('ERROR:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error.message,
        stack: error.stack
      })
    };
  }
};
