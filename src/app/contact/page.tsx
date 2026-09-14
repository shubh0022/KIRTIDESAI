'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { siteSettings } from '@/data/siteContent';
import SectionHeader from '@/components/ui/SectionHeader';
import TechnicalStamp from '@/components/ui/TechnicalStamp';
import { InstagramIcon, LinkedinIcon } from '@/components/ui/SocialIcons';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    roleInterest: 'FASHION DESIGN',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.roleInterest,
          message: `${formData.organization ? `[Organization: ${formData.organization}]\n` : ''}${formData.message}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to submit inquiry.');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
    } catch {
      setErrorMessage('Network communication error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 sm:px-10 lg:px-14 xl:px-16 max-w-[1700px] mx-auto">
      <SectionHeader
        stamp="INITIATE CONVERSATION"
        stampValue="LET'S MAKE SOMETHING"
        title="Contact & Inquiries"
        subtitle="Open for design commissions, luxury atelier apprenticeships, runway collaborations, and academic reviews."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
        {/* Left Column: Direct Info & Editorial Statement */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <h1 className="font-editorial-serif text-5xl sm:text-6xl md:text-7xl text-[#171717] font-normal leading-[0.95] tracking-tight">
              Let&apos;s Make <br />
              <span className="italic font-light text-[#A85E43]">Something.</span>
            </h1>
            <div>
              <span className="font-editorial-serif text-2xl text-[#171717] block">
                KIRTI DESAI
              </span>
              <span className="font-sans text-xs tracking-[0.25em] text-[#171717]/80 uppercase block mt-0.5">
                Fashion Design
              </span>
              <span className="font-mono text-[10px] text-[#171717]/60 tracking-widest uppercase block mt-0.5">
                Craft · Research · Garment · Styling
              </span>
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-8 border border-[#171717]/15 space-y-6">
            <TechnicalStamp label="DIRECT CONTACT" value="KOLHAPUR, MAHARASHTRA" variant="clay" />

            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#A85E43] shrink-0" />
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="font-medium text-sm text-[#171717] hover:text-[#A85E43] transition-colors"
                >
                  {siteSettings.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#A85E43] shrink-0" />
                <span className="font-medium text-sm text-[#171717]">
                  {siteSettings.phone}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#A85E43] shrink-0" />
                <span className="font-medium text-sm text-[#171717]">
                  {siteSettings.location}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <InstagramIcon className="w-4 h-4 text-[#A85E43] shrink-0" />
                <a
                  href={siteSettings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-sm text-[#171717] hover:text-[#A85E43] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>@kirtidesai19</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#171717]/50" />
                </a>
              </div>

              <div className="flex items-center gap-3">
                <LinkedinIcon className="w-4 h-4 text-[#A85E43] shrink-0" />
                <a
                  href={siteSettings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-sm text-[#171717] hover:text-[#A85E43] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#171717]/50" />
                </a>
              </div>

              <div className="pt-2 border-t border-[#171717]/10">
                <span className="text-[10px] text-[#171717]/50 uppercase tracking-widest block mb-0.5">
                  ACADEMIC AFFILIATION
                </span>
                <span className="font-medium text-[#171717]">
                  Parul Institute of Design, Parul University (2023–2027)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Authentic Editorial Photograph */}
        <div className="lg:col-span-6">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto bg-[#FAF7F2] p-3.5 border border-[#171717]/15 shadow-xl group">
            <div className="relative w-full h-full overflow-hidden bg-[#E5D8C8]/40">
              <Image
                src="/images/hero/kirti-hero-editorial-desktop.webp"
                alt="Kirti Desai — Fashion Designer"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-contain object-bottom group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Form Section */}
      <div className="mt-16 pt-12 border-t border-[#171717]/10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#FAF7F2] p-8 sm:p-12 border border-[#171717]/15">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#A85E43] mx-auto" />
                <h3 className="font-editorial-serif text-3xl text-[#171717]">
                  Thank you for reaching out.
                </h3>
                <p className="font-sans text-sm text-[#171717]/75 max-w-md mx-auto font-light leading-relaxed">
                  Your inquiry has been recorded in the atelier registry. Kirti will review your project and respond promptly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs uppercase tracking-widest cursor-pointer transition-colors"
                >
                  SEND ANOTHER INQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-3 bg-[#A85E43]/10 border border-[#A85E43]/30 font-mono text-[11px] text-[#A85E43]">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label className="font-mono text-[10px] text-[#171717]/70 uppercase tracking-widest block mb-2 font-semibold">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rossi"
                    className="w-full bg-[#F4F0E8] border border-[#171717]/20 p-3.5 text-sm font-sans focus:outline-none focus:border-[#A85E43]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[10px] text-[#171717]/70 uppercase tracking-widest block mb-2 font-semibold">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. elena@atelier.com"
                      className="w-full bg-[#F4F0E8] border border-[#171717]/20 p-3.5 text-sm font-sans focus:outline-none focus:border-[#A85E43]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-[#171717]/70 uppercase tracking-widest block mb-2">
                      PHONE NUMBER (OPTIONAL)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 / International"
                      className="w-full bg-[#F4F0E8] border border-[#171717]/20 p-3.5 text-sm font-sans focus:outline-none focus:border-[#A85E43]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[10px] text-[#171717]/70 uppercase tracking-widest block mb-2">
                      ORGANIZATION / ATELIER
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Design Studio / Fashion House"
                      className="w-full bg-[#F4F0E8] border border-[#171717]/20 p-3.5 text-sm font-sans focus:outline-none focus:border-[#A85E43]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-[#171717]/70 uppercase tracking-widest block mb-2 font-semibold">
                      PROJECT CATEGORY *
                    </label>
                    <select
                      value={formData.roleInterest}
                      onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
                      className="w-full bg-[#F4F0E8] border border-[#171717]/20 p-3.5 text-xs font-mono uppercase focus:outline-none focus:border-[#A85E43]"
                    >
                      <option value="FASHION DESIGN">FASHION DESIGN</option>
                      <option value="COSTUME">COSTUME DESIGN</option>
                      <option value="STYLING">EDITORIAL STYLING</option>
                      <option value="CRAFT">CRAFT RESEARCH & STUDY</option>
                      <option value="RESEARCH">TEXTILE RESEARCH</option>
                      <option value="CUSTOM PROJECT">CUSTOM PROJECT / BESPOKE</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-[#171717]/70 uppercase tracking-widest block mb-2 font-semibold">
                    MESSAGE / PROJECT CONTEXT *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please outline the project timeline, scope, or commission details..."
                    className="w-full bg-[#F4F0E8] border border-[#171717]/20 p-3.5 text-sm font-sans focus:outline-none focus:border-[#A85E43]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-colors duration-300 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING INQUIRY...</span>
                  ) : (
                    <span>SEND INQUIRY →</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
