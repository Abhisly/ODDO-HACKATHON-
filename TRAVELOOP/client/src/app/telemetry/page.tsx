'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TelemetryPage() {
  return (
    <div className="editorial-container pt-32 md:pt-40 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-luxury-charcoal mb-4">
          Travel Budget
        </h1>
        <p className="text-xl text-luxury-charcoal/60 font-light leading-relaxed mb-12">
          Elegant insights into your travel expenditure.
        </p>
        
        <div className="h-96 rounded-2xl border border-black/5 bg-white flex items-center justify-center">
          <p className="text-luxury-charcoal/40 font-serif italic text-xl">Financial analytics loading...</p>
        </div>
      </motion.div>
    </div>
  );
}
