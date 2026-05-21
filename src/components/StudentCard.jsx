import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMail, FiBookOpen, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

const StudentCard = ({ student, index }) => {
  const [imageError, setImageError] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'studying': return 'bg-blue-500';
      case 'in-class': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online';
      case 'studying': return 'Studying';
      case 'in-class': return 'In Class';
      default: return 'Offline';
    }
  };

  // Fallback avatar if image fails to load
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${student.name.replace(/ /g, '+')}&background=8b5cf6&color=fff&bold=true&size=128`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 relative"
    >
      {/* Status Indicator */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(student.status)} animate-pulse`}></div>
          <span className="text-xs text-white">{getStatusText(student.status)}</span>
        </div>
      </div>

      <div className="p-6">
        {/* Profile Section with Image */}
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative group/image"
          >
            <img
              src={imageError ? fallbackAvatar : student.avatar}
              alt={student.name}
              onError={() => setImageError(true)}
              className="w-16 h-16 rounded-full object-cover border-3 border-purple-500 shadow-lg bg-gray-200 dark:bg-gray-700"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 ring-2 ring-white dark:ring-gray-800">
              <FiCheckCircle size={12} className="text-white" />
            </div>
          </motion.div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white group-hover:text-purple-600 transition line-clamp-1">
              {student.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <FiMail size={14} />
              <span className="truncate">{student.email}</span>
            </div>
          </div>
        </div>

        {/* Course Info */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
            <FiBookOpen size={16} className="text-purple-500" />
            <span className="font-medium line-clamp-1">{student.course}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Progress</span>
            <span className="text-purple-600 font-semibold">{student.progress}%</span>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${student.progress}%` }}
              transition={{ delay: 0.3, duration: 1 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
            />
          </div>
        </div>

        {/* View Details Button */}
        <Link to={`/students/${student.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            View Details
            <FiTrendingUp size={16} className="group-hover:translate-x-1 transition" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default StudentCard;