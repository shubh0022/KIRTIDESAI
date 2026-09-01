'use client';

import React from 'react';
import Image from 'next/image';
import { designSteps } from '@/data/siteContent';
import SectionHeader from '@/components/ui/SectionHeader';
import StudioTable from '@/components/home/StudioTable';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ProcessPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeader
        stamp="STUDIO METHODOLOGY"
        stampValue="HOW I MAKE"
        title="Design Methodology"
        subtitle="A structured 8-phase cycle of inquiry, material testing, pattern drafting, and expressive realization that governs every atelier project."
      />

      {/* 8 Process Steps Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
        {designSteps.map((step, idx) => (
          <ScrollReveal key={step.step} delay={idx * 0.05} direction="up">
            <div className="p-8 bg-[#FAF7F2] border border-[#161616]/15 hover:border-[#A95F45] transition-all h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#161616]/10 mb-4">
                  <span className="font-mono text-xs font-semibold text-[#A95F45]">
                    PHASE {step.step}
                  </span>
                  <span className="font-mono text-[10px] text-[#161616]/40 uppercase tracking-widest">
                    ATELIER STANDARD
                  </span>
                </div>

                <h3 className="font-editorial-serif text-3xl text-[#161616] leading-tight">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-[#4A4A4A] mt-4 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Studio Table Workspace Component */}
      <div className="mt-16">
        <StudioTable />
      </div>
    </div>
  );
}
