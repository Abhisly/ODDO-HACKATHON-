'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Compass, Calendar, ArrowRight, Sun, Cloud, CloudRain, Snowflake, Clock } from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { TripCard } from '@/components/features/TripCard';
import { TravelCarousel } from '@/components/features/TravelCarousel';
import { MOCK_ACTIVITY_FEED } from '@/lib/mockData';

const getWeatherIcon = (icon: string) => {
  switch(icon) {
    case 'Sun': return <Sun className="w-8 h-8 text-yellow-500" />;
    case 'Cloud': return <Cloud className="w-8 h-8 text-gray-400" />;
    case 'CloudRain': return <CloudRain className="w-8 h-8 text-blue-400" />;
    case 'Snowflake': return <Snowflake className="w-8 h-8 text-blue-200" />;
    default: return <Sun className="w-8 h-8" />;
  }
};

export default function DashboardPage() {
  const { trips, destinations } = useTravelStore();

  const upcomingTrips = trips.filter(trip => trip.status === 'Upcoming' || trip.status === 'Planning');
  const recentTrips = trips.filter(trip => trip.status === 'Completed');
  const heroTrip = upcomingTrips.length > 0 ? upcomingTrips[0] : null;

  const trendingDestinations = useMemo(() => {
    return destinations.filter(dest => dest.priceLevel === '$$$$' || dest.category === 'Cultural');
  }, [destinations]);

  return (
    <div className="pb-24">
      
      {/* Immersive Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-end pb-24">
        {heroTrip ? (
          <div className="absolute inset-0 cinematic-image-container">
            <img src={heroTrip.destination.image} alt={heroTrip.destination.name} className="cinematic-image" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-luxury-charcoal" />
        )}
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-end gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/70 mb-4 block">
              {heroTrip ? 'Your Next Journey' : 'Welcome to Traveloop'}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-6 leading-tight">
              {heroTrip ? heroTrip.destination.name : 'Ready for your next adventure?'}
            </h1>
            <p className="text-xl text-white/70 font-light leading-relaxed mb-8">
              {heroTrip 
                ? `Departing on ${new Date(heroTrip.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}. The world is waiting.`
                : 'Plan your next luxury escape with our AI-powered travel concierge.'}
            </p>
            <div className="flex gap-4">
              <Link href="/dashboard/create">
                <AnimatedButton leftIcon={<Plus className="w-4 h-4" />}>
                  Plan New Trip
                </AnimatedButton>
              </Link>
              {heroTrip && (
                <Link href="/matrix">
                  <AnimatedButton variant="ghost" className="text-white hover:bg-white/10 hover:text-white border border-white/20">
                    View Itinerary
                  </AnimatedButton>
                </Link>
              )}
            </div>
          </motion.div>

          {/* Weather Widget (Only if upcoming trip exists and has weather data) */}
          {heroTrip && heroTrip.destination.weather && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <GlassPanel intensity="light" className="p-6 w-64 border-white/20 text-white">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-bold tracking-widest uppercase text-white/60 block">Current Weather</span>
                  {getWeatherIcon(heroTrip.destination.weather.icon)}
                </div>
                <h3 className="font-serif text-5xl font-medium mb-1">
                  {heroTrip.destination.weather.temp}°C
                </h3>
                <p className="text-white/80">{heroTrip.destination.weather.condition} in {heroTrip.destination.name.split(',')[0]}</p>
              </GlassPanel>
            </motion.div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 space-y-24">
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Trips */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Upcoming Trips */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <h2 className="font-serif text-3xl font-medium tracking-tight text-luxury-charcoal">Active Journeys</h2>
                <Link href="/trips" className="text-sm font-bold tracking-widest uppercase text-luxury-charcoal/60 hover:text-luxury-charcoal transition-colors">View All</Link>
              </div>
              
              {upcomingTrips.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {upcomingTrips.map((trip, i) => (
                    <Link key={trip.id} href="/matrix">
                      <TripCard trip={trip} index={i} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-12 border border-dashed border-black/10 rounded-3xl text-center">
                  <Compass className="w-10 h-10 text-luxury-charcoal/20 mx-auto mb-4" />
                  <p className="text-luxury-charcoal/60">No active journeys. Start planning your next adventure.</p>
                </div>
              )}
            </section>

            {/* AI Travel Carousel */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <h2 className="font-serif text-3xl font-medium tracking-tight text-luxury-charcoal">Trending Destinations</h2>
                <Link href="/discover" className="text-sm font-bold tracking-widest uppercase text-luxury-charcoal/60 hover:text-luxury-charcoal transition-colors">Explore</Link>
              </div>
              <TravelCarousel destinations={trendingDestinations} />
            </section>
            
          </div>

          {/* Right Column: Activity Feed & Quick Actions */}
          <div className="space-y-8">
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Link href="/telemetry" className="p-6 bg-white border border-black/5 rounded-3xl hover:border-black/20 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-3 group">
                <div className="w-12 h-12 bg-luxury-beige rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5 text-luxury-forest" />
                </div>
                <span className="font-medium text-sm text-luxury-charcoal">Budget & Packing</span>
              </Link>
              <Link href="/missions" className="p-6 bg-white border border-black/5 rounded-3xl hover:border-black/20 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-3 group">
                <div className="w-12 h-12 bg-luxury-beige rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Compass className="w-5 h-5 text-luxury-forest" />
                </div>
                <span className="font-medium text-sm text-luxury-charcoal">Travel Journal</span>
              </Link>
            </div>

            {/* Activity Feed */}
            <div className="bg-white border border-black/5 rounded-3xl p-8 shadow-sm">
              <h3 className="font-serif text-xl font-medium mb-6">Activity Feed</h3>
              <div className="space-y-8">
                {MOCK_ACTIVITY_FEED.map((feed) => (
                  <div key={feed.id} className="flex gap-4 group">
                    <div className="relative mt-1">
                      <div className="w-10 h-10 rounded-full bg-luxury-beige flex items-center justify-center shrink-0 border border-black/5">
                         {/* Dynamic Icon fallback */}
                        <Clock className="w-4 h-4 text-luxury-forest" />
                      </div>
                      <div className="absolute top-10 bottom-[-32px] left-1/2 w-px bg-black/5 group-last:hidden" />
                    </div>
                    <div>
                      <p className="text-sm text-luxury-charcoal/90 font-medium mb-1 leading-relaxed">{feed.text}</p>
                      <p className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/40">{feed.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
