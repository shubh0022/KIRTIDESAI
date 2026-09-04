'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, User } from 'lucide-react';
import NavigationMenu from './NavigationMenu';
import HamburgerButton from './HamburgerButton';
import Logo from '../ui/Logo';
import { useAtelier } from '@/context/AtelierContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openSearch, openWishlist, openBag, openAccount, wishlist, bagCount } = useAtelier();
  const desktopTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Primary navigation links for Desktop (Exact specification)
  const primaryLinks = [
    { label: 'WORK', href: '/work' },
    { label: 'COLLECTION', href: '/collection' },
    { label: 'STYLING', href: '/craft' },
    { label: 'ATELIER', href: '/process' },
    { label: 'JOURNAL', href: '/journal' },
    { label: 'ABOUT', href: '/about' },
  ];

  // Tablet navigation links (condensed)
  const tabletLinks = [
    { label: 'WORK', href: '/work' },
    { label: 'COLLECTION', href: '/collection' },
    { label: 'STYLING', href: '/craft' },
    { label: 'ATELIER', href: '/process' },
  ];

  const handleToggleMenu = (isDesktop: boolean) => {
    setIsNavMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-[#F4F0E8] transition-all duration-300 ${
          isScrolled
            ? 'border-b border-[#171717]/8 shadow-[0_2px_12px_rgba(23,23,23,0.03)]'
            : 'border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 h-[72px] lg:h-[88px] flex items-center justify-between">
          {/* LEFT: BRAND CIRCULAR KD EMBLEM */}
          <div className="shrink-0 flex items-center">
            <Logo variant="primary" size="md" href="/" />
          </div>

          {/* CENTER: DESKTOP PRIMARY EDITORIAL NAVIGATION (1200px+) */}
          <nav
            className="hidden xl:flex items-center gap-7 2xl:gap-8"
            aria-label="Primary Navigation"
          >
            {primaryLinks.map((link) => {
              const isActive =
                link.href === '/work'
                  ? pathname === '/work' || pathname.startsWith('/work/')
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative font-sans text-[11px] 2xl:text-xs tracking-[0.18em] uppercase font-medium transition-colors duration-250 py-1 flex flex-col items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A85E43] ${
                    isActive
                      ? 'text-[#171717] font-semibold'
                      : 'text-[#171717]/75 hover:text-[#171717]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      className="absolute -bottom-[6px] w-[32px] h-[1.5px] bg-[#A85E43] transition-all duration-250"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CENTER-LEFT: TABLET NAVIGATION (768px - 1199px) */}
          <nav
            className="hidden md:flex xl:hidden items-center gap-5 lg:gap-6"
            aria-label="Tablet Navigation"
          >
            {tabletLinks.map((link) => {
              const isActive =
                link.href === '/work'
                  ? pathname === '/work' || pathname.startsWith('/work/')
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative font-sans text-[11px] tracking-[0.16em] uppercase font-medium transition-colors duration-250 py-1 flex flex-col items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A85E43] ${
                    isActive
                      ? 'text-[#171717] font-semibold'
                      : 'text-[#171717]/75 hover:text-[#171717]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      className="absolute -bottom-[6px] w-[28px] h-[1.5px] bg-[#A85E43]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: DESKTOP UTILITY & 3-LINE HAMBURGER MENU (1200px+) */}
          <div className="hidden xl:flex items-center gap-6 font-sans text-[11px] 2xl:text-xs tracking-[0.16em] uppercase font-medium text-[#171717]/80">
            {/* SEARCH */}
            <button
              type="button"
              onClick={openSearch}
              className="flex items-center gap-1.5 hover:text-[#A85E43] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A85E43] py-1"
              aria-label="Open search archive"
            >
              <Search className="w-3.5 h-3.5" />
              <span>SEARCH</span>
            </button>

            {/* DESKTOP 3-LINE ANIMATED HAMBURGER MENU BUTTON (CONTAINS ALL OPTIONS) */}
            <HamburgerButton
              isOpen={isNavMenuOpen}
              onClick={() => handleToggleMenu(true)}
              ariaControls="fullscreen-navigation-menu"
              showLabel={true}
            />
          </div>

          {/* RIGHT: TABLET & MOBILE UTILITY ACTIONS */}
          <div className="flex xl:hidden items-center gap-2 sm:gap-3 font-sans text-xs text-[#171717]">
            {/* Mobile / Tablet Search */}
            <button
              type="button"
              onClick={openSearch}
              className="p-2 hover:text-[#A85E43] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile / Tablet Animated 3-Line Hamburger */}
            <HamburgerButton
              isOpen={isNavMenuOpen}
              onClick={() => handleToggleMenu(false)}
              ariaControls="fullscreen-navigation-menu"
              showLabel={false}
            />
          </div>
        </div>
      </header>

      {/* Modern Fullscreen / Comprehensive Navigation Menu */}
      <NavigationMenu
        isOpen={isNavMenuOpen}
        onClose={() => setIsNavMenuOpen(false)}
        currentPath={pathname}
        triggerRef={desktopTriggerRef}
      />
    </>
  );
}
