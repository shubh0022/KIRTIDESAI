'use client';

import React from 'react';
import TechnicalStamp from './TechnicalStamp';

interface SectionHeaderProps {
  stamp?: string;
  stampValue?: string;
  stampVariant?: 'ink' | 'clay' | 'sand' | 'outline';
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  stamp,
  stampValue,
  stampVariant = 'clay',
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'
      } ${className}`}
    >
      {(stamp || stampValue) && (
        <div className="mb-4">
          <TechnicalStamp label={stamp} value={stampValue} variant={stampVariant} />
        </div>
      )}

      <h2 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#161616] font-normal leading-[1.05]">
        {title}
      </h2>

      {subtitle && (
        <p className="font-sans text-sm sm:text-base md:text-lg text-[#4A4A4A] mt-4 font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
