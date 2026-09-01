import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-24">
      <Logo variant="monogram" className="mb-8" />

      <span className="font-mono text-xs text-[#A95F45] tracking-[0.25em] uppercase font-semibold block mb-4">
        ERROR / 404
      </span>

      <h1 className="font-editorial-serif text-4xl sm:text-5xl md:text-6xl text-[#161616] font-normal tracking-tight">
        This page was never made.
      </h1>

      <p className="font-sans text-sm text-[#4A4A4A] mt-4 max-w-md font-light leading-relaxed">
        The requested pattern piece or archive path does not exist in Kirti Desai&apos;s digital studio.
      </p>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#161616] hover:bg-[#A95F45] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO STUDIO</span>
        </Link>
      </div>
    </div>
  );
}
