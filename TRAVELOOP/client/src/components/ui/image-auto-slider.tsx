import React from 'react';
import { cn } from "@/lib/utils";

export const ImageAutoSlider = ({ className }: { className?: string }) => {
  // Images for the infinite scroll - using Unsplash URLs representing luxury travel
  const images = [
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format&fit=crop", // Kyoto
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2152&auto=format&fit=crop", // Nature
    "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2126&auto=format&fit=crop", // Rome
    "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=1965&auto=format&fit=crop", // Bali
    "https://plus.unsplash.com/premium_photo-1673264933212-d78737f38e48?q=80&w=1974&auto=format&fit=crop", // Venice
    "https://plus.unsplash.com/premium_photo-1711434824963-ca894373272e?q=80&w=2030&auto=format&fit=crop", // Paris
    "https://plus.unsplash.com/premium_photo-1675705721263-0bbeec261c49?q=80&w=1940&auto=format&fit=crop", // Maldives
    "https://images.unsplash.com/photo-1524799526615-766a9833dec0?q=80&w=1935&auto=format&fit=crop"  // Swiss Alps
  ];

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className={cn("w-full relative overflow-hidden flex flex-col items-center justify-center pointer-events-auto", className)}>
      <style>{`
        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .infinite-scroll {
          animation: scroll-right 25s linear infinite;
        }
        
        .infinite-scroll:hover {
          animation-play-state: paused;
        }

        .scroll-container-mask {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item-slider {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
        }

        .image-item-slider:hover {
          transform: scale(1.05) translateY(-10px);
          filter: brightness(1.1);
          z-index: 10;
        }
      `}</style>
      
      {/* Scrolling images container */}
      <div className="relative z-10 w-full flex items-center justify-center py-12">
        <div className="scroll-container-mask w-full max-w-[100vw] px-4">
          <div className="infinite-scroll flex gap-6 w-max">
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="image-item-slider relative flex-shrink-0 w-48 h-64 md:w-64 md:h-80 lg:w-72 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/10 dark:border-white/5 bg-black/10"
              >
                <img
                  src={image}
                  alt={`Destination ${(index % images.length) + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
