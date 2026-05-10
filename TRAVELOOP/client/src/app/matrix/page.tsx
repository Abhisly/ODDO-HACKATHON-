"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Navigation, Plane, Train, Car, ArrowRight, MapPin, Clock, DollarSign } from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function RouteMatrixPage() {
  const { trips, activeTripId } = useTravelStore();
  const activeTrip = trips.find(t => t.id === activeTripId) || trips[0];

  if (!activeTrip) return null;

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black pt-32 pb-24">
      <div className="editorial-container">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <Navigation className="w-5 h-5 text-red-600" />
            <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs">Route Matrix</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-medium text-luxury-charcoal dark:text-white mb-6">
            Connecting Your World
          </h1>
          <p className="text-luxury-charcoal/60 dark:text-white/60 text-lg">
            Visualize the flow of your journey across borders and cities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Visualization */}
          <div className="lg:col-span-8">
            <div className="glass-card p-10 border-white/20 min-h-[500px] flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent" />
              </div>

              <div className="relative z-10 space-y-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">
                  {/* Connection Line */}
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-dashed border-t border-black/10 dark:border-white/10 hidden md:block" />
                  
                  {activeTrip.itinerary.length > 0 ? (
                    activeTrip.itinerary.map((day, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.2 }}
                        className="relative z-10 flex flex-col items-center gap-4"
                      >
                        <div className="w-16 h-16 rounded-full bg-white dark:bg-zinc-800 border-2 border-red-600 flex items-center justify-center shadow-xl">
                          <MapPin className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-serif font-medium text-lg">City {i + 1}</h3>
                          <p className="text-[10px] uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40">3 Days</p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <>
                      <motion.div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-white dark:bg-zinc-800 border-2 border-red-600 flex items-center justify-center shadow-xl">
                          <MapPin className="w-8 h-8 text-red-600" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-serif font-medium text-xl">{activeTrip.destination.name}</h3>
                          <p className="text-xs uppercase tracking-[0.2em] text-red-600 mt-1">Arrival</p>
                        </div>
                      </motion.div>

                      <div className="flex-1 flex flex-col items-center gap-2">
                        <div className="px-6 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] font-bold tracking-widest uppercase">
                          780 mi • 2h 15m
                        </div>
                        <Plane className="w-6 h-6 text-luxury-charcoal/20 dark:text-white/20" />
                      </div>

                      <motion.div className="relative z-10 flex flex-col items-center gap-4 opacity-40">
                        <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 border border-dashed border-black/20 dark:border-white/20 flex items-center justify-center">
                          <Plus className="w-8 h-8 text-luxury-charcoal/20" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-serif font-medium text-xl">Next Stop</h3>
                          <p className="text-xs uppercase tracking-[0.2em] text-luxury-charcoal/20">Discovery</p>
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-black/5 dark:border-white/10">
                  <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
                    <Plane className="w-5 h-5 text-red-600 mb-4" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40 mb-1">Air Travel</h4>
                    <p className="text-lg font-medium">1 Flight</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
                    <Train className="w-5 h-5 text-red-600 mb-4" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40 mb-1">Rail Connections</h4>
                    <p className="text-lg font-medium">2 Transfers</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
                    <Car className="w-5 h-5 text-red-600 mb-4" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40 mb-1">Private Transit</h4>
                    <p className="text-lg font-medium">Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline Summary */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              <div className="p-8 bg-zinc-900 text-white rounded-[2.5rem] shadow-2xl">
                <h3 className="text-2xl font-serif font-medium mb-6">Journey Stats</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span className="text-sm opacity-60 font-medium">Total Transit Time</span>
                    </div>
                    <span className="font-bold">4.5 Hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Navigation className="w-4 h-4 text-red-500" />
                      <span className="text-sm opacity-60 font-medium">Distance Covered</span>
                    </div>
                    <span className="font-bold">1,240 mi</span>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-4 h-4 text-red-500" />
                      <span className="text-sm opacity-60 font-medium">Transit Cost</span>
                    </div>
                    <span className="text-xl font-serif font-bold">$450</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 border-white/20">
                <h3 className="font-serif font-medium mb-4">Route Efficiency</h3>
                <div className="w-full h-2 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden mb-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="h-full bg-red-600"
                  />
                </div>
                <p className="text-xs text-luxury-charcoal/60 dark:text-white/60 leading-relaxed">
                  Your current route is 85% efficient based on travel time and geographical proximity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
