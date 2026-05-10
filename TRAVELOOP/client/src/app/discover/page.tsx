'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Filter, Sun, Cloud, CloudRain, Snowflake, ArrowRight } from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DestinationCard } from '@/components/features/DestinationCard';
import { SearchBar } from '@/components/features/SearchBar';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog';
import { useRouter } from 'next/navigation';

const REGIONS = ['All', 'Europe', 'Asia', 'North America', 'South America', 'Africa'];
const CATEGORIES = ['All', 'Cultural', 'Coastal Luxury', 'Romantic', 'Nature & Adventure', 'Urban'];

const getWeatherIcon = (icon: string) => {
  switch(icon) {
    case 'Sun': return <Sun className="w-5 h-5 text-yellow-500" />;
    case 'Cloud': return <Cloud className="w-5 h-5 text-gray-400" />;
    case 'CloudRain': return <CloudRain className="w-5 h-5 text-blue-400" />;
    case 'Snowflake': return <Snowflake className="w-5 h-5 text-blue-200" />;
    default: return <Sun className="w-5 h-5" />;
  }
};

export default function DiscoverPage() {
  const { destinations } = useTravelStore();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDest, setSelectedDest] = useState<any | null>(null);

  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || dest.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;
      const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
      return matchesSearch && matchesRegion && matchesCategory;
    });
  }, [destinations, searchQuery, selectedRegion, selectedCategory]);

  const handleStartPlanning = (destId: string) => {
    // In a real app we might pre-populate the wizard via store or query params
    setSelectedDest(null);
    router.push('/dashboard/create');
  };

  return (
    <div className="editorial-container pt-32 pb-24">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
        <SectionHeader 
          eyebrow="Global Catalog"
          title="Discover the World"
          subtitle="Explore our curated collection of luxury destinations."
          className="mb-0"
        />
        <div className="w-full md:w-96 shrink-0">
          <SearchBar 
            placeholder="Search cities, countries, experiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start lg:items-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-black/5 shadow-sm shrink-0">
          <Filter className="w-4 h-4 text-luxury-charcoal/40" />
          <span className="text-sm font-bold tracking-widest uppercase text-luxury-charcoal/60">Filters</span>
        </div>
        
        <div className="flex-1 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide flex gap-3">
          {REGIONS.map(region => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap border ${selectedRegion === region ? 'bg-luxury-charcoal text-white border-luxury-charcoal' : 'bg-white text-luxury-charcoal/60 border-black/5 hover:border-black/20 shadow-sm'}`}
            >
              {region}
            </button>
          ))}
          <div className="w-px h-8 bg-black/10 shrink-0 self-center hidden lg:block mx-2" />
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap border ${selectedCategory === category ? 'bg-luxury-forest text-white border-luxury-forest' : 'bg-white text-luxury-charcoal/60 border-black/5 hover:border-black/20 shadow-sm'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredDestinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <DestinationCard 
                id={dest.id}
                name={dest.name}
                image={dest.image}
                category={dest.category}
                priceLevel={dest.priceLevel}
                onClick={() => setSelectedDest(dest)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredDestinations.length === 0 && (
        <div className="py-32 text-center flex flex-col items-center border border-dashed border-black/10 rounded-3xl mt-8">
          <MapPin className="w-12 h-12 text-luxury-charcoal/20 mb-4" />
          <h3 className="text-2xl font-serif text-luxury-charcoal">No destinations found</h3>
          <p className="text-luxury-charcoal/50 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* Details Modal */}
      <Dialog open={!!selectedDest} onOpenChange={(open) => !open && setSelectedDest(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {selectedDest && (
            <div className="flex flex-col md:flex-row h-full">
              {/* Image Side */}
              <div className="md:w-1/2 h-64 md:h-auto relative">
                <img src={selectedDest.image} alt={selectedDest.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-2 block">{selectedDest.category}</span>
                  <h2 className="text-4xl font-serif font-medium">{selectedDest.name}</h2>
                </div>
              </div>
              
              {/* Content Side */}
              <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between bg-luxury-cream">
                <div>
                  <DialogHeader>
                    <DialogTitle className="hidden">{selectedDest.name}</DialogTitle>
                  </DialogHeader>
                  <p className="text-lg text-luxury-charcoal/70 leading-relaxed mb-8">
                    {selectedDest.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-white rounded-2xl border border-black/5 flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-widest text-luxury-charcoal/40 font-bold">Region</span>
                      <span className="font-medium">{selectedDest.region}</span>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-black/5 flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-widest text-luxury-charcoal/40 font-bold">Price Level</span>
                      <span className="font-medium tracking-widest">{selectedDest.priceLevel}</span>
                    </div>
                    {selectedDest.weather && (
                      <div className="col-span-2 p-4 bg-white rounded-2xl border border-black/5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-luxury-beige flex items-center justify-center">
                          {getWeatherIcon(selectedDest.weather.icon)}
                        </div>
                        <div>
                          <span className="text-xs uppercase tracking-widest text-luxury-charcoal/40 font-bold block mb-1">Current Weather</span>
                          <span className="font-serif text-2xl font-medium">{selectedDest.weather.temp}°C <span className="text-base text-luxury-charcoal/60 font-sans">{selectedDest.weather.condition}</span></span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <AnimatedButton 
                  onClick={() => handleStartPlanning(selectedDest.id)}
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4 ml-2" />}
                >
                  Start Planning Journey
                </AnimatedButton>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
