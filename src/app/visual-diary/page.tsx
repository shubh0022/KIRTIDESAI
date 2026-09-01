'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { visualDiaryItems } from '@/data/visualDiary';
import SectionHeader from '@/components/ui/SectionHeader';
import Lightbox from '@/components/ui/Lightbox';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function VisualDiaryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const categories = ['ALL', 'PORTRAIT', 'STYLE', 'MOOD', 'EDITORIAL', 'DETAIL', 'PERSONAL'];

  const filteredItems = visualDiaryItems.filter((item) => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'PERSONAL') return item.category === 'STYLE' || item.category === 'PORTRAIT';
    return item.category === activeCategory;
  });

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#161616]/10 gap-6">
        <SectionHeader
          stamp="VISUAL DIARY"
          stampValue="MOMENTS & MOODS"
          title="Visual Diary"
          subtitle="Moments, moods and everyday aesthetics. An unfiltered photographic collection of portraits, personal style, drape observations, and textile details."
          className="mb-0"
        />

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 border border-[#161616]/15 p-1 bg-[#FAF7F2] self-start md:self-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-[11px] font-mono tracking-widest uppercase transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#161616] text-[#FAF7F2]'
                  : 'text-[#161616]/70 hover:text-[#161616] hover:bg-[#E5D8C8]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
        {filteredItems.map((item, idx) => (
          <ScrollReveal key={item.id} delay={idx * 0.05} direction="up">
            <div
              onClick={() => openLightbox(idx)}
              data-cursor="open"
              className="group bg-[#FAF7F2] border border-[#161616]/15 p-3 sm:p-4 cursor-pointer hover:shadow-xl hover:border-[#A95F45]/50 transition-all duration-500 flex flex-col justify-between"
            >
              <div
                className={`relative w-full ${
                  item.aspectRatio === 'portrait'
                    ? 'aspect-[3/4]'
                    : item.aspectRatio === 'square'
                    ? 'aspect-square'
                    : 'aspect-[4/3]'
                } overflow-hidden bg-[#E5D8C8]/40`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              <div className="mt-3 pt-2 border-t border-[#161616]/10 flex items-center justify-between">
                <div>
                  <h4 className="font-editorial-serif text-lg text-[#161616] group-hover:text-[#A95F45] transition-colors truncate max-w-[220px]">
                    {item.title}
                  </h4>
                  <span className="font-mono text-[9px] text-[#161616]/50 uppercase tracking-widest block">
                    {item.roleTag}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#A95F45] tracking-widest uppercase">
                  OPEN ↗
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox Viewer */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        currentIndex={currentIndex}
        onNavigate={(newIdx) => setCurrentIndex(newIdx)}
      />
    </div>
  );
}
