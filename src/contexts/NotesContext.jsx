import React, { createContext, useContext, useState, useEffect } from 'react';

const NotesContext = createContext();

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within NotesProvider');
  }
  return context;
};

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [subjects] = useState(['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science']);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [allTags, setAllTags] = useState(['All']);

  useEffect(() => {
    const stored = localStorage.getItem('smart_notes');
    if (stored) {
      setNotes(JSON.parse(stored));
    } else {
      const demoNotes = [
        {
          id: 1,
          title: 'Welcome to Smart Notes',
          content: 'Start writing your study notes here! You can add tags, pin important notes, and organize by subject.',
          subject: 'Computer Science',
          tags: ['#important'],
          isPinned: true,
          isFavorite: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: 'JavaScript Basics',
          content: 'JavaScript is a programming language that enables interactive web pages. Key concepts: variables, functions, loops, and events.',
          subject: 'Computer Science',
          tags: ['#exam'],
          isPinned: false,
          isFavorite: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setNotes(demoNotes);
      localStorage.setItem('smart_notes', JSON.stringify(demoNotes));
    }
  }, []);

  useEffect(() => {
    const tags = ['All', ...new Set(notes.flatMap(note => note.tags || []))];
    setAllTags(tags);
  }, [notes]);

  const addNote = (note) => {
    const newNote = {
      ...note,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
      isFavorite: false,
      tags: note.tags || [],
    };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('smart_notes', JSON.stringify(updatedNotes));
    return newNote;
  };

  const updateNote = (id, updatedData) => {
    const updatedNotes = notes.map(note =>
      note.id === id
        ? { ...note, ...updatedData, updatedAt: new Date().toISOString() }
        : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('smart_notes', JSON.stringify(updatedNotes));
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter(note => note.id !== id);
    setNotes(filteredNotes);
    localStorage.setItem('smart_notes', JSON.stringify(filteredNotes));
  };

  const togglePin = (id) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('smart_notes', JSON.stringify(updatedNotes));
  };

  const toggleFavorite = (id) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('smart_notes', JSON.stringify(updatedNotes));
  };

  const generateAISummary = async (content) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const words = content.split(' ');
    const summary = words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '');
    return summary;
  };

  const filteredNotes = notes.filter(note => {
    const matchesSubject = selectedSubject === 'All' || note.subject === selectedSubject;
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || (note.tags && note.tags.includes(selectedTag));
    return matchesSubject && matchesSearch && matchesTag;
  });

  const value = {
    notes,
    subjects,
    selectedSubject,
    setSelectedSubject,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    allTags,
    filteredNotes,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleFavorite,
    generateAISummary,
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;