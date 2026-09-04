'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, X, ArrowUpRight, ShieldCheck, Heart, FolderCheck, Mail, Sparkles } from 'lucide-react';
import { useAtelier } from '@/context/AtelierContext';
import { siteSettings } from '@/data/siteContent';

export default function AccountDrawer() {
  const { isAccountOpen, closeAccount, wishlist, openWishlist } = useAtelier();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isAccountOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsSubmitted(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAccountOpen]);

  if (!isAccountOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100000] bg-black/40 backdrop-blur-xs flex justify-end animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Client Concierge & Account"
      onClick={closeAccount}
    >
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#171717]/15 p-6 sm:p-8 animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="pb-5 border-b border-[#171717]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-[#A85E43]" />
            <span className="font-editorial-serif text-2xl text-[#171717]">
              Client Concierge
            </span>
          </div>

          <button
            onClick={closeAccount}
            className="p-1.5 text-[#171717] hover:text-[#A85E43] transition-colors cursor-pointer"
            aria-label="Close client concierge"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {/* Quick Shortcuts */}
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <button
              onClick={() => {
                closeAccount();
                openWishlist();
              }}
              className="p-4 bg-white/70 border border-[#171717]/10 hover:border-[#A85E43] text-left transition-colors cursor-pointer"
            >
              <Heart className="w-4 h-4 text-[#A85E43] mb-2" />
              <span className="font-semibold text-[#171717] block">Saved Work</span>
              <span className="text-[10px] text-[#171717]/60">{wishlist.length} items saved</span>
            </button>

            <Link
              href="/custom"
              onClick={closeAccount}
              className="p-4 bg-white/70 border border-[#171717]/10 hover:border-[#A85E43] text-left transition-colors"
            >
              <FolderCheck className="w-4 h-4 text-[#A85E43] mb-2" />
              <span className="font-semibold text-[#171717] block">Custom Inquiry</span>
              <span className="text-[10px] text-[#171717]/60">Bespoke Couture</span>
            </Link>
          </div>

          {/* Client Sign In / Access Portal */}
          <div className="p-6 bg-[#E5D8C8]/30 border border-[#171717]/10 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A85E43]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#A85E43] font-semibold">
                PRIVATE CLIENT PORTAL
              </span>
            </div>

            <h3 className="font-editorial-serif text-xl text-[#171717]">
              Atelier Client Access
            </h3>
            <p className="font-sans text-xs text-[#171717]/70 leading-relaxed">
              Enter your email to access custom fitting records, bespoke production updates, and direct stylist consultations.
            </p>

            {isSubmitted ? (
              <div className="p-3 bg-[#FAF7F2] border border-[#A85E43]/40 text-xs font-mono text-[#A85E43] space-y-1">
                <p className="font-semibold">Access Link Sent</p>
                <p className="text-[11px] text-[#171717]/70">
                  We have dispatched a private concierge magic link to {email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@fashionhouse.com"
                  className="w-full p-3 bg-[#FAF7F2] border border-[#171717]/20 focus:border-[#A85E43] text-xs font-mono text-[#171717] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-colors"
                >
                  REQUEST CONCIERGE ACCESS
                </button>
              </form>
            )}
          </div>

          {/* Atelier Direct Contact */}
          <div className="pt-2 border-t border-[#171717]/10 space-y-2 font-mono text-xs text-[#171717]/80">
            <span className="text-[10px] text-[#A85E43] tracking-widest uppercase font-semibold block">
              DIRECT ATELIER LIAISON
            </span>
            <div className="space-y-1 text-[11px]">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A85E43]" />
                <a href={`mailto:${siteSettings.email}`} className="hover:text-[#A85E43]">
                  {siteSettings.email}
                </a>
              </p>
              <p className="flex items-center gap-2 text-[#171717]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A85E43]" />
                <span>{siteSettings.location}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="pt-4 border-t border-[#171717]/10 space-y-2">
          <Link
            href="/account"
            onClick={closeAccount}
            className="w-full flex items-center justify-center gap-2 p-3.5 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-colors"
          >
            <span>ENTER MY ATELIER CONCIERGE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/contact"
            onClick={closeAccount}
            className="w-full flex items-center justify-center gap-2 p-2.5 border border-[#171717]/20 hover:border-[#171717] text-[#171717] font-mono text-xs tracking-widest uppercase transition-colors"
          >
            <span>CONTACT ATELIER DIRECTLY</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
