'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Bell, Globe, Camera, Save, ArrowLeft, LogOut } from 'lucide-react';
import { useTravelStore } from '@/lib/store';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { user, setUser } = useTravelStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    username: user?.username || '',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mocking update for now as backend profile update is similar to auth
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

  return (
    <div className="editorial-container pt-32 pb-24">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center gap-4 mb-12">
          <Link href="/dashboard" className="p-3 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-red-500/30 transition-colors">
            <ArrowLeft className="w-5 h-5 text-luxury-charcoal dark:text-white" />
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-medium dark:text-white">Account Settings</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Navigation */}
          <div className="md:col-span-1 space-y-2">
            {[
              { label: 'Profile Info', icon: User, active: true },
              { label: 'Security', icon: Shield, active: false },
              { label: 'Notifications', icon: Bell, active: false },
              { label: 'Regional Settings', icon: Globe, active: false },
            ].map(item => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest ${item.active ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'hover:bg-black/5 dark:hover:bg-white/5 text-luxury-charcoal/60 dark:text-white/60'}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all font-bold text-xs uppercase tracking-widest mt-8"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <GlassPanel className="p-10 bg-white dark:bg-zinc-900 border-black/5 dark:border-white/10">
              <form onSubmit={handleSave} className="space-y-8">
                
                {/* Avatar */}
                <div className="flex flex-col items-center gap-6 mb-12">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-600/20">
                      <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <button className="absolute bottom-0 right-0 p-3 rounded-full bg-red-600 text-white shadow-xl hover:scale-110 transition-transform">
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
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/5 border-0 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-red-600 outline-none text-sm dark:text-white transition-all opacity-70"
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

              </form>
            </GlassPanel>
          </div>

        </div>
      </div>
    </div>
  );
}

// Minimal Link component for local use if not imported
function Link({ href, children, className }: any) {
  return <a href={href} className={className}>{children}</a>;
}
