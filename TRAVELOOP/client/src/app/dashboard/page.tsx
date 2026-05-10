'use client';

import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Plus, Compass, Calendar, ArrowRight, ArrowUpRight,
  Sun, Cloud, CloudRain, Snowflake, MapPin, Wallet,
  Sparkles, Bed, Plane, Clock, ChevronRight, Globe, TrendingUp
} from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import Link from 'next/link';
import { MOCK_ACTIVITY_FEED, MOCK_DESTINATIONS } from '@/lib/mockData';
import { format } from 'date-fns';

// ─── Helpers ───────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
});

const stagger = {
  animate: { transition: { staggerChildren: 0.09 } }
};

const ActivityIcon = ({ type }: { type: string }) => {
  const map: Record<string, React.ReactNode> = {
    booking: <Bed className="w-4 h-4" />,
    alert: <Plane className="w-4 h-4" />,
    ai: <Sparkles className="w-4 h-4" />,
    budget: <Wallet className="w-4 h-4" />,
  };
  return <>{map[type] || <Clock className="w-4 h-4" />}</>;
};

const WeatherIcon = ({ icon }: { icon: string }) => {
  const map: Record<string, React.ReactNode> = {
    Sun: <Sun className="w-5 h-5 text-yellow-400" />,
    Cloud: <Cloud className="w-5 h-5 text-gray-400" />,
    CloudRain: <CloudRain className="w-5 h-5 text-blue-400" />,
    Snowflake: <Snowflake className="w-5 h-5 text-blue-200" />,
  };
  return <>{map[icon] || <Sun className="w-5 h-5 text-yellow-400" />}</>;
};

// ─── Trip Hero Card ─────────────────────────────────────────
function HeroTripCard({ trip }: { trip: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const nights = Math.ceil(
    (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / 86400000
  );

  return (
    <div ref={ref} className="relative h-[420px] rounded-3xl overflow-hidden group cursor-pointer">
      {/* Parallax Image */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110 will-change-transform">
        <img
          src={trip.destination.image}
          alt={trip.destination.name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Status Badge */}
      <div className="absolute top-5 left-5">
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border backdrop-blur-md ${
          trip.status === 'Upcoming'
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            : 'bg-red-500/20 text-red-300 border-red-500/30'
        }`}>
          {trip.status}
        </span>
      </div>

      {/* Weather */}
      <div className="absolute top-5 right-5 flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        <WeatherIcon icon={trip.destination.weather?.icon || 'Sun'} />
        <span className="text-white text-sm font-bold">{trip.destination.weather?.temp}°</span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {trip.destination.region || 'International'}
            </p>
            <h3 className="text-white font-serif text-3xl font-bold leading-tight mb-3">
              {trip.destination.name}
            </h3>
            <div className="flex items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {format(new Date(trip.startDate), 'MMM d')} – {format(new Date(trip.endDate), 'MMM d, yyyy')}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {nights} nights
              </span>
            </div>
          </div>

          <Link
            href={`/trips/${trip.id}`}
            className="shrink-0 w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center hover:scale-110 hover:bg-red-500 transition-all shadow-xl shadow-red-600/40"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Budget bar */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/60 text-xs">
            <Wallet className="w-3.5 h-3.5" />
            <span>Budget: <strong className="text-white">${trip.budget.toLocaleString()}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-xs">
            <span>{trip.travelers} traveller{trip.travelers !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Compact Trip Card ──────────────────────────────────────
function CompactTripCard({ trip, index }: { trip: any; index: number }) {
  return (
    <motion.div {...fadeUp(index * 0.1)}>
      <Link href={`/trips/${trip.id}`} className="group flex items-center gap-4 p-4 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10 hover:border-red-400/40 transition-all hover:shadow-lg">
        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
          <img src={trip.destination.image} alt={trip.destination.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-serif font-bold text-luxury-charcoal dark:text-white truncate">{trip.destination.name}</p>
          <p className="text-xs text-luxury-charcoal/50 dark:text-white/40 mt-0.5">{format(new Date(trip.startDate), 'MMM d')} – {format(new Date(trip.endDate), 'MMM d, yyyy')}</p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-bold shrink-0 ${
          trip.status === 'Upcoming' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' :
          trip.status === 'Planning' ? 'bg-red-500/15 text-red-600 dark:text-red-400' :
          'bg-gray-500/10 text-gray-500 dark:text-gray-400'
        }`}>{trip.status}</span>
      </Link>
    </motion.div>
  );
}

// ─── Destination Discover Card ──────────────────────────────
function DiscoverCard({ dest, index }: { dest: any; index: number }) {
  return (
    <motion.div
      {...fadeUp(index * 0.08)}
      className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer"
    >
      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
        <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
          <ArrowUpRight className="w-4 h-4 text-red-600" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-[10px] font-bold tracking-widest uppercase text-red-300 mb-1 block">{dest.category}</span>
        <h4 className="text-white font-serif font-bold text-lg leading-tight">{dest.name}</h4>
        <p className="text-white/60 text-xs mt-1 flex items-center gap-1">
          <Globe className="w-3 h-3" /> {dest.region} · {dest.priceLevel}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Quick Action ───────────────────────────────────────────
function QuickAction({ icon, label, href, color }: { icon: React.ReactNode; label: string; href: string; color: string }) {
  return (
    <Link href={href} className={`group relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border transition-all duration-300 overflow-hidden
      bg-white/60 dark:bg-white/5 backdrop-blur-xl border-white/30 dark:border-white/10
      hover:border-red-400/50 hover:shadow-lg hover:-translate-y-1`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
        {icon}
      </div>
      <span className="text-sm font-bold text-luxury-charcoal dark:text-white text-center leading-tight">{label}</span>
    </Link>
  );
}

// ─── Main Dashboard ─────────────────────────────────────────
export default function DashboardPage() {
  const { trips, destinations } = useTravelStore();

  const upcomingTrips = trips.filter(t => t.status === 'Upcoming' || t.status === 'Planning');
  const heroTrip = upcomingTrips[0] ?? null;
  const sideTrips = upcomingTrips.slice(1);
  const completedTrips = trips.filter(t => t.status === 'Completed');

  const trendingDests = useMemo(() => MOCK_DESTINATIONS.slice(0, 4), []);

  // Stats
  const totalTrips = trips.length;
  const totalBudget = trips.reduce((s, t) => s + t.budget, 0);
  const totalCountries = new Set(trips.map(t => t.destination.region)).size;

  return (
    <div className="min-h-screen pt-20 pb-32 w-full overflow-x-hidden">

      {/* ── Page Hero ── */}
      <section className="w-full px-4 md:px-6 mb-8">
        <motion.div {...fadeUp(0)} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-red-500 mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-red-500 inline-block" />
              Your Travel Command Center
            </p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-luxury-charcoal dark:text-white leading-tight">
              Welcome back,<br />
              <span className="text-red-600">Explorer.</span>
            </h1>
          </div>

          <Link href="/planner" className="btn-luxury flex items-center gap-2.5 px-7 py-4 text-base shrink-0 shadow-xl shadow-red-600/25">
            <Plus className="w-5 h-5" />
            Plan New Trip
          </Link>
        </motion.div>

        {/* Stats Strip */}
        <motion.div {...fadeUp(0.15)} className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Trips', value: totalTrips, icon: <Compass className="w-4 h-4" />, suffix: '' },
            { label: 'Countries', value: totalCountries, icon: <Globe className="w-4 h-4" />, suffix: '+' },
            { label: 'Upcoming', value: upcomingTrips.length, icon: <Calendar className="w-4 h-4" />, suffix: '' },
            { label: 'Total Budget', value: `$${(totalBudget / 1000).toFixed(0)}K`, icon: <Wallet className="w-4 h-4" />, suffix: '' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }}
              className="p-5 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10"
            >
              <div className="flex items-center gap-2 text-luxury-charcoal/50 dark:text-white/40 text-xs font-bold uppercase tracking-widest mb-3">
                <span className="text-red-500">{stat.icon}</span>
                {stat.label}
              </div>
              <p className="font-serif text-3xl font-bold text-luxury-charcoal dark:text-white">
                {stat.value}{stat.suffix}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Main Grid ── */}
      <section className="w-full px-4 md:px-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">

          {/* ── LEFT: 3 cols ── */}
          <div className="xl:col-span-3 space-y-8">

            {/* Hero Journey */}
            {heroTrip && (
              <motion.div {...fadeUp(0.1)}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-serif text-2xl font-bold text-luxury-charcoal dark:text-white">Next Journey</h2>
                  <Link href="/trips" className="flex items-center gap-1 text-xs font-bold tracking-widest uppercase text-red-500 hover:text-red-600 transition-colors">
                    All Trips <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <HeroTripCard trip={heroTrip} />
              </motion.div>
            )}

            {/* Side trips list */}
            {sideTrips.length > 0 && (
              <motion.div variants={stagger} initial="initial" animate="animate">
                <h2 className="font-serif text-xl font-bold text-luxury-charcoal dark:text-white mb-4">Also Planned</h2>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {sideTrips.map((t, i) => <CompactTripCard key={t.id} trip={t} index={i} />)}
                </div>
              </motion.div>
            )}

            {/* Empty state */}
            {upcomingTrips.length === 0 && (
              <motion.div {...fadeUp(0.15)} className="h-72 rounded-3xl border-2 border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center gap-5">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center">
                  <Compass className="w-8 h-8 text-red-500" />
                </div>
                <div className="text-center">
                  <p className="font-serif text-xl font-medium text-luxury-charcoal/60 dark:text-white/50">No journeys planned yet</p>
                  <p className="text-sm text-luxury-charcoal/40 dark:text-white/30 mt-1">Start building your next adventure</p>
                </div>
                <Link href="/planner" className="btn-luxury px-6 py-3 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Plan a Trip
                </Link>
              </motion.div>
            )}

            {/* Discover Destinations — full bleed grid */}
            <motion.div {...fadeUp(0.2)}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-2xl font-bold text-luxury-charcoal dark:text-white">Discover</h2>
                <Link href="/discover" className="flex items-center gap-1 text-xs font-bold tracking-widest uppercase text-red-500 hover:text-red-600 transition-colors">
                  Explore All <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {trendingDests.map((dest, i) => (
                  <DiscoverCard key={dest.id} dest={dest} index={i} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: 1 col ── */}
          <div className="xl:col-span-1 space-y-5">

            {/* Quick Actions */}
            <motion.div {...fadeUp(0.12)}>
              <h3 className="font-serif text-lg font-bold text-luxury-charcoal dark:text-white mb-4">Quick Access</h3>
              <div className="grid grid-cols-2 gap-3">
                <QuickAction href="/planner" icon={<Compass className="w-5 h-5 text-white" />} label="Plan Trip" color="bg-red-600" />
                <QuickAction href="/matrix" icon={<TrendingUp className="w-5 h-5 text-white" />} label="Route Matrix" color="bg-gray-700 dark:bg-gray-600" />
                <QuickAction href="/telemetry" icon={<Wallet className="w-5 h-5 text-white" />} label="Budget & Packing" color="bg-red-800 dark:bg-red-900" />
                <QuickAction href="/missions" icon={<Sparkles className="w-5 h-5 text-white" />} label="Travel Journal" color="bg-gray-600 dark:bg-gray-700" />
                <QuickAction href="/concierge" icon={<Sparkles className="w-5 h-5 text-white" />} label="AI Concierge" color="bg-red-600" />
                <QuickAction href="/trips" icon={<MapPin className="w-5 h-5 text-white" />} label="My Trips" color="bg-gray-700 dark:bg-gray-600" />
              </div>
            </motion.div>

            {/* Activity Feed */}
            <motion.div {...fadeUp(0.18)} className="rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10 overflow-hidden">
              <div className="px-5 pt-5 pb-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-luxury-charcoal dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Live Feed
                </h3>
              </div>
              <div className="divide-y divide-black/5 dark:divide-white/5">
                {MOCK_ACTIVITY_FEED.map((feed, i) => (
                  <motion.div
                    key={feed.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-4 px-5 py-4 hover:bg-red-500/5 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-red-600/10 dark:bg-red-600/20 flex items-center justify-center shrink-0 text-red-600 dark:text-red-400 mt-0.5">
                      <ActivityIcon type={feed.type} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-luxury-charcoal dark:text-white/90 font-medium leading-snug">{feed.text}</p>
                      <p className="text-[11px] text-luxury-charcoal/40 dark:text-white/30 mt-1 font-bold uppercase tracking-widest">{feed.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Weather widget */}
            {heroTrip && (
              <motion.div {...fadeUp(0.25)} className="rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10 p-5">
                <h3 className="font-serif text-base font-bold text-luxury-charcoal dark:text-white mb-4">Destination Weather</h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img src={heroTrip.destination.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-luxury-charcoal dark:text-white text-sm">{heroTrip.destination.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <WeatherIcon icon={heroTrip.destination.weather?.icon || 'Sun'} />
                      <span className="text-2xl font-serif font-bold text-luxury-charcoal dark:text-white">{heroTrip.destination.weather?.temp}°C</span>
                      <span className="text-sm text-luxury-charcoal/50 dark:text-white/40">{heroTrip.destination.weather?.condition}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

