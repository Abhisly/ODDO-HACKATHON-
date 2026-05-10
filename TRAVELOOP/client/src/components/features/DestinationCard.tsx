import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlassPanel } from '../ui/GlassPanel';

interface DestinationCardProps {
  id: string;
  name: string;
  image: string;
  category: string;
  priceLevel: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export function DestinationCard({ id, name, image, category, priceLevel, onClick, isSelected }: DestinationCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={cn(
        "group relative h-80 rounded-3xl overflow-hidden cursor-pointer border-2 transition-all duration-300",
        isSelected ? "border-luxury-forest shadow-lg scale-[1.02]" : "border-transparent"
      )}
    >
      <div className="absolute inset-0 cinematic-image-container">
        <img src={image} alt={name} className="cinematic-image" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-1 block">
              {category}
            </span>
            <h3 className="font-serif text-3xl text-white font-medium tracking-tight">
              {name}
            </h3>
          </div>
          <GlassPanel intensity="heavy" border={false} className="px-3 py-1 rounded-full">
            <span className="text-luxury-charcoal font-bold tracking-widest text-xs">{priceLevel}</span>
          </GlassPanel>
        </div>
      </div>
    </motion.div>
  );
}
