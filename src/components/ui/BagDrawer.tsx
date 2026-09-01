'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, X, Trash2, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAtelier } from '@/context/AtelierContext';

export default function BagDrawer() {
  const { isBagOpen, closeBag, bag, removeFromBag, clearBag, bagCount } = useAtelier();

  useEffect(() => {
    if (isBagOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBagOpen]);

  if (!isBagOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100000] bg-black/40 backdrop-blur-xs flex justify-end animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Your Atelier Shopping Bag"
      onClick={closeBag}
    >
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#171717]/15 p-6 sm:p-8 animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="pb-5 border-b border-[#171717]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-4 h-4 text-[#A85E43]" />
            <span className="font-editorial-serif text-2xl text-[#171717]">
              Atelier Bag ({bagCount})
            </span>
          </div>

          <button
            onClick={closeBag}
            className="p-1.5 text-[#171717] hover:text-[#A85E43] transition-colors cursor-pointer"
            aria-label="Close shopping bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bag Content */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          {bag.length > 0 ? (
            bag.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white/80 border border-[#171717]/10 flex items-center gap-4"
              >
                <div className="relative w-16 h-20 bg-[#E5D8C8]/40 shrink-0 overflow-hidden border border-[#171717]/10">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#A85E43] block">
                    {item.category}
                  </span>
                  <h4 className="font-editorial-serif text-base text-[#171717] truncate">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2 font-mono text-xs text-[#171717]/80">
                    <span>Qty: {item.quantity}</span>
                    <span className="font-semibold text-[#171717]">{item.price || 'Made to Order'}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromBag(item.id)}
                  className="p-2 text-[#171717]/40 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#E5D8C8]/40 flex items-center justify-center text-[#A85E43]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-editorial-serif text-2xl text-[#171717]">
                Your bag is empty.
              </h3>
              <p className="font-sans text-xs text-[#171717]/70 max-w-xs mx-auto leading-relaxed">
                Kirti Desai couture garments, artisanal Khadi pieces, and bespoke silhouettes are produced in limited, made-to-order cycles.
              </p>

              <div className="pt-3 border-t border-[#171717]/10 max-w-xs mx-auto text-left space-y-2">
                <div className="p-3 bg-[#E5D8C8]/30 border border-[#171717]/10 font-mono text-[11px] text-[#171717]/80 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#A85E43] shrink-0 mt-0.5" />
                  <span>
                    Bespoke commissions and individual client fittings are handled directly through the Custom studio.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#171717]/10 space-y-3">
          <Link
            href="/custom"
            onClick={closeBag}
            className="w-full flex items-center justify-center gap-2 p-3.5 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-colors"
          >
            <span>COMMISSION BESPOKE GARMENT</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            href="/shop"
            onClick={closeBag}
            className="w-full flex items-center justify-center gap-2 p-3 border border-[#171717]/20 hover:border-[#171717] text-[#171717] font-mono text-xs tracking-widest uppercase transition-colors"
          >
            <span>VIEW CAPSULE SHOP PREVIEW</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
