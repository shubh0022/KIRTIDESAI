'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WishlistItem {
  id: string;
  title: string;
  category: string;
  image: string;
  href: string;
}

export interface BagItem {
  id: string;
  title: string;
  price?: string;
  quantity: number;
  image: string;
  category: string;
}

interface AtelierContextType {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;

  isBagOpen: boolean;
  openBag: () => void;
  closeBag: () => void;

  isAccountOpen: boolean;
  openAccount: () => void;
  closeAccount: () => void;

  isStudioMenuOpen: boolean;
  openStudioMenu: () => void;
  closeStudioMenu: () => void;

  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (id: string) => boolean;
  clearWishlist: () => void;

  bag: BagItem[];
  addToBag: (item: Omit<BagItem, 'quantity'>) => void;
  removeFromBag: (id: string) => void;
  clearBag: () => void;
  bagCount: number;
}

const AtelierContext = createContext<AtelierContextType | undefined>(undefined);

export function AtelierProvider({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isStudioMenuOpen, setIsStudioMenuOpen] = useState(false);

  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [bag, setBag] = useState<BagItem[]>([]);

  // Load persisted wishlist & bag
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('kd_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
      const savedBag = localStorage.getItem('kd_bag');
      if (savedBag) {
        setBag(JSON.parse(savedBag));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // Save wishlist
  const saveWishlist = (items: WishlistItem[]) => {
    setWishlist(items);
    try {
      localStorage.setItem('kd_wishlist', JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  // Save bag
  const saveBag = (items: BagItem[]) => {
    setBag(items);
    try {
      localStorage.setItem('kd_bag', JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  const toggleWishlist = (item: WishlistItem) => {
    const exists = wishlist.some((w) => w.id === item.id);
    if (exists) {
      saveWishlist(wishlist.filter((w) => w.id !== item.id));
    } else {
      saveWishlist([...wishlist, item]);
    }
  };

  const isWishlisted = (id: string) => wishlist.some((w) => w.id === id);

  const clearWishlist = () => saveWishlist([]);

  const addToBag = (item: Omit<BagItem, 'quantity'>) => {
    const existing = bag.find((b) => b.id === item.id);
    if (existing) {
      saveBag(
        bag.map((b) => (b.id === item.id ? { ...b, quantity: b.quantity + 1 } : b))
      );
    } else {
      saveBag([...bag, { ...item, quantity: 1 }]);
    }
    setIsBagOpen(true);
  };

  const removeFromBag = (id: string) => {
    saveBag(bag.filter((b) => b.id !== id));
  };

  const clearBag = () => saveBag([]);

  const bagCount = bag.reduce((acc, item) => acc + item.quantity, 0);

  // Global ESC handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsWishlistOpen(false);
        setIsBagOpen(false);
        setIsAccountOpen(false);
        setIsStudioMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AtelierContext.Provider
      value={{
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),

        isWishlistOpen,
        openWishlist: () => setIsWishlistOpen(true),
        closeWishlist: () => setIsWishlistOpen(false),

        isBagOpen,
        openBag: () => setIsBagOpen(true),
        closeBag: () => setIsBagOpen(false),

        isAccountOpen,
        openAccount: () => setIsAccountOpen(true),
        closeAccount: () => setIsAccountOpen(false),

        isStudioMenuOpen,
        openStudioMenu: () => setIsStudioMenuOpen(true),
        closeStudioMenu: () => setIsStudioMenuOpen(false),

        wishlist,
        toggleWishlist,
        isWishlisted,
        clearWishlist,

        bag,
        addToBag,
        removeFromBag,
        clearBag,
        bagCount,
      }}
    >
      {children}
    </AtelierContext.Provider>
  );
}

export function useAtelier() {
  const context = useContext(AtelierContext);
  if (!context) {
    throw new Error('useAtelier must be used within an AtelierProvider');
  }
  return context;
}
