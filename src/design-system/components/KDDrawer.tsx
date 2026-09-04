'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface KDDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  stamp?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function KDDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  stamp = 'ATELIER EXPANSION',
  children,
  footer,
  width = 'md',
}: KDDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-xl',
    xl: 'max-w-2xl',
  };

  return (
    <div
      className="fixed inset-0 z-[100000] bg-black/40 backdrop-blur-xs flex justify-end animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${widthStyles[width]} bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#171717]/15 animate-slideLeft`}
      >
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-[#171717]/10 flex items-start justify-between">
          <div>
            {stamp && (
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#A85E43] font-semibold block mb-1">
                {stamp}
              </span>
            )}
            <h3 className="font-editorial-serif text-2xl text-[#171717]">
              {title}
            </h3>
            {subtitle && (
              <p className="font-sans text-xs text-[#171717]/65 mt-1 font-light">
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#171717]/60 hover:text-[#A85E43] transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-6 bg-[#F0EBE1]/60 border-t border-[#171717]/10 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
