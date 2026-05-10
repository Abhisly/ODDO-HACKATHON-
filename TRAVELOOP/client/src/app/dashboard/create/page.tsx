'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarIcon, MapPin, Users, Wallet, ArrowRight, Loader2, Plane, Train, Car, Route, Clock, Compass, Image as ImageIcon, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useTravelStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import AsyncSelect from 'react-select/async';
import { searchCities, calculateDistanceKm, calculateDurationHours, generateMockConnectingStations, LocationOption } from '@/lib/location';

// Custom styles for react-select to match our luxury theme
const customSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    background: 'transparent',
    borderColor: state.isFocused ? '#2C5545' : 'rgba(0,0,0,0.1)',
    boxShadow: state.isFocused ? '0 0 0 1px #2C5545' : 'none',
    padding: '8px',
    borderRadius: '12px',
    fontFamily: 'var(--font-inter)',
    '&:hover': {
      borderColor: '#2C5545'
    }
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? '#2C5545' : state.isFocused ? 'rgba(44, 85, 69, 0.1)' : 'white',
    color: state.isSelected ? 'white' : '#1A1A1A',
    fontFamily: 'var(--font-inter)',
    padding: '12px 16px',
    cursor: 'pointer',
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
    zIndex: 50
  })
};

// Form Schema
const formSchema = z.object({
  name: z.string().min(3, "Trip name must be at least 3 characters").optional(),
  description: z.string().optional(),
  coverImage: z.string().url("Must be a valid image URL").optional().or(z.literal('')),
  origin: z.object({
    value: z.string(),
    label: z.string(),
    latitude: z.string(),
    longitude: z.string()
  }, { required_error: 'Origin is required.' }),
  destination: z.object({
    value: z.string(),
    label: z.string(),
    latitude: z.string(),
    longitude: z.string()
  }, { required_error: 'Destination is required.' }),
  transportMode: z.enum(['Flight', 'Train', 'Car']),
  dateRange: z.object({
    from: z.date({ required_error: 'Start date is required.' }),
    to: z.date({ required_error: 'End date is required.' }),
  }),
  travelers: z.number().min(1).max(10),
  budget: z.number().min(500),
  preferences: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

const TOTAL_STEPS = 5;

export default function CreateTripPage() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Telemetry state
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState('0h');
  const [connections, setConnections] = useState<string[]>([]);

  const router = useRouter();
  const { addTrip } = useTravelStore();

  const { control, handleSubmit, watch, setValue, register, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transportMode: 'Flight',
      travelers: 2,
      budget: 5000,
      name: '',
      description: '',
      coverImage: '',
      preferences: ''
    }
  });

  const origin = watch('origin');
  const destination = watch('destination');
  const transportMode = watch('transportMode');
  const dateRange = watch('dateRange');
  const tripName = watch('name');
  const coverImage = watch('coverImage');

  // Update Telemetry when origin/destination/transport changes
  useEffect(() => {
    if (origin && destination) {
      const dist = calculateDistanceKm(origin.latitude, origin.longitude, destination.latitude, destination.longitude);
      setDistance(dist);
      setDuration(calculateDurationHours(dist, transportMode));
      setConnections(generateMockConnectingStations(dist, transportMode));
      
      // Auto-generate trip name if empty
      if (!tripName) {
        setValue('name', `Journey to ${destination.label.split(',')[0]}`);
      }
    } else {
      setDistance(0);
      setDuration('0h');
      setConnections([]);
    }
  }, [origin, destination, transportMode]);

  const loadCityOptions = (inputValue: string, callback: (options: LocationOption[]) => void) => {
    setTimeout(() => {
      callback(searchCities(inputValue));
    }, 500);
  };

  const onSubmit = async (data: FormData) => {
    if (step < TOTAL_STEPS) {
      nextStep();
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI Generation Delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create realistic destination object based on selection
    const destImage = data.coverImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop';
    
    const newTrip = {
      id: `trip-${Date.now()}`,
      destination: {
        id: data.destination.value,
        name: data.name || `Journey to ${data.destination.label}`,
        image: destImage,
        category: 'Custom Routing',
        region: 'Global',
        priceLevel: '$$$',
        description: data.description || `Journey from ${data.origin.label} to ${data.destination.label} via ${data.transportMode}.`,
        distance: distance,
        duration: duration,
        weather: { temp: 24, condition: 'Clear', icon: 'Sun' } // Mock weather
      },
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
            { id: `act-${Date.now()}-1`, time: '10:00 AM', title: `Depart from ${data.origin.label}`, type: data.transportMode },
            { id: `act-${Date.now()}-2`, time: '02:00 PM', title: `Arrival at ${data.destination.label}`, type: data.transportMode }
          ]
        }
      ]
    };

    addTrip(newTrip);
    router.push('/trips');
  };

  const nextStep = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="editorial-container pt-32 pb-24 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-medium tracking-tight text-luxury-charcoal mb-4">
          Journey Architect
        </h1>
        <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {Array.from({ length: TOTAL_STEPS }).map((_, idx) => {
            const i = idx + 1;
            return (
              <div key={i} className="flex items-center gap-4 shrink-0">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors shrink-0",
                  step >= i ? "bg-red-600 text-white shadow-sm" : "bg-luxury-beige text-luxury-charcoal/40"
                )}>
                  {i}
                </div>
                {i < TOTAL_STEPS && <div className={cn(
                  "h-px w-8 md:w-16 transition-colors",
                  step > i ? "bg-red-600" : "bg-luxury-charcoal/10"
                )} />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="editorial-card p-8 md:p-12 border border-black/5 bg-white shadow-sm min-h-[600px] flex flex-col relative overflow-hidden">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center absolute inset-0 bg-white/80 backdrop-blur-md z-50">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="mb-8"
            >
              <Compass className="w-16 h-16 text-red-600" />
            </motion.div>
            <h2 className="text-3xl font-serif font-medium mb-4">Establishing Route Vector...</h2>
            <p className="text-luxury-charcoal/60 max-w-md mx-auto text-lg">
              Compiling your travel matrix, booking telemetry, and AI suggestions for {destination?.label}.
            </p>
          </div>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Route Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12 flex-1"
              >
                <div>
                  <h2 className="text-2xl font-serif font-medium mb-6">Define your route.</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold tracking-widest uppercase text-luxury-charcoal/60 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Current Location (Origin)
                      </label>
                      <Controller
                        name="origin"
                        control={control}
                        render={({ field }) => (
                          <AsyncSelect
                            {...field}
                            instanceId="origin-select"
                            loadOptions={loadCityOptions}
                            placeholder="Search any global city..."
                            styles={customSelectStyles}
                            noOptionsMessage={() => "Type a city name to search (e.g. 'Paris')"}
                          />
                        )}
                      />
                      {errors.origin && <p className="text-red-500 text-sm">{errors.origin.message}</p>}
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-bold tracking-widest uppercase text-luxury-charcoal/60 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-600" /> Target Destination
                      </label>
                      <Controller
                        name="destination"
                        control={control}
                        render={({ field }) => (
                          <AsyncSelect
                            {...field}
                            instanceId="destination-select"
                            loadOptions={loadCityOptions}
                            placeholder="Search destination city..."
                            styles={customSelectStyles}
                            noOptionsMessage={() => "Type a city name to search (e.g. 'Tokyo')"}
                          />
                        )}
                      />
                      {errors.destination && <p className="text-red-500 text-sm">{errors.destination.message}</p>}
                    </div>
                  </div>
                </div>

                <div>
                   <label className="text-sm font-bold tracking-widest uppercase text-luxury-charcoal/60 mb-4 block">
                      Transport Mode
                   </label>
                   <div className="grid grid-cols-3 gap-4">
                     {[
                       { id: 'Flight', icon: Plane },
                       { id: 'Train', icon: Train },
                       { id: 'Car', icon: Car }
                     ].map((mode) => (
                       <div 
                         key={mode.id}
                         onClick={() => setValue('transportMode', mode.id as any)}
                         className={cn(
                           "p-4 rounded-xl border flex flex-col items-center justify-center gap-3 cursor-pointer transition-all",
                           transportMode === mode.id ? "border-red-600 bg-red-600/5 text-red-600 shadow-sm" : "border-black/10 hover:border-black/30 text-luxury-charcoal/70"
                         )}
                       >
                         <mode.icon className="w-6 h-6" />
                         <span className="font-medium text-sm">{mode.id}</span>
                       </div>
                     ))}
                   </div>
                </div>

                <AnimatePresence>
                  {origin && destination && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-luxury-beige rounded-2xl p-6 border border-black/5 space-y-6"
                    >
                      <h3 className="font-serif font-medium text-lg flex items-center gap-2">
                        <Route className="w-5 h-5 text-red-600" /> Route Telemetry
                      </h3>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-luxury-charcoal/50 mb-1">Total Distance</p>
                          <p className="font-serif text-2xl font-medium">{distance.toLocaleString()} <span className="text-base text-luxury-charcoal/60">km</span></p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-luxury-charcoal/50 mb-1">Est. Duration</p>
                          <p className="font-serif text-2xl font-medium flex items-center gap-2">
                            {duration} <Clock className="w-4 h-4 text-luxury-charcoal/40" />
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs uppercase tracking-widest text-luxury-charcoal/50 mb-1">Connecting Stations</p>
                          {connections.length > 0 ? (
                             <div className="flex gap-2 flex-wrap">
                               {connections.map((c, i) => (
                                 <span key={i} className="px-3 py-1 bg-white rounded-full text-sm font-medium border border-black/5 shadow-sm">
                                   {c}
                                 </span>
                               ))}
                             </div>
                          ) : (
                             <p className="font-serif text-lg text-luxury-charcoal/60">Direct Route Available</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </motion.div>
            )}

            {/* STEP 2: Dates & Travelers */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 flex-1"
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
                            day_selected: "bg-red-600 text-white hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white",
                            day_today: "font-bold text-red-600",
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
                        {...register('budget', { valueAsNumber: true })}
                        className="w-full accent-red-600"
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
                className="space-y-8 flex-1"
              >
                <h2 className="text-2xl font-serif font-medium">Any specific preferences?</h2>
                <p className="text-luxury-charcoal/60">Our AI will tailor the itinerary based on your interests.</p>
                
                <textarea 
                  {...register('preferences')}
                  className="w-full h-40 p-4 rounded-xl border border-black/10 bg-luxury-beige/30 focus:outline-none focus:border-red-600 resize-none"
                  placeholder="E.g., I love modern art museums, hidden local restaurants, and prefer slow mornings..."
                />
              </motion.div>
            )}

            {/* STEP 4: Context (Name & Cover Image) */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 flex-1"
              >
                <h2 className="text-2xl font-serif font-medium">Set the tone.</h2>
                <p className="text-luxury-charcoal/60">Give your journey a name and a cinematic cover image.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-bold tracking-widest uppercase text-luxury-charcoal/60 mb-2 block flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Trip Name
                    </label>
                    <input 
                      type="text" 
                      {...register('name')}
                      className="w-full bg-white border border-black/10 rounded-xl py-4 px-6 text-luxury-charcoal focus:outline-none focus:border-red-600 transition-colors"
                      placeholder={`e.g., Summer in ${destination?.label.split(',')[0] || 'Paradise'}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-bold tracking-widest uppercase text-luxury-charcoal/60 mb-2 block flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Trip Description
                    </label>
                    <textarea 
                      {...register('description')}
                      className="w-full bg-white border border-black/10 rounded-xl py-4 px-6 text-luxury-charcoal focus:outline-none focus:border-red-600 transition-colors resize-none h-24"
                      placeholder="A short summary of this journey..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold tracking-widest uppercase text-luxury-charcoal/60 mb-2 block flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> Custom Cover Image URL
                    </label>
                    <input 
                      type="text" 
                      {...register('coverImage')}
                      className="w-full bg-white border border-black/10 rounded-xl py-4 px-6 text-luxury-charcoal focus:outline-none focus:border-red-600 transition-colors"
                      placeholder="https://images.unsplash.com/..."
                    />
                    {errors.coverImage && <p className="text-red-500 text-sm mt-1">{errors.coverImage.message}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Final Preview */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 flex-1"
              >
                <h2 className="text-2xl font-serif font-medium mb-6">Review your Journey Matrix.</h2>
                
                <div className="rounded-3xl overflow-hidden border border-black/10 relative h-64 w-full">
                  <img 
                    src={coverImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop'} 
                    alt="Cover Preview" 
                    className="w-full h-full object-cover absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-1 block">Traveloop Intelligence</span>
                     <h2 className="text-3xl font-serif font-medium">{tripName}</h2>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-luxury-cream rounded-2xl border border-black/5">
                    <h4 className="font-serif font-medium mb-4 flex items-center gap-2"><Route className="w-5 h-5 text-red-600" /> Logistics</h4>
                    <ul className="space-y-3 text-sm text-luxury-charcoal/80">
                      <li className="flex items-center gap-2"><strong>Origin:</strong> {origin?.label}</li>
                      <li className="flex items-center gap-2"><strong>Destination:</strong> {destination?.label}</li>
                      <li className="flex items-center gap-2"><strong>Distance:</strong> {distance.toLocaleString()} km ({duration} via {transportMode})</li>
                      <li className="flex items-center gap-2"><strong>Dates:</strong> {dateRange?.from ? format(dateRange.from, 'MMM dd') : ''} - {dateRange?.to ? format(dateRange.to, 'MMM dd, yyyy') : ''}</li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-luxury-cream rounded-2xl border border-black/5">
                    <h4 className="font-serif font-medium mb-4 flex items-center gap-2"><Wallet className="w-5 h-5 text-red-600" /> Parameters</h4>
                    <ul className="space-y-3 text-sm text-luxury-charcoal/80">
                      <li className="flex items-center gap-2"><strong>Travelers:</strong> {watch('travelers')}</li>
                      <li className="flex items-center gap-2"><strong>Budget:</strong> ${watch('budget').toLocaleString()}</li>
                      <li className="flex flex-col gap-1 mt-2">
                        <strong>Preferences:</strong> 
                        <span className="text-xs italic line-clamp-3">{watch('preferences') || 'None provided.'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-black/5 shrink-0">
            {step > 1 ? (
              <button type="button" onClick={prevStep} className="btn-luxury-outline">
                Back
              </button>
            ) : <div></div>}
            
            <button 
              type="button" 
              onClick={() => {
                if (step === 1 && (!origin || !destination)) {
                  handleSubmit(() => {})();
                  return;
                }
                if (step === 2 && (!dateRange?.from || !dateRange?.to)) {
                  handleSubmit(() => {})();
                  return;
                }
                
                if (step === TOTAL_STEPS) {
                  handleSubmit(onSubmit)();
                } else {
                  nextStep();
                }
              }} 
              className={cn("btn-luxury", (step === 1 && (!origin || !destination)) ? "opacity-50 cursor-not-allowed" : (step === TOTAL_STEPS ? "bg-luxury-charcoal hover:bg-black" : ""))}
            >
              {step === TOTAL_STEPS ? 'Finalize & Generate' : 'Continue'} <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
