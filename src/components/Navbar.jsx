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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo with hover animation */}
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl md:text-3xl font-bold cursor-pointer"
              >
                <span className="gradient-text">3D Learn</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={`relative cursor-pointer transition-colors duration-300 ${
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold shadow-lg group-hover:shadow-xl transition">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {user.name || user.email?.split('@')[0]}
                    </span>
                  </motion.button>
                  
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl py-2 z-50 border border-gray-100 dark:border-gray-700"
                    >
                      <Link to="/dashboard">
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="w-full px-4 py-2.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 transition"
                        >
                          <FiUser size={16} />
                          <span>Dashboard</span>
                        </motion.button>
                      </Link>
                      <Link to="/profile">
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="w-full px-4 py-2.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 transition"
                        >
                          <FiUser size={16} />
                          <span>My Profile</span>
                        </motion.button>
                      </Link>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={handleLogout}
                        className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-3 transition"
                      >
                        <FiLogOut size={16} />
                        <span>Logout</span>
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 rounded-xl text-purple-600 border border-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium"
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(139, 92, 246, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </div>
              )}
              
              {/* Dark Mode Toggle with Animation */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300 hover:shadow-md"
              >
                {darkMode ? <FiSun className="text-yellow-400" size={20} /> : <FiMoon className="text-gray-700" size={20} />}
              </motion.button>
            </div>

            {/* Mobile Menu Button with Animation */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-gray-200 dark:bg-gray-700 transition-all"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Menu with Slide Animation */}
          <motion.div
            initial={false}
            animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-4 pb-3 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <motion.div
                    whileHover={{ x: 10 }}
                    className={`py-3 px-4 rounded-xl transition-all ${
                      location.pathname === link.path
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {link.name}
                  </motion.div>
                </Link>
              ))}
              {!user && (
                <>
                  <Link to="/login">
                    <div className="py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                      Login
                    </div>
                  </Link>
                  <Link to="/signup">
                    <div className="py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center font-medium">
                      Sign Up
                    </div>
                  </Link>
                </>
              )}
              {user && (
                <>
                  <Link to="/dashboard">
                    <div className="py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                      Dashboard
                    </div>
                  </Link>
                  <Link to="/profile">
                    <div className="py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                      My Profile
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 px-4 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-left transition"
                  >
                    Logout
                  </button>
                </>
              )}
              <button
                onClick={toggleDarkMode}
                className="w-full py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center gap-2 transition"
              >
                {darkMode ? <FiSun /> : <FiMoon />}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.nav>
      
      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;