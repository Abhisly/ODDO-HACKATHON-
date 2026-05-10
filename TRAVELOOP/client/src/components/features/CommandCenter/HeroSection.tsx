'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Command, MapPin, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  return (
    <div className="relative mb-16 pt-8 z-10">
      <div className="flex flex-col 2xl:flex-row 2xl:items-end justify-between gap-12">
        
        {/* Massive Typography Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 flex-1"
        >
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border-primary/20 bg-primary/5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary drop-shadow-[0_0_8px_rgba(255,77,0,1)]"></span>
            </span>
            <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-primary font-bold">Protocol Active</p>
            <div className="h-3 w-px bg-white/20 mx-2" />
            <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-muted-foreground">ID: CDR-2045-ALPHA</p>
          </motion.div>
          
          {/* Cinematic Heading */}
          <div className="relative">
            <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-black tracking-[-0.04em] leading-[0.8] uppercase italic text-white drop-shadow-2xl">
              Hello,<br />
              <span className="relative inline-block mt-2">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-orange-400 to-primary blur-3xl opacity-30 mix-blend-screen" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] via-[#FF8C00] to-[#FF4D00] drop-shadow-[0_0_30px_rgba(255,77,0,0.4)]">
                  Commander
                </span>
              </span>
            </h1>
          </div>
          
          {/* Readiness Text */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 max-w-3xl"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md">
              <Zap className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]" />
            </div>
            <p className="text-muted-foreground text-lg md:text-xl font-medium tracking-tight leading-relaxed">
              System readiness: <span className="text-white font-bold italic">100%</span>. All orbital travel routes are clear for mission deployment across <span className="text-cyan-400">14 active sectors</span>.
            </p>
          </motion.div>
        </motion.div>

        {/* Floating Search HUD */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full 2xl:w-[500px]"
        >
          {/* Glowing backplate */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-cyan-400/5 to-transparent blur-2xl rounded-[3rem] opacity-50 z-0" />
          
          <div className="relative glass-panel bg-black/60 p-2 rounded-3xl flex items-center group transition-all duration-500 border-white/10 hover:border-primary/30 z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="pl-6 pr-4 flex items-center justify-center">
              <Search className="w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors duration-500 drop-shadow-[0_0_5px_rgba(255,77,0,0)] group-focus-within:drop-shadow-[0_0_8px_rgba(255,77,0,0.5)]" />
            </div>
            
            <input 
              type="text" 
              placeholder="Search orbital routes, sectors..."
              className="flex-1 bg-transparent py-6 text-lg font-bold tracking-tight focus:outline-none placeholder:text-zinc-600 text-white w-full"
            />
            
            <div className="pr-4 flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-muted-foreground shadow-inner">
                <Command className="w-3.5 h-3.5" /> <span className="pt-0.5">K</span>
              </div>
              <button className="w-12 h-12 rounded-xl bg-primary hover:bg-orange-500 transition-colors flex items-center justify-center shadow-[0_0_20px_rgba(255,77,0,0.4)]">
                <MapPin className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
