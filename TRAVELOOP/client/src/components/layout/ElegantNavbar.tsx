'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Discover', path: '/discover' },
  { label: 'Activities', path: '/activities' },
  { label: 'My Trips', path: '/trips' },
  { label: 'Route Matrix', path: '/matrix' },
  { label: 'Logistics', path: '/telemetry' },
  { label: 'AI Concierge', path: '/concierge' },
];

export default function ElegantNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
          scrolled ? 'py-4' : 'py-6 lg:py-8'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className={cn(
            'flex items-center justify-between rounded-full transition-all duration-500',
            scrolled 
              ? 'bg-white/80 backdrop-blur-xl border border-white/20 shadow-sm px-6 py-3' 
              : 'bg-transparent px-2 py-2'
          )}>
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-luxury-forest text-white flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <Compass className="w-5 h-5 transition-transform duration-700 group-hover:rotate-45" />
              </div>
              <span className={cn(
                "font-serif text-xl font-bold tracking-tight transition-colors duration-300",
                scrolled ? "text-luxury-charcoal" : "text-luxury-charcoal lg:text-white"
              )}>
                Traveloop.
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link 
                    key={link.path} 
                    href={link.path}
                    className={cn(
                      "text-sm font-medium tracking-wide transition-colors relative group",
                      scrolled 
                        ? (isActive ? "text-luxury-forest" : "text-luxury-charcoal/70 hover:text-luxury-charcoal")
                        : (isActive ? "text-white" : "text-white/70 hover:text-white")
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-indicator"
                        className={cn(
                          "absolute -bottom-2 left-0 right-0 h-0.5 rounded-full",
                          scrolled ? "bg-luxury-forest" : "bg-white"
                        )}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors">
                <User className={cn("w-5 h-5", scrolled ? "text-luxury-charcoal" : "text-luxury-charcoal lg:text-white")} />
              </button>
              <Link href="/dashboard" className="btn-luxury text-sm py-2.5 px-6">
                Start Planning
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className={cn("w-5 h-5", scrolled ? "text-luxury-charcoal" : "text-luxury-charcoal")} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-2xl flex flex-col p-6">
          <div className="flex justify-between items-center mb-12">
            <span className="font-serif text-2xl font-bold text-luxury-charcoal">Traveloop.</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-luxury-beige rounded-full">
              <X className="w-6 h-6 text-luxury-charcoal" />
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-serif text-luxury-charcoal hover:text-luxury-forest transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
