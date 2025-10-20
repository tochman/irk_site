/**
 * Inspect CRM Lead fields in Odoo
 */

export const handler = async (event) => {
  const ODOO_URL = process.env.VITE_ODOO_URL || 'https://reconstructor.odoo.com';
  const ODOO_DB = process.env.VITE_ODOO_DATABASE || 'reconstructor';
  const ODOO_USER = process.env.VITE_ODOO_USERNAME || 'thomas@agileventures.org';
  const ODOO_API_KEY = process.env.VITE_ODOO_API_KEY || process.env.VITE_CRM_API_KEY;

  console.log('=== INSPECTING CRM.LEAD FIELDS ===');

  try {
    // Step 1: Authenticate
    const authXml = `<?xml version="1.0"?>
<methodCall>
  <methodName>authenticate</methodName>
  <params>
    <param><value><string>${ODOO_DB}</string></value></param>
    <param><value><string>${ODOO_USER}</string></value></param>
    <param><value><string>${ODOO_API_KEY}</string></value></param>
    <param><value><struct></struct></value></param>
  </params>
</methodCall>`;

    console.log('Authenticating...');
    const authResponse = await fetch(`${ODOO_URL}/xmlrpc/2/common`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: authXml
    });

    const authText = await authResponse.text();
    const uidMatch = authText.match(/<int>(\d+)<\/int>/);
    const uid = uidMatch ? parseInt(uidMatch[1]) : null;

    if (!uid) {
      throw new Error('Authentication failed');
    }

    console.log('Authenticated, UID:', uid);

    // Step 2: Get fields for crm.lead
    const fieldsXml = `<?xml version="1.0"?>
<methodCall>
  <methodName>execute_kw</methodName>
  <params>
    <param><value><string>${ODOO_DB}</string></value></param>
    <param><value><int>${uid}</int></value></param>
    <param><value><string>${ODOO_API_KEY}</string></value></param>
    <param><value><string>crm.lead</string></value></param>
    <param><value><string>fields_get</string></value></param>
    <param><value><array><data></data></array></value></param>
    <param><value><struct>
      <member>
        <name>attributes</name>
        <value><array><data>
          <value><string>string</string></value>
          <value><string>help</string></value>
          <value><string>type</string></value>
          <value><string>required</string></value>
        </data></array></value>
      </member>
    </struct></value></param>
  </params>
</methodCall>`;

    console.log('Fetching crm.lead fields...');
    const fieldsResponse = await fetch(`${ODOO_URL}/xmlrpc/2/object`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: fieldsXml
    });

    const fieldsText = await fieldsResponse.text();
    console.log('Fields response received, length:', fieldsText.length);

    // Parse out field names from the XML (simplified)
    const fieldNames = [...fieldsText.matchAll(/<name>([^<]+)<\/name>/g)]
      .map(m => m[1])
      .filter(name => !['string', 'help', 'type', 'required'].includes(name));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        uid: uid,
        fieldCount: fieldNames.length,
        sampleFields: fieldNames.slice(0, 50),
        allFields: fieldNames,
        rawResponse: fieldsText.substring(0, 5000)
      }, null, 2)
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
