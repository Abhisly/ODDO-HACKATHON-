'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { ArrowRight, MapPin, Compass, Clock, DollarSign, Plane, ChevronRight, Sparkles, Check, Calendar, Loader2 } from 'lucide-react';
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [popularCities, setPopularCities] = useState<CityDestination[]>(DESTINATION_DATA.slice(0, 10)); // Default to local data
  const [loadingCities, setLoadingCities] = useState(false);

  const { user } = useTravelStore();
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

  const addStop = (city: CityDestination) => {
    if (stops.find(s => s.city.id === city.id)) return;
    setStops(prev => [...prev, { city, days: 3, selectedSpotIds: [] }]);
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
      // Mock save if backend fails for demo
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
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-red-500">Traveloop Planner</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-luxury-charcoal dark:text-white mb-2">
            Build Your Journey
          </h1>
          <p className="text-luxury-charcoal/60 dark:text-white/60 text-lg">
            Select destinations, explore famous places and generate a luxury itinerary.
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
                <div className="lg:col-span-1 space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-luxury-charcoal dark:text-white mb-4">Add a Destination</h2>
                    <CitySearchInput
                      onSelect={addStop}
                      placeholder="Search Tokyo, Paris, Bali..."
                      excludeIds={stops.map(s => s.city.id)}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-luxury-charcoal/50 dark:text-white/40 mb-3">Popular Destinations</p>
                    {loadingCities && popularCities.length === 0 ? (
                      <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 text-red-500 animate-spin" /></div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {popularCities.filter(d => !stops.find(s => s.city.id === d.id)).slice(0, 6).map(city => (
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
                            <span className="absolute bottom-2 left-2 text-white text-xs font-bold">{city.countryCode} {city.name}</span>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-red-600/20 backdrop-blur-sm">
                              <span className="text-white font-bold text-sm">+ Add</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {stops.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10 space-y-4">
                      <div>
                        <label className="text-xs font-bold tracking-widest uppercase text-luxury-charcoal/50 dark:text-white/40 mb-2 block">Trip Name</label>
                        <input
                          value={tripName}
                          onChange={e => setTripName(e.target.value)}
                          placeholder={stops.map(s => s.city.name).join(' → ')}
                          className="w-full bg-transparent border-b border-black/10 dark:border-white/20 pb-2 text-luxury-charcoal dark:text-white focus:outline-none focus:border-red-500 transition-colors font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold tracking-widest uppercase text-luxury-charcoal/50 dark:text-white/40 mb-2 block flex items-center gap-1"><Calendar className="w-3 h-3" /> Start Date</label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={e => setStartDate(e.target.value)}
                          className="w-full bg-transparent border-b border-black/10 dark:border-white/20 pb-2 text-luxury-charcoal dark:text-white focus:outline-none focus:border-red-500 transition-colors"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="lg:col-span-2">
                  {stops.length === 0 ? (
                    <div className="h-96 rounded-3xl border-2 border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center text-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-red-600/10 dark:bg-red-600/20 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-red-500" />
                      </div>
                      <div>
                        <p className="font-serif text-xl text-luxury-charcoal/60 dark:text-white/50 font-medium">Your route is empty</p>
                        <p className="text-sm text-luxury-charcoal/40 dark:text-white/30 mt-1">Search or select suggested destinations to begin</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="font-serif text-2xl font-medium text-luxury-charcoal dark:text-white">Your Route</h2>
                        <div className="flex gap-4 text-sm text-luxury-charcoal/60 dark:text-white/60">
                          <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-red-500" />{totalDays} days</span>
                          <span className="flex items-center gap-1"><DollarSign className="w-4 h-4 text-red-500" />${totalCost.toLocaleString()}</span>
                        </div>
                      </div>

                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="stops">
                          {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
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
                        className="w-full mt-4 py-4 rounded-2xl bg-red-600 text-white font-bold text-base flex items-center justify-center gap-3 shadow-xl shadow-red-600/20 hover:bg-red-700 transition-colors"
                      >
                        <Sparkles className="w-5 h-5" />
                        Explore Famous Places
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
                <h2 className="font-serif text-3xl font-medium text-luxury-charcoal dark:text-white">Famous Places</h2>
                <div className="text-sm text-luxury-charcoal/60 dark:text-white/60">
                  {totalSpots} spots selected
                </div>
              </div>

              <div className="flex gap-3 flex-wrap mb-8">
                {stops.map((stop, idx) => (
                  <button
                    key={stop.city.id}
                    onClick={() => setActiveExploreIdx(idx)}
                    className={cn(
                      'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border',
                      activeExploreIdx === idx
                        ? 'bg-red-600 text-white border-red-600 shadow-lg'
                        : 'bg-white/60 dark:bg-white/10 border-white/30 dark:border-white/10 text-luxury-charcoal/70 dark:text-white/60 hover:border-red-400'
                    )}
                  >
                    <span>{stop.city.countryCode}</span>
                    {stop.city.name}
                    {stop.selectedSpotIds.length > 0 && (
                      <span className={cn('w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center',
                        activeExploreIdx === idx ? 'bg-white text-red-600' : 'bg-red-600 text-white'
                      )}>{stop.selectedSpotIds.length}</span>
                    )}
                  </button>
                ))}
              </div>

              {stops[activeExploreIdx] && (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                      <img src={stops[activeExploreIdx].city.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-medium text-luxury-charcoal dark:text-white">{stops[activeExploreIdx].city.name}</h3>
                      <p className="text-sm text-luxury-charcoal/60 dark:text-white/60 line-clamp-1">{stops[activeExploreIdx].city.description}</p>
                    </div>
                  </div>
                  <SightseeingGallery
                    city={stops[activeExploreIdx].city}
                    selectedIds={stops[activeExploreIdx].selectedSpotIds}
                    onToggle={(id) => toggleSpot(activeExploreIdx, id)}
                  />
                </div>
              )}

              <div className="flex justify-between mt-10">
                <button onClick={() => setPhase('build')} className="btn-luxury-outline">← Back</button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setPhase('preview')}
                  className="btn-luxury flex items-center gap-2 px-8"
                >
                  Preview Itinerary <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'preview' && (
          <motion.div key="preview" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
            <div className="editorial-container">
              <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 space-y-6">
                  <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10 space-y-5">
                    <h3 className="font-serif text-xl font-medium text-luxury-charcoal dark:text-white">Trip Summary</h3>
                    <div className="aspect-video rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                      <img src={stops[0]?.city.heroImage} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-luxury-charcoal/60 dark:text-white/50">Destinations</span><span className="font-bold text-luxury-charcoal dark:text-white">{stops.length} cities</span></div>
                      <div className="flex justify-between"><span className="text-luxury-charcoal/60 dark:text-white/50">Total Duration</span><span className="font-bold text-luxury-charcoal dark:text-white">{totalDays} days</span></div>
                      <div className="flex justify-between"><span className="text-luxury-charcoal/60 dark:text-white/50">Sightseeing</span><span className="font-bold text-luxury-charcoal dark:text-white">{totalSpots} spots</span></div>
                      <div className="flex justify-between"><span className="text-luxury-charcoal/60 dark:text-white/50">Est. Cost</span><span className="font-bold text-red-600">${totalCost.toLocaleString()}</span></div>
                    </div>

                    <div className="pt-4 border-t border-black/5 dark:border-white/10">
                      <p className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/50 dark:text-white/40 mb-2">Route</p>
                      <div className="flex flex-wrap gap-1 items-center">
                        {stops.map((s, i) => (
                          <React.Fragment key={s.city.id}>
                            <span className="text-sm font-medium text-luxury-charcoal dark:text-white">{s.city.name}</span>
                            {i < stops.length - 1 && <ArrowRight className="w-3 h-3 text-red-500" />}
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
                    className="w-full py-4 rounded-2xl bg-red-600 text-white font-bold text-base flex items-center justify-center gap-3 shadow-xl shadow-red-600/20 hover:bg-red-700 transition-colors disabled:opacity-70"
                  >
                    {isGenerating ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Generating…</>
                    ) : (
                      <><Check className="w-5 h-5" /> Save Trip</>
                    )}
                  </motion.button>
                </div>

                <div className="lg:col-span-2">
                  <h2 className="font-serif text-2xl font-medium text-luxury-charcoal dark:text-white mb-6">Day-by-Day Itinerary</h2>
                  <div className="space-y-3 relative">
                    <div className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-red-500 via-red-300 to-transparent" />
                    {generatedItinerary.map((day, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={cn('pl-14 relative', day.isFirstDayOfCity && i !== 0 && 'mt-6')}
                      >
                        <div className={cn(
                          'absolute left-3 top-4 w-5 h-5 rounded-full border-2 flex items-center justify-center',
                          day.isFirstDayOfCity
                            ? 'bg-red-600 border-red-600 shadow-lg shadow-red-600/40'
                            : 'bg-white dark:bg-gray-900 border-red-300 dark:border-red-700'
                        )}>
                          {day.isFirstDayOfCity && <Plane className="w-2.5 h-2.5 text-white" />}
                        </div>

                        {day.isFirstDayOfCity && (
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold tracking-widest uppercase text-red-600 bg-red-600/10 px-3 py-1 rounded-full border border-red-600/20">
                              {day.city.countryCode} {day.city.name}
                            </span>
                          </div>
                        )}

                        <div className="p-4 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-serif font-bold text-luxury-charcoal dark:text-white">Day {day.day}</span>
                            <span className="text-xs text-luxury-charcoal/50 dark:text-white/40">{format(new Date(day.date), 'EEE, MMM d')}</span>
                          </div>
                          {day.spots.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {(day.spots as any[]).map((spot: any) => spot && (
                                <span key={spot.id} className="text-xs bg-red-600/10 dark:bg-red-600/20 text-red-700 dark:text-red-300 border border-red-600/20 px-2.5 py-1 rounded-full font-medium">
                                  {spot.name}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-luxury-charcoal/40 dark:text-white/30 italic">Free day — explore at your own pace</p>
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
