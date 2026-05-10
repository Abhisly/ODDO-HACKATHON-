'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Clock, Coffee, Bed, Plane, Navigation, Compass } from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';

export default function SharedTripViewPage() {
  const params = useParams();
  const { trips } = useTravelStore();
  const [mounted, setMounted] = useState(false);
  
  const tripId = params.id as string;
  const trip = trips.find(t => t.id === tripId);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-luxury-cream">
        <Compass className="w-16 h-16 text-luxury-charcoal/20 mb-6" />
        <h1 className="font-serif text-4xl mb-4">Journey Not Found</h1>
        <p className="text-luxury-charcoal/60 mb-8 max-w-md">This travel document is either private, has expired, or does not exist.</p>
        <Link href="/" className="btn-luxury">
          Create Your Own Journey
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
    <div className="pb-24 bg-[#FDFBF7] min-h-screen">
      
      {/* Shared Document Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-black/5 z-50 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-red-600" />
          <span className="font-serif font-bold text-lg tracking-tight">Traveloop.</span>
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/40 bg-luxury-beige px-3 py-1 rounded-full">
          Public Document
        </div>
      </div>

      {/* Cinematic Hero Header */}
      <section className="relative h-[70vh] min-h-[600px] w-full flex items-end pb-16 pt-16">
        <div className="absolute inset-0 cinematic-image-container">
          <img src={trip.destination.image} alt={trip.destination.name} className="cinematic-image object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-black/40 to-black/20" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <span className="text-sm font-bold tracking-[0.3em] uppercase text-red-600/90 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white">
                {trip.destination.region || 'Global'}
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tight mb-6 leading-tight text-luxury-charcoal drop-shadow-sm">
              {trip.destination.name}
            </h1>
            <p className="text-xl md:text-2xl text-luxury-charcoal/80 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              {trip.destination.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 text-luxury-charcoal/90 font-medium bg-white/60 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-xl max-w-3xl mx-auto">
              <span className="flex flex-col items-center gap-1">
                <Calendar className="w-5 h-5 text-red-600 mb-1" /> 
                <span className="text-xs uppercase tracking-widest text-luxury-charcoal/50 font-bold">Dates</span>
                <span>{format(new Date(trip.startDate), 'MMM dd')} - {format(new Date(trip.endDate), 'MMM dd, yyyy')}</span>
              </span>
              <div className="w-px h-12 bg-black/10 hidden sm:block" />
              <span className="flex flex-col items-center gap-1">
                <Users className="w-5 h-5 text-red-600 mb-1" /> 
                <span className="text-xs uppercase tracking-widest text-luxury-charcoal/50 font-bold">Party</span>
                <span>{trip.travelers} Travelers</span>
              </span>
              <div className="w-px h-12 bg-black/10 hidden sm:block" />
              <span className="flex flex-col items-center gap-1">
                <MapPin className="w-5 h-5 text-red-600 mb-1" /> 
                <span className="text-xs uppercase tracking-widest text-luxury-charcoal/50 font-bold">Distance</span>
                <span>{trip.destination.distance?.toLocaleString() || 'N/A'} km</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-12 mt-12">
        <h2 className="font-serif text-4xl font-medium mb-12 text-center text-luxury-charcoal">The Itinerary</h2>
        
        {trip.itinerary.length > 0 ? (
          <div className="space-y-16 relative">
            <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-px bg-red-600/20 hidden md:block" />
            
            {trip.itinerary.map((day, dayIdx) => (
              <div key={day.day} className="relative z-10">
                <div className="sticky top-20 bg-[#FDFBF7]/90 backdrop-blur-md py-6 z-20 mb-8 text-center border-y border-red-600/10">
                  <h3 className="font-serif text-3xl font-medium text-red-600">Day {day.day}</h3>
                  <p className="text-sm text-luxury-charcoal/50 uppercase tracking-widest font-bold mt-2">{format(new Date(day.date), 'EEEE, MMMM do')}</p>
                </div>

                <div className="space-y-8">
                  {day.activities.length > 0 ? day.activities.map((act, actIdx) => {
                    const isEven = actIdx % 2 === 0;
                    return (
                      <motion.div 
                        key={act.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                      >
                        <div className="w-full md:w-1/2" />
                        
                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border-4 border-[#FDFBF7] shadow-sm z-10" />
                        
                        <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} pl-16 md:pl-0`}>
                          <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-md hover:shadow-lg transition-shadow group">
                            <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                              <div className="w-12 h-12 rounded-full bg-luxury-beige flex items-center justify-center shrink-0 text-red-600">
                                {getActivityIcon(act.type)}
                              </div>
                              <div>
                                <span className="text-xs uppercase tracking-widest text-luxury-charcoal/40 font-bold block mb-1">{act.time}</span>
                                <span className="text-[10px] uppercase tracking-widest text-red-600 font-bold bg-red-600/5 px-2 py-1 rounded-sm">{act.type}</span>
                              </div>
                            </div>
                            <h4 className="font-serif text-2xl font-medium text-luxury-charcoal">{act.title}</h4>
                          </div>
                        </div>
                      </motion.div>
                    );
                  }) : (
                    <div className="text-center py-12 text-luxury-charcoal/40 font-medium">Free Day / No planned activities.</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-black/10 rounded-3xl bg-white/50">
            <Compass className="w-12 h-12 text-luxury-charcoal/20 mx-auto mb-4" />
            <p className="font-serif text-2xl text-luxury-charcoal">Itinerary in Progress</p>
            <p className="text-luxury-charcoal/60 mt-2">The creator is still planning this journey.</p>
          </div>
        )}
      </div>

      {/* Footer Call to Action */}
      <div className="max-w-4xl mx-auto px-6 mt-32 text-center pb-12">
        <div className="p-12 bg-luxury-charcoal text-white rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
          <h2 className="font-serif text-4xl mb-4 relative z-10">Inspired by this journey?</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto relative z-10">Use Traveloop's AI intelligence to craft your own perfect itinerary in seconds.</p>
          <Link href="/" className="inline-block px-8 py-4 bg-white text-luxury-charcoal rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform relative z-10">
            Start Planning Free
          </Link>
        </div>
      </div>

    </div>
  );
}
