'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { experiences } from '@/data/experience';
import ScrollReveal from '../ui/ScrollReveal';

export default function ExperienceTimeline() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#161616]/10" id="experience">
      {/* Index Stamp 07 / 09 */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs text-[#A95F45] tracking-[0.25em] font-semibold">
          07 / 09
        </span>
        <span className="w-8 h-[1px] bg-[#A95F45]/30" />
        <span className="font-mono text-[10px] text-[#161616]/60 tracking-widest uppercase">
          INDUSTRY EXPOSURE
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="font-editorial-serif text-5xl sm:text-6xl text-[#161616] font-normal tracking-tight leading-[0.95]">
            EXPERIENCE & <span className="italic text-[#A95F45]">RUNWAYS</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#4A4A4A] mt-3 font-light max-w-xl leading-relaxed">
            Hands-on professional apprenticeships, fashion week collections, and backstage production coordination.
          </p>
        </div>

        <Link
          href="/experience"
          data-cursor="go"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A95F45] hover:text-[#7B5945] uppercase tracking-widest font-semibold transition-colors self-start md:self-end"
        >
          <span>VIEW FULL TIMELINE</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Timeline List */}
      <div className="border border-[#161616]/15 bg-[#FAF7F2] divide-y divide-[#161616]/10">
        {experiences.slice(0, 4).map((exp, idx) => (
          <ScrollReveal key={exp.id} delay={idx * 0.05} direction="up">
            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:bg-[#E5D8C8]/20 transition-colors">
              <div className="md:w-3/12 font-mono">
                <span className="text-xs font-semibold text-[#A95F45] block">
                  {exp.date}
                </span>
                <span className="text-[10px] text-[#161616]/60 uppercase tracking-widest block mt-1">
                  {exp.type}
                </span>
              </div>

              <div className="md:w-9/12">
                <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#161616]">
                  {exp.role}
                </h3>
                <p className="font-mono text-xs text-[#A95F45] uppercase tracking-widest font-semibold mt-1">
                  {exp.organization}
                </p>
                <p className="font-sans text-sm text-[#4A4A4A] mt-3 font-light leading-relaxed">
                  {exp.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.highlights.map((hl, hIdx) => (
                    <span key={hIdx} className="inline-flex items-center gap-1.5 text-xs font-mono text-[#161616]/80 bg-[#E5D8C8]/50 px-2 py-1 border border-[#161616]/5">
                      <CheckCircle2 className="w-3 h-3 text-[#A95F45]" />
                      <span>{hl}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
