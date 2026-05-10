'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Terminal, Cpu, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

const chatHistory = [
  { role: 'assistant', content: 'Hello Commander. I am your Traveloop Concierge. How can I optimize your route today?' },
  { role: 'user', content: 'I need the fastest route from Purwosari to Yogyakarta this morning.' },
  { role: 'assistant', content: 'Calculating optimal trajectory. The Central Line Express is your fastest option with a 94% efficiency rating.', suggestion: { type: 'route', name: 'Central Line', time: '45 mins', from: 'PWS', to: 'YK' } },
];

export default function ConciergePage() {
  const [input, setInput] = useState('');

  return (
    <div className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Neural Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />
      
      {/* HUD Header */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-4xl flex items-center justify-between px-8 z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h1 className="text-sm font-bold uppercase tracking-[0.2em]">Traveloop AI</h1>
              <span className="text-[10px] font-mono text-cyan-500 bg-cyan-500/10 px-1.5 py-0.5 rounded uppercase">Online</span>
            </div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Core Processing Unit</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          Neural Sys Sync
        </div>
      </div>

      {/* Terminal Interface */}
      <div className="w-full max-w-4xl h-[70vh] flex flex-col z-10">
        <div className="flex-1 overflow-y-auto px-8 space-y-12 custom-scrollbar py-20">
          <div className="flex justify-center mb-20">
            <div className="glass-panel py-2 px-6 border-cyan-500/30 bg-cyan-500/5">
              <p className="text-[10px] font-mono text-cyan-400 tracking-[0.5em] uppercase flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> Secure Channel Established
              </p>
            </div>
          </div>

          <AnimatePresence>
            {chatHistory.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-2xl space-y-4">
                  <div className={`p-6 rounded-2xl glass-panel ${
                    msg.role === 'user' 
                      ? 'border-orange-500/30 bg-orange-500/5 rounded-tr-none text-right' 
                      : 'border-cyan-500/20 bg-cyan-500/5 rounded-tl-none'
                  }`}>
                    <p className="text-sm font-medium tracking-tight leading-relaxed">
                      {msg.content}
                    </p>
                  </div>

                  {msg.suggestion && (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="glass-panel p-6 border-orange-500/40 bg-orange-500/5 space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-orange-500" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{msg.suggestion.name}</span>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-orange-500" /> {msg.suggestion.time}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <h4 className="text-3xl font-bold tracking-tighter">{msg.suggestion.from}</h4>
                          <p className="text-[8px] font-mono text-zinc-500 uppercase">Purwosari</p>
                          <div className="mt-1 flex items-center justify-center gap-1 text-[8px] font-mono text-cyan-500 uppercase">
                            <div className="w-1 h-1 rounded-full bg-cyan-500" /> Plat 3
                          </div>
                        </div>
                        <div className="flex-1 flex justify-center">
                          <div className="w-10 h-10 rounded-full border border-orange-500/30 flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-orange-500" />
                          </div>
                        </div>
                        <div className="text-center">
                          <h4 className="text-3xl font-bold tracking-tighter">{msg.suggestion.to}</h4>
                          <p className="text-[8px] font-mono text-zinc-500 uppercase">Yogyakarta</p>
                          <div className="mt-1 flex items-center justify-center gap-1 text-[8px] font-mono text-cyan-500 uppercase">
                            <div className="w-1 h-1 rounded-full bg-cyan-500" /> Plat 1
                          </div>
                        </div>
                      </div>

                      <button className="w-full py-3 bg-orange-600 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,77,0,0.2)]">
                        <ShieldCheck className="w-4 h-4" /> Secure Tickets
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Terminal */}
        <div className="p-8">
          <div className="glass-panel bg-white/5 p-2 flex items-center gap-4 border-white/10 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-orange-500 opacity-0 group-focus-within:opacity-20 blur transition-opacity" />
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter travel directive or query AI concierge..."
              className="flex-1 bg-transparent py-4 px-6 text-sm font-medium focus:outline-none placeholder:text-zinc-600"
            />
            <button className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(0,243,255,0.2)]">
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 flex justify-center gap-8 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            <span>Voice Input: Offline</span>
            <span>Logic: Hybrid Core</span>
            <span>Tokens: Optimal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
