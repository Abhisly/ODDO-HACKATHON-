'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="hero-glow" />
      
      {/* Navigation */}
      <nav className="absolute top-0 w-full max-w-7xl flex items-center justify-between p-6 z-10">
        <div className="text-2xl font-bold tracking-tighter">
          TRAVEL<span className="text-purple-500">OOP</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Destinations</a>
          <a href="#" className="hover:text-foreground transition-colors">AI Planner</a>
          <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
        </div>
        <button className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-all">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <div className="text-center z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-tight">
            Plan your next <br />
            <span className="gradient-text">masterpiece.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Traveloop uses advanced AI to craft personalized, high-fidelity itineraries 
            tailored to your unique taste and budget.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all shadow-lg shadow-purple-500/20">
            Start Planning Free
          </button>
          <button className="px-8 py-4 rounded-xl glass hover:bg-white/10 font-bold transition-all">
            View Live Demo
          </button>
        </motion.div>
      </div>

      {/* Background Element */}
      <div className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-background to-transparent z-0" />
      
      {/* Floating UI Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/4 right-[10%] hidden xl:block"
      >
        <div className="glass p-4 w-64 animate-float">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20" />
            <div className="space-y-1">
              <div className="h-2 w-20 bg-white/20 rounded" />
              <div className="h-2 w-12 bg-white/10 rounded" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full bg-white/5 rounded" />
            <div className="h-2 w-full bg-white/5 rounded" />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
