"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Calendar, Clock, DollarSign, 
  ArrowRight, Check, Plus, Trash2, Sparkles, Plane, Info
} from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { format, addDays } from 'date-fns';

export default function PlannerPage() {
  const { destinations, addTrip } = useTravelStore();
  const [selectedDestinations, setSelectedDestinations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState(format(addDays(new Date(), 7), 'yyyy-MM-dd'));
  const [isSaving, setIsSaving] = useState(false);

  // Filter destinations for search
  const searchResults = destinations.filter(dest => 
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedDestinations.find(s => s.id === dest.id)
  ).slice(0, 5);

  const addDestination = (dest: any) => {
    setSelectedDestinations([...selectedDestinations, { ...dest, duration: 3, activities: [] }]);
    setSearchQuery('');
  };

  const removeDestination = (id: string) => {
    setSelectedDestinations(selectedDestinations.filter(d => d.id !== id));
  };

  const updateDuration = (id: string, days: number) => {
    setSelectedDestinations(selectedDestinations.map(d => 
      d.id === id ? { ...d, duration: Math.max(1, days) } : d
    ));
  };

  const totalDays = selectedDestinations.reduce((acc, curr) => acc + curr.duration, 0);
  const totalBudget = selectedDestinations.reduce((acc, curr) => acc + (curr.priceLevel.length * 50 * curr.duration), 0);

  const handleSave = async () => {
    if (selectedDestinations.length === 0) {
      toast.error("Please add at least one destination");
      return;
    }
    setIsSaving(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 2000));
    
    addTrip({
      id: `trip-${Date.now()}`,
      destination: selectedDestinations[0],
      startDate,
      endDate: format(addDays(new Date(startDate), totalDays), 'yyyy-MM-dd'),
      status: 'Upcoming',
      budget: totalBudget,
      travelers: 1,
      itinerary: []
    });

    setIsSaving(false);
    toast.success("Trip planned successfully!");
    window.location.href = '/trips';
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black pt-32 pb-24">
      <div className="editorial-container">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Input & Selection */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-red-600" />
                <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs">AI Planner</span>
              </div>
              <h1 className="text-5xl font-serif font-medium text-luxury-charcoal dark:text-white mb-6">
                Where shall we go?
              </h1>
              
              {/* Destination Search */}
              <div className="relative mb-12">
                <div className="relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-charcoal/40 group-focus-within:text-red-600 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search for your next destination..."
                    className="w-full pl-16 pr-6 py-5 rounded-[2rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 outline-none focus:ring-4 focus:ring-red-600/5 transition-all text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {searchQuery && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-4 p-4 rounded-[2rem] bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-2xl z-50 backdrop-blur-2xl"
                    >
                      {searchResults.length > 0 ? (
                        <div className="space-y-2">
                          {searchResults.map((dest) => (
                            <button 
                              key={dest.id}
                              onClick={() => addDestination(dest)}
                              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left group"
                            >
                              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                                <img src={dest.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-luxury-charcoal dark:text-white">{dest.name}</h4>
                                <p className="text-xs text-luxury-charcoal/40 dark:text-white/40">{dest.category}</p>
                              </div>
                              <Plus className="w-5 h-5 text-luxury-charcoal/20 group-hover:text-red-600 transition-colors" />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-luxury-charcoal/40">
                          <Info className="w-8 h-8 mx-auto mb-2 opacity-20" />
                          <p>No destinations found matching your search.</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Selected Destinations List */}
              <div className="space-y-6 relative">
                {selectedDestinations.length > 0 && (
                  <div className="absolute left-8 top-8 bottom-8 w-px bg-dashed border-l border-black/10 dark:border-white/10 hidden md:block" />
                )}
                
                <AnimatePresence mode="popLayout">
                  {selectedDestinations.map((dest, i) => (
                    <motion.div
                      key={dest.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="relative pl-0 md:pl-16"
                    >
                      {/* Connector Dot */}
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-black bg-red-600 hidden md:block z-10" />
                      
                      <div className="glass-card p-6 border-white/20 flex flex-col md:flex-row items-center gap-6 group">
                        <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                          <img src={dest.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-1 block">{dest.category}</span>
                          <h3 className="text-2xl font-serif font-medium text-luxury-charcoal dark:text-white mb-4">{dest.name}</h3>
                          
                          <div className="flex items-center justify-center md:justify-start gap-6">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => updateDuration(dest.id, dest.duration - 1)}
                                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                              >-</button>
                              <span className="text-sm font-bold w-12 text-center">{dest.duration} Days</span>
                              <button 
                                onClick={() => updateDuration(dest.id, dest.duration + 1)}
                                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                              >+</button>
                            </div>
                            <div className="w-px h-8 bg-black/10 dark:bg-white/10" />
                            <button 
                              onClick={() => removeDestination(dest.id)}
                              className="text-luxury-charcoal/20 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {selectedDestinations.length === 0 && (
                  <div className="py-20 text-center border-2 border-dashed border-black/5 dark:border-white/5 rounded-[3rem]">
                    <MapPin className="w-12 h-12 text-luxury-charcoal/10 mx-auto mb-4" />
                    <p className="text-luxury-charcoal/40 dark:text-white/40">Select destinations above to build your route</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Summary & Save */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="sticky top-32"
            >
              <div className="glass-card p-10 border-white/20 shadow-2xl shadow-black/10">
                <h2 className="text-3xl font-serif font-medium mb-8">Trip Overview</h2>
                
                <div className="space-y-6 mb-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40">Starting On</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-600" />
                      <input 
                        type="date" 
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 outline-none focus:border-red-600/40 transition-all font-medium"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
                      <Clock className="w-5 h-5 text-red-600 mb-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40 block mb-1">Duration</span>
                      <span className="text-2xl font-serif font-medium">{totalDays} Days</span>
                    </div>
                    <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
                      <DollarSign className="w-5 h-5 text-red-600 mb-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40 block mb-1">Est. Budget</span>
                      <span className="text-2xl font-serif font-medium">${totalBudget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-600/5 text-red-600 text-xs font-medium border border-red-600/10 mb-6">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>AI Itinerary will be generated once you save the trip.</span>
                  </div>

                  <button 
                    onClick={handleSave}
                    disabled={isSaving || selectedDestinations.length === 0}
                    className="w-full btn-luxury py-5 text-lg flex items-center justify-center gap-3 disabled:opacity-50 shadow-2xl shadow-red-600/30"
                  >
                    {isSaving ? (
                      <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2 }}><Sparkles className="w-5 h-5" /></motion.div> Crafting Journey...</>
                    ) : (
                      <><Check className="w-5 h-5" /> Complete Planning</>
                    )}
                  </button>
                </div>
              </div>

              {/* Progress Stepper Hint */}
              <div className="mt-8 flex items-center justify-center gap-4 text-luxury-charcoal/30 dark:text-white/30">
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-600">Select</span>
                <ArrowRight className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Optimize</span>
                <ArrowRight className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Experience</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
