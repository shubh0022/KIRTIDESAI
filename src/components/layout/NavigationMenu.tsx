'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  X,
  ArrowUpRight,
  Search,
  ShoppingBag,
  Heart,
  User,
  Scissors,
  Sparkles,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import Logo from '../ui/Logo';
import { siteSettings } from '@/data/siteContent';
import { useAtelier } from '@/context/AtelierContext';
import { InstagramIcon, LinkedinIcon } from '@/components/ui/SocialIcons';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export default function NavigationMenu({
  isOpen,
  onClose,
  currentPath,
  triggerRef,
}: NavigationMenuProps) {
  const { openSearch, openWishlist, openBag, openAccount, wishlist, bagCount } = useAtelier();
  const menuRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Handle ESC key, focus trapping, and body scroll locking
  useEffect(() => {
    if (!isOpen) return;

    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus trapping
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initial focus on first interactive element or close button
    const timer = setTimeout(() => {
      if (menuRef.current) {
        const closeBtn = menuRef.current.querySelector<HTMLButtonElement>('[data-autofocus="true"]');
        if (closeBtn) {
          closeBtn.focus();
        } else {
          const firstInteractive = menuRef.current.querySelector<HTMLElement>('button, [href]');
          firstInteractive?.focus();
        }
      }
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);

      // Restore focus to trigger button
      if (triggerRef?.current) {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  // Primary Editorial Chapters
  const primaryLinks = [
    { label: 'WORK', number: '01', href: '/work', desc: 'Selected couture & studio collections' },
    { label: 'PROCESS', number: '02', href: '/process', desc: 'Methodology from observe to expression' },
    { label: 'CRAFT', number: '03', href: '/craft', desc: 'Living Indian textile research & lac' },
    { label: 'EXPERIENCE', number: '04', href: '/experience', desc: 'Atelier apprenticeships & runways' },
    { label: 'ABOUT', number: '05', href: '/about', desc: 'Designer credentials & philosophy' },
    { label: 'CONTACT', number: '06', href: '/contact', desc: 'Inquiries, commissions & collaborations' },
  ];

  // Secondary Commerce & Utility Actions
  const utilityItems = [
    {
      id: 'search',
      label: 'SEARCH',
      sublabel: 'Archive & collections lookup',
      icon: Search,
      action: () => {
        onClose();
        openSearch();
      },
      badge: null,
    },
    {
      id: 'shop',
      label: 'SHOP',
      sublabel: 'Bespoke capsule preview',
      href: '/shop',
      badge: 'PREVIEW',
    },
    {
      id: 'custom',
      label: 'CUSTOM',
      sublabel: 'Bespoke corsetry & commissions',
      href: '/custom',
      badge: 'ATELIER',
    },
    {
      id: 'wishlist',
      label: 'WISHLIST',
      sublabel: 'Saved garments & material archive',
      icon: Heart,
      action: () => {
        onClose();
        openWishlist();
      },
      badge: wishlist.length > 0 ? `${wishlist.length} SAVED` : null,
      activeIconColor: wishlist.length > 0,
    },
    {
      id: 'bag',
      label: 'BAG',
      sublabel: 'Client orders & commission bag',
      icon: ShoppingBag,
      action: () => {
        onClose();
        openBag();
      },
      badge: bagCount > 0 ? `${bagCount} ITEMS` : null,
      activeIconColor: bagCount > 0,
    },
    {
      id: 'account',
      label: 'ACCOUNT',
      sublabel: 'Client concierge & sizing portal',
      icon: User,
      action: () => {
        onClose();
        openAccount();
      },
      badge: null,
    },
  ];

  // Additional exploratory links
  const auxiliaryLinks = [
    { label: 'MY ATELIER (CLIENT)', href: '/account' },
    { label: 'ATELIER CONTROL (ADMIN)', href: '/admin' },
    { label: 'VISUAL DIARY', href: '/visual-diary' },
    { label: 'FIELD JOURNAL', href: '/journal' },
    { label: 'CHRONOLOGY ARCHIVE', href: '/archive' },
    { label: 'CLIENT FAQ & SIZING', href: '/faq' },
    { label: 'PRINTABLE RESUME', href: '/resume' },
  ];

  // Animation variants
  const premiumEase = [0.16, 1, 0.3, 1] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.35,
        ease: premiumEase,
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.25,
        ease: premiumEase,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.35,
        ease: premiumEase,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100000] flex flex-col justify-between"
          id="fullscreen-navigation-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation Menu"
          ref={menuRef}
        >
          {/* Backdrop Blur & Solid Parchment Base */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#161616]/40 backdrop-blur-sm -z-20"
            aria-hidden="true"
          />

          {/* Main Elevated Modal Sheet */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full h-full bg-[#F4F0E8] text-[#171717] flex flex-col justify-between overflow-y-auto"
          >
            {/* 1. TOP HEADER: LOGO & CLOSE BUTTON */}
            <div className="shrink-0 border-b border-[#171717]/10 bg-[#F4F0E8]/95 backdrop-blur-md sticky top-0 z-30 px-6 sm:px-10 lg:px-16 py-5 flex items-center justify-between">
              {/* Brand Logo & Editorial Monogram */}
              <div className="flex items-center gap-4">
                <Logo variant="primary" size="md" href="/" onClick={onClose} />
                <div className="hidden md:block pl-2 border-l border-[#171717]/15">
                  <span className="font-mono text-[9px] tracking-[0.28em] text-[#A85E43] uppercase font-semibold block leading-none">
                    FASHION ATELIER
                  </span>
                  <span className="font-editorial-serif text-lg text-[#171717] tracking-wide mt-0.5 block">
                    Kirti Desai
                  </span>
                </div>
              </div>

              {/* Close (X) Button */}
              <button
                type="button"
                data-autofocus="true"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="group flex items-center gap-3 px-3.5 py-2 border border-[#171717]/15 hover:border-[#A85E43] bg-[#FAF7F2] hover:bg-[#A85E43] text-[#171717] hover:text-[#FAF7F2] transition-all duration-250 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A85E43]"
              >
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.24em] uppercase font-semibold">
                  CLOSE
                </span>
                <X className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* 2. MAIN BODY: DUAL EDITORIAL & COMMERCE COLUMNS */}
            <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 my-auto">
              {/* LEFT COLUMN: PRIMARY EDITORIAL NAVIGATION */}
              <nav className="lg:col-span-7 space-y-6" aria-label="Primary Chapters">
                <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
                  <span className="font-mono text-[10px] tracking-[0.28em] text-[#A85E43] uppercase font-semibold">
                    PORTFOLIO CHAPTERS
                  </span>
                  <span className="font-mono text-[10px] text-[#171717]/40 tracking-widest">
                    01 — 06
                  </span>
                </div>

                <div className="space-y-2">
                  {primaryLinks.map((link) => {
                    const isActive =
                      (link.href === '/work' &&
                        (currentPath === '/' || currentPath === '/work' || currentPath.startsWith('/work/'))) ||
                      (link.href !== '/work' &&
                        (currentPath === link.href || currentPath.startsWith(`${link.href}/`)));

                    return (
                      <motion.div key={link.label} variants={itemVariants}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="group flex items-baseline justify-between py-2 border-b border-transparent hover:border-[#171717]/10 transition-colors"
                        >
                          <div className="flex items-baseline gap-4 sm:gap-7">
                            <span className="font-mono text-xs sm:text-sm text-[#A85E43] font-semibold tracking-wider">
                              {link.number}
                            </span>
                            <div>
                              <span
                                className={`font-editorial-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight leading-[1.05] transition-colors ${
                                  isActive
                                    ? 'text-[#A85E43] italic font-normal'
                                    : 'text-[#171717] group-hover:text-[#A85E43]'
                                }`}
                              >
                                {link.label}
                              </span>
                              <span className="hidden sm:block font-sans text-xs text-[#171717]/50 font-light mt-0.5 group-hover:text-[#171717]/80 transition-colors">
                                {link.desc}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {isActive && (
                              <span className="font-mono text-[9px] tracking-widest text-[#A85E43] uppercase bg-[#A85E43]/10 px-2 py-0.5 rounded-sm">
                                CURRENT
                              </span>
                            )}
                            <ArrowUpRight className="w-5 h-5 text-[#171717]/25 group-hover:text-[#A85E43] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              {/* RIGHT COLUMN: ATELIER COMMERCE, CLIENT SUITE & UTILITIES */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-10 lg:pl-8 lg:border-l lg:border-[#171717]/10">
                {/* Utility / Commerce Grid */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10">
                    <span className="font-mono text-[10px] tracking-[0.28em] text-[#A85E43] uppercase font-semibold">
                      ATELIER SERVICES & COMMERCE
                    </span>
                    <span className="font-mono text-[10px] text-[#171717]/40 tracking-widest">
                      SUITE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {utilityItems.map((item) => {
                      const IconComponent = item.icon;

                      if (item.action) {
                        return (
                          <motion.button
                            key={item.id}
                            variants={itemVariants}
                            type="button"
                            onClick={item.action}
                            className="p-4 bg-[#FAF7F2] border border-[#171717]/12 hover:border-[#A85E43] hover:shadow-sm text-left transition-all duration-200 cursor-pointer group flex flex-col justify-between min-h-[96px]"
                          >
                            <div className="flex items-center justify-between w-full">
                              {IconComponent && (
                                <IconComponent
                                  className={`w-4 h-4 transition-colors ${
                                    item.activeIconColor
                                      ? 'text-[#A85E43] fill-[#A85E43]'
                                      : 'text-[#171717]/70 group-hover:text-[#A85E43]'
                                  }`}
                                />
                              )}
                              {item.badge && (
                                <span className="font-mono text-[9px] font-semibold text-[#A85E43] bg-[#A85E43]/10 px-1.5 py-0.5 rounded-sm tracking-wider">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#171717] group-hover:text-[#A85E43] transition-colors block">
                                {item.label}
                              </span>
                              <span className="font-sans text-[11px] text-[#171717]/60 block mt-0.5">
                                {item.sublabel}
                              </span>
                            </div>
                          </motion.button>
                        );
                      }

                      return (
                        <motion.div key={item.id} variants={itemVariants}>
                          <Link
                            href={item.href || '#'}
                            onClick={onClose}
                            className="p-4 bg-[#FAF7F2] border border-[#171717]/12 hover:border-[#A85E43] hover:shadow-sm text-left transition-all duration-200 block group min-h-[96px] flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#A85E43]" />
                              {item.badge && (
                                <span className="font-mono text-[9px] font-semibold text-[#A85E43] bg-[#A85E43]/10 px-1.5 py-0.5 rounded-sm tracking-wider">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#171717] group-hover:text-[#A85E43] transition-colors block">
                                {item.label}
                              </span>
                              <span className="font-sans text-[11px] text-[#171717]/60 block mt-0.5">
                                {item.sublabel}
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Auxiliary Directory & Curated Archive */}
                <div className="space-y-3 pt-2">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#171717]/50 uppercase font-semibold block">
                    CURATED ARCHIVE & STUDIO LOGS
                  </span>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 font-mono text-xs text-[#171717]/75">
                    {auxiliaryLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={onClose}
                        className="py-1 hover:text-[#A85E43] transition-colors flex items-center justify-between group"
                      >
                        <span className="truncate">{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. FOOTER STRIP: SOCIALS, EMAIL, AND DIRECT CONTACT */}
            <div className="shrink-0 border-t border-[#171717]/10 bg-[#FAF7F2] px-6 sm:px-10 lg:px-16 py-6 font-mono text-xs text-[#171717]/80">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                {/* Left: Direct Contact Information */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="hover:text-[#A85E43] transition-colors inline-flex items-center gap-2 font-medium"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#A85E43]" />
                    <span>{siteSettings.email}</span>
                  </a>

                  <span className="text-[#171717]/20 hidden sm:inline">·</span>

                  <span className="inline-flex items-center gap-2 text-[#171717]/70">
                    <Phone className="w-3.5 h-3.5 text-[#A85E43]" />
                    <span>{siteSettings.phone}</span>
                  </span>

                  <span className="text-[#171717]/20 hidden sm:inline">·</span>

                  <span className="inline-flex items-center gap-2 text-[#171717]/70">
                    <MapPin className="w-3.5 h-3.5 text-[#A85E43]" />
                    <span>{siteSettings.location}</span>
                  </span>
                </div>

                {/* Right: Social Profiles & Academic Institution */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={siteSettings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F0E8] border border-[#171717]/15 hover:border-[#A85E43] hover:text-[#A85E43] transition-colors"
                    aria-label="Instagram Profile @kirtidesai19"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-[#A85E43]" />
                    <span>@kirtidesai19</span>
                  </a>

                  <a
                    href={siteSettings.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F0E8] border border-[#171717]/15 hover:border-[#A85E43] hover:text-[#A85E43] transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-[#A85E43]" />
                    <span>LinkedIn</span>
                  </a>

                  <span className="text-[10px] text-[#171717]/50 uppercase tracking-widest pl-2 hidden lg:inline">
                    {siteSettings.academicInstitute}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
