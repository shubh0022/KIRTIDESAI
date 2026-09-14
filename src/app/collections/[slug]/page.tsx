'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Scissors, Sparkles, Layers } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const COLLECTION_DETAILS: Record<
  string,
  {
    title: string;
    subhead: string;
    season: string;
    concept: string;
    materials: string[];
    techniques: string[];
    heroImage: string;
    gallery: string[];
    relatedProjectHref: string;
  }
> = {
  'anatomical-architecture': {
    title: 'Anatomical Architecture',
    subhead: 'Victorian Corsetry with Indian Craft Techniques',
    season: 'Autumn / Winter 2025',
    concept:
      'An exploration of waist suppression, structural channel drafting, and traditional Indian zari/resham embroidery applied over raw ecru cotton toile.',
    materials: ['Heavy Unbleached Cotton Drill', 'German Spiral Steel Boning', 'Brass Grommets', 'Handspun Khadi Lining'],
    techniques: ['Flat Pattern Drafting', 'Bias Strip Channeling', 'French Seaming', 'Gold Wire Zardozi Stitching'],
    heroImage: '/images/projects/pattern-scissors-draft.jpg',
    gallery: [
      '/images/projects/pattern-model-draping.jpg',
      '/images/projects/pattern-sewing-detail.jpg',
      '/images/projects/pattern-toile-large.jpg',
    ],
    relatedProjectHref: '/work',
  },
  'sustainable-khadi': {
    title: 'Woven Resistance',
    subhead: 'Handspun Khadi Modular Athleisure',
    season: 'Spring / Summer 2025',
    concept:
      'Challenging the synthetic paradigm of activewear by leveraging high-twist indigenous Khadi with ergonomic gussets and natural vegetable dyes.',
    materials: ['120-Count Wardha Khadi', 'Organic Indigo Extract', 'Natural Coconut Shell Toggles'],
    techniques: ['Handloom Weaving', 'Fermented Indigo Vat Dyeing', 'Zero-Waste Pattern Grading', 'Reinforced Flat-Fell Seams'],
    heroImage: '/images/projects/card-02-athleisure.jpg',
    gallery: [
      '/images/projects/card-01-pattern.jpg',
      '/images/projects/pattern-toile-large.jpg',
    ],
    relatedProjectHref: '/work',
  },
};

export default function CollectionDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'anatomical-architecture';
  const data = COLLECTION_DETAILS[slug] || COLLECTION_DETAILS['anatomical-architecture'];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 sm:px-10 lg:px-14 max-w-[1400px] mx-auto">
      {/* Back Navigation */}
      <Link
        href="/collections"
        className="inline-flex items-center gap-2 font-mono text-xs text-[#171717]/60 hover:text-[#A85E43] uppercase tracking-[0.2em] mb-10 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Curated Collections</span>
      </Link>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-[#A85E43] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COLLECTION CAPSULE · {data.season}</span>
          </div>
          <h1 className="font-editorial-serif text-4xl sm:text-5xl lg:text-6xl text-[#171717] font-normal leading-[1.05]">
            {data.title}
          </h1>
          <p className="font-mono text-xs sm:text-sm tracking-wider text-[#171717]/70 uppercase">
            {data.subhead}
          </p>
          <p className="font-sans text-sm sm:text-base text-[#171717]/80 leading-relaxed pt-2 font-light max-w-xl">
            {data.concept}
          </p>

          <div className="pt-4 flex items-center gap-4">
            <Link
              href="/runway"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-[0.22em] uppercase transition-all duration-300"
            >
              <span>VIEW IN RUNWAY</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href={data.relatedProjectHref}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#171717]/20 hover:border-[#A85E43] hover:text-[#A85E43] text-[#171717] font-mono text-xs tracking-[0.2em] uppercase transition-colors"
            >
              <span>PROCESS ARCHIVE</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 relative aspect-[4/5] overflow-hidden border border-[#171717]/10 bg-[#FAF7F2]">
          <Image
            src={data.heroImage}
            alt={data.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Technical Spec & Material Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 border-t border-[#171717]/10 mb-16">
        <div>
          <h3 className="font-mono text-xs tracking-[0.25em] text-[#A85E43] uppercase mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>PRIMARY TEXTILES & MATERIALS</span>
          </h3>
          <ul className="space-y-2 font-sans text-sm text-[#171717]/80">
            {data.materials.map((m, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#A85E43] rounded-full" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs tracking-[0.25em] text-[#A85E43] uppercase mb-4 flex items-center gap-2">
            <Scissors className="w-4 h-4" />
            <span>GARMENT TECHNIQUES & CRAFT</span>
          </h3>
          <ul className="space-y-2 font-sans text-sm text-[#171717]/80">
            {data.techniques.map((t, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#A85E43] rounded-full" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visual Edit Gallery */}
      <div className="space-y-6">
        <h3 className="font-mono text-xs tracking-[0.28em] text-[#171717] uppercase">
          VISUAL STUDY & CONSTRUCTION DETAILS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.gallery.map((src, idx) => (
            <div key={idx} className="relative aspect-[3/4] overflow-hidden border border-[#171717]/10 bg-[#FAF7F2]">
              <Image
                src={src}
                alt={`Detail ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
