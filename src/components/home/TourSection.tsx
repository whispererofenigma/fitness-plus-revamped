'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const tourImages = [
  { src: '/Strength.jpg', alt: 'Athletes doing strength training with ropes', title: 'STRENGTH', description: 'Forge your power in our state-of-the-art strength zone.' },
  { src: '/Cardio.jpg', alt: 'Man running on a treadmill', title: 'ENDURANCE', description: 'Push your limits with our advanced cardio equipment.' },
  { src: '/Functional.jpg', alt: 'Man doing a functional stretch on the floor', title: 'MOBILITY', description: 'Improve your movement and prevent injuries.' },
  { src: '/Yoga.jpg', alt: 'Woman in a yoga pose with her dog', title: 'FOCUS', description: 'Find your center in our serene mind & body studio.' },
];

const TourSection = () => {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    let newIndex = activeIndex + newDirection;
    if (newIndex < 0) {
      newIndex = tourImages.length - 1;
    } else if (newIndex >= tourImages.length) {
      newIndex = 0;
    }
    setActiveIndex([newIndex, newDirection]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? -45 : 45,
    }),
  };

  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
            An Environment <span className="text-accent">Built for Results</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            This is more than a gym—it’s where your journey to a healthier, stronger you begins.
          </p>
        </motion.div>

        {/* The 3D Swipe Carousel */}
        <div className="relative h-[60vh] md:h-[70vh]" style={{ perspective: '1000px' }}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                rotateY: { type: 'spring', stiffness: 300, damping: 30 },
              }}
              className="absolute w-full h-full"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000) {
                  paginate(1);
                } else if (swipe > 10000) {
                  paginate(-1);
                }
              }}
            >
              <div className="relative w-full h-full rounded-3xl shadow-neo-lg overflow-hidden">
                <Image
                  src={tourImages[activeIndex].src}
                  alt={tourImages[activeIndex].alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute top-1/2 left-0 md:-left-8 -translate-y-1/2 z-20 h-14 w-14 flex items-center justify-center rounded-full bg-[#181818] shadow-neo-sm hover:shadow-neo-press active:scale-95 transition-all"
          >
            <ChevronLeft className="h-6 w-6 text-gray-400" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute top-1/2 right-0 md:-right-8 -translate-y-1/2 z-20 h-14 w-14 flex items-center justify-center rounded-full bg-[#181818] shadow-neo-sm hover:shadow-neo-press active:scale-95 transition-all"
          >
            <ChevronRight className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        {/* Synchronized Text Content */}
        <div className="mt-12 text-center h-24 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <h3 className="text-3xl font-bold text-accent">{tourImages[activeIndex].title}</h3>
              <p className="mt-2 text-gray-400">{tourImages[activeIndex].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TourSection;

