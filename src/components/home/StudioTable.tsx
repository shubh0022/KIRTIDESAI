'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Layers, Scissors, Eye } from 'lucide-react';
import TechnicalStamp from '../ui/TechnicalStamp';

interface StudioItem {
  id: string;
  name: string;
  category: string;
  description: string;
  material: string;
  image: string;
}

export default function StudioTable() {
  const items: StudioItem[] = [
    {
      id: 'item-1',
      name: 'Unbleached Muslin Toile Drape',
      category: 'GARMENT DRAFTING',
      description: 'Waist suppression and anatomical panel drape pinned on dress form to establish structural balance.',
      material: '100% Pure Raw Cotton Muslin',
      image: '/images/projects/pattern-toile-large.jpg',
    },
    {
      id: 'item-2',
      name: 'Natural Lac Resin Swatch',
      category: 'CRAFT STUDY',
      description: 'Thermal molded natural lac resin embedded with mineral pigments and glass shards.',
      material: 'Organic Resin & Mineral Earth Dyes',
      image: '/images/projects/card-03-craft.jpg',
    },
    {
      id: 'item-3',
      name: 'Pattern Drafting & Tailor Shears',
      category: 'STUDIO TOOLS',
      description: 'Calibrated master curve rulers, tailor shears, and measurement drafting paper.',
      material: 'Carbon Steel & Heavy Drafting Paper',
      image: '/images/projects/pattern-scissors-draft.jpg',
    },
    {
      id: 'item-4',
      name: 'Handspun Khadi Swatch',
      category: 'SUSTAINABLE TEXTILE',
      description: 'Handwoven organic cotton engineered for breathable activewear silhouettes.',
      material: 'Handspun Handwoven Khadi',
      image: '/images/kirti/craft/textile-swatch-clay.jpg',
    },
  ];

  const [activeItem, setActiveItem] = useState<StudioItem>(items[0]);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#161616]/10" id="studio-table">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <TechnicalStamp label="ATELIER INTERACTIVE" value="STUDIO TABLE" variant="clay" />
          <h2 className="font-editorial-serif text-5xl sm:text-6xl text-[#161616] font-normal tracking-tight leading-[0.95] mt-4">
            THE STUDIO <span className="italic text-[#A95F45]">TABLE</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#4A4A4A] mt-3 font-light max-w-xl leading-relaxed">
            An interactive workspace of tactile swatches, drafting tools, and material studies that inform daily atelier experiments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Interactive Item Selector List */}
        <div className="lg:col-span-5 space-y-3">
          {items.map((item) => {
            const isSelected = activeItem.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item)}
                data-cursor="view"
                className={`w-full text-left p-4 sm:p-5 border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#FAF7F2] border-[#A95F45] shadow-md ring-1 ring-[#A95F45]'
                    : 'bg-[#FAF7F2]/50 border-[#161616]/10 hover:border-[#161616]/30 hover:bg-[#FAF7F2]'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#161616]/5 mb-2 font-mono text-[10px]">
                  <span className="text-[#A95F45] font-semibold">{item.category}</span>
                  <span className="text-[#161616]/40">{isSelected ? 'ACTIVE FOCUS' : 'CLICK TO EXAMINE'}</span>
                </div>

                <h3 className="font-editorial-serif text-xl sm:text-2xl text-[#161616] leading-snug">
                  {item.name}
                </h3>
                <p className="font-sans text-xs text-[#4A4A4A] mt-2 line-clamp-2 font-light">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Active Inspection Showcase */}
        <div className="lg:col-span-7 bg-[#FAF7F2] border border-[#161616]/15 p-6 sm:p-8 flex flex-col justify-between">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E5D8C8]/40 mb-6 border border-[#161616]/10">
            <Image
              src={activeItem.image}
              alt={activeItem.name}
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="pt-4 border-t border-[#161616]/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] text-[#A95F45] tracking-widest uppercase font-semibold block">
                EXAMINING SPECIMEN · {activeItem.category}
              </span>
              <h4 className="font-editorial-serif text-3xl text-[#161616] mt-1">
                {activeItem.name}
              </h4>
              <p className="font-sans text-sm text-[#4A4A4A] mt-2 font-light max-w-lg leading-relaxed">
                {activeItem.description}
              </p>
            </div>

            <div className="font-mono text-xs text-right sm:text-right bg-[#E5D8C8]/50 px-3 py-2 border border-[#161616]/10 shrink-0">
              <span className="text-[9px] text-[#161616]/50 uppercase block">COMPOSITION</span>
              <span className="text-[#161616] font-medium">{activeItem.material}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
