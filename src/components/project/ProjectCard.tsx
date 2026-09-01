'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Heart } from 'lucide-react';
import { Project } from '@/types';
import TechnicalStamp from '../ui/TechnicalStamp';
import { useAtelier } from '@/context/AtelierContext';

interface ProjectCardProps {
  project: Project;
  layout?: 'standard' | 'large' | 'compact';
}

export default function ProjectCard({
  project,
  layout = 'standard',
}: ProjectCardProps) {
  const { toggleWishlist, isWishlisted } = useAtelier();
  const wishlisted = isWishlisted(project.id);

  return (
    <div className="group bg-[#FAF7F2] border border-[#171717]/15 hover:border-[#A85E43] p-4 sm:p-6 transition-all duration-500 flex flex-col justify-between h-full shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl">
      <div>
        {/* Card Header Stamps */}
        <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10 mb-4 font-mono text-xs">
          <TechnicalStamp label="PROJECT" value={project.projectNumber} variant="clay" />
          <div className="flex items-center gap-3">
            <span className="text-[#171717]/60 text-[11px]">{project.date}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist({
                  id: project.id,
                  title: project.title,
                  category: project.category,
                  image: project.heroImage || project.coverImage,
                  href: `/work/${project.slug}`,
                });
              }}
              className="p-1 hover:text-[#A85E43] transition-colors cursor-pointer"
              aria-label={`Save ${project.title} to wishlist`}
            >
              <Heart
                className={`w-3.5 h-3.5 transition-colors ${
                  wishlisted ? 'text-[#A85E43] fill-[#A85E43]' : 'text-[#171717]/40'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Project Image */}
        <Link href={`/work/${project.slug}`} data-cursor="view">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E5D8C8]/40 mb-5">
            <Image
              src={project.heroImage || project.coverImage}
              alt={project.heroImageAlt || project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </Link>

        {/* Category & Title */}
        <span className="font-mono text-[10px] text-[#A85E43] uppercase tracking-[0.25em] font-semibold block mb-1">
          {project.category}
        </span>

        <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#171717] group-hover:text-[#A85E43] transition-colors leading-tight">
          <Link href={`/work/${project.slug}`}>
            {project.title}
          </Link>
        </h3>

        {project.subtitle && (
          <p className="font-editorial-serif text-base text-[#171717]/70 italic mt-1">
            {project.subtitle}
          </p>
        )}

        <p className="font-sans text-xs sm:text-sm text-[#4A4A4A] mt-3 font-light leading-relaxed line-clamp-3">
          {project.summary}
        </p>
      </div>

      {/* Footer Disciplines & Link */}
      <div className="mt-6 pt-4 border-t border-[#171717]/10 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {project.disciplines.slice(0, 2).map((d) => (
            <span key={d} className="px-1.5 py-0.5 bg-[#E5D8C8]/50 text-[9px] font-mono text-[#171717]">
              {d}
            </span>
          ))}
        </div>

        <Link
          href={`/work/${project.slug}`}
          data-cursor="view"
          className="inline-flex items-center gap-1 text-xs font-mono text-[#171717] group-hover:text-[#A85E43] uppercase tracking-widest font-semibold transition-colors"
        >
          <span>VIEW CASE STUDY</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
