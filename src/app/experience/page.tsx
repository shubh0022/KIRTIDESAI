'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { experiences } from '@/data/experience';
import SectionHeader from '@/components/ui/SectionHeader';
import TechnicalStamp from '@/components/ui/TechnicalStamp';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ExperiencePage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeader
        stamp="CHRONOLOGY"
        stampValue="INDUSTRY & RUNWAYS"
        title="Experience & Fashion Weeks"
        subtitle="Practical industry exposure spanning luxury atelier production, fashion week collections, backstage model coordination, and artisan sales enablement."
      />

      <div className="mt-16 space-y-12">
        {experiences.map((exp, idx) => (
          <ScrollReveal key={exp.id} delay={idx * 0.08} direction="up">
            <div className="bg-[#FAF7F2] border border-[#161616]/15 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:border-[#A95F45]/50 transition-colors">
              <div className="lg:col-span-4 space-y-2">
                <TechnicalStamp label={exp.type} value={exp.year} variant="clay" />
                <span className="font-mono text-xs text-[#161616]/60 block pt-2">
                  {exp.date}
                </span>
                <h3 className="font-editorial-serif text-3xl sm:text-4xl text-[#161616]">
                  {exp.role}
                </h3>
                <p className="font-mono text-xs text-[#A95F45] uppercase tracking-widest font-semibold">
                  {exp.organization}
                </p>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <p className="font-sans text-sm sm:text-base text-[#4A4A4A] leading-relaxed font-light">
                  {exp.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#161616]/10">
                  <span className="font-mono text-[10px] text-[#161616]/50 uppercase tracking-widest block">
                    KEY RESPONSIBILITIES & HIGHLIGHTS
                  </span>
                  {exp.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs font-mono text-[#161616]/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A95F45] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
