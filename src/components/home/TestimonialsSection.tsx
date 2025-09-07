'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote } from 'lucide-react';

// Define a type for a single testimonial object for type safety
type Testimonial = {
  quote: string;
  author: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "Joining this gym was the best decision I've made! The personalized training and supportive environment helped me achieve my fitness goals faster than I ever thought possible.",
    author: "Sarah M.",
    image: "https://placehold.co/80x80/181818/a2ff00?text=SM",
  },
  {
    quote: "The group classes are amazing! I've never felt so motivated and energized. The trainers are top-notch, and the community is incredibly welcoming.",
    author: "John D.",
    image: "https://placehold.co/80x80/181818/ffffff?text=JD",
  },
  {
    quote: "The elite membership is worth every penny. The nutritional guidance combined with the personal training has changed my life.",
    author: "Emily R.",
    image: "https://placehold.co/80x80/181818/a2ff00?text=ER",
  },
  {
    quote: "I was intimidated by gyms, but Fitness Plus felt different. The trainers are patient and the tech makes tracking progress so easy.",
    author: "Michael B.",
    image: "https://placehold.co/80x80/181818/ffffff?text=MB",
  },
  {
    quote: "The functional zone is my favorite part. It's not just about lifting heavy; it's about moving better, and I feel the difference every day.",
    author: "Jessica L.",
    image: "https://placehold.co/80x80/181818/a2ff00?text=JL",
  },
];

// Reusable component for a single testimonial card, now using the Testimonial type
const TestimonialCard = ({ quote, author, image }: Testimonial) => (
  <div className="w-full p-6 rounded-3xl bg-[#181818] shadow-neo-lg break-inside-avoid">
    <div className="flex items-start gap-4">
      <Quote className="h-8 w-8 text-accent/40" />
      {/* FIX: Escaped the quote characters */}
      <p className="text-gray-300 italic">&quot;{quote}&quot;</p>
    </div>
    <div className="flex items-center gap-4 mt-4 pl-12">
      <Image src="/user.png" alt={author} width={48} height={48} className="rounded-full" />
      <p className="font-bold text-white">- {author}</p>
    </div>
  </div>
);

// Reusable component for a scrolling column, now using the Testimonial type
const TestimonialColumn = ({ testimonials, direction = 'up' }: {
  testimonials: Testimonial[],
  direction?: 'up' | 'down'
}) => (
  <div className="flex flex-col gap-6">
    <motion.div
      className="flex flex-col gap-6"
      style={{ animation: `marquee-${direction} 60s linear infinite` }}
    >
      {/* Types for 't' and 'i' are now correctly inferred */}
      {testimonials.map((t, i) => <TestimonialCard key={i} {...t} />)}
      {testimonials.map((t, i) => <TestimonialCard key={`duplicate-${i}`} {...t} />)}
    </motion.div>
  </div>
);


const TestimonialsSection = () => {
  // We'll split the testimonials for the two columns
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 5);

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
            Voices of Our <span className="text-accent">Community</span>
          </h2>
          {/* FIX: Escaped the apostrophe */}
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            Don&apos;t just take our word for it. Hear from the members who are transforming their lives with us every day.
          </p>
        </motion.div>

        {/* The Wall of Fame */}
        <div className="relative h-[80vh] [mask-image:_linear-gradient(to_bottom,transparent_0,_black_15%,_black_85%,transparent_100%)]">
            <div className="absolute inset-0 flex justify-center gap-6">
                {/* Desktop: Two columns */}
                <div className="hidden md:flex md:w-1/3">
                    <TestimonialColumn testimonials={firstColumn} direction="up" />
                </div>
                <div className="hidden md:flex md:w-1/3 mt-[-10vh]">
                    <TestimonialColumn testimonials={secondColumn} direction="down" />
                </div>
                {/* Mobile: One column */}
                <div className="flex md:hidden w-full max-w-sm">
                    <TestimonialColumn testimonials={testimonials} direction="up" />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

