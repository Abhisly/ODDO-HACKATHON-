import React from 'react';
import { cn } from '@/lib/utils';
import { GripVertical, MapPin, Clock, Bed, Coffee, Plane, Navigation } from 'lucide-react';
import { Activity } from '@/lib/store';

interface TimelineCardProps {
  activity: Activity;
  dragHandleProps?: any;
  isDragging?: boolean;
}

export function TimelineCard({ activity, dragHandleProps, isDragging }: TimelineCardProps) {
  
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'Flight': return <Plane className="w-4 h-4 text-white" />;
      case 'Accommodation': return <Bed className="w-4 h-4 text-white" />;
      case 'Dining': return <Coffee className="w-4 h-4 text-white" />;
      default: return <Navigation className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div 
      className={cn(
        "relative pl-8 pb-8 group",
        isDragging && "opacity-80 scale-[1.02] z-50 transition-transform"
      )}
    >
      {/* Timeline Line */}
      <div className="absolute left-[11px] top-8 bottom-0 w-px bg-black/10 group-last:bg-transparent" />
      
      {/* Timeline Dot */}
      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-luxury-forest flex items-center justify-center shadow-sm">
        {getActivityIcon(activity.type)}
      </div>

      <div className="bg-white border border-black/5 rounded-2xl p-5 hover:border-black/10 transition-colors shadow-sm flex items-start gap-4">
        {dragHandleProps && (
          <div {...dragHandleProps} className="mt-1 opacity-20 hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity">
            <GripVertical className="w-5 h-5" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-serif font-medium text-lg">{activity.title}</h4>
            <span className="text-xs font-bold tracking-widest uppercase text-luxury-forest bg-luxury-forest/5 px-3 py-1 rounded-full">
              {activity.type}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-luxury-charcoal/60">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {activity.time}</span>
            {activity.location && (
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {activity.location}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
