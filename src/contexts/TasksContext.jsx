import React, { createContext, useContext, useState, useEffect } from 'react';

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within TasksProvider');
  }
  return context;
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [streak, setStreak] = useState(3);

  useEffect(() => {
    const storedTasks = localStorage.getItem('smart_tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      const demoTasks = [
        {
          id: 1,
          title: 'Complete JavaScript Module',
          description: 'Finish the advanced JS course and practice exercises',
          priority: 'High',
          dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: 'Review React Hooks',
          description: 'Practice useState, useEffect, and custom hooks',
          priority: 'Medium',
          dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
      ];
      setTasks(demoTasks);
      localStorage.setItem('smart_tasks', JSON.stringify(demoTasks));
    }

    const storedStreak = localStorage.getItem('study_streak');
    if (storedStreak) {
      setStreak(parseInt(storedStreak));
    } else {
      localStorage.setItem('study_streak', '3');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('smart_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateStreak = () => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    localStorage.setItem('study_streak', newStreak.toString());
    return newStreak;
  };

  const value = {
    tasks,
    streak,
    addTask,
    updateTask,
    deleteTask,
    updateStreak,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;