import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    
    const baseStyles = "relative inline-flex items-center justify-center font-bold uppercase tracking-widest transition-colors overflow-hidden";
    
    const variants = {
      primary: "bg-red-600 text-white hover:bg-opacity-90 shadow-sm",
      secondary: "bg-luxury-charcoal text-white hover:bg-black shadow-sm",
      outline: "border-2 border-luxury-charcoal text-luxury-charcoal hover:bg-luxury-charcoal hover:text-white",
      ghost: "text-luxury-charcoal hover:bg-black/5"
    };
    
    const sizes = {
      sm: "px-4 py-2 text-[10px] rounded-lg",
      md: "px-8 py-4 text-xs rounded-xl",
      lg: "px-10 py-5 text-sm rounded-2xl",
      icon: "p-3 rounded-full"
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        <span className={cn("flex items-center gap-2", isLoading && "opacity-0")}>
          {leftIcon}
          {children}
          {rightIcon}
        </span>
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        )}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
