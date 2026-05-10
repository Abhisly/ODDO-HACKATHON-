'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Command, Terminal as TerminalIcon } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative mb-20 pt-8">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-orange-500 font-bold">Protocol Active</p>
            </div>
            <div className="h-px w-12 bg-white/10" />
            <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-zinc-600">ID: CDR-2045-ALPHA</p>
          </div>
          
          <h1 className="text-7xl lg:text-9xl font-black tracking-[calc(-0.06em)] leading-[0.85] uppercase italic">
            Hello,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 drop-shadow-[0_0_30px_rgba(255,77,0,0.3)]">Commander</span>
          </h1>
          
          <div className="flex items-center gap-6 pt-4">
            <p className="text-zinc-400 text-xl lg:text-2xl max-w-xl font-medium tracking-tight leading-snug">
              System readiness: <span className="text-white font-bold italic">100%</span>. All orbital travel routes are clear for mission deployment.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative w-full xl:w-[450px]"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-cyan-500/20 blur-2xl opacity-50" />
          <div className="relative glass-panel bg-[#0B0F19]/60 border-white/10 p-2 flex items-center group">
            <div className="pl-6 pr-4">
              <Search className="w-6 h-6 text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search orbital routes, missions, logs..."
              className="flex-1 bg-transparent py-5 text-lg font-bold tracking-tight focus:outline-none placeholder:text-zinc-700 text-white"
            />
            <div className="pr-6 flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-black text-zinc-500">
                <Command className="w-3 h-3" /> K
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Atmospheric FX */}
      <div className="absolute -top-40 -left-60 w-[800px] h-[800px] bg-orange-600/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-cyan-600/5 blur-[160px] rounded-full pointer-events-none" />
    </div>
  );
}
