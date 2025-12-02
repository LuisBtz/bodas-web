'use client';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from '@/styles/theme';
import { GlobalStyle } from '@/styles/global'; // si ya lo tienes separado

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
