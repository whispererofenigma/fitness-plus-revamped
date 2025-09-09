'use client'; // This component requires client-side hooks for animation.

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, animate, Variants } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';

// A custom animated counter component
const AnimatedCounter = ({ to }: { to: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 2,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [to, count]);

  return <motion.span>{rounded}</motion.span>;
};

const HeroSection = () => {
  const headline = "Evolve Your Potential";

  // Framer Motion variants for the staggered text animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 200 } },
    hover: {
      y: -5,
      transition: { type: 'spring', damping: 12, stiffness: 200 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#181818] p-4">
      {/* Animated Aurora Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            transform: ['translate(20%, -20%)', 'translate(-20%, 20%)', 'translate(20%, -20%)'],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl filter"
        ></motion.div>
        <motion.div
           animate={{
            transform: ['translate(-20%, 20%)', 'translate(20%, -20%)', 'translate(-20%, 20%)'],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-[#3b3bff]/15 blur-3xl filter"
        ></motion.div>
      </div>

      <div className="relative z-10 text-center">
        {/* Animated Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white"
        >
          {/* CORRECTED: We now split by words first, then map the letters within each word */}
          {headline.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-4">
              {word.split('').map((char, charIndex) => (
                <motion.span key={charIndex} variants={letterVariants} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="mt-6 max-w-xl mx-auto text-gray-400 md:text-lg"
        >
          A new era of fitness has arrived. Fuse your dedication with our intelligent systems to redefine your limits.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.7 }}
          className="mt-8 flex justify-center"
        >
          <Link
            href="/join"
            className="btn-shine group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold uppercase rounded-xl transition-all duration-300 bg-[#a2ff00] text-black shadow-lg shadow-accent/20 hover:scale-105 active:scale-95"
          >
            Start Evolving
            <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.9 }}
          className="mt-12 flex items-center justify-center gap-3 text-gray-400"
        >
          <Users size={20} className="text-accent"/>
          <p>
            Join <strong className="text-white"><AnimatedCounter to={12345} />+</strong> members on the journey.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;