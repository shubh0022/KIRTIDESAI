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
    organization: '',
    roleInterest: 'INTERNSHIP',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeader
        stamp="INITIATE CONVERSATION"
        stampValue="LET'S MAKE SOMETHING"
        title="Contact & Inquiries"
        subtitle="Open for design internships, luxury atelier apprenticeships, runway collaborations, and academic reviews."
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

        {/* Right Column: Authentic Editorial Red Dress Photograph (Matching Screen 09) */}
        <div className="lg:col-span-6">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto bg-[#FAF7F2] p-3.5 border border-[#171717]/15 shadow-xl group">
            <div className="relative w-full h-full overflow-hidden bg-[#E5D8C8]/40">
              <Image
                src="/images/portrait/kirti-portrait-red-shoulder.jpg"
                alt="Kirti Desai — Fashion Designer"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
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
                <CheckCircle2 className="w-12 h-12 text-[#A95F45] mx-auto" />
                <h3 className="font-editorial-serif text-3xl text-[#161616]">
                  Thank you for reaching out.
                </h3>
                <p className="font-sans text-sm text-[#4A4A4A] max-w-md mx-auto font-light leading-relaxed">
                  Your message has been recorded. Kirti will review your inquiry and respond promptly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-[#161616] text-[#FAF7F2] font-mono text-xs uppercase tracking-widest cursor-pointer"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-mono text-[10px] text-[#161616]/60 uppercase tracking-widest block mb-2">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rossi"
                    className="w-full bg-[#F4F0E8] border border-[#161616]/15 p-3.5 text-sm font-sans focus:outline-none focus:border-[#A95F45]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[10px] text-[#161616]/60 uppercase tracking-widest block mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. elena@atelier.com"
                      className="w-full bg-[#F4F0E8] border border-[#161616]/15 p-3.5 text-sm font-sans focus:outline-none focus:border-[#A95F45]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-[#161616]/60 uppercase tracking-widest block mb-2">
                      ORGANIZATION / ATELIER
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Design Studio / Fashion House"
                      className="w-full bg-[#F4F0E8] border border-[#161616]/15 p-3.5 text-sm font-sans focus:outline-none focus:border-[#A95F45]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-[#161616]/60 uppercase tracking-widest block mb-2">
                    NATURE OF INQUIRY
                  </label>
                  <select
                    value={formData.roleInterest}
                    onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
                    className="w-full bg-[#F4F0E8] border border-[#161616]/15 p-3.5 text-xs font-mono uppercase focus:outline-none focus:border-[#A95F45]"
                  >
                    <option value="INTERNSHIP">FASHION DESIGN INTERNSHIP</option>
                    <option value="APPRENTICESHIP">ATELIER APPRENTICESHIP</option>
                    <option value="RUNWAY">RUNWAY / STYLING COLLABORATION</option>
                    <option value="ACADEMIC">ACADEMIC / JURY REVIEW</option>
                    <option value="OTHER">GENERAL INQUIRY</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-[#161616]/60 uppercase tracking-widest block mb-2">
                    MESSAGE / PROJECT CONTEXT *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please outline the project timeline, role scope, or opportunity details..."
                    className="w-full bg-[#F4F0E8] border border-[#161616]/15 p-3.5 text-sm font-sans focus:outline-none focus:border-[#A95F45]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#161616] hover:bg-[#A95F45] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-colors duration-300 cursor-pointer"
                >
                  TRANSMIT INQUIRY
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
