# SMS Setup Guide for Crop2Cart OTP

This guide will help you set up real SMS delivery for OTP verification in the Crop2Cart application.

## Current Status
- ✅ OTP generation and verification working
- ✅ Console display of OTPs for testing
- ⚠️ Real SMS delivery disabled (mock mode)

## Quick Setup (Recommended: TextLocal)

### Step 1: Get TextLocal Account
1. Go to [https://www.textlocal.in/](https://www.textlocal.in/)
2. Sign up for a free account
3. Verify your email and mobile number
4. You'll get 100 free SMS credits

### Step 2: Get API Key
1. Login to your TextLocal dashboard
2. Go to "API" section
3. Copy your API key
4. Note your sender ID (or create one like "CROP2C")

### Step 3: Update Configuration
1. Open `src/config/smsConfig.ts`
2. Update the configuration:

```typescript
export const smsConfig: SMSConfig = {
  provider: 'textlocal', // Change from 'mock' to 'textlocal'
  apiKey: 'YOUR_ACTUAL_API_KEY_HERE', // Paste your API key
  senderId: 'CROP2C', // Your sender ID
  enabled: true // Change from false to true
};

export const textLocalConfig = {
  apiUrl: 'https://api.textlocal.in/send/',
  apiKey: 'YOUR_ACTUAL_API_KEY_HERE', // Same API key
  sender: 'CROP2C' // Your sender ID
};
```

### Step 4: Test
1. Restart your development server
2. Try logging in with a real mobile number
3. Check your phone for the OTP SMS

## Alternative SMS Services

### Twilio (International)
- **Cost**: $0.0075 per SMS
- **Free Credits**: $15
- **Setup**: [https://www.twilio.com/](https://www.twilio.com/)

### MSG91 (Indian)
- **Cost**: ₹0.20 per SMS
- **Free Credits**: 100 SMS
- **Setup**: [https://www.msg91.com/](https://www.msg91.com/)

## Configuration Options

### For TextLocal:
```typescript
provider: 'textlocal',
apiKey: 'your_textlocal_api_key',
senderId: 'CROP2C',
enabled: true
```

### For Twilio:
```typescript
provider: 'twilio',
apiKey: 'your_twilio_auth_token',
senderId: '+1234567890',
enabled: true
```

### For MSG91:
```typescript
provider: 'msg91',
apiKey: 'your_msg91_auth_key',
senderId: 'CROP2C',
enabled: true
```

## Testing Without SMS Service

If you want to test without setting up SMS:
1. Keep `provider: 'mock'` and `enabled: false`
2. OTPs will be displayed in browser console
3. Use the console OTP for verification

## Troubleshooting

### OTP Not Received
1. Check if SMS service is enabled
2. Verify API key is correct
3. Check mobile number format (10 digits)
4. Check SMS service dashboard for delivery status

### API Errors
1. Check API key validity
2. Verify sender ID is approved
3. Check account balance/credits
4. Review error messages in console

### Development Mode
- OTPs are always shown in console for testing
- Real SMS is sent only when `enabled: true`
- Mock mode works without any API setup

## Security Notes

⚠️ **Important**: 
- Never commit real API keys to version control
- Use environment variables for production
- Keep API keys secure and rotate them regularly
- Monitor SMS usage and costs

## Production Deployment

For production:
1. Use environment variables for API keys
2. Set up proper error monitoring
3. Implement rate limiting
4. Monitor SMS delivery rates
5. Set up backup SMS providers

## Support

If you need help:
1. Check the SMS service provider documentation
2. Review error messages in browser console
3. Test with different mobile numbers
4. Verify account status with SMS provider


