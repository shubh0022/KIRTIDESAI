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
      {/* 01 / 09 — Cover & Asymmetric Hero */}
      <Hero />

      {/* 02 / 09 — About The Designer */}
      <IntroStatement />

      {/* 03 / 09 — Selected Work (5 Curated Case Studies) */}
      <SelectedWork />

      {/* 04 / 09 — Studio Methodology (How I Make) */}
      <ProcessStrip />

      {/* Interactive Atelier Studio Table */}
      <StudioTable />

      {/* 05 / 09 — Core Philosophy: Material → Craft → Garment → Identity */}
      <MaterialToMemory />

      {/* 06 / 09 — Craft Research & Material Studies */}
      <CraftHighlight />

      {/* 07 / 09 — Experience & Fashion Week Runways */}
      <ExperienceTimeline />

      {/* 09 / 09 — Direct Inquiries & Contact Banner */}
      <ContactCTA />
    </div>
  );
}
