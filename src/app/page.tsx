'use client';

import React from 'react';
import Hero from '@/components/home/Hero';
import IntroStatement from '@/components/home/IntroStatement';
import SelectedWork from '@/components/home/SelectedWork';
import ProcessStrip from '@/components/home/ProcessStrip';
import StudioTable from '@/components/home/StudioTable';
import MaterialToMemory from '@/components/home/MaterialToMemory';
import CraftHighlight from '@/components/home/CraftHighlight';
import ExperienceTimeline from '@/components/home/ExperienceTimeline';
import ContactCTA from '@/components/home/ContactCTA';

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Cover & Asymmetric Hero */}
      <Hero />

      {/* About The Designer */}
      <IntroStatement />

      {/* Selected Work (Curated Case Studies) */}
      <SelectedWork />

      {/* Studio Methodology (How I Make) */}
      <ProcessStrip />

      {/* Interactive Atelier Studio Table */}
      <StudioTable />

      {/* Core Philosophy: Material → Craft → Garment → Identity */}
      <MaterialToMemory />

      {/* Craft Research & Material Studies */}
      <CraftHighlight />

      {/* Experience & Fashion Week Runways */}
      <ExperienceTimeline />

      {/* Direct Inquiries & Contact Banner */}
      <ContactCTA />
    </div>
  );
}
