'use client'; // This component uses client-side hooks (useState, usePathname)

import React, { useState } from 'react';
import Link from 'next/link'; // Import the Link component
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion'; // Import the Variants type
import { Menu, X } from 'lucide-react';

// Define the structure for a navigation item
interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Classes', href: '/classes' },
  { name: 'Trainers', href: '/trainers' },
  { name: 'Community', href: '/community' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState('');
  const pathname = usePathname();

  const activePath = hoveredPath || pathname;

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#181818]/80 backdrop-blur-lg border-b border-white/5 shadow-neo-top-inset">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo - now using Link */}
          <Link href="/" className="text-2xl font-bold tracking-widest uppercase">
            Fitness <span className="text-accent">Plus</span>
          </Link>

          {/* Desktop Navigation - now using Link */}
          <nav
            className="hidden md:flex items-center gap-2 p-1 rounded-full shadow-neo-inset"
            onMouseLeave={() => setHoveredPath('')}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredPath(item.href)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  pathname === item.href ? 'text-white' : 'text-gray-400'
                }`}
              >
                {activePath === item.href && (
                  <motion.div
                    layoutId="pill"
                    className="absolute inset-0 bg-accent/10 rounded-full"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* CTA Button - now using Link */}
          <Link href="/join" className="hidden md:block px-5 py-2.5 text-sm font-bold uppercase rounded-xl transition-all duration-300 text-accent shadow-neo hover:shadow-neo-press active:scale-95">
            Join Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 active:shadow-neo-press shadow-neo-sm"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && <MobileMenu closeMenu={() => setIsMobileMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

// Sub-component for the animated mobile menu
const MobileMenu = ({ closeMenu }: { closeMenu: () => void }) => {

  // Explicitly type the variants object with the 'Variants' type
  const menuVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: 'easeIn'
      }
    }
  };
  
  // Explicitly type the variants object with the 'Variants' type
  const linkVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
  };

  return (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 bg-[#181818] p-4 flex flex-col"
    >
      <div className="flex justify-between items-center">
        <Link href="/" onClick={closeMenu} className="text-2xl font-bold tracking-widest uppercase">
          Fitness <span className="text-accent">Plus</span>
        </Link>
        <button 
          onClick={closeMenu}
          className="flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 active:shadow-neo-press shadow-neo-sm"
        >
          <X size={20} />
        </button>
      </div>
      <motion.nav className="flex flex-col items-center justify-center flex-1 gap-6">
        {navItems.map((item) => (
           <motion.div key={item.href} variants={linkVariants}>
              <Link 
                href={item.href} 
                onClick={closeMenu}
                className="text-3xl font-semibold text-gray-300 hover:text-accent transition-colors duration-300"
              >
                {item.name}
              </Link>
           </motion.div>
        ))}
        <motion.div variants={linkVariants}>
          <Link 
            href="/join"
            onClick={closeMenu}
            className="mt-6 px-8 py-4 text-lg font-bold uppercase rounded-xl transition-all duration-300 text-black bg-accent shadow-lg shadow-accent/20 active:scale-95"
          >
            Join Now
          </Link>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
};

export default Header;