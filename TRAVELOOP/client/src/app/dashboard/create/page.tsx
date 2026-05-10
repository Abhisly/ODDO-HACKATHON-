'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarIcon, MapPin, Users, Wallet, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useTravelStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// Form Schema
const formSchema = z.object({
  destinationId: z.string().min(1, 'Please select a destination.'),
  dateRange: z.object({
    from: z.date({ required_error: 'Start date is required.' }),
    to: z.date({ required_error: 'End date is required.' }),
  }),
  travelers: z.number().min(1).max(10),
  budget: z.number().min(500),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateTripPage() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  const { destinations, addTrip } = useTravelStore();

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      travelers: 2,
      budget: 5000,
    }
  });

  const selectedDestinationId = watch('destinationId');
  const dateRange = watch('dateRange');

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true);
    
    // Simulate AI Generation Delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const dest = destinations.find(d => d.id === data.destinationId);
    
    // Generate Mock Trip
    const newTrip = {
      id: `trip-${Date.now()}`,
      destination: dest,
      startDate: data.dateRange.from.toISOString(),
      endDate: data.dateRange.to.toISOString(),
      status: 'Planning',
      budget: data.budget,
      travelers: data.travelers,
      itinerary: [
        {
          day: 1,
          date: data.dateRange.from.toISOString(),
          activities: [
            { id: `act-${Date.now()}-1`, time: '10:00 AM', title: `Arrival in ${dest?.name}`, type: 'Flight' },
            { id: `act-${Date.now()}-2`, time: '02:00 PM', title: 'Check-in to Luxury Hotel', type: 'Accommodation' }
          ]
        }
      ]
    };

    addTrip(newTrip);
    router.push('/dashboard');
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="editorial-container pt-32 pb-24 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-medium tracking-tight text-luxury-charcoal mb-4">
          Plan Your Journey
        </h1>
        <div className="flex items-center gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                step >= i ? "bg-luxury-forest text-white" : "bg-luxury-beige text-luxury-charcoal/40"
              )}>
                {i}
              </div>
              {i < 3 && <div className={cn(
                "h-px w-12 transition-colors",
                step > i ? "bg-luxury-forest" : "bg-luxury-charcoal/10"
              )} />}
            </div>
          ))}
        </div>
      </div>

      <div className="editorial-card p-8 md:p-12 border border-black/5 bg-white">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <Compass className="w-16 h-16 text-luxury-forest mb-6" />
            </motion.div>
            <h2 className="text-2xl font-serif font-medium mb-2">AI is crafting your itinerary...</h2>
            <p className="text-luxury-charcoal/60">Analyzing flight routes, boutique hotels, and hidden gems.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Destination */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-serif font-medium">Where do you want to go?</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {destinations.map((dest) => (
                      <div 
                        key={dest.id}
                        onClick={() => setValue('destinationId', dest.id, { shouldValidate: true })}
                        className={cn(
                          "relative h-48 rounded-2xl overflow-hidden cursor-pointer group border-2 transition-all",
                          selectedDestinationId === dest.id ? "border-luxury-forest shadow-md" : "border-transparent"
                        )}
                      >
                        <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="font-serif text-xl font-medium">{dest.name}</h3>
                          <p className="text-sm opacity-80">{dest.category}</p>
                        </div>
                        {selectedDestinationId === dest.id && (
                          <div className="absolute top-4 right-4 w-6 h-6 bg-luxury-forest rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {errors.destinationId && <p className="text-red-500 text-sm">{errors.destinationId.message}</p>}
                </motion.div>
              )}

              {/* STEP 2: Dates & Travelers */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-serif font-medium">When are you traveling?</h2>
                  <div className="flex flex-col md:flex-row gap-12">
                    <div>
                      <Controller
                        control={control}
                        name="dateRange"
                        render={({ field }) => (
                          <DayPicker
                            mode="range"
                            selected={field.value as any}
                            onSelect={field.onChange}
                            className="border border-black/10 rounded-2xl p-4 bg-luxury-beige/30"
                            classNames={{
                              day_selected: "bg-luxury-forest text-white hover:bg-luxury-forest hover:text-white focus:bg-luxury-forest focus:text-white",
                              day_today: "font-bold text-luxury-forest",
                            }}
                          />
                        )}
                      />
                      {errors.dateRange && <p className="text-red-500 text-sm mt-2">{errors.dateRange.message || "Select valid dates"}</p>}
                    </div>

                    <div className="space-y-8 flex-1">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-luxury-charcoal/60 mb-4">
                          <Users className="w-4 h-4" /> Travelers
                        </label>
                        <div className="flex items-center gap-4">
                          <button type="button" onClick={() => setValue('travelers', Math.max(1, watch('travelers') - 1))} className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-luxury-beige">-</button>
                          <span className="text-2xl font-serif">{watch('travelers')}</span>
                          <button type="button" onClick={() => setValue('travelers', Math.min(10, watch('travelers') + 1))} className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-luxury-beige">+</button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-luxury-charcoal/60 mb-4">
                          <Wallet className="w-4 h-4" /> Budget Estimation (USD)
                        </label>
                        <input 
                          type="range" 
                          min="500" 
                          max="20000" 
                          step="500"
                          {...control.register('budget', { valueAsNumber: true })}
                          className="w-full accent-luxury-forest"
                        />
                        <div className="flex justify-between mt-2 font-serif text-lg">
                          <span>${watch('budget').toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: AI Preferences */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-serif font-medium">Any specific preferences?</h2>
                  <p className="text-luxury-charcoal/60">Our AI will tailor the itinerary based on your interests.</p>
                  
                  <textarea 
                    className="w-full h-32 p-4 rounded-xl border border-black/10 bg-luxury-beige/30 focus:outline-none focus:border-luxury-forest resize-none"
                    placeholder="E.g., I love modern art museums, hidden local restaurants, and prefer slow mornings..."
                  />
                  
                  <div className="p-6 bg-luxury-cream rounded-2xl border border-black/5">
                    <h4 className="font-serif font-medium mb-2">Trip Summary</h4>
                    <ul className="space-y-2 text-sm text-luxury-charcoal/80">
                      <li>• Destination: {destinations.find(d => d.id === selectedDestinationId)?.name}</li>
                      <li>• Dates: {dateRange?.from ? format(dateRange.from, 'MMM dd') : ''} - {dateRange?.to ? format(dateRange.to, 'MMM dd, yyyy') : ''}</li>
                      <li>• Travelers: {watch('travelers')}</li>
                      <li>• Budget: ${watch('budget').toLocaleString()}</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-black/5">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="btn-luxury-outline">
                  Back
                </button>
              ) : <div></div>}
              
              {step < 3 ? (
                <button 
                  type="button" 
                  onClick={() => {
                    if (step === 1 && !selectedDestinationId) return;
                    if (step === 2 && (!dateRange?.from || !dateRange?.to)) return;
                    nextStep();
                  }} 
                  className={cn("btn-luxury", (step === 1 && !selectedDestinationId) ? "opacity-50 cursor-not-allowed" : "")}
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button type="submit" className="btn-luxury bg-luxury-charcoal hover:bg-black">
                  Generate Itinerary
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
