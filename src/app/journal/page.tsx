'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, Clock } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import TechnicalStamp from '@/components/ui/TechnicalStamp';

export default function JournalPage() {
  const journalEntries = [
    {
      id: 'journal-01',
      title: 'Draping as Structural Inquiry: Victorian Corsetry Meets Indian Craft',
      category: 'GARMENT DRAFTING',
      date: 'DECEMBER 2025',
      summary:
        'Reflections on pattern drafting geometries, grainline behavior under tensile strain, and incorporating handcrafted botanical embroidery into rigid boning channels.',
      readTime: '4 MIN READ',
      linkHref: '/work/pattern-making',
    },
    {
      id: 'journal-02',
      title: 'Thermal Dynamics of Natural Lac Resin in Accessory Ornamentation',
      category: 'CRAFT RESEARCH',
      date: 'MARCH 2024',
      summary:
        'Field documentation on heating raw lac over charcoal embers, pigment blending timing, and traditional spindle shaping techniques in Rajasthan.',
      readTime: '6 MIN READ',
      linkHref: '/craft',
    },
    {
      id: 'journal-03',
      title: 'Architectural Proportions in Activewear: Inspired by Rajasthan Bharat Bhavan',
      category: 'SUSTAINABLE TEXTILE',
      date: 'JULY 2025',
      summary:
        'Translating the stone arches, deep verandas, and light-shadow geometry of Bharat Bhavan into kinetic raglan panel lines on handspun Khadi.',
      readTime: '5 MIN READ',
      linkHref: '/work/athleisure',
    },
  ];

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeader
        stamp="STUDIO JOURNAL"
        stampValue="RESEARCH & OBSERVATIONS"
        title="Journal & Field Notes"
        subtitle="Reflections on textile science, artisan heritage, pattern drafting mechanics, and sustainable fashion systems."
      />

      <div className="my-12 space-y-8">
        {journalEntries.map((entry) => (
          <article
            key={entry.id}
            className="p-8 bg-[#FAF7F2] border border-[#161616]/15 hover:border-[#A95F45]/50 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-6"
          >
            <div className="md:w-8/12">
              <div className="flex items-center gap-3 mb-3">
                <TechnicalStamp label={entry.category} variant="clay" />
                <span className="font-mono text-xs text-[#161616]/60 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#A95F45]" />
                  <span>{entry.readTime}</span>
                </span>
              </div>

              <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#161616] font-normal tracking-tight">
                {entry.title}
              </h3>
              <p className="font-sans text-sm text-[#4A4A4A] mt-3 font-light leading-relaxed">
                {entry.summary}
              </p>
            </div>

            <div className="md:w-4/12 flex flex-col items-start md:items-end justify-between self-stretch pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#161616]/10 md:pl-6">
              <span className="font-mono text-xs text-[#161616]/50">
                {entry.date}
              </span>
              <Link
                href={entry.linkHref}
                className="mt-4 md:mt-0 inline-flex items-center gap-1 text-xs font-mono text-[#A95F45] hover:text-[#7B5945] uppercase tracking-widest font-semibold transition-colors"
              >
                <span>EXPLORE STUDY</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
