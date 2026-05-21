import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiArrowUp, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer ref={ref} className="bg-gray-900 text-white mt-20">
      <motion.div
        variants={footerVariants}
        initial="hidden"
        animate={controls}
        className="container mx-auto px-4 md:px-6 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold gradient-text mb-4">3D Learn</h3>
            <p className="text-gray-400 leading-relaxed">
              Empowering learners with AI-driven 3D interactive education platform. 
              Learn better, faster, and smarter with our cutting-edge technology.
            </p>
            <div className="flex space-x-4 mt-6">
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition bg-gray-800 p-2 rounded-full"
              >
                <FiGithub size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition bg-gray-800 p-2 rounded-full"
              >
                <FiTwitter size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition bg-gray-800 p-2 rounded-full"
              >
                <FiLinkedin size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                href="mailto:support@3dlearn.com"
                className="text-gray-400 hover:text-white transition bg-gray-800 p-2 rounded-full"
              >
                <FiMail size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition flex items-center space-x-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-500 transition-all"></span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white transition flex items-center space-x-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-500 transition-all"></span>
                  <span>Features</span>
                </Link>
              </li>
              <li>
                <Link to="/students" className="text-gray-400 hover:text-white transition flex items-center space-x-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-500 transition-all"></span>
                  <span>Students</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition flex items-center space-x-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-500 transition-all"></span>
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition flex items-center space-x-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-500 transition-all"></span>
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/help" className="hover:text-white transition">Help Center</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center space-x-3">
                <FiMail className="text-purple-500" />
                <span>support@3dlearn.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="text-purple-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMapPin className="text-purple-500" />
                <span>123 Tech Street, Silicon Valley, CA</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © 2024 3D Learn. All rights reserved. | Made with ❤️ for education
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="mt-4 md:mt-0 p-3 rounded-full bg-purple-600 hover:bg-purple-700 transition shadow-lg"
          >
            <FiArrowUp size={20} />
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;