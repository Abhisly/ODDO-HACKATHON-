'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Map as MapIcon, Clock, GripVertical, Navigation, Coffee, Bed, Plane, MapPin } from 'lucide-react';
import { useTravelStore, DayPlan, Activity } from '@/lib/store';
import { format } from 'date-fns';

export default function ItineraryBuilderPage() {
  const { trips, activeTripId, updateItineraryDay } = useTravelStore();
  const [activeDay, setActiveDay] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTrip = trips.find(t => t.id === activeTripId);

  if (!mounted || !activeTrip) return (
    <div className="editorial-container pt-40 min-h-screen flex items-center justify-center">
      <p className="font-serif text-xl text-luxury-charcoal/40">Loading itinerary...</p>
    </div>
  );

  const currentDayPlan = activeTrip.itinerary[activeDay];

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !currentDayPlan) return;

    const items = Array.from(currentDayPlan.activities);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateItineraryDay(activeTrip.id, activeDay, items);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'Flight': return <Plane className="w-4 h-4" />;
      case 'Accommodation': return <Bed className="w-4 h-4" />;
      case 'Dining': return <Coffee className="w-4 h-4" />;
      default: return <Navigation className="w-4 h-4" />;
    }
  };

  return (
    <div className="editorial-container pt-32 pb-24 flex flex-col lg:flex-row gap-12 min-h-screen">
      
      {/* Sidebar: Day Selector */}
      <div className="lg:w-1/4">
        <div className="sticky top-32 space-y-8">
          <div>
            <h1 className="text-3xl font-serif font-medium tracking-tight mb-2">{activeTrip.destination.name}</h1>
            <p className="text-luxury-charcoal/60 text-sm">
              {format(new Date(activeTrip.startDate), 'MMM dd')} - {format(new Date(activeTrip.endDate), 'MMM dd, yyyy')}
            </p>
          </div>
          
          <div className="space-y-2">
            {activeTrip.itinerary.map((dayPlan, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDay(idx)}
                className={`w-full text-left px-6 py-4 rounded-xl transition-colors border ${
                  activeDay === idx 
                    ? 'bg-white border-luxury-forest shadow-sm' 
                    : 'bg-luxury-cream border-transparent hover:border-black/10'
                }`}
              >
                <h4 className="font-serif font-medium">Day {dayPlan.day}</h4>
                <p className="text-xs text-luxury-charcoal/60 mt-1">{format(new Date(dayPlan.date), 'EEEE, MMM dd')}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content: Drag and Drop Itinerary */}
      <div className="lg:w-1/2">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-medium">Schedule for Day {currentDayPlan?.day || activeDay + 1}</h2>
          <button className="text-sm font-medium text-luxury-forest hover:text-luxury-forest/80">Add Activity</button>
        </div>

        {currentDayPlan?.activities.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="itinerary-list">
              {(provided) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {currentDayPlan.activities.map((activity, index) => (
                    <Draggable key={activity.id} draggableId={activity.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`editorial-card p-6 flex items-center gap-6 border border-black/5 ${
                            snapshot.isDragging ? 'shadow-2xl scale-[1.02] bg-white' : 'bg-white'
                          }`}
                        >
                          <div 
                            {...provided.dragHandleProps}
                            className="text-luxury-charcoal/30 hover:text-luxury-charcoal/60 cursor-grab active:cursor-grabbing"
                          >
                            <GripVertical className="w-5 h-5" />
                          </div>
                          
                          <div className="flex-1 flex items-center gap-6">
                            <div className="text-sm font-bold tracking-widest text-luxury-charcoal/60 w-20 shrink-0">
                              {activity.time}
                            </div>
                            <div className="w-10 h-10 rounded-full bg-luxury-beige flex items-center justify-center shrink-0">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div>
                              <h4 className="font-serif text-lg font-medium">{activity.title}</h4>
                              <p className="text-xs text-luxury-charcoal/50 uppercase tracking-wider mt-1">{activity.type}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className="h-64 rounded-2xl border border-dashed border-black/20 flex flex-col items-center justify-center text-luxury-charcoal/40">
            <Clock className="w-8 h-8 mb-4 opacity-50" />
            <p className="font-medium">No activities planned yet.</p>
          </div>
        )}
      </div>

      {/* Right Sidebar: Interactive Map Placeholder */}
      <div className="lg:w-1/4">
        <div className="sticky top-32 h-[calc(100vh-12rem)] rounded-2xl bg-luxury-beige border border-black/5 flex flex-col overflow-hidden relative group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply" />
          <div className="p-6 bg-white/80 backdrop-blur-md border-b border-black/5 z-10">
            <h3 className="font-serif font-medium flex items-center gap-2"><MapIcon className="w-4 h-4 text-luxury-forest" /> Route Map</h3>
          </div>
          <div className="flex-1 flex items-center justify-center z-10">
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             >
               <MapPin className="w-12 h-12 text-luxury-forest drop-shadow-xl" />
             </motion.div>
          </div>
        </div>
      </div>

    </div>
  );
}
