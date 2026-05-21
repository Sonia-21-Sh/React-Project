import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return context;
};

export const QuizProvider = ({ children }) => {
  const [quizHistory, setQuizHistory] = useState([]);
  const [leaderboard, setLeaderboard] = useState([
    { name: 'Alex Johnson', score: 95, date: '2024-01-15' },
    { name: 'Maria Garcia', score: 92, date: '2024-01-16' },
    { name: 'John Smith', score: 88, date: '2024-01-14' },
  ]);

  const saveQuizResult = (result) => {
    const newResult = { ...result, date: new Date().toLocaleDateString() };
    const updatedHistory = [newResult, ...quizHistory];
    setQuizHistory(updatedHistory);
    localStorage.setItem('quiz_history', JSON.stringify(updatedHistory));

    const newLeaderboard = [...leaderboard, { name: 'You', score: result.score, date: new Date().toLocaleDateString() }]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setLeaderboard(newLeaderboard);
    localStorage.setItem('quiz_leaderboard', JSON.stringify(newLeaderboard));
  };

  const value = {
    quizHistory,
    leaderboard,
    saveQuizResult,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;