import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const { sendPasswordResetOTP, verifyResetOTP, resetPassword } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    
    setLoading(true);
    const result = await sendPasswordResetOTP(email);
    
    if (result.success) {
      toast.success('OTP sent to your email!');
      setStep(2);
      setTimer(60);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      toast.error(result.error || 'Failed to send OTP');
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error('Please enter valid 6-digit OTP');
      return;
    }
    
    setLoading(true);
    const result = await verifyResetOTP(otp);
    
    if (result.success) {
      toast.success('OTP verified!');
      setStep(3);
    } else {
      toast.error(result.error || 'Invalid OTP');
    }
    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!validatePassword(newPassword)) {
      toast.error('Password must contain 8+ chars, uppercase, lowercase, number & special character');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setLoading(true);
    const result = await resetPassword(email, newPassword);
    
    if (result.success) {
      toast.success('Password reset successful! Please login.');
      navigate('/login');
    } else {
      toast.error(result.error || 'Failed to reset password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 mb-6"
        >
          <FiArrowLeft size={18} />
          Back to Login
        </button>

        {step === 1 && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text">Forgot Password?</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Enter your email to receive a verification code
              </p>
            </div>
            
            <form onSubmit={handleSendOTP}>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </motion.button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text">Verify OTP</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Enter the 6-digit code sent to {email}
              </p>
            </div>
            
            <form onSubmit={handleVerifyOTP}>
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input-field text-center text-2xl tracking-widest"
                placeholder="000000"
                required
              />
              
              {timer > 0 && (
                <p className="text-center text-sm text-gray-500 mt-2">
                  Resend available in {timer}s
                </p>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </motion.button>
            </form>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              Demo OTP: <span className="font-mono">123456</span> (Check console)
            </p>
          </>
        )}

        {step === 3 && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text">Reset Password</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Create a new strong password
              </p>
            </div>
            
            <form onSubmit={handleResetPassword}>
              <div className="relative mb-4">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="New password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;