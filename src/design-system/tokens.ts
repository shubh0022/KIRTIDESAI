// Kirti Desai Luxury Design Tokens
// Single Source of Truth for Client, Admin, and Public Interfaces

export const KD_TOKENS = {
  colors: {
    ivory: '#F4F0E8',       // Base atelier background
    paper: '#FAF7F2',       // Elevated parchment card surface
    paperSubtle: '#F0EBE1', // Subtle parchment variation
    ink: '#171717',         // Primary typographic ink
    inkMuted: '#4A4A4A',    // Supporting body slate
    inkSubtle: '#706E6B',   // Subtle metadata
    line: 'rgba(23, 23, 23, 0.12)', // Hairline divider
    lineLight: 'rgba(23, 23, 23, 0.06)',
    lineDark: 'rgba(23, 23, 23, 0.22)',
    copper: '#A85E43',      // Atelier terracotta copper accent
    copperDark: '#884731',  // Deep copper for hover states
    copperSoft: '#E5D8C8',  // Soft taupe/copper background wash
    copperSubtle: 'rgba(168, 94, 67, 0.12)',
    sand: '#CFC3B5',
    navy: '#1A2230',        // Deep nocturnal navy for tailoring accents
    status: {
      pending: '#9E6B28',
      confirmed: '#3B6B52',
      crafting: '#A85E43',
      shipped: '#2D5B7B',
      completed: '#27523C',
      cancelled: '#8A3B3B',
    }
  },
  typography: {
    display: "var(--font-cormorant), 'Playfair Display', Georgia, serif",
    body: "var(--font-jakarta), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "var(--font-jetbrains), 'Courier New', monospace",
  },
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '4rem',  // 64px
  },
  radius: {
    none: '0px',
    sm: '2px',
    md: '4px',
    lg: '8px',
    full: '9999px',
  },
  shadows: {
    subtle: '0 1px 3px rgba(23, 23, 23, 0.04)',
    card: '0 2px 10px rgba(23, 23, 23, 0.03)',
    floating: '0 8px 30px rgba(23, 23, 23, 0.08)',
    drawer: '0 10px 40px rgba(23, 23, 23, 0.14)',
  },
  motion: {
    fast: '0.15s ease',
    standard: '0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    slow: '0.45s cubic-bezier(0.16, 1, 0.3, 1)',
  }
} as const;
