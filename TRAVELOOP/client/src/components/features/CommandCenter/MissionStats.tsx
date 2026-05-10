'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, ArrowUpRight } from 'lucide-react';

const data = [
  { time: '1H', value: 30 },
  { time: '4H', value: 45 },
  { time: '8H', value: 25 },
  { time: '12H', value: 60 },
  { time: '16H', value: 40 },
  { time: '20H', value: 75 },
  { time: '24H', value: 55 },
];

export default function MissionStats() {
  return (
    <div className="glass-panel p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-400">Navigation Core</h3>
        </div>
        <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center">
          <ArrowUpRight className="w-4 h-4 text-cyan-400" />
        </div>
      </div>

      <div className="flex-1 min-h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00F3FF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00F3FF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              hide 
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0B0F19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
              itemStyle={{ color: '#00F3FF' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#00F3FF" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        <h4 className="text-4xl font-bold tracking-tighter mb-1">Efficiency 94%</h4>
        <div className="flex items-center gap-2 text-[10px] text-cyan-500 font-mono tracking-widest uppercase">
          <span className="w-3 h-px bg-cyan-500" />
          Optimal progression
        </div>
      </div>
    </div>
  );
}
