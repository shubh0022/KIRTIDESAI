'use client';

import React from 'react';
import KDButton from './KDButton';

interface KDEmptyStateProps {
  title: string;
  description?: string;
  stamp?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export default function KDEmptyState({
  title,
  description,
  stamp = 'ATELIER NOTICE',
  actionLabel,
  onAction,
  icon,
  className = '',
}: KDEmptyStateProps) {
  return (
    <div
      className={`p-10 sm:p-14 text-center bg-[#FAF7F2] border border-[#171717]/12 space-y-4 max-w-xl mx-auto rounded-[2px] ${className}`}
    >
      {stamp && (
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#A85E43] font-semibold block">
          {stamp}
        </span>
      )}

      {icon && <div className="flex justify-center text-[#A85E43]/70">{icon}</div>}

      <div className="space-y-1.5">
        <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#171717] font-normal">
          {title}
        </h3>
        {description && (
          <p className="font-sans text-xs sm:text-sm text-[#171717]/70 font-light max-w-sm mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actionLabel && onAction && (
        <div className="pt-2">
          <KDButton variant="primary" size="md" onClick={onAction}>
            {actionLabel}
          </KDButton>
        </div>
      )}
    </div>
  );
}
