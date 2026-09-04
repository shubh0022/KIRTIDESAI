'use client';

import React from 'react';

interface KDBadgeProps {
  children: React.ReactNode;
  variant?: 'clay' | 'neutral' | 'dark' | 'outline';
  size?: 'xs' | 'sm';
  className?: string;
}

export default function KDBadge({
  children,
  variant = 'clay',
  size = 'sm',
  className = '',
}: KDBadgeProps) {
  const variantStyles = {
    clay: 'bg-[#A85E43]/10 text-[#A85E43] border-[#A85E43]/20',
    neutral: 'bg-[#FAF7F2] text-[#171717] border-[#171717]/15',
    dark: 'bg-[#171717] text-[#FAF7F2] border-[#171717]',
    outline: 'bg-transparent text-[#171717]/70 border-[#171717]/20',
  };

  const sizeStyles = {
    xs: 'text-[9px] px-2 py-0.5',
    sm: 'text-[10px] px-2.5 py-1',
  };

  return (
    <span
      className={`
        inline-flex items-center font-mono uppercase tracking-[0.14em] font-medium border rounded-[2px]
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
