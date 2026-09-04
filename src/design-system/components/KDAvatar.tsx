'use client';

import React from 'react';

interface KDAvatarProps {
  name: string;
  role?: string;
  size?: 'sm' | 'md' | 'lg';
  imageUrl?: string;
  className?: string;
}

export default function KDAvatar({
  name,
  role,
  size = 'md',
  imageUrl,
  className = '',
}: KDAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const sizeStyles = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className={`
          ${sizeStyles[size]}
          rounded-full bg-[#E5D8C8] text-[#A85E43] font-mono font-semibold
          flex items-center justify-center border border-[#A85E43]/30 shrink-0 select-none
        `}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {(role || name) && (
        <div className="leading-tight">
          <span className="font-editorial-serif text-sm text-[#171717] block font-medium">
            {name}
          </span>
          {role && (
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#A85E43] block">
              {role}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
