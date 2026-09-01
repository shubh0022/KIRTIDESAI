'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, ArrowUpRight, Heart, ShoppingBag, User, Sparkles } from 'lucide-react';
import Logo from '../ui/Logo';
import { siteSettings } from '@/data/siteContent';
import { useAtelier } from '@/context/AtelierContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export default function MobileMenu({ isOpen, onClose, currentPath }: MobileMenuProps) {
  const { openSearch, openWishlist, openBag, openAccount, wishlist, bagCount } = useAtelier();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const primaryLinks = [
    { label: 'WORK', number: '01', href: '/work' },
    { label: 'PROCESS', number: '02', href: '/process' },
    { label: 'CRAFT', number: '03', href: '/craft' },
    { label: 'EXPERIENCE', number: '04', href: '/experience' },
    { label: 'ABOUT', number: '05', href: '/about' },
    { label: 'ARCHIVE', number: '06', href: '/archive' },
  ];

  const secondaryLinks = [
    { label: 'SHOP', href: '/shop' },
    { label: 'CUSTOM', href: '/custom' },
    { label: 'VISUAL DIARY', href: '/visual-diary' },
    { label: 'FIELD JOURNAL', href: '/journal' },
    { label: '20-PAGE PORTFOLIO', href: '/portfolio-book' },
  ];

  const infoLinks = [
    { label: 'CONTACT', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'PRIVACY', href: '/privacy' },
    { label: 'TERMS', href: '/terms' },
    { label: 'RESUME', href: '/resume' },
  ];

  return (
    <div
      className="fixed inset-0 z-[100000] bg-[#F4F0E8] flex flex-col justify-between p-6 sm:p-10 animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#171717]/10">
        <div className="flex items-center gap-3">
          <Logo variant="primary" size="sm" href="/" onClick={onClose} />
          <div className="hidden sm:block">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#A85E43] uppercase font-semibold block">
              FASHION DESIGN ATELIER
            </span>
            <span className="font-editorial-serif text-lg text-[#171717]">
              KIRTI DESAI
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 p-2 text-[#171717] hover:text-[#A85E43] transition-colors cursor-pointer"
          aria-label="Close navigation"
        >
          <span className="font-mono text-[11px] tracking-widest uppercase text-[#171717]/60">
            CLOSE
          </span>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Grid: Editorial Primary Nav + Secondary Pathways */}
      <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Primary Editorial Navigation */}
        <nav className="lg:col-span-7 space-y-3" aria-label="Primary Navigation">
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#A85E43] uppercase font-semibold block mb-4">
            EDITORIAL CHAPTERS
          </span>

          {primaryLinks.map((link) => {
            const isActive =
              (link.href === '/work' && (currentPath === '/' || currentPath === '/work' || currentPath.startsWith('/work/'))) ||
              (link.href !== '/work' && (currentPath === link.href || currentPath.startsWith(`${link.href}/`)));

            return (
              <div key={link.label} className="group">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-baseline justify-between py-1.5 transition-colors"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="font-mono text-xs sm:text-sm text-[#A85E43] font-medium">
                      {link.number}
                    </span>
                    <span
                      className={`font-editorial-serif text-3xl sm:text-5xl md:text-6xl tracking-tight transition-colors ${
                        isActive
                          ? 'text-[#A85E43] italic font-normal'
                          : 'text-[#171717] group-hover:text-[#A85E43]'
                      }`}
                    >
                      {link.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#171717]/30 group-hover:text-[#A85E43] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Secondary & Client Pathways */}
        <div className="lg:col-span-5 space-y-8 lg:border-l lg:border-[#171717]/10 lg:pl-10">
          {/* Quick Utility Actions */}
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <button
              onClick={() => {
                onClose();
                openWishlist();
              }}
              className="p-4 bg-white/70 border border-[#171717]/10 hover:border-[#A85E43] text-left transition-colors cursor-pointer"
            >
              <Heart className="w-4 h-4 text-[#A85E43] mb-2" />
              <span className="font-semibold text-[#171717] block">Wishlist</span>
              <span className="text-[10px] text-[#171717]/60">{wishlist.length} saved</span>
            </button>

            <button
              onClick={() => {
                onClose();
                openAccount();
              }}
              className="p-4 bg-white/70 border border-[#171717]/10 hover:border-[#A85E43] text-left transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-[#A85E43] mb-2" />
              <span className="font-semibold text-[#171717] block">Account</span>
              <span className="text-[10px] text-[#171717]/60">Client Concierge</span>
            </button>
          </div>

          {/* Secondary Links */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#A85E43] uppercase font-semibold block">
              ATELIER DIRECTORY
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
              {secondaryLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="py-1.5 text-[#171717]/80 hover:text-[#A85E43] transition-colors flex items-center justify-between group"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Information Links */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#A85E43] uppercase font-semibold block">
              INFORMATION & LEGAL
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-[#171717]/70">
              {infoLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="hover:text-[#A85E43] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Contact Strip */}
      <div className="pt-6 border-t border-[#171717]/10 font-mono text-xs text-[#171717]/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[#A85E43] font-semibold block">{siteSettings.email}</span>
          <span className="text-[#171717]/60">{siteSettings.phone}</span>
        </div>
        <div className="text-left sm:text-right">
          <span className="block">{siteSettings.location}</span>
          <span className="text-[10px] text-[#171717]/50 uppercase tracking-widest">
            {siteSettings.academicInstitute}
          </span>
        </div>
      </div>
    </div>
  );
}
