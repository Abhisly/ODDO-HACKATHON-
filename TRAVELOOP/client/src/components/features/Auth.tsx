'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="hero-glow" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass w-full max-w-md p-10 z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter mb-2">
            {isLogin ? 'Welcome back' : 'Join Traveloop'}
          </h2>
          <p className="text-muted-foreground">
            {isLogin ? 'Access your masterpiece itineraries.' : 'Start your next global adventure today.'}
          </p>
        </div>

        <form className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Full Name</label>
              <input 
                type="text" 
                className="w-full glass bg-transparent px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full glass bg-transparent px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Password</label>
            <input 
              type="password" 
              className="w-full glass bg-transparent px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="••••••••"
            />
          </div>
          
          <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all shadow-lg">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-muted-foreground hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
