'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  X,
  Maximize2,
  Sparkles,
  Info,
} from 'lucide-react';

interface RunwayLook {
  lookNumber: string;
  title: string;
  collection: string;
  season: string;
  silhouette: string;
  textile: string;
  craftDetails: string;
  image: string;
}

const RUNWAY_LOOKS: RunwayLook[] = [
  {
    lookNumber: 'LOOK 01',
    title: 'Anatomical Victorian Toile Corset',
    collection: 'CAPSULE 2025 · STRUCTURAL ARCHETYPES',
    season: 'Autumn / Winter 2025',
    silhouette: 'Hourglass / 12-Channel Steel Boned Structure',
    textile: 'Unbleached Heavy Gujarat Cotton Drill',
    craftDetails: 'Hand-stitched resham contrast binding with precision waist suppression curves.',
    image: '/images/projects/pattern-scissors-draft.jpg',
  },
  {
    lookNumber: 'LOOK 02',
    title: 'Draped Bodice Toile on Tailoring Mannequin',
    collection: 'ATELIER TOILE STUDIES',
    season: 'Autumn / Winter 2025',
    silhouette: 'Asymmetrical Bias Draping',
    textile: 'Pure Ecru Muslin & Cotton Toile',
    craftDetails: 'French curve shoulder suppression with bias-cut contouring across the upper torso.',
    image: '/images/projects/pattern-model-draping.jpg',
  },
  {
    lookNumber: 'LOOK 03',
    title: 'Sustainable Handspun Khadi Athleisure Ensemble',
    collection: 'WOVEN RESISTANCE',
    season: 'Spring / Summer 2025',
    silhouette: 'Relaxed Tailored Kimono Sleeve with Ergonomic Gussets',
    textile: '120-Count Wardha Handspun Khadi',
    craftDetails: 'Naturally fermented indigo bath dyeing paired with zero-waste pattern drafting.',
    image: '/images/projects/card-02-athleisure.jpg',
  },
  {
    lookNumber: 'LOOK 04',
    title: 'Indigenous Craft Exploration: Lac & Pipli Appliqué',
    collection: 'LIVING CRAFT ARCHIVES',
    season: 'Annual Craft Study 2025',
    silhouette: 'Modular Layered Vest with Heritage Border Inlays',
    textile: 'Jaipur Lac Lacquer Embellishments & Odisha Cotton Pipli',
    craftDetails: 'Direct artisan collaboration documenting traditional applique geometric motifs.',
    image: '/images/projects/card-03-craft.jpg',
  },
  {
    lookNumber: 'LOOK 05',
    title: 'Modular Reversible Production Jumpsuit',
    collection: 'COMMERCIAL APPAREL & MERCHANDISING',
    season: 'Autumn 2025',
    silhouette: 'Convertible Wide-Leg Overall with Detachable Bib',
    textile: 'Double-Weave Structured Twill',
    craftDetails: 'Engineered for dual-sided reversibility with enclosed French seams throughout.',
    image: '/images/projects/card-04-merchandising.jpg',
  },
  {
    lookNumber: 'LOOK 06',
    title: 'Wearable Art Expression: Death of Fear and Blood',
    collection: 'AVANT-GARDE DISCIPLINE',
    season: 'Conceptual Showcase 2025',
    silhouette: 'Sculptural Asymmetric Drape with Dramatic Crimson Volumes',
    textile: 'Raw Tussar Silk, Gauze & Hand-Frayed Crimson Georgette',
    craftDetails: 'Deconstructed corsetry with layered organic textile manipulations.',
    image: '/images/projects/card-05-wearable-art.jpg',
  },
];

export default function RunwayPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  const currentLook = RUNWAY_LOOKS[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % RUNWAY_LOOKS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + RUNWAY_LOOKS.length) % RUNWAY_LOOKS.length);
  }, []);

  // Keyboard navigation: Left/Right arrows and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Autoplay Timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, handleNext]);

  return (
    <div className="fixed inset-0 z-50 bg-[#171717] text-[#FAF7F2] flex flex-col justify-between overflow-hidden select-none">
      {/* Top Runway Navigation Bar */}
      <header className="w-full px-6 sm:px-10 py-5 flex items-center justify-between border-b border-white/10 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-editorial-serif text-xl sm:text-2xl tracking-wider text-white hover:text-[#A85E43] transition-colors"
          >
            KIRTI DESAI
          </Link>
          <span className="font-mono text-xs text-white/40">·</span>
          <span className="font-mono text-xs tracking-[0.25em] text-[#A85E43] uppercase">
            DIGITAL RUNWAY
          </span>
        </div>

        {/* Controls Cluster */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="flex items-center gap-2 px-3 py-1.5 border border-white/20 hover:border-[#A85E43] text-white hover:text-[#A85E43] transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Pause Runway' : 'Play Runway'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">AUTOPLAY</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsDetailOpen((d) => !d)}
            className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <Info className="w-4 h-4" />
            <span>DETAILS</span>
          </button>

          <Link
            href="/collections"
            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Exit Runway"
          >
            <X className="w-5 h-5" />
            <span className="hidden sm:inline">EXIT</span>
          </Link>
        </div>
      </header>

      {/* Main Runway Presentation Stage */}
      <main className="flex-1 relative flex items-center justify-center p-4 sm:p-8">
        <div className="relative w-full max-w-5xl h-full flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Main Visual Look Frame */}
          <div className="relative w-full max-w-md lg:max-w-lg aspect-[3/4] max-h-[75vh] overflow-hidden border border-white/10 bg-black/40 shadow-2xl">
            <Image
              src={currentLook.image}
              alt={currentLook.title}
              fill
              priority
              sizes="(max-width: 768px) 95vw, 600px"
              className="object-contain object-center transition-all duration-700"
            />

            {/* Sequence Watermark Overlay */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 font-mono text-[11px] tracking-[0.2em] text-[#A85E43] uppercase border border-white/10">
              {currentLook.lookNumber} / {RUNWAY_LOOKS.length < 10 ? `0${RUNWAY_LOOKS.length}` : RUNWAY_LOOKS.length}
            </div>
          </div>

          {/* Look Metadata & Editorial Anatomy */}
          {isDetailOpen && (
            <div className="w-full lg:w-96 flex flex-col justify-center space-y-4 text-left p-2">
              <div className="space-y-1">
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#A85E43] uppercase font-semibold block">
                  {currentLook.collection}
                </span>
                <span className="font-mono text-xs text-white/50 block">
                  {currentLook.season}
                </span>
              </div>

              <h2 className="font-editorial-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                {currentLook.title}
              </h2>

              <div className="pt-3 border-t border-white/10 space-y-3 font-mono text-[11px]">
                <div>
                  <span className="text-white/40 block tracking-wider uppercase">SILHOUETTE</span>
                  <span className="text-white/90">{currentLook.silhouette}</span>
                </div>
                <div>
                  <span className="text-white/40 block tracking-wider uppercase">TEXTILE ARCHITECTURE</span>
                  <span className="text-white/90">{currentLook.textile}</span>
                </div>
                <div>
                  <span className="text-white/40 block tracking-wider uppercase">ATELIER CRAFT</span>
                  <span className="text-white/80 font-sans text-xs leading-relaxed font-light">
                    {currentLook.craftDetails}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-[#A85E43] uppercase hover:underline"
                >
                  <span>VIEW FULL COLLECTION CAPSULE →</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Large Lateral Arrow Navigation */}
        <button
          onClick={handlePrev}
          aria-label="Previous Look"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/80 text-white hover:text-[#A85E43] border border-white/10 rounded-full transition-all cursor-pointer z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Look"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/80 text-white hover:text-[#A85E43] border border-white/10 rounded-full transition-all cursor-pointer z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </main>

      {/* Bottom Timeline & Look Selector Strip */}
      <footer className="w-full px-6 sm:px-10 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs z-20">
        <div className="flex items-center gap-2">
          {RUNWAY_LOOKS.map((look, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-[#A85E43]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Jump to ${look.lookNumber}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-4 text-white/50 text-[10px] tracking-widest uppercase">
          <span>USE KEYBOARD ARROWS [← →] TO NAVIGATE</span>
          <span>·</span>
          <span>PARUL UNIVERSITY ATELIER RUNWAY</span>
        </div>
      </footer>
    </div>
  );
}
