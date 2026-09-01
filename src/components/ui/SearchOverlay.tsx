'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useAtelier } from '@/context/AtelierContext';
import { projects } from '@/data/projects';
import { craftStudies } from '@/data/craft';
import { experiences } from '@/data/experience';
import { visualDiaryItems } from '@/data/visualDiary';

interface SearchResultItem {
  id: string;
  title: string;
  category: string;
  discipline?: string;
  description: string;
  href: string;
  image?: string;
  year?: string;
}

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useAtelier();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setActiveIndex(-1);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  // Aggregate searchable items
  const allItems: SearchResultItem[] = [
    // Projects
    ...projects.map((p) => ({
      id: `proj-${p.id}`,
      title: p.title,
      category: 'PROJECT',
      discipline: p.category,
      description: p.summary,
      href: `/work/${p.slug}`,
      image: p.heroImage,
      year: p.year,
    })),
    // Craft Studies
    ...craftStudies.map((c) => ({
      id: `craft-${c.id}`,
      title: c.title,
      category: 'CRAFT',
      discipline: c.technique,
      description: c.summary,
      href: '/craft',
      image: c.image,
      year: c.year,
    })),
    // Experience & Runway
    ...experiences.map((e) => ({
      id: `exp-${e.id}`,
      title: `${e.role} — ${e.organization}`,
      category: 'EXPERIENCE',
      discipline: e.type,
      description: e.description,
      href: '/experience',
      image: e.image,
      year: e.year,
    })),
    // Visual Diary / Archive
    ...visualDiaryItems.slice(0, 8).map((v) => ({
      id: `diary-${v.id}`,
      title: v.title,
      category: 'ARCHIVE',
      discipline: v.roleTag,
      description: `Visual archive look · ${v.category}`,
      href: '/visual-diary',
      image: v.src,
    })),
    // Core Static Pathways
    {
      id: 'page-process',
      title: 'How I Make (8-Step Studio Process)',
      category: 'STUDIO',
      discipline: 'Methodology',
      description: 'Observe → Research → Ideate → Experiment → Develop → Construct → Refine → Express',
      href: '/process',
    },
    {
      id: 'page-custom',
      title: 'Bespoke & Custom Garment Commission',
      category: 'CLIENT',
      discipline: 'Made-to-Order',
      description: 'Made around the person, the occasion and the idea.',
      href: '/custom',
    },
    {
      id: 'page-about',
      title: 'About Kirti Desai',
      category: 'STUDIO',
      discipline: 'Fashion Design',
      description: 'Philosophy, education at Parul Institute of Design, and technical skills.',
      href: '/about',
    },
    {
      id: 'page-shop',
      title: 'Shop & Made-to-Order Capsules',
      category: 'SHOP',
      discipline: 'Atelier Release',
      description: 'Limited edition fashion house releases and bespoke inquiries.',
      href: '/shop',
    },
  ];

  // Filter items
  const filteredResults = allItems.filter((item) => {
    const matchesQuery =
      query.trim() === '' ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      (item.discipline && item.discipline.toLowerCase().includes(query.toLowerCase())) ||
      item.category.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || item.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  const categories = ['ALL', 'PROJECT', 'CRAFT', 'EXPERIENCE', 'ARCHIVE', 'STUDIO'];

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100000] bg-[#F4F0E8]/98 backdrop-blur-md flex flex-col justify-start animate-fadeIn overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Search Kirti Desai Portfolio"
    >
      {/* Top Bar */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between border-b border-[#171717]/10">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#A85E43] animate-pulse" />
          <span className="font-mono text-[11px] tracking-[0.25em] text-[#171717]/70 uppercase">
            EDITORIAL SEARCH ARCHIVE
          </span>
        </div>

        <button
          onClick={closeSearch}
          className="group flex items-center gap-2 p-2 text-[#171717] hover:text-[#A85E43] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A85E43] cursor-pointer"
          aria-label="Close search"
        >
          <span className="hidden sm:inline font-mono text-[11px] tracking-widest uppercase text-[#171717]/60 group-hover:text-[#A85E43]">
            [ESC] CLOSE
          </span>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Search Input & Category Filters */}
      <div className="w-full max-w-4xl mx-auto px-6 md:px-12 pt-8 pb-4">
        <div className="relative flex items-center border-b-2 border-[#171717] pb-3">
          <Search className="w-6 h-6 sm:w-8 sm:h-8 text-[#A85E43] mr-4 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(-1);
            }}
            placeholder="Search work, craft, materials, projects..."
            className="w-full bg-transparent font-editorial-serif text-2xl sm:text-4xl text-[#171717] placeholder:text-[#171717]/35 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#171717]/50 hover:text-[#171717] text-xs font-mono"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="font-mono text-[10px] text-[#171717]/50 uppercase tracking-widest mr-2">
            FILTER:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 font-mono text-[10px] tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#171717] text-[#FAF7F2] border border-[#171717]'
                  : 'bg-[#FAF7F2] text-[#171717]/70 border border-[#171717]/15 hover:border-[#171717]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-6 md:px-12 py-4 overflow-y-auto">
        {filteredResults.length > 0 ? (
          <div className="space-y-3 pb-12">
            <div className="font-mono text-[10px] text-[#171717]/50 uppercase tracking-widest mb-3">
              FOUND {filteredResults.length} {filteredResults.length === 1 ? 'RESULT' : 'RESULTS'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredResults.map((item, idx) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={closeSearch}
                  className={`group block p-4 bg-[#FAF7F2] border border-[#171717]/10 hover:border-[#A85E43] hover:shadow-sm transition-all duration-250 ${
                    activeIndex === idx ? 'ring-2 ring-[#A85E43]' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {item.image && (
                      <div className="relative w-16 h-20 bg-[#E5D8C8]/40 shrink-0 overflow-hidden border border-[#171717]/10">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="64px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[9px] tracking-widest uppercase text-[#A85E43] font-semibold">
                          {item.category} {item.discipline ? `· ${item.discipline}` : ''}
                        </span>
                        {item.year && (
                          <span className="font-mono text-[9px] text-[#171717]/40">
                            {item.year}
                          </span>
                        )}
                      </div>

                      <h3 className="font-editorial-serif text-lg text-[#171717] group-hover:text-[#A85E43] transition-colors leading-snug mt-1 truncate">
                        {item.title}
                      </h3>

                      <p className="font-sans text-xs text-[#171717]/70 line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-1 font-mono text-[9px] text-[#171717]/50 group-hover:text-[#A85E43] transition-colors mt-2 uppercase tracking-widest">
                        <span>EXPLORE</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#E5D8C8]/50 flex items-center justify-center text-[#A85E43]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-editorial-serif text-2xl text-[#171717]">
              No stories matched your search.
            </h3>
            <p className="font-sans text-sm text-[#171717]/70 leading-relaxed">
              Try searching for <span className="text-[#A85E43] font-medium">&ldquo;craft&rdquo;</span>,{' '}
              <span className="text-[#A85E43] font-medium">&ldquo;pattern&rdquo;</span>,{' '}
              <span className="text-[#A85E43] font-medium">&ldquo;corsetry&rdquo;</span>, or{' '}
              <span className="text-[#A85E43] font-medium">&ldquo;khadi&rdquo;</span>.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-2">
              {['Corsetry', 'Khadi', 'Lac Craft', 'Pipli Work', 'Apparel Merchandising'].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="px-3 py-1 bg-[#FAF7F2] border border-[#171717]/15 hover:border-[#A85E43] text-xs font-mono text-[#171717]/80 hover:text-[#A85E43] transition-colors cursor-pointer"
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
