'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Shield, Bell, Globe, Camera, Save, ArrowLeft, LogOut, CreditCard, DollarSign } from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type Tab = 'profile' | 'regional';

export default function SettingsPage() {
  const { user, setUser, currency, setCurrency, maxBudget, setMaxBudget } = useTravelStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    username: user?.username || '',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setUser({ ...user, ...formData });
      toast.success('Intelligence profile updated');
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
    toast.success('Logged out successfully');
  };

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  ];

  return (
    <div className="editorial-container pt-32 pb-24">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center gap-4 mb-12">
          <button onClick={() => router.back()} className="p-3 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-red-500/30 transition-colors">
            <ArrowLeft className="w-5 h-5 text-luxury-charcoal dark:text-white" />
          </button>
          <h1 className="text-4xl md:text-5xl font-serif font-medium dark:text-white">Configuration Matrix</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Navigation */}
          <div className="md:col-span-1 space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest ${activeTab === 'profile' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'hover:bg-black/5 dark:hover:bg-white/5 text-luxury-charcoal/60 dark:text-white/60'}`}
            >
              <User className="w-4 h-4" />
              Profile Info
            </button>
            <button
              onClick={() => setActiveTab('regional')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest ${activeTab === 'regional' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'hover:bg-black/5 dark:hover:bg-white/5 text-luxury-charcoal/60 dark:text-white/60'}`}
            >
              <Globe className="w-4 h-4" />
              Regional Settings
            </button>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all font-bold text-xs uppercase tracking-widest mt-8"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Main Panel */}
          <div className="md:col-span-2">
            <GlassPanel className="p-10 bg-white dark:bg-zinc-900 border-black/5 dark:border-white/10 shadow-2xl">
              <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                  <motion.form 
                    key="profile"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSave} 
                    className="space-y-8"
                  >
                    <div className="flex flex-col items-center gap-6 mb-8">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-600/20">
                          <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'explorer'}`} alt="" className="w-full h-full object-cover" />
                        </div>
                        <button type="button" className="absolute bottom-0 right-0 p-3 rounded-full bg-red-600 text-white shadow-xl hover:scale-110 transition-transform">
                          <Camera className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40">Identification Matrix</p>
                    </div>

                    <div className="grid gap-6">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40 mb-2 block">Full Name</label>
                        <input 
                          value={formData.fullName}
                          onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-black/5 dark:bg-white/5 border-0 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-red-600 outline-none text-sm dark:text-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40 mb-2 block">Email Address</label>
                        <input 
                          value={formData.email}
                          className="w-full bg-black/5 dark:bg-white/5 border-0 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-red-600 outline-none text-sm dark:text-white transition-all opacity-50"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40 mb-2 block">Username</label>
                        <input 
                          value={formData.username}
                          onChange={e => setFormData({ ...formData, username: e.target.value })}
                          className="w-full bg-black/5 dark:bg-white/5 border-0 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-red-600 outline-none text-sm dark:text-white transition-all"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full btn-luxury py-5 flex items-center justify-center gap-3 shadow-xl shadow-red-600/20"
                    >
                      <Save className="w-5 h-5" />
                      {loading ? 'Updating Intelligence...' : 'Commit Changes'}
                    </button>
                  </motion.form>
                )}

                {activeTab === 'regional' && (
                  <motion.div 
                    key="regional"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div>
                       <h3 className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40 mb-6 flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-red-600" /> Currency Operations
                       </h3>
                       <div className="grid grid-cols-2 gap-4">
                          {currencies.map(c => (
                            <button
                              key={c.code}
                              onClick={() => {
                                setCurrency(c.code);
                                toast.success(`Currency switched to ${c.code}`);
                              }}
                              className={`p-6 rounded-2xl border text-left transition-all group ${currency === c.code ? 'border-red-600 bg-red-600/5 ring-1 ring-red-600' : 'border-black/5 dark:border-white/5 hover:border-red-400/50'}`}
                            >
                               <div className="flex justify-between items-start mb-2">
                                  <span className="text-2xl font-serif font-bold dark:text-white">{c.symbol}</span>
                                  <div className={`w-2 h-2 rounded-full ${currency === c.code ? 'bg-red-600 animate-pulse' : 'bg-transparent'}`} />
                               </div>
                               <p className="text-xs font-bold dark:text-white uppercase tracking-tighter">{c.name}</p>
                               <p className="text-[10px] text-luxury-charcoal/40 dark:text-white/40 mt-1">{c.code}</p>
                            </button>
                          ))}
                       </div>
                    </div>

                    <div>
                       <h3 className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/40 dark:text-white/40 mb-6 flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-red-600" /> Operational Budget Limit
                       </h3>
                       <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 space-y-4">
                          <p className="text-sm text-luxury-charcoal/60 dark:text-white/60 leading-relaxed">
                            Set your maximum fiscal burn for new mission deployments. This limit will be tracked across all tactical planners.
                          </p>
                          <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-luxury-charcoal/40 dark:text-white/40 font-bold">{currency}</span>
                            <input 
                              type="number"
                              value={maxBudget}
                              onChange={(e) => setMaxBudget(parseInt(e.target.value) || 0)}
                              className="w-full bg-white dark:bg-black/40 border-0 rounded-xl pl-14 pr-6 py-4 focus:ring-1 focus:ring-red-600 outline-none font-bold text-lg dark:text-white transition-all shadow-inner"
                            />
                          </div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassPanel>
          </div>

        </div>
      </div>
    </div>
  );
}
