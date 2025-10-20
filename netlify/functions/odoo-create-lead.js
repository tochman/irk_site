/**
 * Netlify Serverless Function for Odoo CRM Integration
 * 
 * This function proxies requests to Odoo's XML-RPC API to avoid CORS issues
 * and keeps API credentials secure on the server side.
 */

import fetch from 'node-fetch';

/**
 * Create XML-RPC request
 */
function createXMLRPCRequest(method, params) {
  const formatValue = (value) => {
    if (typeof value === 'string') {
      return `<string>${escapeXML(value)}</string>`;
    } else if (typeof value === 'number') {
      return Number.isInteger(value) ? `<int>${value}</int>` : `<double>${value}</double>`;
    } else if (typeof value === 'boolean') {
      return `<boolean>${value ? 1 : 0}</boolean>`;
    } else if (Array.isArray(value)) {
      return `<array><data>${value.map(v => `<value>${formatValue(v)}</value>`).join('')}</data></array>`;
    } else if (typeof value === 'object' && value !== null) {
      const members = Object.entries(value).map(([key, val]) => 
        `<member><name>${key}</name><value>${formatValue(val)}</value></member>`
      ).join('');
      return `<struct>${members}</struct>`;
    }
    return '<string></string>';
  };

  const escapeXML = (str) => {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  return `<?xml version="1.0"?>
<methodCall>
  <methodName>${method}</methodName>
  <params>
${params.map(param => `    <param><value>${formatValue(param)}</value></param>`).join('\n')}
  </params>
</methodCall>`;
}

/**
 * Parse XML-RPC response
 */
function parseXMLRPCResponse(xml) {
  const extractValue = (element) => {
    if (!element) return null;
    
    const intMatch = element.match(/<int>(\d+)<\/int>/);
    if (intMatch) return parseInt(intMatch[1], 10);
    
    const stringMatch = element.match(/<string>(.*?)<\/string>/s);
    if (stringMatch) return stringMatch[1];
    
    const boolMatch = element.match(/<boolean>(\d+)<\/boolean>/);
    if (boolMatch) return boolMatch[1] === '1';
    
    return null;
  };

  // Check for fault
  if (xml.includes('<fault>')) {
    const faultString = xml.match(/<string>(.*?)<\/string>/s);
    throw new Error(`Odoo API Error: ${faultString ? faultString[1] : 'Unknown error'}`);
  }

  // Extract value from params
  const valueMatch = xml.match(/<params>.*?<value>(.*?)<\/value>/s);
  if (valueMatch) {
    return extractValue(valueMatch[0]);
  }

  return null;
}

/**
 * Make XML-RPC call to Odoo
 */
async function callOdoo(endpoint, method, params, odooUrl) {
  const xmlBody = createXMLRPCRequest(method, params);
  
  const response = await fetch(`${odooUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml',
    },
    body: xmlBody,
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  }

  const xmlText = await response.text();
  return parseXMLRPCResponse(xmlText);
}

/**
 * Get revenue label from value
 */
function getRevenueLabel(revenue) {
  const revenueMap = {
    'less_than_10': '< 10 miljoner/år',
    '10_to_30': '10-30 miljoner/år',
    '30_to_50': '30-50 miljoner/år',
    'more_than_100': '> 100 miljoner/år'
  };
  return revenueMap[revenue] || revenue;
}

/**
 * Main handler
 */
export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // Get Odoo credentials from environment variables
  const ODOO_URL = process.env.VITE_ODOO_URL;
  const ODOO_DATABASE = process.env.VITE_ODOO_DATABASE;
  const ODOO_USERNAME = process.env.VITE_ODOO_USERNAME;
  const ODOO_API_KEY = process.env.VITE_ODOO_API_KEY || process.env.VITE_CRM_API_KEY;

  if (!ODOO_URL || !ODOO_DATABASE || !ODOO_USERNAME || !ODOO_API_KEY) {
    console.error('Missing Odoo configuration');
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Server configuration error',
        message: 'Odoo credentials not configured'
      })
    };
  }

  try {
    // Parse request body
    const leadData = JSON.parse(event.body);
    console.log('Creating lead in Odoo:', leadData.companyName);

    // Step 1: Authenticate
    const uid = await callOdoo('/xmlrpc/2/common', 'authenticate', [
      ODOO_DATABASE,
      ODOO_USERNAME,
      ODOO_API_KEY,
      {}
    ], ODOO_URL);

    if (!uid) {
      throw new Error('Authentication failed');
    }

    console.log('Authenticated with Odoo, UID:', uid);

    // Step 2: Prepare lead data
    const odooLeadData = {
      name: `${leadData.companyName} - ${leadData.firstName} ${leadData.lastName}`,
      contact_name: `${leadData.firstName} ${leadData.lastName}`,
      email_from: leadData.email,
      phone: leadData.phone,
      partner_name: leadData.companyName,
      type: 'opportunity',
      description: `
Appointment Date: ${leadData.appointmentDate}
Appointment Time: ${leadData.appointmentTime}
Company Revenue: ${getRevenueLabel(leadData.revenue)}
Organization Number: ${leadData.orgNumber}

Additional Notes:
${leadData.additionalNotes || 'N/A'}
      `.trim(),
    };

    // Step 3: Create lead in Odoo
    const leadId = await callOdoo('/xmlrpc/2/object', 'execute_kw', [
      ODOO_DATABASE,
      uid,
      ODOO_API_KEY,
      'crm.lead',
      'create',
      [[odooLeadData]],
      {}
    ], ODOO_URL);

    console.log('Lead created successfully with ID:', leadId);

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        leadId: leadId,
        message: 'Lead created successfully in Odoo'
      })
    };

  } catch (error) {
    console.error('Error creating lead in Odoo:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        message: 'Failed to create lead in Odoo'
      })
    };
  }
};
