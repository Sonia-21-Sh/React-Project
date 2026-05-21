import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { 
  FiTrendingUp, FiBarChart2, FiPieChart, FiActivity, 
  FiCalendar, FiTarget, FiAward, FiClock
} from 'react-icons/fi';

const ProgressAnalytics = () => {
  const [timeRange, setTimeRange] = useState('weekly');
  const [studyData, setStudyData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [weeklyGoal, setWeeklyGoal] = useState(20);
  const [weeklyHours, setWeeklyHours] = useState(14.5);

  useEffect(() => {
    // Load study data
    const weeklyData = [
      { day: 'Mon', hours: 2.5, quizScore: 75, tasksCompleted: 3 },
      { day: 'Tue', hours: 3.0, quizScore: 82, tasksCompleted: 4 },
      { day: 'Wed', hours: 2.0, quizScore: 78, tasksCompleted: 2 },
      { day: 'Thu', hours: 3.5, quizScore: 88, tasksCompleted: 5 },
      { day: 'Fri', hours: 2.0, quizScore: 85, tasksCompleted: 3 },
      { day: 'Sat', hours: 1.5, quizScore: 90, tasksCompleted: 2 },
      { day: 'Sun', hours: 0, quizScore: 0, tasksCompleted: 0 },
    ];
    
    const monthlyData = [
      { week: 'Week 1', hours: 12, quizScore: 72, tasksCompleted: 18 },
      { week: 'Week 2', hours: 15, quizScore: 78, tasksCompleted: 22 },
      { week: 'Week 3', hours: 14, quizScore: 82, tasksCompleted: 20 },
      { week: 'Week 4', hours: 18, quizScore: 88, tasksCompleted: 25 },
    ];
    
    setStudyData(timeRange === 'weekly' ? weeklyData : monthlyData);
    
    // Subject performance data
    setSubjectData([
      { subject: 'JavaScript', score: 85, hours: 42, color: '#fbbf24' },
      { subject: 'React', score: 78, hours: 38, color: '#60a5fa' },
      { subject: 'Python', score: 72, hours: 35, color: '#34d399' },
      { subject: '3D Graphics', score: 65, hours: 28, color: '#a78bfa' },
      { subject: 'AI/ML', score: 70, hours: 32, color: '#f472b6' },
    ]);
  }, [timeRange]);

  const radarData = subjectData.map(s => ({
    subject: s.subject,
    score: s.score,
    fullMark: 100,
  }));

  const goalProgress = (weeklyHours / weeklyGoal) * 100;

  const pieData = [
    { name: 'Completed', value: 65, color: '#8b5cf6' },
    { name: 'In Progress', value: 25, color: '#f59e0b' },
    { name: 'Not Started', value: 10, color: '#ef4444' },
  ];

  const productivityData = [
    { name: 'Mon', productivity: 85 },
    { name: 'Tue', productivity: 90 },
    { name: 'Wed', productivity: 75 },
    { name: 'Thu', productivity: 92 },
    { name: 'Fri', productivity: 80 },
    { name: 'Sat', productivity: 70 },
    { name: 'Sun', productivity: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Progress Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track your learning journey</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeRange('weekly')}
              className={`px-4 py-2 rounded-lg transition ${timeRange === 'weekly' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeRange('monthly')}
              className={`px-4 py-2 rounded-lg transition ${timeRange === 'monthly' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <FiClock className="text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{weeklyHours}</div>
                <div className="text-xs text-gray-500">Total Hours</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <FiAward className="text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">78%</div>
                <div className="text-xs text-gray-500">Avg Score</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FiTarget className="text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">15</div>
                <div className="text-xs text-gray-500">Day Streak</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">+12%</div>
                <div className="text-xs text-gray-500">Improvement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Study Time Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FiBarChart2 /> Study Time
              </h3>
              <select className="text-sm bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1">
                <option>Hours</option>
                <option>Minutes</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={studyData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey={timeRange === 'weekly' ? 'day' : 'week'} stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Area type="monotone" dataKey="hours" stroke="#8b5cf6" fill="url(#colorHours)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quiz Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <FiTrendingUp /> Quiz Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={studyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey={timeRange === 'weekly' ? 'day' : 'week'} stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Line type="monotone" dataKey="quizScore" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Subject Performance Radar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <FiPieChart /> Subject Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
                <PolarRadiusAxis stroke="#6b7280" />
                <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Course Completion */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <FiPieChart /> Course Completion
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
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
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FiTarget /> Weekly Goal: {weeklyGoal} hours
            </h3>
            <span className="text-sm text-gray-500">{weeklyHours} hours completed</span>
          </div>
          <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(goalProgress, 100)}%` }}
              transition={{ duration: 1 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
            ></motion.div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {goalProgress >= 100 ? '🎉 Goal achieved! Great job!' : `📚 ${weeklyGoal - weeklyHours} hours more to reach your goal`}
          </p>
        </div>

        {/* Productivity Heatmap */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <FiActivity /> Productivity Score
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productivityData}>
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
              <Bar dataKey="productivity" fill="#8b5cf6" radius={[8, 8, 0, 0]}>
                {productivityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.productivity >= 85 ? '#34d399' : entry.productivity >= 70 ? '#fbbf24' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm">Excellent (85%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-sm">Good (70-84%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-sm">Needs Improvement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalytics;