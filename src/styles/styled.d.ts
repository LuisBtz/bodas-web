// src/styles/styled.d.ts
import 'styled-components';

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
      base: string;
    };
    sizes: {
      container: string;
      radius: string;
    };
    fontSizes: {
      base: string;
      h1: string;
      h2: string;
    };
    lineHeights: {
      h1: number;
      h2: number;
      base: number;
    };
    z: {
      header: number;
      overlay: number;
    };
  }
}
