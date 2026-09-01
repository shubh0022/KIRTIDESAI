'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, Sparkles, Send, Scissors, Ruler, Layers, Clock, ShieldCheck } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import TechnicalStamp from '@/components/ui/TechnicalStamp';
import { siteSettings } from '@/data/siteContent';

export default function CustomPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Bespoke Garment & Corsetry',
    occasion: '',
    timeline: 'Within 4-8 Weeks',
    budget: 'INR 25,000 – 50,000',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const bespokePillars = [
    {
      number: '01',
      title: 'BESPOKE CORSETRY',
      desc: 'Anatomical pattern drafting engineered around individual body tension lines, featuring premium boning channels and artisanal hand finishes.',
      icon: Scissors,
    },
    {
      number: '02',
      title: 'CUSTOM GARMENT',
      desc: 'One-of-one tailored silhouettes engineered from sustainable handloom Khadi, natural dyed silks, and structured outerwear.',
      icon: Ruler,
    },
    {
      number: '03',
      title: 'EDITORIAL STYLING',
      desc: 'Creative direction, runway backstage styling, and curated wardrobe concepts for high-profile events and editorial shoots.',
      icon: Sparkles,
    },
    {
      number: '04',
      title: 'SPECIAL OCCASION',
      desc: 'Bespoke red carpet, gala, and bridal occasion wear harmonizing classical Indian crafts with contemporary architectural forms.',
      icon: Layers,
    },
    {
      number: '05',
      title: 'BRAND COLLABORATION',
      desc: 'Capsule collection co-creation, sustainable handloom consultancy, and design partnership with luxury fashion houses.',
      icon: ShieldCheck,
    },
    {
      number: '06',
      title: 'DESIGN COMMISSION',
      desc: 'Wearable art installations, sculptural tactile garments, and museum/gallery research exhibitions.',
      icon: Clock,
    },
  ];

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <SectionHeader
        stamp="MADE TO ORDER"
        stampValue="BESPOKE ATELIER"
        title="Custom & Bespoke"
        subtitle="Made around the person, the occasion and the idea."
      />

      {/* Main Grid: Editorial Statement + Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
        {/* Left Column: Pillars & Philosophy */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <h2 className="font-editorial-serif text-4xl sm:text-5xl text-[#171717] font-normal leading-[1.05]">
              Every garment begins with <br />
              <span className="italic font-light text-[#A85E43]">an intimate dialogue.</span>
            </h2>
            <p className="font-sans text-sm text-[#171717]/80 leading-relaxed font-light">
              Unlike mass-manufactured fashion, custom commissions at Kirti Desai are developed through meticulous body measurements, multiple muslin toile fittings, and deliberate material selections honoring living craft traditions.
            </p>
          </div>

          {/* Pillars List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bespokePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="p-5 bg-[#FAF7F2] border border-[#171717]/12 space-y-2 hover:border-[#A85E43] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#A85E43]">
                      {pillar.number}
                    </span>
                    <Icon className="w-4 h-4 text-[#171717]/40" />
                  </div>
                  <h3 className="font-editorial-serif text-lg text-[#171717]">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs text-[#171717]/70 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Direct Atelier Details */}
          <div className="p-6 bg-[#E5D8C8]/30 border border-[#171717]/15 space-y-3 font-mono text-xs text-[#171717]/80">
            <span className="text-[10px] text-[#A85E43] uppercase tracking-widest font-semibold block">
              ATELIER SERVICE DIRECTORY
            </span>
            <div className="space-y-1.5 text-[11px]">
              <p>· Primary Fitting Location: {siteSettings.location}</p>
              <p>· Lead Time: 3 to 6 weeks depending on handcraft complexity</p>
              <p>· Direct Inquiries: {siteSettings.email}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Bespoke Inquiry Form */}
        <div className="lg:col-span-6 bg-[#FAF7F2] p-8 sm:p-10 border border-[#171717]/15 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#171717]/10">
            <div>
              <span className="font-mono text-[9px] text-[#A85E43] uppercase tracking-widest font-semibold block">
                COMMISSION APPLICATION
              </span>
              <h3 className="font-editorial-serif text-2xl text-[#171717]">
                Start a Conversation
              </h3>
            </div>
            <TechnicalStamp label="STATUS" value="OPEN FOR COMMISSIONS" variant="clay" />
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#E5D8C8]/50 flex items-center justify-center text-[#A85E43]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-editorial-serif text-2xl text-[#171717]">
                Commission Brief Received
              </h4>
              <p className="font-sans text-xs text-[#171717]/75 max-w-sm mx-auto leading-relaxed">
                Thank you, {formState.name}. Kirti Desai will review your requirements and respond within 24 to 48 hours to schedule a consultation.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 bg-[#171717] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase hover:bg-[#A85E43] transition-colors"
              >
                SUBMIT ANOTHER BRIEF
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[10px] text-[#171717]/70 uppercase tracking-widest mb-1.5">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. Elena Rossi"
                  className="w-full p-3 bg-white/80 border border-[#171717]/20 focus:border-[#A85E43] text-sm text-[#171717] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-[#171717]/70 uppercase tracking-widest mb-1.5">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="elena@atelier.com"
                    className="w-full p-3 bg-white/80 border border-[#171717]/20 focus:border-[#A85E43] text-sm text-[#171717] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#171717]/70 uppercase tracking-widest mb-1.5">
                    PHONE / WHATSAPP
                  </label>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full p-3 bg-white/80 border border-[#171717]/20 focus:border-[#A85E43] text-sm text-[#171717] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-[#171717]/70 uppercase tracking-widest mb-1.5">
                    PROJECT TYPE *
                  </label>
                  <select
                    value={formState.projectType}
                    onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                    className="w-full p-3 bg-white/80 border border-[#171717]/20 focus:border-[#A85E43] text-xs text-[#171717] focus:outline-none"
                  >
                    <option>Bespoke Garment & Corsetry</option>
                    <option>Sustainable Khadi Capsule</option>
                    <option>Red Carpet / Gala Occasion</option>
                    <option>Runway / Editorial Styling</option>
                    <option>Brand Co-Creation & Commission</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-[#171717]/70 uppercase tracking-widest mb-1.5">
                    PREFERRED TIMELINE
                  </label>
                  <select
                    value={formState.timeline}
                    onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                    className="w-full p-3 bg-white/80 border border-[#171717]/20 focus:border-[#A85E43] text-xs text-[#171717] focus:outline-none"
                  >
                    <option>Urgent (Within 2-3 Weeks)</option>
                    <option>Within 4-8 Weeks</option>
                    <option>Flexible / Advance Season</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-[#171717]/70 uppercase tracking-widest mb-1.5">
                  COMMISSION DETAILS & DESIGN VISION *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your desired silhouette, fabric preferences, occasion dates, or inspirations..."
                  className="w-full p-3 bg-white/80 border border-[#171717]/20 focus:border-[#A85E43] text-xs text-[#171717] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-all duration-250 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>SEND BESPOKE INQUIRY</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
