'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Wallet, Clock, Coffee, Bed, Plane, Navigation, Globe } from 'lucide-react';
import { useParams } from 'next/navigation';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { format } from 'date-fns';
import { tripApi } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function ShareTripPage() {
  const params = useParams();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const tripId = params.id as string;

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await tripApi.getTripById(tripId);
        setTrip(res.data);
      } catch (err) {
        console.error('Failed to fetch trip:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [tripId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-cream dark:bg-black">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-luxury-cream dark:bg-black">
        <h1 className="font-serif text-4xl mb-4 dark:text-white">Trip Not Found</h1>
        <p className="text-luxury-charcoal/60 dark:text-white/60 mb-8">This shared journey is no longer available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-cream dark:bg-black pb-24">
      {/* Read-only Header */}
      <div className="bg-red-600 py-3 text-center text-white text-[10px] font-bold uppercase tracking-[0.3em] fixed top-0 left-0 right-0 z-[100]">
        Shared Intelligence Report · Read Only Mode
      </div>

      <section className="relative h-[50vh] w-full flex items-end pb-12">
        <div className="absolute inset-0 cinematic-image-container">
          <img src={trip.destination?.heroImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80'} alt="" className="cinematic-image" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
                Shared Document
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight mb-4">
              {trip.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/80 text-sm">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-red-500" /> {format(new Date(trip.startDate), 'MMM dd')} - {format(new Date(trip.endDate), 'MMM dd, yyyy')}</span>
              <span className="flex items-center gap-2"><Users className="w-4 h-4 text-red-500" /> {trip.travelersCount} Explorers</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 mt-20">
        <div className="space-y-16">
          {trip.itinerary?.map((day: any) => (
            <div key={day.day}>
              <div className="flex items-baseline gap-4 mb-8 border-b border-black/5 dark:border-white/10 pb-4">
                <h3 className="font-serif text-3xl font-medium dark:text-white">Day {day.day}</h3>
                <span className="text-sm text-luxury-charcoal/50 dark:text-white/40 uppercase tracking-widest font-bold">
                  {format(new Date(day.date), 'EEEE, MMMM do')}
                </span>
              </div>

              <div className="space-y-6">
                {day.activities?.map((act: any) => (
                  <div key={act.id} className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm text-red-600">
                      {act.type === 'Flight' ? <Plane className="w-5 h-5" /> : <Navigation className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold text-luxury-charcoal dark:text-white">{act.title}</h4>
                        <span className="text-xs text-luxury-charcoal/40 dark:text-white/40 font-bold">{act.time}</span>
                      </div>
                      <p className="text-sm text-luxury-charcoal/60 dark:text-white/60">{act.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 pt-12 border-t border-black/5 dark:border-white/10 text-center">
          <p className="text-luxury-charcoal/40 dark:text-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-6">Designed with Traveloop.</p>
          <div className="flex justify-center gap-4">
             <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-serif font-bold">T</div>
          </div>
        </div>
      </div>
    </div>
  );
}
