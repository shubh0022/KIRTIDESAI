'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus, ArrowUpRight, Sparkles, HelpCircle } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { siteSettings } from '@/data/siteContent';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the bespoke commission process work?',
      a: 'Every commission starts with an initial design dialogue where we discuss silhouette intent, occasions, and material preferences. We then take precise anatomical measurements, draft an individualized flat pattern, create a muslin toile sample for intermediate fitting, and construct the final garment by hand.',
    },
    {
      q: 'Where are fittings conducted and can I commission remotely?',
      a: `Primary in-person fittings take place in ${siteSettings.location}. For clients across India or international patrons, we provide a detailed anatomical measurement guide and conduct virtual toile fit sessions via video consultations.`,
    },
    {
      q: 'What is the standard production timeline for bespoke garments?',
      a: 'Bespoke corsetry and tailored garments typically take 3 to 6 weeks. Intricate artisanal craft commissions involving regional techniques (such as Pipli appliqué or handspun Khadi weaving) require 6 to 8 weeks depending on artisan lead cycles.',
    },
    {
      q: 'How do you source and select materials?',
      a: 'We prioritize natural, ethical, and handloom textiles—including certified pure Khadi from Rajasthan, handblock Bagh prints from Madhya Pradesh, and natural lac-dyed accents from Gujarat. Every fabric is selected for its drape memory and ecological lifecycle.',
    },
    {
      q: 'Are you open for fashion house apprenticeships or runway collaborations?',
      a: 'Yes. Kirti Desai actively collaborates with creative directors, stylists, and luxury ateliers for editorial photoshoots, runway presentations, and design apprenticeships.',
    },
  ];

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
      <SectionHeader
        stamp="CLIENT INQUIRIES"
        stampValue="ATELIER FAQ"
        title="Frequently Asked Questions"
        subtitle="Insights into our bespoke fittings, sustainable handlooms, lead times, and collaborative projects."
      />

      <div className="mt-12 divide-y divide-[#171717]/12 border-y border-[#171717]/12">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="py-6">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer focus-visible:outline-none"
              >
                <span className="font-editorial-serif text-xl sm:text-2xl text-[#171717] group-hover:text-[#A85E43] transition-colors leading-snug">
                  {faq.q}
                </span>
                <span className="p-2 border border-[#171717]/15 group-hover:border-[#A85E43] text-[#171717] group-hover:text-[#A85E43] transition-colors shrink-0">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="pt-4 font-sans text-sm text-[#171717]/80 leading-relaxed font-light max-w-3xl animate-fadeIn">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions CTA */}
      <div className="mt-16 p-8 bg-[#FAF7F2] border border-[#171717]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="font-editorial-serif text-2xl text-[#171717]">
            Have a specific custom inquiry?
          </h3>
          <p className="font-sans text-xs text-[#171717]/70">
            Reach out directly for personalized design consultations and bespoke sizing.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-colors shrink-0"
        >
          <span>CONTACT ATELIER</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
