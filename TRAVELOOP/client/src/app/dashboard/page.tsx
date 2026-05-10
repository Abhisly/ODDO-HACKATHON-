'use client';

import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, MapPin, Calendar, Wallet, Compass, ArrowRight, TrendingUp, Globe, Star } from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import Link from 'next/link';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { format } from 'date-fns';
import { DESTINATION_DATA } from '@/lib/destinationData';

export default function DashboardPage() {
  const { user, trips, fetchTrips, loading } = useTravelStore();

  useEffect(() => {
    fetchTrips().catch(err => console.warn('Sync delayed, using cached/mock missions.'));
  }, [fetchTrips]);

  // Dynamic discovery from intelligence database
  const discoveryItems = useMemo(() => {
    return [...DESTINATION_DATA].sort(() => 0.5 - Math.random()).slice(0, 4);
  }, []);

  const stats = [
    { label: 'Journeys', value: trips.length, icon: MapPin, color: 'text-red-500' },
    { label: 'Destinations', value: trips.length > 0 ? trips.length * 2 : 12, icon: Globe, color: 'text-blue-500' },
    { label: 'Budget Planned', value: `$${trips.reduce((acc, t) => acc + (t.estimatedBudget || 0), 0).toLocaleString() || '4,250'}`, icon: Wallet, color: 'text-green-500' },
  ];

  return (
    <div className="editorial-container pt-32 pb-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-red-600 mb-3">Intelligence Command</p>
            <h1 className="text-4xl md:text-6xl font-serif font-medium text-luxury-charcoal dark:text-white">
              Welcome, {user?.fullName?.split(' ')[0] || 'Explorer'}
            </h1>
          </motion.div>
          
          <Link href="/planner">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-luxury px-8 py-4 flex items-center gap-3 shadow-2xl shadow-red-600/20"
            >
              <Plus className="w-5 h-5" />
              Initialize New Mission
            </motion.button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassPanel className="p-8 hover:border-red-500/30 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm font-bold tracking-widest uppercase text-luxury-charcoal/50 dark:text-white/40 mb-1">{stat.label}</p>
                <p className="text-3xl font-serif font-medium text-luxury-charcoal dark:text-white">{stat.value}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Content: Recent Trips */}
          <div className="lg:col-span-2 space-y-10">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-3xl font-medium text-luxury-charcoal dark:text-white">Recent Deployments</h2>
              <Link href="/trips" className="text-red-600 font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map(i => (
                  <div key={i} className="h-64 rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : trips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {trips.slice(0, 4).map((trip, i) => (
                  <Link key={trip.id} href={`/trips/${trip.id}`}>
                    <div className="group relative rounded-3xl overflow-hidden aspect-video border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500">
                      <img src={trip.destination?.heroImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80'} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-red-600 rounded">
                            {trip.status}
                          </span>
                        </div>
                        <h3 className="font-serif text-2xl font-medium">{trip.title}</h3>
                        <p className="text-xs text-white/60 flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3" /> {format(new Date(trip.startDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="h-64 rounded-3xl border-2 border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center text-center p-8 bg-white/40 dark:bg-zinc-900/40">
                <Compass className="w-12 h-12 text-luxury-charcoal/20 dark:text-white/20 mb-4" />
                <p className="font-serif text-xl text-luxury-charcoal/60 dark:text-white/40 font-medium">No missions active</p>
                <p className="text-sm text-luxury-charcoal/40 dark:text-white/30 mb-6">Initialize your first travel mission to begin intelligence gathering.</p>
                <Link href="/planner">
                  <button className="text-red-600 font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform">Start Planning Now →</button>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar: Recommendations & Updates */}
          <div className="space-y-10">
            <div>
              <h2 className="font-serif text-3xl font-medium text-luxury-charcoal dark:text-white mb-6">Discovery</h2>
              <div className="space-y-4">
                {discoveryItems.map((dest, i) => (
                  <Link key={dest.id} href="/planner">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-red-400/30 transition-colors group cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <img src={dest.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-luxury-charcoal dark:text-white truncate">{dest.name}</h4>
                        <p className="text-xs text-luxury-charcoal/50 dark:text-white/40">{dest.country}</p>
                      </div>
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0" />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            <GlassPanel className="p-8 bg-luxury-charcoal dark:bg-black text-white border-white/10 shadow-2xl">
              <h3 className="font-serif text-2xl mb-4 text-white">Travel Insights</h3>
              <p className="text-sm text-white/60 mb-6">Based on your recent interests, we recommend exploring Kyoto in Spring for the Sakura season.</p>
              <Link href="/discover">
                <button className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 hover:text-red-400 transition-colors">
                  Read Intelligence Report →
                </button>
              </Link>
            </GlassPanel>
          </div>

        </div>
      </div>
    </div>
  );
}
