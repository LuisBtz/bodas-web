import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/styled-registry';
import Providers from './Providers';
import MainLayout from '@/components/layout/MainLayout'; // 👈 importa tu layout
import { Cormorant } from 'next/font/google';

export const metadata: Metadata = { title: 'Luis Benítez', description: 'Fotografía' };

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400','700'],
  style: ['normal','italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={cormorant.variable}>
        <StyledComponentsRegistry>
          <Providers>
            <MainLayout>{children}</MainLayout> {/* 👈 aquí vuelve el Header/Footer */}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
