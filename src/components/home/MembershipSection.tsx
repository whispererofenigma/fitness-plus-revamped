// src/components/home/MembershipSection.tsx

import React from 'react';
import { fetchData } from '@/lib/data-fetcher';
import { Database } from '@/lib/supabase';
import MembershipClient from './MembershipClient';

type Plan = Database['public']['Tables']['membership_plans']['Row'];
type Feature = Database['public']['Tables']['membership_features']['Row'];

const MembershipSection = async () => {
  // Add tags to our data fetching calls
  const [plans, features] = await Promise.all([
    fetchData({ 
      table: 'membership_plans', 
      order: 'sort_order', 
      tags: ['membership_plans'] // Tag for plans
    }) as Promise<Plan[]>,
    fetchData({ 
      table: 'membership_features', 
      order: 'sort_order',
      tags: ['membership_features'] // Tag for features
    }) as Promise<Feature[]>
  ]);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
            Become an <span className="text-accent">Elite Member</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            Commit to your transformation. Our memberships unlock the full Fitness Plus ecosystem, offering unparalleled access and value.
          </p>
        </div>
        <MembershipClient plans={plans} features={features} />
      </div>
    </section>
  );
};

export default MembershipSection;