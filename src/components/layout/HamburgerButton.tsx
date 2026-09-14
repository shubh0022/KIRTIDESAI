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
      className={`group flex items-center gap-2 text-[#171717]/75 hover:text-[#171717] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A85E43] select-none py-1 ${className}`}
    >
      {showLabel && (
        <span className="font-sans text-[11px] lg:text-xs tracking-[0.2em] uppercase font-medium">
          {isOpen ? 'CLOSE' : 'MENU'}
        </span>
      )}

      <div className="relative w-4 h-3 flex flex-col justify-between items-center py-[0.5px]" aria-hidden="true">
        {/* Top Bar */}
        <span
          className={`w-4 h-[1.2px] bg-current transition-all duration-300 ease-in-out transform origin-center ${
            isOpen ? 'translate-y-[5px] rotate-45' : 'translate-y-0 rotate-0'
          }`}
        />

        {/* Middle Bar */}
        <span
          className={`w-4 h-[1.2px] bg-current transition-all duration-200 ease-in-out ${
            isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
          }`}
        />

        {/* Bottom Bar */}
        <span
          className={`w-4 h-[1.2px] bg-current transition-all duration-300 ease-in-out transform origin-center ${
            isOpen ? '-translate-y-[5px] -rotate-45' : 'translate-y-0 rotate-0'
          }`}
        />
      </div>
    </button>
  );
}
