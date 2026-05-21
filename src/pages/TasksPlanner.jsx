import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, FiEdit2, FiTrash2, FiCalendar, FiFlag, 
  FiClock, FiCheckCircle, FiCircle
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TasksPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [streak, setStreak] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('smart_tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      // Demo tasks
      const demoTasks = [
        { id: 1, title: 'Complete JavaScript Module', description: 'Finish the advanced JS course', priority: 'High', dueDate: '2024-01-20', status: 'pending', createdAt: new Date().toISOString() },
        { id: 2, title: 'Review React Hooks', description: 'Practice useState and useEffect', priority: 'Medium', dueDate: '2024-01-21', status: 'in-progress', createdAt: new Date().toISOString() },
        { id: 3, title: 'Submit Project', description: 'Finalize and submit the group project', priority: 'High', dueDate: '2024-01-22', status: 'pending', createdAt: new Date().toISOString() },
        { id: 4, title: 'Practice Coding', description: 'Solve 5 coding problems on LeetCode', priority: 'Low', dueDate: '2024-01-23', status: 'completed', createdAt: new Date().toISOString() },
      ];
      setTasks(demoTasks);
      localStorage.setItem('smart_tasks', JSON.stringify(demoTasks));
    }

    // Load streak
    const storedStreak = localStorage.getItem('study_streak');
    if (storedStreak) {
      setStreak(parseInt(storedStreak));
    } else {
      setStreak(3);
      localStorage.setItem('study_streak', '3');
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('smart_tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Handle drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) {
      // Reorder within same column
      const column = tasks.filter(t => t.status === source.droppableId);
      const [removed] = column.splice(source.index, 1);
      column.splice(destination.index, 0, removed);
      
      const otherTasks = tasks.filter(t => t.status !== source.droppableId);
      setTasks([...otherTasks, ...column]);
    } else {
      // Move to different column
      const task = tasks.find(t => t.id.toString() === draggableId);
      if (task) {
        updateTask(task.id, { status: destination.droppableId });
        toast.success(`Task moved to ${destination.droppableId}`);
        
        // Update streak for completed tasks
        if (destination.droppableId === 'completed') {
          const newStreak = streak + 1;
          setStreak(newStreak);
          localStorage.setItem('study_streak', newStreak.toString());
          toast.success(`🔥 Study streak: ${newStreak} days!`);
        }
      }
    }
  };

  // Add/Update task
  const handleSaveTask = () => {
    if (!title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    if (editingTask) {
      setTasks(tasks.map(task =>
        task.id === editingTask.id
          ? { ...task, title, description, priority, dueDate, status, updatedAt: new Date().toISOString() }
          : task
      ));
      toast.success('Task updated!');
    } else {
      const newTask = {
        id: Date.now(),
        title,
        description,
        priority,
        dueDate,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      setTasks([newTask, ...tasks]);
      toast.success('Task added!');
    }

    resetModal();
  };

  // Delete task
  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
      toast.success('Task deleted');
    }
  };

  // Update task
  const updateTask = (id, updates) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
    setStatus('pending');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      case 'Medium': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Low': return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const columns = [
    { id: 'pending', title: 'To Do', icon: FiCircle, color: 'gray' },
    { id: 'in-progress', title: 'In Progress', icon: FiClock, color: 'blue' },
    { id: 'completed', title: 'Completed', icon: FiCheckCircle, color: 'green' },
  ];

  // Calculate statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100) : 0,
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Tasks & Planner</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Organize your study schedule</p>
          </div>
          <button
            onClick={() => {
              resetModal();
              setIsModalOpen(true);
            }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-xl transition"
          >
            <FiPlus size={20} />
            Add Task
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 text-center shadow-lg text-white">
            <div className="text-2xl font-bold flex items-center justify-center gap-2">
              🔥 {streak}
            </div>
            <div className="text-sm opacity-90">Day Streak</div>
          </div>
        </div>

        {/* Productivity Score */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Productivity Score</span>
            <span className="text-sm font-bold text-purple-600">{stats.completionRate}%</span>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.completionRate}%` }}
              transition={{ duration: 1 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
            ></motion.div>
          </div>
        </div>

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map(column => {
              const ColumnIcon = column.icon;
              const columnTasks = tasks.filter(task => task.status === column.id);
              
              return (
                <div key={column.id} className="bg-gray-200 dark:bg-gray-700 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <ColumnIcon size={18} className={`text-${column.color}-500`} />
                      <h3 className="font-bold">{column.title}</h3>
                      <span className="text-xs bg-gray-300 dark:bg-gray-600 px-2 py-0.5 rounded-full">
                        {columnTasks.length}
                      </span>
                    </div>
                  </div>

                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`space-y-3 min-h-[400px] transition-all ${snapshot.isDraggingOver ? 'bg-gray-300 dark:bg-gray-600 rounded-lg' : ''}`}
                      >
                        {columnTasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-md transition-all ${snapshot.isDragging ? 'opacity-50' : ''}`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-semibold text-sm">{task.title}</h4>
                                  <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="text-gray-400 hover:text-red-500"
                                  >
                                    <FiTrash2 size={14} />
                                  </button>
                                </div>
                                {task.description && (
                                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{task.description}</p>
                                )}
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                                    <FiFlag size={10} className="inline mr-1" />
                                    {task.priority}
                                  </span>
                                  {task.dueDate && (
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                      <FiCalendar size={10} />
                                      {new Date(task.dueDate).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                                <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                                  <button
                                    onClick={() => {
                                      setEditingTask(task);
                                      setTitle(task.title);
                                      setDescription(task.description || '');
                                      setPriority(task.priority);
                                      setDueDate(task.dueDate || '');
                                      setStatus(task.status);
                                      setIsModalOpen(true);
                                    }}
                                    className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1"
                                  >
                                    <FiEdit2 size={12} /> Edit
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>

      {/* Modal for Add/Edit Task */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={resetModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold">{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
              </div>

              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-500 outline-none"
                />

                <textarea
                  placeholder="Description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-500 outline-none resize-none"
                />

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="pending">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                <button onClick={resetModal} className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                  Cancel
                </button>
                <button onClick={handleSaveTask} className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition">
                  {editingTask ? 'Update' : 'Add'} Task
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TasksPlanner;