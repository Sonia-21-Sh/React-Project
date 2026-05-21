import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiTrendingUp, FiUsers, FiBookOpen, FiAward } from 'react-icons/fi';
import { useStudents } from '../hooks/useStudents';
import StudentCard from '../components/StudentCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

const Students = () => {
  const {
    students,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCourse,
    setSelectedCourse,
    sortBy,
    setSortBy,
    courses,
  } = useStudents();

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Stats
  const totalStudents = students.length;
  const avgProgress = Math.round(students.reduce((sum, s) => sum + s.progress, 0) / totalStudents) || 0;
  const completedCourses = students.filter(s => s.progress >= 90).length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">Enrolled Students</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and track your student's progress</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <FiUsers className="text-purple-600 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <div className="text-sm text-gray-500">Total Students</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <FiTrendingUp className="text-green-600 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold">{avgProgress}%</div>
              <div className="text-sm text-gray-500">Average Progress</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
              <FiAward className="text-yellow-600 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold">{completedCourses}</div>
              <div className="text-sm text-gray-500">Near Completion</div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
              />
            </div>

            {/* Course Filter */}
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="pl-10 pr-8 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-500 appearance-none cursor-pointer"
              >
                {courses.map(course => (
                  <option key={course} value={course}>
                    {course === 'all' ? 'All Courses' : course}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-500 cursor-pointer"
            >
              <option value="name">Sort by Name</option>
              <option value="progress">Sort by Progress</option>
              <option value="course">Sort by Course</option>
            </select>
          </div>
        </motion.div>

        {/* Students Grid */}
        {students.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No students found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student, index) => (
              <StudentCard key={student.id} student={student} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;