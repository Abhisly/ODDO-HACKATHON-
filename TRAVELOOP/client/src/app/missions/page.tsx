'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTravelStore } from '@/lib/store';
import { Plus, Trash2, BookOpen, Calendar as CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';

export default function NotesPage() {
  const { notes, addNote, deleteNote } = useTravelStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    
    addNote({
      id: `note-${Date.now()}`,
      title: newTitle,
      content: newContent,
      date: new Date().toISOString()
    });
    
    setNewTitle('');
    setNewContent('');
    setIsAdding(false);
  };

  if (!mounted) return null;

  return (
    <div className="editorial-container pt-32 md:pt-40 pb-24 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-luxury-charcoal mb-4">
            Travel Journal
          </h1>
          <p className="text-xl text-luxury-charcoal/60 font-light leading-relaxed max-w-2xl">
            Document your thoughts, save important reminders, and build your travel story.
          </p>
        </motion.div>
        
        <button 
          onClick={() => setIsAdding(true)}
          className="btn-luxury shrink-0"
        >
          <Plus className="w-5 h-5 mr-2" /> New Entry
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12 overflow-hidden"
          >
            <div className="editorial-card p-8 bg-luxury-beige/30 border border-black/10">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-serif text-2xl font-medium">New Journal Entry</h3>
                <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                  <X className="w-5 h-5 text-luxury-charcoal/60" />
                </button>
              </div>
              <input
                type="text"
                placeholder="Title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-2xl font-serif bg-transparent border-none focus:ring-0 placeholder:text-luxury-charcoal/30 mb-4"
              />
              <textarea
                placeholder="Write your thoughts here..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full h-40 bg-transparent border-none focus:ring-0 placeholder:text-luxury-charcoal/30 resize-none"
              />
              <div className="flex justify-end mt-4">
                <button 
                  onClick={handleSave}
                  disabled={!newTitle.trim() || !newContent.trim()}
                  className="btn-luxury disabled:opacity-50"
                >
                  Save Entry
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="editorial-card p-8 bg-white border border-black/5 group relative"
            >
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-luxury-charcoal/40 mb-6">
                <CalendarIcon className="w-4 h-4" />
                {format(new Date(note.date), 'MMM dd, yyyy')}
              </div>
              <h3 className="font-serif text-2xl font-medium mb-4">{note.title}</h3>
              <p className="text-luxury-charcoal/70 leading-relaxed">
                {note.content}
              </p>
              
              <button 
                onClick={() => deleteNote(note.id)}
                className="absolute top-6 right-6 p-2 rounded-full bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {notes.length === 0 && !isAdding && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-luxury-charcoal/40 border border-dashed border-black/10 rounded-2xl">
            <BookOpen className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-medium text-lg">No journal entries yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
