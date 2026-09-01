'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles, ShieldCheck, Heart, ShoppingBag } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import TechnicalStamp from '@/components/ui/TechnicalStamp';
import { useAtelier } from '@/context/AtelierContext';
import { projects } from '@/data/projects';

export default function ShopPage() {
  const { toggleWishlist, isWishlisted, addToBag } = useAtelier();

  const capsulePieces = [
    {
      id: 'capsule-01',
      title: 'Victorian Corset Toile Edition',
      category: 'COUTURE CAPSULE',
      price: 'Made to Order',
      description: 'Waist-cinching structural corset featuring 12 internal spiral steel bones, pure cotton drill lining, and hand-embroidered contrast edge binding.',
      image: '/images/projects/pattern-scissors-draft.jpg',
      leadTime: '3–4 Weeks',
    },
    {
      id: 'capsule-02',
      title: 'Handloom Khadi Relaxed Blazer',
      category: 'SUSTAINABLE ATHLEISURE',
      price: 'Made to Order',
      description: 'Handspun natural off-white Khadi tailored with unstructured shoulders, horn buttons, and breathable Rajasthan handloom lining.',
      image: '/images/projects/card-02-athleisure.jpg',
      leadTime: '4–5 Weeks',
    },
    {
      id: 'capsule-03',
      title: 'Pipli Appliqué Statement Cape',
      category: 'ARTISANAL COLLABORATION',
      price: 'Bespoke Commission',
      description: 'Hand-appliquéd geometry crafted in collaboration with master artisans of Pipli, Odisha. Limited edition heirloom piece.',
      image: '/images/kirti/craft/pipli-work-study.jpg',
      leadTime: '6–8 Weeks',
    },
  ];

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeader
        stamp="CAPSULE COLLECTION"
        stampValue="MADE TO ORDER"
        title="Atelier Shop & Capsules"
        subtitle="Limited release handcrafted silhouettes and bespoke commissions made individually on order."
      />

      {/* Capsule Banner */}
      <div className="mt-10 p-6 sm:p-8 bg-[#FAF7F2] border border-[#171717]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#A85E43]" />
            <span className="font-mono text-[10px] text-[#A85E43] uppercase tracking-widest font-semibold">
              SLOW FASHION PHILOSOPHY
            </span>
          </div>
          <h2 className="font-editorial-serif text-2xl sm:text-3xl text-[#171717]">
            Crafted on Demand. Never Overproduced.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#171717]/75 leading-relaxed font-light">
            Every garment in our capsule is drafted, fitted, and tailored individually to eliminate textile waste and preserve artisanal integrity.
          </p>
        </div>

        <Link
          href="/custom"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-colors shrink-0"
        >
          <span>BESPOKE INQUIRY</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Capsule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {capsulePieces.map((piece) => {
          const wishlisted = isWishlisted(piece.id);

          return (
            <div
              key={piece.id}
              className="group bg-[#FAF7F2] border border-[#171717]/15 flex flex-col justify-between hover:border-[#A85E43] transition-all duration-250 shadow-xs"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E5D8C8]/40 border-b border-[#171717]/10">
                <Image
                  src={piece.image}
                  alt={piece.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />

                {/* Top Overlay Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 bg-[#FAF7F2]/90 backdrop-blur-xs font-mono text-[9px] uppercase tracking-widest text-[#171717] border border-[#171717]/10">
                    {piece.category}
                  </span>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist({
                        id: piece.id,
                        title: piece.title,
                        category: piece.category,
                        image: piece.image,
                        href: '/shop',
                      });
                    }}
                    className="p-2 bg-[#FAF7F2]/90 backdrop-blur-xs hover:bg-[#FAF7F2] text-[#171717] border border-[#171717]/10 transition-colors pointer-events-auto cursor-pointer"
                    aria-label={`Save ${piece.title} to wishlist`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        wishlisted ? 'text-[#A85E43] fill-[#A85E43]' : 'text-[#171717]/70'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#A85E43] uppercase tracking-wider font-semibold">
                    <span>{piece.price}</span>
                    <span className="text-[#171717]/50">{piece.leadTime}</span>
                  </div>

                  <h3 className="font-editorial-serif text-2xl text-[#171717] group-hover:text-[#A85E43] transition-colors leading-tight">
                    {piece.title}
                  </h3>

                  <p className="font-sans text-xs text-[#171717]/70 leading-relaxed font-light">
                    {piece.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#171717]/10 space-y-2 font-mono text-xs">
                  <Link
                    href="/custom"
                    className="w-full flex items-center justify-between p-3 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] tracking-widest uppercase transition-colors"
                  >
                    <span>COMMISSION THIS PIECE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() =>
                      addToBag({
                        id: piece.id,
                        title: piece.title,
                        price: piece.price,
                        image: piece.image,
                        category: piece.category,
                      })
                    }
                    className="w-full flex items-center justify-center gap-2 p-2.5 border border-[#171717]/20 hover:border-[#171717] text-[#171717] tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#A85E43]" />
                    <span>ADD TO BAG</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
