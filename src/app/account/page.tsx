'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Heart, FolderCheck, Mail, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { useAtelier } from '@/context/AtelierContext';
import { siteSettings } from '@/data/siteContent';

export default function AccountPage() {
  const { wishlist } = useAtelier();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setIsSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
      <SectionHeader
        stamp="PRIVATE CLIENT PORTAL"
        stampValue="CONCIERGE ACCESS"
        title="Client Concierge & Account"
        subtitle="Manage custom commission records, fittings history, and saved design explorations."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12">
        {/* Left Column: Quick Portals */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 bg-[#FAF7F2] border border-[#171717]/15 space-y-4">
            <h3 className="font-editorial-serif text-2xl text-[#171717]">
              Atelier Services
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <Link
                href="/wishlist"
                className="p-4 bg-white/80 border border-[#171717]/10 hover:border-[#A85E43] flex items-center justify-between transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-[#A85E43]" />
                  <div>
                    <span className="font-semibold text-[#171717] block">Saved Work</span>
                    <span className="text-[10px] text-[#171717]/60">{wishlist.length} Items</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#171717]/40" />
              </Link>

              <Link
                href="/custom"
                className="p-4 bg-white/80 border border-[#171717]/10 hover:border-[#A85E43] flex items-center justify-between transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <FolderCheck className="w-4 h-4 text-[#A85E43]" />
                  <div>
                    <span className="font-semibold text-[#171717] block">Bespoke Inquiries</span>
                    <span className="text-[10px] text-[#171717]/60">Custom Commissions</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#171717]/40" />
              </Link>

              <Link
                href="/contact"
                className="p-4 bg-white/80 border border-[#171717]/10 hover:border-[#A85E43] flex items-center justify-between transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#A85E43]" />
                  <div>
                    <span className="font-semibold text-[#171717] block">Direct Consultation</span>
                    <span className="text-[10px] text-[#171717]/60">Book Appointment</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#171717]/40" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Concierge Login & Direct Support */}
        <div className="md:col-span-7 space-y-6">
          <div className="p-8 bg-[#FAF7F2] border border-[#171717]/15 space-y-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A85E43]" />
              <span className="font-mono text-[10px] text-[#A85E43] uppercase tracking-widest font-semibold">
                SECURE AUTHENTICATION
              </span>
            </div>

            <h3 className="font-editorial-serif text-3xl text-[#171717]">
              Client Access Link
            </h3>

            <p className="font-sans text-sm text-[#171717]/75 leading-relaxed font-light">
              Clients with active couture commissions or bespoke fitting appointments can access their private garment progress, toile fitting notes, and lookbooks.
            </p>

            {isSubmitted ? (
              <div className="p-4 bg-[#E5D8C8]/40 border border-[#A85E43]/40 text-xs font-mono text-[#A85E43] space-y-1">
                <p className="font-semibold">Access Link Dispatched</p>
                <p className="text-[#171717]/70">
                  Please check your inbox at <span className="font-medium">{email}</span> for your single-use concierge pass.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[10px] text-[#171717]/70 uppercase tracking-widest mb-1.5">
                    REGISTERED CLIENT EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@fashionhouse.com"
                    className="w-full p-3.5 bg-white/80 border border-[#171717]/20 focus:border-[#A85E43] text-sm text-[#171717] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] tracking-widest uppercase transition-colors cursor-pointer"
                >
                  SEND CONCIERGE MAGIC LINK
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
