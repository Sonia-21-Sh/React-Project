import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Generate random OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Signup - sends OTP
  const signup = async (userData) => {
    try {
      // Demo ke liye fixed OTP 123456 use karo
      const otp = "123456";
      const pendingUser = {
        ...userData,
        otp,
        otpExpiry: Date.now() + 300000 // 5 minutes expiry
      };
      localStorage.setItem('pendingUser', JSON.stringify(pendingUser));
      
      // Popup mein OTP dikhao
      alert(`📧 Your OTP is: ${otp}\n\nUse this OTP to verify your email.`);
      console.log(`📧 OTP for ${userData.email}: ${otp}`);
      
      return { success: true, message: 'OTP sent to your email' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Verify OTP
  const verifyOTP = async (otp) => {
    try {
      const pendingUser = JSON.parse(localStorage.getItem('pendingUser'));
      
      if (!pendingUser) {
        return { success: false, error: 'No pending registration found. Please sign up first.' };
      }
      
      if (Date.now() > pendingUser.otpExpiry) {
        localStorage.removeItem('pendingUser');
        return { success: false, error: 'OTP has expired. Please sign up again.' };
      }
      
      if (pendingUser.otp !== otp) {
        return { success: false, error: 'Invalid OTP. Please try again.' };
      }
      
      const { otp: _, otpExpiry: __, ...userWithoutOTP } = pendingUser;
      const newUser = { 
        ...userWithoutOTP, 
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.removeItem('pendingUser');
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Resend OTP
  const resendOTP = async () => {
    try {
      const pendingUser = JSON.parse(localStorage.getItem('pendingUser'));
      if (!pendingUser) {
        return { success: false, error: 'No pending registration' };
      }
      
      const newOTP = "123456"; // Fixed OTP for demo
      pendingUser.otp = newOTP;
      pendingUser.otpExpiry = Date.now() + 300000;
      localStorage.setItem('pendingUser', JSON.stringify(pendingUser));
      
      alert(`📧 New OTP is: ${newOTP}`);
      console.log(`📧 New OTP for ${pendingUser.email}: ${newOTP}`);
      return { success: true, message: 'New OTP sent' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      // Check if user exists in localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === email) {
          setUser(user);
          return { success: true };
        }
      }
      
      // Demo login for testing - ANY email/password works
      if (email && password) {
        const demoUser = { email, name: email.split('@')[0], id: Date.now() };
        setUser(demoUser);
        localStorage.setItem('user', JSON.stringify(demoUser));
        return { success: true };
      }
      
      return { success: false, error: 'Invalid email or password' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Forgot password - send OTP
  const sendPasswordResetOTP = async (email) => {
    try {
      const otp = "123456";
      const resetData = { email, otp, otpExpiry: Date.now() + 300000 };
      localStorage.setItem('passwordReset', JSON.stringify(resetData));
      alert(`📧 Password Reset OTP is: ${otp}`);
      console.log(`🔐 Password reset OTP for ${email}: ${otp}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Verify password reset OTP
  const verifyResetOTP = async (otp) => {
    try {
      const resetData = JSON.parse(localStorage.getItem('passwordReset'));
      if (!resetData) {
        return { success: false, error: 'No reset request found' };
      }
      
      if (Date.now() > resetData.otpExpiry) {
        localStorage.removeItem('passwordReset');
        return { success: false, error: 'OTP has expired' };
      }
      
      if (resetData.otp !== otp) {
        return { success: false, error: 'Invalid OTP' };
      }
      
      return { success: true, email: resetData.email };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Reset password
  const resetPassword = async (email, newPassword) => {
    try {
      localStorage.removeItem('passwordReset');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    signup,
    verifyOTP,
    resendOTP,
    login,
    logout,
    sendPasswordResetOTP,
    verifyResetOTP,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};