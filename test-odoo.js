/**
 * Odoo API Connection Test
 * 
 * Run this script to test your Odoo connection:
 * node test-odoo.js
 * 
 * Or test in browser console after starting dev server
 */

// For Node.js testing (optional)
// You can also test directly in browser console at http://localhost:5174/leads

import { createOdooClient } from './src/services/odooApi.js';

async function testOdooConnection() {
  console.log('🔧 Testing Odoo Connection...\n');

  const client = createOdooClient();
  
  if (!client) {
    console.error('❌ Odoo client not configured');
    console.log('Please check your .env file has:');
    console.log('  - VITE_ODOO_URL');
    console.log('  - VITE_ODOO_DATABASE');
    console.log('  - VITE_ODOO_USERNAME');
    console.log('  - VITE_ODOO_API_KEY');
    return;
  }

  try {
    // Test 1: Get server version
    console.log('📡 Test 1: Getting Odoo server version...');
    const version = await client.getVersion();
    console.log('✅ Connection successful!');
    console.log('   Server version:', version.server_version);
    console.log('   Protocol version:', version.protocol_version);
    console.log('');

    // Test 2: Authenticate
    console.log('🔐 Test 2: Authenticating...');
    const uid = await client.authenticate();
    console.log('✅ Authentication successful!');
    console.log('   User ID:', uid);
    console.log('');

    // Test 3: Create a test lead
    console.log('📝 Test 3: Creating test lead...');
    const testLead = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+46701234567',
      companyName: 'Test Company AB',
      orgNumber: '556677-8899',
      revenue: '10_to_30',
      appointmentDate: '2025-10-25',
      appointmentTime: '10:00',
      additionalNotes: 'This is a test lead created from the integration test script'
    };

    const leadId = await client.createLead(testLead);
    console.log('✅ Test lead created successfully!');
    console.log('   Lead ID:', leadId);
    console.log('   Check your Odoo CRM to see the new lead');
    console.log('');

    console.log('🎉 All tests passed!');
    console.log('Your Odoo integration is working correctly.');
    console.log('');
    console.log('Next steps:');
    console.log('1. Check your Odoo CRM dashboard');
    console.log('2. Look for the test lead: "Test Company AB - Test User"');
    console.log('3. If you see it, the integration is ready!');
    console.log('4. You can delete the test lead from Odoo');

  } catch (error) {
    console.error('❌ Test failed!');
    console.error('Error:', error.message);
    console.log('');
    console.log('Common issues:');
    console.log('- Check API key is correct');
    console.log('- Verify username matches your Odoo login');
    console.log('- Confirm database name is correct');
    console.log('- Ensure Odoo URL is accessible');
  }
}

// Run tests
testOdooConnection();
