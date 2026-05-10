'use client';

import React from 'react';
import ElegantNavbar from './ElegantNavbar';
import ScrollProvider from './ScrollProvider';
import { ResponsiveSidebar } from './ResponsiveSidebar';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function EditorialLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <ScrollProvider>
      <div className="min-h-screen text-luxury-charcoal dark:text-white selection:bg-red-500 selection:text-white flex font-sans transition-colors duration-500">
        
        <ResponsiveSidebar />
        
        <div className="flex-1 flex flex-col min-h-screen w-full lg:w-auto overflow-x-hidden relative z-10">
          <ElegantNavbar />
          
          <main className="flex-1 w-full relative">
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
          <footer className="relative z-10 w-full py-12 border-t border-black/5 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl">
            <div className="w-full px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-bold dark:text-white">Traveloop.</span>
                <span className="text-sm text-luxury-charcoal/60 dark:text-white/60">© 2045 Luxury Travel Inc.</span>
              </div>
              <div className="flex gap-6 text-sm font-medium text-luxury-charcoal/70 dark:text-white/70">
                <a href="#" className="hover:text-red-500 transition-colors">Privacy</a>
                <a href="#" className="hover:text-red-500 transition-colors">Terms</a>
                <a href="#" className="hover:text-red-500 transition-colors">Contact</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ScrollProvider>
  );
}
