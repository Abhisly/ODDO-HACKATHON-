'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, X, Loader2, Sparkles } from 'lucide-react';
import { destinationApi } from '@/lib/api';
import { CityDestination, DESTINATION_DATA } from '@/lib/destinationData';
import { cn } from '@/lib/utils';

interface Props {
  onSelect: (city: CityDestination) => void;
  placeholder?: string;
  excludeIds?: string[];
}

export default function CitySearchInput({ onSelect, placeholder = 'Search a city...', excludeIds = [] }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [allCities, setAllCities] = useState<CityDestination[]>(DESTINATION_DATA); // Use local data by default
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const res = await destinationApi.getAllDestinations();
        if (res.data && res.data.length > 0) {
          const mappedCities: CityDestination[] = res.data.map((c: any) => ({
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
          setAllCities(mappedCities);
        }
      } catch (err) {
        console.warn('Backend unavailable, using localized intelligence data.');
        // Stay with DESTINATION_DATA
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase();
    // If query is empty, show popular recommendations from local data
    if (!q) {
      return allCities.slice(0, 6).filter(d => !excludeIds.includes(d.id));
    }
    
    return allCities.filter(d => 
      !excludeIds.includes(d.id) && 
      (d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q))
    );
  }, [query, allCities, excludeIds]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = async (city: CityDestination) => {
    setLoading(true);
    try {
      // Check if we already have spots (from local data)
      if (city.spots && city.spots.length > 0) {
        onSelect(city);
      } else {
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
        onSelect(fullCity);
      }
    } catch (err) {
      console.warn('Detailed intel unavailable, using base destination data.');
      onSelect(city); 
    } finally {
      setLoading(false);
      setQuery('');
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative w-full">
      <div className={cn(
        'flex items-center gap-3 rounded-2xl border px-5 py-4 transition-all duration-300',
        'bg-white/60 dark:bg-white/5 backdrop-blur-xl',
        open ? 'border-red-500 shadow-[0_0_0_3px_rgba(220,38,38,0.15)]' : 'border-white/30 dark:border-white/10 hover:border-red-400/50'
      )}>
        {loading ? <Loader2 className="w-5 h-5 text-red-500 animate-spin" /> : <Search className="w-5 h-5 text-red-500 shrink-0" />}
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-luxury-charcoal dark:text-white placeholder:text-luxury-charcoal/40 dark:placeholder:text-white/30 text-base"
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-luxury-charcoal/40 hover:text-luxury-charcoal dark:text-white/40 dark:hover:text-white">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 bg-white/90 dark:bg-black/80 backdrop-blur-2xl shadow-2xl max-h-80 overflow-y-auto"
          >
            {!query && (
              <div className="px-5 py-3 border-b border-black/5 dark:border-white/5 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40">Suggested Intelligences</span>
              </div>
            )}
            {results.map((city, i) => (
              <motion.button
                key={city.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => handleSelect(city)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left border-b border-black/5 dark:border-white/5 last:border-0"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-zinc-200 dark:bg-zinc-800">
                  <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-medium text-luxury-charcoal dark:text-white text-base">{city.countryCode} {city.name}</p>
                  <p className="text-xs text-luxury-charcoal/50 dark:text-white/50 mt-0.5">{city.country} · ${city.costPerDay}/day</p>
                </div>
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
