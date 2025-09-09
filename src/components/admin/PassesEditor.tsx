// src/components/admin/PassesEditor.tsx
'use client';

import React, { useState} from 'react';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, LoaderCircle, Trash2, Plus, X } from 'lucide-react';

// Define the types for our data structures
type Pass = Database['public']['Tables']['access_passes']['Row'];
type Feature = Database['public']['Tables']['pass_features']['Row'];
export type PassWithFeatures = Pass & { features: Feature[] };

type PassesEditorProps = {
  initialPasses: PassWithFeatures[];
  setPasses: React.Dispatch<React.SetStateAction<PassWithFeatures[]>>;
};

const PassesEditor = ({ initialPasses, setPasses }: PassesEditorProps) => {
  const [editingPass, setEditingPass] = useState<PassWithFeatures | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();

  const handleInputChange = (field: keyof Pass, value: string | boolean) => {
    if (editingPass) {
      setEditingPass({ ...editingPass, [field]: value });
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (editingPass) {
      const newFeatures = [...editingPass.features];
      newFeatures[index].feature_text = value;
      setEditingPass({ ...editingPass, features: newFeatures });
    }
  };

  const addFeature = () => {
    if (editingPass) {
      const newFeature: Feature = {
        id: `new-${Date.now()}`,
        pass_id: editingPass.pass_id,
        feature_text: 'New Feature',
        sort_order: editingPass.features.length + 1,
      };
      setEditingPass({ ...editingPass, features: [...editingPass.features, newFeature] });
    }
  };

  const deleteFeature = (id: string) => {
    if (editingPass) {
      const newFeatures = editingPass.features.filter(f => f.id !== id);
      setEditingPass({ ...editingPass, features: newFeatures });
    }
  };

  const handleSave = async () => {
    if (!editingPass) return;
    setIsSaving(true);
    try {
      const { features, ...passDetails } = editingPass;

      // 1. Update the main pass details
      const { error: passError } = await supabase
        .from('access_passes')
        .update(passDetails)
        .eq('id', passDetails.id);
      if (passError) throw passError;

      // 2. Delete all existing features for this pass to ensure a clean slate
      const { error: deleteError } = await supabase
        .from('pass_features')
        .delete()
        .eq('pass_id', editingPass.pass_id);
      if (deleteError) throw deleteError;

      // 3. Insert the new, updated list of features
      const featuresToInsert = features.map((feature, index) => ({
        pass_id: editingPass.pass_id,
        feature_text: feature.feature_text,
        sort_order: index + 1,
      }));
      const { error: insertError } = await supabase.from('pass_features').insert(featuresToInsert);
      if (insertError) throw insertError;

      // 4. Update the local state in the main AdminPage
      setPasses(prevPasses => 
        prevPasses.map(p => p.id === editingPass.id ? editingPass : p)
      );

      // 5. Trigger revalidation
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: 'access_passes' }),
      });

      alert('Access Pass updated successfully!');
      setEditingPass(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Save failed:", error);
      alert('Failed to save changes: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      {initialPasses.map(pass => (
        <div key={pass.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50">
          <div>
            <p className="font-bold">{pass.title}</p>
            <p className="text-sm text-gray-400">{pass.price}{pass.duration}</p>
          </div>
          <button
            onClick={() => setEditingPass({ ...pass })}
            className="px-4 py-2 text-sm font-semibold rounded-lg shadow-neo-sm hover:shadow-neo-press"
          >
            Edit
          </button>
        </div>
      ))}

      <AnimatePresence>
        {editingPass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-2xl p-8 rounded-3xl bg-[#181818] shadow-neo-lg"
            >
              <button onClick={() => setEditingPass(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                <X />
              </button>
              <h4 className="text-xl font-bold mb-4">Edit Pass: <span className="text-accent">{editingPass.title}</span></h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" value={editingPass.title} onChange={(e) => handleInputChange('title', e.target.value)} className="w-full p-2 bg-gray-900 rounded-lg font-bold" />
                <input type="text" value={editingPass.price} onChange={(e) => handleInputChange('price', e.target.value)} className="w-full p-2 bg-gray-900 rounded-lg" />
              </div>
              <div className="mt-4">
                  <h5 className="font-semibold mb-2 text-white">Features</h5>
                  <div className="space-y-2">
                    {editingPass.features.map((feature, index) => (
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

              <div className="mt-6 flex justify-end gap-4 border-t border-gray-700 pt-6">
                <button onClick={() => setEditingPass(null)} className="px-4 py-2 text-sm font-semibold rounded-lg shadow-neo-sm hover:shadow-neo-press">Cancel</button>
                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-lg bg-accent text-black disabled:opacity-50">
                  {isSaving ? <LoaderCircle className="animate-spin"/> : <Save size={16}/>}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PassesEditor;