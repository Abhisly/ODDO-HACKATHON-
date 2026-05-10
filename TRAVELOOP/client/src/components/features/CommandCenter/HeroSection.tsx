'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative mb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse-glow" />
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-orange-500/80">System Active</p>
          </div>
          <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-none mb-4">
            Hello, <span className="text-orange-500 italic">Commander</span>
          </h1>
          <p className="text-zinc-400 text-lg lg:text-xl max-w-xl font-medium tracking-tight">
            All systems nominal. Your next travel mission is scheduled for 14:20:05 UTC.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative w-full lg:w-96"
        >
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-zinc-500" />
          </div>
          <input 
            type="text" 
            placeholder="Search systems, routes, tickets..."
            className="w-full glass-panel bg-white/[0.02] py-4 pl-12 pr-6 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-600 font-medium text-sm"
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-4 text-[10px] font-mono text-zinc-600 bg-white/5 px-2 py-1 rounded">
            ⌘ K
          </div>
        </motion.div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}
