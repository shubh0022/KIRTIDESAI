'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';
import Logo from '../ui/Logo';
import { useAtelier } from '@/context/AtelierContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openSearch, openWishlist, openBag, openAccount, wishlist, bagCount } = useAtelier();

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

  const primaryLinks = [
    { label: 'WORK', href: '/work' },
    { label: 'PROCESS', href: '/process' },
    { label: 'CRAFT', href: '/craft' },
    { label: 'EXPERIENCE', href: '/experience' },
    { label: 'ABOUT', href: '/about' },
    { label: 'ARCHIVE', href: '/archive' },
  ];

  const tabletLinks = [
    { label: 'WORK', href: '/work' },
    { label: 'PROCESS', href: '/process' },
    { label: 'CRAFT', href: '/craft' },
    { label: 'EXPERIENCE', href: '/experience' },
  ];

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
            className="hidden xl:flex items-center gap-7 2xl:gap-9"
            aria-label="Primary Navigation"
          >
            {primaryLinks.map((link) => {
              const isActive =
                (link.href === '/work' && (pathname === '/' || pathname === '/work' || pathname.startsWith('/work/'))) ||
                (link.href !== '/work' && (pathname === link.href || pathname.startsWith(`${link.href}/`)));

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
                (link.href === '/work' && (pathname === '/' || pathname === '/work' || pathname.startsWith('/work/'))) ||
                (link.href !== '/work' && (pathname === link.href || pathname.startsWith(`${link.href}/`)));

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

          {/* RIGHT: DESKTOP UTILITY ACTIONS (1200px+) */}
          <div className="hidden xl:flex items-center gap-5 2xl:gap-6 font-sans text-[11px] 2xl:text-xs tracking-[0.16em] uppercase font-medium text-[#171717]/80">
            {/* SEARCH */}
            <button
              onClick={openSearch}
              className="flex items-center gap-1.5 hover:text-[#A85E43] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A85E43] py-1"
              aria-label="Open search archive"
            >
              <Search className="w-3.5 h-3.5" />
              <span>SEARCH</span>
            </button>

            {/* SHOP */}
            <Link
              href="/shop"
              className={`hover:text-[#A85E43] transition-colors duration-200 py-1 ${
                pathname === '/shop' ? 'text-[#171717] font-semibold' : ''
              }`}
            >
              SHOP
            </Link>

            {/* CUSTOM */}
            <Link
              href="/custom"
              className={`hover:text-[#A85E43] transition-colors duration-200 py-1 ${
                pathname === '/custom' ? 'text-[#171717] font-semibold' : ''
              }`}
            >
              CUSTOM
            </Link>

            {/* WISHLIST ♡ */}
            <button
              onClick={openWishlist}
              className="relative flex items-center gap-1 hover:text-[#A85E43] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A85E43] py-1"
              aria-label={`Open wishlist with ${wishlist.length} items`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  wishlist.length > 0 ? 'text-[#A85E43] fill-[#A85E43]' : ''
                }`}
              />
              {wishlist.length > 0 && (
                <span className="font-mono text-[9px] text-[#A85E43] font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* BAG */}
            <button
              onClick={openBag}
              className="relative flex items-center gap-1 hover:text-[#A85E43] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A85E43] py-1"
              aria-label={`Open shopping bag with ${bagCount} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>BAG {bagCount > 0 ? `(${bagCount})` : ''}</span>
            </button>

            {/* ACCOUNT */}
            <button
              onClick={openAccount}
              className="flex items-center gap-1.5 hover:text-[#A85E43] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A85E43] py-1"
              aria-label="Open client account and concierge"
            >
              <User className="w-3.5 h-3.5" />
              <span>ACCOUNT</span>
            </button>
          </div>

          {/* RIGHT: TABLET & MOBILE UTILITY ACTIONS */}
          <div className="flex xl:hidden items-center gap-3 sm:gap-4 font-sans text-xs text-[#171717]">
            {/* Mobile / Tablet Search */}
            <button
              onClick={openSearch}
              className="p-2 hover:text-[#A85E43] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile / Tablet Wishlist */}
            <button
              onClick={openWishlist}
              className="p-2 hover:text-[#A85E43] transition-colors relative cursor-pointer"
              aria-label="Open wishlist"
            >
              <Heart
                className={`w-4 h-4 ${
                  wishlist.length > 0 ? 'text-[#A85E43] fill-[#A85E43]' : ''
                }`}
              />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#A85E43]" />
              )}
            </button>

            {/* Mobile / Tablet Bag */}
            <button
              onClick={openBag}
              className="p-2 hover:text-[#A85E43] transition-colors relative cursor-pointer"
              aria-label="Open bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {bagCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#A85E43]" />
              )}
            </button>

            {/* Mobile / Tablet Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:text-[#A85E43] transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Editorial Mobile / Tablet Navigation Panel */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPath={pathname}
      />
    </>
  );
}
