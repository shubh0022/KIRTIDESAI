'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { craftStudies } from '@/data/craft';
import { experiences } from '@/data/experience';
import SectionHeader from '@/components/ui/SectionHeader';
import TechnicalStamp from '@/components/ui/TechnicalStamp';

export default function ArchivePage() {
  const archiveItems = [
    { year: '2025', title: 'Pattern Making & Garment Construction', discipline: 'Garment Construction / Corsetry', category: 'Project', status: 'Completed', href: '/work/pattern-making' },
    { year: '2025', title: 'Athleisure Wear (Khadi Capsule)', discipline: 'Sustainable Athleisure / Handloom', category: 'Project', status: 'Completed', href: '/work/athleisure' },
    { year: '2025', title: 'Design Apprenticeship — Kastaan by Divya Jain', discipline: 'Production & Client Sales', category: 'Experience', status: 'Completed', href: '/experience' },
    { year: '2025', title: 'Khadi Kidswear Collection — Vadodara Fashion Week 4.0', discipline: 'Runway Collection', category: 'Fashion Week', status: 'Showcased', href: '/experience' },
    { year: '2024', title: 'Craft Study (Lac, Pipli & Bagh)', discipline: 'Craft Research & Documentation', category: 'Research', status: 'Archived', href: '/craft' },
    { year: '2024', title: 'Apparel Merchandising & Production', discipline: 'Reversible Travel Jumpsuit', category: 'Project', status: 'Completed', href: '/work/apparel-merchandising' },
    { year: '2024', title: 'Wearable Art: Death of Fear and Blood', discipline: 'Conceptual Fashion & Texture', category: 'Project', status: 'Completed', href: '/work/wearable-art' },
    { year: '2024', title: 'Backstage Model Coordinator — Vadodara Fashion Week 3.0', discipline: 'Runway Operations', category: 'Experience', status: 'Completed', href: '/experience' },
    { year: '2024', title: 'Craftroot Apprenticeship', discipline: 'Artisan Sales Enablement', category: 'Experience', status: 'Completed', href: '/experience' },
    { year: '2023–2027', title: 'Bachelor of Fashion Design', discipline: 'Parul Institute of Design', category: 'Academic', status: 'Ongoing', href: '/about' },
  ];

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeader
        stamp="CHRONOLOGY"
        stampValue="MASTER ARCHIVE"
        title="Chronological Archive"
        subtitle="Complete index of design projects, craft documentations, runway experiences, and academic achievements."
      />

      <div className="mt-12 border border-[#161616]/15 bg-[#FAF7F2] divide-y divide-[#161616]/10">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 p-4 font-mono text-[10px] text-[#161616]/50 uppercase tracking-widest bg-[#E5D8C8]/40">
          <span className="col-span-2">YEAR</span>
          <span className="col-span-4">TITLE / WORK</span>
          <span className="col-span-3">DISCIPLINE & FOCUS</span>
          <span className="col-span-2">STATUS</span>
          <span className="col-span-1 text-right">LINK</span>
        </div>

        {/* Table Rows */}
        {archiveItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="group grid grid-cols-1 md:grid-cols-12 p-5 items-center gap-3 hover:bg-[#E5D8C8]/30 transition-colors"
          >
            <div className="md:col-span-2 font-mono text-xs font-semibold text-[#A95F45]">
              {item.year}
            </div>

            <div className="md:col-span-4">
              <h3 className="font-editorial-serif text-xl sm:text-2xl text-[#161616] group-hover:text-[#A95F45] transition-colors leading-tight">
                {item.title}
              </h3>
              <span className="md:hidden font-mono text-[10px] text-[#161616]/50 uppercase mt-0.5 block">
                {item.discipline}
              </span>
            </div>

            <div className="hidden md:block md:col-span-3 font-mono text-xs text-[#161616]/70">
              {item.discipline}
            </div>

            <div className="md:col-span-2">
              <span className="inline-block px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase bg-[#E5D8C8]/50 border border-[#161616]/10 text-[#161616]">
                {item.status}
              </span>
            </div>

            <div className="md:col-span-1 flex items-center justify-end">
              <ArrowUpRight className="w-4 h-4 text-[#161616]/40 group-hover:text-[#A95F45] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
