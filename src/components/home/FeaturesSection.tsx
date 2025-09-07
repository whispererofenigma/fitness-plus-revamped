'use client';

import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Users, Dumbbell, UserCheck, FlaskConical } from 'lucide-react';

// Data for the feature cards
const features = [
  {
    icon: Users,
    title: "Inclusive Community",
    description: "A welcoming and empowering space for everyone, regardless of gender or fitness level.",
    className: "lg:col-span-2", // This card will be wider on large screens
  },
  {
    icon: Dumbbell,
    title: "Cutting-Edge Equipment",
    description: "Experience the latest in fitness technology with our state-of-the-art smart equipment.",
    className: "lg:col-span-1",
  },
  {
    icon: UserCheck,
    title: "Expert Trainers",
    description: "Receive expert, AI-assisted guidance tailored to your unique body and goals.",
    className: "lg:col-span-1",
  },
  {
    icon: FlaskConical,
    title: "Exclusive Supplements",
    description: "Fuel your progress with our premium, in-house supplements designed for peak performance.",
    className: "lg:col-span-2", // This card will be wider on large screens
  },
];

// Reusable Spotlight Card component
const SpotlightCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`group relative p-8 rounded-3xl bg-[#181818] shadow-neo-lg transition-all duration-300 hover:scale-[1.02] ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(162, 255, 0, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </motion.div>
  );
};

// Main Features Section component
const FeaturesSection = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">What Makes Us <span className="text-accent">Different?</span></h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            We&apos;re not just a gym; we&apos;re a complete performance ecosystem. We fuse state-of-the-art facilities with expert guidance to guarantee every workout is a step toward your absolute best.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className={feature.className}>
              <SpotlightCard>
                <div className="flex flex-col items-start h-full">
                  <div className="p-4 rounded-xl shadow-neo-inset mb-4">
                    <feature.icon className="text-accent h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mt-2">{feature.title}</h3>
                  <p className="text-gray-400 mt-1 flex-grow">{feature.description}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;
