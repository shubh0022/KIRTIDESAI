'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles, Camera, Eye, Calendar } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import TechnicalStamp from '@/components/ui/TechnicalStamp';
import { useAtelier } from '@/context/AtelierContext';

interface StylingProject {
  id: string;
  title: string;
  category: string;
  season: string;
  image: string;
  description: string;
  credits: string;
  highlights: string[];
}

export default function StylingPage() {
  const { openAccount } = useAtelier();

  const stylingProjects: StylingProject[] = [
    {
      id: 'styling-01',
      title: 'Monochrome Kinetics · Runway Backstage',
      category: 'EDITORIAL RUNWAY STYLING',
      season: 'Autumn / Winter 2025',
      image: '/images/hero/kirti-hero-chandelier.jpg',
      description:
        'Backstage coordination, high-tension garment quick-changes, and dynamic draping kinetics executed for luxury designer showcases at Vadodara Fashion Week.',
      credits: 'Styling & Dressing Direction: Kirti Desai · Photography: Studio Archive',
      highlights: ['30+ Runway Model Lineups', 'Garment Kinetics & Drape', 'Live Show Call Sheet Execution'],
    },
    {
      id: 'styling-02',
      title: 'Deconstructed Corsetry in Architecture',
      category: 'CONCEPTUAL WARDROBE',
      season: 'Spring / Summer 2025',
      image: '/images/hero/kirti-hero-editorial-desktop.webp',
      description:
        'Bridging Victorian corsetry boning with raw industrial concrete spaces. An editorial exploration of contrast, structure, and female bodily autonomy.',
      credits: 'Creative Direction & Wardrobe: Kirti Desai',
      highlights: ['Anatomical Toile Styling', 'Raw Handloom Juxtaposition', 'Minimalist Visual Rhythm'],
    },
    {
      id: 'styling-03',
      title: 'Nomadic Khadi Athleisure Lookbook',
      category: 'COMMERCIAL LOOKBOOK',
      season: 'Resort 2025',
      image: '/images/hero/kirti-hero-red-dress-nobg.png',
      description:
        'Reimagining traditional Khadi handlooms for contemporary urban movement. Clean silhouette styling, earthy tone palettes, and multi-functional garment layering.',
      credits: 'Wardrobe Synthesis & Creative Direction: Kirti Desai',
      highlights: ['Modular Jumpsuit Layering', 'Earth Mineral Palettes', 'Functional Movement Styling'],
    },
  ];

  return (
    <div className="min-h-screen pt-24 lg:pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-14 lg:mb-20">
        <SectionHeader
          stamp="EDITORIAL STYLING"
          stampValue="DIRECTION · RUNWAY"
          title="Editorial & Runway Styling"
          subtitle="Creative direction, runway backstage curation, and wardrobe narratives examining garment kinetics, architecture, and living craft."
        />
      </div>

      {/* Services Overview Banner */}
      <div className="mb-16 p-8 sm:p-10 bg-[#FAF7F2] border border-[#171717]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#A85E43] uppercase font-semibold">
            PROFESSIONAL INQUIRIES
          </span>
          <h2 className="font-editorial-serif text-2xl sm:text-3xl text-[#171717]">
            Available for Editorial Shoots, Runway Backstage & Brand Curation
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#171717]/70 font-light">
            Providing empathetic styling direction rooted in pattern-cutting intimacy, textile understanding, and acute visual precision.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-[0.2em] uppercase transition-colors shrink-0"
        >
          <span>BOOK STYLING SESSION</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="space-y-16 lg:space-y-24">
        {stylingProjects.map((project, idx) => (
          <article
            key={project.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-16 border-b border-[#171717]/10 ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image Column */}
            <div className={`lg:col-span-7 relative h-[420px] sm:h-[520px] bg-[#EFECE6] overflow-hidden ${
              idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
            }`}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute top-4 left-4 bg-[#171717]/90 text-[#FAF7F2] px-3 py-1 font-mono text-[9px] tracking-[0.2em] uppercase">
                {project.category}
              </div>
            </div>

            {/* Content Column */}
            <div className={`lg:col-span-5 space-y-6 ${
              idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
            }`}>
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-[#A85E43] tracking-[0.24em] uppercase block">
                  {project.season}
                </span>
                <h3 className="font-editorial-serif text-3xl sm:text-4xl text-[#171717] font-normal leading-tight">
                  {project.title}
                </h3>
              </div>

              <p className="font-sans text-sm text-[#171717]/75 font-light leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-[#171717]/10">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#171717]/50 uppercase block">
                  EXECUTION HIGHLIGHTS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-white border border-[#171717]/15 font-mono text-[10px] text-[#171717]/80"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 font-mono text-[11px] text-[#171717]/60 italic">
                {project.credits}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
