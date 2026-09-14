'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import NavigationMenu from './NavigationMenu';
import HamburgerButton from './HamburgerButton';
import Logo from '../ui/Logo';
import { useAtelier } from '@/context/AtelierContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const pathname = usePathname();
  const { openSearch } = useAtelier();
  const desktopTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Primary navigation chapters:
  // WORK · COLLECTION · STYLING · ATELIER · JOURNAL · ABOUT
  const navLinks = [
    { label: 'WORK', href: '/work' },
    { label: 'COLLECTION', href: '/collection' },
    { label: 'STYLING', href: '/styling' },
    { label: 'ATELIER', href: '/atelier' },
    { label: 'JOURNAL', href: '/journal' },
    { label: 'ABOUT', href: '/about' },
  ];

  // Resolve active chapter
  const activeLink = navLinks.find(
    (link) => pathname === link.href || pathname.startsWith(link.href + '/')
  );
  const activeHref = activeLink ? activeLink.href : null;

  // The indicator tracks hovered item in real-time, or rests on active page
  const currentIndicatorHref = hoveredHref || activeHref;

  const handleToggleMenu = () => {
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
        <div className="relative w-full max-w-[1750px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 h-[76px] lg:h-[84px] flex items-center justify-between">
          {/* FAR LEFT: BRAND CIRCULAR LOGO */}
          <div className="shrink-0 flex items-center z-10">
            <Logo
              variant="primary"
              size="sm"
              href="/"
              className="w-[54px] h-[54px] lg:w-[64px] lg:h-[64px]"
            />
          </div>

          {/* EXACT CENTER: EDITORIAL NAVIGATION CHAPTERS WITH MOVING INDICATOR */}
          <nav
            onMouseLeave={() => setHoveredHref(null)}
            className="hidden md:flex items-center gap-5 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-9 absolute left-1/2 -translate-x-1/2 py-2"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => {
              const isSelected = currentIndicatorHref === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredHref(link.href)}
                  data-cursor="go"
                  className="relative font-sans text-[11px] xl:text-xs tracking-[0.2em] uppercase transition-colors duration-200 whitespace-nowrap py-1.5 flex flex-col items-center group cursor-pointer"
                >
                  <span
                    className={`transition-colors duration-200 ${
                      isSelected
                        ? 'text-[#171717] font-semibold'
                        : 'text-[#171717]/75 hover:text-[#171717]'
                    }`}
                  >
                    {link.label}
                  </span>

                  {/* SLIDING / GLIDING TERRCOTTA INDICATOR BAR */}
                  {isSelected && (
                    <motion.span
                      layoutId="navbar-terracotta-indicator"
                      className="absolute -bottom-1 w-[28px] h-[2px] bg-[#A85E43]"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 30,
                        mass: 0.5,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* FAR RIGHT: SEARCH & 3-LINE HAMBURGER MENU */}
          <div className="flex items-center gap-6 sm:gap-7 lg:gap-8 shrink-0 z-10 ml-auto md:ml-0">
            {/* SEARCH */}
            <button
              type="button"
              onClick={openSearch}
              className="flex items-center gap-2 font-sans text-[11px] xl:text-xs tracking-[0.2em] uppercase font-medium text-[#171717]/75 hover:text-[#171717] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A85E43] py-1"
              aria-label="Open search archive"
            >
              <Search className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>SEARCH</span>
            </button>

            {/* MENU ☰ */}
            <HamburgerButton
              isOpen={isNavMenuOpen}
              onClick={handleToggleMenu}
              ariaControls="fullscreen-navigation-menu"
              showLabel={true}
            />
          </div>
        </div>
      </header>

      {/* Fullscreen Navigation Menu */}
      <NavigationMenu
        isOpen={isNavMenuOpen}
        onClose={() => setIsNavMenuOpen(false)}
        currentPath={pathname}
        triggerRef={desktopTriggerRef}
      />
    </>
  );
}
