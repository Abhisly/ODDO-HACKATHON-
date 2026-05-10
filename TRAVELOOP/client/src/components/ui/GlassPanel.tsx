import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  intensity?: 'light' | 'medium' | 'heavy';
  border?: boolean;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, intensity = 'medium', border = true, children, ...props }, ref) => {
    
    const intensities = {
      light: "bg-white/40 backdrop-blur-sm",
      medium: "bg-white/60 backdrop-blur-md",
      heavy: "bg-white/80 backdrop-blur-lg"
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-3xl",
          intensities[intensity],
          border && "border border-white/40 shadow-sm",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";
