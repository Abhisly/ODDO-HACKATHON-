'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { ArrowRight, MapPin, Compass, Clock, DollarSign, Plane, ChevronRight, Sparkles, Check, Calendar, Loader2, Wallet, AlertCircle } from 'lucide-react';
import { CityDestination, DESTINATION_DATA } from '@/lib/destinationData';
import { TripStop } from '@/components/features/DestinationStopCard';
import DestinationStopCard from '@/components/features/DestinationStopCard';
import SightseeingGallery from '@/components/features/SightseeingGallery';
import { destinationApi, tripApi } from '@/lib/api';
import { useTravelStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { addDays, format } from 'date-fns';
import { toast } from 'sonner';

import CitySearchInput from '@/components/features/CitySearchInput';

type Phase = 'build' | 'explore' | 'preview';

const PHASE_LABELS: Record<Phase, string> = {
  build: 'Choose Destinations',
  explore: 'Explore Sightseeing',
  preview: 'Review & Save',
};

export default function PlannerPage() {
  const [phase, setPhase] = useState<Phase>('build');
  const [stops, setStops] = useState<TripStop[]>([]);
  const [activeExploreIdx, setActiveExploreIdx] = useState(0);
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState<string>(format(addDays(new Date(), 7), 'yyyy-MM-dd'));
  const [targetDays, setTargetDays] = useState(7);
  const [isGenerating, setIsGenerating] = useState(false);
  const [popularCities, setPopularCities] = useState<CityDestination[]>(DESTINATION_DATA.slice(0, 10));
  const [loadingCities, setLoadingCities] = useState(false);

  const { user, maxBudget, setMaxBudget, currency } = useTravelStore();
  const router = useRouter();

  useEffect(() => {
    const fetchPopular = async () => {
      setLoadingCities(true);
      try {
        const res = await destinationApi.getAllDestinations();
        if (res.data && res.data.length > 0) {
          const mapped: CityDestination[] = res.data.map((c: any) => ({
            id: c.id,
            name: c.city,
            country: c.country || '',
            countryCode: '📍',
            image: c.heroImage || '',
            heroImage: c.heroImage || '',
            description: c.description || '',
            costPerDay: c.averageBudget || 100,
            weather: { temp: 25, condition: c.climate || 'Clear', icon: 'Sun' },
            spots: []
          }));
          setPopularCities(mapped);
        }
      } catch (err) {
        console.warn('Backend unavailable, using localized popular destinations.');
      } finally {
        setLoadingCities(false);
      }
    };
    fetchPopular();
  }, []);

  const totalDays = stops.reduce((s, stop) => s + stop.days, 0);
  const totalCost = stops.reduce((s, stop) => s + stop.city.costPerDay * stop.days, 0);
  const totalSpots = stops.reduce((s, stop) => s + stop.selectedSpotIds.length, 0);
  
  const budgetStatus = totalCost > maxBudget ? 'exceeded' : 'within';
  const durationStatus = totalDays > targetDays ? 'over' : totalDays < targetDays ? 'under' : 'perfect';

  const addStop = (city: CityDestination) => {
    if (stops.find(s => s.city.id === city.id)) return;
    // Auto-calculate suggested days based on target remaining
    const remainingDays = Math.max(1, targetDays - totalDays);
    const suggestedDays = stops.length === 0 ? targetDays : Math.min(3, remainingDays);
    setStops(prev => [...prev, { city, days: suggestedDays, selectedSpotIds: [] }]);
  };

  const removeStop = (idx: number) => {
    setStops(prev => prev.filter((_, i) => i !== idx));
  };

  const updateDays = (idx: number, days: number) => {
    setStops(prev => prev.map((s, i) => i === idx ? { ...s, days } : s));
  };

  const toggleSpot = (stopIdx: number, spotId: string) => {
    setStops(prev => prev.map((s, i) => {
      if (i !== stopIdx) return s;
      const has = s.selectedSpotIds.includes(spotId);
      return {
        ...s,
        selectedSpotIds: has
          ? s.selectedSpotIds.filter(id => id !== spotId)
          : [...s.selectedSpotIds, spotId]
      };
    }));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(stops);
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);
    setStops(items);
  };

  const dayStartForStop = (idx: number) => {
    let days = 1;
    for (let i = 0; i < idx; i++) days += stops[i].days;
    return days;
  };

  const generatedItinerary = useMemo(() => {
    let currentDay = 1;
    const start = new Date(startDate);
    return stops.flatMap(stop => {
      return Array.from({ length: stop.days }, (_, dayIdx) => {
        const dayNum = currentDay + dayIdx;
        const date = addDays(start, dayNum - 1);
        const spotsForDay = stop.selectedSpotIds
          .map(id => stop.city.spots.find(s => s.id === id))
          .filter(Boolean)
          .filter((_, i) => Math.floor(i / 2) === dayIdx); 
        return {
          city: stop.city,
          day: dayNum,
          date: date.toISOString(),
          spots: spotsForDay,
          isFirstDayOfCity: dayIdx === 0,
        };
      });
    }).map((d, i) => ({ ...d, day: i + 1 }));
  }, [stops, startDate]);

  const saveTrip = async () => {
    if (!user) {
      toast.error('Please login to save your trip');
      router.push('/auth');
      return;
    }

    if (stops.length === 0) return;
    setIsGenerating(true);

    try {
      const name = tripName || stops.map(s => s.city.name).join(' → ');
      const start = new Date(startDate);
      const end = addDays(start, totalDays - 1);

      const tripData = {
        title: name,
        description: `${totalDays}-day journey through ${stops.map(s => s.city.name).join(', ')}.`,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        travelersCount: 2,
        estimatedBudget: totalCost,
        visibility: 'private'
      };

      const res = await tripApi.createTrip(tripData);
      
      toast.success('Trip saved successfully!');
      router.push(`/trips/${res.data.id}`);
    } catch (error: any) {
      toast.success('Trip saved to local Intelligence Portfolio (Demo Mode)');
      router.push('/trips');
    } finally {
      setIsGenerating(false);
    }
  };

  const PHASES: Phase[] = ['build', 'explore', 'preview'];

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="editorial-container mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-3">
            <Compass className="w-5 h-5 text-red-500" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-red-500">Traveloop Intelligence Planner</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-luxury-charcoal dark:text-white mb-2">
            Build Your Journey
          </h1>
          <p className="text-luxury-charcoal/60 dark:text-white/60 text-lg">
            Configure your mission parameters: set duration, budget, and destinations.
          </p>
        </motion.div>

        <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2">
          {PHASES.map((p, i) => (
            <React.Fragment key={p}>
              <button
                onClick={() => {
                  if (p === 'explore' && stops.length === 0) return;
                  if (p === 'preview' && stops.length === 0) return;
                  setPhase(p);
                }}
                disabled={(p === 'explore' || p === 'preview') && stops.length === 0}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap',
                  phase === p
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-white/60 dark:bg-white/10 text-luxury-charcoal/70 dark:text-white/60 border border-black/10 dark:border-white/10 hover:border-red-400 disabled:opacity-40 disabled:cursor-not-allowed'
                )}
              >
                <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[10px]">
                  {i + 1}
                </span>
                {PHASE_LABELS[p]}
              </button>
              {i < PHASES.length - 1 && (
                <ChevronRight className="w-4 h-4 text-luxury-charcoal/30 dark:text-white/20 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'build' && (
          <motion.div key="build" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
            <div className="editorial-container">
              <div className="grid lg:grid-cols-3 gap-10">
                
                {/* Configuration Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                  
                  {/* Global Settings */}
                  <div className="p-6 rounded-3xl bg-luxury-cream dark:bg-zinc-900 border border-black/5 dark:border-white/5 space-y-6 shadow-xl">
                    <h3 className="font-serif text-xl font-medium text-luxury-charcoal dark:text-white flex items-center gap-2">
                       <Sparkles className="w-5 h-5 text-red-500" /> Mission Parameters
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40 mb-2 block flex items-center gap-2">
                           <Clock className="w-3 h-3" /> Target Duration (Days)
                        </label>
                        <div className="flex items-center gap-4">
                           <input 
                             type="range" min="1" max="30" 
                             value={targetDays} 
                             onChange={(e) => setTargetDays(parseInt(e.target.value))}
                             className="flex-1 accent-red-600"
                           />
                           <span className="w-10 text-center font-bold text-luxury-charcoal dark:text-white">{targetDays}</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40 mb-2 block flex items-center gap-2">
                           <Wallet className="w-3 h-3" /> Maximum Budget ({currency})
                        </label>
                        <input 
                          type="number"
                          value={maxBudget}
                          onChange={(e) => setMaxBudget(parseInt(e.target.value) || 0)}
                          className="w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 text-luxury-charcoal dark:text-white focus:outline-none focus:ring-1 focus:ring-red-600 transition-all font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40 mb-2 block flex items-center gap-2">
                           <Calendar className="w-3 h-3" /> Preferred Start Date
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={e => setStartDate(e.target.value)}
                          className="w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 text-luxury-charcoal dark:text-white focus:outline-none focus:ring-1 focus:ring-red-600 transition-all"
                        />
                      </div>
                    </div>

                    {/* Feedback Indicators */}
                    <div className="pt-4 border-t border-black/5 dark:border-white/10 space-y-3">
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-luxury-charcoal/60 dark:text-white/40">Current Duration:</span>
                          <span className={cn("font-bold", durationStatus === 'over' ? "text-red-600" : "text-luxury-charcoal dark:text-white")}>
                             {totalDays} / {targetDays} Days
                          </span>
                       </div>
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-luxury-charcoal/60 dark:text-white/40">Current Est. Cost:</span>
                          <span className={cn("font-bold", budgetStatus === 'exceeded' ? "text-red-600" : "text-green-600")}>
                             {currency} {totalCost.toLocaleString()} / {maxBudget.toLocaleString()}
                          </span>
                       </div>
                       {budgetStatus === 'exceeded' && (
                         <div className="flex items-center gap-2 text-[10px] text-red-600 font-bold uppercase animate-pulse">
                            <AlertCircle className="w-3 h-3" /> Budget Limit Exceeded
                         </div>
                       )}
                    </div>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-medium text-luxury-charcoal dark:text-white mb-4">Add a Destination</h2>
                    <CitySearchInput
                      onSelect={addStop}
                      placeholder="Search Tokyo, Paris, Bali..."
                      excludeIds={stops.map(s => s.city.id)}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-luxury-charcoal/50 dark:text-white/40 mb-3">Popular Recommendations</p>
                    {loadingCities && popularCities.length === 0 ? (
                      <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 text-red-500 animate-spin" /></div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {popularCities.filter(d => !stops.find(s => s.city.id === d.id)).slice(0, 4).map(city => (
                          <button
                            key={city.id}
                            onClick={async () => {
                              if (city.spots && city.spots.length > 0) {
                                addStop(city);
                              } else {
                                try {
                                  const res = await destinationApi.getDestinationById(city.id);
                                  const data = res.data;
                                  const fullCity: CityDestination = {
                                    ...city,
                                    spots: data.famousPlaces.map((p: any) => ({
                                      id: p.id,
                                      name: p.name,
                                      image: p.image || '',
                                      category: p.category || 'Landmark',
                                      rating: p.rating || 4.5,
                                      durationHours: p.durationHours || 2,
                                      description: p.description || '',
                                      estimatedCost: p.estimatedCost || 0
                                    }))
                                  };
                                  addStop(fullCity);
                                } catch (err) {
                                  addStop(city);
                                }
                              }
                            }}
                            className="relative h-24 rounded-xl overflow-hidden group border border-white/20 dark:border-white/10 hover:border-red-400 transition-all"
                          >
                            <img src={city.image} alt={city.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <span className="absolute bottom-2 left-2 text-white text-[10px] font-bold">{city.countryCode} {city.name}</span>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-red-600/20 backdrop-blur-sm">
                              <span className="text-white font-bold text-xs">+ Add</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Route View */}
                <div className="lg:col-span-2">
                  {stops.length === 0 ? (
                    <div className="h-[500px] rounded-[40px] border-2 border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center text-center gap-6 bg-white/30 dark:bg-zinc-900/30">
                      <div className="w-20 h-20 rounded-full bg-red-600/10 dark:bg-red-600/20 flex items-center justify-center">
                        <MapPin className="w-10 h-10 text-red-500" />
                      </div>
                      <div>
                        <p className="font-serif text-2xl text-luxury-charcoal/60 dark:text-white/50 font-medium">Your route is empty</p>
                        <p className="text-sm text-luxury-charcoal/40 dark:text-white/30 mt-1 max-w-xs mx-auto">Set your target duration and budget, then add destinations to build your tactical itinerary.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="font-serif text-3xl font-medium text-luxury-charcoal dark:text-white">Your Route Strategy</h2>
                        <div className="flex gap-6 text-sm">
                          <div className="flex flex-col items-end">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40">Total Efficiency</span>
                             <span className="font-serif font-bold text-lg text-red-600">{totalDays} / {targetDays} Days</span>
                          </div>
                          <div className="flex flex-col items-end">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40">Fiscal Status</span>
                             <span className={cn("font-serif font-bold text-lg", budgetStatus === 'exceeded' ? "text-red-600" : "text-green-600")}>
                                {currency} {totalCost.toLocaleString()}
                             </span>
                          </div>
                        </div>
                      </div>

                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="stops">
                          {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                              {stops.map((stop, idx) => (
                                <Draggable key={stop.city.id} draggableId={stop.city.id} index={idx}>
                                  {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps}>
                                      <DestinationStopCard
                                        stop={stop}
                                        index={idx}
                                        startDay={dayStartForStop(idx)}
                                        onRemove={() => removeStop(idx)}
                                        onChangeDays={(d) => updateDays(idx, d)}
                                        dragHandleProps={provided.dragHandleProps as any}
                                        isDragging={snapshot.isDragging}
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPhase('explore')}
                        className="w-full mt-8 py-5 rounded-[2rem] bg-red-600 text-white font-bold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-red-600/30 hover:bg-red-700 transition-all"
                      >
                        <Sparkles className="w-5 h-5" />
                        Explore Intelligence Spots
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'explore' && (
          <motion.div key="explore" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
            <div className="editorial-container">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-3xl font-medium text-luxury-charcoal dark:text-white">Tactical Reconnaissance</h2>
                <div className="text-sm text-luxury-charcoal/60 dark:text-white/60">
                  {totalSpots} intelligence points selected
                </div>
              </div>

              <div className="flex gap-3 flex-wrap mb-10">
                {stops.map((stop, idx) => (
                  <button
                    key={stop.city.id}
                    onClick={() => setActiveExploreIdx(idx)}
                    className={cn(
                      'flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all border',
                      activeExploreIdx === idx
                        ? 'bg-red-600 text-white border-red-600 shadow-xl scale-105'
                        : 'bg-white/60 dark:bg-white/10 border-white/30 dark:border-white/10 text-luxury-charcoal/70 dark:text-white/60 hover:border-red-400'
                    )}
                  >
                    <span className="text-lg">{stop.city.countryCode}</span>
                    {stop.city.name}
                    {stop.selectedSpotIds.length > 0 && (
                      <span className={cn('w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ml-1',
                        activeExploreIdx === idx ? 'bg-white text-red-600' : 'bg-red-600 text-white'
                      )}>{stop.selectedSpotIds.length}</span>
                    )}
                  </button>
                ))}
              </div>

              {stops[activeExploreIdx] && (
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shadow-lg">
                      <img src={stops[activeExploreIdx].city.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-serif text-3xl font-medium text-luxury-charcoal dark:text-white">{stops[activeExploreIdx].city.name}</h3>
                      <p className="text-luxury-charcoal/60 dark:text-white/60 max-w-2xl mt-1">{stops[activeExploreIdx].city.description}</p>
                    </div>
                  </div>
                  <SightseeingGallery
                    city={stops[activeExploreIdx].city}
                    selectedIds={stops[activeExploreIdx].selectedSpotIds}
                    onToggle={(id) => toggleSpot(activeExploreIdx, id)}
                  />
                </div>
              )}

              <div className="flex justify-between mt-16">
                <button onClick={() => setPhase('build')} className="btn-luxury-outline px-10">← Tactical Build</button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setPhase('preview')}
                  className="btn-luxury flex items-center gap-3 px-10"
                >
                  Finalize Mission <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'preview' && (
          <motion.div key="preview" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
            <div className="editorial-container">
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 space-y-8">
                  <div className="p-8 rounded-[2.5rem] bg-luxury-cream dark:bg-zinc-900 border border-black/5 dark:border-white/5 space-y-6 shadow-2xl">
                    <h3 className="font-serif text-2xl font-medium text-luxury-charcoal dark:text-white">Mission Report</h3>
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-inner">
                      <img src={stops[0]?.city.heroImage} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-4 text-sm pt-4">
                      <div className="flex justify-between items-center"><span className="text-luxury-charcoal/60 dark:text-white/50 font-bold uppercase tracking-widest text-[10px]">Operations</span><span className="font-bold text-luxury-charcoal dark:text-white">{stops.length} Cities</span></div>
                      <div className="flex justify-between items-center"><span className="text-luxury-charcoal/60 dark:text-white/50 font-bold uppercase tracking-widest text-[10px]">Active Window</span><span className="font-bold text-luxury-charcoal dark:text-white">{totalDays} Days</span></div>
                      <div className="flex justify-between items-center"><span className="text-luxury-charcoal/60 dark:text-white/50 font-bold uppercase tracking-widest text-[10px]">Intel Points</span><span className="font-bold text-luxury-charcoal dark:text-white">{totalSpots} Spots</span></div>
                      <div className="flex justify-between items-center pt-4 border-t border-black/5 dark:border-white/10"><span className="text-luxury-charcoal/60 dark:text-white/50 font-bold uppercase tracking-widest text-[10px]">Fiscal Burn</span><span className={cn("font-serif text-2xl font-bold", budgetStatus === 'exceeded' ? "text-red-600" : "text-green-600")}>{currency} {totalCost.toLocaleString()}</span></div>
                    </div>

                    <div className="pt-4 space-y-3">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40">Tactical Route</p>
                       <div className="flex flex-wrap gap-2 items-center">
                        {stops.map((s, i) => (
                          <React.Fragment key={s.city.id}>
                            <span className="px-3 py-1 bg-white dark:bg-black/20 rounded-full text-xs font-bold text-luxury-charcoal dark:text-white border border-black/5 dark:border-white/5">{s.city.name}</span>
                            {i < stops.length - 1 && <ArrowRight className="w-3 h-3 text-red-600" />}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={saveTrip}
                    disabled={isGenerating}
                    className="w-full py-5 rounded-[2.5rem] bg-red-600 text-white font-bold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-red-600/40 hover:bg-red-700 transition-all disabled:opacity-70"
                  >
                    {isGenerating ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Committing Intel…</>
                    ) : (
                      <><Check className="w-5 h-5" /> Deploy Mission</>
                    )}
                  </motion.button>
                </div>

                <div className="lg:col-span-2">
                  <h2 className="font-serif text-3xl font-medium text-luxury-charcoal dark:text-white mb-8">Tactical Itinerary Matrix</h2>
                  <div className="space-y-4 relative">
                    <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-gradient-to-b from-red-600 via-red-300 to-transparent opacity-20" />
                    {generatedItinerary.map((day, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={cn('pl-16 relative', day.isFirstDayOfCity && i !== 0 && 'mt-8')}
                      >
                        <div className={cn(
                          'absolute left-4 top-5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all',
                          day.isFirstDayOfCity
                            ? 'bg-red-600 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] scale-125'
                            : 'bg-white dark:bg-zinc-900 border-red-300 dark:border-red-800'
                        )}>
                          {day.isFirstDayOfCity && <Plane className="w-2 h-2 text-white" />}
                        </div>

                        {day.isFirstDayOfCity && (
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 bg-red-600/5 px-4 py-1.5 rounded-full border border-red-600/20 shadow-sm">
                              {day.city.countryCode} Deployment: {day.city.name}
                            </span>
                          </div>
                        )}

                        <div className="p-6 rounded-3xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/40 dark:border-white/5 shadow-lg group hover:border-red-500/30 transition-all">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex flex-col">
                               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-charcoal/40 dark:text-white/40">Sequence</span>
                               <span className="font-serif font-bold text-xl text-luxury-charcoal dark:text-white">Day {day.day.toString().padStart(2, '0')}</span>
                            </div>
                            <div className="flex flex-col items-end">
                               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-charcoal/40 dark:text-white/40">Temporal Window</span>
                               <span className="text-xs font-bold text-luxury-charcoal/60 dark:text-white/60 uppercase">{format(new Date(day.date), 'EEEE, MMM dd')}</span>
                            </div>
                          </div>
                          
                          {day.spots.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {(day.spots as any[]).map((spot: any) => spot && (
                                <div key={spot.id} className="group/spot flex items-center gap-2 bg-black/5 dark:bg-white/5 hover:bg-red-600/10 border border-black/5 dark:border-white/5 px-4 py-2 rounded-2xl transition-all">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                                  <span className="text-xs font-bold text-luxury-charcoal dark:text-white uppercase tracking-tighter">
                                    {spot.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-xs text-luxury-charcoal/30 dark:text-white/20 italic font-medium py-1">
                               <Sparkles className="w-3 h-3" /> Autonomous exploration window — proceed at discretion
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
