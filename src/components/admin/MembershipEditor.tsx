// src/components/admin/MembershipEditor.tsx
'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Save, LoaderCircle, Trash2, Plus } from 'lucide-react';

// Define the types for our data structures
type Plan = Database['public']['Tables']['membership_plans']['Row'];
type Feature = Database['public']['Tables']['membership_features']['Row'];

// Define the correct props that AdminPage will pass down
type MembershipEditorProps = {
    initialPlans: Plan[];
    initialFeatures: Feature[];
    setPlans: React.Dispatch<React.SetStateAction<Plan[]>>;
    setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
};

// CORRECTED: We will use the props directly ('initialPlans', 'initialFeatures') instead of aliasing them.
const MembershipEditor = ({
    initialPlans,
    initialFeatures,
    setPlans,
    setFeatures
}: MembershipEditorProps) => {
    const [isSaving, setIsSaving] = useState(false);
    const supabase = createClient();

    // Handle input changes for the membership plans
    const handlePlanChange = (index: number, field: keyof Plan, value: string | null) => {
        const newPlans = [...initialPlans];
        // A type assertion to handle the dynamic property access safely
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (newPlans[index] as any)[field] = value;
        setPlans(newPlans);
    };

    // Handle input changes for the feature list
    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...initialFeatures];
        newFeatures[index].feature_text = value;
        setFeatures(newFeatures);
    };

    // Add a new, temporary feature to the list
    const addFeature = () => {
        const newId = `new-${Date.now()}`;
        setFeatures([...initialFeatures, { id: newId, feature_text: 'New Feature', sort_order: initialFeatures.length + 1 }]);
    };

    // Remove a feature from the list
    const deleteFeature = (id: string) => {
        setFeatures(initialFeatures.filter(f => f.id !== id));
    };

    // Handle the save logic
    const handleSave = async () => {
        setIsSaving(true);
        try {
            const { error: planError } = await supabase.from('membership_plans').upsert(initialPlans);
            if (planError) throw planError;

            const featureIdsToKeep = initialFeatures.map(f => f.id);
            const originalFeatures = await supabase.from('membership_features').select('id');
            if (originalFeatures.error) throw originalFeatures.error;
            const featuresToDelete = originalFeatures.data.filter(f => !featureIdsToKeep.includes(f.id));

            if (featuresToDelete.length > 0) {
                const { error: deleteError } = await supabase.from('membership_features').delete().in('id', featuresToDelete.map(f => f.id));
                if (deleteError) throw deleteError;
            }

            const upsertData = initialFeatures.map((f, i) => ({
                ...(f.id.startsWith('new-') ? {} : { id: f.id }),
                feature_text: f.feature_text,
                sort_order: i + 1,
            }));

            const { error: featureError } = await supabase.from('membership_features').upsert(upsertData);
            if (featureError) throw featureError;

            await Promise.all([
                fetch('/api/revalidate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tag: 'membership_plans', secret: process.env.NEXT_PUBLIC_REVALIDATE_TOKEN }),
                }),
                fetch('/api/revalidate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tag: 'membership_features', secret: process.env.NEXT_PUBLIC_REVALIDATE_TOKEN }),
                })
            ]);

            alert('Membership section updated successfully!');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Save failed:", error);
            alert('Failed to save changes: ' + error.message);
        } finally {
            setIsSaving(false);
        }

        // Inside your handleSave function in the admin editor...

        await fetch('/api/revalidate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tag: 'membership_plans' }),
        });

    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div>
                <h4 className="font-semibold mb-2 text-white">Membership Plans</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Always check if the array exists before mapping to prevent runtime errors */}
                    {initialPlans && initialPlans.map((plan, index) => (
                        <div key={plan.id} className="p-4 rounded-xl bg-gray-800/50 space-y-2">
                            <input type="text" value={plan.title} onChange={(e) => handlePlanChange(index, 'title', e.target.value)} className="w-full p-2 bg-gray-900 rounded-lg font-bold text-white" />
                            <input type="text" value={plan.price} onChange={(e) => handlePlanChange(index, 'price', e.target.value)} className="w-full p-2 bg-gray-900 rounded-lg" />
                            <input type="text" placeholder="Original Price (optional)" value={plan.original_price || ''} onChange={(e) => handlePlanChange(index, 'original_price', e.target.value)} className="w-full p-2 bg-gray-900 rounded-lg" />
                            <input type="text" placeholder="Tag (e.g., Save 15%)" value={plan.tag || ''} onChange={(e) => handlePlanChange(index, 'tag', e.target.value)} className="w-full p-2 bg-gray-900 rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-semibold mb-2 text-white">Membership Features</h4>
                <div className="space-y-2">
                    {initialFeatures && initialFeatures.map((feature, index) => (
                        <div key={feature.id} className="flex items-center gap-2">
                            <input type="text" value={feature.feature_text} onChange={(e) => handleFeatureChange(index, e.target.value)} className="flex-grow p-2 bg-gray-900 rounded-lg" />
                            <button onClick={() => deleteFeature(feature.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    <button onClick={addFeature} className="flex items-center gap-2 text-accent mt-2 text-sm font-semibold">
                        <Plus size={16} /> Add Feature
                    </button>
                </div>
            </div>

            <div className="flex justify-end border-t border-gray-700 pt-6 mt-6">
                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-lg bg-accent text-black disabled:opacity-50 transition-opacity">
                    {isSaving ? <LoaderCircle className="animate-spin" /> : <Save size={16} />}
                    {isSaving ? 'Saving...' : 'Save Membership Section'}
                </button>
            </div>
        </motion.div>
    );
};

export default MembershipEditor;