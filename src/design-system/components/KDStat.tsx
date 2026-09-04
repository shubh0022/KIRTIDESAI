'use client';

import React from 'react';

interface KDStatProps {
  label: string;
  value: string | number;
  subvalue?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  variant?: 'standard' | 'highlight' | 'alert';
  onClick?: () => void;
  className?: string;
}

export default function KDStat({
  label,
  value,
  subvalue,
  trend,
  icon,
  variant = 'standard',
  onClick,
  className = '',
}: KDStatProps) {
  const variantStyles = {
    standard: 'bg-[#FAF7F2] border border-[#171717]/12',
    highlight: 'bg-[#FAF7F2] border border-[#A85E43]/40 shadow-xs',
    alert: 'bg-[#FAF7F2] border border-[#B45309]/50 shadow-xs',
  };

  return (
    <div
      onClick={onClick}
      className={`
        p-5 sm:p-6 rounded-[2px] transition-all duration-200
        ${variantStyles[variant]}
        ${onClick ? 'hover:border-[#A85E43] cursor-pointer hover:shadow-sm' : ''}
        ${className}
      `}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#171717]/60 font-medium">
          {label}
        </span>
        {icon && <span className="text-[#A85E43]/70">{icon}</span>}
      </div>

      <div className="flex items-baseline justify-between gap-3">
        <div className="font-editorial-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
          {value}
        </div>

        {trend && (
          <span
            className={`font-mono text-[10px] tracking-wider font-semibold ${
              trend.isPositive ? 'text-[#27523C]' : 'text-[#8A3B3B]'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      {subvalue && (
        <p className="font-sans text-[11px] text-[#171717]/60 font-light mt-1">
          {subvalue}
        </p>
      )}
    </div>
  );
}
