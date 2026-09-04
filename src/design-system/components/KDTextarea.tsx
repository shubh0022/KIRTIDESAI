'use client';

import React from 'react';

interface KDTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export default function KDTextarea({
  label,
  error,
  helperText,
  required,
  rows = 4,
  className = '',
  id,
  ...props
}: KDTextareaProps) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block font-mono text-[10px] text-[#171717]/70 uppercase tracking-[0.14em]"
        >
          {label} {required && <span className="text-[#A85E43]">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        rows={rows}
        required={required}
        className={`
          w-full p-3 bg-white/80 border text-xs text-[#171717] font-sans leading-relaxed
          transition-colors duration-200
          focus:outline-none focus:border-[#A85E43] focus:bg-white
          disabled:opacity-50 disabled:bg-[#FAF7F2] disabled:cursor-not-allowed
          placeholder:text-[#171717]/35
          ${error ? 'border-[#8A3B3B]' : 'border-[#171717]/20'}
          ${className}
        `}
        {...props}
      />

      {error && <p className="font-mono text-[10px] text-[#8A3B3B]">{error}</p>}
      {!error && helperText && (
        <p className="font-sans text-[11px] text-[#171717]/50">{helperText}</p>
      )}
    </div>
  );
}
