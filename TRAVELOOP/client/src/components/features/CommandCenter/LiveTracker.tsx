'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LocateFixed, MapPin, Navigation2, MoreHorizontal } from 'lucide-react';

export default function LiveTracker() {
  return (
    <div className="glass-panel w-full h-full p-8 lg:p-10 relative group overflow-hidden flex flex-col">
      {/* Background Image / Map Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1473625247510-8ceb1760943f?q=80&w=2000&auto=format&fit=crop)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/80 to-transparent" />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-auto">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(255,77,0,1)] animate-pulse" />
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">Live Tracking</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-md">
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mt-32 md:mt-48 space-y-8">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tighter text-white drop-shadow-lg"
          >
            Central Line Express
          </motion.h2>
          <div className="flex items-center gap-4 mt-3 text-sm font-mono uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-2"><LocateFixed className="w-4 h-4 text-primary" /> Sector 4</span>
            <span className="text-white/30">→</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-cyan-400" /> Core Station</span>
          </div>
        </div>

        {/* Tactical Progress Bar */}
        <div className="space-y-4 pt-4">
          <div className="relative w-full h-3 bg-black/50 rounded-full overflow-hidden border border-white/10 backdrop-blur-md shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/50 via-primary to-orange-400"
            >
              {/* Glowing Head */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-full bg-white blur-[2px]" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full blur-[10px] opacity-80" />
            </motion.div>
          </div>
          
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] font-bold">
            <div className="flex items-center gap-2 text-primary drop-shadow-[0_0_5px_rgba(255,77,0,0.5)]">
              <span className="animate-pulse">T-MINUS</span>
              <span>14M 20S</span>
            </div>
            <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">65% COMPLETE</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Navigation HUD Elements */}
      <div className="absolute right-8 bottom-32 opacity-20 pointer-events-none rotate-45">
        <Navigation2 className="w-64 h-64 text-white" />
      </div>
      <div className="absolute left-8 bottom-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary to-transparent opacity-30" />
      <div className="absolute right-1/4 bottom-10 w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30" />
    </div>
  );
}
