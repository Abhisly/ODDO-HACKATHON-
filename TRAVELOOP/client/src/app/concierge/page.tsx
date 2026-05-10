"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Compass, User, Sparkles, MessageSquare, Mic, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  suggestions?: string[];
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: "Welcome to your private concierge. I am here to ensure your journey is nothing short of extraordinary. How may I assist you today?",
    suggestions: [
      "Curate a 7-day luxury Tokyo escape",
      "Hidden Michelin-star gems in Paris",
      "Private yacht charters in Amalfi"
    ]
  }
];

export default function ConciergePage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: `msg-${Date.now()}`, sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: `Based on your preference for refined experiences, I've curated a selection of private villas and exclusive dining spots. Would you like me to integrate these into your itinerary or refine the selection further?`,
        suggestions: ["Show me the villas", "Tell me more about dining", "Refine for nature focus"]
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 2000);
  };

  return (
    <div className="w-full h-screen bg-white dark:bg-black flex flex-col overflow-hidden">
      {/* Header */}
      <div className="editorial-container pt-32 pb-8 flex flex-col md:flex-row justify-between items-end gap-4 border-b border-black/5 dark:border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-[10px]">Private Service</span>
          </div>
          <h1 className="text-4xl font-serif font-medium text-luxury-charcoal dark:text-white">AI Concierge</h1>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40">
          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Encrypted Channel</span>
          <span className="w-px h-4 bg-black/10 dark:bg-white/10" />
          <span>Priority Access</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto editorial-container py-12 space-y-12 scrollbar-hide"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-6 max-w-4xl mx-auto",
                msg.sender === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg",
                msg.sender === 'ai' ? "bg-red-600 text-white" : "bg-zinc-900 text-white"
              )}>
                {msg.sender === 'ai' ? <Compass className="w-6 h-6" /> : <User className="w-6 h-6" />}
              </div>
              
              <div className={cn(
                "flex flex-col gap-4",
                msg.sender === 'user' ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "p-8 rounded-[2rem] text-lg leading-relaxed shadow-luxury",
                  msg.sender === 'user' 
                    ? "bg-zinc-900 text-white rounded-tr-none" 
                    : "bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 text-luxury-charcoal dark:text-white rounded-tl-none"
                )}>
                  {msg.text}
                </div>

                {msg.suggestions && (
                  <div className="flex flex-wrap gap-2">
                    {msg.suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(s)}
                        className="px-6 py-2 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold tracking-widest uppercase hover:border-red-600 hover:text-red-600 transition-all dark:text-white/60 dark:hover:text-red-600"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-6 max-w-4xl mx-auto"
            >
              <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <div className="p-8 rounded-[2rem] bg-black/5 dark:bg-white/5 rounded-tl-none flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Box */}
      <div className="editorial-container pb-12 pt-6">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-4 text-luxury-charcoal/20 dark:text-white/20">
            <MessageSquare className="w-5 h-5" />
          </div>
          <input 
            type="text" 
            placeholder="Describe your perfect escape..."
            className="w-full pl-16 pr-32 py-6 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-2xl focus:ring-4 focus:ring-red-600/5 transition-all text-lg outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button className="p-3 text-luxury-charcoal/20 dark:text-white/20 hover:text-red-600 transition-colors">
              <Mic className="w-5 h-5" />
            </button>
            <button className="p-3 text-luxury-charcoal/20 dark:text-white/20 hover:text-red-600 transition-colors">
              <ImageIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl shadow-red-600/30 hover:scale-105 transition-transform disabled:opacity-50"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </div>
        </div>
        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/20 dark:text-white/20 mt-6">
          Powered by Traveloop AI • High Fidelity Mode
        </p>
      </div>
    </div>
  );
}
