'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useAtelier } from '@/context/AtelierContext';
import Logo from './Logo';

export default function StudioDrawer() {
  const { isStudioMenuOpen, closeStudioMenu } = useAtelier();

  useEffect(() => {
    if (isStudioMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isStudioMenuOpen]);

  if (!isStudioMenuOpen) return null;

  const sections = [
    {
      title: 'DISCOVER',
      links: [
        { label: 'Selected Work', href: '/work' },
        { label: 'Corsetry & Garment Construction', href: '/work/pattern-making' },
        { label: 'Sustainable Khadi Athleisure', href: '/work/athleisure' },
        { label: 'Visual Diary', href: '/visual-diary' },
      ],
    },
    {
      title: 'DESIGN & CRAFT',
      links: [
        { label: 'Living Craft Studies', href: '/craft' },
        { label: 'Lac Resin Craft (Gujarat)', href: '/craft' },
        { label: 'Pipli Appliqué (Odisha)', href: '/craft' },
        { label: 'Bagh Handblock Print (MP)', href: '/craft' },
      ],
    },
    {
      title: 'STUDIO & METHOD',
      links: [
        { label: 'Design Philosophy', href: '/about' },
        { label: 'How I Make (8-Step Process)', href: '/process' },
        { label: 'Academic Journey & VFW', href: '/experience' },
        { label: 'Field Journal', href: '/journal' },
      ],
    },
    {
      title: 'CLIENT & BESPOKE',
      links: [
        { label: 'Custom Garment Commission', href: '/custom' },
        { label: 'Bespoke Consultation', href: '/custom' },
        { label: 'Runway & Brand Collaboration', href: '/contact' },
        { label: 'Capsule Shop Preview', href: '/shop' },
      ],
    },
    {
      title: 'EXPLORE & ARCHIVE',
      links: [
        { label: 'Chronology Archive', href: '/archive' },
        { label: '20-Page Digital Publication', href: '/portfolio-book' },
        { label: 'Digital CV & Credentials', href: '/resume' },
        { label: 'About the Designer', href: '/about' },
      ],
    },
    {
      title: 'INFORMATION',
      links: [
        { label: 'Direct Contact & Inquiries', href: '/contact' },
        { label: 'Client FAQ & Sizing', href: '/faq' },
        { label: 'Privacy & Intellectual Rights', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100000] bg-black/40 backdrop-blur-xs flex justify-end animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Studio Secondary Navigation"
      onClick={closeStudioMenu}
    >
      <div
        className="w-full max-w-2xl bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#171717]/15 p-6 sm:p-10 animate-slideLeft overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="pb-6 border-b border-[#171717]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo variant="primary" size="sm" href="/" />
            <div>
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#A85E43] uppercase font-semibold block">
                ATELIER COMPENDIUM
              </span>
              <span className="font-editorial-serif text-xl text-[#171717]">
                KIRTI DESAI · STUDIO
              </span>
            </div>
          </div>

          <button
            onClick={closeStudioMenu}
            className="p-2 text-[#171717] hover:text-[#A85E43] transition-colors cursor-pointer"
            aria-label="Close studio menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 6-Column / 2-Grid Directory */}
        <div className="py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#A85E43] uppercase font-semibold block pb-1 border-b border-[#171717]/10">
                {section.title}
              </span>
              <ul className="space-y-2 font-sans text-xs">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      onClick={closeStudioMenu}
                      className="text-[#171717]/75 hover:text-[#A85E43] transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="pt-6 border-t border-[#171717]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[10px] text-[#171717]/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#A85E43]" />
            <span>&ldquo;Design begins with looking closely.&rdquo;</span>
          </div>

          <Link
            href="/custom"
            onClick={closeStudioMenu}
            className="text-[#171717] font-semibold hover:text-[#A85E43] transition-colors uppercase tracking-wider"
          >
            START A COMMISSION →
          </Link>
        </div>
      </div>
    </div>
  );
}
