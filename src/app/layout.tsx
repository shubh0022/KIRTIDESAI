import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import RecruiterDrawer from '@/components/layout/RecruiterDrawer';
import EditorialPreloader from '@/components/ui/EditorialPreloader';
import SearchOverlay from '@/components/ui/SearchOverlay';
import WishlistDrawer from '@/components/ui/WishlistDrawer';
import BagDrawer from '@/components/ui/BagDrawer';
import AccountDrawer from '@/components/ui/AccountDrawer';
import StudioDrawer from '@/components/ui/StudioDrawer';
import { AtelierProvider } from '@/context/AtelierContext';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kirtidesai.com'),
  title: 'Kirti Desai · Fashion Design Atelier · The Making of Identity',
  description:
    'Official professional portfolio of Kirti Desai. Bachelor of Fashion Design student at Parul Institute of Design, Parul University. Exploring garment construction, corsetry, sustainable Khadi, and living craft traditions.',
  keywords: [
    'Kirti Desai',
    'Fashion Design Portfolio',
    'Pattern Making',
    'Garment Construction',
    'Victorian Corsetry',
    'Khadi Sustainable Athleisure',
    'Craft Study',
    'Lac Craft',
    'Pipli Work',
    'Bagh Print',
    'Parul Institute of Design',
  ],
  authors: [{ name: 'Kirti Desai' }],
  openGraph: {
    title: 'Kirti Desai · Fashion Design Portfolio',
    description: 'The Making of Identity · Design begins with looking closely.',
    type: 'website',
    images: [{ url: '/images/hero/kirti-hero-chandelier.jpg' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#F4F0E8] text-[#171717] antialiased selection:bg-[#A85E43] selection:text-[#FAF7F2]">
        <AtelierProvider>
          <EditorialPreloader />
          <CustomCursor />
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <RecruiterDrawer />
          <SearchOverlay />
          <WishlistDrawer />
          <BagDrawer />
          <AccountDrawer />
          <StudioDrawer />
        </AtelierProvider>
      </body>
    </html>
  );
}
