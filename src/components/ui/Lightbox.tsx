'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { VisualDiaryItem } from '@/types';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: VisualDiaryItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}: LightboxProps) {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#161616]/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-[#FAF7F2] pb-4 border-b border-white/10 z-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#A95F45] tracking-widest uppercase font-semibold">
            {currentItem.category}
          </span>
          <span className="text-white/30">/</span>
          <span className="font-mono text-xs text-white/70">
            {currentIndex + 1} OF {items.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Area */}
      <div className="relative flex-1 flex items-center justify-center py-6 my-auto">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-6 z-20 p-3 bg-black/40 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 md:right-6 z-20 p-3 bg-black/40 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="relative max-h-[75vh] max-w-[85vw] h-full w-full flex items-center justify-center">
          <Image
            src={currentItem.src}
            alt={currentItem.alt}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Bottom Caption */}
      <div className="text-center text-[#FAF7F2] pt-4 border-t border-white/10 z-10 max-w-2xl mx-auto">
        <h3 className="font-editorial-serif text-2xl text-[#FAF7F2] font-normal">
          {currentItem.title}
        </h3>
        <p className="font-mono text-xs text-white/60 uppercase tracking-widest mt-1">
          {currentItem.roleTag}
        </p>
      </div>
    </div>
  );
}
