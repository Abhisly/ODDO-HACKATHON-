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
  Search,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

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
    <motion.aside 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full flex flex-col p-6 z-50 glass-panel shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/10"
    >
      <div className="flex flex-col h-full relative z-10">
        {/* OS Branding */}
        <div className="flex items-center gap-4 mb-12 px-2">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-colors duration-500" />
            <div className="w-12 h-12 bg-gradient-to-br from-[#FF4D00] to-[#992E00] rounded-2xl flex items-center justify-center border border-white/20 relative z-10 overflow-hidden">
              <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
              <span className="font-black text-2xl tracking-tighter text-white drop-shadow-md">T</span>
            </div>
          </div>
          <div className="hidden lg:block">
            <h1 className="font-black tracking-tight text-2xl leading-none uppercase italic text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Traveloop</h1>
            <p className="text-[10px] text-primary font-mono tracking-[0.3em] uppercase mt-1 opacity-80">OS V.2045</p>
          </div>
        </div>

        {/* Tactical Navigation */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 relative group overflow-hidden",
                    isActive 
                      ? "bg-primary/10 border border-primary/20 shadow-[inset_0_0_20px_rgba(255,77,0,0.05)]" 
                      : "hover:bg-white/5 border border-transparent"
                  )}
                >
                  {/* Hover sweep effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  <div className={cn(
                    "relative z-10 flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
                    isActive ? "bg-primary/20 text-primary" : "bg-transparent text-muted-foreground group-hover:text-white"
                  )}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  
                  <span className={cn(
                    "hidden lg:block text-xs font-bold tracking-[0.2em] uppercase transition-colors relative z-10",
                    isActive ? "text-white" : "text-muted-foreground group-hover:text-white"
                  )}>
                    {item.label}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary shadow-[0_0_20px_rgba(255,77,0,0.8)] rounded-l-full"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Intelligence Actions */}
        <div className="space-y-4 pt-8 mt-auto">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white text-black p-4 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-zinc-200 shadow-[0_0_30px_rgba(255,255,255,0.1)] group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Plus className="w-5 h-5 relative z-10" />
            <span className="hidden lg:block text-[11px] font-black uppercase tracking-[0.2em] relative z-10">Initialize Mission</span>
          </motion.button>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md">
              <div className="relative flex items-center justify-center w-3 h-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_10px_rgba(0,243,255,1)]" />
              </div>
              <div className="hidden lg:block">
                <p className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-bold drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">Neural Sync</p>
                <p className="text-[8px] font-mono text-zinc-500 uppercase mt-0.5">Latency: 2.4ms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
