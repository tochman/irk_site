/**
 * Odoo External API Integration
 * 
 * This service handles communication with Odoo's XML-RPC API
 * to create leads/contacts in the CRM system.
 * 
 * Documentation: https://www.odoo.com/documentation/18.0/developer/reference/external_api.html
 */

class OdooAPI {
  constructor(config) {
    this.url = config.url;
    this.db = config.database;
    this.username = config.username;
    this.apiKey = config.apiKey; // API Key replaces password
    this.uid = null;
  }

  /**
   * Create XML-RPC request body
   */
  createXMLRPCRequest(method, params) {
    const methodCall = `<?xml version="1.0"?>
<methodCall>
  <methodName>${method}</methodName>
  <params>
${params.map(param => `    <param><value>${this.formatValue(param)}</value></param>`).join('\n')}
  </params>
</methodCall>`;
    return methodCall;
  }

  /**
   * Format value for XML-RPC
   */
  formatValue(value) {
    if (typeof value === 'string') {
      return `<string>${this.escapeXML(value)}</string>`;
    } else if (typeof value === 'number') {
      return Number.isInteger(value) ? `<int>${value}</int>` : `<double>${value}</double>`;
    } else if (typeof value === 'boolean') {
      return `<boolean>${value ? 1 : 0}</boolean>`;
    } else if (Array.isArray(value)) {
      return `<array><data>${value.map(v => `<value>${this.formatValue(v)}</value>`).join('')}</data></array>`;
    } else if (typeof value === 'object' && value !== null) {
      const members = Object.entries(value).map(([key, val]) => 
        `<member><name>${key}</name><value>${this.formatValue(val)}</value></member>`
      ).join('');
      return `<struct>${members}</struct>`;
    }
    return '<string></string>';
  }

  /**
   * Escape XML special characters
   */
  escapeXML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Parse XML-RPC response
   */
  parseXMLRPCResponse(xml) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    
    // Check for fault
    const fault = doc.querySelector('fault');
    if (fault) {
      const faultValue = this.extractValue(fault.querySelector('value'));
      throw new Error(`Odoo API Error: ${JSON.stringify(faultValue)}`);
    }

    // Extract result
    const value = doc.querySelector('params param value');
    return value ? this.extractValue(value) : null;
  }

  /**
   * Extract value from XML-RPC response
   */
  extractValue(element) {
    if (!element) return null;

    const child = element.firstElementChild;
    if (!child) return element.textContent;

    switch (child.tagName) {
      case 'string':
        return child.textContent;
      case 'int':
      case 'i4':
        return parseInt(child.textContent, 10);
      case 'double':
        return parseFloat(child.textContent);
      case 'boolean':
        return child.textContent === '1' || child.textContent === 'true';
      case 'array':
        return Array.from(child.querySelectorAll('data > value')).map(v => this.extractValue(v));
      case 'struct':
        const obj = {};
        child.querySelectorAll('member').forEach(member => {
          const name = member.querySelector('name').textContent;
          const value = member.querySelector('value');
          obj[name] = this.extractValue(value);
        });
        return obj;
      default:
        return child.textContent;
    }
  }

  /**
   * Make XML-RPC call
   */
  async call(endpoint, method, params) {
    const xmlBody = this.createXMLRPCRequest(method, params);
    
    const response = await fetch(`${this.url}${endpoint}`, {
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
    return this.parseXMLRPCResponse(xmlText);
  }

  /**
   * Authenticate with Odoo
   * Returns user ID (uid)
   */
  async authenticate() {
    if (this.uid) return this.uid;

    try {
      this.uid = await this.call('/xmlrpc/2/common', 'authenticate', [
        this.db,
        this.username,
        this.apiKey,
        {}
      ]);
      
      if (!this.uid) {
        throw new Error('Authentication failed - invalid credentials');
      }

      console.log('Odoo authentication successful, UID:', this.uid);
      return this.uid;
    } catch (error) {
      console.error('Odoo authentication error:', error);
      throw error;
    }
  }

  /**
   * Execute a method on an Odoo model
   */
  async execute(model, method, args = [], kwargs = {}) {
    if (!this.uid) {
      await this.authenticate();
    }

    return await this.call('/xmlrpc/2/object', 'execute_kw', [
      this.db,
      this.uid,
      this.apiKey,
      model,
      method,
      args,
      kwargs
    ]);
  }

  /**
   * Create a lead/opportunity in Odoo CRM
   * 
   * @param {Object} leadData - Lead information
   * @returns {number} - Created lead ID
   */
  async createLead(leadData) {
    const {
      firstName,
      lastName,
      email,
      phone,
      companyName,
      orgNumber,
      revenue,
      appointmentDate,
      appointmentTime,
      additionalNotes
    } = leadData;

    // Prepare lead data for Odoo
    const odooLeadData = {
      name: `${companyName} - ${firstName} ${lastName}`, // Lead title
      contact_name: `${firstName} ${lastName}`,
      email_from: email,
      phone: phone,
      partner_name: companyName, // Company name
      type: 'opportunity', // 'lead' or 'opportunity'
      
      // Custom fields (adjust field names based on your Odoo setup)
      description: `
Appointment Date: ${appointmentDate}
Appointment Time: ${appointmentTime}
Company Revenue: ${this.getRevenueLabel(revenue)}
Organization Number: ${orgNumber}

Additional Notes:
${additionalNotes || 'N/A'}
      `.trim(),
    };

    // Add revenue as expected_revenue if it's a numeric value
    if (revenue) {
      odooLeadData.x_studio_revenue_range = revenue; // Adjust field name as needed
    }

    // Add organization number as custom field
    if (orgNumber) {
      odooLeadData.x_studio_org_number = orgNumber; // Adjust field name as needed
    }

    try {
      // Create the lead in Odoo CRM (crm.lead model)
      const leadId = await this.execute('crm.lead', 'create', [[odooLeadData]]);
      
      console.log('Lead created in Odoo with ID:', leadId);
      return leadId;
    } catch (error) {
      console.error('Error creating lead in Odoo:', error);
      throw error;
    }
  }

  /**
   * Get revenue label from value
   */
  getRevenueLabel(revenue) {
    const revenueMap = {
      'less_than_10': '< 10 million/year',
      '10_to_30': '10-30 million/year',
      '30_to_50': '30-50 million/year',
      'more_than_100': '> 100 million/year'
    };
    return revenueMap[revenue] || revenue;
  }

  /**
   * Search for existing contact by email
   */
  async searchContact(email) {
    try {
      const partnerIds = await this.execute('res.partner', 'search', [
        [['email', '=', email]]
      ]);
      
      if (partnerIds && partnerIds.length > 0) {
        const partners = await this.execute('res.partner', 'read', [
          partnerIds,
          ['name', 'email', 'phone', 'company_name']
        ]);
        return partners[0];
      }
      
      return null;
    } catch (error) {
      console.error('Error searching for contact:', error);
      return null;
    }
  }

  /**
   * Create or update contact (res.partner)
   */
  async createOrUpdateContact(contactData) {
    const { firstName, lastName, email, phone, companyName } = contactData;

    // Check if contact exists
    const existingContact = await this.searchContact(email);

    const partnerData = {
      name: `${firstName} ${lastName}`,
      email: email,
      phone: phone,
      company_name: companyName,
      is_company: false,
    };

    try {
      if (existingContact) {
        // Update existing contact
        await this.execute('res.partner', 'write', [
          [existingContact.id],
          partnerData
        ]);
        console.log('Contact updated in Odoo:', existingContact.id);
        return existingContact.id;
      } else {
        // Create new contact
        const partnerId = await this.execute('res.partner', 'create', [[partnerData]]);
        console.log('Contact created in Odoo:', partnerId);
        return partnerId;
      }
    } catch (error) {
      console.error('Error creating/updating contact in Odoo:', error);
      throw error;
    }
  }

  /**
   * Get server version info (useful for testing connection)
   */
  async getVersion() {
    return await this.call('/xmlrpc/2/common', 'version', []);
  }
}

/**
 * Create and export configured Odoo API instance
 */
export const createOdooClient = () => {
  const config = {
    url: import.meta.env.VITE_ODOO_URL || 'https://your-odoo-instance.odoo.com',
    database: import.meta.env.VITE_ODOO_DATABASE || 'your-database',
    username: import.meta.env.VITE_ODOO_USERNAME || 'your-username',
    apiKey: import.meta.env.VITE_ODOO_API_KEY || import.meta.env.VITE_CRM_API_KEY,
  };

  // Validate configuration
  if (!config.url || !config.database || !config.username || !config.apiKey) {
    console.warn('Odoo API configuration incomplete. Please set VITE_ODOO_* environment variables.');
    return null;
  }

  return new OdooAPI(config);
};

export default OdooAPI;
