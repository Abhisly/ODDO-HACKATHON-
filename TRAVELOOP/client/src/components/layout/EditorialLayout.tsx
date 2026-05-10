'use client';

import React from 'react';
import ElegantNavbar from './ElegantNavbar';
import ScrollProvider from './ScrollProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function EditorialLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <ScrollProvider>
      <div className="min-h-screen bg-luxury-cream text-luxury-charcoal selection:bg-luxury-forest selection:text-white flex flex-col font-sans">
        
        {/* Background Subtle Gradient Overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-br from-luxury-cream via-white to-luxury-beige opacity-50" />
        
        <ElegantNavbar />
        
        <main className="flex-1 relative z-10 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full min-h-screen"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        
        {/* Minimal Footer */}
        <footer className="relative z-10 w-full py-12 border-t border-black/5 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold">Traveloop.</span>
              <span className="text-sm text-luxury-charcoal/60">© 2045 Luxury Travel Inc.</span>
            </div>
            <div className="flex gap-6 text-sm font-medium text-luxury-charcoal/70">
              <a href="#" className="hover:text-luxury-forest transition-colors">Privacy</a>
              <a href="#" className="hover:text-luxury-forest transition-colors">Terms</a>
              <a href="#" className="hover:text-luxury-forest transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </ScrollProvider>
  );
}
