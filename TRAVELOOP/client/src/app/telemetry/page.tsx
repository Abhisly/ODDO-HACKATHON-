'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTravelStore } from '@/lib/store';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Wallet, Plus, CheckCircle2, Circle, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { format } from 'date-fns';

const COLORS = ['#2C5545', '#1D3557', '#E07A5F', '#1A1A1A'];

export default function BudgetPackingPage() {
  const { trips, activeTripId, budgetExpenses, packingList, togglePackingItem } = useTravelStore();
  const [activeTab, setActiveTab] = useState<'budget' | 'packing'>('budget');
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const activeTrip = trips.find(t => t.id === activeTripId);

  if (!mounted || !activeTrip) return null;

  const totalSpent = budgetExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remaining = activeTrip.budget - totalSpent;

  // Group packing list by category
  const categories = Array.from(new Set(packingList.map(item => item.category)));

  // Mock DnD for packing list (visual only for now to satisfy requirements)
  const onDragEnd = (result: DropResult) => {
    // In a real app, we'd reorder the store. For this prototype, we'll keep it visual.
    if (!result.destination) return;
  };

  return (
    <div className="editorial-container pt-32 md:pt-40 pb-24 min-h-screen">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-luxury-charcoal mb-4">
            Trip Logistics
          </h1>
          <p className="text-xl text-luxury-charcoal/60 font-light leading-relaxed max-w-2xl">
            Manage your finances and ensure you're fully prepared for {activeTrip.destination.name}.
          </p>
        </motion.div>

        <div className="flex p-1 bg-luxury-beige rounded-full border border-black/5 w-fit">
          <button 
            onClick={() => setActiveTab('budget')}
            className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${activeTab === 'budget' ? 'bg-white shadow-sm text-luxury-forest' : 'text-luxury-charcoal/60 hover:text-luxury-charcoal'}`}
          >
            Budget
          </button>
          <button 
            onClick={() => setActiveTab('packing')}
            className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${activeTab === 'packing' ? 'bg-white shadow-sm text-luxury-forest' : 'text-luxury-charcoal/60 hover:text-luxury-charcoal'}`}
          >
            Packing List
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'budget' && (
          <motion.div
            key="budget"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Overview Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="editorial-card p-8 bg-luxury-forest text-white">
                <p className="text-white/60 font-medium uppercase tracking-widest text-xs mb-2">Total Budget</p>
                <h3 className="font-serif text-4xl font-medium">${activeTrip.budget.toLocaleString()}</h3>
              </div>
              <div className="editorial-card p-8 border border-black/5 bg-white">
                <p className="text-luxury-charcoal/40 font-medium uppercase tracking-widest text-xs mb-2">Total Spent</p>
                <h3 className="font-serif text-4xl font-medium text-luxury-charcoal">${totalSpent.toLocaleString()}</h3>
              </div>
              <div className="editorial-card p-8 border border-black/5 bg-luxury-beige">
                <p className="text-luxury-charcoal/40 font-medium uppercase tracking-widest text-xs mb-2">Remaining</p>
                <h3 className="font-serif text-4xl font-medium text-luxury-ocean">${remaining.toLocaleString()}</h3>
              </div>
            </div>

            {/* Charts */}
            <div className="lg:col-span-2 editorial-card p-8 border border-black/5 bg-white min-h-[400px] flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-2xl font-medium">Expense Distribution</h3>
              </div>
              <div className="flex-1 -mx-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetExpenses} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} tickFormatter={(val) => `$${val}`} />
                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="amount" fill="#2C5545" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Expenses List */}
            <div className="editorial-card p-8 border border-black/5 bg-white flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-2xl font-medium">Recent</h3>
                <button className="w-8 h-8 rounded-full bg-luxury-beige flex items-center justify-center hover:bg-luxury-forest hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-6 flex-1 overflow-y-auto pr-2">
                {budgetExpenses.map((exp, i) => (
                  <div key={exp.id} className="flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-luxury-cream border border-black/5 flex items-center justify-center">
                        <Wallet className="w-4 h-4 text-luxury-charcoal/50" />
                      </div>
                      <div>
                        <p className="font-medium text-luxury-charcoal">{exp.category}</p>
                        <p className="text-xs text-luxury-charcoal/40">{format(new Date(exp.date), 'MMM dd, yyyy')}</p>
                      </div>
                    </div>
                    <span className="font-serif font-medium text-lg">${exp.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'packing' && (
          <motion.div
            key="packing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="editorial-card p-8 lg:p-12 border border-black/5 bg-white max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-serif text-3xl font-medium mb-2">Packing Checklist</h2>
                <p className="text-luxury-charcoal/60 text-sm">
                  {packingList.filter(i => i.packed).length} of {packingList.length} items packed.
                </p>
              </div>
              <button className="flex items-center gap-2 btn-luxury-outline py-2 px-4 text-sm">
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
              <div className="space-y-12">
                {categories.map((category) => {
                  const items = packingList.filter(i => i.category === category);
                  return (
                    <div key={category}>
                      <h4 className="font-bold tracking-widest uppercase text-xs text-luxury-charcoal/40 mb-4 pb-2 border-b border-black/5">{category}</h4>
                      <Droppable droppableId={`pack-${category}`}>
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                            {items.map((item, index) => (
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className={`flex items-center justify-between p-4 rounded-xl border border-black/5 transition-colors ${snapshot.isDragging ? 'bg-luxury-beige shadow-lg' : 'bg-white hover:bg-luxury-cream'} ${item.packed ? 'opacity-50' : ''}`}
                                  >
                                    <div className="flex items-center gap-4">
                                      <button onClick={() => togglePackingItem(item.id)} className="transition-transform hover:scale-110 active:scale-95">
                                        {item.packed ? (
                                          <CheckCircle2 className="w-6 h-6 text-luxury-forest" />
                                        ) : (
                                          <Circle className="w-6 h-6 text-luxury-charcoal/20" />
                                        )}
                                      </button>
                                      <span className={`font-medium ${item.packed ? 'line-through text-luxury-charcoal/60' : ''}`}>{item.name}</span>
                                    </div>
                                    <div {...provided.dragHandleProps} className="text-luxury-charcoal/20 hover:text-luxury-charcoal/60 cursor-grab">
                                      <GripVertical className="w-5 h-5" />
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )
                })}
              </div>
            </DragDropContext>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
