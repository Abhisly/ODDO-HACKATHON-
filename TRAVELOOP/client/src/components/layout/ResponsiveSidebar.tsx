'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Map as MapIcon, Menu, X, BookOpen, MapPin, Plane, Settings, LayoutDashboard, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTravelStore } from '@/lib/store';

export function ResponsiveSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useTravelStore();

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: Compass },
    { name: 'My Trips', href: '/trips', icon: Plane },
    { name: 'Tactical Planner', href: '/planner', icon: LayoutDashboard },
    { name: 'Discovery', href: '/discover', icon: MapPin },
    { name: 'Fiscal Status', href: '/dashboard', icon: Wallet },
    { name: 'Intelligence', href: '/trips', icon: BookOpen },
    { name: 'Profile Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-[60] lg:hidden p-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-full shadow-md border border-black/5 dark:border-white/10 text-luxury-charcoal dark:text-white"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Content */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        className={cn(
          "fixed inset-y-0 left-0 z-[80] w-72 bg-luxury-cream dark:bg-zinc-950 border-r border-black/5 dark:border-white/5 shadow-2xl lg:shadow-none lg:translate-x-0 flex flex-col transition-transform duration-300 ease-in-out lg:hidden"
        )}
      >
        <div className="p-8 flex justify-between items-center">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-serif font-medium tracking-tight text-luxury-charcoal dark:text-white">
            Traveloop.
          </Link>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 lg:hidden dark:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest",
                  isActive 
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20" 
                    : "text-luxury-charcoal/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-luxury-charcoal dark:hover:text-white"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-black/5 dark:border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-luxury-charcoal dark:bg-white text-white dark:text-black flex items-center justify-center font-serif text-lg overflow-hidden">
              {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user?.fullName?.[0] || 'A'}
            </div>
            <div>
              <p className="font-bold text-xs uppercase tracking-widest text-luxury-charcoal dark:text-white">{user?.fullName || 'Guest Explorer'}</p>
              <p className="text-[10px] text-luxury-charcoal/50 dark:text-white/40 uppercase tracking-[0.2em]">{user ? 'Active Mission' : 'Standby'}</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
