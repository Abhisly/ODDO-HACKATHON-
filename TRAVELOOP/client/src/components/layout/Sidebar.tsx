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
  ChevronRight,
  Plane,
  MapPin,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTravelStore } from '@/lib/store';

const menuItems = [
  { icon: LayoutDashboard, label: 'Command Center', path: '/dashboard' },
  { icon: Globe, label: 'Mission Logs', path: '/trips' },
  { icon: Map, label: 'Tactical Planner', path: '/planner' },
  { icon: MapPin, label: 'Discovery', path: '/discover' },
  { icon: Wallet, label: 'Fiscal Status', path: '/dashboard' },
  { icon: BookOpen, label: 'Intelligence', path: '/trips' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useTravelStore();

  return (
    <motion.aside 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="hidden lg:flex w-80 h-full flex-col p-8 z-50 bg-luxury-cream dark:bg-zinc-950 border-r border-black/5 dark:border-white/5 shadow-2xl transition-colors duration-500"
    >
      <div className="flex flex-col h-full relative z-10">
        {/* OS Branding */}
        <div className="flex items-center gap-4 mb-16">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center border border-white/20 relative z-10 overflow-hidden shadow-xl shadow-red-600/20 group-hover:scale-110 transition-transform">
              <span className="font-serif font-black text-2xl tracking-tighter text-white drop-shadow-md">T</span>
            </div>
            <div>
              <h1 className="font-serif font-bold tracking-tight text-2xl text-luxury-charcoal dark:text-white">Traveloop.</h1>
              <p className="text-[9px] text-red-600 font-bold tracking-[0.3em] uppercase mt-0.5">Intelligence OS</p>
            </div>
          </Link>
        </div>

        {/* Tactical Navigation */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-5 p-4 rounded-2xl transition-all duration-300 relative group overflow-hidden",
                    isActive 
                      ? "bg-red-600 text-white shadow-xl shadow-red-600/20" 
                      : "hover:bg-black/5 dark:hover:bg-white/5 text-luxury-charcoal/60 dark:text-white/60"
                  )}
                >
                  <div className={cn(
                    "relative z-10 flex items-center justify-center w-6 h-6 transition-colors",
                    isActive ? "text-white" : "text-luxury-charcoal/40 dark:text-white/40 group-hover:text-luxury-charcoal dark:group-hover:text-white"
                  )}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  
                  <span className={cn(
                    "text-[10px] font-bold tracking-[0.2em] uppercase transition-colors relative z-10",
                    isActive ? "text-white" : "text-luxury-charcoal/60 dark:text-white/60 group-hover:text-luxury-charcoal dark:group-hover:text-white"
                  )}>
                    {item.label}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active-dot"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Intelligence Actions */}
        <div className="space-y-6 pt-8 mt-auto">
          <Link href="/settings" className="flex items-center gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-red-500/30 transition-colors group">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-black/10 dark:border-white/10 shrink-0">
               <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 overflow-hidden">
               <p className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal dark:text-white truncate">{user?.fullName || 'Guest Explorer'}</p>
               <p className="text-[8px] text-red-600 font-bold uppercase tracking-[0.2em] mt-0.5">Status: Online</p>
            </div>
            <Settings className="w-4 h-4 text-luxury-charcoal/40 dark:text-white/40 group-hover:rotate-90 transition-transform" />
          </Link>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-red-600/5 dark:bg-red-600/10 border border-red-600/20">
              <div className="relative flex items-center justify-center w-3 h-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,1)]" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-red-600">Neural Sync</p>
                <p className="text-[8px] font-bold text-luxury-charcoal/40 dark:text-white/40 uppercase mt-0.5">Latency: 2.4ms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
