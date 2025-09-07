'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Facebook, Heart, MessageCircle, X } from 'lucide-react';
import { Post } from '@/lib/mock-posts'; // Import the type definition

// This is the public URL for your Cloudflare R2 bucket.
// We will append the media_key from our data to this base URL.
const R2_PUBLIC_URL = 'https://pub-your-bucket-id.r2.dev/';

const PostCard = ({ post }: { post: Post }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const platformIcon = post.platform === 'instagram' 
    ? <Instagram className="h-5 w-5" /> 
    : <Facebook className="h-5 w-5" />;

  const imageUrl = `${R2_PUBLIC_URL}${post.media_key}`;

  return (
    <>
      <motion.div 
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        className="group relative w-full rounded-3xl bg-[#181818] shadow-neo-lg break-inside-avoid overflow-hidden cursor-pointer"
        onClick={() => setIsLightboxOpen(true)}
      >
        <Image
          src={imageUrl}
          alt={post.caption.substring(0, 50)}
          width={500}
          height={500} // This will be adjusted by the masonry layout
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-1">
                    <Heart size={16} />
                    <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                    <MessageCircle size={16} />
                    <span>{post.comments}</span>
                </div>
            </div>
        </div>
        <div className="absolute top-4 right-4 text-white">
            {platformIcon}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div 
                layoutId={`postcard-${post.id}`}
                className="relative max-w-3xl max-h-[90vh]"
            >
              <Image
                src={imageUrl}
                alt={post.caption.substring(0, 50)}
                width={1000}
                height={1000}
                className="w-auto h-auto max-w-full max-h-[90vh] rounded-2xl"
              />
            </motion.div>
            <button className="absolute top-4 right-4 text-white">
                <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PostCard;
