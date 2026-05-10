'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Globe, 
  Map, 
  Zap, 
  Wallet, 
  Plus, 
  Settings,
  ShieldCheck,
  Search
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: LayoutDashboard, label: 'Command Center', path: '/dashboard' },
  { icon: Globe, label: 'Mission Logs', path: '/missions' },
  { icon: Map, label: 'Route Matrix', path: '/matrix' },
  { icon: Zap, label: 'AI Concierge', path: '/concierge' },
  { icon: Wallet, label: 'Capital Telemetry', path: '/telemetry' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-24 lg:w-80 h-full flex flex-col p-6 z-50 relative border-r border-white/5 bg-[#050505]/80 backdrop-blur-3xl">
      <div className="flex flex-col h-full">
        {/* OS Branding */}
        <div className="flex items-center gap-4 mb-16 px-4">
          <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,77,0,0.4)] border border-white/20">
            <span className="font-black text-2xl tracking-tighter">T</span>
          </div>
          <div className="hidden lg:block">
            <h1 className="font-black tracking-tighter text-2xl leading-none uppercase italic">Traveloop</h1>
            <p className="text-[10px] text-orange-500 font-mono tracking-[0.4em] uppercase mt-1">OS V.2045</p>
          </div>
        </div>

        {/* Tactical Navigation */}
        <nav className="flex-1 space-y-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <motion.div
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-5 p-4 rounded-2xl transition-all relative group ${
                    isActive 
                      ? 'bg-orange-500/10 text-orange-500 shadow-[inset_0_0_20px_rgba(255,77,0,0.05)] border border-orange-500/20' 
                      : 'text-zinc-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-6 h-6 transition-colors ${isActive ? 'text-orange-500' : 'group-hover:text-orange-400'}`} />
                  <span className="hidden lg:block text-sm font-bold tracking-widest uppercase">
                    {item.label}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-[-1.5rem] w-1.5 h-8 bg-orange-500 rounded-r-full shadow-[5px_0_20px_rgba(255,77,0,0.5)]"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Intelligence Actions */}
        <div className="space-y-6 pt-8 border-t border-white/5 mt-auto">
          <button className="w-full bg-white text-black p-4 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-zinc-200 shadow-xl group overflow-hidden relative">
            <div className="absolute inset-0 bg-orange-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <Plus className="w-5 h-5 relative z-10" />
            <span className="hidden lg:block text-[11px] font-black uppercase tracking-[0.2em] relative z-10">Initialize Mission</span>
          </button>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(0,243,255,0.8)] animate-pulse" />
              <div className="hidden lg:block">
                <p className="text-[10px] font-mono tracking-widest uppercase text-cyan-500 font-bold">Neural Sync</p>
                <p className="text-[8px] font-mono text-zinc-600 uppercase">Latency: 4ms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
