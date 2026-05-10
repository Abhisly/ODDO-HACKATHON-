"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ArrowRight, Star, Plus } from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function DiscoverPage() {
  const { destinations } = useTravelStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Cultural', 'Coastal', 'Romantic', 'Nature', 'Urban'];

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || dest.category.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" 
            alt="Travel Hero" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white dark:to-black" />
        </motion.div>

        <div className="relative z-10 editorial-container text-center max-w-4xl pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-8 h-px bg-red-600" />
              <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs">Curated Escape</span>
              <span className="w-8 h-px bg-red-600" />
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-serif font-medium leading-tight mb-8 text-luxury-charcoal dark:text-white">
              Discover the Art of <br/> Elegant Travel
            </h1>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-luxury-charcoal/40">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Search destinations, experiences..."
                className="w-full pl-14 pr-6 py-5 rounded-full bg-white dark:bg-white/10 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-luxury outline-none focus:ring-2 focus:ring-red-600/20 transition-all text-luxury-charcoal dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories & Filter */}
      <section className="editorial-container py-12">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-8 py-3 rounded-full text-sm font-medium transition-all tracking-wide border",
                activeCategory === cat 
                  ? "bg-luxury-charcoal dark:bg-white text-white dark:text-luxury-charcoal border-luxury-charcoal dark:border-white" 
                  : "bg-transparent text-luxury-charcoal/60 dark:text-white/60 border-black/10 dark:border-white/10 hover:border-red-600/40"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <div className="editorial-card group">
                  <div className="relative h-[400px] overflow-hidden">
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <button 
                      onClick={() => toast.success(`Added ${dest.name} to your plan`)}
                      className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-red-600 hover:border-red-600"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">{dest.category}</span>
                      <span className="w-1 h-1 rounded-full bg-black/10 dark:bg-white/10" />
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-[10px] font-bold text-luxury-charcoal/40 dark:text-white/40">4.9</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-serif font-medium mb-4 text-luxury-charcoal dark:text-white group-hover:text-red-600 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-luxury-charcoal/60 dark:text-white/60 leading-relaxed mb-6 line-clamp-2">
                      {dest.description}
                    </p>
                    <button className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase group-hover:gap-4 transition-all text-luxury-charcoal dark:text-white">
                      Explore Details <ArrowRight className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
