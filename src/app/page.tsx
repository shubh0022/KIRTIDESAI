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

import CollectionsStrip from '@/components/home/CollectionsStrip';

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 01: Cover & Editorial Hero */}
      <Hero />

      {/* 02: Selected Work (Curated Real Case Studies) */}
      <SelectedWork />

      {/* 03: Curated Collections (Anatomical Architecture & Woven Resistance) */}
      <CollectionsStrip />

      {/* 04: Studio Methodology (8-Step Process) */}
      <ProcessStrip />

      {/* 06: Craft Research & Living Traditions (Lac, Pipli, Bagh) */}
      <CraftHighlight />

      {/* 07: Core Philosophy: Material → Craft → Garment → Identity */}
      <MaterialToMemory />

      {/* 08: Interactive Atelier Studio Table */}
      <StudioTable />

      {/* 09: About The Designer */}
      <IntroStatement />

      {/* 10: Experience & Fashion Week Runways */}
      <ExperienceTimeline />

      {/* 11: Direct Inquiries & Contact Banner */}
      <ContactCTA />
    </div>
  );
}
