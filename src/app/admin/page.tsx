// src/app/admin/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { createClient } from '@/utils/supabase/client'; 
import { Database } from '@/lib/supabase';
import PersonalizationEditor from '@/components/admin/PersonalizationEditor';
import MembershipEditor from '@/components/admin/MembershipEditor';
import PassesEditor, { PassWithFeatures } from '@/components/admin/PassesEditor'; // Import the new editor and its specific type
import { LoaderCircle } from 'lucide-react';

// Define the types for all our data structures
export type PersonalizationFeature = Database['public']['Tables']['personalization_features']['Row'];
export type MembershipPlan = Database['public']['Tables']['membership_plans']['Row'];
export type MembershipFeature = Database['public']['Tables']['membership_features']['Row'];
// We use the PassWithFeatures type exported from the PassesEditor component

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <LoaderCircle className="animate-spin text-accent" size={48} />
  </div>
);

const AdminPage = () => {
  // State for personalization section data
  const [pFeatures, setPFeatures] = useState<PersonalizationFeature[]>([]);
  
  // State for membership section data
  const [mPlans, setMPlans] = useState<MembershipPlan[]>([]);
  const [mFeatures, setMFeatures] = useState<MembershipFeature[]>([]);

  // NEW: State for passes section data
  const [passes, setPasses] = useState<PassWithFeatures[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('personalization');
  
  const supabase = createClient();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch data for all sections in parallel for efficiency
        const [
          personalizationData, 
          membershipPlansData, 
          membershipFeaturesData,
          passesData,
          passFeaturesData
        ] = await Promise.all([
          supabase.from('personalization_features').select('*').order('created_at', { ascending: true }),
          supabase.from('membership_plans').select('*').order('sort_order', { ascending: true }),
          supabase.from('membership_features').select('*').order('sort_order', { ascending: true }),
          supabase.from('access_passes').select('*').order('sort_order', { ascending: true }),
          supabase.from('pass_features').select('*').order('sort_order', { ascending: true })
        ]);

        if (personalizationData.error) throw personalizationData.error;
        setPFeatures(personalizationData.data || []);

        if (membershipPlansData.error) throw membershipPlansData.error;
        setMPlans(membershipPlansData.data || []);

        if (membershipFeaturesData.error) throw membershipFeaturesData.error;
        setMFeatures(membershipFeaturesData.data || []);

        if (passesData.error) throw passesData.error;
        if (passFeaturesData.error) throw passFeaturesData.error;
        
        // Combine the passes data with their respective features
        const combinedPasses = (passesData.data || []).map(pass => ({
            ...pass,
            features: (passFeaturesData.data || []).filter(f => f.pass_id === pass.pass_id)
        }));
        setPasses(combinedPasses);

      } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred while fetching data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [supabase]);

  return (
    <main className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-center mb-4">
          Admin <span className="text-accent">Dashboard</span>
        </h1>
        <p className="text-center text-gray-400 mb-16">
          Manage your website content from one central location.
        </p>

        <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-[#181818] shadow-neo-lg">
          <h2 className="text-2xl font-bold mb-6 text-accent">Homepage Sections</h2>
          
          {/* Tabbed Navigation */}
          <div className="flex border-b border-gray-700 mb-6">
            <button 
              onClick={() => setActiveTab('personalization')}
              className={`px-4 py-2 font-semibold transition-colors duration-200 ${activeTab === 'personalization' ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-white'}`}
            >
              Personalization
            </button>
            <button 
              onClick={() => setActiveTab('membership')}
              className={`px-4 py-2 font-semibold transition-colors duration-200 ${activeTab === 'membership' ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-white'}`}
            >
              Membership
            </button>
            <button 
              onClick={() => setActiveTab('passes')}
              className={`px-4 py-2 font-semibold transition-colors duration-200 ${activeTab === 'passes' ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-white'}`} // CORRECTED className logic
            >
              Passes {/* CORRECTED Label */}
            </button>
          </div>
          
          {loading && <LoadingSpinner />}
          {error && <p className="text-red-500 text-center">Error: {error}</p>}
          
          {!loading && !error && (
            <Suspense fallback={<LoadingSpinner />}>
              {/* Conditional Rendering based on active tab */}
              {activeTab === 'personalization' && (
                <PersonalizationEditor initialFeatures={pFeatures} setFeatures={setPFeatures} />
              )}
              {activeTab === 'membership' && (
                <MembershipEditor 
                  initialPlans={mPlans} 
                  initialFeatures={mFeatures}
                  setPlans={setMPlans}
                  setFeatures={setMFeatures}
                />
              )}
              {activeTab === 'passes' && (
                <PassesEditor initialPasses={passes} setPasses={setPasses} />
              )}
            </Suspense>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminPage;