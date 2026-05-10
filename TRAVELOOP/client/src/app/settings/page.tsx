'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Globe, Bell, CreditCard, Upload, Camera, Check } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [profile, setProfile] = useState({
    name: 'Alexandra Smith',
    email: 'alexandra.smith@example.com',
    bio: 'Luxury travel enthusiast, coffee aficionado, and part-time photographer searching for the world\'s hidden gems.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  });

  const [preferences, setPreferences] = useState({
    luxury: true,
    adventure: false,
    cultural: true,
    wellness: true,
    culinary: true
  });

  const [system, setSystem] = useState({
    language: 'English (US)',
    currency: 'USD ($)',
    publicProfile: true,
    marketingEmails: false
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast('Settings saved successfully');
    }, 1500);
  };

  return (
    <div className="editorial-container pt-32 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-luxury-charcoal mb-4">
            Account Settings
          </h1>
          <p className="text-luxury-charcoal/60 text-lg">
            Manage your personal profile, travel preferences, and security.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Settings Navigation Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-2">
            {[
              { id: 'profile', icon: User, label: 'Public Profile' },
              { id: 'preferences', icon: Globe, label: 'Travel Preferences' },
              { id: 'notifications', icon: Bell, label: 'Notifications' },
              { id: 'security', icon: Shield, label: 'Privacy & Security' },
              { id: 'billing', icon: CreditCard, label: 'Billing & Plans' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === tab.id ? 'bg-red-600 text-white shadow-md' : 'text-luxury-charcoal/60 hover:bg-luxury-beige hover:text-luxury-charcoal'}`}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Settings Content Area */}
          <div className="flex-1">
            <form onSubmit={handleSave} className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
              <AnimatePresence mode="wait">
                
                {/* PROFILE TAB */}
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="p-8 md:p-12 space-y-10"
                  >
                    <div>
                      <h2 className="text-2xl font-serif font-medium mb-1">Your Identity</h2>
                      <p className="text-sm text-luxury-charcoal/50">This is how you will appear to other travelers and concierges.</p>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-luxury-beige">
                          <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <button type="button" className="px-4 py-2 border border-black/10 rounded-full text-xs font-bold uppercase tracking-widest hover:border-red-600 transition-colors mb-2 block">
                          Change Avatar
                        </button>
                        <p className="text-[10px] text-luxury-charcoal/40 uppercase tracking-widest">JPG, GIF or PNG. Max 2MB.</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/50 mb-2 block">Full Name</label>
                          <input 
                            type="text" 
                            value={profile.name}
                            onChange={e => setProfile({...profile, name: e.target.value})}
                            className="w-full bg-luxury-beige/30 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600" 
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/50 mb-2 block">Email Address</label>
                          <input 
                            type="email" 
                            value={profile.email}
                            onChange={e => setProfile({...profile, email: e.target.value})}
                            className="w-full bg-luxury-beige/30 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600" 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/50 mb-2 block">Travel Bio</label>
                        <textarea 
                          value={profile.bio}
                          onChange={e => setProfile({...profile, bio: e.target.value})}
                          rows={4}
                          className="w-full bg-luxury-beige/30 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 resize-none" 
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* PREFERENCES TAB */}
                {activeTab === 'preferences' && (
                  <motion.div
                    key="preferences"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="p-8 md:p-12 space-y-10"
                  >
                    <div>
                      <h2 className="text-2xl font-serif font-medium mb-1">Travel DNA</h2>
                      <p className="text-sm text-luxury-charcoal/50">These preferences shape your AI concierge's recommendations.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {Object.entries(preferences).map(([key, value]) => (
                        <div 
                          key={key}
                          onClick={() => setPreferences({...preferences, [key]: !value})}
                          className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${value ? 'border-red-600 bg-red-600/5' : 'border-black/5 bg-white hover:border-black/20'}`}
                        >
                          <span className="font-medium capitalize text-sm">{key}</span>
                          <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${value ? 'bg-red-600 text-white' : 'border border-black/20'}`}>
                            {value && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* SECURITY / SYSTEM TAB (Combined mockup) */}
                {(activeTab === 'security' || activeTab === 'notifications' || activeTab === 'billing') && (
                  <motion.div
                    key="system"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="p-8 md:p-12 space-y-10"
                  >
                    <div className="flex flex-col items-center justify-center text-center py-12">
                      <Shield className="w-16 h-16 text-luxury-charcoal/20 mb-6" />
                      <h2 className="text-2xl font-serif font-medium mb-2">System Configuration</h2>
                      <p className="text-luxury-charcoal/50 max-w-sm mb-8">Localization, security, and billing settings are managed via your Apple ID or Google Workspace SSO.</p>
                      
                      <div className="w-full max-w-md space-y-4 text-left">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/50 mb-2 block">System Language</label>
                          <select 
                            value={system.language}
                            onChange={e => setSystem({...system, language: e.target.value})}
                            className="w-full bg-luxury-beige/30 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 text-sm"
                          >
                            <option>English (US)</option>
                            <option>French (FR)</option>
                            <option>Japanese (JP)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal/50 mb-2 block">Preferred Currency</label>
                          <select 
                            value={system.currency}
                            onChange={e => setSystem({...system, currency: e.target.value})}
                            className="w-full bg-luxury-beige/30 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 text-sm"
                          >
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>JPY (¥)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Footer */}
              <div className="p-6 md:px-12 bg-luxury-beige/20 border-t border-black/5 flex justify-end gap-4">
                <button type="button" className="px-6 py-3 rounded-xl font-bold text-sm text-luxury-charcoal/60 hover:text-luxury-charcoal transition-colors">
                  Discard Changes
                </button>
                <AnimatedButton type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Settings'}
                </AnimatedButton>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
