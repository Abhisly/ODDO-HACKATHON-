'use client';

import React from 'react';
import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpatialLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#050505] text-white selection:bg-orange-500/30 overflow-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 bg-mesh-glow pointer-events-none z-0" />
      <div className="fixed inset-0 hologram-overlay opacity-20 z-0 pointer-events-none" />
      
      {/* Dynamic Glows */}
      <div className="hero-glow-orange z-0" />
      <div className="hero-glow-cyan z-0" />

      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 overflow-y-auto custom-scrollbar h-full">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="spatial-container min-h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>

        {/* Global UI Decorations */}
        <div className="fixed top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none" />
      </main>
    </div>
  );
}
