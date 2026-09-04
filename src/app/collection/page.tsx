'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles, Scissors, Eye, Calendar } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import TechnicalStamp from '@/components/ui/TechnicalStamp';
import { useAtelier } from '@/context/AtelierContext';

interface CollectionItem {
  id: string;
  title: string;
  collection: string;
  season: string;
  category: string;
  discipline: string;
  image: string;
  description: string;
  materials: string[];
  link: string;
  status: string;
}

export default function CollectionPage() {
  const { openAccount } = useAtelier();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const collections: CollectionItem[] = [
    {
      id: 'col-01',
      title: 'Victorian Corset Toile Edition',
      collection: 'Capsule 2025 · Structural Archetypes',
      season: 'Autumn / Winter 2025',
      category: 'COUTURE CAPSULE',
      discipline: 'Anatomical Corsetry & Pattern Making',
      image: '/images/projects/pattern-scissors-draft.jpg',
      description:
        'Waist-cinching architectural silhouette featuring 12 internal spiral steel boning channels, unbleached cotton drill lining, and hand-stitched contrast binding.',
      materials: ['Pure Gujarat Cotton Drill', 'German Spring Steel', 'Brass Eyelets'],
      link: '/work/pattern-making',
      status: 'Limited Edition (12 Pieces)',
    },
    {
      id: 'col-02',
      title: 'Handloom Khadi Relaxed Blazer',
      collection: 'Sustainable Athleisure · 2025',
      season: 'Spring / Summer 2025',
      category: 'SUSTAINABLE LUXURY',
      discipline: 'Handloom Tailoring & Modular Wear',
      image: '/images/projects/card-02-athleisure.jpg',
      description:
        'Handspun natural ecru Khadi tailored with unstructured shoulders, horn buttons, and breathable Rajasthan handloom lining. Merges nomadic ease with tailoring precision.',
      materials: ['Handspun Wardha Khadi (120-count)', 'Horn Buttons', 'Herbal Indigo Wash'],
      link: '/work/athleisure',
      status: 'Artisanal Run',
    },
    {
      id: 'col-03',
      title: 'Vadodara Fashion Week 4.0 Runway Collection',
      collection: 'Khadi Kidswear Runway · 2025',
      season: 'Runway Edition',
      category: 'RUNWAY SHOWCASE',
      discipline: 'Runway Design & Backstage Direction',
      image: '/images/kirti/editorial/kirti-editorial-red-dress.jpg',
      description:
        'Designed and showcased a dedicated sustainable Khadi kidswear collection on the prestigious runway of Vadodara Fashion Week 4.0, coordinating 30+ models.',
      materials: ['Natural Handwoven Khadi', 'Vegetable Dyes', 'Child-Safe Ergonomic Seams'],
      link: '/experience',
      status: 'Runway Showcased',
    },
    {
      id: 'col-04',
      title: 'Pipli Appliqué Statement Cape',
      collection: 'Artisanal Collaboration · 2024–2025',
      season: 'Heirloom Edition',
      category: 'CRAFT COLLABORATION',
      discipline: 'Living Indian Craft Integration',
      image: '/images/kirti/craft/pipli-work-study.jpg',
      description:
        'Hand-appliquéd geometry crafted in direct collaboration with master artisans of Pipli, Odisha. Explores monumental volume with delicate historical motifs.',
      materials: ['Handloom Cotton Drill', 'Artisanal Appliqué Patchwork', 'Natural Mordants'],
      link: '/craft',
      status: 'Bespoke Commission',
    },
    {
      id: 'col-05',
      title: 'Wearable Art: Death of Fear and Blood',
      collection: 'Conceptual Runway · 2024',
      season: 'Curated Presentation',
      category: 'WEARABLE ART',
      discipline: 'Experimental Silhouette & Texture',
      image: '/images/projects/card-04-wearable-art.jpg',
      description:
        'A high-contrast conceptual study exploring tactile fear and psychological catharsis through distressed textiles, crimson draping, and sculptural forms.',
      materials: ['Textured Cotton Gauze', 'Hand-Distressed Silk', 'Crimson Pigments'],
      link: '/work/wearable-art',
      status: 'Archived Exhibition',
    },
    {
      id: 'col-06',
      title: 'Reversible Travel Jumpsuit',
      collection: 'Apparel Merchandising Study · 2024',
      season: 'Modular Utility',
      category: 'MODULAR DESIGN',
      discipline: 'Production Calibration & Sizing',
      image: '/images/projects/card-03-merchandising.jpg',
      description:
        'Dual-wear functional utility jumpsuit engineered with clean-finish enclosed seams, calibrated tech pack grading, and industrial wash durability.',
      materials: ['Midweight Cotton Twill', 'Concealed Reversible Zippers', 'Bar-Tack Reinforcements'],
      link: '/work/apparel-merchandising',
      status: 'Production Study',
    },
  ];

  const categories = ['ALL', 'COUTURE CAPSULE', 'SUSTAINABLE LUXURY', 'RUNWAY SHOWCASE', 'CRAFT COLLABORATION'];

  const filteredItems = collections.filter((item) => {
    if (selectedCategory === 'ALL') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <SectionHeader
        stamp="ATELIER COLLECTIONS"
        stampValue="2024 — 2026"
        title="Curated Collections & Runways"
        subtitle="A cohesive index of Kirti Desai's couture capsules, runway showcases, and artisanal handloom silhouettes."
      />

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-10 pb-6 border-b border-[#171717]/10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#171717] text-[#FAF7F2]'
                  : 'bg-[#FAF7F2] text-[#171717]/70 border border-[#171717]/15 hover:text-[#171717] hover:border-[#171717]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="font-mono text-xs text-[#171717]/60">
          Showing {filteredItems.length} of {collections.length} Curated Works
        </span>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {filteredItems.map((piece) => (
          <article
            key={piece.id}
            className="group flex flex-col bg-[#FAF7F2] border border-[#171717]/15 overflow-hidden transition-all duration-300 hover:border-[#A85E43]/50 hover:shadow-[0_8px_30px_rgba(23,23,23,0.06)]"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EAE5DC]">
              <Image
                src={piece.image}
                alt={piece.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <Link
                  href={piece.link}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#FAF7F2] text-[#171717] text-xs font-mono tracking-widest py-3 hover:bg-[#A85E43] hover:text-white transition-colors uppercase font-medium"
                >
                  <span>EXPLORE SILHOUETTE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 bg-[#FAF7F2]/95 backdrop-blur-sm border border-[#171717]/10 px-2.5 py-1 text-[9px] font-mono tracking-widest text-[#171717] uppercase">
                {piece.status}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#A85E43] tracking-widest uppercase">
                  <span>{piece.season}</span>
                  <span>{piece.category}</span>
                </div>

                <h3 className="font-editorial-serif text-xl text-[#171717] group-hover:text-[#A85E43] transition-colors">
                  {piece.title}
                </h3>

                <p className="font-sans text-xs text-[#171717]/70 leading-relaxed font-light line-clamp-3">
                  {piece.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#171717]/10 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {piece.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-mono bg-[#EAE5DC]/60 text-[#171717]/80 px-2 py-0.5 rounded-none"
                    >
                      {mat}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    href={piece.link}
                    className="inline-flex items-center gap-1 text-xs font-mono text-[#171717] hover:text-[#A85E43] tracking-wider uppercase font-semibold"
                  >
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>

                  <Link
                    href="/custom"
                    className="text-[10px] font-mono text-[#A85E43] hover:underline tracking-wider uppercase"
                  >
                    COMMISSION
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Atelier Commissions & Custom Craft Banner */}
      <div className="mt-20 p-8 sm:p-12 bg-[#FAF7F2] border border-[#171717]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-[#A85E43]" />
            <span className="font-mono text-[10px] text-[#A85E43] uppercase tracking-widest font-semibold">
              BESPOKE & MADE-TO-MEASURE
            </span>
          </div>
          <h2 className="font-editorial-serif text-2xl sm:text-3xl text-[#171717]">
            Commission a Custom Silhouette
          </h2>
          <p className="font-sans text-sm text-[#171717]/75 font-light leading-relaxed">
            Every bespoke piece is personally calibrated to your anatomical measurements, combining historical
            pattern-drafting rigor with living Indian handloom fabrics.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <Link
            href="/custom"
            className="px-6 py-3 bg-[#171717] text-[#FAF7F2] text-xs font-mono tracking-widest uppercase hover:bg-[#A85E43] transition-colors text-center"
          >
            START BESPOKE INQUIRY
          </Link>
          <Link
            href="/shop"
            className="px-6 py-3 border border-[#171717]/20 text-[#171717] text-xs font-mono tracking-widest uppercase hover:border-[#A85E43] hover:text-[#A85E43] transition-colors text-center"
          >
            VIEW CAPSULE SHOP
          </Link>
        </div>
      </div>
    </div>
  );
}
