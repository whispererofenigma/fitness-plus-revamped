// src/components/admin/PersonalizationEditor.tsx
'use client';

import React, { useState, ChangeEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonalizationFeature } from '@/app/admin/page';
import { createClient } from '@/utils/supabase/client';
import { Upload, Save, X, LoaderCircle } from 'lucide-react';
import Image from 'next/image';

const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

const PersonalizationEditor = ({ initialFeatures, setFeatures }: { 
    initialFeatures: PersonalizationFeature[];
    setFeatures: React.Dispatch<React.SetStateAction<PersonalizationFeature[]>>;
}) => {
  const [editingFeature, setEditingFeature] = useState<PersonalizationFeature | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleEditClick = (feature: PersonalizationFeature) => {
    setEditingFeature({ ...feature }); // Create a copy to edit
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingFeature) {
      setEditingFeature({
        ...editingFeature,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !editingFeature) return;
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
        // 1. Get a presigned URL from our generic API route
        const presignedUrlResponse = await fetch('/api/r2-upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileType: file.type, folder: 'personalization' }),
        });

        if (!presignedUrlResponse.ok) throw new Error('Failed to get presigned URL.');
        const { url, key } = await presignedUrlResponse.json();

        // 2. Upload the file directly to R2 using the presigned URL
        await fetch(url, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type },
        });

        // 3. Update the state with the new image key
        setEditingFeature({ ...editingFeature, image_key: key });
    } catch (error) {
        console.error("Upload failed:", error);
        alert('Upload failed. Please try again.');
    } finally {
        setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!editingFeature) return;
    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('personalization_features')
        .update({
          title: editingFeature.title,
          description: editingFeature.description,
          image_key: editingFeature.image_key,
        })
        .eq('id', editingFeature.id)
        .select()
        .single();
      
      if (error) throw error;
      
      // Update the main features list in the parent AdminPage with the saved data
      setFeatures(prevFeatures => 
        prevFeatures.map(f => f.id === data.id ? data : f)
      );
      
      // Trigger revalidation for the homepage
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: 'personalization_features' }),
      });

      setEditingFeature(null); // Close the modal
      alert('Personalization section updated!');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Save failed:", error);
      alert('Failed to save changes: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {initialFeatures.map(feature => (
        <div key={feature.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50">
          <div>
            <p className="font-bold">{feature.title}</p>
            <p className="text-sm text-gray-400">{feature.description.substring(0, 40)}...</p>
          </div>
          <button
            onClick={() => handleEditClick(feature)}
            className="px-4 py-2 text-sm font-semibold rounded-lg shadow-neo-sm hover:shadow-neo-press"
          >
            Edit
          </button>
        </div>
      ))}

      <AnimatePresence>
        {editingFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg p-8 rounded-3xl bg-[#181818] shadow-neo-lg"
            >
              <button onClick={() => setEditingFeature(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                <X />
              </button>
              <h4 className="text-xl font-bold mb-6">Edit: <span className="text-accent">{editingFeature.feature_id}</span></h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                  <input type="text" name="title" value={editingFeature.title} onChange={handleInputChange} className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700 focus:border-accent focus:ring-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                  <textarea name="description" value={editingFeature.description} onChange={handleInputChange} rows={3} className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700 focus:border-accent focus:ring-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Image</label>
                  <div className="flex items-center gap-4">
                    {editingFeature.image_key ? (
                      <Image src={`${R2_PUBLIC_URL}${editingFeature.image_key}`} alt="Current image" width={64} height={64} className="rounded-lg object-cover" />
                    ) : (
                      <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center text-xs text-gray-500">No Image</div>
                    )}
                    <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg shadow-neo-sm hover:shadow-neo-press disabled:opacity-50 transition-opacity">
                      {uploading ? <LoaderCircle className="animate-spin"/> : <Upload size={16}/>}
                      {uploading ? 'Uploading...' : 'Change Image'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-4 border-t border-gray-700 pt-6">
                <button onClick={() => setEditingFeature(null)} className="px-4 py-2 text-sm font-semibold rounded-lg shadow-neo-sm hover:shadow-neo-press">Cancel</button>
                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-lg bg-accent text-black disabled:opacity-50 transition-opacity">
                  {isSaving ? <LoaderCircle className="animate-spin"/> : <Save size={16}/>}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonalizationEditor;