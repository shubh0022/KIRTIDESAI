'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, GraduationCap, MapPin, Scissors, Sparkles } from 'lucide-react';
import { aboutMeContent } from '@/data/siteContent';
import ScrollReveal from '../ui/ScrollReveal';
import TechnicalStamp from '../ui/TechnicalStamp';

export default function IntroStatement() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#161616]/10 relative" id="about-preview">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-xs text-[#A95F45] tracking-[0.25em] font-semibold uppercase">
          ABOUT THE DESIGNER
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Heading & Subtle Fashion Mannequin Sketch Reference */}
        <div className="lg:col-span-3">
          <ScrollReveal direction="up">
            <h2 className="font-editorial-serif text-4xl sm:text-5xl text-[#161616] font-normal tracking-tight leading-[1.08]">
              ABOUT <br />
              <span className="italic text-[#A95F45]">THE DESIGNER</span>
            </h2>
            <p className="font-mono text-xs text-[#161616]/60 tracking-widest uppercase mt-4">
              KIRTI DESAI · ATELIER
            </p>
          </ScrollReveal>
        </div>

        {/* Middle Column: Real Photograph of Kirti in white halter top with sunglasses */}
        <div className="lg:col-span-4">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="relative aspect-[3/4] w-full overflow-hidden group">
              <Image
                src="/images/portrait/kirti-portrait-sunglasses.jpg"
                alt="Kirti Desai in white dress with sunglasses"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                data-cursor="open"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Bio & Metadata Attributes */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <ScrollReveal direction="up" delay={0.15}>
            <div>
              <h3 className="font-editorial-serif text-3xl text-[#161616] font-normal leading-none">
                KIRTI DESAI
              </h3>
              <p className="font-mono text-xs text-[#A95F45] tracking-widest uppercase font-semibold mt-1">
                Fashion Designer
              </p>

              <p className="font-sans text-sm sm:text-base text-[#4A4A4A] mt-4 leading-relaxed font-light">
                A fashion design student with a deep love for form, fabric and craftsmanship. I believe that clothing is a medium of expression — it carries culture, memory and identity.
              </p>
              <p className="font-sans text-sm text-[#4A4A4A] mt-3 leading-relaxed font-light">
                My work explores the relationship between traditional techniques and contemporary design, creating pieces that are meaningful, functional and beautiful.
              </p>

              <Link
                href="/about"
                data-cursor="go"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A95F45] hover:text-[#7B5945] uppercase tracking-widest font-semibold mt-4 transition-colors"
              >
                <span>READ MORE ABOUT MY JOURNEY</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 4 Clean Metadata Cards */}
            <div className="space-y-3 pt-4 border-t border-[#161616]/10">
              <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] border border-[#161616]/10">
                <GraduationCap className="w-4 h-4 text-[#A95F45] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-mono text-[9px] text-[#161616]/50 uppercase tracking-widest block">
                    EDUCATION
                  </span>
                  <span className="font-medium text-[#161616]">
                    Bachelor of Fashion Design · Parul Institute of Design, Parul University (2023 – 2027)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] border border-[#161616]/10">
                <MapPin className="w-4 h-4 text-[#A95F45] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-mono text-[9px] text-[#161616]/50 uppercase tracking-widest block">
                    LOCATION
                  </span>
                  <span className="font-medium text-[#161616]">
                    Kolhapur, Maharashtra
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] border border-[#161616]/10">
                <Scissors className="w-4 h-4 text-[#A95F45] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-mono text-[9px] text-[#161616]/50 uppercase tracking-widest block">
                    FOCUS
                  </span>
                  <span className="font-medium text-[#161616]">
                    Craft · Garment Construction · Research · Styling
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] border border-[#161616]/10">
                <Sparkles className="w-4 h-4 text-[#A95F45] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-mono text-[9px] text-[#161616]/50 uppercase tracking-widest block">
                    APPROACH
                  </span>
                  <span className="font-medium text-[#161616]">
                    Thoughtful · Detail Oriented · Timeless
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
