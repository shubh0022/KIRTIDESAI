'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, X, Trash2, ArrowUpRight, Sparkles } from 'lucide-react';
import { useAtelier } from '@/context/AtelierContext';

export default function WishlistDrawer() {
  const { isWishlistOpen, closeWishlist, wishlist, toggleWishlist, clearWishlist } =
    useAtelier();

  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isWishlistOpen]);

  if (!isWishlistOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100000] bg-black/40 backdrop-blur-xs flex justify-end animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Your Curated Wishlist"
      onClick={closeWishlist}
    >
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#171717]/15 p-6 sm:p-8 animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="pb-5 border-b border-[#171717]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-4 h-4 text-[#A85E43] fill-[#A85E43]" />
            <span className="font-editorial-serif text-2xl text-[#171717]">
              Saved Archive ({wishlist.length})
            </span>
          </div>

          <button
            onClick={closeWishlist}
            className="p-1.5 text-[#171717] hover:text-[#A85E43] transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="group p-3 bg-white/70 border border-[#171717]/10 flex items-center gap-4 hover:border-[#A85E43] transition-colors"
              >
                {item.image && (
                  <div className="relative w-16 h-20 bg-[#E5D8C8]/40 shrink-0 overflow-hidden border border-[#171717]/10">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] font-semibold block">
                    {item.category}
                  </span>
                  <h4 className="font-editorial-serif text-base text-[#171717] truncate mt-0.5">
                    {item.title}
                  </h4>
                  <Link
                    href={item.href}
                    onClick={closeWishlist}
                    className="inline-flex items-center gap-1 font-mono text-[10px] text-[#171717]/70 hover:text-[#A85E43] transition-colors uppercase tracking-wider mt-2"
                  >
                    <span>VIEW PIECE</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>

                <button
                  onClick={() => toggleWishlist(item)}
                  className="p-2 text-[#171717]/40 hover:text-red-600 transition-colors"
                  aria-label={`Remove ${item.title} from wishlist`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#E5D8C8]/40 flex items-center justify-center text-[#A85E43]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-editorial-serif text-2xl text-[#171717]">
                Your wishlist is empty.
              </h3>
              <p className="font-sans text-xs text-[#171717]/70 max-w-xs mx-auto leading-relaxed">
                Save projects, silhouettes, and craft explorations while browsing the atelier.
              </p>
              <div className="pt-2">
                <Link
                  href="/work"
                  onClick={closeWishlist}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-colors"
                >
                  <span>EXPLORE SELECTED WORK</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {wishlist.length > 0 && (
          <div className="pt-4 border-t border-[#171717]/10 space-y-3">
            <button
              onClick={clearWishlist}
              className="w-full py-2 text-center font-mono text-[10px] text-[#171717]/60 hover:text-red-600 tracking-widest uppercase transition-colors"
            >
              CLEAR ALL SAVED PIECES
            </button>
            <Link
              href="/custom"
              onClick={closeWishlist}
              className="w-full flex items-center justify-center gap-2 p-3.5 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-colors"
            >
              <span>INQUIRE BESPOKE COMMISSION</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
