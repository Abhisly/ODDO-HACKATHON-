'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RootPage() {
  return (
    <div className="relative w-full min-h-screen bg-luxury-charcoal flex flex-col justify-end pb-24 md:pb-32 overflow-hidden">
      
      {/* Cinematic Fullscreen Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2920&auto=format&fit=crop)' }}
        />
        {/* Soft, luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 mix-blend-multiply" />
      </div>

      <div className="relative z-10 editorial-container w-full pt-48">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-white/60" />
              <p className="text-white/80 font-medium tracking-[0.2em] uppercase text-sm">Curated Experiences</p>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-serif font-medium leading-[0.95] tracking-tight text-white mb-8 drop-shadow-xl">
              Discover the Art <br/> of Travel.
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl mb-12 leading-relaxed">
              Plan elegant, unforgettable journeys with AI-powered storytelling and meticulous itineraries tailored perfectly to your taste.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link 
                href="/dashboard" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-white text-luxury-charcoal font-medium text-lg tracking-wide transition-transform hover:scale-105 shadow-2xl"
              >
                Plan Your Journey <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="group flex items-center gap-4 text-white hover:text-white/80 transition-colors">
                <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-medium tracking-wide uppercase text-sm">Explore Destinations</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
