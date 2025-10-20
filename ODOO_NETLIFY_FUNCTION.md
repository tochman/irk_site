# Odoo Integration with Netlify Functions

## 🎉 CORS Issue Solved!

The Odoo integration now uses a **Netlify serverless function** to proxy API calls, which:
- ✅ Solves CORS issues
- ✅ Keeps API credentials secure (server-side only)
- ✅ Works in both development and production

## 📁 Files Created

1. **`netlify/functions/odoo-create-lead.js`** - Serverless function that calls Odoo API
2. **`src/services/odooClient.js`** - Simple client that calls the Netlify function

## 🚀 Setup

### 1. Environment Variables

Your Netlify environment variables should be set (they're already in `.env`):

```bash
VITE_ODOO_URL=https://reconstructor.odoo.com
VITE_ODOO_DATABASE=reconstructor
VITE_ODOO_USERNAME=thomas@agileventures.org
VITE_ODOO_API_KEY=bbfc082706e95d3561824eee725b8a184c887606
```

### 2. Netlify Configuration

Make sure these environment variables are also set in your Netlify dashboard:
1. Go to: **Site settings** → **Environment variables**
2. Add the same variables as above

### 3. Testing Locally

To test the Netlify function locally, you need to use Netlify Dev:

```bash
# Install Netlify CLI globally (if not already installed)
npm install -g netlify-cli

# Run with Netlify Dev
netlify dev
```

This will:
- Start Vite dev server
- Start Netlify Functions locally
- Your function will be available at `http://localhost:8888/.netlify/functions/odoo-create-lead`

## 🧪 Testing

### In Production
Just submit the lead wizard form at https://reconstructor.se/leads

### In Development (with Netlify Dev)
```bash
netlify dev
# Visit http://localhost:8888/leads
```

### Manual API Test
```bash
curl -X POST http://localhost:8888/.netlify/functions/odoo-create-lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "+46701234567",
    "companyName": "Test Company AB",
    "orgNumber": "123456-7890",
    "revenue": "10_to_30",
    "appointmentDate": "2025-10-25",
    "appointmentTime": "14:00",
    "additionalNotes": "Test lead"
  }'
```

## 📊 How It Works

```
Browser (LeadWizard)
      ↓
POST /.netlify/functions/odoo-create-lead
      ↓
Netlify Function (Server-Side)
      ↓
1. Authenticate with Odoo
2. Create lead via XML-RPC
      ↓
Response with leadId
      ↓
Browser receives success
```

## 🔍 Debugging

### Check Function Logs (Production)
1. Go to Netlify dashboard
2. **Site** → **Functions** → **odoo-create-lead**
3. View logs

### Check Function Logs (Development)
Look at the terminal where `netlify dev` is running - you'll see console.log output from the function

### Common Issues

**"Function not found"**
- Make sure you're using `netlify dev` not just `yarn dev`
- Check that `netlify/functions/odoo-create-lead.js` exists

**"Odoo credentials not configured"**
- Add environment variables to Netlify dashboard
- For local dev, make sure `.env` is present

**"Authentication failed"**
- Verify API key is correct in Netlify environment variables
- Check username and database name

## 🔒 Security

✅ **Credentials are secure**
- API keys are only in environment variables (server-side)
- Never exposed to the browser
- Not in git (`.env` is gitignored)

✅ **No CORS issues**
- Browser calls your Netlify function (same origin)
- Function calls Odoo (server-to-server)

## 📝 Code Changes

The LeadWizard now uses the simpler client:

```javascript
// Old (direct API call - CORS issues)
const odooClient = createOdooClient();
const leadId = await odooClient.createLead(formData);

// New (via Netlify function - no CORS)
const { createOdooLead } = await import('../services/odooClient');
const result = await createOdooLead(formData);
console.log('Lead created:', result.leadId);
```

## 🚀 Deployment

Just push to GitHub - Netlify will automatically:
1. Deploy the site
2. Deploy the function
3. Use your environment variables

No additional configuration needed! 🎉

## 📚 More Info

- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Odoo External API](https://www.odoo.com/documentation/18.0/developer/reference/external_api.html)
