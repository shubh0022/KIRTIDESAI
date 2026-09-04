'use client';

import React from 'react';

interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

interface KDTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  className?: string;
}

export default function KDTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'No atelier records found.',
  onRowClick,
  className = '',
}: KDTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="p-12 text-center bg-[#FAF7F2] border border-[#171717]/10 space-y-2">
        <p className="font-editorial-serif text-xl text-[#171717]/60 italic">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-x-auto bg-[#FAF7F2] border border-[#171717]/15 ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#171717]/15 bg-[#F0EBE1]/70">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`py-3.5 px-4 font-mono text-[10px] text-[#171717]/70 uppercase tracking-[0.14em] font-semibold ${
                  col.align === 'right'
                    ? 'text-right'
                    : col.align === 'center'
                    ? 'text-center'
                    : 'text-left'
                } ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#171717]/8 font-sans text-xs">
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              onClick={() => onRowClick && onRowClick(item)}
              className={`transition-colors duration-150 ${
                onRowClick
                  ? 'hover:bg-white/80 cursor-pointer active:bg-[#FAF7F2]'
                  : 'hover:bg-white/40'
              }`}
            >
              {columns.map((col, idx) => (
                <td
                  key={idx}
                  className={`py-4 px-4 align-middle text-[#171717] ${
                    col.align === 'right'
                      ? 'text-right'
                      : col.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  } ${col.className || ''}`}
                >
                  {col.cell
                    ? col.cell(item)
                    : col.accessorKey
                    ? String(item[col.accessorKey] ?? '')
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
