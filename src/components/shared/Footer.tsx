import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Instagram } from 'lucide-react';

// A reusable sub-component for the social media links to keep the code clean
const SocialLink = ({ href, icon: Icon }: { href: string; icon: React.ElementType }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="h-12 w-12 flex items-center justify-center rounded-full text-gray-400 transition-all duration-300 shadow-neo-sm hover:text-accent hover:shadow-neo-press active:scale-95"
  >
    <Icon size={20} />
  </Link>
);

const Footer: React.FC = () => {
  return (
    <footer className="pt-24 pb-8 shadow-neo-top-inset">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand and Motto */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="text-2xl font-bold tracking-widest uppercase">
              Fitness <span className="text-accent">Plus</span>
            </Link>
            <p className="text-gray-500 mt-2 text-sm max-w-sm">
              The future of human performance, blending technology and fitness to unlock your true potential.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider mb-4">Explore</h3>
            <div className="flex flex-col gap-3 text-gray-400">
              <Link href="#" className="hover:text-accent transition-colors duration-300">Classes</Link>
              <Link href="#" className="hover:text-accent transition-colors duration-300">Trainers</Link>
              <Link href="#" className="hover:text-accent transition-colors duration-300">Community</Link>
              <Link href="#" className="hover:text-accent transition-colors duration-300">Pricing</Link>
            </div>
          </div>

          {/* Column 3: Social Media */}
          <div>
             <h3 className="font-bold text-white uppercase tracking-wider mb-4">Follow Us</h3>
             <div className="flex justify-center md:justify-start gap-4">
                <SocialLink href="https://github.com" icon={Github} />
                <SocialLink href="https://twitter.com" icon={Twitter} />
                <SocialLink href="https://instagram.com" icon={Instagram} />
             </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-white/5 mt-16 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Fitness Plus. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;