'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ArrowUpRight, Trash2, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { useAtelier } from '@/context/AtelierContext';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, clearWishlist } = useAtelier();

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeader
        stamp="CURATED COLLECTION"
        stampValue={`SAVED PIECES (${wishlist.length})`}
        title="Saved Archive"
        subtitle="Your personalized selection of garments, craft studies, and visual diary looks."
      />

      {wishlist.length > 0 ? (
        <div className="mt-12 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#171717]/10">
            <span className="font-mono text-xs text-[#171717]/60 uppercase tracking-widest">
              {wishlist.length} ITEMS SAVED IN ATELIER MEMORY
            </span>
            <button
              onClick={clearWishlist}
              className="font-mono text-xs text-[#171717]/60 hover:text-red-600 uppercase tracking-widest transition-colors cursor-pointer"
            >
              CLEAR ALL
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="group bg-[#FAF7F2] border border-[#171717]/12 flex flex-col justify-between hover:border-[#A85E43] transition-colors"
              >
                {item.image && (
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E5D8C8]/40 border-b border-[#171717]/10">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold block">
                      {item.category}
                    </span>
                    <h3 className="font-editorial-serif text-2xl text-[#171717] group-hover:text-[#A85E43] transition-colors mt-1">
                      {item.title}
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-[#171717]/10 flex items-center justify-between font-mono text-xs">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-[#171717] hover:text-[#A85E43] uppercase tracking-wider font-semibold"
                    >
                      <span>VIEW PIECE</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => toggleWishlist(item)}
                      className="p-2 text-[#171717]/40 hover:text-red-600 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 bg-[#E5D8C8]/30 border border-[#171717]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="font-editorial-serif text-2xl text-[#171717]">
                Ready to bring a silhouette to life?
              </h3>
              <p className="font-sans text-xs text-[#171717]/70">
                Inquire about custom fittings, bespoke pattern drafting, or made-to-order commissions.
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
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#E5D8C8]/40 flex items-center justify-center text-[#A85E43]">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-editorial-serif text-3xl text-[#171717]">
            Your saved archive is empty.
          </h3>
          <p className="font-sans text-sm text-[#171717]/70 leading-relaxed">
            Click the <span className="text-[#A85E43]">♡</span> button on any project, craft study, or capsule look to save it here for inspiration.
          </p>
          <div className="pt-2">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-colors"
            >
              <span>EXPLORE SELECTED WORK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
