'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface KDSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

export default function KDSelect({
  label,
  error,
  helperText,
  required,
  options,
  children,
  className = '',
  id,
  ...props
}: KDSelectProps) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block font-mono text-[10px] text-[#171717]/70 uppercase tracking-[0.14em]"
        >
          {label} {required && <span className="text-[#A85E43]">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          required={required}
          className={`
            w-full p-3 bg-white/80 border text-xs text-[#171717] font-mono appearance-none pr-10
            transition-colors duration-200
            focus:outline-none focus:border-[#A85E43] focus:bg-white
            disabled:opacity-50 disabled:bg-[#FAF7F2] disabled:cursor-not-allowed
            ${error ? 'border-[#8A3B3B]' : 'border-[#171717]/20'}
            ${className}
          `}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <ChevronDown className="w-4 h-4 text-[#171717]/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {error && <p className="font-mono text-[10px] text-[#8A3B3B]">{error}</p>}
      {!error && helperText && (
        <p className="font-sans text-[11px] text-[#171717]/50">{helperText}</p>
      )}
    </div>
  );
}
