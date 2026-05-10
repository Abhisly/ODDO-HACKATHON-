'use client';

import React from 'react';
import HeroSection from '@/components/features/CommandCenter/HeroSection';
import LiveTracker from '@/components/features/CommandCenter/LiveTracker';
import MissionStats from '@/components/features/CommandCenter/MissionStats';
import { motion } from 'framer-motion';
import { Train, Plane, Plus, LayoutPanelTop, Terminal, Map as MapIcon, ArrowRight } from 'lucide-react';

const popularSectors = [
  { name: 'Neo-Kyoto Alpha', type: 'High-speed Rail', time: '2h 15m', status: 'Cleared', icon: Train },
  { name: 'Orbital Station V', type: 'Shuttle Transport', time: '45m', status: 'Boarding', icon: Plane },
];

const quickActions = [
  { icon: Plus, label: 'Initialize', color: 'orange' },
  { icon: LayoutPanelTop, label: 'Timeline', color: 'zinc' },
  { icon: Terminal, label: 'Concierge', color: 'zinc' },
  { icon: MapIcon, label: 'Matrix', color: 'zinc' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-12 max-w-[1600px] mx-auto">
      <HeroSection />

      {/* Primary Intelligence Layer */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8">
          <LiveTracker />
        </div>
        <div className="xl:col-span-4">
          <MissionStats />
        </div>
      </div>

      {/* Tactical Overview Layer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Popular Sector Telemetry */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-zinc-500">Popular Sectors</h3>
            <button className="text-[10px] font-bold text-orange-500 uppercase tracking-widest hover:text-orange-400 transition-colors flex items-center gap-2">
              Deep Scan <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-4">
            {popularSectors.map((sector) => (
              <motion.div 
                whileHover={{ x: 10 }}
                key={sector.name} 
                className="glass-panel p-6 flex items-center justify-between group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-orange-600/20 transition-all border border-white/5">
                    <sector.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl tracking-tight">{sector.name}</h4>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">{sector.type} • SECTOR 7G</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg tracking-tighter">{sector.time}</p>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    <p className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">{sector.status}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rapid Deployment Dock */}
        <div className="space-y-8">
          <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-zinc-500 border-b border-white/5 pb-4">Quick Command</h3>
          <div className="grid grid-cols-2 gap-6">
            {quickActions.map((action) => (
              <motion.button
                whileHover={{ scale: 1.02, translateY: -5 }}
                whileTap={{ scale: 0.98 }}
                key={action.label}
                className="glass-panel p-10 flex flex-col items-center justify-center gap-6 hover:border-orange-500/30 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${action.color === 'orange' ? 'bg-orange-600/20 shadow-[0_0_30px_rgba(255,77,0,0.1)]' : 'bg-white/5 group-hover:bg-white/10'}`}>
                  <action.icon className={`w-8 h-8 ${action.color === 'orange' ? 'text-orange-500' : 'text-zinc-400 group-hover:text-white'}`} />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
