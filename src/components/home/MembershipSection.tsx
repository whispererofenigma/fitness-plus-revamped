'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Check } from 'lucide-react';

// Expanded data structure to include all four plans
const plans = [
  {
    id: 'monthly',
    title: 'Monthly',
    price: '₹1199',
    duration: '/ month',
    href: 'https://wa.me/918918829471?text=membership_monthly',
    tag: null,
  },
  {
    id: 'quarterly',
    title: '3 Months',
    price: '₹3099',
    originalPrice: '₹3597',
    duration: '/ quarter',
    href: 'https://wa.me/918918829471?text=membership_quarterly',
    tag: 'Save 14%',
  },
  {
    id: 'semi_annually',
    title: '6 Months',
    price: '₹5999',
    originalPrice: '₹7194',
    duration: '/ half year',
    href: 'https://wa.me/918918829471?text=membership_semi_annual',
    tag: 'Save 17%',
  },
  {
    id: 'annually',
    title: '12 Months',
    price: '₹10999',
    originalPrice: '₹14388',
    duration: '/ year',
    href: 'https://wa.me/918918829471?text=membership_annual',
    tag: 'Save 23%',
  }
];

const allFeatures = [
    'Certified Trainers On-Floor',
    'Customized Nutrition Diet Plans',
    'Full Steam Bath Access',
    'All Smart Equipment Access',
    'Kids Fitness Program (Age 6-15)',
    'Senior Citizen Special Training',
    'Training for Differently-Abled',
    '2 Guest Passes per Month'
];

const MembershipSection = () => {
  const [activePlanId, setActivePlanId] = useState(plans[3].id); // Default to annual plan
  const activePlan = plans.find(p => p.id === activePlanId);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
            Become an <span className="text-accent">Elite Member</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            Commit to your transformation. Our memberships unlock the full Fitness Plus ecosystem, offering unparalleled access and value.
          </p>
        </motion.div>

        {/* The Single Interactive Card */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="max-w-4xl mx-auto flex flex-col p-8 rounded-3xl bg-[#181818] shadow-neo-lg"
        >
            {/* The Plan Selector */}
            <div className="relative flex flex-wrap justify-center items-center gap-2 mb-8 p-2 rounded-full shadow-neo-inset">
                {plans.map((plan) => (
                    <button
                        key={plan.id}
                        onClick={() => setActivePlanId(plan.id)}
                        className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                            activePlanId === plan.id ? 'text-white' : 'text-gray-400'
                        }`}
                    >
                        {activePlanId === plan.id && (
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
                {/* Left side: Pricing and CTA */}
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
                                {activePlan?.originalPrice && (
                                    <span className="text-3xl text-gray-500 line-through">{activePlan.originalPrice}</span>
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

                {/* Right side: Features List */}
                <div>
                    <p className="text-sm text-gray-500 mb-4">All memberships include:</p>
                    <ul className="space-y-3">
                        {allFeatures.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-accent flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipSection;

