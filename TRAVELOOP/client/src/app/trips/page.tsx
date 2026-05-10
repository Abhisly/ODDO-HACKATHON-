'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List as ListIcon, Calendar, MapPin, Search, Trash2, ArrowRight } from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TripCard } from '@/components/features/TripCard';
import { SearchBar } from '@/components/features/SearchBar';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { toast } from 'sonner';
import Link from 'next/link';

export default function MyTripsPage() {
  const { trips, deleteTrip } = useTravelStore();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Planning' | 'Upcoming' | 'Completed'>('All');

  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
      const matchesSearch = trip.destination.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || trip.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [trips, searchQuery, statusFilter]);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    deleteTrip(id);
    toast('Trip deleted successfully');
  };

  return (
    <div className="editorial-container pt-32 pb-24">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
        <SectionHeader 
          eyebrow="Portfolio"
          title="Your Journeys"
          subtitle="Manage your upcoming adventures and past memories."
          className="mb-0"
        />
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
          <div className="w-full sm:w-72">
            <SearchBar 
              placeholder="Search trips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-4 rounded-full border transition-colors ${viewMode === 'grid' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-luxury-charcoal/40 border-black/10 hover:border-black/30'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-4 rounded-full border transition-colors ${viewMode === 'list' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-luxury-charcoal/40 border-black/10 hover:border-black/30'}`}
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide">
        {['All', 'Planning', 'Upcoming', 'Completed'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status as any)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap border ${statusFilter === status ? 'bg-luxury-charcoal text-white border-luxury-charcoal shadow-md' : 'bg-white text-luxury-charcoal/60 border-black/5 hover:border-black/20 shadow-sm'}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTrips.map((trip, i) => (
              <motion.div
                key={trip.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative"
              >
                <Link href={`/trips/${trip.id}`}>
                  <TripCard trip={trip} index={i} />
                </Link>
                <button 
                  onClick={(e) => handleDelete(e, trip.id)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-red-500/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredTrips.map((trip, i) => (
              <motion.div
                key={trip.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white border border-black/5 rounded-3xl p-6 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 hidden sm:block">
                  <img src={trip.destination.image} alt={trip.destination.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-2xl font-medium text-luxury-charcoal">{trip.destination.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${trip.status === 'Completed' ? 'bg-luxury-beige text-luxury-charcoal/60 border-black/5' : 'bg-red-600/5 text-red-600 border-red-600/20'}`}>
                      {trip.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-luxury-charcoal/60 mb-6">
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(trip.startDate).toLocaleDateString()}</span>
                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {trip.travelers} Travelers</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Link href={`/trips/${trip.id}`} className="text-red-600 font-bold tracking-widest text-xs uppercase hover:underline flex items-center gap-2">
                      View Document <ArrowRight className="w-3 h-3" />
                    </Link>
                    <button 
                      onClick={(e) => handleDelete(e, trip.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Empty State */}
      {filteredTrips.length === 0 && (
        <div className="py-32 text-center flex flex-col items-center border border-dashed border-black/10 rounded-3xl mt-8">
          <Calendar className="w-12 h-12 text-luxury-charcoal/20 mb-4" />
          <h3 className="text-2xl font-serif text-luxury-charcoal">No trips found</h3>
          <p className="text-luxury-charcoal/50 mt-2 mb-8">You haven't planned any journeys matching these filters.</p>
          <AnimatedButton onClick={() => window.location.href = '/dashboard/create'}>
            Plan a New Trip
          </AnimatedButton>
        </div>
      )}
      
    </div>
  );
}
