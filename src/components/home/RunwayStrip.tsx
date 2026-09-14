'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play, Eye } from 'lucide-react';

export default function RunwayStrip() {
  return (
    <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-14 bg-[#171717] text-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="font-mono text-[11px] sm:text-xs tracking-[0.28em] text-[#A85E43] uppercase font-semibold block">
              DIGITAL RUNWAY
            </span>
            <h2 className="font-editorial-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.05]">
              The Living Atelier <br />
              <span className="italic font-light text-[#A85E43]">Curated Runway Showcase</span>
            </h2>
          </div>

          <Link
            href="/runway"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#FAF7F2] hover:bg-[#A85E43] text-[#171717] hover:text-white font-mono text-xs tracking-[0.24em] uppercase transition-all duration-300 group cursor-pointer"
          >
            <span>ENTER RUNWAY</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative aspect-[3/4] overflow-hidden border border-white/10 group bg-black/40">
            <Image
              src="/images/projects/pattern-scissors-draft.jpg"
              alt="Runway Look 01 — Anatomical Victorian Toile Corset"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="font-mono text-[10px] text-[#A85E43] tracking-widest uppercase">LOOK 01</span>
              <h3 className="font-editorial-serif text-xl text-white mt-1">Anatomical Corset Toile</h3>
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden border border-white/10 group bg-black/40">
            <Image
              src="/images/projects/card-02-athleisure.jpg"
              alt="Runway Look 03 — Sustainable Khadi Athleisure"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="font-mono text-[10px] text-[#A85E43] tracking-widest uppercase">LOOK 03</span>
              <h3 className="font-editorial-serif text-xl text-white mt-1">Sustainable Khadi Athleisure</h3>
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden border border-white/10 group bg-black/40">
            <Image
              src="/images/projects/card-05-wearable-art.jpg"
              alt="Runway Look 06 — Wearable Art"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="font-mono text-[10px] text-[#A85E43] tracking-widest uppercase">LOOK 06</span>
              <h3 className="font-editorial-serif text-xl text-white mt-1">Death of Fear and Blood</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
