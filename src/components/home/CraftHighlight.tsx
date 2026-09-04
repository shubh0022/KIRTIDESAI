'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { craftStudies } from '@/data/craft';
import CraftCard from '../craft/CraftCard';
import ScrollReveal from '../ui/ScrollReveal';

export default function CraftHighlight() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#161616]/10" id="craft">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs text-[#A95F45] tracking-[0.25em] font-semibold uppercase">
          CRAFT & RESEARCH
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="font-editorial-serif text-5xl sm:text-6xl text-[#161616] font-normal tracking-tight leading-[0.95]">
            CRAFT / <span className="italic text-[#A95F45]">MATERIAL</span> / MEMORY
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#4A4A4A] mt-3 font-light max-w-xl leading-relaxed">
            Hands-on research, material testing, and documentation of living Indian craft traditions.
          </p>
        </div>

        <Link
          href="/craft"
          data-cursor="go"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A95F45] hover:text-[#7B5945] uppercase tracking-widest font-semibold transition-colors self-start md:self-end"
        >
          <span>EXPLORE ALL CRAFT STUDIES</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Craft Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {craftStudies.map((craft, idx) => (
          <ScrollReveal key={craft.id} delay={idx * 0.08} direction="up">
            <CraftCard craft={craft} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
