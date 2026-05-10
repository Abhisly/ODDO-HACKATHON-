'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';

export default function LiveTracker() {
  return (
    <div className="glass-panel overflow-hidden group h-full flex flex-col">
      <div className="relative flex-1 min-h-[300px]">
        {/* Background Image / Placeholder */}
        <img 
          src="https://images.unsplash.com/photo-1474487056289-622ad5a33679?q=80&w=2600&auto=format&fit=crop" 
          alt="High-speed rail" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        
        {/* Top Indicators */}
        <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel bg-white/5 border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest uppercase">Live Tracking</span>
        </div>

        <button className="absolute top-6 right-6 w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-all">
          <MoreHorizontal className="w-5 h-5" />
        </button>

        {/* Content Overlay */}
        <div className="absolute bottom-8 left-8 right-8">
          <h3 className="text-4xl font-bold tracking-tighter mb-2">Central Line Express</h3>
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-orange-500">◆</span>
              Sector 4
            </div>
            <span className="text-zinc-700">→</span>
            <div className="flex items-center gap-2">
              <span className="text-orange-500">◇</span>
              Core Station
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full relative"
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[4px] opacity-50" />
              </motion.div>
            </div>
            <div className="flex justify-between text-[10px] font-mono tracking-widest uppercase">
              <span className="text-zinc-500">T-minus 14m 20s</span>
              <span className="text-orange-500 font-bold">65% Complete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
