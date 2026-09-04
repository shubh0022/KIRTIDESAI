'use client';

import React from 'react';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  ariaControls?: string;
  className?: string;
  showLabel?: boolean;
}

export default function HamburgerButton({
  isOpen,
  onClick,
  ariaControls = 'fullscreen-navigation-menu',
  className = '',
  showLabel = true,
}: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      aria-controls={ariaControls}
      className={`group flex items-center gap-2.5 p-2 text-[#171717] hover:text-[#A85E43] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A85E43] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F0E8] select-none ${className}`}
    >
      {showLabel && (
        <span className="font-mono text-[10px] 2xl:text-[11px] tracking-[0.22em] uppercase font-semibold text-[#171717]/80 group-hover:text-[#A85E43] transition-colors hidden sm:inline-block">
          {isOpen ? 'CLOSE' : 'MENU'}
        </span>
      )}

      <div className="relative w-5 h-4 flex flex-col justify-between items-center py-[1px]" aria-hidden="true">
        {/* Top Bar */}
        <span
          className={`w-5 h-[1.5px] bg-current rounded-full transition-all duration-300 ease-in-out transform origin-center ${
            isOpen ? 'translate-y-[6px] rotate-45' : 'translate-y-0 rotate-0'
          }`}
        />

        {/* Middle Bar */}
        <span
          className={`w-5 h-[1.5px] bg-current rounded-full transition-all duration-200 ease-in-out ${
            isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
          }`}
        />

        {/* Bottom Bar */}
        <span
          className={`w-5 h-[1.5px] bg-current rounded-full transition-all duration-300 ease-in-out transform origin-center ${
            isOpen ? '-translate-y-[6px] -rotate-45' : 'translate-y-0 rotate-0'
          }`}
        />
      </div>
    </button>
  );
}
