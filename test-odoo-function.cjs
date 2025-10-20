/**
 * Simple local test for the Odoo Netlify function
 * 
 * This bypasses netlify dev and just runs the function directly
 * 
 * Run with: node test-odoo-function.js
 */

// Load environment variables from .env
require('dotenv').config();

// Import the handler
const { handler } = require('./netlify/functions/odoo-create-lead.js');

// Test data
const testEvent = {
  httpMethod: 'POST',
  body: JSON.stringify({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '+46701234567',
    companyName: 'Test Company AB',
    orgNumber: '123456-7890',
    revenue: '10_to_30',
    appointmentDate: '2025-10-25',
    appointmentTime: '14:00',
    additionalNotes: 'Test lead from local script'
  })
};

console.log('🧪 Testing Odoo Netlify Function...\n');

handler(testEvent)
  .then(response => {
    console.log('✅ Function executed successfully!\n');
    console.log('Status:', response.statusCode);
    console.log('Response:', JSON.parse(response.body));
    
    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      console.log('\n🎉 Lead created with ID:', data.leadId);
      console.log('\nCheck your Odoo CRM at:');
      console.log('https://reconstructor.odoo.com/web#action=...&model=crm.lead');
    }
  })
  .catch(error => {
    console.error('❌ Function failed:', error);
  });
