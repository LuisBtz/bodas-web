// src/styles/global.ts
'use client';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Reset breve */
  *,*::before,*::after{ box-sizing:border-box; }
  *{ margin:0; }
  html,body{ height:100%; }
  img,svg,video{ display:block; max-width:100%; }
  button,input,textarea,select{ font:inherit; }
  p,h1,h2,h3,h4,h5,h6{ overflow-wrap:anywhere; }

  html { font-size: 16px; }

  body{
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.base};
    line-height: ${({ theme }) => theme.lineHeights.base};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  h1, h2, h3, h4 { font-family: ${({ theme }) => theme.fonts.base}; font-weight: normal; margin: 0; }

  /* Tamaños base (desktop) */
  h1 { font-size: ${({ theme }) => theme.fontSizes.h1}; line-height: ${({ theme }) => theme.lineHeights.h1}; }
  h2 { font-size: ${({ theme }) => theme.fontSizes.h2}; line-height: ${({ theme }) => theme.lineHeights.h2}; }

  /* Tablet: <= 850px */
  @media ${({ theme }) => theme.media.mdDown} {
    h1 { font-size: ${({ theme }) => theme.fontSizesMd.h1}; }
    h2 { font-size: ${({ theme }) => theme.fontSizesMd.h2}; }
  }

  /* Mobile: <= 520px */
  @media ${({ theme }) => theme.media.smDown} {
    h1 { font-size: ${({ theme }) => theme.fontSizesSm.h1}; }
    h2 { font-size: ${({ theme }) => theme.fontSizesSm.h2}; }
  }

  a { color: inherit; text-decoration: none; }
`;
