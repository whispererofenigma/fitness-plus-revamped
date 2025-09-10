// src/components/home/PersonalizationSection.tsx

import React from 'react';
import { fetchData } from '@/lib/data-fetcher';
import { Database } from '@/lib/supabase';
import PersonalizationClient from './PersonalizationClient'; // The new interactive component

// Define the type for our data, referencing our central types file
type Feature = Database['public']['Tables']['personalization_features']['Row'];

const PersonalizationSection = async () => {
  // 1. Fetch the data on the server at build time or during revalidation.
  // We add a cache tag to this specific fetch.
  const features = await fetchData({ 
    table: 'personalization_features', 
    order: 'created_at',
    tags: ['personalization_features']
  }) as Feature[];

  // 2. Render the outer, non-interactive shell of the section.
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">Your Goal, <span className="text-accent">Your Program</span></h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                Fitness isn&apos;t one-size-fits-all. We craft your journey around your ambitions, ensuring every workout is a step toward your personal peak.
            </p>
        </div>
        
        {/* 3. Pass the fetched data down to the Client Component for interactive display. */}
        <PersonalizationClient features={features} />
        
      </div>
    </section>
  );
};

export default PersonalizationSection;