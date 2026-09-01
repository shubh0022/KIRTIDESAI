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
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#171717]/10" id="work">
      {/* Index Stamp 03 / 09 */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs text-[#A85E43] tracking-[0.25em] font-semibold">
          03 / 09
        </span>
        <span className="w-8 h-[1px] bg-[#A85E43]/30" />
        <span className="font-mono text-[10px] text-[#171717]/60 tracking-widest uppercase">
          CURATED CASE STUDIES
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left Headline Column */}
        <div className="lg:col-span-4">
          <ScrollReveal direction="up">
            <h2 className="font-editorial-serif text-5xl sm:text-6xl text-[#171717] font-normal tracking-tight leading-[0.95]">
              SELECTED <br />
              <span className="italic text-[#A85E43]">WORK</span>
            </h2>
            <p className="font-mono text-xs text-[#A85E43] uppercase tracking-wider font-semibold mt-4">
              IDEAS TRANSLATED INTO MATERIAL, FORM AND GARMENT.
            </p>
            <p className="font-sans text-sm text-[#171717]/75 mt-4 font-light leading-relaxed max-w-sm">
              Each project is a journey of research, experimentation and craft — shaped with intention and detail.
            </p>
          </ScrollReveal>
        </div>

        {/* Right 5 Vertical Project Cards Grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {projects.map((project, idx) => {
              const wishlisted = isWishlisted(project.id);

              return (
                <ScrollReveal key={project.id} delay={idx * 0.06} direction="up">
                  <div className="group bg-[#FAF7F2] border border-[#171717]/10 p-3 hover:border-[#A85E43] hover:shadow-lg transition-all duration-500 flex flex-col justify-between h-full relative">
                    <Link
                      href={`/work/${project.slug}`}
                      data-cursor="view"
                      className="flex-1 flex flex-col justify-between"
                    >
                      <div>
                        {/* Project Image */}
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E5D8C8]/40 mb-3">
                          <Image
                            src={project.heroImage || project.coverImage}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 200px"
                            className="object-cover object-center group-hover:scale-105 group-hover:translate-y-0.5 transition-all duration-700 ease-out"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-semibold text-[#A85E43] block">
                            {project.projectNumber}
                          </span>
                        </div>

                        <h3 className="font-editorial-serif text-lg text-[#171717] group-hover:text-[#A85E43] transition-colors leading-snug mt-1">
                          {project.title}
                        </h3>
                      </div>

                      <div className="mt-4 pt-2 border-t border-[#171717]/10 flex items-center justify-between font-mono text-[9px] text-[#171717]/50 uppercase tracking-widest">
                        <span>{project.date}</span>
                        <ArrowUpRight className="w-3 h-3 text-[#A85E43] opacity-0 group-hover:opacity-100 transition-opacity" />
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
                      className="absolute top-4 right-4 p-1.5 bg-[#FAF7F2]/80 backdrop-blur-xs text-[#171717] hover:text-[#A85E43] border border-[#171717]/10 transition-colors z-10 cursor-pointer"
                      aria-label="Save to wishlist"
                    >
                      <Heart
                        className={`w-3 h-3 ${
                          wishlisted ? 'text-[#A85E43] fill-[#A85E43]' : 'text-[#171717]/50'
                        }`}
                      />
                    </button>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Centered Link */}
      <div className="mt-12 text-center pt-8 border-t border-[#171717]/10">
        <Link
          href="/work"
          data-cursor="go"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#171717] hover:text-[#A85E43] tracking-[0.25em] uppercase font-semibold transition-colors"
        >
          <span>VIEW ALL PROJECTS</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
