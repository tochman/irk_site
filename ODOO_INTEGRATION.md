# Odoo CRM Integration Guide

This document explains how to integrate the Lead Wizard with Odoo CRM using the External API.

## Overview

The integration creates leads/opportunities in Odoo CRM when users submit the lead wizard form. It uses Odoo's XML-RPC API to communicate with your Odoo instance.

## Prerequisites

1. **Odoo Instance**: You need access to an Odoo instance (cloud or on-premise)
2. **API Key**: Generate an API key from your Odoo user account
3. **CRM Module**: The CRM (Sales) module must be installed in Odoo

## Setup Instructions

### 1. Generate Odoo API Key

1. Log into your Odoo instance
2. Go to **Preferences** (or **My Profile**)
3. Open the **Account Security** tab
4. Click **New API Key**
5. Enter a description: "Reconstructor Website Integration"
6. Click **Generate Key**
7. **Copy the key immediately** (you won't be able to see it again!)

### 2. Configure Environment Variables

Update your `.env` file with your Odoo credentials:

```bash
# Odoo CRM Integration
VITE_CRM_API_KEY=your-api-key-here
VITE_ODOO_URL=https://your-instance.odoo.com
VITE_ODOO_DATABASE=your-database-name
VITE_ODOO_USERNAME=your.email@example.com
```

**Important**: 
- `VITE_ODOO_URL`: Your Odoo instance URL (e.g., `https://mycompany.odoo.com`)
- `VITE_ODOO_DATABASE`: Usually the same as your subdomain (e.g., `mycompany`)
- `VITE_ODOO_USERNAME`: Your Odoo login email
- `VITE_CRM_API_KEY`: The API key you generated in step 1

### 3. Integrate with LeadWizard

Update `src/components/LeadWizard.jsx` to use the Odoo API:

```javascript
import { createOdooClient } from '../services/odooApi';

function LeadWizard() {
  // ... existing code ...

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    // Generate calendar URLs
    const calendarUrls = generateCalendarUrls();

    try {
      // 1. Submit to Web3Forms (existing)
      const web3FormsData = {
        ...formData,
        calendar_google: calendarUrls.google,
        calendar_outlook: calendarUrls.outlook,
        calendar_ics: calendarUrls.ics,
      };

      await submit(web3FormsData);

      // 2. Create lead in Odoo CRM (new)
      const odooClient = createOdooClient();
      if (odooClient) {
        try {
          const leadId = await odooClient.createLead(formData);
          console.log('Lead created in Odoo with ID:', leadId);
        } catch (odooError) {
          console.error('Failed to create lead in Odoo:', odooError);
          // Don't block the user - form was still submitted to Web3Forms
        }
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        submit: t("form.errors.submit_failed")
      });
    }
  };

  // ... rest of the code ...
}
```

## API Methods

### `createLead(leadData)`

Creates a lead/opportunity in Odoo CRM.

**Parameters:**
- `leadData` (Object): Form data from the wizard

**Returns:**
- `leadId` (Number): The ID of the created lead in Odoo

**Example:**
```javascript
const odooClient = createOdooClient();
const leadId = await odooClient.createLead({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+46701234567',
  companyName: 'Acme Corp',
  orgNumber: '556677-8899',
  revenue: '10_to_30',
  appointmentDate: '2025-10-25',
  appointmentTime: '10:00',
  additionalNotes: 'Interested in reconstruction services'
});
```

### `createOrUpdateContact(contactData)`

Creates a new contact or updates an existing one in Odoo.

**Parameters:**
- `contactData` (Object): Contact information

**Returns:**
- `partnerId` (Number): The ID of the contact in Odoo

### `searchContact(email)`

Searches for an existing contact by email.

**Parameters:**
- `email` (String): Email address to search for

**Returns:**
- Contact object if found, `null` otherwise

### `getVersion()`

Tests the connection and returns Odoo version info.

**Returns:**
- Version information object

**Example:**
```javascript
const odooClient = createOdooClient();
const version = await odooClient.getVersion();
console.log('Odoo version:', version);
```

## Data Mapping

The following data is sent to Odoo when a lead is created:

| Form Field | Odoo Field | Notes |
|------------|------------|-------|
| firstName + lastName | `contact_name` | Contact person name |
| email | `email_from` | Contact email |
| phone | `phone` | Contact phone |
| companyName | `partner_name` | Company name |
| revenue | `x_studio_revenue_range` | Custom field (adjust as needed) |
| orgNumber | `x_studio_org_number` | Custom field (adjust as needed) |
| appointmentDate + appointmentTime | `description` | Included in notes |
| additionalNotes | `description` | Included in notes |

## Custom Fields

The integration assumes you have these custom fields in your Odoo CRM:

1. **x_studio_revenue_range** - Revenue range selection
2. **x_studio_org_number** - Organization number (text)

### Creating Custom Fields in Odoo

1. Go to **CRM** → **Configuration** → **Settings**
2. Enable **Developer Mode** (Settings → Activate Developer Mode)
3. Go to **CRM** → **Configuration** → **Leads/Opportunities**
4. Click **Edit** → **Add a field**
5. Create fields:
   - Name: `x_studio_revenue_range`, Type: Selection
   - Name: `x_studio_org_number`, Type: Char

**Note**: Adjust field names in `odooApi.js` if you use different names.

## Testing

### Test Connection

Create a test script to verify your Odoo connection:

```javascript
import { createOdooClient } from './src/services/odooApi';

async function testOdoo() {
  const client = createOdooClient();
  
  try {
    // Test authentication
    const uid = await client.authenticate();
    console.log('✓ Authentication successful, UID:', uid);
    
    // Test version
    const version = await client.getVersion();
    console.log('✓ Odoo version:', version);
    
    // Test creating a lead
    const leadId = await client.createLead({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+46701234567',
      companyName: 'Test Company',
      orgNumber: '123456-7890',
      revenue: '10_to_30',
      appointmentDate: '2025-10-25',
      appointmentTime: '10:00',
      additionalNotes: 'Test lead from website'
    });
    console.log('✓ Lead created with ID:', leadId);
    
  } catch (error) {
    console.error('✗ Error:', error);
  }
}

testOdoo();
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Verify your API key is correct
   - Check that the username matches your Odoo login
   - Ensure the database name is correct

2. **CORS Errors**
   - Odoo's XML-RPC endpoints should allow CORS by default
   - If you encounter CORS issues, you may need to use a backend proxy

3. **Field Not Found Errors**
   - Custom fields must exist in Odoo before you can write to them
   - Adjust field names in `odooApi.js` to match your Odoo setup

4. **Permission Errors**
   - Ensure your user has CRM access rights
   - Check that you can create leads manually in the Odoo interface

## Security Considerations

1. **API Key Storage**: API keys are stored in environment variables and never committed to git
2. **Client-Side Calls**: The current implementation makes calls from the browser. For production, consider:
   - Using a backend proxy to hide credentials
   - Implementing rate limiting
   - Adding request validation

3. **Error Handling**: The integration fails gracefully - if Odoo is unavailable, the form still submits via Web3Forms

## Alternative: Backend Proxy

For production environments, it's recommended to create a backend endpoint:

```javascript
// Backend endpoint (e.g., Netlify Function or Express.js)
export async function handler(event) {
  const leadData = JSON.parse(event.body);
  
  const odooClient = new OdooAPI({
    url: process.env.ODOO_URL,
    database: process.env.ODOO_DATABASE,
    username: process.env.ODOO_USERNAME,
    apiKey: process.env.CRM_API_KEY,
  });
  
  const leadId = await odooClient.createLead(leadData);
  
  return {
    statusCode: 200,
    body: JSON.stringify({ leadId })
  };
}
```

Then call it from the frontend:

```javascript
const response = await fetch('/.netlify/functions/create-odoo-lead', {
  method: 'POST',
  body: JSON.stringify(formData)
});
```

## Documentation References

- [Odoo External API Documentation](https://www.odoo.com/documentation/18.0/developer/reference/external_api.html)
- [XML-RPC Protocol](https://en.wikipedia.org/wiki/XML-RPC)
- [Odoo CRM Module](https://www.odoo.com/app/crm)

## Support

For issues specific to:
- **Odoo API**: Check [Odoo Community Forum](https://www.odoo.com/forum)
- **Integration Code**: Contact your development team
