'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Share2, ArrowUpRight, Search, Archive, Plus } from 'lucide-react';

const missions = [
  {
    id: 1,
    name: 'Neo-Kyoto Expedition',
    date: 'Oct 12 - Oct 25',
    status: 'Active',
    nodes: 'PWS | TYO | NKY',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop',
    participants: ['Commander', 'Aura', 'Zero'],
  },
  {
    id: 2,
    name: 'Europa Orbital Hub',
    date: 'Dec 05 - Dec 18',
    status: 'Planning',
    nodes: 'Earth | Orb-1 | Eur-P',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop',
    participants: ['Commander'],
  },
];

export default function MissionsPage() {
  return (
    <div className="space-y-12 pb-20">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-6xl font-bold tracking-tighter mb-2">Mission Logs</h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
            <Archive className="w-3 h-3" /> 2 Active Archives
          </p>
        </div>
        <div className="flex gap-4">
          <button className="glass-panel px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/5">
            Archive
          </button>
          <button className="bg-orange-600 px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(255,77,0,0.3)] hover:bg-orange-500 flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Mission
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {missions.map((mission) => (
          <motion.div
            key={mission.id}
            whileHover={{ y: -10 }}
            className="glass-panel overflow-hidden group aspect-[16/10] relative flex flex-col justify-end p-8"
          >
            {/* Background Image */}
            <img 
              src={mission.image} 
              alt={mission.name} 
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel bg-white/5 border-white/10 w-fit">
                <span className={`w-1.5 h-1.5 rounded-full ${mission.status === 'Active' ? 'bg-orange-500 animate-pulse' : 'bg-zinc-500'}`} />
                <span className="text-[10px] font-mono tracking-widest uppercase">{mission.status}</span>
              </div>

              <div>
                <p className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase mb-2">{mission.nodes}</p>
                <h2 className="text-4xl font-bold tracking-tighter leading-none">{mission.name}</h2>
                <p className="text-sm text-zinc-400 mt-2 flex items-center gap-2">
                  <span className="w-4 h-px bg-zinc-700" /> {mission.date}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex -space-x-2">
                  {mission.participants.map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                      {i === 0 ? 'CO' : `+${i}`}
                    </div>
                  ))}
                  {mission.participants.length > 2 && (
                    <div className="w-8 h-8 rounded-full border-2 border-[#050505] bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                      +{mission.participants.length - 2}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200">
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Hover Indicator */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
