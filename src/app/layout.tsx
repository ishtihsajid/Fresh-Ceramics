import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import FloatingNav from '@/components/layout/FloatingNav';

export const metadata: Metadata = {
  title: 'Fresh Ceramics | A Fresh Start to an Aesthetic Life',
  description:
    'When quality and sustainability meet, Fresh tiles become the natural choice. Explore 385 architectural floor and wall tiles, Double Charge series, Room Visualizer, and our story of responsible manufacturing in Bangladesh.',
  keywords: [
    'Fresh Ceramics',
    'Sustainable tiles Bangladesh',
    'Floor tiles',
    'Wall tiles',
    'Double Charge tiles',
    'Room visualizer',
    'Porcelain tiles',
    'Eco-friendly ceramics',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <CustomCursor />
          <FloatingNav />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
