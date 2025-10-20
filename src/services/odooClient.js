/**
 * Odoo CRM Integration Client (Netlify Function Proxy)
 * 
 * This client calls a Netlify serverless function which proxies
 * requests to Odoo's API, avoiding CORS issues and keeping
 * credentials secure on the server side.
 */

/**
 * Create a lead in Odoo CRM via Netlify function
 * 
 * @param {Object} leadData - Lead information from the wizard
 * @returns {Promise<Object>} - Response with leadId
 */
export async function createOdooLead(leadData) {
  try {
    const response = await fetch('/.netlify/functions/odoo-create-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || 'Failed to create lead');
    }

    return result;
  } catch (error) {
    console.error('Error calling Odoo function:', error);
    throw error;
  }
}

/**
 * Helper to check if Odoo integration is available
 */
export function isOdooAvailable() {
  // In production (Netlify), the function will be available
  // In development, it depends on Netlify Dev running
  return true; // Always attempt, let the function handle errors
}
