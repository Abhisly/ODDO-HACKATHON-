import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeader({ title, subtitle, eyebrow, align = 'left', className }: SectionHeaderProps) {
  const alignments = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn("max-w-3xl mb-12", alignments[align], className)}
    >
      {eyebrow && (
        <span className="block text-sm font-bold tracking-[0.2em] uppercase text-luxury-forest mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-luxury-charcoal mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-luxury-charcoal/60 font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
