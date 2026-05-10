'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, Wallet, Clock, ArrowRight, ArrowLeft, Coffee, Bed, Plane, Navigation, Edit3, Share2, Link as LinkIcon, Copy, Check, Loader2, Plus, Trash2 } from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import { useParams, useRouter } from 'next/navigation';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog';
import { format } from 'date-fns';
import Link from 'next/link';
import { BudgetWidget } from '@/components/features/BudgetWidget';
import { tripApi } from '@/lib/api';
import { toast } from 'sonner';

export default function TripViewPage() {
  const params = useParams();
  const router = useRouter();
  const { setActiveTrip } = useTravelStore();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const tripId = params.id as string;

  useEffect(() => {
    const fetchTrip = async () => {
      setLoading(true);
      try {
        const res = await tripApi.getTripById(tripId);
        setTrip(res.data);
        setActiveTrip(tripId);
      } catch (err) {
        console.error('Failed to fetch trip:', err);
        toast.error('Trip not found');
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [tripId, setActiveTrip]);

  const handleCopy = () => {
    const url = `${window.location.origin}/share/${trip?.id}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-serif text-4xl mb-4 dark:text-white">Mission Not Found</h1>
        <p className="text-luxury-charcoal/60 dark:text-white/60 mb-8">The travel intelligence you are looking for does not exist.</p>
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
          <img src={trip.destination?.heroImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80'} alt="" className="cinematic-image" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        </div>
        
        <div className="absolute top-32 left-6 md:left-12 z-20">
          <Link href="/trips" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
            <ArrowLeft className="w-4 h-4" /> Back to Missions
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
              <span className="px-3 py-1 bg-red-600 rounded-full text-white text-[10px] font-bold uppercase tracking-widest">
                {trip.status}
              </span>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/70">
                {trip.destination?.country || 'Global Expedition'}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-4 leading-tight">
              {trip.title}
            </h1>
            <p className="text-xl text-white/80 font-light leading-relaxed mb-8 max-w-2xl">
              {trip.description}
            </p>
            <div className="flex flex-wrap gap-6 text-white/90 font-medium">
              <span className="flex items-center gap-2"><Calendar className="w-5 h-5 text-red-500" /> {format(new Date(trip.startDate), 'MMM dd')} - {format(new Date(trip.endDate), 'MMM dd, yyyy')}</span>
              <span className="flex items-center gap-2"><Users className="w-5 h-5 text-red-500" /> {trip.travelersCount} Explorers</span>
              <span className="flex items-center gap-2"><Wallet className="w-5 h-5 text-red-500" /> ${trip.estimatedBudget?.toLocaleString()}</span>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3, duration: 0.6 }}
             className="flex items-center gap-4"
          >
            <AnimatedButton onClick={() => setIsShareModalOpen(true)} variant="ghost" className="bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-luxury-charcoal" leftIcon={<Share2 className="w-4 h-4" />}>
              Share Mission
            </AnimatedButton>
            <Link href="/planner">
              <AnimatedButton variant="ghost" className="bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-luxury-charcoal" leftIcon={<Edit3 className="w-4 h-4" />}>
                Modify Route
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-16">
            <div>
              <h2 className="font-serif text-3xl font-medium mb-8 dark:text-white">Mission Itinerary</h2>
              
              {trip.itinerary && trip.itinerary.length > 0 ? (
                <div className="space-y-12 relative">
                  <div className="absolute left-6 top-8 bottom-8 w-px bg-black/10 dark:bg-white/10 hidden md:block" />
                  
                  {trip.itinerary.map((day: any) => (
                    <div key={day.day} className="relative z-10">
                      <div className="sticky top-24 bg-background/80 backdrop-blur-md py-4 z-20 mb-6 -mx-4 px-4 border-b border-black/5 dark:border-white/5">
                        <h3 className="font-serif text-2xl font-medium dark:text-white">Day {day.day}</h3>
                        <p className="text-sm text-luxury-charcoal/60 dark:text-white/60 uppercase tracking-widest font-bold mt-1">{format(new Date(day.date), 'EEEE, MMMM do')}</p>
                      </div>

                      <div className="space-y-6">
                        {day.activities && day.activities.length > 0 ? day.activities.map((act: any) => (
                          <motion.div 
                            key={act.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative pl-0 md:pl-16"
                          >
                            <div className="absolute left-[21px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-red-600 hidden md:block group-hover:scale-125 transition-transform" />
                            
                            <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-red-500/30 transition-all flex flex-col sm:flex-row sm:items-center gap-6">
                              <div className="w-14 h-14 rounded-full bg-luxury-cream dark:bg-white/5 flex items-center justify-center shrink-0 border border-black/5 dark:border-white/10 text-luxury-charcoal dark:text-white">
                                {getActivityIcon(act.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-serif text-xl font-medium dark:text-white">{act.title}</h4>
                                  <span className="text-sm font-bold tracking-widest text-luxury-charcoal/50 dark:text-white/40 shrink-0">{act.time}</span>
                                </div>
                                <span className="text-xs uppercase tracking-widest text-red-600 font-bold bg-red-600/5 px-3 py-1 rounded-full">{act.type}</span>
                              </div>
                            </div>
                          </motion.div>
                        )) : (
                          <div className="pl-0 md:pl-16">
                            <div className="h-32 rounded-3xl border border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center text-luxury-charcoal/40 dark:text-white/40 bg-white/50 dark:bg-white/5">
                              <p className="font-medium">No tactical activities planned.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center border border-dashed border-black/10 dark:border-white/10 rounded-3xl">
                  <MapPin className="w-12 h-12 text-luxury-charcoal/20 mx-auto mb-4" />
                  <p className="font-serif text-2xl text-luxury-charcoal dark:text-white">Incomplete Itinerary</p>
                  <p className="text-luxury-charcoal/60 dark:text-white/60 mt-2 mb-8">This mission doesn't have any days planned yet.</p>
                  <Link href="/planner">
                    <AnimatedButton>Open Tactical Planner</AnimatedButton>
                  </Link>
                </div>
              )}
            </div>

            {/* Packing List Section */}
            <div className="grid md:grid-cols-2 gap-12">
               <div>
                  <h3 className="font-serif text-2xl font-medium mb-6 dark:text-white">Packing Manifest</h3>
                  <div className="space-y-3 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-3xl p-6">
                    {['Passport', 'Travel Adapter', 'Camera', 'First Aid Kit'].map(item => (
                      <div key={item} className="flex items-center gap-3">
                        <input type="checkbox" className="w-5 h-5 rounded border-black/10 accent-red-600" />
                        <span className="text-sm dark:text-white/80">{item}</span>
                      </div>
                    ))}
                    <button className="flex items-center gap-2 text-red-600 text-xs font-bold uppercase mt-4">
                      <Plus className="w-3 h-3" /> Add Item
                    </button>
                  </div>
               </div>
               <div>
                  <h3 className="font-serif text-2xl font-medium mb-6 dark:text-white">Field Notes</h3>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-3xl p-6">
                       <p className="text-sm text-luxury-charcoal/70 dark:text-white/70 italic mb-4">"Check out the local market in Shinjuku on Day 2. Recommended by locals."</p>
                       <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-luxury-charcoal/40">
                          <span>Admin Explorer</span>
                          <button className="text-red-600"><Trash2 className="w-3 h-3" /></button>
                       </div>
                    </div>
                    <button className="w-full py-4 border border-dashed border-black/10 dark:border-white/10 rounded-3xl text-xs font-bold uppercase text-luxury-charcoal/40 dark:text-white/40 hover:border-red-500/50 transition-colors">
                      Record Field Note
                    </button>
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <GlassPanel className="p-8 bg-white dark:bg-zinc-900 border-black/5 dark:border-white/10 shadow-sm space-y-8">
              <div>
                <h3 className="text-xs font-bold tracking-widest uppercase text-luxury-charcoal/40 dark:text-white/40 mb-4 block">Travel Telemetry</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-4">
                    <span className="flex items-center gap-2 text-luxury-charcoal/80 dark:text-white/80"><MapPin className="w-4 h-4" /> Destination</span>
                    <span className="font-serif font-medium dark:text-white">{trip.destination?.city || 'Various'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-4">
                    <span className="flex items-center gap-2 text-luxury-charcoal/80 dark:text-white/80"><Clock className="w-4 h-4" /> Est. Duration</span>
                    <span className="font-serif font-medium dark:text-white">12 Days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-luxury-charcoal/80 dark:text-white/80"><Users className="w-4 h-4" /> Party Size</span>
                    <span className="font-serif font-medium dark:text-white">{trip.travelersCount}</span>
                  </div>
                </div>
              </div>
            </GlassPanel>

            <div>
              <h3 className="font-serif text-2xl font-medium mb-6 dark:text-white">Budget Protocol</h3>
              <BudgetWidget spent={trip.estimatedBudget * 0.25} totalBudget={trip.estimatedBudget} />
            </div>
          </div>

        </div>
      </div>

      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-900 border-black/5 dark:border-white/10">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Share Intelligence</DialogTitle>
            <DialogDescription className="dark:text-white/60">
              Anyone with this encrypted link can view a beautiful, read-only version of your itinerary.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-4">
            <div className="flex-1 bg-luxury-cream dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 flex items-center justify-between overflow-hidden">
              <div className="flex items-center gap-2 text-luxury-charcoal/60 dark:text-white/60 truncate">
                <LinkIcon className="w-4 h-4 shrink-0" />
                <span className="text-sm truncate">{typeof window !== 'undefined' ? `${window.location.origin}/share/${trip.id}` : ''}</span>
              </div>
            </div>
            <button 
              onClick={handleCopy}
              className={`p-3 rounded-xl flex items-center justify-center transition-all ${isCopied ? 'bg-green-600 text-white' : 'bg-red-600 text-white hover:bg-red-700'}`}
            >
              {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
