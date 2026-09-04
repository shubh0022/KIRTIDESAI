'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { siteSettings } from '@/data/siteContent';
import { InstagramIcon, LinkedinIcon } from '@/components/ui/SocialIcons';

export default function ContactCTA() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#161616]/10" id="contact">
      {/* Index Stamp 09 / 09 */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs text-[#A95F45] tracking-[0.25em] font-semibold">
          09 / 09
        </span>
        <span className="w-8 h-[1px] bg-[#A95F45]/30" />
        <span className="font-mono text-[10px] text-[#161616]/60 tracking-widest uppercase">
          INITIATE CONVERSATION
        </span>
      </div>

      <div className="bg-[#161616] text-[#FAF7F2] p-8 sm:p-12 md:p-16 border border-[#161616] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs text-[#A95F45] tracking-[0.3em] uppercase font-semibold block mb-2">
              OPPORTUNITIES & COLLABORATIONS
            </span>
            <h2 className="font-editorial-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.05]">
              Let&apos;s shape new ideas together.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#FAF7F2]/70 mt-4 font-light max-w-xl leading-relaxed">
              Available for fashion design internships, luxury atelier apprenticeships, brand styling collaborations, and creative inquiries.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center space-y-4">
            <Link
              href="/contact"
              data-cursor="go"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#A95F45] hover:bg-[#884E33] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              <span>SEND AN INQUIRY</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href={`mailto:${siteSettings.email}`}
              className="font-mono text-xs text-[#FAF7F2]/80 hover:text-[#A95F45] transition-colors"
            >
              {siteSettings.email}
            </a>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={siteSettings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#FAF7F2]/70 hover:text-[#A95F45] transition-colors inline-flex items-center gap-1.5"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#A95F45]" />
                <span>@kirtidesai19</span>
              </a>
              <span className="text-[#FAF7F2]/30">·</span>
              <a
                href={siteSettings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#FAF7F2]/70 hover:text-[#A95F45] transition-colors inline-flex items-center gap-1.5"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#A95F45]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
