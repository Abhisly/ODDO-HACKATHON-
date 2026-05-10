'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Compass, Calendar, Map as MapIcon, ArrowRight, Plane, Coffee } from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import Link from 'next/link';

export default function DashboardPage() {
  const { trips } = useTravelStore();

  const upcomingTrips = trips.filter(trip => trip.status === 'Upcoming' || trip.status === 'Planning');

  const aiSuggestions = [
    { title: 'Hidden Cafes in Kyoto', type: 'Experience', icon: Coffee },
    { title: 'Optimal flight route to Naples found', type: 'Logistics', icon: Plane },
  ];

  return (
    <div className="editorial-container pt-32 md:pt-40 pb-24 space-y-20">
      
      {/* Welcome Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-luxury-charcoal mb-4">
            Welcome back.
          </h1>
          <p className="text-xl text-luxury-charcoal/60 font-light leading-relaxed">
            {upcomingTrips.length > 0 
              ? `Your journey to ${upcomingTrips[0].destination.name} is approaching. Let's refine your itinerary.`
              : `You have no upcoming trips. Let's start planning.`}
          </p>
        </motion.div>
      </section>

      {/* Primary Action Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Trip Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="editorial-card p-8 flex flex-col justify-between min-h-[300px] border border-black/5 bg-luxury-beige"
        >
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm mb-8">
            <Plus className="w-6 h-6 text-luxury-forest" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-2">Plan a New Journey</h3>
            <p className="text-luxury-charcoal/60 font-medium mb-8">Start with a blank canvas or let AI guide your destination choice.</p>
            <Link href="/dashboard/create" className="flex items-center gap-2 text-luxury-forest font-bold tracking-wide uppercase text-xs group w-fit">
              Start Planning <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Upcoming Trips */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-luxury-charcoal">Your Journeys</h2>
            <Link href="/missions" className="text-sm font-medium text-luxury-charcoal/60 hover:text-luxury-charcoal transition-colors">View All</Link>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {upcomingTrips.map((trip, i) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1), duration: 0.8 }}
                className="editorial-card group relative h-[300px]"
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
                    <h3 className="font-serif text-3xl text-white font-medium tracking-tight mb-2">{trip.destination.name}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                      <Calendar className="w-4 h-4" />
                      {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Intelligence Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="editorial-card p-8 lg:p-12 border border-black/5 bg-white"
        >
          <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <Compass className="w-5 h-5 text-luxury-forest" />
                <span className="text-sm font-bold tracking-[0.2em] uppercase text-luxury-forest">Traveloop AI Concierge</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-6">
                Insights for your upcoming journey to {upcomingTrips.length > 0 ? upcomingTrips[0].destination.name : 'your next destination'}.
              </h2>
              <div className="space-y-4">
                {aiSuggestions.map((suggestion, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-luxury-cream border border-black/5 hover:border-black/10 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <suggestion.icon className="w-5 h-5 text-luxury-charcoal" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-luxury-charcoal group-hover:text-luxury-forest transition-colors">{suggestion.title}</h4>
                      <p className="text-xs text-luxury-charcoal/50 font-medium uppercase tracking-wider">{suggestion.type}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-luxury-charcoal/30 group-hover:translate-x-1 group-hover:text-luxury-forest transition-all" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Map Preview */}
            <div className="w-full md:w-80 h-80 rounded-2xl bg-luxury-beige relative overflow-hidden border border-black/5 flex items-center justify-center group cursor-pointer">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply" />
               <MapIcon className="w-12 h-12 text-luxury-forest/30 group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute bottom-6 left-6 right-6">
                 <Link href="/matrix" className="w-full bg-white/80 backdrop-blur-md text-luxury-charcoal font-medium py-3 rounded-xl shadow-sm border border-white/50 flex justify-center hover:bg-white transition-colors">
                   Open Route Matrix
                 </Link>
               </div>
            </div>
          </div>
        </motion.div>
      </section>
      
    </div>
  );
}
