'use client';

import React from 'react';
import NavigationMenu from './NavigationMenu';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export default function MobileMenu({ isOpen, onClose, currentPath }: MobileMenuProps) {
  return <NavigationMenu isOpen={isOpen} onClose={onClose} currentPath={currentPath} />;
}

