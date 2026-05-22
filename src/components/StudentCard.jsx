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

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${student.name.replace(/ /g, '+')}&background=8b5cf6&color=fff&bold=true&size=128`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 relative"
    >
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${getStatusColor(student.status)} animate-pulse`}></div>
          <span className="text-[10px] sm:text-xs text-white">{getStatusText(student.status)}</span>
        </div>
      </div>

      <div className="p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="relative">
            <img
              src={imageError ? fallbackAvatar : student.avatar}
              alt={student.name}
              onError={() => setImageError(true)}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 sm:border-3 border-purple-500 shadow-lg bg-gray-200 dark:bg-gray-700"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 sm:p-1 ring-2 ring-white dark:ring-gray-800">
              <FiCheckCircle size={10} className="text-white" />
            </div>
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-800 dark:text-white group-hover:text-purple-600 transition truncate">
              {student.name}
            </h3>
            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
              <FiMail size={12} className="flex-shrink-0" />
              <span className="truncate">{student.email}</span>
            </div>
          </div>
        </div>

        <div className="mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1 sm:mb-2">
            <FiBookOpen size={14} className="text-purple-500 flex-shrink-0" />
            <span className="font-medium truncate">{student.course}</span>
          </div>
        </div>

        <div className="mb-3 sm:mb-4">
          <div className="flex justify-between text-[10px] sm:text-xs mb-1">
            <span className="text-gray-500">Progress</span>
            <span className="text-purple-600 font-semibold">{student.progress}%</span>
          </div>
          <div className="overflow-hidden h-1.5 sm:h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${student.progress}%` }}
              transition={{ delay: 0.3, duration: 1 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
            />
          </div>
        </div>

        <Link to={`/students/${student.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2"
          >
            View Details
            <FiTrendingUp size={12} className="group-hover:translate-x-1 transition" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default StudentCard;