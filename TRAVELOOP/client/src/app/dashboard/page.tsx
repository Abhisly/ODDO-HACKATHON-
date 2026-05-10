'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const recentTrips = [
    { name: 'Swiss Alps Expedition', status: 'Upcoming', progress: 85 },
    { name: 'Tokyo Neon Nights', status: 'Draft', progress: 40 },
    { name: 'Parisian Romance', status: 'Completed', progress: 100 },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Trips', value: '12' },
          { label: 'AI Plans Generated', value: '48' },
          { label: 'Cities Visited', value: '24' },
        ].map((stat) => (
          <div key={stat.label} className="glass p-6">
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Trips */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Recent Itineraries</h3>
            <button className="text-sm text-purple-400 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentTrips.map((trip) => (
              <motion.div 
                whileHover={{ x: 5 }}
                key={trip.name} 
                className="glass p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    🗺️
                  </div>
                  <div>
                    <p className="font-semibold">{trip.name}</p>
                    <p className="text-xs text-muted-foreground">{trip.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium mb-1">{trip.progress}%</p>
                  <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-600 rounded-full" 
                      style={{ width: `${trip.progress}%` }} 
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4">
            <button className="glass p-6 text-left hover:bg-white/5 transition-all group">
              <p className="text-lg font-bold group-hover:text-purple-400 transition-colors">Generate New Trip ✨</p>
              <p className="text-sm text-muted-foreground">Let AI create a custom itinerary in seconds.</p>
            </button>
            <button className="glass p-6 text-left hover:bg-white/5 transition-all group">
              <p className="text-lg font-bold group-hover:text-purple-400 transition-colors">Split Expenses 💰</p>
              <p className="text-sm text-muted-foreground">Calculate shared costs with your travel group.</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
