'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Map as MapIcon, ArrowLeft, Target, Cpu, Layers } from 'lucide-react';

const routes = [
  { id: 1, from: 'PWS', to: 'YK', time: '08:30 AM', price: '15.00', stations: 8 },
  { id: 2, from: 'PWS', to: 'YK', time: '10:15 AM', price: '12.50', stations: 10 },
];

export default function RouteMatrixPage() {
  const [selectedRoute, setSelectedRoute] = useState(1);

  return (
    <div className="h-screen flex flex-col -m-8 relative">
      {/* HUD Header */}
      <div className="absolute top-8 left-8 z-20 flex items-center gap-6">
        <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/5">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">Central Line: SOC - JOG</p>
          </div>
          <h1 className="text-sm font-bold uppercase tracking-[0.2em]">Select Route Map</h1>
        </div>
      </div>

      <div className="absolute top-8 right-8 z-20">
        <div className="relative w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search everything..." 
            className="w-full glass-panel bg-white/5 py-3 pl-12 pr-6 text-sm focus:outline-none border-white/10"
          />
        </div>
      </div>

      {/* Main Matrix Interface */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Controls */}
        <aside className="w-[450px] border-r border-white/5 bg-[#050505] p-10 pt-28 overflow-y-auto custom-scrollbar z-10">
          <div className="space-y-8">
            {routes.map((route) => (
              <motion.div
                key={route.id}
                onClick={() => setSelectedRoute(route.id)}
                whileHover={{ scale: 1.02 }}
                className={`glass-panel p-8 cursor-pointer relative transition-all overflow-hidden ${
                  selectedRoute === route.id ? 'border-orange-500/50 bg-orange-500/5 shadow-[0_0_40px_rgba(255,77,0,0.1)]' : 'opacity-40'
                }`}
              >
                {selectedRoute === route.id && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                )}
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-zinc-500">
                    <Cpu className="w-3 h-3" /> NO: K110301
                  </div>
                  <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 flex items-center gap-1">
                    {route.stations} Stations <ArrowLeft className="w-3 h-3 rotate-180" />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div className="text-center">
                    <p className="text-[10px] font-mono text-orange-500 mb-1">08:30 AM ●</p>
                    <h3 className="text-4xl font-bold tracking-tighter">PWS</h3>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase">Purwosari</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center relative">
                    <div className="w-full h-px bg-dashed-border bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_50%,transparent_50%)] bg-[length:10px_1px]" />
                    <div className="absolute w-8 h-8 rounded-full glass-panel flex items-center justify-center">
                      <Target className="w-4 h-4 text-zinc-600" />
                    </div>
                  </div>
                  <div className="text-center text-right">
                    <p className="text-[10px] font-mono text-zinc-500 mb-1">10:30 AM</p>
                    <h3 className="text-4xl font-bold tracking-tighter">YK</h3>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase">Yogyakarta</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Total Price</p>
                    <p className="text-xl font-bold">{route.price} <span className="text-xs text-zinc-500 uppercase">USD</span></p>
                  </div>
                  <button className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                    Buy Ticket
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </aside>

        {/* Spatial Route Canvas */}
        <div className="flex-1 relative bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:32px_32px] overflow-hidden">
          {/* Animated Route Nodes */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Purwosari Node */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-[40%] left-[45%] z-20"
              >
                <div className="w-6 h-6 bg-orange-600 rounded-full shadow-[0_0_20px_rgba(255,77,0,0.8)] border-4 border-white/20" />
                <div className="absolute top-1/2 -translate-y-1/2 left-8 glass-panel py-2 px-4 whitespace-nowrap -rotate-90 origin-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest">Purwosari Stn ●</p>
                </div>
              </motion.div>

              {/* Path Connector */}
              <svg className="absolute inset-0 w-full h-full">
                <motion.line
                  x1="45%" y1="40%"
                  x2="55%" y2="60%"
                  stroke="#FF4D00"
                  strokeWidth="2"
                  strokeDasharray="10 10"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </svg>

              {/* Secondary Nodes */}
              <div className="absolute top-[60%] left-[55%] opacity-40">
                <div className="w-4 h-4 bg-zinc-800 rounded-full border-2 border-white/10" />
                <div className="absolute top-1/2 -translate-y-1/2 left-6 glass-panel py-1 px-3 whitespace-nowrap -rotate-90 origin-left">
                  <p className="text-[8px] font-bold uppercase tracking-widest">Gawok Stn</p>
                </div>
              </div>

              <div className="absolute top-[80%] left-[65%] opacity-20">
                <div className="w-4 h-4 bg-zinc-800 rounded-full border-2 border-white/10" />
                <div className="absolute top-1/2 -translate-y-1/2 left-6 glass-panel py-1 px-3 whitespace-nowrap -rotate-90 origin-left">
                  <p className="text-[8px] font-bold uppercase tracking-widest">Delanggu Stn</p>
                </div>
              </div>
            </div>
          </div>

          {/* UI Overlays */}
          <div className="absolute bottom-12 right-12 flex gap-4">
            <button className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center hover:bg-white/5">
              <Layers className="w-5 h-5 text-zinc-500" />
            </button>
            <button className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center hover:bg-white/5">
              <MapIcon className="w-5 h-5 text-zinc-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
