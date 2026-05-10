'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GripVertical, X, Clock, DollarSign, MapPin, Minus, Plus, Calendar } from 'lucide-react';
import { CityDestination } from '@/lib/destinationData';
import { cn } from '@/lib/utils';

export interface TripStop {
  city: CityDestination;
  days: number;
  selectedSpotIds: string[];
}

interface Props {
  stop: TripStop;
  index: number;
  startDay: number;
  onRemove: () => void;
  onChangeDays: (days: number) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  isDragging?: boolean;
}

export default function DestinationStopCard({ stop, index, startDay, onRemove, onChangeDays, dragHandleProps, isDragging }: Props) {
  const endDay = startDay + stop.days - 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative rounded-2xl overflow-hidden border transition-all duration-300',
        'bg-white/60 dark:bg-white/5 backdrop-blur-xl',
        isDragging
          ? 'border-red-500 shadow-2xl scale-[1.02]'
          : 'border-white/30 dark:border-white/10 hover:border-red-400/40 shadow-lg'
      )}
    >
      {/* Hero Image */}
      <div className="relative h-36 overflow-hidden">
        <img src={stop.city.image} alt={stop.city.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Index Badge */}
        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-red-600 text-white text-sm font-bold flex items-center justify-center shadow-lg">
          {index + 1}
        </div>

        {/* Day Range Badge */}
        <div className="absolute top-3 right-12 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Day {startDay}–{endDay}
        </div>

        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-red-600 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* City name on image */}
        <div className="absolute bottom-3 left-3">
          <h3 className="text-white font-serif font-bold text-xl leading-none">{stop.city.name}</h3>
          <p className="text-white/70 text-xs mt-1">{stop.city.countryCode} {stop.city.country}</p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex items-center justify-between gap-4">
        {/* Drag Handle */}
        <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing text-luxury-charcoal/30 dark:text-white/30 hover:text-red-500 transition-colors p-1">
          <GripVertical className="w-5 h-5" />
        </div>

        {/* Stats */}
        <div className="flex gap-4 flex-1 text-xs text-luxury-charcoal/60 dark:text-white/60">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-red-500" />
            {stop.city.spots.length} places
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-red-500" />
            ${(stop.city.costPerDay * stop.days).toLocaleString()} est.
          </span>
        </div>

        {/* Days Stepper */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onChangeDays(Math.max(1, stop.days - 1))}
            className="w-7 h-7 rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="font-serif font-bold text-luxury-charcoal dark:text-white w-16 text-center text-sm">
            {stop.days} {stop.days === 1 ? 'day' : 'days'}
          </span>
          <button
            onClick={() => onChangeDays(stop.days + 1)}
            className="w-7 h-7 rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Selected spots strip */}
      {stop.selectedSpotIds.length > 0 && (
        <div className="px-4 pb-3 flex gap-2 flex-wrap">
          {stop.selectedSpotIds.map(id => {
            const spot = stop.city.spots.find(s => s.id === id);
            if (!spot) return null;
            return (
              <span key={id} className="text-xs bg-red-600/10 dark:bg-red-600/20 text-red-700 dark:text-red-300 border border-red-600/20 px-2.5 py-1 rounded-full font-medium">
                {spot.name}
              </span>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
