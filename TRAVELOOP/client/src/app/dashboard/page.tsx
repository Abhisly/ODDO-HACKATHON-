'use client';

import React from 'react';
import HeroSection from '@/components/features/CommandCenter/HeroSection';
import LiveTracker from '@/components/features/CommandCenter/LiveTracker';
import MissionStats from '@/components/features/CommandCenter/MissionStats';
import { motion } from 'framer-motion';
import { Train, Plane, Plus, LayoutPanelTop, Terminal, Map as MapIcon, ArrowRight, Orbit } from 'lucide-react';
import { cn } from '@/lib/utils';

const popularSectors = [
  { name: 'Neo-Kyoto Alpha', type: 'High-speed Rail', time: '2h 15m', status: 'Cleared', icon: Train, efficiency: 98 },
  { name: 'Orbital Station V', type: 'Shuttle Transport', time: '45m', status: 'Boarding', icon: Orbit, efficiency: 94 },
];

const quickActions = [
  { icon: Plus, label: 'Initialize', color: 'primary' },
  { icon: LayoutPanelTop, label: 'Timeline', color: 'zinc' },
  { icon: Terminal, label: 'Concierge', color: 'cyan' },
  { icon: MapIcon, label: 'Matrix', color: 'zinc' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-16">
      <HeroSection />

      {/* Primary Intelligence Layer */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="xl:col-span-8"
        >
          <LiveTracker />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="xl:col-span-4 h-full"
        >
          <MissionStats />
        </motion.div>
      </div>

      {/* Tactical Overview Layer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10"
      >
        {/* Popular Sector Telemetry */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-muted-foreground flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              Active Sectors
            </h3>
            <button className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] hover:text-cyan-300 transition-colors flex items-center gap-2 group">
              Deep Scan <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="space-y-4">
            {popularSectors.map((sector, i) => (
              <motion.div 
                whileHover={{ scale: 1.01, x: 5 }}
                key={sector.name} 
                className="glass-panel p-6 flex flex-col sm:flex-row sm:items-center justify-between group gap-6 sm:gap-0"
              >
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 relative z-10 group-hover:border-primary/30 transition-colors">
                      <sector.icon className="w-7 h-7 text-primary drop-shadow-[0_0_8px_rgba(255,77,0,0.5)]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl tracking-tight text-white group-hover:text-primary transition-colors">{sector.name}</h4>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">{sector.type}</p>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">EFF {sector.efficiency}%</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-left sm:text-right flex sm:flex-col justify-between sm:justify-start items-center sm:items-end w-full sm:w-auto border-t border-white/10 sm:border-t-0 pt-4 sm:pt-0 mt-4 sm:mt-0">
                  <p className="font-black text-2xl tracking-tighter text-white">{sector.time}</p>
                  <div className="flex items-center gap-2 mt-1 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 drop-shadow-[0_0_5px_rgba(0,243,255,0.8)] animate-pulse" />
                    <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">{sector.status}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rapid Deployment Dock */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-muted-foreground">Quick Command</h3>
          </div>
          <div className="grid grid-cols-2 gap-6 h-[calc(100%-4rem)]">
            {quickActions.map((action) => (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={action.label}
                className="glass-panel p-8 flex flex-col items-center justify-center gap-6 group relative h-full min-h-[160px]"
              >
                {/* Advanced Hover Glow */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none",
                  action.color === 'primary' ? "from-primary/10 to-transparent" :
                  action.color === 'cyan' ? "from-cyan-500/10 to-transparent" :
                  "from-white/5 to-transparent"
                )} />
                
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 relative z-10 border",
                  action.color === 'primary' ? "bg-primary/10 border-primary/20 shadow-[0_0_30px_rgba(255,77,0,0.1)] group-hover:bg-primary/20" :
                  action.color === 'cyan' ? "bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_30px_rgba(0,243,255,0.1)] group-hover:bg-cyan-500/20" :
                  "bg-white/5 border-white/5 group-hover:bg-white/10"
                )}>
                  <action.icon className={cn(
                    "w-8 h-8 transition-colors duration-500",
                    action.color === 'primary' ? "text-primary drop-shadow-[0_0_10px_rgba(255,77,0,0.5)]" :
                    action.color === 'cyan' ? "text-cyan-400 drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]" :
                    "text-muted-foreground group-hover:text-white"
                  )} />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground group-hover:text-white transition-colors relative z-10">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
