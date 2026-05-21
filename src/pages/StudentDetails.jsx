import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, FiMail, FiBookOpen, FiTrendingUp, FiCalendar, 
  FiCheckCircle, FiAward, FiBarChart2, FiClock, FiStar,
  FiMapPin, FiPhone, FiGlobe, FiBriefcase, FiUser
} from 'react-icons/fi';
import { useStudentDetails } from '../hooks/useStudents';
import LoadingSkeleton from '../components/LoadingSkeleton';

// Custom hook for animated counter
const useCounter = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!target && target !== 0) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  
  return count;
};

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { student, loading, error } = useStudentDetails(id);
  const [imageError, setImageError] = useState(false);
  
  const animatedProgress = useCounter(student?.progress || 0);
  const animatedAssignments = useCounter(student?.completedAssignments || 0);

  // Fallback avatar
  const fallbackAvatar = student ? `https://ui-avatars.com/api/?name=${student.name.replace(/ /g, '+')}&background=8b5cf6&color=fff&bold=true&size=256` : '';

  if (loading) return <LoadingSkeleton />;

  if (error || !student) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Student Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The student you're looking for doesn't exist.</p>
          <Link to="/students">
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Back to Students
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20"
    >
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate('/students')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 mb-6 transition"
        >
          <FiArrowLeft size={20} />
          Back to Students
        </motion.button>

        {/* Profile Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-32 relative">
            <div className="absolute -bottom-16 left-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="relative"
              >
                <img
                  src={imageError ? fallbackAvatar : student.avatar}
                  alt={student.name}
                  onError={() => setImageError(true)}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-gray-200 dark:bg-gray-700"
                />
                <div className={`absolute -bottom-1 right-2 w-4 h-4 rounded-full ${
                  student.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                } border-2 border-white`}></div>
              </motion.div>
            </div>
          </div>
          
          <div className="pt-20 pb-6 px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                  {student.name}
                </h1>
                <div className="flex items-center gap-2 mt-1 text-gray-500">
                  <FiMail size={14} />
                  <span>{student.email}</span>
                </div>
                {student.location && (
                  <div className="flex items-center gap-2 mt-1 text-gray-500">
                    <FiMapPin size={14} />
                    <span>{student.location}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full text-sm">
                  Active Student
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full text-sm">
                  ID: {student.id}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: FiBookOpen, label: 'Course', value: student.course?.split(' ').slice(0, 2).join(' ') || 'Course' },
            { icon: FiTrendingUp, label: 'Progress', value: `${animatedProgress}%` },
            { icon: FiCalendar, label: 'Enrolled', value: student.enrolledDate || 'Jan 2024' },
            { icon: FiCheckCircle, label: 'Assignments', value: `${animatedAssignments}/${student.totalAssignments || 25}` },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg text-center"
            >
              <stat.icon className="text-purple-600 text-2xl mx-auto mb-2" />
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Bio Section */}
        {student.bio && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8"
          >
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <FiUser size={20} /> About {student.name.split(' ')[0]}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{student.bio}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              {student.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiPhone size={14} />
                  <span>{student.phone}</span>
                </div>
              )}
              {student.location && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiMapPin size={14} />
                  <span>{student.location}</span>
                </div>
              )}
              {student.website && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiGlobe size={14} />
                  <span>{student.website}</span>
                </div>
              )}
              {student.company && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiBriefcase size={14} />
                  <span>{student.company}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Progress Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiBarChart2 /> Course Progress
          </h2>
          <div className="mb-2 flex justify-between text-sm">
            <span>Overall Completion</span>
            <span className="text-purple-600 font-semibold">{animatedProgress}%</span>
          </div>
          <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${student.progress || 0}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
            />
          </div>
        </motion.div>

        {/* Quiz Scores */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiAward /> Recent Quiz Scores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {student.quizScores?.map((score, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">{score}%</div>
                <div className="text-sm text-gray-500">Quiz {index + 1}</div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiClock /> Recent Activity
          </h2>
          <div className="space-y-3">
            {student.recentActivity?.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  {activity.type === 'course' ? <FiBookOpen size={14} className="text-purple-600" /> : 
                   activity.type === 'quiz' ? <FiStar size={14} className="text-yellow-500" /> :
                   <FiCheckCircle size={14} className="text-green-500" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StudentDetails;