import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiAward, FiStar, FiZap, FiBookOpen, 
  FiCheckCircle, FiLock, FiTrendingUp, FiTarget
} from 'react-icons/fi';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [nextLevelXp, setNextLevelXp] = useState(1000);

  useEffect(() => {
    const allAchievements = [
      { id: 1, name: 'First Steps', description: 'Complete your first lesson', icon: FiBookOpen, xp: 50, unlocked: true, date: '2024-01-10' },
      { id: 2, name: 'Quiz Master', description: 'Score 90%+ on any quiz', icon: FiStar, xp: 100, unlocked: true, date: '2024-01-12' },
      { id: 3, name: 'Study Streak', description: 'Maintain a 7-day study streak', icon: FiZap, xp: 150, unlocked: true, date: '2024-01-15' },
      { id: 4, name: 'Note Taker', description: 'Create 10 study notes', icon: FiBookOpen, xp: 75, unlocked: false, progress: 7, total: 10 },
      { id: 5, name: 'AI Explorer', description: 'Use all AI tools', icon: FiTrendingUp, xp: 200, unlocked: false, progress: 2, total: 4 },
      { id: 6, name: 'Task Champion', description: 'Complete 50 tasks', icon: FiCheckCircle, xp: 250, unlocked: false, progress: 23, total: 50 },
      { id: 7, name: 'Perfect Week', description: 'Complete all daily challenges for a week', icon: FiTarget, xp: 300, unlocked: false, progress: 3, total: 7 },
      { id: 8, name: 'Master Student', description: 'Reach Level 10', icon: FiAward, xp: 500, unlocked: false, progress: 1, total: 10 },
    ];
    
    setAchievements(allAchievements);
    
    const earnedXp = allAchievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0);
    setXp(earnedXp);
    const newLevel = Math.floor(earnedXp / 500) + 1;
    setLevel(newLevel);
    setNextLevelXp(newLevel * 500);
  }, []);

  const xpProgress = (xp / nextLevelXp) * 100;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">Achievements</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your progress and earn rewards</p>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FiAward size={24} />
                <h2 className="text-2xl font-bold">Level {level}</h2>
              </div>
              <p className="opacity-90">{xp} / {nextLevelXp} XP to next level</p>
            </div>
            <div className="w-full md:w-64">
              <div className="overflow-hidden h-2 text-xs flex rounded-full bg-white/30">
                <div style={{ width: `${xpProgress}%` }} className="bg-white rounded-full"></div>
              </div>
              <p className="text-sm opacity-80 mt-1 text-center">{Math.round(xpProgress)}% Complete</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            const progress = achievement.progress ? (achievement.progress / achievement.total) * 100 : 0;
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg transition-all ${achievement.unlocked ? 'border-l-4 border-l-purple-600' : 'opacity-70'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${achievement.unlocked ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-300 dark:bg-gray-700'}`}>
                    <Icon className={`text-2xl ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{achievement.name}</h3>
                        <p className="text-sm text-gray-500">{achievement.description}</p>
                      </div>
                      {achievement.unlocked ? (
                        <span className="text-xs text-green-500 flex items-center gap-1">
                          <FiCheckCircle size={12} /> +{achievement.xp} XP
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">
                          <FiLock size={12} />
                        </span>
                      )}
                    </div>
                    
                    {!achievement.unlocked && achievement.progress !== undefined && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress} / {achievement.total}</span>
                        </div>
                        <div className="overflow-hidden h-1.5 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                          <div style={{ width: `${progress}%` }} className="bg-purple-600 rounded-full"></div>
                        </div>
                      </div>
                    )}
                    
                    {achievement.unlocked && achievement.date && (
                      <p className="text-xs text-gray-400 mt-2">Unlocked: {achievement.date}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiAward /> Badge Collection
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { name: 'Beginner', icon: '🌱', unlocked: true },
              { name: 'Explorer', icon: '🔍', unlocked: true },
              { name: 'Scholar', icon: '📚', unlocked: true },
              { name: 'Expert', icon: '🎓', unlocked: false },
              { name: 'Master', icon: '🏆', unlocked: false },
              { name: 'Legend', icon: '🌟', unlocked: false },
            ].map((badge, idx) => (
              <div key={idx} className={`text-center p-3 rounded-lg ${badge.unlocked ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-gray-50 dark:bg-gray-700 opacity-50'}`}>
                <div className="text-3xl mb-1">{badge.icon}</div>
                <p className="text-xs font-medium">{badge.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
