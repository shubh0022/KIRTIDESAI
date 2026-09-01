'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import TechnicalStamp from '../ui/TechnicalStamp';

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Vertical Side Indicator: SCROLL TO DISCOVER */}
      <div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-20 items-center gap-3 -rotate-90 origin-left pointer-events-none font-mono text-[9px] text-[#161616]/40 tracking-[0.25em] uppercase select-none">
        <span>← SCROLL TO DISCOVER</span>
      </div>

      {/* Main Asymmetric Hero Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-6 z-10">
        {/* Left Column: Editorial Display Typography & Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col justify-center"
        >
          {/* Index Stamp 01 / 09 */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-[#A95F45] tracking-[0.25em] font-semibold">
              01 / 09
            </span>
            <span className="w-8 h-[1px] bg-[#A95F45]/30" />
            <span className="font-mono text-[10px] text-[#161616]/60 tracking-widest uppercase">
              PORTFOLIO COVER
            </span>
          </div>

          {/* Primary Name Typography */}
          <h1 className="font-editorial-serif text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight leading-[0.88] text-[#161616] font-normal">
            KIRTI <br />
            <span className="italic font-light text-[#A95F45]">DESAI</span>
          </h1>

          {/* Subtitle & Disciplines */}
          <div className="mt-4">
            <span className="font-sans font-medium text-xs md:text-sm tracking-[0.32em] text-[#161616] uppercase block">
              FASHION DESIGN
            </span>
            <span className="font-mono text-[10px] tracking-[0.22em] text-[#161616]/70 uppercase block mt-1">
              CRAFT · RESEARCH · GARMENT · STYLING
            </span>
          </div>

          {/* Creative Concept Callout */}
          <div className="mt-8 pt-6 border-t border-[#161616]/10 max-w-xl">
            <span className="font-mono text-xs text-[#A95F45] tracking-widest uppercase font-semibold block mb-1">
              THE MAKING OF IDENTITY
            </span>
            <p className="font-editorial-serif text-2xl sm:text-3xl text-[#161616] italic font-light leading-snug">
              &ldquo;Design begins with looking closely.&rdquo;
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              data-cursor="view"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#A95F45] hover:bg-[#884E33] text-[#FAF7F2] font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-sm group"
            >
              <span>EXPLORE THE WORK</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/process"
              data-cursor="go"
              className="inline-flex items-center gap-2 px-6 py-4 border border-[#161616]/25 hover:border-[#161616] hover:bg-[#161616] hover:text-[#FAF7F2] text-[#161616] font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300"
            >
              <span>VIEW PROCESS</span>
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Authentic Editorial Red Dress & Chandelier Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative"
        >
          <div className="relative aspect-[3/4] w-full max-w-lg mx-auto bg-[#FAF7F2] p-3 border border-[#161616]/10 shadow-[0_16px_50px_rgba(0,0,0,0.08)] group">
            {/* Real Authentic Photograph of Kirti in Red Evening Dress */}
            <div className="relative w-full h-full overflow-hidden bg-[#E5D8C8]/50">
              <Image
                src="/images/portrait/kirti-portrait-red-curtain.jpg"
                alt="Kirti Desai in red evening dress — Fashion Designer & Atelier Creative Director"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                data-cursor="open"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

              {/* Bottom In-Image Academic Caption */}
              <div className="absolute bottom-5 left-5 right-5 text-white z-10 font-mono">
                <span className="text-[9px] tracking-widest text-[#E5D8C8] uppercase block">
                  KIRTI DESAI · ATELIER
                </span>
                <p className="font-editorial-serif text-xl text-[#FAF7F2] tracking-wide leading-tight mt-0.5">
                  Fashion Design Student
                </p>
                <p className="text-[10px] text-white/80 mt-0.5 leading-relaxed">
                  Parul Institute of Design · Parul University (2023 – 2027)
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-[#161616]/10 gap-2 z-10 font-mono text-[11px] text-[#161616]/60 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span>PARUL INSTITUTE OF DESIGN</span>
          <span>·</span>
          <span>KOLHAPUR, MAHARASHTRA</span>
        </div>

        <div className="flex items-center gap-4 text-[#161616]/50 text-[10px]">
          <span>RESEARCH → MATERIAL → EXPERIMENT → CONSTRUCTION → EXPRESSION</span>
        </div>
      </div>
    </section>
  );
}
