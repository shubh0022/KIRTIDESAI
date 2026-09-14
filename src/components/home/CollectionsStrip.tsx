'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CollectionsStrip() {
  return (
    <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-14 xl:px-16 max-w-[1700px] mx-auto border-t border-[#171717]/10">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-[0.26em] text-[#A85E43] uppercase font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CURATED COLLECTIONS</span>
          </div>
          <h2 className="font-editorial-serif text-4xl sm:text-5xl lg:text-6xl text-[#171717] font-normal leading-[1.05]">
            Structural Archetypes & <br />
            <span className="italic font-light text-[#A85E43]">Handloom Silhouettes</span>
          </h2>
        </div>

        <Link
          href="/collections"
          className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-[0.22em] uppercase transition-all duration-300 group cursor-pointer"
        >
          <span>EXPLORE COLLECTIONS</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Main Large Editorial Image */}
        <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden border border-[#171717]/10 bg-[#FAF7F2] group">
          <Image
            src="/images/projects/pattern-model-draping.jpg"
            alt="Kirti Desai — Curated Collection Draping & Silhouette"
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
          <div className="absolute bottom-6 left-6 bg-black/65 backdrop-blur-sm px-4 py-2 text-[#FAF7F2] font-mono text-xs tracking-widest uppercase">
            CAPSULE 01 · ANATOMICAL ARCHITECTURE (2025)
          </div>
        </div>

        {/* Supporting Capsule Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative aspect-[4/5] overflow-hidden border border-[#171717]/10 bg-[#FAF7F2] group">
            <Image
              src="/images/projects/card-02-athleisure.jpg"
              alt="Woven Resistance — Sustainable Khadi Athleisure"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
          </div>
          <div className="space-y-2 font-mono text-xs">
            <span className="text-[#A85E43] uppercase tracking-wider block font-semibold">
              CAPSULE 02 · WOVEN RESISTANCE
            </span>
            <p className="font-sans text-sm text-[#171717]/75 font-light leading-relaxed">
              120-count handspun Wardha Khadi engineered with ergonomic tailoring gussets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
