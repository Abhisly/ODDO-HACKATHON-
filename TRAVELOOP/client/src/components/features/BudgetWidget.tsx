'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, PieChart, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, AlertCircle } from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { useTravelStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface Props {
  spent?: number;
}

export function BudgetWidget({ spent = 1250 }: Props) {
  const { maxBudget, currency } = useTravelStore();
  
  const percentage = Math.min((spent / maxBudget) * 100, 100);
  const remaining = maxBudget - spent;
  const isOver = spent > maxBudget;

  const categories = [
    { label: 'Flights', amount: spent * 0.4, percentage: 40, color: 'bg-red-500' },
    { label: 'Accommodation', amount: spent * 0.35, percentage: 35, color: 'bg-blue-500' },
    { label: 'Operations', amount: spent * 0.25, percentage: 25, color: 'bg-green-500' },
  ];

  return (
    <GlassPanel className="p-6 bg-white dark:bg-zinc-900 border-black/5 dark:border-white/10 shadow-sm overflow-hidden relative">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-luxury-charcoal/40 dark:text-white/40 mb-1">Fiscal Status</h3>
            <div className="flex items-baseline gap-1">
               <span className="text-sm font-bold text-red-600">{currency}</span>
               <p className="text-3xl font-serif font-medium text-luxury-charcoal dark:text-white">
                 {spent.toLocaleString()}
               </p>
            </div>
          </div>
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors", isOver ? "bg-red-600 text-white" : "bg-red-600/10 text-red-600")}>
            {isOver ? <AlertCircle className="w-6 h-6" /> : <PieChart className="w-6 h-6" />}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3 mb-8">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
            <span className="text-luxury-charcoal/50 dark:text-white/40">Utilization Strategy</span>
            <span className={cn(percentage > 90 ? 'text-red-500 font-black' : 'text-luxury-charcoal/70 dark:text-white/60')}>
              {percentage.toFixed(0)}%
            </span>
          </div>
          <div className="h-2 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              className={cn("h-full rounded-full transition-all duration-1000", isOver ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-red-600')}
            />
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-charcoal/30 dark:text-white/30">Allocation Matrix</p>
          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.label} className="flex items-center gap-3">
                <div className={cn("w-1.5 h-1.5 rounded-full", cat.color)} />
                <span className="flex-1 text-xs font-medium text-luxury-charcoal/70 dark:text-white/70">{cat.label}</span>
                <span className="text-xs font-bold text-luxury-charcoal dark:text-white">{currency} {cat.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40">Limit Balance</p>
            <p className={cn("text-lg font-serif font-medium", isOver ? "text-red-600" : "text-luxury-charcoal dark:text-white")}>
              {currency} {remaining.toLocaleString()}
            </p>
          </div>
          <button className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            <ArrowUpRight className="w-4 h-4 text-luxury-charcoal/60 dark:text-white/60" />
          </button>
        </div>
      </div>

      <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/5 rounded-full blur-3xl" />
    </GlassPanel>
  );
}
