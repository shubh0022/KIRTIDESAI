'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { craftStudies } from '@/data/craft';
import SectionHeader from '@/components/ui/SectionHeader';
import CraftCard from '@/components/craft/CraftCard';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function CraftPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeader
        stamp="HERITAGE & INNOVATION"
        stampValue="CRAFT / MATERIAL / MEMORY"
        title="Craft Documentation & Studies"
        subtitle="In-depth research exploring the tactile intelligence, thermal manipulation, and surface ornamentation of Indian artisan traditions."
      />

      {/* Craft Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
        {craftStudies.map((craft, idx) => (
          <ScrollReveal key={craft.id} delay={idx * 0.08} direction="up">
            <CraftCard craft={craft} />
          </ScrollReveal>
        ))}
      </div>

      {/* Detailed Craft Breakdown Section */}
      <div className="mt-20 pt-16 border-t border-[#161616]/10 space-y-16">
        {craftStudies.map((craft) => (
          <div
            key={craft.id}
            className="bg-[#FAF7F2] border border-[#161616]/15 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden bg-[#E5D8C8]/50 border border-[#161616]/10">
              <Image
                src={craft.image}
                alt={craft.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center"
              />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#A95F45] tracking-widest font-semibold uppercase">
                  {craft.category}
                </span>
                <span className="text-[#161616]/30">/</span>
                <span className="font-mono text-xs text-[#161616]/60">
                  {craft.region}
                </span>
              </div>

              <h3 className="font-editorial-serif text-3xl sm:text-4xl text-[#161616]">
                {craft.title}
              </h3>

              <p className="font-sans text-sm text-[#4A4A4A] leading-relaxed font-light">
                {craft.summary}
              </p>

              <div className="space-y-2 pt-2">
                <span className="font-mono text-[10px] text-[#161616]/50 uppercase tracking-widest block">
                  PROCESS OBSERVATIONS & FIELD NOTES
                </span>
                {craft.processNotes.map((note, nIdx) => (
                  <div key={nIdx} className="flex items-start gap-2 text-xs font-mono text-[#161616]/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A95F45] shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href={`/work/${craft.relatedProjectSlug || 'craft-study'}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A95F45] hover:text-[#7B5945] uppercase tracking-widest font-semibold transition-colors"
                >
                  <span>VIEW INTEGRATED PROJECT CASE STUDY</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
