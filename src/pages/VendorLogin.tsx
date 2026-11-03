import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Phone, Eye, EyeOff, FileText, RefreshCw } from 'lucide-react';
import { Vendor } from '../types';
import otpService from '../utils/otpService';
import databaseService from '../utils/databaseService';

interface VendorLoginProps {
  setUser: (user: Vendor | null) => void;
}

const VendorLogin = ({ setUser }: VendorLoginProps) => {
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    gstNumber: ''
  });
  const [step, setStep] = useState<'phone' | 'otp' | 'gst'>('phone');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOtpMessage('');
    
    try {
      const response = await otpService.sendOTP(formData.phone);
      if (response.success) {
        setOtpSent(true);
        setStep('otp');
        setOtpMessage(response.message);
        // Show OTP in console for development
        if (response.otp) {
          console.log(`🔐 OTP for ${formData.phone}: ${response.otp}`);
        }
      } else {
        setOtpMessage(response.message);
      }
    } catch (error) {
      setOtpMessage('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOtpMessage('');
    
    try {
      const response = await otpService.verifyOTP(formData.phone, formData.otp);
      if (response.success && response.verified) {
        setStep('gst');
        setOtpMessage('');
      } else {
        setOtpMessage(response.message);
      }
    } catch (error) {
      setOtpMessage('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setOtpMessage('');
    
    try {
      const response = await otpService.resendOTP(formData.phone);
      if (response.success) {
        setOtpMessage(response.message);
        // Show OTP in console for development
        if (response.otp) {
          console.log(`🔐 New OTP for ${formData.phone}: ${response.otp}`);
        }
      } else {
        setOtpMessage(response.message);
      }
    } catch (error) {
      setOtpMessage('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGSTLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Authenticate user with database
    setTimeout(() => {
      const user = databaseService.authenticateUser(formData.phone);
      
      if (user && user.role === 'vendor') {
        setUser(user as Vendor);
        navigate('/vendor/dashboard');
      } else {
        setOtpMessage('User not found. Please check your mobile number.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
         style={{
           backgroundImage: `linear-gradient(rgba(232, 245, 232, 0.1), rgba(240, 248, 240, 0.1)), url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundAttachment: 'fixed'
         }}>
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-primary hover:text-accent mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="bg-secondary p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Building2 className="h-8 w-8 text-gray-800" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Vendor Login
          </h2>
          <p className="text-gray-600">
            {step === 'phone' && 'Enter your mobile number to get started'}
            {step === 'otp' && 'Enter the OTP sent to your mobile'}
            {step === 'gst' && 'Verify with your GST number'}
          </p>
        </div>

        <div className="card">
          {otpMessage && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              otpMessage.includes('success') || otpMessage.includes('sent') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {otpMessage}
            </div>
          )}

          {step === 'phone' && (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    className="input-field pl-10"
                    maxLength={10}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Enter 10-digit mobile number</p>
              </div>

              <button
                type="submit"
                disabled={loading || formData.phone.length !== 10}
                className="w-full btn-secondary text-lg py-3 disabled:opacity-50"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  OTP Code
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={formData.otp}
                  onChange={handleInputChange}
                  placeholder="Enter 6-digit OTP"
                  className="input-field text-center text-lg tracking-widest"
                  maxLength={6}
                />
                <p className="text-sm text-gray-500 mt-2">
                  OTP sent to +91 {formData.phone}
                </p>
                <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700">
                    💡 <strong>Testing Mode:</strong> Enter any 6-digit number (e.g., 123456) to proceed
                  </p>
                </div>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-sm text-primary hover:text-accent flex items-center"
                  >
                    <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                    Resend OTP
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="flex-1 btn-outline"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || formData.otp.length !== 6}
                  className="flex-1 btn-secondary disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </form>
          )}

          {step === 'gst' && (
            <form onSubmit={handleGSTLogin} className="space-y-6">
              <div>
                <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  GST Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="gstNumber"
                    name="gstNumber"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    placeholder="Enter 15-digit GST number"
                    className="input-field pl-10 pr-10"
                    maxLength={15}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Your GST number is encrypted and secure
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep('otp')}
                  className="flex-1 btn-outline"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-secondary"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          )}
        </div>


        {/* Business Benefits */}
        <div className="card bg-blue-50 border-blue-200">
          <h3 className="text-sm font-medium text-blue-800 mb-3">Why Join as a Vendor?</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Access to verified farmers and quality crops</li>
            <li>• Competitive pricing and transparent transactions</li>
            <li>• Secure payment processing and dispute resolution</li>
            <li>• Build long-term relationships with farmers</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
