'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Star, DollarSign, Plus, X, Filter } from 'lucide-react';
import { SightseeingSpot, CityDestination } from '@/lib/destinationData';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'Landmark', 'Nature', 'Food', 'Culture', 'Hidden Gem'] as const;
type Filter = typeof CATEGORIES[number];

interface Props {
  city: CityDestination;
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export default function SightseeingGallery({ city, selectedIds, onToggle }: Props) {
  const [filter, setFilter] = useState<Filter>('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = city.spots.filter(s => filter === 'All' || s.category === filter);

  return (
    <div className="space-y-5">
      {/* Filter Pills */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              'px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all',
              filter === cat
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white/60 dark:bg-white/10 text-luxury-charcoal/70 dark:text-white/60 border border-black/10 dark:border-white/10 hover:border-red-400'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((spot, i) => {
            const isSelected = selectedIds.includes(spot.id);
            const isExpanded = expanded === spot.id;

            return (
              <motion.div
                key={spot.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'group relative rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer',
                  isSelected
                    ? 'border-red-500 shadow-[0_0_0_2px_rgba(220,38,38,0.25)] shadow-xl'
                    : 'border-white/20 dark:border-white/10 hover:border-red-400/50 shadow-md hover:shadow-xl'
                )}
                onClick={() => setExpanded(isExpanded ? null : spot.id)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest bg-black/50 backdrop-blur-md text-white/90 px-2.5 py-1 rounded-full border border-white/10">
                    {spot.category}
                  </span>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full border border-white/10">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {spot.rating}
                  </div>

                  {/* Add/Remove toggle */}
                  <button
                    onClick={e => { e.stopPropagation(); onToggle(spot.id); }}
                    className={cn(
                      'absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg',
                      isSelected
                        ? 'bg-red-600 text-white'
                        : 'bg-white/90 text-luxury-charcoal hover:bg-red-600 hover:text-white'
                    )}
                  >
                    {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>

                  {/* Name on image */}
                  <div className="absolute bottom-3 left-3 right-14">
                    <h4 className="text-white font-serif font-semibold text-base leading-tight">{spot.name}</h4>
                  </div>
                </div>

                {/* Info strip */}
                <div className={cn(
                  'px-4 py-3 flex items-center gap-4 text-xs',
                  'bg-white/60 dark:bg-white/5 backdrop-blur-xl'
                )}>
                  <span className="flex items-center gap-1 text-luxury-charcoal/70 dark:text-white/60">
                    <Clock className="w-3 h-3" /> {spot.durationHours}h
                  </span>
                  <span className="flex items-center gap-1 text-luxury-charcoal/70 dark:text-white/60">
                    <DollarSign className="w-3 h-3" /> {spot.estimatedCost === 0 ? 'Free' : `$${spot.estimatedCost}`}
                  </span>
                </div>

                {/* Expanded Description */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-white/80 dark:bg-white/5 backdrop-blur-xl border-t border-black/5 dark:border-white/10"
                    >
                      <p className="px-4 py-3 text-sm text-luxury-charcoal/80 dark:text-white/70 leading-relaxed">{spot.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-luxury-charcoal/40 dark:text-white/30">
          <p className="font-medium">No places in this category yet.</p>
        </div>
      )}
    </div>
  );
}
