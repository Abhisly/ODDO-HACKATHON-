"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Search, Trash2, ArrowRight, Clock, Plus } from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Link from 'next/link';

export default function MyTripsPage() {
  const { trips, deleteActivity } = useTravelStore(); // Note: mock store deleteTrip might be missing, using a placeholder
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.destination.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'All' || trip.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black pt-32 pb-24">
      <div className="editorial-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-red-600" />
              <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs">Portfolio</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-medium text-luxury-charcoal dark:text-white mb-4">
              Your Journeys
            </h1>
            <p className="text-luxury-charcoal/60 dark:text-white/60 max-w-md">
              A curated collection of your past adventures and upcoming escapes.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
          >
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-charcoal/40" />
              <input 
                type="text" 
                placeholder="Search trips..."
                className="w-full pl-10 pr-4 py-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none focus:border-red-600/40 transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link href="/planner" className="btn-luxury py-3 px-8 text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Trip
            </Link>
          </motion.div>
        </div>

        {/* Status Filters */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {['All', 'Planning', 'Upcoming', 'Completed'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all border",
                filter === s 
                  ? "bg-luxury-charcoal dark:bg-white text-white dark:text-luxury-charcoal border-luxury-charcoal dark:border-white" 
                  : "bg-transparent text-luxury-charcoal/60 dark:text-white/60 border-black/10 dark:border-white/10 hover:border-red-600/40"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTrips.map((trip, i) => (
              <motion.div
                key={trip.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative"
              >
                <div className="editorial-card group h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={trip.destination.image} 
                      alt={trip.destination.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white uppercase tracking-widest">
                      {trip.status}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40 mb-4">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span className="w-1 h-1 rounded-full bg-black/10 dark:bg-white/10" />
                      <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {trip.destination.name}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-medium mb-6 text-luxury-charcoal dark:text-white group-hover:text-red-600 transition-colors">
                      Journey to {trip.destination.name}
                    </h3>
                    <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                      <Link 
                        href={`/planner?tripId=${trip.id}`} 
                        className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase group-hover:gap-4 transition-all text-red-600"
                      >
                        View Details <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => toast.error("Delete functionality placeholder")}
                        className="p-2 text-luxury-charcoal/20 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredTrips.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center flex flex-col items-center border border-dashed border-black/10 dark:border-white/10 rounded-[40px]"
          >
            <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-luxury-charcoal/20 dark:text-white/20" />
            </div>
            <h3 className="text-3xl font-serif text-luxury-charcoal dark:text-white mb-2">No journeys found</h3>
            <p className="text-luxury-charcoal/50 dark:text-white/50 mb-8 max-w-xs mx-auto">
              You haven't planned any trips that match your current search criteria.
            </p>
            <Link href="/planner" className="btn-luxury px-10">
              Plan New Trip
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
