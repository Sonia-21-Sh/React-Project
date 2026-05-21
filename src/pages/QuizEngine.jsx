import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiClock, FiCheckCircle, FiXCircle, FiTrendingUp, 
  FiAward, FiRefreshCw, FiBarChart2, FiTarget, FiStar
} from 'react-icons/fi';
import toast from 'react-hot-toast';

// Quiz questions database
const questionBank = {
  'JavaScript': [
    {
      id: 1,
      question: 'What is a closure in JavaScript?',
      options: [
        'A function that has access to its outer function scope even after the outer function has returned',
        'A way to close a browser window',
        'A type of loop',
        'A JavaScript framework'
      ],
      correct: 0,
      explanation: 'A closure is a function that remembers its outer variables and can access them.'
    },
    {
      id: 2,
      question: 'What does "this" refer to in an arrow function?',
      options: [
        'The global object',
        'The function itself',
        'The lexical scope (parent scope)',
        'The object that called the function'
      ],
      correct: 2,
      explanation: 'Arrow functions do not have their own "this", they inherit from the parent scope.'
    },
    {
      id: 3,
      question: 'What is the output of "console.log(typeof null)"?',
      options: ['null', 'undefined', 'object', 'number'],
      correct: 2,
      explanation: 'This is a known bug in JavaScript. typeof null returns "object".'
    },
    {
      id: 4,
      question: 'What is the difference between "==" and "==="?',
      options: [
        'No difference',
        '"==" compares values, "===" compares values and types',
        '"==" compares types, "===" compares values',
        'Both are same'
      ],
      correct: 1,
      explanation: '"==" checks value equality with type coercion, "===" checks strict equality without type coercion.'
    },
    {
      id: 5,
      question: 'What is a Promise in JavaScript?',
      options: [
        'A callback function',
        'An object representing eventual completion of async operation',
        'A type of variable',
        'A loop structure'
      ],
      correct: 1,
      explanation: 'A Promise is an object representing the eventual completion or failure of an asynchronous operation.'
    },
  ],
  'React': [
    {
      id: 6,
      question: 'What is the purpose of useEffect in React?',
      options: [
        'To handle side effects in functional components',
        'To create state variables',
        'To render components',
        'To handle routing'
      ],
      correct: 0,
      explanation: 'useEffect allows you to perform side effects in function components.'
    },
    {
      id: 7,
      question: 'What is a hook in React?',
      options: [
        'A function that lets you use state and lifecycle features in functional components',
        'A way to debug React applications',
        'A CSS framework',
        'A build tool'
      ],
      correct: 0,
      explanation: 'Hooks are functions that let you "hook into" React state and lifecycle features.'
    },
    {
      id: 8,
      question: 'What is the virtual DOM?',
      options: [
        'A copy of the real DOM stored in memory',
        'A database',
        'A server-side rendering technique',
        'A CSS preprocessor'
      ],
      correct: 0,
      explanation: 'Virtual DOM is a lightweight copy of the real DOM that React uses for efficient updates.'
    },
    {
      id: 9,
      question: 'What is JSX?',
      options: [
        'JavaScript XML - a syntax extension for React',
        'A database query language',
        'A CSS framework',
        'A testing library'
      ],
      correct: 0,
      explanation: 'JSX is a syntax extension that allows you to write HTML-like code in JavaScript.'
    },
  ],
  'Python': [
    {
      id: 10,
      question: 'What is the output of print(2 ** 3)?',
      options: ['6', '8', '9', '5'],
      correct: 1,
      explanation: '** is the exponentiation operator. 2 to the power of 3 equals 8.'
    },
    {
      id: 11,
      question: 'What is a list comprehension in Python?',
      options: [
        'A way to create lists using a single line of code',
        'A way to read files',
        'A database connection method',
        'A debugging tool'
      ],
      correct: 0,
      explanation: 'List comprehension provides a concise way to create lists based on existing lists.'
    },
    {
      id: 12,
      question: 'What is the difference between list and tuple?',
      options: [
        'Lists are mutable, tuples are immutable',
        'Lists are immutable, tuples are mutable',
        'No difference',
        'Tuples are faster'
      ],
      correct: 0,
      explanation: 'Lists can be modified after creation, while tuples cannot be changed.'
    },
  ]
};

const QuizEngine = () => {
  const [selectedTopic, setSelectedTopic] = useState('JavaScript');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [dailyChallenge, setDailyChallenge] = useState(null);

  // Load leaderboard
  useEffect(() => {
    const stored = localStorage.getItem('quiz_leaderboard');
    if (stored) {
      setLeaderboard(JSON.parse(stored));
    } else {
      setLeaderboard([
        { name: 'Alex Johnson', score: 95, date: '2024-01-15' },
        { name: 'Maria Garcia', score: 92, date: '2024-01-16' },
        { name: 'John Smith', score: 88, date: '2024-01-14' },
        { name: 'Sarah Lee', score: 85, date: '2024-01-17' },
        { name: 'Mike Brown', score: 82, date: '2024-01-13' },
      ]);
    }
  }, []);

  // Daily challenge
  useEffect(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('daily_challenge');
    if (saved && JSON.parse(saved).date === today) {
      setDailyChallenge(JSON.parse(saved));
    } else {
      const newChallenge = {
        date: today,
        topic: 'JavaScript',
        completed: false,
      };
      localStorage.setItem('daily_challenge', JSON.stringify(newChallenge));
      setDailyChallenge(newChallenge);
    }
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizStarted && !quizCompleted) {
      completeQuiz(answers);
      toast.error('Time is up!');
    }
    return () => clearInterval(interval);
  }, [quizStarted, quizCompleted, timeLeft]);

  const startQuiz = () => {
    const topicQuestions = [...questionBank[selectedTopic]];
    const shuffled = topicQuestions.sort(() => Math.random() - 0.5);
    let selected = [];
    if (difficulty === 'Easy') {
      selected = shuffled.slice(0, 3);
    } else if (difficulty === 'Medium') {
      selected = shuffled.slice(0, 5);
    } else {
      selected = shuffled;
    }
    setQuestions(selected);
    setQuizStarted(true);
    setQuizCompleted(false);
    setAnswers([]);
    setCurrentIndex(0);
    setTimeLeft(difficulty === 'Easy' ? 45 : difficulty === 'Medium' ? 60 : 90);
    setScore(0);
    setShowExplanation(false);
    
    toast.success(`Starting ${difficulty} quiz on ${selectedTopic}!`);
  };

  const handleAnswer = (selectedIndex) => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedIndex === currentQuestion.correct;
    
    const newAnswers = [...answers, {
      questionId: currentQuestion.id,
      selected: selectedIndex,
      correct: isCorrect,
      explanation: currentQuestion.explanation,
      question: currentQuestion.question,
      correctAnswer: currentQuestion.options[currentQuestion.correct]
    }];
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
      toast.success('Correct! 🎉');
    } else {
      toast.error(`Wrong! ${currentQuestion.explanation}`);
    }
    
    setShowExplanation(true);
    
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setShowExplanation(false);
      } else {
        completeQuiz(newAnswers);
      }
    }, 2000);
  };

  const completeQuiz = (finalAnswers) => {
    const totalQuestions = questions.length;
    const correctCount = finalAnswers.filter(a => a.correct).length;
    const percentage = (correctCount / totalQuestions) * 100;
    
    setQuizCompleted(true);
    setScore(percentage);
    
    // Update leaderboard
    const newEntry = { name: 'You', score: percentage, date: new Date().toLocaleDateString() };
    const newLeaderboard = [...leaderboard, newEntry].sort((a, b) => b.score - a.score).slice(0, 5);
    setLeaderboard(newLeaderboard);
    localStorage.setItem('quiz_leaderboard', JSON.stringify(newLeaderboard));
    
    // Check daily challenge
    if (percentage >= 70 && dailyChallenge && !dailyChallenge.completed) {
      const updated = { ...dailyChallenge, completed: true };
      setDailyChallenge(updated);
      localStorage.setItem('daily_challenge', JSON.stringify(updated));
      toast.success('🎉 Daily challenge completed! +50 XP');
    }
    
    toast.success(`Quiz completed! Score: ${Math.round(percentage)}%`);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setQuestions([]);
    setAnswers([]);
    setCurrentIndex(0);
    setScore(0);
  };

  const topics = ['JavaScript', 'React', 'Python'];

  // Calculate weak topics
  const weakTopics = answers.filter(a => !a.correct).length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">Quiz Engine</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Test your knowledge with smart quizzes</p>
        </div>

        {!quizStarted ? (
          <div className="max-w-2xl mx-auto">
            {/* Setup Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-6">
              <h2 className="text-2xl font-bold mb-6">Quiz Setup</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Topic</label>
                  <div className="flex flex-wrap gap-3">
                    {topics.map(topic => (
                      <button
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        className={`px-6 py-2 rounded-lg transition ${
                          selectedTopic === topic 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                  <div className="flex flex-wrap gap-3">
                    {['Easy', 'Medium', 'Hard'].map(level => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`px-6 py-2 rounded-lg transition ${
                          difficulty === level 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={startQuiz}
                className="w-full mt-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Start Quiz
              </button>
            </div>

            {/* Daily Challenge Card */}
            {dailyChallenge && (
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <FiTarget /> Daily Challenge
                    </h3>
                    <p className="opacity-90 text-sm mt-1">Complete a quiz with 70%+ score</p>
                  </div>
                  {dailyChallenge.completed ? (
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm flex items-center gap-1">
                      <FiCheckCircle /> Completed
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">+50 XP</span>
                  )}
                </div>
              </div>
            )}

            {/* Leaderboard */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <FiAward className="text-yellow-500" /> Leaderboard
              </h3>
              <div className="space-y-2">
                {leaderboard.map((entry, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <div className="flex items-center gap-3">
                      <span className={`font-bold w-6 ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-orange-500' : ''}`}>
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                      </span>
                      <span>{entry.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-purple-600">{Math.round(entry.score)}%</span>
                      <span className="text-xs text-gray-500">{entry.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : quizCompleted ? (
          // Results Page
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl text-center">
              <div className="text-6xl mb-4">{score >= 70 ? '🎉' : '📚'}</div>
              <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Your score: {Math.round(score)}%</p>
              
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="3"
                    strokeDasharray={`${score}, 100`}
                  />
                  <text x="18" y="24" textAnchor="middle" fill="#8b5cf6" fontSize="8" fontWeight="bold">{Math.round(score)}%</text>
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-600">{answers.filter(a => a.correct).length}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-3">
                  <div className="text-2xl font-bold text-red-600">{answers.filter(a => !a.correct).length}</div>
                  <div className="text-sm text-gray-600">Wrong</div>
                </div>
              </div>

              {/* Weak Topics Detection */}
              {weakTopics > 0 && (
                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FiTrendingUp className="text-yellow-600" />
                    <span className="font-medium text-yellow-600">Weak Areas Detected</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You got {weakTopics} questions wrong. Focus on reviewing {selectedTopic} fundamentals!
                  </p>
                </div>
              )}

              <button
                onClick={resetQuiz}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition"
              >
                <FiRefreshCw /> Take Another Quiz
              </button>
            </div>

            {/* Review Mistakes */}
            {answers.filter(a => !a.correct).length > 0 && (
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <FiBarChart2 /> Review Your Mistakes
                </h3>
                {answers.filter(a => !a.correct).map((answer, idx) => (
                  <div key={idx} className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="font-medium mb-2">{answer.question}</p>
                    <p className="text-sm text-green-600">✅ Correct answer: {answer.correctAnswer}</p>
                    <p className="text-sm text-gray-500 mt-1">📖 {answer.explanation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Active Quiz
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl mb-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                    {selectedTopic}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                    {difficulty}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    Q{currentIndex + 1}/{questions.length}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-orange-500">
                  <FiClock />
                  <span className="font-bold">{timeLeft}s</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-6">{questions[currentIndex]?.question}</h3>
                  
                  <div className="space-y-3">
                    {questions[currentIndex]?.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => !showExplanation && handleAnswer(idx)}
                        disabled={showExplanation}
                        className="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition disabled:opacity-50"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-sm font-medium">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                    >
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        {answers[currentIndex]?.correct ? '✅ Correct!' : '❌ Incorrect'} - {questions[currentIndex]?.explanation}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Score Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FiStar className="text-yellow-500" />
                  <span>Score: {score}/{questions.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Keep going!</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizEngine;