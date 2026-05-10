'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DestinationCard } from './DestinationCard';

interface TravelCarouselProps {
  destinations: any[];
  onSelectDestination?: (id: string) => void;
  selectedId?: string;
}

export function TravelCarousel({ destinations, onSelectDestination, selectedId }: TravelCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4 -ml-4 pl-4 pr-4">
          {destinations.map((dest) => (
            <div key={dest.id} className="min-w-[280px] sm:min-w-[320px] md:min-w-[400px] flex-none">
              <DestinationCard
                id={dest.id}
                name={dest.name}
                image={dest.image}
                category={dest.category}
                priceLevel={dest.priceLevel}
                isSelected={selectedId === dest.id}
                onClick={() => onSelectDestination?.(dest.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute -top-16 right-0 flex gap-2">
        <button
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
          className={cn(
            "w-10 h-10 rounded-full border border-black/10 flex items-center justify-center transition-all",
            prevBtnEnabled ? "hover:border-red-600 text-luxury-charcoal" : "opacity-30 cursor-not-allowed"
          )}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
          className={cn(
            "w-10 h-10 rounded-full border border-black/10 flex items-center justify-center transition-all",
            nextBtnEnabled ? "hover:border-red-600 text-luxury-charcoal" : "opacity-30 cursor-not-allowed"
          )}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
