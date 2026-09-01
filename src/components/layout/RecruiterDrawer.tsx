'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Download, ArrowUpRight, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';
import { siteSettings, technicalSkills } from '@/data/siteContent';
import { projects } from '@/data/projects';
import TechnicalStamp from '../ui/TechnicalStamp';

export default function RecruiterDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-recruiter-drawer', handleOpen);
    return () => window.removeEventListener('open-recruiter-drawer', handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Panel */}
      <div className="absolute inset-y-0 right-0 max-w-xl w-full bg-[#FAF7F2] border-l border-[#161616]/20 p-6 sm:p-10 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideLeft">
        {/* Header */}
        <div className="pb-6 border-b border-[#161616]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TechnicalStamp label="RECRUITER" value="10-SEC BRIEF" variant="clay" />
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-[#161616] hover:text-[#A95F45] transition-colors cursor-pointer"
            aria-label="Close Recruiter View"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="my-auto py-6 space-y-6">
          <div>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl text-[#161616]">
              KIRTI DESAI
            </h2>
            <p className="font-mono text-xs text-[#A95F45] uppercase tracking-widest font-semibold mt-1">
              Fashion Design Student · Parul Institute of Design (2023 – 2027)
            </p>
          </div>

          {/* Quick Key Metrics */}
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 bg-[#E5D8C8]/40 border border-[#161616]/10">
              <span className="text-[9px] text-[#161616]/50 uppercase block">CORE DISCIPLINE</span>
              <span className="font-semibold text-[#161616]">Garment Construction & Corsetry</span>
            </div>
            <div className="p-3 bg-[#E5D8C8]/40 border border-[#161616]/10">
              <span className="text-[9px] text-[#161616]/50 uppercase block">EXPERIENCE</span>
              <span className="font-semibold text-[#161616]">VFW 4.0 Designer & Backstage</span>
            </div>
            <div className="p-3 bg-[#E5D8C8]/40 border border-[#161616]/10">
              <span className="text-[9px] text-[#161616]/50 uppercase block">LOCATION</span>
              <span className="font-semibold text-[#161616]">Kolhapur, Maharashtra</span>
            </div>
            <div className="p-3 bg-[#E5D8C8]/40 border border-[#161616]/10">
              <span className="text-[9px] text-[#161616]/50 uppercase block">AVAILABILITY</span>
              <span className="font-semibold text-[#A95F45]">Open for Internships 2026</span>
            </div>
          </div>

          {/* Core Strengths */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-[#A95F45] tracking-widest uppercase font-semibold block">
              TOP CAPABILITIES
            </span>
            <div className="space-y-1.5 text-xs text-[#161616] font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A95F45] shrink-0" />
                <span>Victorian Corsetry & Anatomical Pattern Drafting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A95F45] shrink-0" />
                <span>Sustainable Handloom Khadi & Ergonomic Athleisure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A95F45] shrink-0" />
                <span>Living Indian Craft Research (Lac, Pipli, Bagh)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A95F45] shrink-0" />
                <span>Runway Coordination & Luxury Atelier Production</span>
              </div>
            </div>
          </div>

          {/* Fast Action Links */}
          <div className="pt-4 border-t border-[#161616]/10 space-y-2">
            <Link
              href="/portfolio-book"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between p-3.5 bg-[#161616] hover:bg-[#A95F45] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-colors"
            >
              <span>VIEW 20-PAGE DIGITAL PORTFOLIO</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/resume"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between p-3.5 border border-[#161616]/20 hover:border-[#161616] text-[#161616] font-mono text-xs tracking-widest uppercase transition-colors"
            >
              <span>PRINT / SAVE FULL RESUME</span>
              <Download className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Footer Contact */}
        <div className="pt-4 border-t border-[#161616]/10 font-mono text-xs text-[#161616]/70 flex items-center justify-between">
          <span>{siteSettings.email}</span>
          <span>{siteSettings.phone}</span>
        </div>
      </div>
    </div>
  );
}
