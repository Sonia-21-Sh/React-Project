import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiCalendar, FiClock, FiPlus, FiChevronLeft, 
  FiChevronRight, FiCheckCircle, FiCircle
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const CalendarSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, title: 'JavaScript Lecture', date: '2024-01-20', time: '10:00 AM', type: 'class', completed: false },
    { id: 2, title: 'Quiz: React Basics', date: '2024-01-21', time: '2:00 PM', type: 'quiz', completed: false },
    { id: 3, title: 'Submit Assignment', date: '2024-01-22', time: '11:59 PM', type: 'deadline', completed: false },
    { id: 4, title: 'Study Group Meeting', date: '2024-01-23', time: '3:00 PM', type: 'meeting', completed: false },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', type: 'class' });

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setEvents([...events, { ...newEvent, id: Date.now(), completed: false }]);
    setShowModal(false);
    setNewEvent({ title: '', date: '', time: '', type: 'class' });
    toast.success('Event added to calendar!');
  };

  const toggleEventComplete = (id) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, completed: !event.completed } : event
    ));
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getEventColor = (type) => {
    switch(type) {
      case 'class': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30';
      case 'quiz': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30';
      case 'deadline': return 'bg-red-100 text-red-600 dark:bg-red-900/30';
      case 'meeting': return 'bg-green-100 text-green-600 dark:bg-green-900/30';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const todayEvents = events.filter(e => e.date === new Date().toISOString().split('T')[0]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Calendar & Schedule</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Plan your study sessions</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-xl transition"
          >
            <FiPlus size={20} /> Add Event
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <FiChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-bold">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <FiChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center font-semibold text-sm py-2 text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="h-24 border border-gray-100 dark:border-gray-700 rounded-lg"></div>
              ))}
              {days.map(day => {
                const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayEvents = events.filter(e => e.date === dateStr);
                const isToday = dateStr === new Date().toISOString().split('T')[0];
                
                return (
                  <div key={day} className={`h-24 border rounded-lg p-1 overflow-y-auto ${isToday ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-100 dark:border-gray-700'}`}>
                    <span className={`text-xs font-medium ${isToday ? 'text-purple-600' : ''}`}>{day}</span>
                    {dayEvents.slice(0, 2).map(event => (
                      <div key={event.id} className={`text-xs p-0.5 mt-1 rounded ${getEventColor(event.type)} truncate`}>
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500 mt-0.5">+{dayEvents.length - 2} more</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiCalendar /> Today's Schedule
            </h2>
            {todayEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No events scheduled for today</p>
                <p className="text-sm mt-2">Click "Add Event" to plan your day</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayEvents.map(event => (
                  <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <button onClick={() => toggleEventComplete(event.id)}>
                      {event.completed ? <FiCheckCircle className="text-green-500" size={20} /> : <FiCircle className="text-gray-400" size={20} />}
                    </button>
                    <div className="flex-1">
                      <p className={`font-medium ${event.completed ? 'line-through text-gray-400' : ''}`}>{event.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <FiClock size={12} className="text-gray-400" />
                        <span className="text-xs text-gray-500">{event.time}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getEventColor(event.type)}`}>{event.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Add New Event</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              />
              <select
                value={newEvent.type}
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              >
                <option value="class">Class</option>
                <option value="quiz">Quiz</option>
                <option value="deadline">Deadline</option>
                <option value="meeting">Meeting</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button onClick={handleAddEvent} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Add Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarSchedule;