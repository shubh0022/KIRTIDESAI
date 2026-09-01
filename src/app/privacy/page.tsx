import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#161616]/70 hover:text-[#A95F45] uppercase transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO STUDIO</span>
      </Link>

      <SectionHeader
        stamp="LEGAL"
        stampValue="PRIVACY & RIGHTS"
        title="Privacy Policy & Terms"
        subtitle="Last updated: 2026 · Official digital portfolio of Kirti Desai."
      />

      <div className="bg-[#FAF7F2] p-8 md:p-12 border border-[#161616]/15 space-y-6 font-sans text-sm text-[#4A4A4A] leading-relaxed font-light">
        <h3 className="font-editorial-serif text-2xl text-[#161616] font-normal">
          Intellectual Property & Design Ownership
        </h3>
        <p>
          All original fashion designs, pattern drafting illustrations, garment photography, textile research documentation, and written content presented on this website are the intellectual property of Kirti Desai unless explicitly stated otherwise.
        </p>

        <h3 className="font-editorial-serif text-2xl text-[#161616] font-normal pt-4 border-t border-[#161616]/10">
          Inquiry Data & Confidentiality
        </h3>
        <p>
          Information submitted through the contact inquiry form is transmitted solely for professional communication regarding design internships, recruitment, and project collaborations. Contact details are never sold, traded, or shared with third parties.
        </p>
      </div>
    </div>
  );
}
