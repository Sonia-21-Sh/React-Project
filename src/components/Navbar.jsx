import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Students', path: '/students' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-2'
            : 'bg-transparent py-3'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="z-50">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xl sm:text-2xl md:text-3xl font-bold cursor-pointer"
              >
                <span className="gradient-text">3D Learn</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={`relative cursor-pointer transition-colors duration-300 text-sm lg:text-base ${
                      location.pathname === link.path
                        ? 'text-purple-600 dark:text-purple-400 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                    }`}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.span>
                </Link>
              ))}
              
              {user ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none group"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold shadow-lg group-hover:shadow-xl transition text-sm">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm hidden sm:inline-block">
                      {user.name || user.email?.split('@')[0]}
                    </span>
                  </motion.button>
                  
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl py-2 z-50 border border-gray-100 dark:border-gray-700"
                    >
                      <Link to="/dashboard">
                        <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 transition text-sm">
                          <FiUser size={16} />
                          <span>Dashboard</span>
                        </button>
                      </Link>
                      <Link to="/profile">
                        <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 transition text-sm">
                          <FiUser size={16} />
                          <span>My Profile</span>
                        </button>
                      </Link>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-3 transition text-sm"
                      >
                        <FiLogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-1.5 rounded-xl text-purple-600 border border-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium text-sm"
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(139, 92, 246, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-all duration-300 text-sm"
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </div>
              )}
              
              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300 hover:shadow-md"
              >
                {darkMode ? <FiSun className="text-yellow-400" size={16} /> : <FiMoon className="text-gray-700" size={16} />}
              </motion.button>
            </div>

            {/* Mobile Menu Button - 3 lines */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-gray-200 dark:bg-gray-700 transition-all z-50"
            >
              {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </motion.button>
          </div>

          {/* Mobile Menu - Slide from top */}
          <motion.div
            initial={false}
            animate={{ 
              height: mobileMenuOpen ? 'auto' : 0,
              opacity: mobileMenuOpen ? 1 : 0,
              visibility: mobileMenuOpen ? 'visible' : 'hidden'
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 rounded-2xl mt-3 shadow-xl"
          >
            <div className="py-3 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <motion.div
                    whileHover={{ x: 10 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-3 px-4 mx-2 rounded-xl transition-all ${
                      location.pathname === link.path
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {link.name}
                  </motion.div>
                </Link>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-700 my-2 mx-2"></div>
              {!user ? (
                <div className="space-y-2 px-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <div className="py-2.5 px-4 rounded-xl border border-purple-600 text-purple-600 text-center font-medium">
                      Login
                    </div>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <div className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center font-medium">
                      Sign Up
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="space-y-1 px-2">
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <div className="py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                      Dashboard
                    </div>
                  </Link>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <div className="py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                      My Profile
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 px-4 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-left transition"
                  >
                    Logout
                  </button>
                </div>
              )}
              <div className="border-t border-gray-200 dark:border-gray-700 my-2 mx-2"></div>
              <button
                onClick={toggleDarkMode}
                className="w-full py-3 px-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-between transition mx-2"
              >
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                {darkMode ? <FiSun /> : <FiMoon />}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.nav>
      
      {/* Spacer for fixed navbar - Prevents content overlap */}
      <div className="h-16 sm:h-16 md:h-16"></div>
    </>
  );
};

export default Navbar;