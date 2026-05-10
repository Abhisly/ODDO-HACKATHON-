'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Compass, MapPin, Coffee, Plane, User } from 'lucide-react';

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
    text: "Hello. I'm your Traveloop Concierge. I notice you're planning a trip to Kyoto in October. How can I assist you today?",
    suggestions: [
      "Find luxury Ryokans under $500/night.",
      "What is the best way to get from KIX to Kyoto?",
      "Recommend hidden Michelin-star sushi."
    ]
  }
];

export default function ConciergePage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        text: `Based on your luxury profile, I recommend "Tawaraya Ryokan" for its unparalleled Omotenashi (traditional hospitality). I've temporarily held a reservation for you. Would you like me to confirm it and add it to your Day 1 itinerary?`,
        suggestions: ["Yes, confirm the Ryokan.", "Show me other options.", "No, let's look at dining instead."]
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 2500);
  };

  return (
    <div className="editorial-container pt-32 pb-6 max-w-5xl mx-auto h-screen flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-medium tracking-tight text-luxury-charcoal mb-2">
            AI Concierge
          </h1>
          <p className="text-luxury-charcoal/60 font-light">
            Your personal expert for crafting perfect itineraries.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-luxury-cream rounded-full border border-black/5 text-xs font-medium text-luxury-forest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-forest opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-luxury-forest"></span>
          </span>
          Online & Context-Aware
        </div>
      </div>

      <div className="flex-1 bg-white border border-black/5 rounded-3xl overflow-hidden flex flex-col shadow-luxury">
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-6 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${msg.sender === 'ai' ? 'bg-luxury-forest text-white' : 'bg-luxury-beige text-luxury-charcoal'}`}>
                  {msg.sender === 'ai' ? <Compass className="w-6 h-6" /> : <User className="w-6 h-6" />}
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col gap-4 max-w-[80%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-6 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-luxury-charcoal text-white rounded-tr-sm' : 'bg-luxury-cream text-luxury-charcoal border border-black/5 rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                  
                  {/* Suggestion Chips */}
                  {msg.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(suggestion)}
                          className="px-4 py-2 text-xs font-medium rounded-full bg-white border border-black/10 text-luxury-charcoal hover:border-luxury-forest hover:text-luxury-forest transition-colors shadow-sm"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-6">
              <div className="shrink-0 w-12 h-12 rounded-full bg-luxury-forest text-white flex items-center justify-center">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <div className="p-6 rounded-2xl bg-luxury-cream border border-black/5 rounded-tl-sm flex items-center gap-2">
                <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4 }} className="w-2 h-2 bg-luxury-charcoal/40 rounded-full" />
                <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} className="w-2 h-2 bg-luxury-charcoal/40 rounded-full" />
                <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }} className="w-2 h-2 bg-luxury-charcoal/40 rounded-full" />
              </div>
            </motion.div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-white border-t border-black/5">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask for recommendations, budget advice, or itinerary changes..."
              className="w-full bg-luxury-cream border border-black/5 rounded-full py-4 pl-6 pr-16 text-luxury-charcoal placeholder:text-luxury-charcoal/40 focus:outline-none focus:border-luxury-forest focus:ring-1 focus:ring-luxury-forest transition-all"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-luxury-forest text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-all shadow-md"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
