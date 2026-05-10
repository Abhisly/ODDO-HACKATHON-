'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Calendar, Map as MapIcon, Menu, X, BookOpen, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ResponsiveSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: Compass },
    { name: 'Route Matrix', href: '/matrix', icon: MapIcon },
    { name: 'Logistics', href: '/telemetry', icon: Calendar },
    { name: 'AI Concierge', href: '/concierge', icon: MessageSquare },
    { name: 'Journal', href: '/missions', icon: BookOpen },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-40 lg:hidden p-3 bg-white/80 backdrop-blur-md rounded-full shadow-md border border-black/5 text-luxury-charcoal"
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
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Content */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-luxury-cream border-r border-black/5 shadow-2xl lg:shadow-none lg:translate-x-0 flex flex-col transition-transform duration-300 ease-in-out lg:hidden"
        )}
      >
        <div className="p-8 flex justify-between items-center">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-serif font-medium tracking-tight text-luxury-charcoal">
            Traveloop.
          </Link>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-black/5 lg:hidden">
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
                  "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-medium",
                  isActive 
                    ? "bg-luxury-forest text-white shadow-md" 
                    : "text-luxury-charcoal/70 hover:bg-black/5 hover:text-luxury-charcoal"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-black/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-luxury-charcoal text-white flex items-center justify-center font-serif text-lg">
              A
            </div>
            <div>
              <p className="font-medium text-sm">Alex Traveler</p>
              <p className="text-xs text-luxury-charcoal/50">Pro Member</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
