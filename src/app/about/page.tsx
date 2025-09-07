'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Cpu, Target, HeartHandshake, ArrowRight } from 'lucide-react';

// CORRECTED: Updated team data to be accurate
const teamMembers = [
  {
    name: 'Shanu Roy',
    role: 'Head Trainer & Founder',
    image: 'https://placehold.co/400x400/181818/a2ff00?text=SR',
  },
  {
    name: 'Our Expert Team',
    role: 'Certified Coaches & Specialists',
    image: 'https://placehold.co/400x400/181818/ffffff?text=Team',
  },
  {
    name: 'Join The Crew',
    role: 'Become a Member',
    image: 'https://placehold.co/400x400/181818/ffffff?text=You',
    isCta: true,
  },
];

const AboutPage = () => {
  return (
    <>
      {/* 1. Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[70vh] flex items-center justify-center text-center"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/Strength.jpg"
            alt="Fitness Plus Gym interior"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white">
            More Than a Gym. <br /> A <span className="text-accent">Movement.</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300 md:text-lg">
            We are a community dedicated to pushing boundaries, leveraging technology, and unlocking human potential.
          </p>
        </div>
      </motion.section>

      {/* 2. Our Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-4">
                Our <span className="text-accent">Story</span>
              </h2>
              <p className="text-gray-400 mb-4">
                Founded in 2014 by Shanu Roy in the heart of Benachity, Durgapur, Fitness Plus was born from a simple idea: to create a fitness space that was truly for everyone. Located opposite the historic Bhiringi Kalibari, we saw a need for a gym that combined a welcoming, inclusive atmosphere with the best equipment and expert guidance.
              </p>
              <p className="text-gray-400">
                Over the years, we&apos;ve grown into a thriving community hub, but our core mission remains the same: to provide a one-stop destination where our members feel supported, motivated, and empowered to achieve their personal best.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-3xl shadow-neo-lg overflow-hidden"
            >
              <Image src="/Yoga.jpg" alt="A welcoming community at Fitness Plus" fill className="object-cover"/>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Our Philosophy Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter">
              The Fitness Plus <span className="text-accent">Philosophy</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Philosophy Cards */}
            <PhilosophyCard icon={HeartHandshake} title="Community First" description="We believe in the power of a supportive community to inspire and motivate." />
            <PhilosophyCard icon={Cpu} title="Tech-Driven" description="We utilize the latest smart equipment and technology to optimize your results." />
            <PhilosophyCard icon={Target} title="Personalized Approach" description="Your goals are unique. Our expert trainers craft plans that are tailored to you." />
            <PhilosophyCard icon={Users} title="Inclusivity" description="A welcoming, unisex environment where everyone feels they belong." />
          </div>
        </div>
      </section>
      
      {/* 4. Meet The Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter">
              Meet The <span className="text-accent">Experts</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-400">
              Our highly-rated trainers are the heart of Fitness Plus, dedicated to your growth and success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard key={index} {...member} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

// Sub-components for cleaner code
const PhilosophyCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="p-8 rounded-3xl bg-[#181818] shadow-neo-lg text-center"
    >
        <div className="inline-block p-4 rounded-xl shadow-neo-inset mb-4">
            <Icon className="text-accent h-10 w-10" />
        </div>
        <h3 className="text-xl font-bold text-white mt-2">{title}</h3>
        <p className="text-gray-400 mt-2">{description}</p>
    </motion.div>
);

const TeamCard = ({ name, role, image, isCta = false }: { name: string, role: string, image: string, isCta?: boolean }) => {
    if (isCta) {
        return (
            <Link href="/join">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center group"
                >
                    <div className="relative w-48 h-48 rounded-full shadow-neo-lg overflow-hidden mb-4 border-2 border-dashed border-gray-600 flex items-center justify-center group-hover:border-accent transition-colors duration-300">
                        <ArrowRight className="h-12 w-12 text-gray-600 group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{name}</h3>
                    <p className="text-accent">{role}</p>
                </motion.div>
            </Link>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
        >
            <div className="relative w-48 h-48 rounded-full shadow-neo-lg overflow-hidden mb-4">
                <Image src={image} alt={name} fill className="object-cover" />
            </div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-accent">{role}</p>
        </motion.div>
    );
};


export default AboutPage;

