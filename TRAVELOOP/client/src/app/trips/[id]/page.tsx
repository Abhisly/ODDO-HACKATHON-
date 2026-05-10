'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, Wallet, Clock, ArrowRight, ArrowLeft, Coffee, Bed, Plane, Navigation, Edit3 } from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import { useParams, useRouter } from 'next/navigation';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { format } from 'date-fns';
import Link from 'next/link';
import { BudgetWidget } from '@/components/features/CommandCenter/BudgetWidget';

export default function TripViewPage() {
  const params = useParams();
  const router = useRouter();
  const { trips, setActiveTrip } = useTravelStore();
  const [mounted, setMounted] = useState(false);
  
  const tripId = params.id as string;
  const trip = trips.find(t => t.id === tripId);

  useEffect(() => {
    setMounted(true);
    if (trip) {
      setActiveTrip(trip.id);
    }
  }, [trip, setActiveTrip]);

  if (!mounted) return null;

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-serif text-4xl mb-4">Trip Not Found</h1>
        <p className="text-luxury-charcoal/60 mb-8">The journey you are looking for does not exist.</p>
        <Link href="/trips">
          <AnimatedButton>Return to Portfolio</AnimatedButton>
        </Link>
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'Flight': return <Plane className="w-5 h-5" />;
      case 'Accommodation': return <Bed className="w-5 h-5" />;
      case 'Dining': return <Coffee className="w-5 h-5" />;
      default: return <Navigation className="w-5 h-5" />;
    }
  };

  return (
    <div className="pb-24">
      {/* Cinematic Hero Header */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-end pb-12">
        <div className="absolute inset-0 cinematic-image-container">
          <img src={trip.destination.image} alt={trip.destination.name} className="cinematic-image" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        </div>
        
        {/* Top Nav Back Button */}
        <div className="absolute top-32 left-6 md:left-12 z-20">
          <Link href="/trips" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
            <ArrowLeft className="w-4 h-4" /> Back to Trips
          </Link>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-end gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
                {trip.status}
              </span>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/70">
                {trip.destination.region || 'Global'}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-4 leading-tight">
              {trip.destination.name}
            </h1>
            <p className="text-xl text-white/80 font-light leading-relaxed mb-8 max-w-2xl">
              {trip.destination.description}
            </p>
            <div className="flex flex-wrap gap-6 text-white/90 font-medium">
              <span className="flex items-center gap-2"><Calendar className="w-5 h-5 text-white/60" /> {format(new Date(trip.startDate), 'MMM dd')} - {format(new Date(trip.endDate), 'MMM dd, yyyy')}</span>
              <span className="flex items-center gap-2"><Users className="w-5 h-5 text-white/60" /> {trip.travelers} Travelers</span>
              <span className="flex items-center gap-2"><Wallet className="w-5 h-5 text-white/60" /> ${trip.budget.toLocaleString()}</span>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link href="/matrix">
              <AnimatedButton variant="ghost" className="bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-luxury-charcoal" leftIcon={<Edit3 className="w-4 h-4" />}>
                Edit in Route Matrix
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Itinerary Timeline */}
          <div className="lg:col-span-2 space-y-16">
            <div>
              <h2 className="font-serif text-3xl font-medium mb-8">Journey Itinerary</h2>
              
              {trip.itinerary.length > 0 ? (
                <div className="space-y-12 relative">
                  <div className="absolute left-6 top-8 bottom-8 w-px bg-black/10 hidden md:block" />
                  
                  {trip.itinerary.map((day) => (
                    <div key={day.day} className="relative z-10">
                      <div className="sticky top-24 bg-[#FDFBF7]/90 backdrop-blur-md py-4 z-20 mb-6 -mx-4 px-4 border-b border-black/5">
                        <h3 className="font-serif text-2xl font-medium">Day {day.day}</h3>
                        <p className="text-sm text-luxury-charcoal/60 uppercase tracking-widest font-bold mt-1">{format(new Date(day.date), 'EEEE, MMMM do')}</p>
                      </div>

                      <div className="space-y-6">
                        {day.activities.length > 0 ? day.activities.map((act) => (
                          <motion.div 
                            key={act.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative pl-0 md:pl-16"
                          >
                            <div className="absolute left-[21px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-luxury-forest hidden md:block group-hover:scale-125 transition-transform" />
                            
                            <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-black/10 transition-all flex flex-col sm:flex-row sm:items-center gap-6">
                              <div className="w-14 h-14 rounded-full bg-luxury-cream flex items-center justify-center shrink-0 border border-black/5 text-luxury-charcoal">
                                {getActivityIcon(act.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-serif text-xl font-medium">{act.title}</h4>
                                  <span className="text-sm font-bold tracking-widest text-luxury-charcoal/50 shrink-0">{act.time}</span>
                                </div>
                                <span className="text-xs uppercase tracking-widest text-luxury-forest font-bold bg-luxury-forest/5 px-3 py-1 rounded-full">{act.type}</span>
                              </div>
                            </div>
                          </motion.div>
                        )) : (
                          <div className="pl-0 md:pl-16">
                            <div className="h-32 rounded-3xl border border-dashed border-black/10 flex flex-col items-center justify-center text-luxury-charcoal/40 bg-white/50">
                              <p className="font-medium">No activities planned.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center border border-dashed border-black/10 rounded-3xl">
                  <MapPin className="w-12 h-12 text-luxury-charcoal/20 mx-auto mb-4" />
                  <p className="font-serif text-2xl text-luxury-charcoal">Empty Itinerary</p>
                  <p className="text-luxury-charcoal/60 mt-2 mb-8">This trip doesn't have any days planned yet.</p>
                  <Link href="/matrix">
                    <AnimatedButton>Open Route Matrix</AnimatedButton>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            <GlassPanel className="p-8 bg-white border-black/5 shadow-sm space-y-8">
              <div>
                <h3 className="text-xs font-bold tracking-widest uppercase text-luxury-charcoal/50 mb-4 block">Travel Telemetry</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-black/5 pb-4">
                    <span className="flex items-center gap-2 text-luxury-charcoal/80"><MapPin className="w-4 h-4" /> Distance</span>
                    <span className="font-serif font-medium">{trip.destination.distance?.toLocaleString() || 'N/A'} km</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-black/5 pb-4">
                    <span className="flex items-center gap-2 text-luxury-charcoal/80"><Clock className="w-4 h-4" /> Est. Duration</span>
                    <span className="font-serif font-medium">{trip.destination.duration || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-luxury-charcoal/80"><Users className="w-4 h-4" /> Party Size</span>
                    <span className="font-serif font-medium">{trip.travelers}</span>
                  </div>
                </div>
              </div>
            </GlassPanel>

            <div>
              <h3 className="font-serif text-2xl font-medium mb-6">Budget Overview</h3>
              <BudgetWidget />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
