'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import FashionDraftingOverlay from '../ui/FashionDraftingOverlay';

export default function Hero() {
  return (
    <section className="relative min-h-[94vh] flex flex-col justify-between pt-20 sm:pt-24 pb-8 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto overflow-hidden">
      {/* Subtle Vertical Side Scroll Indicator */}
      <div className="hidden 2xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-20 items-center gap-3 -rotate-90 origin-left pointer-events-none font-mono text-[9px] text-[#171717]/40 tracking-[0.28em] uppercase select-none">
        <span>← SCROLL TO DISCOVER</span>
      </div>

      {/* Main Full-Screen Desktop Editorial Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto py-4 z-10">
        {/* LEFT COLUMN: BRAND, HEADLINE & EDITORIAL NARRATIVE (5-6 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center"
        >
          {/* Brand Anchor */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs tracking-[0.25em] text-[#A85E43] uppercase font-semibold">
              KIRTI DESAI · FASHION DESIGN
            </span>
          </div>

          {/* 2. Large Elegant Serif Headline: PORTFOLIO COVER */}
          <h1 className="font-editorial-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.75rem] xl:text-[6.75rem] tracking-tight leading-[0.88] text-[#171717] font-normal">
            PORTFOLIO <br />
            <span className="italic font-light text-[#A85E43]">COVER</span>
          </h1>

          {/* 3. Under Headline: Tagline & Disciplines */}
          <div className="mt-4 space-y-1">
            <span className="font-mono text-xs sm:text-[12px] tracking-[0.22em] text-[#171717] font-semibold uppercase block">
              THE MAKING OF IDENTITY
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-[#A85E43] uppercase block font-medium">
              CRAFT · RESEARCH · GARMENT · STYLING
            </span>
          </div>

          {/* 4. Short Supporting Copy */}
          <div className="mt-5 pt-4 border-t border-[#171717]/10 max-w-lg">
            <p className="font-sans text-xs sm:text-sm text-[#171717]/80 font-light leading-relaxed">
              Exploring craft, material and emotion through fashion design.
            </p>
            <p className="font-editorial-serif text-lg sm:text-xl text-[#171717] italic font-light mt-1.5 leading-snug">
              &ldquo;Design begins with looking closely.&rdquo;
            </p>
          </div>

          {/* 5. Primary CTA: EXPLORE WORK → */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="/work"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-[0.22em] uppercase transition-all duration-300 shadow-sm group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A85E43]"
            >
              <span>EXPLORE WORK</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/process"
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#171717]/20 hover:border-[#A85E43] hover:text-[#A85E43] text-[#171717] font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A85E43]"
            >
              <span>VIEW PROCESS</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </Link>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: REAL PHOTOGRAPH & ARCHITECTURAL DRAFTING OVERLAYS (6-7 Cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center lg:justify-end"
        >
          {/* Main Visual Stage */}
          <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl aspect-[3/4] flex items-center justify-center">
            {/* Layer A: Ambient Warm Editorial Aura */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-[#A85E43]/14 via-[#E5D8C8]/40 to-transparent rounded-full blur-3xl pointer-events-none -z-20" />

            {/* Layer B: Delicate Hand-Drawn Fashion Sketches & Pattern Drafting Blueprint */}
            <FashionDraftingOverlay className="-z-10" />

            {/* Layer C: Real Authentic Kirti Desai Cutout Seamlessly Matching Page Background */}
            <div className="relative w-full h-[94%] flex flex-col justify-between group">
              <div className="relative w-full flex-1 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                <Image
                  src="/images/hero/kirti-hero-red-dress-nobg.png"
                  alt="Kirti Desai — Fashion Designer & Atelier Creative Director"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                  className="object-contain object-bottom transition-transform duration-700 ease-out drop-shadow-[0_12px_24px_rgba(23,23,23,0.06)]"
                />
              </div>

              {/* Layer D: Haute Couture Editorial Identifier Tag */}
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[#171717]/65 tracking-[0.2em] uppercase">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A85E43] inline-block animate-pulse" />
                  <span>KIRTI DESAI · ATELIER STUDY</span>
                </span>
                <span className="text-[#A85E43] font-semibold">PARUL UNIVERSITY</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM METADATA BAR: REFINED ACADEMIC & STUDIO ANCHOR */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-[#171717]/10 gap-3 z-10 font-mono text-[10px] sm:text-[11px] text-[#171717]/65 uppercase tracking-[0.2em]">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-[#171717] font-semibold">PARUL INSTITUTE OF DESIGN</span>
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
