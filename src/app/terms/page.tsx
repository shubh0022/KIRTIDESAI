'use client';

import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { siteSettings } from '@/data/siteContent';

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
      <SectionHeader
        stamp="LEGAL & RIGHTS"
        stampValue="TERMS OF USE"
        title="Terms of Service"
        subtitle="Intellectual property, bespoke commission guidelines, and portfolio terms."
      />

      <div className="mt-12 space-y-8 font-sans text-sm text-[#171717]/80 leading-relaxed font-light">
        <section className="space-y-3">
          <h2 className="font-editorial-serif text-2xl text-[#171717] font-normal">
            01. Intellectual Property & Design Copyright
          </h2>
          <p>
            All garments, patterns, sketches, photographs, craft research documentation, and brand trademarks featured on this website are the intellectual property of Kirti Desai, unless otherwise cited. Unauthorized duplication, commercial reproduction, or re-distribution without explicit written permission is strictly prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-editorial-serif text-2xl text-[#171717] font-normal">
            02. Bespoke Commission & Fit Protocols
          </h2>
          <p>
            Custom garments and couture pieces are created on a made-to-order basis. Because each piece is drafted around individual anatomical specifications, production commences upon formal confirmation and material sourcing approval. Variations in natural dyes, handwoven Khadi textures, and artisanal embroidery are inherent characteristics of slow, handcrafted luxury.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-editorial-serif text-2xl text-[#171717] font-normal">
            03. Academic & Editorial Attribution
          </h2>
          <p>
            Academic projects produced during studies at Parul Institute of Design (Parul University) and runway presentations at Vadodara Fashion Week are showcased for professional portfolio and retrospective purposes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-editorial-serif text-2xl text-[#171717] font-normal">
            04. Contact & Inquiries
          </h2>
          <p>
            For design rights inquiries, licensing, or bespoke commissions, please contact{' '}
            <a href={`mailto:${siteSettings.email}`} className="text-[#A85E43] font-medium underline">
              {siteSettings.email}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
