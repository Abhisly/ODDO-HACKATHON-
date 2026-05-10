'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cpu, Wifi, Zap } from 'lucide-react';

export default function RootPage() {
  const router = useRouter();
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    const steps = [
      'Synchronizing Neural Core...',
      'Mapping Orbital Trajectories...',
      'Establishing Secure Uplink...',
      'Welcome Commander.'
    ];

    const timer = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(timer);
        setTimeout(() => router.push('/dashboard'), 1000);
        return prev;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-mesh-glow opacity-50" />
      <div className="fixed inset-0 hologram-overlay opacity-30" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="z-10 text-center space-y-12"
      >
        <div className="relative">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              boxShadow: [
                '0 0 40px rgba(255,77,0,0.3)',
                '0 0 80px rgba(255,77,0,0.5)',
                '0 0 40px rgba(255,77,0,0.3)'
              ]
            }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, boxShadow: { duration: 2, repeat: Infinity } }}
            className="w-32 h-32 bg-orange-600 rounded-3xl mx-auto flex items-center justify-center border-4 border-white/20 relative z-10"
          >
            <span className="font-black text-6xl italic -tracking-tighter">T</span>
          </motion.div>
          
          {/* Orbital Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full border-dashed animate-[spin_60s_linear_infinite]" />
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-[0.6em] uppercase italic text-white drop-shadow-2xl">
            Traveloop
          </h1>
          <div className="flex flex-col items-center gap-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={loadingStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs font-mono tracking-[0.4em] uppercase text-orange-500 font-bold h-4"
              >
                {[
                  'Synchronizing Neural Core...',
                  'Mapping Orbital Trajectories...',
                  'Establishing Secure Uplink...',
                  'Welcome Commander.'
                ][loadingStep]}
              </motion.p>
            </AnimatePresence>
            
            <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-orange-500 shadow-[0_0_15px_rgba(255,77,0,0.8)]"
                initial={{ width: '0%' }}
                animate={{ width: `${(loadingStep + 1) * 25}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>

        {/* Telemetry Status Bar */}
        <div className="flex gap-12 pt-12">
          {[
            { icon: Cpu, label: 'CPU', val: 'OPTIMAL' },
            { icon: Wifi, label: 'SYNC', val: 'STABLE' },
            { icon: ShieldCheck, label: 'AUTH', val: 'SECURE' },
            { icon: Zap, label: 'PWR', val: 'NOMINAL' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <stat.icon className="w-4 h-4 text-zinc-600" />
              <p className="text-[8px] font-mono tracking-widest text-zinc-700 uppercase font-bold">{stat.label}</p>
              <p className="text-[10px] font-mono tracking-widest text-cyan-500 uppercase font-black">{stat.val}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Grid Scan Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="h-full w-px bg-white/20 absolute left-1/4" />
        <div className="h-full w-px bg-white/20 absolute left-1/2" />
        <div className="h-full w-px bg-white/20 absolute left-3/4" />
        <div className="w-full h-px bg-white/20 absolute top-1/4" />
        <div className="w-full h-px bg-white/20 absolute top-1/2" />
        <div className="w-full h-px bg-white/20 absolute top-3/4" />
      </div>
    </div>
  );
}
