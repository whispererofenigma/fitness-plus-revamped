// src/components/home/MembershipClient.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Check, LoaderCircle } from 'lucide-react';
import { Database } from '@/lib/supabase';

type Plan = Database['public']['Tables']['membership_plans']['Row'];
type Feature = Database['public']['Tables']['membership_features']['Row'];

type MembershipClientProps = {
  plans: Plan[];
  features: Feature[];
};

const MembershipClient = ({ plans, features }: MembershipClientProps) => {
  // CORRECTED: All hooks are now called unconditionally at the top of the component.
  const [activePlanId, setActivePlanId] = useState<string | null>(() => {
    // This function runs only on the initial render to set the default state.
    if (!plans || plans.length === 0) {
      return null;
    }
    const annualPlan = plans.find(p => p.plan_id === 'annually');
    return annualPlan ? annualPlan.plan_id : plans[0].plan_id;
  });

  // Now we can safely find the active plan.
  const activePlan = plans?.find(p => p.plan_id === activePlanId);

  // The guard clause is now placed *after* all hook calls.
  if (!plans || plans.length === 0) {
    return (
        <div className="flex justify-center items-center h-96">
            <LoaderCircle className="animate-spin text-accent" size={32} />
        </div>
    );
  }

  return (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="max-w-4xl mx-auto flex flex-col p-8 rounded-3xl bg-[#181818] shadow-neo-lg"
    >
        <div className="relative flex flex-wrap justify-center items-center gap-2 mb-8 p-2 rounded-full shadow-neo-inset">
            {plans.map((plan) => (
                <button
                    key={plan.id}
                    onClick={() => setActivePlanId(plan.plan_id)}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                        activePlanId === plan.plan_id ? 'text-white' : 'text-gray-400'
                    }`}
                >
                    {activePlanId === plan.plan_id && (
                        <motion.div
                            layoutId="plan-pill"
                            className="absolute inset-0 bg-accent/10 rounded-full"
                            style={{ borderRadius: 9999 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                        />
                    )}
                    <span className="relative z-10">{plan.title}</span>
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activePlan?.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <h3 className="text-2xl font-bold text-white">{activePlan?.title}</h3>
                            {activePlan?.tag && (
                                <div className="px-3 py-1 bg-accent/20 text-accent text-sm font-bold rounded-full">
                                    {activePlan.tag}
                                </div>
                            )}
                        </div>
                        <div className="mt-4 flex items-baseline justify-center md:justify-start gap-2">
                            {activePlan?.original_price && (
                                <span className="text-3xl text-gray-500 line-through">{activePlan.original_price}</span>
                            )}
                            <span className="text-5xl font-extrabold text-white">{activePlan?.price}</span>
                            <span className="text-gray-400">{activePlan?.duration}</span>
                        </div>
                    </motion.div>
                </AnimatePresence>
                <Link
                    href={activePlan?.href || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine mt-8 w-full inline-block text-center px-6 py-4 font-bold uppercase rounded-xl transition-all duration-300 bg-accent text-black shadow-lg shadow-accent/20"
                >
                    Become a Member
                </Link>
            </div>

            <div>
                <p className="text-sm text-gray-500 mb-4">All memberships include:</p>
                <ul className="space-y-3">
                    {features && features.map((feature) => (
                    <li key={feature.id} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="text-gray-300">{feature.feature_text}</span>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    </motion.div>
  );
};

export default MembershipClient;