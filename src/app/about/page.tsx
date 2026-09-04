'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, GraduationCap, MapPin, Mail, Phone, Scissors, CheckCircle2 } from 'lucide-react';
import { aboutMeContent, educationHistory, expertiseList, technicalSkills, languages, siteSettings } from '@/data/siteContent';
import SectionHeader from '@/components/ui/SectionHeader';
import TechnicalStamp from '@/components/ui/TechnicalStamp';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { InstagramIcon, LinkedinIcon } from '@/components/ui/SocialIcons';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-[#161616]/10">
        {/* Real Photograph */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src="/images/portrait/kirti-portrait-sunglasses.jpg"
              alt="Kirti Desai — Fashion Designer"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Bio Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <TechnicalStamp label="BIOGRAPHY" value="KIRTI DESAI" variant="clay" />
          <h1 className="font-editorial-serif text-4xl sm:text-5xl md:text-6xl text-[#161616] font-normal tracking-tight leading-[1.05]">
            Ideas, craft and storytelling come together in design.
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#4A4A4A] leading-relaxed font-light">
            {aboutMeContent.introParagraph}
          </p>

          <div className="space-y-3 font-sans text-sm text-[#4A4A4A] leading-relaxed font-light pt-2">
            {aboutMeContent.fullBio.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#161616] hover:bg-[#A95F45] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-colors"
            >
              <span>VIEW DIGITAL CV / RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Academic Background */}
      <section className="py-16 border-b border-[#161616]/10">
        <SectionHeader
          stamp="ACADEMICS"
          stampValue="EDUCATION & CREDENTIALS"
          title="Education"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationHistory.map((edu, idx) => (
            <div key={idx} className="p-8 bg-[#FAF7F2] border border-[#161616]/15">
              <span className="font-mono text-xs text-[#A95F45] font-semibold block mb-2">
                {edu.period}
              </span>
              <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#161616]">
                {edu.degree}
              </h3>
              <p className="font-mono text-xs text-[#161616]/70 uppercase mt-1">
                {edu.institution} {edu.university ? `· ${edu.university}` : ''}
              </p>
              <p className="font-sans text-xs text-[#4A4A4A] mt-2 font-light">
                {edu.location}
              </p>

              {edu.details && (
                <div className="mt-4 pt-4 border-t border-[#161616]/10 space-y-1.5 font-sans text-xs text-[#4A4A4A]">
                  {edu.details.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2">
                      <span className="text-[#A95F45]">•</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7 Core Expertise Fields */}
      <section className="py-16 border-b border-[#161616]/10">
        <SectionHeader
          stamp="CAPABILITIES"
          stampValue="7 CORE EXPERTISE FIELDS"
          title="Areas of Specialization"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertiseList.map((exp, idx) => (
            <div key={exp.name} className="p-6 bg-[#FAF7F2] border border-[#161616]/10 hover:border-[#A95F45] transition-all flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#A95F45] font-semibold block mb-2">
                  0{idx + 1}
                </span>
                <h4 className="font-editorial-serif text-xl text-[#161616] leading-tight">
                  {exp.name}
                </h4>
                <p className="font-sans text-xs text-[#4A4A4A] mt-3 font-light leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Languages */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Skills */}
          <div className="p-8 bg-[#FAF7F2] border border-[#161616]/15 space-y-4">
            <TechnicalStamp label="SKILLS" value="ORGANIZATIONAL" variant="clay" />
            <h3 className="font-editorial-serif text-2xl text-[#161616]">
              Professional & Organizational Skills
            </h3>
            <div className="flex flex-wrap gap-2 pt-2">
              {technicalSkills.map((s) => (
                <span key={s} className="px-3 py-1.5 bg-[#E5D8C8]/50 border border-[#161616]/10 text-xs font-mono text-[#161616]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Languages & Contact */}
          <div className="p-8 bg-[#FAF7F2] border border-[#161616]/15 space-y-4">
            <TechnicalStamp label="COMMUNICATION" value="LANGUAGES & LOCATION" variant="sand" />
            <h3 className="font-editorial-serif text-2xl text-[#161616]">
              Languages & Contact
            </h3>
            <div className="space-y-2 font-mono text-xs text-[#161616]/80">
              <p><strong className="text-[#161616]">LANGUAGES:</strong> English, Hindi, Marathi</p>
              <p><strong className="text-[#161616]">EMAIL:</strong> {siteSettings.email}</p>
              <p><strong className="text-[#161616]">PHONE:</strong> {siteSettings.phone}</p>
              <p><strong className="text-[#161616]">LOCATION:</strong> {siteSettings.location}</p>
              <p className="flex items-center gap-1.5 pt-1">
                <InstagramIcon className="w-3.5 h-3.5 text-[#A95F45]" />
                <strong className="text-[#161616]">INSTAGRAM:</strong>{' '}
                <a href={siteSettings.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#A95F45] underline decoration-[#A95F45]/40 transition-colors">
                  @kirtidesai19
                </a>
              </p>
              <p className="flex items-center gap-1.5">
                <LinkedinIcon className="w-3.5 h-3.5 text-[#A95F45]" />
                <strong className="text-[#161616]">LINKEDIN:</strong>{' '}
                <a href={siteSettings.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#A95F45] underline decoration-[#A95F45]/40 transition-colors">
                  Kirti Desai
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
