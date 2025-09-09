// src/components/home/PersonalizationClient.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, HeartPulse, Zap, GitCommitHorizontal} from 'lucide-react';
import Image from 'next/image';
import { Database } from '@/lib/supabase';

// Define the type for the props we receive from the Server Component
type Feature = Database['public']['Tables']['personalization_features']['Row'];

type PersonalizationClientProps = {
  features: Feature[];
}

// A mapping from the icon name string in the database to the actual Lucide icon component
const iconMap: { [key: string]: React.ElementType } = {
  Dumbbell,
  HeartPulse,
  Zap,
  GitCommitHorizontal,
};

const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

const PersonalizationClient = ({ features }: PersonalizationClientProps) => {
  const [activeFeatureId, setActiveFeatureId] = useState(features[0]?.feature_id || null);
  const activeFeature = features.find(f => f.feature_id === activeFeatureId);

  if (!features || features.length === 0) {
    return <div className="text-center text-gray-500">Loading features...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
      {/* Control Panel: Horizontal on mobile, Vertical on desktop */}
      <div className="w-full lg:w-1/4">
        <div className="flex flex-row justify-center lg:flex-col gap-3">
          {features.map((feature) => {
            const IconComponent = feature.icon_name ? iconMap[feature.icon_name] : Dumbbell;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveFeatureId(feature.feature_id)}
                className={`flex items-center justify-center lg:justify-start gap-4 w-full p-4 rounded-xl text-left transition-all duration-300 ${
                  activeFeatureId === feature.feature_id
                    ? 'shadow-neo-press bg-accent/10'
                    : 'shadow-neo-sm hover:shadow-neo-press'
                }`}
              >
                <IconComponent className={`transition-colors duration-300 ${activeFeatureId === feature.feature_id ? 'text-accent' : 'text-gray-400'}`} />
                <span className={`hidden sm:inline font-bold transition-colors duration-300 ${activeFeatureId === feature.feature_id ? 'text-white' : 'text-gray-300'}`}>
                  {feature.title}
                </span>
              </button>
            )
          })}
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
                                src={activeFeature.image_key ? `${R2_PUBLIC_URL}${activeFeature.image_key}` : "/Strength.jpg"}
                                alt={activeFeature.title}
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
  );
};

export default PersonalizationClient;