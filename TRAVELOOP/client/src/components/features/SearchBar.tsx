import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn("relative group w-full", containerClassName)}>
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-luxury-charcoal/40 group-focus-within:text-red-600 transition-colors" />
        </div>
        <input
          ref={ref}
          type="text"
          className={cn(
            "w-full bg-white/60 backdrop-blur-md border border-black/10 rounded-full py-4 pl-12 pr-6 text-luxury-charcoal placeholder:text-luxury-charcoal/40 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all shadow-sm",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
