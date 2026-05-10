'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Map, 
  Compass, 
  Wallet, 
  User, 
  Settings,
  Zap,
  Globe,
  Plus
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
    <aside className="w-24 lg:w-72 h-screen flex flex-col p-6 z-50 relative">
      <div className="glass-panel h-full flex flex-col items-center lg:items-stretch py-8 px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,77,0,0.5)]">
            <span className="font-bold text-xl">T</span>
          </div>
          <div className="hidden lg:block">
            <h1 className="font-bold tracking-tighter text-lg leading-none">Traveloop</h1>
            <p className="text-[10px] text-orange-500 font-mono tracking-widest uppercase">OS V.2045</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all relative group ${
                    isActive 
                      ? 'bg-orange-500/10 text-orange-500 shadow-[inset_0_0_20px_rgba(255,77,0,0.1)]' 
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-orange-500' : 'group-hover:text-orange-400'}`} />
                  <span className="hidden lg:block text-sm font-medium tracking-tight">
                    {item.label}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute left-0 w-1 h-6 bg-orange-500 rounded-full"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="space-y-4 pt-6 border-t border-white/5">
          <button className="w-full bg-orange-600 hover:bg-orange-500 text-white p-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(255,77,0,0.2)]">
            <Plus className="w-5 h-5" />
            <span className="hidden lg:block text-sm font-bold uppercase tracking-widest">Initialize Protocol</span>
          </button>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-3 py-2 text-zinc-500">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="hidden lg:block text-[10px] font-mono tracking-wider uppercase">Network Secure</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
