'use client';

import React, { Suspense } from 'react';
import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import ParticleField from '@/components/canvas/ParticleField';
import ScrollProvider from './ScrollProvider';

export default function SpatialLayout({ children }: { children: React.ReactNode }) {
  return (
    <ScrollProvider>
      <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/30 relative">
        
        {/* Deep 3D Canvas Background */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
          <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
            <Suspense fallback={null}>
              <ParticleField count={1500} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        {/* 2D Atmospheric Glows & Mesh Gradients */}
        <div className="fixed inset-0 bg-mesh-glow pointer-events-none z-[1]" />
        
        {/* Holographic scanning overlay */}
        <div className="fixed inset-0 pointer-events-none z-[2] opacity-[0.015] mix-blend-screen"
             style={{
               backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #00F3FF 2px, #00F3FF 4px)`,
               backgroundSize: '100% 4px',
             }}
        />

        {/* Floating Sidebar Container */}
        <div className="fixed top-0 left-0 h-full w-24 lg:w-80 p-6 z-[50]">
          <Sidebar />
        </div>

        {/* Main Content Area - Offset by Sidebar */}
        <main className="flex-1 ml-24 lg:ml-80 relative z-[10] min-h-screen pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="spatial-container min-h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </ScrollProvider>
  );
}
