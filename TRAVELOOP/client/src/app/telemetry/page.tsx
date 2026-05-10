'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Luggage, Plus, Trash2, CheckCircle2, Circle, AlertCircle, PieChart as PieChartIcon, BarChart3, TrendingUp } from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { format } from 'date-fns';

const COLORS = ['#2C5545', '#C4B5A5', '#A39171', '#4A4A4A', '#8C9A9E'];

export default function TelemetryPage() {
  const { activeTripId, trips, budgetExpenses, packingList, togglePackingItem, addPackingItem, deletePackingItem, addExpense, deleteExpense } = useTravelStore();
  
  const [activeTab, setActiveTab] = useState<'budget' | 'packing'>('budget');
  
  // New Item States
  const [newExpense, setNewExpense] = useState({ category: 'Activities', amount: '', date: new Date().toISOString().split('T')[0] });
  const [newPackingItem, setNewPackingItem] = useState({ category: 'Clothing', name: '' });

  const activeTrip = trips.find(t => t.id === activeTripId);

  // --- Budget Calculations ---
  const totalExpenses = budgetExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budgetLimit = activeTrip?.budget || 10000;
  const budgetRemaining = budgetLimit - totalExpenses;
  const isOverBudget = budgetRemaining < 0;

  const categoryData = useMemo(() => {
    const data: Record<string, number> = {};
    budgetExpenses.forEach(exp => {
      data[exp.category] = (data[exp.category] || 0) + exp.amount;
    });
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [budgetExpenses]);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.amount) return;
    addExpense({
      id: `exp-${Date.now()}`,
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      date: newExpense.date
    });
    setNewExpense({ ...newExpense, amount: '' });
  };

  // --- Packing Calculations ---
  const totalItems = packingList.length;
  const packedItems = packingList.filter(item => item.packed).length;
  const packedPercentage = totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  const handleAddPackingItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackingItem.name) return;
    addPackingItem({
      id: `pack-${Date.now()}`,
      category: newPackingItem.category,
      name: newPackingItem.name,
      packed: false
    });
    setNewPackingItem({ ...newPackingItem, name: '' });
  };

  return (
    <div className="editorial-container pt-32 pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
        <SectionHeader 
          eyebrow="Logistics Command Center"
          title="Trip Telemetry"
          subtitle={activeTrip ? `Managing logistics for ${activeTrip.destination.name}` : "Select a trip to manage logistics."}
          className="mb-0"
        />
        
        {/* Tab Switcher */}
        <div className="flex bg-white p-2 rounded-full border border-black/5 shadow-sm shrink-0">
          <button
            onClick={() => setActiveTab('budget')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all ${activeTab === 'budget' ? 'bg-luxury-charcoal text-white' : 'text-luxury-charcoal/40 hover:text-luxury-charcoal'}`}
          >
            <Wallet className="w-4 h-4" /> Finance
          </button>
          <button
            onClick={() => setActiveTab('packing')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all ${activeTab === 'packing' ? 'bg-luxury-charcoal text-white' : 'text-luxury-charcoal/40 hover:text-luxury-charcoal'}`}
          >
            <Luggage className="w-4 h-4" /> Packing
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* BUDGET TAB */}
        {activeTab === 'budget' && (
          <motion.div
            key="budget"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Column: Analytics */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-6 opacity-5"><Wallet className="w-24 h-24" /></div>
                   <p className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/40 mb-2">Total Budget</p>
                   <p className="font-serif text-4xl">${budgetLimit.toLocaleString()}</p>
                 </div>
                 
                 <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-6 opacity-5"><TrendingUp className="w-24 h-24" /></div>
                   <p className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/40 mb-2">Total Spent</p>
                   <p className="font-serif text-4xl">${totalExpenses.toLocaleString()}</p>
                 </div>

                 <div className={`p-8 rounded-3xl border shadow-sm relative overflow-hidden transition-colors ${isOverBudget ? 'bg-red-50 border-red-100 text-red-900' : 'bg-luxury-forest text-white border-luxury-forest'}`}>
                   <div className="absolute top-0 right-0 p-6 opacity-10"><AlertCircle className="w-24 h-24" /></div>
                   <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Remaining</p>
                   <p className="font-serif text-4xl">${Math.abs(budgetRemaining).toLocaleString()}</p>
                   {isOverBudget && <p className="text-xs font-bold uppercase mt-2 opacity-80">Over Budget Limit!</p>}
                 </div>
              </div>

              {/* Charts Panel */}
              <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-serif text-xl font-medium mb-6 flex items-center gap-2"><PieChartIcon className="w-5 h-5 text-luxury-forest" /> Spend by Category</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {categoryData.map((entry, index) => (
                      <div key={entry.name} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span className="text-luxury-charcoal/60">{entry.name}</span>
                        <span className="font-medium ml-auto">${entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-medium mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-luxury-forest" /> Expense Flow</h3>
                  <div className="h-64 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8C9A9E' }} />
                        <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                        <Bar dataKey="value" fill="#C4B5A5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Ledger */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                <h3 className="font-serif text-xl font-medium mb-6">Add Expense</h3>
                <form onSubmit={handleAddExpense} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold tracking-widest uppercase text-luxury-charcoal/40 mb-2 block">Amount</label>
                      <input 
                        type="number" 
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                        placeholder="$0.00" 
                        className="w-full bg-luxury-beige/30 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-luxury-forest font-serif text-lg" 
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold tracking-widest uppercase text-luxury-charcoal/40 mb-2 block">Category</label>
                      <select 
                        value={newExpense.category}
                        onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                        className="w-full bg-luxury-beige/30 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-luxury-forest text-sm"
                      >
                        <option>Flights</option>
                        <option>Accommodation</option>
                        <option>Dining</option>
                        <option>Activities</option>
                        <option>Transport</option>
                        <option>Misc</option>
                      </select>
                    </div>
                  </div>
                  <AnimatedButton type="submit" className="w-full">Log Expense</AnimatedButton>
                </form>
              </div>

              <div className="bg-luxury-beige p-6 rounded-3xl border border-black/5">
                <h3 className="font-serif text-xl font-medium mb-6">Recent Transactions</h3>
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {budgetExpenses.slice().reverse().map(exp => (
                      <motion.div 
                        key={exp.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white p-4 rounded-2xl flex items-center justify-between group shadow-sm"
                      >
                        <div>
                          <p className="font-medium">{exp.category}</p>
                          <p className="text-xs text-luxury-charcoal/40">{format(new Date(exp.date), 'MMM dd, yyyy')}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-serif text-lg">${exp.amount}</span>
                          <button 
                            onClick={() => deleteExpense(exp.id)}
                            className="w-8 h-8 rounded-full bg-red-50 text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PACKING TAB */}
        {activeTab === 'packing' && (
          <motion.div
            key="packing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            {/* Progress Bar */}
            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm mb-8">
               <div className="flex justify-between items-end mb-4">
                 <div>
                   <h3 className="font-serif text-2xl font-medium">Readiness Index</h3>
                   <p className="text-luxury-charcoal/60">{packedItems} of {totalItems} items packed</p>
                 </div>
                 <span className="font-serif text-5xl text-luxury-forest">{packedPercentage}%</span>
               </div>
               <div className="w-full h-4 bg-luxury-beige rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-luxury-forest"
                   initial={{ width: 0 }}
                   animate={{ width: `${packedPercentage}%` }}
                   transition={{ duration: 1, ease: "easeOut" }}
                 />
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Add Item Form */}
              <div className="md:col-span-1">
                <div className="bg-luxury-beige p-6 rounded-3xl border border-black/5 sticky top-32">
                  <h3 className="font-serif text-xl font-medium mb-6">Add to Manifest</h3>
                  <form onSubmit={handleAddPackingItem} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold tracking-widest uppercase text-luxury-charcoal/40 mb-2 block">Item Name</label>
                      <input 
                        type="text" 
                        value={newPackingItem.name}
                        onChange={(e) => setNewPackingItem({...newPackingItem, name: e.target.value})}
                        placeholder="e.g., Camera Charger" 
                        className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-luxury-forest text-sm" 
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold tracking-widest uppercase text-luxury-charcoal/40 mb-2 block">Category</label>
                      <select 
                        value={newPackingItem.category}
                        onChange={(e) => setNewPackingItem({...newPackingItem, category: e.target.value})}
                        className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-luxury-forest text-sm"
                      >
                        <option>Clothing</option>
                        <option>Electronics</option>
                        <option>Documents</option>
                        <option>Toiletries</option>
                        <option>Misc</option>
                      </select>
                    </div>
                    <AnimatedButton type="submit" className="w-full">Add Item</AnimatedButton>
                  </form>
                </div>
              </div>

              {/* Checklist */}
              <div className="md:col-span-2 space-y-8">
                 {/* Group by category */}
                 {Array.from(new Set(packingList.map(i => i.category))).map(category => {
                   const items = packingList.filter(i => i.category === category);
                   return (
                     <div key={category}>
                       <h4 className="font-serif text-xl font-medium mb-4 flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-luxury-forest" /> {category}
                       </h4>
                       <div className="space-y-3">
                         <AnimatePresence mode="popLayout">
                           {items.map(item => (
                             <motion.div 
                               key={item.id}
                               layout
                               initial={{ opacity: 0, scale: 0.95 }}
                               animate={{ opacity: 1, scale: 1 }}
                               exit={{ opacity: 0, scale: 0.95 }}
                               className={`p-4 rounded-2xl border flex items-center gap-4 group transition-all cursor-pointer ${item.packed ? 'bg-luxury-beige/50 border-black/5 opacity-60' : 'bg-white border-black/10 shadow-sm hover:border-luxury-forest'}`}
                               onClick={() => togglePackingItem(item.id)}
                             >
                               <button className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${item.packed ? 'bg-luxury-forest border-luxury-forest text-white' : 'border-black/20 text-transparent'}`}>
                                 <CheckCircle2 className="w-4 h-4" />
                               </button>
                               <span className={`flex-1 font-medium transition-all ${item.packed ? 'line-through' : ''}`}>
                                 {item.name}
                               </span>
                               <button 
                                 onClick={(e) => { e.stopPropagation(); deletePackingItem(item.id); }}
                                 className="w-8 h-8 rounded-full bg-red-50 text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                               >
                                 <Trash2 className="w-4 h-4" />
                               </button>
                             </motion.div>
                           ))}
                         </AnimatePresence>
                       </div>
                     </div>
                   )
                 })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
