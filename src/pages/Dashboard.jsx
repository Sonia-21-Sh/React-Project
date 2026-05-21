import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import { 
  FiHome, FiFileText, FiCpu, FiHelpCircle, FiCheckSquare, 
  FiActivity, FiSettings, FiBarChart2, FiBookOpen, FiAward,
  FiStar, FiTrendingUp, FiCalendar, FiClock
} from 'react-icons/fi';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();

  // Data for charts
  const progressData = [
    { name: 'Week 1', score: 65, completed: 45 },
    { name: 'Week 2', score: 72, completed: 58 },
    { name: 'Week 3', score: 78, completed: 72 },
    { name: 'Week 4', score: 85, completed: 85 },
    { name: 'Week 5', score: 88, completed: 92 },
    { name: 'Week 6', score: 92, completed: 95 },
  ];

  const categoryData = [
    { name: 'Completed', value: 65, color: '#8b5cf6' },
    { name: 'In Progress', value: 25, color: '#f59e0b' },
    { name: 'Not Started', value: 10, color: '#ef4444' },
  ];

  const skillData = [
    { name: 'JavaScript', progress: 85, color: '#fbbf24' },
    { name: 'React', progress: 75, color: '#60a5fa' },
    { name: 'Python', progress: 60, color: '#34d399' },
    { name: '3D Graphics', progress: 45, color: '#a78bfa' },
    { name: 'AI/ML', progress: 55, color: '#f472b6' },
  ];

  const recentActivities = [
    { id: 1, title: 'Completed JavaScript Module', time: '2 hours ago', type: 'course', icon: FiBookOpen },
    { id: 2, title: 'Scored 95% in React Quiz', time: 'Yesterday', type: 'quiz', icon: FiHelpCircle },
    { id: 3, title: 'Started 3D Graphics Course', time: '2 days ago', type: 'course', icon: FiBookOpen },
    { id: 4, title: 'Earned AI Basics Certificate', time: '3 days ago', type: 'certificate', icon: FiAward },
    { id: 5, title: 'Completed Daily Challenge', time: '4 days ago', type: 'task', icon: FiCheckSquare },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Complete React 3D module', priority: 'High', due: 'Today', date: '2024-01-20' },
    { id: 2, task: 'Review AI fundamentals', priority: 'Medium', due: 'Tomorrow', date: '2024-01-21' },
    { id: 3, task: 'Submit group project', priority: 'High', due: '2 days', date: '2024-01-22' },
    { id: 4, task: 'Practice coding challenge', priority: 'Low', due: '3 days', date: '2024-01-23' },
  ];

  const certificates = [
    { name: 'JavaScript Advanced', date: 'Jan 15, 2024', score: '92%' },
    { name: 'React Professional', date: 'Dec 20, 2023', score: '88%' },
    { name: 'Python Basics', date: 'Nov 10, 2023', score: '95%' },
  ];

  // Overview Dashboard Component
  const DashboardOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome back, {user?.name || 'Learner'}! 👋
        </h1>
        <p className="text-purple-100 text-sm md:text-base">
          Keep pushing forward! You're doing great on your learning journey.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xs">
                {i === 1 ? '🎯' : i === 2 ? '📚' : '🏆'}
              </div>
            ))}
          </div>
          <span className="text-xs text-purple-200">+15% progress this week</span>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { title: 'Courses Completed', value: '8', icon: FiBookOpen, change: '+2', color: 'from-blue-500 to-cyan-500' },
          { title: 'Hours Learned', value: '127', icon: FiClock, change: '+12', color: 'from-green-500 to-emerald-500' },
          { title: 'Quiz Score Avg', value: '88%', icon: FiStar, change: '+5%', color: 'from-orange-500 to-red-500' },
          { title: 'Streak Days', value: '15', icon: FiCalendar, change: '+3', color: 'from-purple-500 to-pink-500' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="text-white text-xl" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
              <span className="text-xs text-green-500 mt-2 inline-block">{stat.change} from last month</span>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Learning Progress</h3>
            <select className="text-sm bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1">
              <option>Last 6 Weeks</option>
              <option>Last 3 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={progressData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Area type="monotone" dataKey="score" stroke="#8b5cf6" fill="url(#colorScore)" strokeWidth={3} />
              <Line type="monotone" dataKey="completed" stroke="#ec4899" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Progress Score</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</span>
            </div>
          </div>
        </motion.div>

        {/* Course Completion Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-bold mb-4">Course Completion Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Skills Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Skills Progress</h3>
          <button className="text-purple-600 text-sm hover:text-purple-700">View All →</button>
        </div>
        <div className="space-y-4">
          {skillData.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{skill.name}</span>
                <span className="text-gray-500">{skill.progress}%</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="rounded-full"
                  style={{ backgroundColor: skill.color }}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity & Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Recent Activity</h3>
            <FiTrendingUp className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'course' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                    activity.type === 'quiz' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                    activity.type === 'certificate' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                    'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                  }`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.type === 'course' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'quiz' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Upcoming Tasks</h3>
            <FiCheckSquare className="text-gray-400" />
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{task.task}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Due: {task.due}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.priority === 'High' ? 'bg-red-100 text-red-600' :
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition">
            + Add New Task
          </button>
        </motion.div>
      </div>

      {/* Certificates Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Recent Certificates</h3>
          <FiAward className="text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certificates.map((cert, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiAward className="text-white text-xl" />
              </div>
              <h4 className="font-bold text-sm">{cert.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
              <p className="text-xs text-purple-600 mt-1">Score: {cert.score}</p>
              <button className="mt-3 text-xs text-purple-600 hover:text-purple-700">Download →</button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  // My Notes Component
  const MyNotes = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Notes</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">+ New Note</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((note) => (
          <motion.div
            key={note}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg">JavaScript Fundamentals</h3>
              <button className="text-gray-400 hover:text-gray-600">...</button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
              Notes about closures, promises, async/await, and event loop in JavaScript...
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Last edited: 2 days ago</span>
              <button className="text-purple-600 hover:text-purple-700 text-sm">Edit →</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // AI Tools Component
  const AITools = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">AI Learning Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <FiCpu className="text-4xl mb-4" />
          <h3 className="text-xl font-bold mb-2">AI Tutor</h3>
          <p className="mb-4 opacity-90">Get personalized explanations and answers to your questions 24/7</p>
          <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition">Start Chat →</button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
          <FiBarChart2 className="text-4xl mb-4" />
          <h3 className="text-xl font-bold mb-2">Smart Recommendations</h3>
          <p className="mb-4 opacity-90">AI-powered course recommendations based on your progress and interests</p>
          <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition">View →</button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
          <FiHelpCircle className="text-4xl mb-4" />
          <h3 className="text-xl font-bold mb-2">Quiz Generator</h3>
          <p className="mb-4 opacity-90">AI generates custom quizzes based on your learning material</p>
          <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition">Generate →</button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white">
          <FiTrendingUp className="text-4xl mb-4" />
          <h3 className="text-xl font-bold mb-2">Progress Predictor</h3>
          <p className="mb-4 opacity-90">AI predicts your learning trajectory and suggests improvements</p>
          <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition">Analyze →</button>
        </motion.div>
      </div>
    </div>
  );

  // Quiz Component
  const Quiz = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Daily Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'JavaScript Challenge', questions: 10, time: '15 min', difficulty: 'Medium', color: 'from-yellow-500 to-orange-500' },
          { title: 'React Fundamentals', questions: 15, time: '20 min', difficulty: 'Hard', color: 'from-blue-500 to-cyan-500' },
          { title: 'Python Basics', questions: 8, time: '10 min', difficulty: 'Easy', color: 'from-green-500 to-emerald-500' },
          { title: '3D Graphics', questions: 12, time: '18 min', difficulty: 'Hard', color: 'from-purple-500 to-pink-500' },
        ].map((quiz, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className={`bg-gradient-to-r ${quiz.color} rounded-xl p-6 text-white shadow-lg`}
          >
            <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
            <div className="flex gap-4 mb-4 text-sm opacity-90">
              <span>📝 {quiz.questions} questions</span>
              <span>⏱️ {quiz.time}</span>
              <span>⭐ {quiz.difficulty}</span>
            </div>
            <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition">Start Quiz →</button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Tasks Component
  const Tasks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Tasks</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">+ Add Task</button>
      </div>
      <div className="space-y-3">
        {[
          { task: 'Complete React 3D module', priority: 'High', due: 'Today', description: 'Finish the remaining 3 lessons' },
          { task: 'Review AI fundamentals', priority: 'Medium', due: 'Tomorrow', description: 'Watch the AI basics video series' },
          { task: 'Submit group project', priority: 'High', due: '2 days', description: 'Finalize and submit the project' },
          { task: 'Practice coding challenge', priority: 'Low', due: '3 days', description: 'Solve 5 coding problems' },
          { task: 'Update profile', priority: 'Low', due: '5 days', description: 'Add skills and achievements' },
        ].map((task, index) => (
          <motion.div
            key={index}
            whileHover={{ x: 5 }}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 flex-1">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-purple-600" />
              <div>
                <p className="font-medium">{task.task}</p>
                <p className="text-xs text-gray-500">{task.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">Due: {task.due}</span>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                task.priority === 'High' ? 'bg-red-100 text-red-600' :
                task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'
              }`}>
                {task.priority}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Progress Component
  const Progress = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Learning Progress</h2>
      
      {/* Overall Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Overall Progress</h3>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-purple-600">65% Complete</span>
            </div>
            <div>
              <span className="text-xs font-semibold inline-block text-purple-600">85/130 hours</span>
            </div>
          </div>
          <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-purple-200">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ duration: 1 }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-600 to-pink-600"
            ></motion.div>
          </div>
        </div>
        
        <div className="space-y-4 mt-6">
          {[
            { subject: 'JavaScript', progress: 85, hours: 42 },
            { subject: 'React', progress: 75, hours: 38 },
            { subject: '3D Graphics', progress: 45, hours: 22 },
            { subject: 'AI/ML', progress: 55, hours: 28 },
            { subject: 'Python', progress: 60, hours: 30 },
          ].map((item, index) => (
            <div key={item.subject}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{item.subject}</span>
                <span className="text-gray-500">{item.progress}% ({item.hours} hrs)</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Weekly Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Bar dataKey="score" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="completed" fill="#ec4899" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  // Settings Component
  const Settings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="space-y-6">
          {/* Profile Settings */}
          <div>
            <h3 className="text-lg font-bold mb-4">Profile Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input type="text" defaultValue={user?.name || ''} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" defaultValue={user?.email || ''} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input type="tel" placeholder="+1 234 567 8900" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input type="text" placeholder="City, Country" className="input-field" />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-bold mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span>Email Notifications</span>
                <input type="checkbox" defaultChecked className="toggle-switch" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>Push Notifications</span>
                <input type="checkbox" defaultChecked className="toggle-switch" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>Weekly Progress Reports</span>
                <input type="checkbox" className="toggle-switch" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>Quiz Reminders</span>
                <input type="checkbox" defaultChecked className="toggle-switch" />
              </label>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-bold mb-4">Privacy & Security</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span>Make Profile Public</span>
                <input type="checkbox" className="toggle-switch" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>Show Learning Progress</span>
                <input type="checkbox" defaultChecked className="toggle-switch" />
              </label>
              <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition">
                Change Password
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition">
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      
      {/* Main Content */}
      <div className="transition-all duration-300">
        <div className="p-4 md:p-8 pt-24">
          <Routes>
            <Route path="" element={<DashboardOverview />} />
            <Route path="notes" element={<MyNotes />} />
            <Route path="ai-tools" element={<AITools />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="progress" element={<Progress />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;