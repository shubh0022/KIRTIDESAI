'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CraftStudy } from '@/types';
import TechnicalStamp from '../ui/TechnicalStamp';

interface CraftCardProps {
  craft: CraftStudy;
}

export default function CraftCard({ craft }: CraftCardProps) {
  return (
    <div className="group bg-[#FAF7F2] border border-[#161616]/15 hover:border-[#A95F45] p-5 sm:p-6 transition-all duration-500 flex flex-col justify-between h-full shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#161616]/10 mb-4 font-mono text-xs">
          <TechnicalStamp label="TRADITION" value={craft.category} variant="clay" />
          <span className="text-[#161616]/60 text-[11px]">{craft.year}</span>
        </div>

        {/* Craft Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E5D8C8]/40 mb-5">
          <Image
            src={craft.image}
            alt={craft.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#161616] group-hover:text-[#A95F45] transition-colors leading-tight">
          {craft.title}
        </h3>

        {craft.region && (
          <p className="font-mono text-xs text-[#A95F45] uppercase tracking-widest mt-1">
            ORIGIN: {craft.region}
          </p>
        )}

        <p className="font-sans text-xs sm:text-sm text-[#4A4A4A] mt-3 font-light leading-relaxed">
          {craft.summary}
        </p>

        {/* Process Highlights */}
        <div className="mt-4 pt-3 border-t border-[#161616]/10 space-y-1.5 font-sans text-xs text-[#4A4A4A]">
          <span className="font-mono text-[9px] text-[#161616]/50 uppercase tracking-widest block">
            TECHNIQUE & MATERIALITY
          </span>
          <p className="italic font-light">{craft.technique}</p>
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-6 pt-4 border-t border-[#161616]/10 flex items-center justify-between">
        <span className="font-mono text-[10px] text-[#161616]/50 uppercase">
          {craft.materials.slice(0, 2).join(' · ')}
        </span>

        <Link
          href={`/work/${craft.relatedProjectSlug || 'craft-study'}`}
          data-cursor="view"
          className="inline-flex items-center gap-1 text-xs font-mono text-[#161616] group-hover:text-[#A95F45] uppercase tracking-widest font-semibold transition-colors"
        >
          <span>VIEW CASE STUDY</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
