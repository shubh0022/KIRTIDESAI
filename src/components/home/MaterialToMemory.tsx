'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

export default function MaterialToMemory() {
  const steps = [
    { title: 'MATERIAL', desc: 'Sourcing ethical handlooms, organic Khadi, raw silks, and natural resins directly from craft clusters.' },
    { title: 'CRAFT', desc: 'Collaborating with master artisans to integrate living techniques like Lac, Pipli appliqué, and Bagh block print.' },
    { title: 'GARMENT', desc: 'Rigorous 2D drafting, 3D muslin draping, internal corsetry engineering, and precision construction.' },
    { title: 'IDENTITY', desc: 'Synthesizing personal memory, cultural resonance, and wearer confidence into wearable architecture.' },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#161616]/10">
      {/* Index Stamp 05 / 09 */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs text-[#A95F45] tracking-[0.25em] font-semibold">
          05 / 09
        </span>
        <span className="w-8 h-[1px] bg-[#A95F45]/30" />
        <span className="font-mono text-[10px] text-[#161616]/60 tracking-widest uppercase">
          CORE PHILOSOPHY
        </span>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-editorial-serif text-5xl sm:text-6xl text-[#161616] font-normal tracking-tight leading-[0.95]">
          MATERIAL <span className="text-[#A95F45]">→</span> CRAFT <span className="text-[#A95F45]">→</span> GARMENT <span className="text-[#A95F45]">→</span> MEMORY
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#4A4A4A] mt-4 font-light leading-relaxed">
          The transformation of raw textile and artisan heritage into personal and cultural identity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <ScrollReveal key={step.title} delay={idx * 0.08} direction="up">
            <div className="p-6 bg-[#FAF7F2] border border-[#161616]/10 hover:border-[#A95F45] transition-all duration-300 h-full flex flex-col justify-between group">
              <div>
                <span className="font-mono text-xs text-[#A95F45] font-semibold block mb-2">
                  0{idx + 1}
                </span>
                <h3 className="font-editorial-serif text-2xl text-[#161616] group-hover:text-[#A95F45] transition-colors">
                  {step.title}
                </h3>
                <p className="font-sans text-xs text-[#4A4A4A] mt-3 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
