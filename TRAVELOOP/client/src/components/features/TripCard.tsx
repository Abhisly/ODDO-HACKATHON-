import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';
import { Trip } from '@/lib/store';

interface TripCardProps {
  trip: Trip;
  index?: number;
}

export function TripCard({ trip, index = 0 }: TripCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.8 }}
      className="editorial-card group relative h-[300px] overflow-hidden"
    >
      <div className="absolute inset-0 cinematic-image-container">
        <img src={trip.destination.image} alt={trip.destination.name} className="cinematic-image" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      
      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
        <div className="self-end px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
          {trip.status}
        </div>
        <div>
          <h3 className="font-serif text-3xl text-white font-medium tracking-tight mb-2">
            {trip.destination.name}
          </h3>
          <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
            <Calendar className="w-4 h-4" />
            {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
