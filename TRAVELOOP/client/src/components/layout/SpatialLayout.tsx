'use client';

import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpatialLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#050505] text-white selection:bg-orange-500/30 overflow-hidden">
      {/* Background Cinematic Mesh */}
      <div className="fixed inset-0 bg-mesh-glow pointer-events-none z-0" />
      
      {/* Ambient Particle Layer (Placeholder for Three.js) */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute inset-0 hologram-overlay" />
      </div>

      <Sidebar />

      <main className="flex-1 relative z-10 overflow-y-auto h-screen custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="spatial-container"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Cinematic Overlays */}
      <div className="fixed top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent z-50" />
      <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-50" />
    </div>
  );
}
