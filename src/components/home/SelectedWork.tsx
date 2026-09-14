'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Heart } from 'lucide-react';
import { projects } from '@/data/projects';
import ScrollReveal from '../ui/ScrollReveal';
import { useAtelier } from '@/context/AtelierContext';

export default function SelectedWork() {
  const { toggleWishlist, isWishlisted } = useAtelier();

  return (
    <section className="py-20 sm:py-28 md:py-32 px-6 sm:px-10 lg:px-14 xl:px-16 max-w-[1700px] mx-auto border-t border-[#171717]/10" id="work">
      {/* Top Editorial Row Spanning Full Page */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-[#A85E43] tracking-[0.25em] font-semibold uppercase">
              CURATED CASE STUDIES
            </span>
          </div>
          <h2 className="font-editorial-serif text-5xl sm:text-6xl lg:text-7xl text-[#171717] font-normal tracking-tight leading-[0.92]">
            SELECTED <span className="italic text-[#A85E43]">WORK</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#A85E43] uppercase tracking-wider font-semibold mt-3">
            IDEAS TRANSLATED INTO MATERIAL, FORM AND GARMENT.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-6 lg:max-w-lg">
          <p className="font-sans text-xs sm:text-sm text-[#171717]/75 font-light leading-relaxed">
            Each project is a rigorous journey of archival research, kinetic experimentation and artisanal craft — shaped with sculptural intention and anatomical tailoring.
          </p>
          <Link
            href="/work"
            data-cursor="go"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-[0.22em] uppercase font-medium transition-all duration-300 group cursor-pointer"
          >
            <span>VIEW ALL</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Full-Width 5-Column Project Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 xl:gap-6">
        {projects.map((project, idx) => {
          const wishlisted = isWishlisted(project.id);

          return (
            <ScrollReveal key={project.id} delay={idx * 0.05} direction="up">
              <div className="group bg-[#FAF7F2] border border-[#171717]/10 p-4 hover:border-[#A85E43] hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-full relative">
                <Link
                  href={`/work/${project.slug}`}
                  data-cursor="view"
                  className="flex-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Project Image */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E5D8C8]/40 mb-4">
                      <Image
                        src={project.heroImage || project.coverImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-[#A85E43] block">
                        PROJECT {project.projectNumber}
                      </span>
                    </div>

                    <h3 className="font-editorial-serif text-xl sm:text-2xl text-[#171717] group-hover:text-[#A85E43] transition-colors leading-snug mt-1.5 line-clamp-2">
                      {project.title}
                    </h3>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#171717]/10 flex items-center justify-between font-mono text-[10px] text-[#171717]/60 uppercase tracking-widest">
                    <span>{project.date}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A85E43] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist({
                      id: project.id,
                      title: project.title,
                      category: project.category,
                      image: project.heroImage || project.coverImage,
                      href: `/work/${project.slug}`,
                    });
                  }}
                  className="absolute top-5 right-5 p-2 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#171717] hover:text-[#A85E43] border border-[#171717]/10 transition-colors z-10 cursor-pointer"
                  aria-label="Save to wishlist"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      wishlisted ? 'text-[#A85E43] fill-[#A85E43]' : 'text-[#171717]/50'
                    }`}
                  />
                </button>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
