'use client';

import React from 'react';
import HeroSection from '@/components/features/CommandCenter/HeroSection';
import LiveTracker from '@/components/features/CommandCenter/LiveTracker';
import MissionStats from '@/components/features/CommandCenter/MissionStats';
import { motion } from 'framer-motion';
import { Plane, Train, Plus, LayoutPanelTop, Terminal, Map as MapIcon } from 'lucide-react';

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
    <div className="space-y-8 pb-20">
      <HeroSection />

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">
        {/* Live Mission Tracker */}
        <div className="xl:col-span-8">
          <LiveTracker />
        </div>

        {/* Navigation Core Telemetry */}
        <div className="xl:col-span-4">
          <MissionStats />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Popular Sectors */}
        <div className="xl:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-500">Popular Sectors</h3>
            <button className="text-[10px] font-bold text-orange-500 uppercase tracking-widest hover:underline flex items-center gap-1">
              View All <Plus className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-4">
            {popularSectors.map((sector) => (
              <motion.div 
                whileHover={{ x: 10 }}
                key={sector.name} 
                className="glass-panel p-4 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-orange-600/20 transition-all">
                    <sector.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{sector.name}</h4>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{sector.type} • GATE 4B</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{sector.time}</p>
                  <p className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">● {sector.status}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Command Actions */}
        <div className="xl:col-span-6 space-y-6">
          <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-500">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={action.label}
                className="glass-panel p-8 flex flex-col items-center justify-center gap-4 hover:border-orange-500/30 group"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${action.color === 'orange' ? 'bg-orange-600/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                  <action.icon className={`w-6 h-6 ${action.color === 'orange' ? 'text-orange-500' : 'text-zinc-400 group-hover:text-white'}`} />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em]">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
