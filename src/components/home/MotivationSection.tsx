'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

// Words for the kinetic tickers
const wordsTop = ["COMMIT", "FOCUS", "GRIND", "SWEAT", "RESULTS"];
const wordsMiddle = ["ENERGY", "POWER", "DRIVE", "STRENGTH", "MOMENTUM"];
const wordsBottom = ["REPEAT", "CONQUER", "EVOLVE", "ACHIEVE", "DOMINATE"];

// Reusable Marquee component
const Marquee = ({ words, direction = 'left', className = '' }: { words: string[], direction?: 'left' | 'right', className?: string }) => (
  <div className={`w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear_gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] ${className}`}>
    {/* The conflicting inline style has been removed from this ul element */}
    <ul 
        className={`flex-shrink-0 min-w-full flex items-center justify-center md:justify-start [&_li]:mx-4 animate-${direction === 'left' ? 'marquee-left' : 'marquee-right'}`}
    >
      {words.map(word => <li key={word}>{word}</li>)}
      {words.map(word => <li key={`${word}-2`}>{word}</li>)} {/* Render twice for seamless loop */}
    </ul>
  </div>
);

const MotivationSection = () => {
  const headline = "Excuses Don't Build Empires";
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 15, stiffness: 200 } },
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="py-24"
    >
      <div className="container mx-auto px-4">
        {/* The whileHover and transition props have been removed from this div */}
        <motion.div 
            className="relative flex flex-col items-center justify-center h-[70vh] p-8 overflow-hidden rounded-3xl bg-[#181818] shadow-neo-lg"
        >
          {/* Kinetic Tickers */}
          <div className="absolute inset-0 z-0 flex flex-col justify-between h-full py-8 opacity-20">
            <div className="font-black text-4xl text-gray-700">
                <Marquee words={wordsTop} direction="right" />
            </div>
            <div className="font-black text-6xl">
                <Marquee words={wordsMiddle} direction="left" className="text-accent" />
            </div>
            <div className="font-black text-4xl text-gray-700">
                <Marquee words={wordsBottom} direction="right" />
            </div>
          </div>
          
          {/* Central Content */}
          <div className="relative z-10 text-center">
            <motion.h2
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
            >
              {headline.split('').map((char, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.2, ease: 'easeOut' }}
            >
                <Link
                    href="/join"
                    className="btn-shine group mt-8 relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold uppercase rounded-xl transition-all duration-300 bg-accent text-black shadow-lg shadow-accent/20"
                >
                    Join The Movement
                </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MotivationSection;

