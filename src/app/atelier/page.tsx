'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Scissors, Ruler, ShieldCheck, Sparkles, User, Calendar } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function AtelierPage() {
  const atelierServices = [
    {
      step: '01',
      title: 'Bespoke Anatomical Corsetry',
      desc: 'Individualized pattern drafting engineered around natural skeletal contours, spiral steel boning, and heritage cotton toiles.',
      href: '/custom',
      cta: 'COMMISSION CORSET',
    },
    {
      step: '02',
      title: 'Private Virtual & In-Studio Fittings',
      desc: 'Comprehensive measurement mapping, muslin draping sessions, and personalized proportion adjustments.',
      href: '/account',
      cta: 'MY ATELIER PORTAL',
    },
    {
      step: '03',
      title: 'Living Handloom & Craft Sourcing',
      desc: 'Direct ethical partnerships with Indian artisans specializing in natural Lac dye, Pipli appliqué, and Bagh woodblock prints.',
      href: '/craft',
      cta: 'EXPLORE LIVING CRAFT',
    },
  ];

  return (
    <div className="min-h-screen pt-24 lg:pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-14 lg:mb-20">
        <SectionHeader
          stamp="COUTURE ATELIER"
          stampValue="BESPOKE · COMMISSIONS"
          title="The Couture Atelier"
          subtitle="Where anatomical precision meets living Indian craft traditions. Our bespoke studio develops one-of-a-kind silhouettes for discerning collectors."
        />
      </div>

      {/* Hero Editorial Display */}
      <div className="relative h-[380px] sm:h-[500px] bg-[#FAF7F2] border border-[#171717]/10 mb-16 overflow-hidden flex items-end p-8 sm:p-12">
        <Image
          src="/images/hero/kirti-hero-editorial-desktop.webp"
          alt="Kirti Desai Atelier Studio"
          fill
          className="object-cover object-top opacity-30"
          priority
        />
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="font-mono text-[10px] tracking-[0.28em] text-[#A85E43] uppercase font-semibold">
            EST. 2024 · GUJARAT / MAHARASHTRA
          </span>
          <h2 className="font-editorial-serif text-3xl sm:text-5xl text-[#171717] font-normal leading-tight">
            An Atelier Rooted in Slowness, Structure & Sincerity
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#171717]/80 font-light leading-relaxed">
            Every garment created in our atelier begins with raw calico toile draping and ends with an encrypted Digital Piece Passport guaranteeing textile provenance and bespoke fit accuracy.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/account"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-[0.2em] uppercase transition-colors"
            >
              <User className="w-4 h-4" />
              <span>ACCESS CLIENT PORTAL</span>
            </Link>
            <Link
              href="/custom"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#171717]/20 hover:border-[#171717] text-[#171717] font-mono text-xs tracking-[0.2em] uppercase transition-colors"
            >
              <span>BESPOKE INQUIRY</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Atelier Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {atelierServices.map((service) => (
          <div
            key={service.step}
            className="p-8 bg-[#FAF7F2] border border-[#171717]/10 flex flex-col justify-between space-y-6 hover:border-[#A85E43]/50 transition-colors"
          >
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#A85E43] tracking-[0.2em] font-semibold block">
                {service.step} / PILLAR
              </span>
              <h3 className="font-editorial-serif text-2xl text-[#171717] font-normal">
                {service.title}
              </h3>
              <p className="font-sans text-xs text-[#171717]/70 font-light leading-relaxed">
                {service.desc}
              </p>
            </div>
            <Link
              href={service.href}
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-[#171717] hover:text-[#A85E43] font-medium transition-colors"
            >
              <span>{service.cta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
