'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { mockPosts } from '@/lib/mock-posts'; // We'll use mock data for now
import PostCard from '@/components/social/PostCard';

const SocialPage = () => {
  // TODO: Replace this with a real data fetch from Supabase
  const posts = mockPosts;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
            Community <span className="text-accent">Live Feed</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            See the energy, feel the motivation. This is what&apos;s happening at Fitness Plus right now, powered by our incredible members.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialPage;
