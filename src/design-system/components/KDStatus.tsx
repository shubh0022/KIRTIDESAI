'use client';

import React from 'react';

export type StatusType =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'CONSULTATION'
  | 'DESIGN'
  | 'QUOTE_SENT'
  | 'AWAITING_APPROVAL'
  | 'APPROVED'
  | 'ORDER_CONFIRMED'
  | 'PREPARING'
  | 'CRAFTING'
  | 'PATTERN'
  | 'CONSTRUCTION'
  | 'FITTING'
  | 'QUALITY_CHECK'
  | 'PACKED'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'IN_STOCK'
  | 'LOW_STOCK'
  | 'OUT_OF_STOCK'
  | 'MADE_TO_ORDER'
  | 'PAID'
  | 'PENDING';

interface KDStatusProps {
  status: string;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export default function KDStatus({
  status,
  label,
  size = 'sm',
  className = '',
}: KDStatusProps) {
  const normalized = status.toUpperCase().replace(/\s+/g, '_');

  // Semantic color styling honoring Kirti Desai's palette
  const getStatusStyle = (s: string) => {
    switch (s) {
      case 'DELIVERED':
      case 'COMPLETED':
      case 'APPROVED':
      case 'PAID':
      case 'IN_STOCK':
        return 'bg-[#27523C]/10 text-[#27523C] border-[#27523C]/25';

      case 'SHIPPED':
      case 'OUT_FOR_DELIVERY':
      case 'PACKED':
      case 'QUALITY_CHECK':
        return 'bg-[#2D5B7B]/10 text-[#2D5B7B] border-[#2D5B7B]/25';

      case 'CRAFTING':
      case 'CONSTRUCTION':
      case 'FITTING':
      case 'PATTERN':
      case 'DESIGN':
      case 'MADE_TO_ORDER':
        return 'bg-[#A85E43]/15 text-[#A85E43] border-[#A85E43]/30 font-medium';

      case 'ORDER_CONFIRMED':
      case 'CONSULTATION':
      case 'QUOTE_SENT':
      case 'AWAITING_APPROVAL':
      case 'UNDER_REVIEW':
      case 'PENDING':
      case 'SUBMITTED':
        return 'bg-[#9E6B28]/15 text-[#885818] border-[#9E6B28]/30';

      case 'LOW_STOCK':
        return 'bg-[#B45309]/15 text-[#B45309] border-[#B45309]/30 animate-pulse';

      case 'CANCELLED':
      case 'OUT_OF_STOCK':
        return 'bg-[#8A3B3B]/10 text-[#8A3B3B] border-[#8A3B3B]/25';

      default:
        return 'bg-[#171717]/5 text-[#171717]/80 border-[#171717]/15';
    }
  };

  const displayText = label || status.replace(/_/g, ' ');

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.12em] border rounded-[2px] transition-colors
        ${size === 'sm' ? 'text-[9px] px-2 py-0.5' : 'text-[11px] px-2.5 py-1'}
        ${getStatusStyle(normalized)}
        ${className}
      `}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 opacity-80" />
      <span>{displayText}</span>
    </span>
  );
}
