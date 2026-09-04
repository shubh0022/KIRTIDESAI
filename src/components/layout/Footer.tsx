'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { siteSettings } from '@/data/siteContent';
import Logo from '../ui/Logo';
import { LinkedinIcon, InstagramIcon } from '../ui/SocialIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#171717]/15 pt-16 pb-12 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#171717]/10">
          {/* Brand Identity & Logo */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="primary" size="md" href="/" />
            <p className="font-editorial-serif text-2xl text-[#171717] italic mt-3 max-w-sm">
              &ldquo;Design begins with looking closely.&rdquo;
            </p>
            <p className="font-sans text-xs text-[#171717]/70 max-w-sm leading-relaxed font-light">
              Official digital portfolio and bespoke atelier of Kirti Desai. Fashion design, living Indian craft research, anatomical corsetry, and sustainable handloom innovation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteSettings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#171717]/80 hover:text-[#A85E43] transition-colors border border-[#171717]/15 px-3 py-1.5 bg-[#FAF7F2] hover:border-[#A85E43]/40"
                aria-label="Instagram Profile @kirtidesai19"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#A85E43]" />
                <span>@kirtidesai19</span>
              </a>
              <a
                href={siteSettings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#171717]/80 hover:text-[#A85E43] transition-colors border border-[#171717]/15 px-3 py-1.5 bg-[#FAF7F2] hover:border-[#A85E43]/40"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#A85E43]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Primary Editorial Navigation */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[10px] text-[#A85E43] tracking-[0.25em] uppercase font-semibold block mb-2">
              PORTFOLIO CHAPTERS
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/work" className="text-[#171717]/75 hover:text-[#A85E43] transition-colors">
                  SELECTED WORK
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-[#171717]/75 hover:text-[#A85E43] transition-colors">
                  HOW I MAKE (PROCESS)
                </Link>
              </li>
              <li>
                <Link href="/craft" className="text-[#171717]/75 hover:text-[#A85E43] transition-colors">
                  CRAFT STUDIES
                </Link>
              </li>
              <li>
                <Link href="/experience" className="text-[#171717]/75 hover:text-[#A85E43] transition-colors">
                  EXPERIENCE & RUNWAYS
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#171717]/75 hover:text-[#A85E43] transition-colors">
                  ABOUT KIRTI
                </Link>
              </li>
              <li>
                <Link href="/archive" className="text-[#171717]/75 hover:text-[#A85E43] transition-colors">
                  CHRONOLOGY ARCHIVE
                </Link>
              </li>
              <li>
                <Link href="/visual-diary" className="text-[#171717]/75 hover:text-[#A85E43] transition-colors">
                  VISUAL DIARY
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio, Shop & Inquiries */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-[10px] text-[#A85E43] tracking-[0.25em] uppercase font-semibold block mb-2">
              CLIENT & ATELIER
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/custom" className="text-[#171717] hover:text-[#A85E43] font-semibold transition-colors inline-flex items-center gap-1">
                  <span>CUSTOM & BESPOKE COMMISSIONS</span>
                  <ArrowUpRight className="w-3 h-3 text-[#A85E43]" />
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-[#171717]/75 hover:text-[#A85E43] transition-colors inline-flex items-center gap-1">
                  <span>CAPSULE SHOP PREVIEW</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-[#171717]/75 hover:text-[#A85E43] transition-colors inline-flex items-center gap-1">
                  <span>SAVED ARCHIVE (WISHLIST)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-[#171717]/75 hover:text-[#A85E43] transition-colors inline-flex items-center gap-1">
                  <span>CLIENT CONCIERGE & ACCOUNT</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#171717]/75 hover:text-[#A85E43] transition-colors inline-flex items-center gap-1">
                  <span>CLIENT FAQ & SIZING</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>

            <div className="pt-4 mt-4 border-t border-[#171717]/10 space-y-1 text-[#171717]/80 text-[11px]">
              <p className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-[#A85E43]" />
                <a href={`mailto:${siteSettings.email}`} className="hover:text-[#A85E43] transition-colors">
                  {siteSettings.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-[#A85E43]" />
                <span>{siteSettings.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-[#A85E43]" />
                <span>{siteSettings.location}</span>
              </p>
              <div className="pt-2 mt-2 border-t border-[#171717]/10 flex items-center gap-3 text-[10px] uppercase tracking-wider font-mono">
                <a
                  href={siteSettings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#A85E43] inline-flex items-center gap-1 transition-colors"
                >
                  <InstagramIcon className="w-3 h-3 text-[#A85E43]" />
                  <span>Instagram</span>
                </a>
                <span className="text-[#171717]/30">·</span>
                <a
                  href={siteSettings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#A85E43] inline-flex items-center gap-1 transition-colors"
                >
                  <LinkedinIcon className="w-3 h-3 text-[#A85E43]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#171717]/50 uppercase tracking-widest">
          <div>
            <span>© {currentYear} KIRTI DESAI · ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#A85E43] transition-colors">
              PRIVACY POLICY
            </Link>
            <Link href="/terms" className="hover:text-[#A85E43] transition-colors">
              TERMS OF SERVICE
            </Link>
            <Link href="/admin" className="hover:text-[#A85E43] transition-colors">
              ATELIER CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
