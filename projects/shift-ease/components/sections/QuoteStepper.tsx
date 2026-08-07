'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Home, Building, Truck, Calendar, User, Phone, Mail, Calculator, Sparkles, ShieldCheck } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const quoteSchema = z.object({
  fromCity: z.string().min(1, 'Please select origin city'),
  toCity: z.string().min(1, 'Please select destination city'),
  homeSize: z.string().min(1, 'Please select home size'),
  inventory: z.string().min(1, 'Please select inventory size'),
  moveDate: z.string().min(1, 'Please select a move date'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const homeOptions = [
  { id: '1bhk', label: '1 BHK', desc: 'Single room / Studio', icon: Home, baseMin: 4500, baseMax: 7500 },
  { id: '2bhk', label: '2 BHK', desc: 'Standard 2 Bedroom Apartment', icon: Home, baseMin: 7000, baseMax: 12000 },
  { id: '3bhk', label: '3 BHK', desc: 'Large 3 Bedroom Apartment', icon: Home, baseMin: 11000, baseMax: 18000 },
  { id: 'villa', label: 'Villa / 4+ BHK', desc: 'Independent House / Duplex', icon: Building, baseMin: 16000, baseMax: 28000 },
  { id: 'office', label: 'Commercial Office', desc: 'Corporate Office Relocation', icon: Building, baseMin: 15000, baseMax: 45000 },
];

const steps = [
  { id: 'route', label: 'Route & Date' },
  { id: 'home', label: 'Property Size' },
  { id: 'estimate', label: 'Instant Estimate & Contact' },
];

export default function QuoteStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      fromCity: 'Delhi',
      toCity: 'Delhi',
      homeSize: '2bhk',
      inventory: 'medium',
      moveDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      name: '',
      email: '',
      phone: '',
    },
  });

  const selectedHome = watch('homeSize');
  const fromCity = watch('fromCity');
  const toCity = watch('toCity');

  // Calculate dynamic price range
  const homeData = homeOptions.find((h) => h.id === selectedHome) || homeOptions[1];
  const isIntercity = fromCity.toLowerCase() !== toCity.toLowerCase() && fromCity && toCity;
  const priceMin = isIntercity ? Math.round(homeData.baseMin * 2.2) : homeData.baseMin;
  const priceMax = isIntercity ? Math.round(homeData.baseMax * 2.5) : homeData.baseMax;

  const handleNextStep = async () => {
    let isValid = false;
    if (currentStep === 0) {
      isValid = await trigger(['fromCity', 'toCity', 'moveDate']);
    } else if (currentStep === 1) {
      isValid = await trigger(['homeSize', 'inventory']);
    }
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (data: QuoteFormData) => {
    setLoading(true);
    try {
      await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          estimatedPriceMin: priceMin,
          estimatedPriceMax: priceMax,
        }),
      });
    } catch {
      // fallback
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-teal/10 text-teal rounded-3xl flex items-center justify-center mx-auto mb-6 border border-teal/20 shadow-inner">
          <Check className="w-10 h-10" />
        </div>
        <span className="badge bg-teal/20 text-teal text-xs uppercase font-bold py-1 px-3 mb-3">Quote Request ID #SE-{Math.floor(1000 + Math.random() * 9000)}</span>
        <h2 className="heading-lg font-display text-navy mb-3">Estimate Generated Successfully!</h2>
        <p className="text-body text-slate mb-6 leading-relaxed">
          Your estimated relocation budget between <strong className="text-navy">{fromCity}</strong> and <strong className="text-navy">{toCity}</strong> is:
        </p>

        <div className="bg-gradient-to-br from-navy to-slate-900 text-white rounded-2xl p-6 mb-8 shadow-lg">
          <span className="text-xs text-slate-300 uppercase tracking-wider block mb-1">Estimated Cost Range</span>
          <div className="text-3xl md:text-4xl font-display font-extrabold text-teal mb-2">
            ₹{priceMin.toLocaleString()} – ₹{priceMax.toLocaleString()}
          </div>
          <p className="text-xs text-slate-400">Includes professional packing, labor loading, door-to-door transport & unloading.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => { setSubmitted(false); setCurrentStep(0); }}
            className="btn-outline text-sm"
          >
            Calculate Another Estimate
          </button>
          <a href="/directory" className="btn-primary text-sm">
            Browse Verified Movers Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isDone = index < currentStep;
            const isCurrent = index === currentStep;
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                    isDone ? 'bg-teal text-white' : isCurrent ? 'bg-navy text-teal border-2 border-teal' : 'bg-gray-100 text-slate'
                  }`}>
                    {isDone ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  <div className="hidden sm:block">
                    <span className={`text-xs font-semibold uppercase tracking-wider block ${isCurrent ? 'text-teal' : 'text-slate'}`}>Step 0{index + 1}</span>
                    <span className={`text-sm font-bold ${isCurrent ? 'text-navy' : 'text-slate'}`}>{step.label}</span>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-4 rounded-full ${index < currentStep ? 'bg-teal' : 'bg-gray-100'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100"
          >
            {/* STEP 1 */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="heading-md font-display text-navy mb-1 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-teal" /> Move Route & Date
                  </h3>
                  <p className="text-small text-slate">Tell us where you are moving from and to.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">From City (Origin) *</label>
                    <select
                      {...register('fromCity')}
                      className="w-full px-4 py-3.5 bg-lightGray/80 border border-gray-200 rounded-xl text-navy font-medium focus:outline-none focus:ring-2 focus:ring-teal/50"
                    >
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Pune">Pune</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                    {errors.fromCity && <p className="text-red-500 text-xs mt-1">{errors.fromCity.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">To City (Destination) *</label>
                    <select
                      {...register('toCity')}
                      className="w-full px-4 py-3.5 bg-lightGray/80 border border-gray-200 rounded-xl text-navy font-medium focus:outline-none focus:ring-2 focus:ring-teal/50"
                    >
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Pune">Pune</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                    {errors.toCity && <p className="text-red-500 text-xs mt-1">{errors.toCity.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Expected Shifting Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate w-5 h-5" />
                    <input
                      {...register('moveDate')}
                      type="date"
                      className="w-full pl-12 pr-4 py-3.5 bg-lightGray/80 border border-gray-200 rounded-xl text-navy font-medium focus:outline-none focus:ring-2 focus:ring-teal/50"
                    />
                  </div>
                  {errors.moveDate && <p className="text-red-500 text-xs mt-1">{errors.moveDate.message}</p>}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="heading-md font-display text-navy mb-1 flex items-center gap-2">
                    <Home className="w-5 h-5 text-teal" /> Select Property Size
                  </h3>
                  <p className="text-small text-slate">Choose the size of your home or office to calculate truck volume.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {homeOptions.map((opt) => {
                    const isSelected = selectedHome === opt.id;
                    const IconComp = opt.icon;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setValue('homeSize', opt.id)}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-teal/5 border-teal shadow-md'
                            : 'bg-white border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-teal text-white' : 'bg-lightGray text-navy'}`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          {isSelected && <span className="badge bg-teal text-white text-xs font-bold">Selected</span>}
                        </div>
                        <h4 className="font-display font-bold text-navy text-lg">{opt.label}</h4>
                        <p className="text-xs text-slate mt-1">{opt.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Inventory Volume *</label>
                  <select
                    {...register('inventory')}
                    className="w-full px-4 py-3.5 bg-lightGray/80 border border-gray-200 rounded-xl text-navy font-medium focus:outline-none focus:ring-2 focus:ring-teal/50"
                  >
                    <option value="minimal">Minimal Furniture (Few items / Single room)</option>
                    <option value="medium">Standard Full Furnished Household</option>
                    <option value="heavy">Heavy Inventory (Includes Piano, Appliances, Heavy Wood)</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="heading-md font-display text-navy mb-1 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-teal" /> Instant Quote Estimate
                  </h3>
                  <p className="text-small text-slate">Enter contact info to unlock full vendor comparison report.</p>
                </div>

                {/* Instant Calculated Card */}
                <div className="bg-gradient-to-r from-navy to-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-700 pb-3">
                    <span className="text-xs text-teal font-bold uppercase tracking-wider flex items-center gap-1">
                      <Calculator className="w-4 h-4" /> Live Estimate Calculated
                    </span>
                    <span className="badge bg-teal/20 text-teal text-xs">
                      {isIntercity ? 'Intercity Move' : 'Local Move'}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div>
                      <div className="text-3xl font-display font-extrabold text-teal">
                        ₹{priceMin.toLocaleString()} – ₹{priceMax.toLocaleString()}
                      </div>
                      <p className="text-xs text-slate-300 mt-1">Based on {homeData.label} in {fromCity}</p>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-teal" /> Includes Insurance & Tax
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">Your Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate w-5 h-5" />
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-3.5 bg-lightGray/80 border border-gray-200 rounded-xl text-navy font-medium focus:outline-none focus:ring-2 focus:ring-teal/50"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">Phone Number (+91) *</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate w-5 h-5" />
                        <input
                          {...register('phone')}
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="w-full pl-12 pr-4 py-3.5 bg-lightGray/80 border border-gray-200 rounded-xl text-navy font-medium focus:outline-none focus:ring-2 focus:ring-teal/50"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate w-5 h-5" />
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="john@example.com"
                          className="w-full pl-12 pr-4 py-3.5 bg-lightGray/80 border border-gray-200 rounded-xl text-navy font-medium focus:outline-none focus:ring-2 focus:ring-teal/50"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="btn-outline text-sm px-6 py-3"
                >
                  Back Step
                </button>
              ) : <div />}

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn-primary text-sm px-8 py-3"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary text-sm px-8 py-3 flex items-center gap-2 shadow-lg shadow-teal/20"
                >
                  {loading ? 'Generating Quote...' : 'Submit & Receive Vendor Contact'}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </form>
    </div>
  );
}