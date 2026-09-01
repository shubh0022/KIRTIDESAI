'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function EditorialPreloader() {
  const [fading, setFading] = useState(false);
  const [destroyed, setDestroyed] = useState(false);

  useEffect(() => {
    // Lock scroll during preloader display
    document.body.style.overflow = 'hidden';

    // Start graceful fade-out after 900ms
    const fadeTimer = setTimeout(() => {
      setFading(true);
      document.body.style.overflow = '';
    }, 900);

    // Completely unmount from DOM after transition completes
    const destroyTimer = setTimeout(() => {
      setDestroyed(true);
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(destroyTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (destroyed) return null;

  return (
    <div
      id="editorial-preloader"
      aria-hidden={fading ? 'true' : 'false'}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#F4F0E8] px-6 text-center select-none transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        fading
          ? 'opacity-0 pointer-events-none scale-[1.03] filter blur-[2px]'
          : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-sm">
        {/* Central Circular KD Brand Logo Mark */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.06)] animate-pulse-slow">
          <Image
            src="/brand/kirti-desai-kd-logo.png"
            alt="Kirti Desai Official Brand Mark"
            width={112}
            height={112}
            priority
            className="object-contain w-auto h-auto mx-auto"
          />
        </div>

        {/* Brand Name */}
        <h1 className="font-editorial-serif text-2xl sm:text-3xl text-[#171717] tracking-wider uppercase font-normal">
          KIRTI DESAI
        </h1>

        {/* Subtitle & Category */}
        <div className="space-y-1 mt-1.5">
          <span className="font-mono text-[10px] sm:text-[11px] text-[#A85E43] tracking-[0.3em] uppercase block font-medium">
            Fashion Design · Atelier
          </span>
          <span className="font-mono text-[9px] text-[#171717]/50 tracking-[0.2em] uppercase block">
            The Making of Identity
          </span>
        </div>

        {/* Terracotta Hairline Progress Indicator */}
        <div className="w-32 h-[1.5px] bg-[#171717]/10 mt-6 relative overflow-hidden rounded-full">
          <div className="h-full bg-[#A85E43] animate-preloader-progress" />
        </div>

        {/* Brand Motto */}
        <p className="font-editorial-serif italic text-[#171717]/60 text-xs sm:text-sm mt-5">
          &ldquo;Design begins with looking closely.&rdquo;
        </p>
      </div>
    </div>
  );
}
