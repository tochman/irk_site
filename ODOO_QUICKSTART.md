# 🚀 Odoo Integration - Quick Start

## ✅ What's Done

Your lead wizard is now integrated with Odoo CRM!

### Configuration
- ✅ `.env` updated with Odoo credentials
- ✅ API client created (`src/services/odooApi.js`)
- ✅ LeadWizard integrated with Odoo
- ✅ Test scripts provided

## 🧪 Testing Your Integration

### Option 1: Submit the Form (Easiest)
1. Start dev server: `npm run dev`
2. Go to: `http://localhost:5174/leads`
3. Fill out the wizard
4. Submit the form
5. Check browser console for: `✓ Lead created in Odoo with ID: XXX`
6. Check your Odoo CRM dashboard for the new lead

### Option 2: Browser Console Test
1. Start dev server: `npm run dev`
2. Go to: `http://localhost:5174/leads`
3. Open browser console (F12)
4. Copy/paste contents of `test-odoo-browser.js`
5. Press Enter
6. Watch the test results in console

### Option 3: Check Connection Only
Open browser console and run:
```javascript
const { createOdooClient } = await import('./src/services/odooApi.js');
const client = createOdooClient();
const version = await client.getVersion();
console.log('Odoo version:', version);
```

## 📊 What Happens When Form is Submitted

```
User fills wizard
      ↓
Clicks Submit
      ↓
┌─────────────────────┐
│ Web3Forms Email     │ ✓ Email sent
└─────────────────────┘
      ↓
┌─────────────────────┐
│ Odoo Authentication │ ✓ Gets user ID
└─────────────────────┘
      ↓
┌─────────────────────┐
│ Create Lead in CRM  │ ✓ Lead created
└─────────────────────┘
      ↓
Success Message Shown
```

## 🔍 What to Check in Odoo

After submitting a lead, check your Odoo:

1. **Go to:** CRM → Leads/Opportunities
2. **Look for:** Company name + Person name (e.g., "Test AB - John Doe")
3. **Check fields:**
   - Contact Name
   - Email
   - Phone
   - Company Name
   - Description (contains appointment info)

## 📝 Lead Data Mapping

| Wizard Field | → | Odoo Field |
|--------------|---|------------|
| First + Last Name | → | `contact_name` |
| Email | → | `email_from` |
| Phone | → | `phone` |
| Company Name | → | `partner_name` |
| All details | → | `description` |

## 🐛 Troubleshooting

### "Odoo client not configured"
**Check:** All environment variables are set in `.env`

### "Authentication failed"
**Check:** 
- API key is correct (regenerate if needed)
- Username matches your Odoo login email
- Database name is correct

### "Network error"
**Check:**
- Odoo URL is accessible: `https://reconstructor.odoo.com`
- You're not behind a firewall blocking Odoo

### Lead created but missing fields
**Solution:** Create custom fields in Odoo (see ODOO_INTEGRATION.md)

## 📋 Console Messages

### Success:
```
✓ Lead form submitted successfully to Web3Forms
Creating lead in Odoo CRM...
✓ Lead created in Odoo with ID: 123
```

### Partial Success (Email sent, Odoo failed):
```
✓ Lead form submitted successfully to Web3Forms
✗ Failed to create lead in Odoo: [error message]
```

### Configuration Issue:
```
Odoo client not configured - skipping CRM integration
```

## 🔒 Security Notes

- ✅ API keys are in `.env` (not committed to git)
- ✅ `.env` is in `.gitignore`
- ⚠️ API calls happen from browser (credentials visible in network tab)
- 💡 For production: Consider backend proxy (see ODOO_INTEGRATION.md)

## 📚 Full Documentation

- **Complete Guide:** `ODOO_INTEGRATION.md`
- **Implementation Details:** `ODOO_IMPLEMENTATION_SUMMARY.md`
- **API Code:** `src/services/odooApi.js`

## ✨ Next Steps

1. **Test the integration** (use any method above)
2. **Verify lead appears in Odoo**
3. **Customize field mapping** if needed (edit `odooApi.js`)
4. **Add custom fields in Odoo** (optional - see docs)
5. **Deploy to production** 🚀

## 🆘 Need Help?

Check the full documentation in `ODOO_INTEGRATION.md` for:
- Custom field setup
- Advanced configuration
- Backend proxy setup
- API reference
- Detailed troubleshooting

---

**Your Odoo Credentials:**
- URL: `https://reconstructor.odoo.com`
- Database: `reconstructor`
- Username: `thomas@agileventures.org`
- API Key: ✓ Configured in `.env`
