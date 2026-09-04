'use client';

import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  badge?: string;
}

interface KDTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export default function KDTabs({
  tabs,
  activeTab,
  onChange,
  className = '',
}: KDTabsProps) {
  return (
    <div className={`flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 border-b border-[#171717]/10 no-scrollbar ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`
              inline-flex items-center gap-2 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em]
              transition-all duration-200 shrink-0 border-b-2 -mb-[2px] cursor-pointer
              ${
                isActive
                  ? 'border-[#A85E43] text-[#171717] font-semibold bg-white/60'
                  : 'border-transparent text-[#171717]/60 hover:text-[#171717] hover:border-[#171717]/20'
              }
            `}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded-[2px] ${
                  isActive
                    ? 'bg-[#A85E43] text-white'
                    : 'bg-[#171717]/10 text-[#171717]/70'
                }`}
              >
                {tab.count}
              </span>
            )}
            {tab.badge && (
              <span className="text-[9px] text-[#A85E43] font-semibold">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
