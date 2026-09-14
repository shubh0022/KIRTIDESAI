'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import FashionDraftingOverlay from '../ui/FashionDraftingOverlay';

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-6 sm:px-10 lg:px-14 xl:px-16 max-w-[1700px] mx-auto overflow-hidden">
      {/* Editorial Vertical Grainline Pattern Guide (Desktop Margin) */}
      <div className="hidden 2xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-3 pointer-events-none font-mono text-[9px] text-[#171717]/40 tracking-[0.3em] uppercase select-none">
        <span className="text-[#A85E43]">↑</span>
        <span className="[writing-mode:vertical-lr] rotate-180">GRAINLINE</span>
        <div className="w-[1px] h-10 bg-[#171717]/15" />
      </div>

      {/* Main Split Editorial Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-center my-auto py-4 z-10">
        {/* LEFT COLUMN: BRAND IDENTITY, EDITORIAL HEADLINE & STATEMENT (5-6 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center"
        >
          {/* 1. Atelier Discipline & Sequence Tag */}
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <span className="font-mono text-[11px] sm:text-xs tracking-[0.28em] text-[#A85E43] uppercase font-semibold">
              FASHION DESIGN ATELIER
            </span>
          </div>

          {/* 2. Primary Title: KIRTI DESAI (Editorial Serif Hierarchy) */}
          <h1 className="font-editorial-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] 2xl:text-[7.25rem] tracking-tight leading-[0.88] text-[#171717] font-normal">
            KIRTI <br />
            <span className="italic font-light text-[#A85E43]">DESAI</span>
          </h1>

          {/* 3. Secondary Hero Statement: THE MAKING OF IDENTITY */}
          <div className="mt-4 sm:mt-5 space-y-1.5">
            <h2 className="font-mono text-xs sm:text-sm tracking-[0.24em] text-[#171717] font-semibold uppercase block">
              THE MAKING OF IDENTITY
            </h2>
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.22em] text-[#A85E43] uppercase block font-medium">
              CRAFT · RESEARCH · GARMENT · STYLING
            </p>
          </div>

          {/* 4. Supporting Narrative Copy & Philosophy */}
          <div className="mt-5 pt-4 border-t border-[#171717]/10 max-w-lg">
            <p className="font-sans text-xs sm:text-sm text-[#171717]/80 font-light leading-relaxed">
              Exploring craft, material and emotion through fashion design.
            </p>
            <p className="font-editorial-serif text-lg sm:text-xl text-[#171717] italic font-light mt-1.5 leading-snug">
              &ldquo;Design begins with looking closely.&rdquo;
            </p>
          </div>

          {/* 5. Primary Actions */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="/work"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-[0.22em] uppercase transition-all duration-300 shadow-sm group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A85E43]"
            >
              <span>EXPLORE WORK</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/account"
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#171717]/20 hover:border-[#A85E43] hover:text-[#A85E43] text-[#171717] font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A85E43]"
            >
              <span>ENTER ATELIER</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </Link>
          </div>

          {/* 6. Clean Editorial Academic & Studio Metadata Block */}
          <div className="mt-8 pt-5 border-t border-[#171717]/10 max-w-md">
            <div className="flex flex-col gap-1 font-mono text-[10.5px] sm:text-[11px] text-[#171717]/70 uppercase tracking-[0.16em]">
              <div className="flex items-center gap-2 text-[#171717] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A85E43]" />
                <span>KIRTI DESAI · FASHION DESIGN</span>
              </div>
              <span className="pl-3.5">PARUL INSTITUTE OF DESIGN · PARUL UNIVERSITY</span>
              <span className="pl-3.5 text-[#A85E43] text-[9.5px]">VADODARA, GUJARAT (2023 – 2027)</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: AUTHENTIC PHOTOGRAPH & REFINED DRAFTING BLUEPRINT (6-7 Cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center lg:justify-end"
        >
          {/* Main Visual Stage with Balanced Editorial Whitespace */}
          <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-[580px] aspect-[3/4] flex items-center justify-center p-2 sm:p-4">
            {/* Layer A: Subtle Ambient Warm Editorial Glow */}
            <div className="absolute -inset-6 bg-gradient-to-tr from-[#A85E43]/8 via-[#E5D8C8]/25 to-transparent rounded-full blur-3xl pointer-events-none -z-20" />

            {/* Layer B: Pattern Drafting Blueprint Overlay (Calibrated in Negative Space) */}
            <FashionDraftingOverlay className="-z-10" />

            {/* Layer C: Real Authentic Kirti Desai Photograph */}
            <div className="relative w-full h-full flex flex-col justify-between group">
              <div className="relative w-full flex-1 transition-transform duration-700 ease-out group-hover:scale-[1.015]">
                <Image
                  src="/images/hero/kirti-hero-editorial-desktop.webp"
                  alt="Kirti Desai — Fashion Designer in hand-embroidered crimson corsetry"
                  fill
                  priority
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, (max-width: 1536px) 45vw, 580px"
                  className="object-contain object-bottom transition-transform duration-700 ease-out"
                />
              </div>

              {/* Layer D: Atelier Spec Tag & Attribution */}
              <div className="mt-2 flex items-center justify-between font-mono text-[9.5px] sm:text-[10px] text-[#171717]/60 tracking-[0.2em] uppercase">
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#A85E43]" />
                  <span>KIRTI DESAI · ATELIER STUDY</span>
                </span>
                <span className="text-[#A85E43] font-medium">PARUL UNIVERSITY</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM METADATA BAR: SUBTLE TRANSITION TO SELECTED WORK */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between pt-5 border-t border-[#171717]/10 gap-3 z-10 font-mono text-[10px] sm:text-[11px] text-[#171717]/60 uppercase tracking-[0.2em]">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span>PARUL INSTITUTE OF DESIGN</span>
          <span className="text-[#A85E43]">·</span>
          <span>PARUL UNIVERSITY (2023 – 2027)</span>
        </div>

        <div className="flex items-center gap-4 text-[#171717]/50 text-[10px]">
          <span>CRAFT · RESEARCH · GARMENT · STYLING</span>
        </div>
      </div>
    </section>
  );
}
