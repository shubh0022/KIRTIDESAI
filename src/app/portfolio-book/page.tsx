'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Grid, Printer, BookOpen, Layers } from 'lucide-react';
import { portfolioSpreads } from '@/data/portfolioPages';
import TechnicalStamp from '@/components/ui/TechnicalStamp';
import Logo from '@/components/ui/Logo';

export default function PortfolioBookPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isGridView, setIsGridView] = useState<boolean>(false);

  const totalPages = portfolioSpreads.length;
  const currentSpread = portfolioSpreads[currentPage - 1];

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-between">
      {/* Top Controls Bar */}
      <div className="no-print pb-6 border-b border-[#161616]/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#161616]/70 hover:text-[#A95F45] uppercase transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO STUDIO</span>
          </Link>
          <span className="text-[#161616]/20">|</span>
          <TechnicalStamp label="PUBLICATION" value="20-PAGE DIGITAL BOOK" variant="clay" />
        </div>

        {/* View toggles & print */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsGridView(!isGridView)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs tracking-widest uppercase border transition-colors cursor-pointer ${
              isGridView
                ? 'bg-[#161616] text-[#FAF7F2] border-[#161616]'
                : 'bg-[#FAF7F2] text-[#161616] border-[#161616]/20 hover:border-[#A95F45]'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{isGridView ? 'SPREAD VIEW' : 'PAGE INDEX'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs tracking-widest uppercase bg-[#FAF7F2] text-[#161616] border border-[#161616]/20 hover:border-[#A95F45] transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PRINT / SAVE PDF</span>
          </button>
        </div>
      </div>

      {/* Grid Overview Mode */}
      {isGridView ? (
        <div className="py-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-editorial-serif text-4xl text-[#161616]">
              20-Page Publication Index
            </h2>
            <p className="font-mono text-xs text-[#A95F45] uppercase tracking-widest mt-1">
              CLICK ANY PAGE SPREAD TO JUMP DIRECTLY
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {portfolioSpreads.map((spread) => (
              <button
                key={spread.pageNumber}
                onClick={() => {
                  setCurrentPage(spread.pageNumber);
                  setIsGridView(false);
                }}
                className={`p-3 text-left border transition-all flex flex-col justify-between aspect-[3/4] cursor-pointer ${
                  currentPage === spread.pageNumber
                    ? 'bg-[#FAF7F2] border-[#A95F45] ring-2 ring-[#A95F45]'
                    : 'bg-[#FAF7F2] border-[#161616]/10 hover:border-[#161616]/40'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[9px] text-[#161616]/60">
                  <span className="font-semibold text-[#A95F45]">
                    PAGE {spread.pageNumber < 10 ? `0${spread.pageNumber}` : spread.pageNumber}
                  </span>
                  <span>{spread.section}</span>
                </div>

                <div className="my-auto py-2">
                  <h4 className="font-editorial-serif text-sm text-[#161616] line-clamp-2 leading-tight">
                    {spread.headline}
                  </h4>
                </div>

                <div className="text-[8px] font-mono text-[#161616]/40 uppercase truncate">
                  {spread.pageTitle}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Single Spread Reader Mode */
        <div className="my-auto py-8">
          <div className="bg-[#FAF7F2] border border-[#161616]/20 shadow-[0_20px_60px_rgba(0,0,0,0.06)] min-h-[680px] p-6 sm:p-10 md:p-14 flex flex-col justify-between relative">
            {/* Header Stamp of Page */}
            <div className="pb-6 border-b border-[#161616]/10 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#A95F45]">
                  PAGE {currentSpread.pageNumber < 10 ? `0${currentSpread.pageNumber}` : currentSpread.pageNumber} / {totalPages}
                </span>
                <span className="text-[#161616]/30">·</span>
                <span className="text-[#161616]/60 uppercase tracking-widest">
                  {currentSpread.section}
                </span>
              </div>

              <div className="hidden sm:block text-[10px] text-[#161616]/40 uppercase tracking-widest">
                KIRTI DESAI · THE MAKING OF IDENTITY
              </div>
            </div>

            {/* Page Body Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-6 items-center">
              {/* Text Information Column */}
              <div className={currentSpread.image ? 'lg:col-span-6' : 'lg:col-span-12 max-w-3xl'}>
                {currentSpread.subhead && (
                  <span className="font-mono text-[10px] text-[#A95F45] tracking-[0.25em] uppercase font-semibold block mb-2">
                    {currentSpread.subhead}
                  </span>
                )}

                <h3 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl text-[#161616] font-normal leading-[1.08] tracking-tight">
                  {currentSpread.headline}
                </h3>

                {currentSpread.bodyText && (
                  <p className="font-sans text-sm sm:text-base text-[#4A4A4A] mt-6 font-light leading-relaxed whitespace-pre-line">
                    {currentSpread.bodyText}
                  </p>
                )}

                {/* Metadata List if available */}
                {currentSpread.metadata && (
                  <div className="mt-8 pt-6 border-t border-[#161616]/10 space-y-2 font-mono text-xs">
                    {currentSpread.metadata.map((m, mIdx) => (
                      <div key={mIdx} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                        <span className="text-[9px] text-[#161616]/50 uppercase tracking-widest sm:w-44">
                          {m.label}:
                        </span>
                        <span className="text-[#161616] font-medium">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Image Column */}
              {currentSpread.image && (
                <div className="lg:col-span-6">
                  <div className="relative aspect-[4/3] w-full bg-[#E5D8C8]/40 border border-[#161616]/15 overflow-hidden shadow-sm">
                    <Image
                      src={currentSpread.image}
                      alt={currentSpread.headline}
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                  {currentSpread.imageCaption && (
                    <p className="font-mono text-[10px] text-[#161616]/60 mt-2 px-1">
                      {currentSpread.imageCaption}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Spread Footer */}
            <div className="pt-6 border-t border-[#161616]/10 flex items-center justify-between font-mono text-xs">
              <span className="text-[10px] text-[#161616]/50 uppercase">
                {currentSpread.pageTitle}
              </span>
              <span className="font-semibold text-[#161616]">
                {currentSpread.pageNumber}
              </span>
            </div>
          </div>

          {/* Navigation Controls Below Book */}
          <div className="no-print mt-8 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#FAF7F2] border border-[#161616]/20 hover:border-[#161616] disabled:opacity-40 disabled:pointer-events-none font-mono text-xs tracking-widest uppercase transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREVIOUS PAGE</span>
            </button>

            <div className="font-mono text-xs text-[#161616]/70">
              PAGE <strong className="text-[#161616]">{currentPage}</strong> OF {totalPages}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#161616] hover:bg-[#A95F45] text-[#FAF7F2] disabled:opacity-40 disabled:pointer-events-none font-mono text-xs tracking-widest uppercase transition-colors cursor-pointer"
            >
              <span>NEXT PAGE</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
