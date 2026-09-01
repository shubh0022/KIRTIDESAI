'use client';

import React from 'react';

interface TechnicalStampProps {
  label?: string;
  value?: string;
  variant?: 'ink' | 'clay' | 'sand' | 'outline';
  className?: string;
}

export default function TechnicalStamp({
  label,
  value,
  variant = 'ink',
  className = '',
}: TechnicalStampProps) {
  const getStyles = () => {
    switch (variant) {
      case 'clay':
        return 'bg-[#A95F45]/10 text-[#A95F45] border-[#A95F45]/30';
      case 'sand':
        return 'bg-[#E5D8C8]/60 text-[#161616] border-[#161616]/15';
      case 'outline':
        return 'bg-transparent text-[#161616]/70 border-[#161616]/20';
      case 'ink':
      default:
        return 'bg-[#161616] text-[#FAF7F2] border-[#161616]';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.2em] uppercase border ${getStyles()} ${className}`}
    >
      {label && <span className="opacity-70">{label}</span>}
      {label && value && <span className="opacity-40">/</span>}
      {value && <span className="font-semibold">{value}</span>}
    </span>
  );
}
