"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Compass, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SignupPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate signup
    setTimeout(() => {
      window.location.href = '/discover';
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1493246507139-91e8bef99c02" 
          alt="Travel background" 
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="glass-card p-10 border-white/20">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-4 shadow-2xl shadow-red-600/40">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-luxury-charcoal dark:text-white">Create Account</h1>
            <p className="text-luxury-charcoal/60 dark:text-white/60 text-sm mt-2">Start your premium travel journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-luxury-charcoal dark:text-white/80 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-charcoal/40 dark:text-white/40" />
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-red-600 dark:focus:border-red-600 outline-none transition-all text-luxury-charcoal dark:text-white"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-luxury-charcoal dark:text-white/80 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-charcoal/40 dark:text-white/40" />
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-red-600 dark:focus:border-red-600 outline-none transition-all text-luxury-charcoal dark:text-white"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-luxury-charcoal dark:text-white/80 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-charcoal/40 dark:text-white/40" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-red-600 dark:focus:border-red-600 outline-none transition-all text-luxury-charcoal dark:text-white"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full btn-luxury py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-luxury-charcoal/60 dark:text-white/60 text-sm">
              Already have an account? <Link href="/login" className="text-red-600 font-bold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
