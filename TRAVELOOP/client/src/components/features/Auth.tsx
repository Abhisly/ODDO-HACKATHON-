'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { authApi } from '@/lib/api';
import { useTravelStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });

  const router = useRouter();
  const { setUser } = useTravelStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock Login for Hackathon Demo if the backend is slow or DB is disconnected
    if (formData.email === 'user@123' && formData.password === 'PASS@123') {
      const mockUser = {
        id: 'mock-123',
        fullName: 'Demo Explorer',
        username: 'explorer_pro',
        email: 'user@123',
        role: 'USER',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=explorer'
      };
      localStorage.setItem('token', 'mock-jwt-token');
      setUser(mockUser);
      toast.success('Access Granted (Tactical Mock Mode)');
      router.push('/dashboard');
      setLoading(false);
      return;
    }

    try {
      let res;
      if (isLogin) {
        res = await authApi.login({ email: formData.email, password: formData.password });
      } else {
        res = await authApi.register(formData);
      }

      localStorage.setItem('token', res.token);
      setUser(res.data);
      toast.success(res.message || 'Authenticated successfully');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="hero-glow opacity-30" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass w-full max-w-md p-10 z-10 shadow-2xl border-white/10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter mb-2 dark:text-white">
            {isLogin ? 'Tactical Entry' : 'Join Intelligence'}
          </h2>
          <p className="text-muted-foreground text-sm">
            {isLogin ? 'Enter your credentials to access the matrix.' : 'Initialize your travel intelligence profile.'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full glass bg-transparent px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all text-sm dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Username</label>
                <input 
                  type="text" 
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full glass bg-transparent px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all text-sm dark:text-white"
                  placeholder="johndoe"
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Email / Identifier</label>
            <input 
              type="text" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full glass bg-transparent px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all text-sm dark:text-white"
              placeholder="user@123"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Password</label>
            <input 
              type="password" 
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full glass bg-transparent px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all text-sm dark:text-white"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isLogin ? 'Access Matrix' : 'Initialize Profile')}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-muted-foreground hover:text-red-600 transition-colors uppercase text-[10px] font-bold tracking-widest"
          >
            {isLogin ? "No identity? Register Profile" : "Existing Identity? Login"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
