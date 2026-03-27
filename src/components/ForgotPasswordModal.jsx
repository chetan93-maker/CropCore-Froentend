import { useState, useEffect } from 'react';
import { X, Phone, Lock, ArrowLeft, Send, Mail, CheckCircle } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOTP = async () => {
    if (!mobile || mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      // Check if mobile exists and get email
      const checkResponse = await api.get(`/farmers/check-mobile/${mobile}`);
      
      if (!checkResponse.data.exists) {
        toast.error('Mobile number not registered');
        setLoading(false);
        return;
      }

      // Store email for display
      setUserEmail(checkResponse.data.email || 'your registered email');

      // Send OTP via backend (will be emailed)
      const response = await api.post('/api/otp/send', { mobile });
      
      toast.success(
        <div>
          <p className="font-semibold">✅ OTP Sent Successfully!</p>
          <p className="text-sm mt-1">Check your email: <span className="font-mono">{checkResponse.data.email}</span></p>
          <p className="text-xs text-gray-500 mt-2">(OTP valid for 5 minutes)</p>
        </div>,
        { duration: 8000 }
      );
      
      setStep(2);
      setTimer(60); // 60 seconds timer for resend
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/otp/verify', {
        mobile,
        otp
      });

      if (response.data.verified) {
        toast.success('OTP verified successfully');
        setStep(3);
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) return;
    
    setLoading(true);
    try {
      await api.post('/api/otp/send', { mobile });
      toast.success('New OTP sent to your email');
      setTimer(60);
    } catch (error) {
      toast.error('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Please enter both password fields');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await api.post('/farmers/reset-password', {
        mobile,
        newPassword
      });
      
      toast.success('Password reset successfully! Please login.');
      handleClose();
    } catch (error) {
      toast.error('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setMobile('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setUserEmail('');
    setTimer(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={handleClose}>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

        <div 
          className="relative bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>1</div>
              <div className={`w-12 h-1 ${step >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>2</div>
              <div className={`w-12 h-1 ${step >= 3 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>3</div>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
              {step === 1 && <Phone className="w-8 h-8 text-green-600" />}
              {step === 2 && <Mail className="w-8 h-8 text-green-600" />}
              {step === 3 && <Lock className="w-8 h-8 text-green-600" />}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {step === 1 && 'Reset Password'}
              {step === 2 && 'Check Your Email'}
              {step === 3 && 'Create New Password'}
            </h2>
            <p className="text-gray-600 mt-2">
              {step === 1 && 'Enter your registered mobile number'}
              {step === 2 && `We've sent an OTP to ${userEmail}`}
              {step === 3 && 'Enter your new password'}
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    maxLength="10"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  We'll send an OTP to your registered email
                </p>
              </div>

              <button
                onClick={handleSendOTP}
                disabled={loading || mobile.length !== 10}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-700 break-all">{userEmail}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="6-digit OTP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-center text-2xl tracking-widest"
                  maxLength="6"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <button
                  onClick={handleResendOTP}
                  disabled={timer > 0}
                  className={`${timer > 0 ? 'text-gray-400' : 'text-green-600 hover:text-green-700'}`}
                >
                  Resend OTP {timer > 0 && `(${timer}s)`}
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-600 hover:text-gray-800 flex items-center"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Change Number
                </button>
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-yellow-700">
                  Password must be at least 6 characters long.
                </p>
              </div>

              <button
                onClick={handleResetPassword}
                disabled={loading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;