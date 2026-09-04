'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export type KDButtonVariant = 'primary' | 'secondary' | 'text' | 'icon' | 'danger';
export type KDButtonSize = 'sm' | 'md' | 'lg';

interface KDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: KDButtonVariant;
  size?: KDButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export default function KDButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: KDButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-mono uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A85E43] select-none';

  const sizeStyles: Record<KDButtonSize, string> = {
    sm: 'text-[10px] px-3 py-2 gap-1.5 min-h-[36px]',
    md: 'text-xs px-5 py-3 gap-2 min-h-[44px]',
    lg: 'text-xs sm:text-sm px-7 py-3.5 gap-2.5 min-h-[48px]',
  };

  const variantStyles: Record<KDButtonVariant, string> = {
    primary:
      'bg-[#171717] text-[#FAF7F2] hover:bg-[#A85E43] active:bg-[#884731] border border-[#171717] hover:border-[#A85E43] shadow-xs',
    secondary:
      'bg-[#FAF7F2] text-[#171717] hover:bg-[#171717] hover:text-[#FAF7F2] border border-[#171717]/25 hover:border-[#171717]',
    text:
      'bg-transparent text-[#171717] hover:text-[#A85E43] border border-transparent p-0 min-h-0 underline-offset-4 hover:underline normal-case tracking-normal font-sans',
    icon:
      'bg-[#FAF7F2] text-[#171717] hover:text-[#A85E43] border border-[#171717]/15 hover:border-[#A85E43] p-2 aspect-square min-h-[44px] min-w-[44px]',
    danger:
      'bg-[#8A3B3B] text-[#FAF7F2] hover:bg-[#6D2F2F] border border-[#8A3B3B]',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variant !== 'text' ? sizeStyles[size] : ''}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          {children && <span>{children}</span>}
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
}
