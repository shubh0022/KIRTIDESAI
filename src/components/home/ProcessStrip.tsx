'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { designSteps } from '@/data/siteContent';
import ScrollReveal from '../ui/ScrollReveal';

export default function ProcessStrip() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#161616]/10">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs text-[#A95F45] tracking-[0.25em] font-semibold uppercase">
          STUDIO METHODOLOGY
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="font-editorial-serif text-5xl sm:text-6xl text-[#161616] font-normal tracking-tight leading-[0.95]">
            HOW I <span className="italic text-[#A95F45]">MAKE</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#4A4A4A] mt-3 font-light max-w-xl leading-relaxed">
            The studio process is an 8-phase rigorous journey from attentive observation and research to tactile construction and expressive realization.
          </p>
        </div>

        <Link
          href="/process"
          data-cursor="go"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A95F45] hover:text-[#7B5945] uppercase tracking-widest font-semibold transition-colors self-start md:self-end"
        >
          <span>EXPLORE COMPLETE METHODOLOGY</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 8-Step Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {designSteps.map((step, idx) => (
          <ScrollReveal key={step.step} delay={idx * 0.05} direction="up">
            <div className="p-5 bg-[#FAF7F2] border border-[#161616]/10 hover:border-[#A95F45] transition-all duration-300 flex flex-col justify-between h-full group">
              <div>
                <span className="font-mono text-xs text-[#A95F45] font-semibold block mb-2">
                  PHASE {step.step}
                </span>
                <h3 className="font-editorial-serif text-2xl text-[#161616] group-hover:text-[#A95F45] transition-colors leading-tight">
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
