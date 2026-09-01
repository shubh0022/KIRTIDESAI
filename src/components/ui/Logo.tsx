'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'primary' | 'monogram' | 'seal';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
}

export default function Logo({
  variant = 'primary',
  className = '',
  size = 'md',
  href = '/',
  onClick,
}: LogoProps) {
  // Canonical dimensions for the circular KD brand emblem
  const dimensions = {
    sm: { width: 64, height: 64, class: 'w-[60px] h-[60px] sm:w-[68px] sm:h-[68px]' },
    md: { width: 84, height: 84, class: 'w-[76px] h-[76px] lg:w-[84px] lg:h-[84px]' },
    lg: { width: 120, height: 120, class: 'w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]' },
  }[size];

  const imageSrc =
    variant === 'monogram'
      ? '/brand/kirti-desai-kd-monogram.png'
      : '/brand/kirti-desai-kd-logo.png';

  const content = (
    <div
      className={`relative inline-flex items-center justify-center select-none opacity-90 hover:opacity-100 hover:scale-[1.02] transition-all duration-250 ease-out ${dimensions.class} ${className}`}
    >
      <Image
        src={imageSrc}
        alt="Kirti Desai — Fashion Design"
        width={dimensions.width}
        height={dimensions.height}
        priority
        className="w-full h-full object-contain"
      />
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className="group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A85E43] inline-flex items-center justify-center"
        aria-label="Kirti Desai — Home"
        data-cursor="go"
      >
        {content}
      </Link>
    );
  }

  return content;
}
