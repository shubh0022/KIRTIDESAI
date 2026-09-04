'use client';

import React from 'react';

interface KDCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'flat' | 'outline';
  density?: 'editorial' | 'dense';
  hoverEffect?: boolean;
}

export default function KDCard({
  children,
  variant = 'elevated',
  density = 'editorial',
  hoverEffect = false,
  className = '',
  ...props
}: KDCardProps) {
  const variantStyles = {
    elevated: 'bg-[#FAF7F2] border border-[#171717]/12 shadow-[0_1px_4px_rgba(23,23,23,0.03)]',
    flat: 'bg-[#FAF7F2] border border-[#171717]/10',
    outline: 'bg-transparent border border-[#171717]/15',
  };

  const densityStyles = {
    editorial: 'p-6 sm:p-8 space-y-4',
    dense: 'p-4 sm:p-5 space-y-3',
  };

  const hoverStyles = hoverEffect
    ? 'hover:border-[#A85E43] hover:shadow-[0_4px_16px_rgba(168,94,67,0.08)] transition-all duration-250 cursor-pointer'
    : '';

  return (
    <div
      className={`
        rounded-[2px] transition-all
        ${variantStyles[variant]}
        ${densityStyles[density]}
        ${hoverStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
