'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-glow opacity-50" />
      <div className="absolute inset-0 hologram-overlay opacity-20" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="z-10 text-center"
      >
        <div className="w-24 h-24 bg-orange-600 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-[0_0_50px_rgba(255,77,0,0.5)] border-4 border-white/20 animate-float">
          <span className="font-bold text-4xl">T</span>
        </div>
        <h1 className="text-4xl font-bold tracking-[0.5em] uppercase mb-4">Traveloop</h1>
        <p className="text-[10px] font-mono tracking-[0.8em] uppercase text-orange-500 animate-pulse">Initializing System Protocol...</p>
      </motion.div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-px bg-white/5 overflow-hidden">
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 3, ease: "linear" }}
          className="w-full h-full bg-orange-500"
        />
      </div>
    </div>
  );
}
