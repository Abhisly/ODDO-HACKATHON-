'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Wallet, TrendingUp, AlertTriangle, Cpu, ArrowUpRight, Target } from 'lucide-react';

const telemetryData = [
  { day: '01', actual: 240, predicted: 200 },
  { day: '02', actual: 380, predicted: 350 },
  { day: '03', actual: 450, predicted: 420 },
  { day: '04', actual: 520, predicted: 500 },
  { day: '05', actual: 580, predicted: 620 },
  { day: '06', actual: 720, predicted: 750 },
  { day: '07', actual: 850, predicted: 800 },
];

const sectorBreakdown = [
  { name: 'Transports', value: 45, color: '#00F3FF' },
  { name: 'Accommodation', value: 35, color: '#A855F7' },
  { name: 'Operations (Food/Rec)', value: 20, color: '#22C55E' },
];

export default function TelemetryPage() {
  return (
    <div className="space-y-12 pb-20">
      <header className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <p className="text-[10px] font-mono tracking-widest uppercase text-cyan-500">Live Telemetry</p>
          </div>
          <h1 className="text-6xl font-bold tracking-tighter mb-2">Capital Systems</h1>
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Total Allocation</p>
            <p className="text-3xl font-bold tracking-tighter">2,450.00 <span className="text-sm text-zinc-500">USD</span></p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-mono text-orange-500 uppercase tracking-widest mb-1">Burn Rate</p>
            <p className="text-3xl font-bold tracking-tighter text-orange-500">135.00 <span className="text-sm">/day</span> <ArrowUpRight className="inline w-5 h-5" /></p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Expenditure Chart */}
        <div className="xl:col-span-8 glass-panel p-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-xl font-bold tracking-tight mb-1">Expenditure Trajectory</h3>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">AI Forecast vs Actual</p>
            </div>
            <div className="flex gap-4 text-[10px] font-mono uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                Actual
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                AI Predicted
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetryData}>
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F3FF" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00F3FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="rgba(255,255,255,0.1)" 
                  fontSize={10} 
                  fontFamily="JetBrains Mono"
                  tickMargin={10}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.1)" 
                  fontSize={10} 
                  fontFamily="JetBrains Mono"
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B0F19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="rgba(255,255,255,0.2)" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  fill="transparent" 
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#00F3FF" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#actualGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Telemetry Panels */}
        <div className="xl:col-span-4 space-y-8">
          {/* AI Alert Card */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-panel p-6 border-orange-500/30 bg-orange-500/5"
          >
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span className="text-[10px] font-mono text-orange-500 uppercase tracking-[0.2em] font-bold">AI Alert</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Trajectory Deviation</h4>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              You are currently projected to exceed your dining budget by 12% in the Neo-Kyoto sector.
            </p>
            <button className="w-full py-3 glass-panel border-white/10 hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <Cpu className="w-3 h-3" /> Recalculate Logic
            </button>
          </motion.div>

          {/* Sector Breakdown */}
          <div className="glass-panel p-6">
            <h4 className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-8">Sector Breakdown</h4>
            <div className="space-y-6">
              {sectorBreakdown.map((sector) => (
                <div key={sector.name} className="space-y-2">
                  <div className="flex justify-between text-xs font-mono uppercase">
                    <span className="text-zinc-500 flex items-center gap-2">
                      <div className="w-3 h-0.5" style={{ backgroundColor: sector.color }} />
                      {sector.name}
                    </span>
                    <span className="font-bold">{sector.value}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${sector.value}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: sector.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
