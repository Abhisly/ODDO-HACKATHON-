'use client';

import React from 'react';
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { Activity, TrendingUp } from 'lucide-react';

const data = [
  { time: '00:00', efficiency: 80 },
  { time: '04:00', efficiency: 95 },
  { time: '08:00', efficiency: 85 },
  { time: '12:00', efficiency: 60 },
  { time: '16:00', efficiency: 90 },
  { time: '20:00', efficiency: 100 },
  { time: '24:00', efficiency: 85 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel bg-black/80 p-3 rounded-xl border border-cyan-400/30 shadow-[0_0_20px_rgba(0,243,255,0.2)] backdrop-blur-xl">
        <p className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Efficiency</p>
        <p className="text-xl font-black text-cyan-400 drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function MissionStats() {
  return (
    <div className="glass-panel w-full h-full p-8 flex flex-col relative overflow-hidden group">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-white">Navigation Core</h3>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
        </div>
      </div>

      <div className="flex-1 min-h-[150px] relative z-10 -mx-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00F3FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00F3FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(0,243,255,0.2)', strokeWidth: 2, strokeDasharray: '4 4' }} />
            <XAxis 
              dataKey="time" 
              hide 
            />
            <Area
              type="monotone"
              dataKey="efficiency"
              stroke="#00F3FF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorEfficiency)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
        
        {/* Synthetic Data Points overlay */}
        <div className="absolute inset-0 pointer-events-none flex justify-between items-end pb-[20%] px-[10%]">
          <div className="w-4 h-4 rounded-full border-[3px] border-cyan-400 bg-black shadow-[0_0_15px_rgba(0,243,255,0.8)] z-20" />
          <div className="w-5 h-5 rounded-full border-[3px] border-cyan-400 bg-black shadow-[0_0_15px_rgba(0,243,255,0.8)] z-20 translate-y-[-40px]" />
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between relative z-10 border-t border-white/10 pt-6">
        <div>
          <h4 className="text-4xl font-black tracking-tighter text-white drop-shadow-md">
            94<span className="text-2xl text-muted-foreground">%</span>
          </h4>
          <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold mt-1">Core Efficiency</p>
        </div>
        
        <div className="px-3 py-1.5 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-[10px] font-mono tracking-widest uppercase text-cyan-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Optimal
        </div>
      </div>
    </div>
  );
}
