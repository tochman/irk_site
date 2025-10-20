/**
 * BROWSER CONSOLE TEST FOR ODOO INTEGRATION
 * 
 * Copy and paste this entire code into your browser console
 * when viewing http://localhost:5174/leads
 * 
 * This will test your Odoo connection directly from the browser
 */

(async function testOdoo() {
  console.log('%c🔧 Odoo Integration Test', 'color: blue; font-size: 16px; font-weight: bold');
  console.log('');

  // Import the Odoo client
  const { createOdooClient } = await import('./src/services/odooApi.js');
  
  const client = createOdooClient();
  
  if (!client) {
    console.log('%c❌ Odoo Not Configured', 'color: red; font-weight: bold');
    console.log('Check your .env file has all required variables');
    return;
  }

  console.log('%c✓ Odoo client created', 'color: green');
  console.log('URL:', import.meta.env.VITE_ODOO_URL);
  console.log('Database:', import.meta.env.VITE_ODOO_DATABASE);
  console.log('Username:', import.meta.env.VITE_ODOO_USERNAME);
  console.log('');

  try {
    // Test 1: Version
    console.log('%c📡 Testing connection...', 'color: blue; font-weight: bold');
    const version = await client.getVersion();
    console.log('%c✅ Connected!', 'color: green; font-weight: bold');
    console.log('Server:', version.server_version);
    console.log('');

    // Test 2: Authentication
    console.log('%c🔐 Testing authentication...', 'color: blue; font-weight: bold');
    const uid = await client.authenticate();
    console.log('%c✅ Authenticated!', 'color: green; font-weight: bold');
    console.log('User ID:', uid);
    console.log('');

    // Test 3: Create test lead
    console.log('%c📝 Creating test lead...', 'color: blue; font-weight: bold');
    const leadId = await client.createLead({
      firstName: 'Browser',
      lastName: 'Test',
      email: 'browsertest@example.com',
      phone: '+46701234567',
      companyName: 'Browser Test AB',
      orgNumber: '123456-7890',
      revenue: '10_to_30',
      appointmentDate: '2025-10-25',
      appointmentTime: '14:00',
      additionalNotes: 'Test lead from browser console'
    });
    console.log('%c✅ Lead created!', 'color: green; font-weight: bold');
    console.log('Lead ID:', leadId);
    console.log('');

    console.log('%c🎉 All Tests Passed!', 'color: green; font-size: 18px; font-weight: bold');
    console.log('Check your Odoo CRM for the test lead: "Browser Test AB - Browser Test"');

  } catch (error) {
    console.log('%c❌ Test Failed', 'color: red; font-size: 16px; font-weight: bold');
    console.error('Error:', error);
    console.log('');
    console.log('Troubleshooting:');
    console.log('1. Check your API key is correct');
    console.log('2. Verify your username and database name');
    console.log('3. Make sure your Odoo URL is accessible');
  }
})();
