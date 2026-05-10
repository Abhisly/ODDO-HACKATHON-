'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Clock, MapPin, Plus } from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SearchBar } from '@/components/features/SearchBar';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog';
import { toast } from 'sonner';
import { MOCK_ACTIVITIES_CATALOG } from '@/lib/mockData';

const CATEGORIES = ['All', 'Experience', 'Dining', 'Sightseeing', 'Adventure', 'Cultural'];

export default function ActivitiesPage() {
  const { activeTripId, trips, addActivity } = useTravelStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  
  // State for Add to Itinerary Modal
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  const activeTrip = trips.find(t => t.id === activeTripId);

  const filteredActivities = useMemo(() => {
    return MOCK_ACTIVITIES_CATALOG.filter(act => {
      const matchesSearch = act.title.toLowerCase().includes(searchQuery.toLowerCase()) || act.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || act.type === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleAddToItinerary = () => {
    if (!activeTrip || !selectedActivity) return;
    
    addActivity(activeTrip.id, selectedDay, {
      id: `act-cat-${Date.now()}`,
      title: selectedActivity.title,
      time: selectedTime,
      type: selectedActivity.type
    });
    
    toast(`Added ${selectedActivity.title} to Day ${selectedDay + 1}`);
    setSelectedActivity(null);
  };

  return (
    <div className="editorial-container pt-32 pb-24">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
        <SectionHeader 
          eyebrow="Global Experiences"
          title="Activity Catalog"
          subtitle="Curated, world-class experiences to elevate your journey."
          className="mb-0"
        />
        <div className="w-full md:w-96 shrink-0">
          <SearchBar 
            placeholder="Search experiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start lg:items-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-black/5 shadow-sm shrink-0">
          <Filter className="w-4 h-4 text-luxury-charcoal/40" />
          <span className="text-sm font-bold tracking-widest uppercase text-luxury-charcoal/60">Filters</span>
        </div>
        
        <div className="flex-1 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide flex gap-3">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap border ${selectedCategory === category ? 'bg-red-600 text-white border-red-600' : 'bg-white text-luxury-charcoal/60 border-black/5 hover:border-black/20 shadow-sm'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredActivities.map((act) => (
            <motion.div
              key={act.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group bg-white rounded-3xl border border-black/5 overflow-hidden hover:shadow-xl transition-all flex flex-col h-full"
            >
              <div className="h-64 relative overflow-hidden shrink-0">
                <img src={act.image} alt={act.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20">
                    {act.type}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                   <h3 className="text-2xl font-serif text-white font-medium drop-shadow-md leading-tight">{act.title}</h3>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-luxury-charcoal/70 text-sm leading-relaxed flex-1 mb-6">
                  {act.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm font-medium text-luxury-charcoal/80">
                    <Clock className="w-4 h-4 text-red-600" /> {act.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-luxury-charcoal/80">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {act.rating} ({act.reviews})
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <span className="font-serif text-xl font-medium">${act.price} <span className="font-sans text-xs text-luxury-charcoal/50 uppercase tracking-widest font-bold">/ person</span></span>
                  <button 
                    onClick={() => setSelectedActivity(act)}
                    className="w-10 h-10 rounded-full bg-red-600/10 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredActivities.length === 0 && (
        <div className="py-32 text-center flex flex-col items-center border border-dashed border-black/10 rounded-3xl mt-8">
          <MapPin className="w-12 h-12 text-luxury-charcoal/20 mb-4" />
          <h3 className="text-2xl font-serif text-luxury-charcoal">No activities found</h3>
          <p className="text-luxury-charcoal/50 mt-2">Try adjusting your filters to find more experiences.</p>
        </div>
      )}

      {/* Add to Itinerary Modal */}
      <Dialog open={!!selectedActivity} onOpenChange={(open) => !open && setSelectedActivity(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedActivity && (
            <>
              <DialogHeader>
                <DialogTitle>Add to Itinerary</DialogTitle>
                <DialogDescription>Schedule "{selectedActivity.title}" to your active trip.</DialogDescription>
              </DialogHeader>
              
              {!activeTrip ? (
                <div className="py-8 text-center">
                  <p className="text-luxury-charcoal/60 mb-4">You need an active trip to add activities.</p>
                  <AnimatedButton onClick={() => window.location.href = '/dashboard/create'} className="w-full">
                    Plan a Trip
                  </AnimatedButton>
                </div>
              ) : (
                <div className="space-y-6 py-4">
                  <div className="p-4 bg-luxury-beige/30 rounded-xl border border-black/5">
                     <p className="text-xs uppercase tracking-widest text-luxury-charcoal/50 font-bold mb-1">Active Trip</p>
                     <p className="font-serif font-medium text-lg">{activeTrip.destination.name}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/60 mb-2 block">Day</label>
                      <select 
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600"
                      >
                        {activeTrip.itinerary.map((day, idx) => (
                          <option key={idx} value={idx}>Day {day.day} - {new Date(day.date).toLocaleDateString()}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/60 mb-2 block">Time</label>
                      <input 
                        type="time" 
                        value={selectedTime.split(' ')[0]} // Basic mapping
                        onChange={(e) => {
                          const timeString = e.target.value;
                          let hour = parseInt(timeString.split(':')[0]);
                          const suffix = hour >= 12 ? 'PM' : 'AM';
                          hour = hour % 12 || 12;
                          setSelectedTime(`${hour}:${timeString.split(':')[1]} ${suffix}`);
                        }}
                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {activeTrip && (
                <div className="flex justify-end gap-3 mt-4">
                  <button onClick={() => setSelectedActivity(null)} className="px-6 py-3 rounded-xl border border-black/10 font-bold text-sm">Cancel</button>
                  <AnimatedButton onClick={handleAddToItinerary}>Add Activity</AnimatedButton>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
