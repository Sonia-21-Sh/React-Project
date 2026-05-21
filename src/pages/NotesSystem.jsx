import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotes } from '../contexts/NotesContext';
import { 
  FiPlus, FiSearch, FiFilter, FiStar, FiEdit2, 
  FiTrash2, FiMoreVertical, FiMic, FiDownload, FiCpu,
  FiBookmark, FiFolder, FiTag, FiX, FiSave, FiCopy
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const NotesSystem = () => {
  const {
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
  } = useNotes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('Computer Science');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);

  // Handle save note
  const handleSaveNote = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    const noteData = {
      title,
      content,
      subject,
      tags,
    };

    if (editingNote) {
      updateNote(editingNote.id, noteData);
    } else {
      addNote(noteData);
    }

    resetModal();
  };

  // Handle edit note
  const handleEditNote = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setSubject(note.subject);
    setTags(note.tags || []);
    setIsModalOpen(true);
  };

  // Handle delete note
  const handleDeleteNote = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(id);
    }
  };

  // Handle add tag
  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // AI Summary
  const handleAISummary = async () => {
    if (!content) {
      toast.error('Please write some content first');
      return;
    }
    setIsGeneratingAI(true);
    const summary = await generateAISummary(content);
    setContent(content + '\n\n📝 AI Summary:\n' + summary);
    setIsGeneratingAI(false);
    toast.success('AI summary generated!');
  };

  // Voice to note
  const startVoiceRecording = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsVoiceRecording(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setContent(content + ' ' + transcript);
        setIsVoiceRecording(false);
        toast.success('Voice converted to text!');
      };
      
      recognition.onerror = () => {
        setIsVoiceRecording(false);
        toast.error('Voice recognition failed');
      };
      
      recognition.start();
    } else {
      toast.error('Voice recognition not supported in this browser');
    }
  };

  // Export to PDF
  const exportToPDF = (note) => {
    toast.success(`Exporting "${note.title}" to PDF...`);
    // In production, use jsPDF or similar library
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
    setTitle('');
    setContent('');
    setSubject('Computer Science');
    setTags([]);
    setTagInput('');
  };

  // Get favorite notes
  const favoriteNotes = filteredNotes.filter(n => n.isFavorite);
  const otherNotes = filteredNotes.filter(n => !n.isFavorite);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Notes System</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Organize your study materials</p>
          </div>
          <button
            onClick={() => {
              resetModal();
              setIsModalOpen(true);
            }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-xl transition"
          >
            <FiPlus size={20} />
            New Note
          </button>
        </div>

        {/* Filters Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
              />
            </div>

            {/* Subject Filter */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-500"
            >
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Tag Filter */}
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-500"
            >
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Favorite Notes Section */}
          {favoriteNotes.length > 0 && (
            <>
              <div className="col-span-full">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FiStar className="text-yellow-500 fill-yellow-500" /> Favorite Notes
                </h2>
              </div>
              {favoriteNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                  onTogglePin={togglePin}
                  onToggleFavorite={toggleFavorite}
                  onExport={exportToPDF}
                />
              ))}
            </>
          )}

          {/* All Other Notes */}
          {otherNotes.length > 0 && (
            <div className="col-span-full">
              <h2 className="text-xl font-bold mb-4">All Notes</h2>
            </div>
          )}

          {otherNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              onTogglePin={togglePin}
              onToggleFavorite={toggleFavorite}
              onExport={exportToPDF}
            />
          ))}

          {filteredNotes.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500">No notes found. Create your first note!</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Create/Edit Note */}
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
              className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {editingNote ? 'Edit Note' : 'Create New Note'}
                </h2>
                <button onClick={resetModal} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <FiX size={24} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Note title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 text-xl font-semibold border-b border-gray-300 dark:border-gray-600 focus:border-purple-500 outline-none bg-transparent"
                />

                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
                  {subjects.filter(s => s !== 'All').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full text-sm flex items-center gap-1">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-purple-800">
                          <FiX size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add tag (e.g., #important)"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <button onClick={addTag} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">Add</button>
                  </div>
                </div>

                {/* Rich Text Editor */}
                <div className="relative">
                  <textarea
                    placeholder="Write your note content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={12}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 resize-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                  />
                  
                  {/* Toolbar */}
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <button
                      onClick={startVoiceRecording}
                      className={`p-2 rounded-lg transition ${isVoiceRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'}`}
                      title="Voice to Note"
                    >
                      <FiMic size={18} />
                    </button>
                    <button
                      onClick={handleAISummary}
                      disabled={isGeneratingAI}
                      className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition disabled:opacity-50"
                      title="AI Summary"
                    >
                      {isGeneratingAI ? '...' : <FiCpu size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                <button onClick={resetModal} className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                  Cancel
                </button>
                <button onClick={handleSaveNote} className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition">
                  {editingNote ? 'Update Note' : 'Create Note'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Note Card Component
const NoteCard = ({ note, onEdit, onDelete, onTogglePin, onToggleFavorite, onExport }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2">
          <button onClick={() => onTogglePin(note.id)}>
            <FiBookmark className={note.isPinned ? 'text-purple-600 fill-purple-600' : 'text-gray-400'} size={16} />
          </button>
          <button onClick={() => onToggleFavorite(note.id)}>
            <FiStar className={note.isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'} size={16} />
          </button>
        </div>
        <div className="relative group">
          <button className="p-1">
            <FiMoreVertical size={16} />
          </button>
          <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <button onClick={() => onEdit(note)} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
              <FiEdit2 size={14} /> Edit
            </button>
            <button onClick={() => onExport(note)} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
              <FiDownload size={14} /> Export PDF
            </button>
            <button onClick={() => onDelete(note.id)} className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
              <FiTrash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </div>

      <h3 className="font-bold text-lg mb-2 line-clamp-1">{note.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">{note.content}</p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-xs rounded-full">{note.subject}</span>
        {note.tags?.map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 text-xs rounded-full">{tag}</span>
        ))}
      </div>

      <div className="text-xs text-gray-400">
        {new Date(note.updatedAt).toLocaleDateString()}
      </div>
    </motion.div>
  );
};

export default NotesSystem;