'use client';

import React, { useState } from 'react';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/project/ProjectCard';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const categories = [
    'ALL',
    'GARMENT CONSTRUCTION',
    'SUSTAINABLE ATHLEISURE',
    'CRAFT RESEARCH',
    'APPAREL MERCHANDISING',
    'CONCEPTUAL WEARABLE ART',
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'ALL') return true;
    return p.category === activeFilter;
  });

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Page Header with Filter Buttons */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#161616]/10 gap-6">
        <SectionHeader
          stamp="SELECTED WORK"
          stampValue="CURATED PORTFOLIO"
          title="Selected Projects"
          subtitle="A curated body of design research, corsetry construction, sustainable handloom engineering, and living craft studies."
          className="mb-0"
        />

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 border border-[#161616]/15 p-1 bg-[#FAF7F2] self-start md:self-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#161616] text-[#FAF7F2]'
                  : 'text-[#161616]/70 hover:text-[#161616] hover:bg-[#E5D8C8]/50'
              }`}
            >
              {cat === 'ALL' ? 'ALL PROJECTS' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
        {filteredProjects.map((project, idx) => (
          <ScrollReveal key={project.id} delay={idx * 0.08} direction="up">
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
