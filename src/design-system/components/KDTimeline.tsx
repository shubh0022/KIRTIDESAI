'use client';

import React from 'react';
import { Check } from 'lucide-react';

export interface TimelineStep {
  label: string;
  date?: string;
  description?: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface KDTimelineProps {
  steps: TimelineStep[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export default function KDTimeline({
  steps,
  orientation = 'horizontal',
  className = '',
}: KDTimelineProps) {
  if (orientation === 'horizontal') {
    return (
      <div className={`w-full overflow-x-auto py-4 no-scrollbar ${className}`}>
        <div className="flex items-start min-w-[650px] justify-between relative px-2">
          {steps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';

            return (
              <div key={idx} className="flex-1 flex flex-col items-center relative text-center px-1">
                {/* Connecting bar */}
                {idx < steps.length - 1 && (
                  <div
                    className={`absolute top-3 left-1/2 w-full h-[1.5px] -z-0 ${
                      isCompleted ? 'bg-[#27523C]' : 'bg-[#171717]/15'
                    }`}
                  />
                )}

                {/* Step indicator node */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] z-10 transition-all border ${
                    isCompleted
                      ? 'bg-[#27523C] text-white border-[#27523C]'
                      : isCurrent
                      ? 'bg-[#A85E43] text-white border-[#A85E43] ring-4 ring-[#A85E43]/20 animate-pulse'
                      : 'bg-[#FAF7F2] text-[#171717]/40 border-[#171717]/25'
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3" /> : idx + 1}
                </div>

                <span
                  className={`font-mono text-[9px] uppercase tracking-[0.1em] mt-2 block ${
                    isCurrent
                      ? 'text-[#A85E43] font-bold'
                      : isCompleted
                      ? 'text-[#171717] font-medium'
                      : 'text-[#171717]/40'
                  }`}
                >
                  {step.label}
                </span>

                {step.date && (
                  <span className="font-mono text-[8px] text-[#171717]/50 mt-0.5">
                    {step.date}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Vertical layout
  return (
    <div className={`space-y-6 relative pl-6 border-l border-[#171717]/15 ${className}`}>
      {steps.map((step, idx) => {
        const isCompleted = step.status === 'completed';
        const isCurrent = step.status === 'current';

        return (
          <div key={idx} className="relative space-y-1">
            {/* Left Node */}
            <div
              className={`absolute -left-[31px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] border ${
                isCompleted
                  ? 'bg-[#27523C] text-white border-[#27523C]'
                  : isCurrent
                  ? 'bg-[#A85E43] text-white border-[#A85E43] ring-3 ring-[#A85E43]/25'
                  : 'bg-[#FAF7F2] text-[#171717]/40 border-[#171717]/25'
              }`}
            >
              {isCompleted ? <Check className="w-3 h-3" /> : idx + 1}
            </div>

            <div className="flex items-center justify-between gap-4">
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.14em] font-semibold ${
                  isCurrent ? 'text-[#A85E43]' : 'text-[#171717]'
                }`}
              >
                {step.label}
              </span>
              {step.date && (
                <span className="font-mono text-[9px] text-[#171717]/50">
                  {step.date}
                </span>
              )}
            </div>

            {step.description && (
              <p className="font-sans text-xs text-[#171717]/70 font-light">
                {step.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
