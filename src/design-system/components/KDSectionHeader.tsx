'use client';

import React from 'react';
import KDBadge from './KDBadge';

interface KDSectionHeaderProps {
  stamp?: string;
  stampValue?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export default function KDSectionHeader({
  stamp,
  stampValue,
  title,
  subtitle,
  action,
  align = 'left',
  className = '',
}: KDSectionHeaderProps) {
  return (
    <div
      className={`space-y-3 pb-6 border-b border-[#171717]/10 ${
        align === 'center' ? 'text-center items-center' : ''
      } ${className}`}
    >
      {(stamp || stampValue) && (
        <div className={`flex items-center gap-2 ${align === 'center' ? 'justify-center' : ''}`}>
          {stamp && (
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#A85E43] font-semibold">
              {stamp}
            </span>
          )}
          {stamp && stampValue && <span className="text-[#171717]/30 text-xs">/</span>}
          {stampValue && (
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#171717]/60">
              {stampValue}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <h2 className="font-editorial-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="font-sans text-xs sm:text-sm text-[#171717]/70 font-light mt-1.5 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {action && <div className="shrink-0 flex items-center gap-3">{action}</div>}
      </div>
    </div>
  );
}
