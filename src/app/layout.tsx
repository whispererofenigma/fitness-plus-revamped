import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import './globals.css';

// Initialize the Inter font with the 'latin' subset
const inter = Inter({ subsets: ['latin'] });

// Define comprehensive metadata for SEO and social sharing
export const metadata: Metadata = {
  title: {
    template: '%s | Fitness Plus',
    default: 'Fitness Plus - The Future of Fitness',
  },
  description: 'Experience the pinnacle of fitness with our intelligent systems and unparalleled environment.',
  openGraph: {
    title: 'Fitness Plus - The Future of Fitness',
    description: 'Evolve your potential with AI-driven workouts and state-of-the-art smart equipment.',
    url: 'https://your-domain.com', // Replace with your actual domain
    siteName: 'Fitness Plus',
    images: [
      {
        url: '/og-image.png', // Create and place an Open Graph image in the /public directory
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fitness Plus - The Future of Fitness',
    description: 'Evolve your potential with AI-driven workouts and state-of-the-art smart equipment.',
    images: ['/og-image.png'], // Ensure you have this image in /public
  },
  icons: {
    icon: '/favicon.ico', // Standard favicon
    apple: '/apple-touch-icon.png', // Apple touch icon
  },
};

/**
 * RootLayout is the main layout component that wraps every page.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - Page components that will be rendered within the layout.
 * @returns {JSX.Element} The root HTML structure of the application.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}