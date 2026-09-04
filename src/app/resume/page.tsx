'use client';

import React from 'react';
import Link from 'next/link';
import { Download, Printer, ArrowLeft, Mail, Phone, MapPin, GraduationCap, Briefcase, CheckCircle2 } from 'lucide-react';
import { siteSettings, educationHistory, expertiseList, technicalSkills, languages } from '@/data/siteContent';
import { experiences } from '@/data/experience';
import { projects } from '@/data/projects';
import TechnicalStamp from '@/components/ui/TechnicalStamp';

export default function ResumePage() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
      {/* Top Header with Back & Print */}
      <div className="no-print pb-6 mb-8 border-b border-[#161616]/10 flex items-center justify-between">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#161616]/70 hover:text-[#A95F45] uppercase transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO ABOUT</span>
        </Link>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#161616] hover:bg-[#A95F45] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>PRINT / SAVE AS PDF</span>
        </button>
      </div>

      {/* Main Resume Sheet */}
      <div className="bg-[#FAF7F2] border border-[#161616]/20 p-8 sm:p-12 md:p-16 shadow-[0_12px_40px_rgba(0,0,0,0.05)] text-[#161616]">
        {/* Header */}
        <div className="pb-8 border-b border-[#161616]/15 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-editorial-serif text-4xl sm:text-5xl text-[#161616] leading-none">
              KIRTI <span className="italic font-light text-[#A95F45]">DESAI</span>
            </h1>
            <p className="font-mono text-xs tracking-[0.25em] text-[#A95F45] uppercase mt-2">
              FASHION DESIGNER · ATELIER
            </p>
          </div>

          <div className="font-mono text-xs space-y-1 text-[#161616]/80 text-left sm:text-right">
            <p>{siteSettings.email}</p>
            <p>{siteSettings.phone}</p>
            <p>{siteSettings.location}</p>
            <p className="pt-1">
              <a href={siteSettings.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#A95F45] transition-colors underline decoration-[#A95F45]/40">
                linkedin.com/in/kirti-desai-723315377
              </a>
            </p>
            <p>
              <a href={siteSettings.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#A95F45] transition-colors underline decoration-[#A95F45]/40">
                instagram.com/kirtidesai19
              </a>
            </p>
          </div>
        </div>

        {/* Profile Statement */}
        <div className="py-8 border-b border-[#161616]/10">
          <span className="font-mono text-[10px] text-[#A95F45] tracking-widest uppercase block mb-2 font-semibold">
            PROFILE SUMMARY
          </span>
          <p className="font-sans text-sm sm:text-base text-[#4A4A4A] leading-relaxed font-light">
            Third-year Bachelor of Fashion Design student at Parul Institute of Design passionate about turning ideas into meaningful design through creativity, craftsmanship, and thoughtful detailing. Proven exposure in garment drafting, Victorian corsetry, sustainable Khadi textile innovations, backstage model coordination, and luxury design production.
          </p>
        </div>

        {/* Education */}
        <div className="py-8 border-b border-[#161616]/10">
          <span className="font-mono text-[10px] text-[#A95F45] tracking-widest uppercase block mb-4 font-semibold">
            ACADEMIC BACKGROUND
          </span>
          <div className="space-y-6">
            {educationHistory.map((edu, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <div>
                  <h3 className="font-editorial-serif text-xl text-[#161616] font-normal">
                    {edu.degree}
                  </h3>
                  <p className="font-mono text-xs text-[#161616]/70 uppercase">
                    {edu.institution} {edu.university ? `· ${edu.university}` : ''}
                  </p>
                  <p className="font-sans text-xs text-[#4A4A4A] mt-1 font-light">
                    {edu.location}
                  </p>
                </div>
                <span className="font-mono text-xs text-[#A95F45] font-semibold">
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="py-8 border-b border-[#161616]/10">
          <span className="font-mono text-[10px] text-[#A95F45] tracking-widest uppercase block mb-4 font-semibold">
            PROFESSIONAL & FASHION WEEK EXPERIENCE
          </span>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mb-1">
                  <div>
                    <h3 className="font-editorial-serif text-xl text-[#161616]">
                      {exp.role}
                    </h3>
                    <p className="font-mono text-xs text-[#A95F45] uppercase font-semibold">
                      {exp.organization}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#161616]/60">
                    {exp.date}
                  </span>
                </div>
                <p className="font-sans text-xs text-[#4A4A4A] mt-1 leading-relaxed font-light">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Expertise & Skills */}
        <div className="py-8 border-b border-[#161616]/10">
          <span className="font-mono text-[10px] text-[#A95F45] tracking-widest uppercase block mb-3 font-semibold">
            EXPERTISE & CAPABILITIES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="font-mono text-[9px] text-[#161616]/50 uppercase tracking-widest block mb-2">
                STUDIO SPECIALIZATIONS
              </span>
              <ul className="space-y-1 text-xs font-mono text-[#161616]">
                {expertiseList.map((exp) => (
                  <li key={exp.name} className="flex items-center gap-2">
                    <span className="text-[#A95F45]">•</span>
                    <span>{exp.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-mono text-[9px] text-[#161616]/50 uppercase tracking-widest block mb-2">
                ORGANIZATIONAL SKILLS & LANGUAGES
              </span>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {technicalSkills.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-[#E5D8C8]/50 border border-[#161616]/10 text-[10px]">
                      {s}
                    </span>
                  ))}
                </div>
                <div>
                  <span className="text-[10px] text-[#161616]/50 uppercase block mb-1">
                    LANGUAGES
                  </span>
                  <span className="text-[#161616]">English · Hindi · Marathi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Projects Index */}
        <div className="pt-8">
          <span className="font-mono text-[10px] text-[#A95F45] tracking-widest uppercase block mb-3 font-semibold">
            KEY PORTFOLIO PROJECTS
          </span>
          <div className="space-y-2 font-mono text-xs">
            {projects.map((p) => (
              <div key={p.id} className="flex items-center justify-between pb-1.5 border-b border-[#161616]/5">
                <span>{p.projectNumber}. {p.title}</span>
                <span className="text-[#A95F45]">{p.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
