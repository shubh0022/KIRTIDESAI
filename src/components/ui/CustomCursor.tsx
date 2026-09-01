'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'view' | 'open' | 'go'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on fine pointer devices (desktop mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const cursorAttr = target?.closest('[data-cursor]')?.getAttribute('data-cursor');

      if (cursorAttr === 'view') setCursorType('view');
      else if (cursorAttr === 'open') setCursorType('open');
      else if (cursorAttr === 'go') setCursorType('go');
      else setCursorType('default');
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 rounded-full flex items-center justify-center font-mono text-[9px] uppercase tracking-widest text-[#FAF7F2] select-none"
      animate={{
        x: position.x - (cursorType === 'default' ? 6 : 24),
        y: position.y - (cursorType === 'default' ? 6 : 24),
        width: cursorType === 'default' ? 12 : 48,
        height: cursorType === 'default' ? 12 : 48,
        backgroundColor: cursorType === 'default' ? '#A95F45' : '#161616',
        opacity: isVisible ? 0.9 : 0,
      }}
      transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.1 }}
    >
      {cursorType !== 'default' && (
        <span className="text-[8px] font-semibold tracking-wider">
          {cursorType === 'view' ? 'VIEW' : cursorType === 'open' ? 'OPEN' : 'GO'}
        </span>
      )}
    </motion.div>
  );
}
