import React, { createContext, useContext, useState, useEffect } from 'react';

const AchievementsContext = createContext();

export const useAchievements = () => {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error('useAchievements must be used within AchievementsProvider');
  }
  return context;
};

export const AchievementsProvider = ({ children }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('unlocked_achievements');
    if (stored) {
      setUnlockedAchievements(JSON.parse(stored));
    }
  }, []);

  const unlockAchievement = (achievementId) => {
    if (!unlockedAchievements.includes(achievementId)) {
      const updated = [...unlockedAchievements, achievementId];
      setUnlockedAchievements(updated);
      localStorage.setItem('unlocked_achievements', JSON.stringify(updated));
      return true;
    }
    return false;
  };

  const isAchievementUnlocked = (achievementId) => {
    return unlockedAchievements.includes(achievementId);
  };

  const value = {
    unlockedAchievements,
    unlockAchievement,
    isAchievementUnlocked,
  };

  return (
    <AchievementsContext.Provider value={value}>
      {children}
    </AchievementsContext.Provider>
  );
};

export default AchievementsProvider;