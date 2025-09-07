'use client'; // This component is interactive and uses client-side state.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, HeartPulse, Zap, GitCommitHorizontal } from 'lucide-react';
import Image from 'next/image';

// Define the structure for each training feature
const trainingFeatures = [
  {
    id: 'strength',
    title: 'Strength',
    icon: Dumbbell,
    description: "Build raw power and sculpt your physique with our AI-optimized strength programs that intelligently adapt to your performance.",
    imageUrl: "/Strength.jpg",
    alt: "Abstract visual representing strength training",
  },
  {
    id: 'cardio',
    title: 'Cardio',
    icon: HeartPulse,
    description: "Elevate your endurance with dynamic cardio routines that adapt to your heart rate zones in real-time for maximum efficiency.",
    imageUrl: "/Cardio.jpg",
    alt: "Abstract visual representing cardio fitness",
  },
  {
    id: 'functional',
    title: 'Functional',
    icon: Zap,
    description: "Improve mobility, balance, and coordination with workouts that prepare your body for real-world challenges and movements.",
    imageUrl: "/Functional.jpg",
    alt: "Abstract visual representing functional movement",
  },
  {
    id: 'recovery',
    title: 'Recovery',
    icon: GitCommitHorizontal,
    description: "Accelerate recovery and enhance flexibility with guided sessions, ensuring you're always ready for your next challenge.",
    imageUrl: "/Yoga.jpg",
    alt: "Abstract visual representing recovery and flexibility",
  },
];

const PersonalizationSection = () => {
  const [activeFeatureId, setActiveFeatureId] = useState(trainingFeatures[0].id);
  const activeFeature = trainingFeatures.find(f => f.id === activeFeatureId);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="py-24"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">Your Goal, <span className="text-accent">Your Program</span></h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                Fitness isn&apos;t one-size-fits-all. We craft your journey around your ambitions, ensuring every workout is a step toward your personal peak.
            </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
          {/* Control Panel: Horizontal on mobile, Vertical on desktop */}
          <div className="w-full lg:w-1/4">
            <div className="flex flex-row justify-center lg:flex-col gap-3">
              {trainingFeatures.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeatureId(feature.id)}
                  className={`flex items-center justify-center lg:justify-start gap-4 w-full p-4 rounded-xl text-left transition-all duration-300 ${
                    activeFeatureId === feature.id
                      ? 'shadow-neo bg-[#a2ff00]'
                      : 'shadow-neo-sm hover:shadow-neo-press'
                  }`}
                >
                  <feature.icon className={`transition-colors duration-300 ${activeFeatureId === feature.id ? 'text-black' : 'text-gray-400'}`} />
                  <span className={`hidden sm:inline font-bold transition-colors duration-300 ${activeFeatureId === feature.id ? 'text-white' : 'text-gray-300'}`}>
                    {feature.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Display Card */}
          <div className="w-full lg:w-3/4 flex-1">
            <div className="relative w-full md:h-[60vh] aspect-[4/3] min-h-[450px]">
                <AnimatePresence mode="wait">
                    {activeFeature && (
                        <motion.div
                            key={activeFeature.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <div className="relative w-full h-full rounded-2xl shadow-neo-lg overflow-hidden">
                                <Image
                                    src={activeFeature.imageUrl}
                                    alt={activeFeature.alt}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">{activeFeature.title} Training</h3>
                                    <p className="mt-2 text-gray-300 max-w-lg">{activeFeature.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PersonalizationSection;