'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Map as MapIcon, Clock, GripVertical, Navigation, Coffee, Bed, Plane, MapPin, Plus, Trash2, X } from 'lucide-react';
import { useTravelStore, DayPlan, Activity } from '@/lib/store';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

export default function ItineraryBuilderPage() {
  const { trips, activeTripId, updateItineraryDay, addActivity, deleteActivity } = useTravelStore();
  const [activeDay, setActiveDay] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({ title: '', time: '09:00 AM', type: 'Sightseeing' });

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

  const handleAddActivity = () => {
    if (!newActivity.title) return;
    const activity: Activity = {
      id: `act-${Date.now()}`,
      title: newActivity.title,
      time: newActivity.time,
      type: newActivity.type
    };
    addActivity(activeTrip.id, activeDay, activity);
    setIsAddModalOpen(false);
    setNewActivity({ title: '', time: '09:00 AM', type: 'Sightseeing' });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'Flight': return <Plane className="w-4 h-4 text-luxury-forest" />;
      case 'Accommodation': return <Bed className="w-4 h-4 text-luxury-forest" />;
      case 'Dining': return <Coffee className="w-4 h-4 text-luxury-forest" />;
      default: return <Navigation className="w-4 h-4 text-luxury-forest" />;
    }
  };

  return (
    <div className="editorial-container pt-32 pb-24 flex flex-col lg:flex-row gap-12 min-h-screen">
      
      {/* Sidebar: Day Selector */}
      <div className="lg:w-1/4 shrink-0">
        <div className="sticky top-32 space-y-8">
          <div>
            <h1 className="text-4xl font-serif font-medium tracking-tight mb-2 leading-tight">
              {activeTrip.destination.name}
            </h1>
            <p className="text-luxury-charcoal/60 text-sm font-medium tracking-wider uppercase">
              {format(new Date(activeTrip.startDate), 'MMM dd')} - {format(new Date(activeTrip.endDate), 'MMM dd, yyyy')}
            </p>
          </div>
          
          <div className="space-y-2">
            {activeTrip.itinerary.map((dayPlan, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDay(idx)}
                className={`w-full text-left px-6 py-4 rounded-2xl transition-all border ${
                  activeDay === idx 
                    ? 'bg-white border-luxury-forest shadow-md scale-[1.02]' 
                    : 'bg-luxury-cream border-transparent hover:border-black/10'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-serif font-medium text-lg">Day {dayPlan.day}</h4>
                  <span className="text-xs font-bold text-luxury-charcoal/40 bg-black/5 px-2 py-1 rounded-md">{dayPlan.activities.length} acts</span>
                </div>
                <p className="text-xs text-luxury-charcoal/60 mt-1 font-medium">{format(new Date(dayPlan.date), 'EEEE, MMM dd')}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content: Drag and Drop Itinerary */}
      <div className="lg:w-1/2 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif font-medium mb-1">Schedule for Day {currentDayPlan?.day || activeDay + 1}</h2>
            <p className="text-sm text-luxury-charcoal/50">{format(new Date(currentDayPlan.date), 'EEEE, MMMM do, yyyy')}</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="w-12 h-12 rounded-full bg-luxury-forest text-white flex items-center justify-center hover:bg-opacity-90 transition-all shadow-sm shrink-0"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {currentDayPlan?.activities.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="itinerary-list">
              {(provided) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  className="space-y-4 relative"
                >
                  <div className="absolute left-6 top-8 bottom-8 w-px bg-black/10 hidden md:block" />
                  
                  {currentDayPlan.activities.map((activity, index) => (
                    <Draggable key={activity.id} draggableId={activity.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`group relative pl-0 md:pl-16 transition-all ${
                            snapshot.isDragging ? 'z-50 scale-[1.02]' : 'z-10'
                          }`}
                        >
                          {/* Timeline Dot */}
                          <div className="absolute left-[21px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-luxury-forest hidden md:block" />
                          
                          <div className={`p-5 flex items-center gap-4 md:gap-6 border rounded-2xl transition-all ${
                            snapshot.isDragging ? 'shadow-2xl bg-white border-luxury-forest' : 'bg-white border-black/5 hover:border-black/10 shadow-sm'
                          }`}>
                            <div 
                              {...provided.dragHandleProps}
                              className="text-luxury-charcoal/20 hover:text-luxury-charcoal/60 cursor-grab active:cursor-grabbing p-2 -ml-2"
                            >
                              <GripVertical className="w-5 h-5" />
                            </div>
                            
                            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                              <div className="text-sm font-bold tracking-widest text-luxury-charcoal/60 w-24 shrink-0 flex items-center gap-2">
                                <Clock className="w-4 h-4 hidden sm:block" />
                                {activity.time}
                              </div>
                              <div className="w-12 h-12 rounded-full bg-luxury-beige flex items-center justify-center shrink-0">
                                {getActivityIcon(activity.type)}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-serif text-xl font-medium">{activity.title}</h4>
                                <p className="text-xs text-luxury-forest uppercase tracking-widest mt-1 font-bold">{activity.type}</p>
                              </div>
                            </div>
                            
                            <button 
                              onClick={() => deleteActivity(activeTrip.id, activeDay, activity.id)}
                              className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
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
          <div className="h-64 rounded-3xl border border-dashed border-black/10 flex flex-col items-center justify-center text-luxury-charcoal/40 bg-white/50 backdrop-blur-sm">
            <Clock className="w-10 h-10 mb-4 opacity-50" />
            <p className="font-medium text-lg">No activities scheduled yet.</p>
            <p className="text-sm opacity-60">Click the + button to add one.</p>
          </div>
        )}
      </div>

      {/* Right Sidebar: Map & Summary */}
      <div className="lg:w-1/4 shrink-0">
        <div className="sticky top-32 space-y-6">
          <div className="h-64 rounded-3xl bg-luxury-beige border border-black/5 flex flex-col overflow-hidden relative group shadow-sm">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply" />
            <img src={activeTrip.destination.image} className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" alt="Map background" />
            <div className="p-6 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm border-b border-black/5 z-10">
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
          
          <div className="p-6 bg-white border border-black/5 rounded-3xl shadow-sm">
            <h4 className="font-serif font-medium mb-4">Day Summary</h4>
            <div className="space-y-4">
               <div className="flex justify-between items-center border-b border-black/5 pb-3">
                 <span className="text-sm text-luxury-charcoal/60">Total Activities</span>
                 <span className="font-medium">{currentDayPlan?.activities.length || 0}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm text-luxury-charcoal/60">Primary Tag</span>
                 <span className="text-xs font-bold uppercase tracking-widest text-luxury-forest bg-luxury-forest/5 px-2 py-1 rounded-md">Culture</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Activity Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Activity</DialogTitle>
            <DialogDescription>Schedule a new event for Day {activeDay + 1}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/60 mb-2 block">Activity Title</label>
              <input 
                type="text" 
                value={newActivity.title}
                onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                className="w-full bg-luxury-beige/30 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-luxury-forest"
                placeholder="e.g., Museum Tour"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/60 mb-2 block">Time</label>
                <input 
                  type="time" 
                  value={newActivity.time.split(' ')[0]} // simplistic handling for mockup
                  onChange={(e) => {
                    const timeString = e.target.value;
                    let hour = parseInt(timeString.split(':')[0]);
                    const suffix = hour >= 12 ? 'PM' : 'AM';
                    hour = hour % 12 || 12;
                    setNewActivity({...newActivity, time: `${hour}:${timeString.split(':')[1]} ${suffix}`});
                  }}
                  className="w-full bg-luxury-beige/30 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-luxury-forest"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/60 mb-2 block">Category</label>
                <select 
                  value={newActivity.type}
                  onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                  className="w-full bg-luxury-beige/30 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-luxury-forest"
                >
                  <option value="Sightseeing">Sightseeing</option>
                  <option value="Dining">Dining</option>
                  <option value="Flight">Flight</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Experience">Experience</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-3 rounded-xl border border-black/10 font-bold text-sm">Cancel</button>
            <AnimatedButton onClick={handleAddActivity}>Add Activity</AnimatedButton>
          </div>
        </DialogContent>
      </Dialog>
      
    </div>
  );
}
