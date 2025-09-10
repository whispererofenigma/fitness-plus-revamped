// src/components/home/PassesSection.tsx

import React from 'react';
import { fetchData } from '@/lib/data-fetcher';
import { Database } from '@/lib/supabase';
import PassesClient from './PassesClient'; // We will create this client component next

// Define the types for the data we will fetch
type Pass = Database['public']['Tables']['access_passes']['Row'];
type Feature = Database['public']['Tables']['pass_features']['Row'];

// Define a new type that combines a pass with its features
export type PassWithFeatures = Pass & {
  features: Feature[];
};

const PassesSection = async () => {
  // 1. Fetch both the passes and their features from Supabase in parallel
  const [passes, features] = await Promise.all([
    fetchData({ table: 'access_passes', order: 'sort_order', tags: ['access_passes'] }) as Promise<Pass[]>,
    fetchData({ table: 'pass_features', order: 'sort_order', tags: ['pass_features'] }) as Promise<Feature[]>
  ]);

  // 2. Combine the data: Group the features by their corresponding pass_id
  const passesWithFeatures: PassWithFeatures[] = passes.map(pass => ({
    ...pass,
    features: features.filter(feature => feature.pass_id === pass.pass_id)
  }));

  // 3. Render the outer, non-interactive shell of the section.
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
            Flexible <span className="text-accent">Access Passes</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            Not ready to commit? No problem. Our short-term passes give you the freedom to experience Fitness Plus on your terms. No admission fees, just pure performance.
          </p>
        </div>

        {/* 4. Pass the combined, structured data as a single prop to the Client Component. */}
        <PassesClient passes={passesWithFeatures} />
      </div>
    </section>
  );
};

export default PassesSection;