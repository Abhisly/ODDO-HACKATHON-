"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

import { LampContainer } from '@/components/ui/lamp';
import { ImageAutoSlider } from '@/components/ui/image-auto-slider';

export default function RootPage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col justify-end">
      <LampContainer className="rounded-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-center flex flex-col items-center mx-auto relative z-10 editorial-container w-full pt-32"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-red-600/60 dark:bg-red-500/60" />
            <p className="text-red-700 dark:text-red-400 font-bold tracking-[0.2em] uppercase text-sm">Your Next Adventure</p>
            <span className="w-12 h-px bg-red-600/60 dark:bg-red-500/60" />
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[90px] font-serif font-medium leading-[1.1] tracking-tight text-luxury-charcoal dark:text-white mb-8 drop-shadow-xl transition-colors duration-500">
            Where do you want <br/> to travel?
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full mb-16">
            <Link 
              href="/dashboard" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-red-600 text-white font-medium text-lg tracking-wide transition-transform hover:scale-105 shadow-2xl"
            >
              Plan Your Journey <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Infinite Image Auto Slider */}
          <div className="w-full">
            <ImageAutoSlider />
          </div>
        </motion.div>
      </LampContainer>
    </div>
  );
}
