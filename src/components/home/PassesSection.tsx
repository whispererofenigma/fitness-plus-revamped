'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Check } from 'lucide-react';

// Enhanced data structure for the passes
const passes = [
  {
    title: 'Daily Pass',
    price: '₹199',
    duration: '/ Day',
    href: 'https://wa.me/918918829471?text=plan_daily',
    features: [
      'Full Gym Floor Access',
      'Cardio Zone Entry',
      'Locker Usage',
    ],
    featured: false,
  },
  {
    title: 'Weekly Pass',
    price: '₹699',
    duration: '/ Week',
    href: 'https://wa.me/918918829471?text=plan_weekly',
    features: [
      'Everything in Daily Pass',
      'Access to Functional Zone',
      '1 Group Class Entry',
      'Priority Support',
    ],
    featured: true,
  },
  {
    title: 'Fortnight Pass',
    price: '₹799',
    duration: '/ 15 Days',
    href: 'https://wa.me/918918829471?text=plan_fortnight',
    features: [
      'Everything in Weekly Pass',
      'Unlimited Group Classes',
      '1 Free Supplement Shake',
    ],
    featured: false,
  },
];

const PassesSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

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
            Flexible <span className="text-accent">Access Passes</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            Not ready to commit? No problem. Our short-term passes give you the freedom to experience Fitness Plus on your terms. No admission fees, just pure performance.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
        >
          {passes.map((pass, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative flex flex-col p-8 rounded-3xl bg-[#181818] shadow-neo-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-neo-xl ${
                pass.featured ? 'border-2 border-accent shadow-accent/20' : ''
              }`}
            >
              {pass.featured && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-black text-sm font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-white">{pass.title}</h3>
                <div className="mt-4">
                  <span className="text-5xl font-extrabold text-white">{pass.price}</span>
                  <span className="text-gray-400">{pass.duration}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {pass.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-accent" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  href={pass.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-shine w-full inline-block text-center px-6 py-4 font-bold uppercase rounded-xl transition-all duration-300 ${
                    pass.featured
                      ? 'bg-accent text-black shadow-lg shadow-accent/20'
                      : 'bg-gray-700/50 text-white shadow-neo-sm hover:shadow-neo-press'
                  }`}
                >
                  Get Your Pass
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PassesSection;
