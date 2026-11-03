// SMS Configuration for OTP Service
export interface SMSConfig {
  provider: 'textlocal' | 'twilio' | 'msg91' | 'mock';
  apiKey: string;
  senderId: string;
  enabled: boolean;
}

// Default configuration - change these values for production
export const smsConfig: SMSConfig = {
  provider: 'mock', // Change to 'textlocal', 'twilio', or 'msg91' for real SMS
  apiKey: 'YOUR_API_KEY_HERE',
  senderId: 'CROP2C',
  enabled: false // Set to true when you have a real SMS service configured
};

// Quick enable for testing - uncomment and add your API key
// export const smsConfig: SMSConfig = {
//   provider: 'textlocal',
//   apiKey: 'YOUR_TEXTLOCAL_API_KEY',
//   senderId: 'CROP2C',
//   enabled: true
// };

// TextLocal Configuration (Indian SMS service)
export const textLocalConfig = {
  apiUrl: 'https://api.textlocal.in/send/',
  apiKey: 'YOUR_TEXTLOCAL_API_KEY', // Get from https://www.textlocal.in/
  sender: 'CROP2C'
};

// Twilio Configuration (International SMS service)
export const twilioConfig = {
  accountSid: 'YOUR_TWILIO_ACCOUNT_SID',
  authToken: 'YOUR_TWILIO_AUTH_TOKEN',
  fromNumber: '+1234567890' // Your Twilio phone number
};

// MSG91 Configuration (Indian SMS service)
export const msg91Config = {
  apiUrl: 'https://api.msg91.com/api/v5/otp',
  authKey: 'YOUR_MSG91_AUTH_KEY',
  templateId: 'YOUR_TEMPLATE_ID',
  sender: 'CROP2C'
};

// Instructions for setting up real SMS:
export const setupInstructions = {
  textlocal: {
    steps: [
      '1. Go to https://www.textlocal.in/',
      '2. Sign up for a free account',
      '3. Get your API key from the dashboard',
      '4. Replace YOUR_TEXTLOCAL_API_KEY in the config',
      '5. Set provider to "textlocal" and enabled to true'
    ],
    cost: '₹0.20 per SMS',
    freeCredits: '100 free SMS credits'
  },
  twilio: {
    steps: [
      '1. Go to https://www.twilio.com/',
      '2. Sign up for a free account',
      '3. Get your Account SID and Auth Token',
      '4. Buy a phone number',
      '5. Replace the config values and set provider to "twilio"'
    ],
    cost: '$0.0075 per SMS',
    freeCredits: '$15 free credits'
  },
  msg91: {
    steps: [
      '1. Go to https://www.msg91.com/',
      '2. Sign up for a free account',
      '3. Get your Auth Key and create a template',
      '4. Replace the config values and set provider to "msg91"'
    ],
    cost: '₹0.20 per SMS',
    freeCredits: '100 free SMS credits'
  }
};
