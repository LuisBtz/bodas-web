// src/styles/theme.ts
import 'styled-components';
import type { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      black: string;
      cream: string;
      red: string;
      text: string;
      bg: string;
      border: string;
    };
    fonts: {
      base: string; // usa Cormorant desde var(--font-cormorant)
    };
    sizes: {
      container: string;
      radius: string;
    };
    // Desktop (>= 851px)
    fontSizes: {
      base: string;
      h1: string; // 96px
      h2: string; // 48px
    };
    // Tablet (<= 850px)
    fontSizesMd: {
      h1: string; // sugerido 56px
      h2: string; // sugerido 32px
    };
    // Mobile (<= 520px)
    fontSizesSm: {
      h1: string; // sugerido 40px
      h2: string; // sugerido 28px
    };
    lineHeights: {
      h1: number;
      h2: number;
      base: number;
    };
    breakpoints: {
      md: string; // 850px
      sm: string; // 520px
      xs: string; // 520px
    };
    media: {
      mdDown: string; // (max-width: 850px)
      smDown: string; // (max-width: 520px)
      xsDown: string; // (max-width: 520px)
    };
    z: { header: number; overlay: number };
  }
}

export const theme: DefaultTheme = {
  colors: {
    white: '#fff',
    black: '#000',
    cream: '#FFF8F4',
    red: '#930707',
    text: '#000',
    bg: '#FFF8F4',
    border: '#e6e0db',
  },
  fonts: {
    base: "var(--font-cormorant), Georgia, 'Times New Roman', Times, serif",
  },
  sizes: {
    container: '1200px',
    radius: '16px',
  },
  // Desktop (>= 851px)
  fontSizes: {
    base: '16px',
    h1: '96px',
    h2: '38px',
  },
  // Tablet (<= 850px)
  fontSizesMd: {
    h1: '56px',
    h2: '32px',
  },
  // Mobile (<= 520px)
  fontSizesSm: {
    h1: '40px',
    h2: '28px',
  },
  lineHeights: {
    h1: 1.05,
    h2: 1.15,
    base: 1.5,
  },
  breakpoints: {
    md: '850px',
    sm: '520px',
    xs: '340px',
  },
  media: {
    mdDown: '(max-width: 850px)',
    smDown: '(max-width: 520px)',
    xsDown: '(max-width: 340px)',
  },
  z: { header: 50, overlay: 100 },
};

export default theme;
