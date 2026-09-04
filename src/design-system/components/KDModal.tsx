'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface KDModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  stamp?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export default function KDModal({
  isOpen,
  onClose,
  title,
  subtitle,
  stamp = 'ATELIER DIALOGUE',
  children,
  footer,
  maxWidth = 'md',
}: KDModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${maxWidthStyles[maxWidth]} bg-[#FAF7F2] border border-[#171717]/20 shadow-2xl overflow-hidden animate-fadeIn`}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#171717]/10 flex items-start justify-between gap-4">
          <div>
            {stamp && (
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#A85E43] font-semibold block mb-1">
                {stamp}
              </span>
            )}
            <h3 className="font-editorial-serif text-2xl text-[#171717] leading-tight">
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
            className="p-1.5 text-[#171717]/60 hover:text-[#A85E43] transition-colors cursor-pointer rounded-xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-4 sm:p-6 bg-[#F0EBE1]/60 border-t border-[#171717]/10 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
