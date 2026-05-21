import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  FiUser, FiMail, FiCalendar, FiAward, FiBookOpen, 
  FiTrendingUp, FiEdit2, FiSave, FiCamera
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Student User',
    email: user?.email || 'student@example.com',
    bio: 'Passionate learner exploring AI and web development.',
    location: 'San Francisco, CA',
    education: 'Computer Science Student',
  });

  const stats = [
    { label: 'Courses Completed', value: '8', icon: FiBookOpen, color: 'purple' },
    { label: 'Total Hours', value: '127', icon: FiTrendingUp, color: 'blue' },
    { label: 'Achievements', value: '12', icon: FiAward, color: 'green' },
    { label: 'Member Since', value: 'Jan 2024', icon: FiCalendar, color: 'orange' },
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
    // In real app, save to backend
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600 relative">
            <button className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur rounded-lg text-white hover:bg-white/30 transition">
              <FiCamera size={18} />
            </button>
          </div>
          
          {/* Profile Info */}
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-6 gap-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-3xl text-white">
                  {formData.name[0]}
                </div>
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-2xl font-bold bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none"
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{formData.name}</h2>
                )}
                <p className="text-gray-500">Student • Level 4</p>
              </div>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
              >
                {isEditing ? <FiSave size={16} /> : <FiEdit2 size={16} />}
                {isEditing ? 'Save' : 'Edit Profile'}
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                      <Icon size={12} /> {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Details Form */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <FiMail className="text-gray-400" />
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="flex-1 bg-transparent focus:outline-none"
                  />
                ) : (
                  <span>{formData.email}</span>
                )}
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <FiUser className="text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="flex-1 bg-transparent focus:outline-none"
                  />
                ) : (
                  <span>{formData.bio}</span>
                )}
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <FiCalendar className="text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="flex-1 bg-transparent focus:outline-none"
                  />
                ) : (
                  <span>{formData.location}</span>
                )}
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <FiAward className="text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="flex-1 bg-transparent focus:outline-none"
                  />
                ) : (
                  <span>{formData.education}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'Completed JavaScript Quiz', score: '92%', date: '2 hours ago', icon: '📝' },
              { action: 'Earned "Quiz Master" Badge', date: 'Yesterday', icon: '🏆' },
              { action: 'Started React Course', progress: '45%', date: '3 days ago', icon: '📚' },
              { action: 'Created 5 Study Notes', date: '5 days ago', icon: '✏️' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  {activity.score && <p className="text-sm text-green-600">Score: {activity.score}</p>}
                  {activity.progress && <p className="text-sm text-purple-600">Progress: {activity.progress}</p>}
                </div>
                <span className="text-xs text-gray-500">{activity.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;