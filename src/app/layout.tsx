import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/styled-registry';
import Providers from './Providers';
import MainLayout from '@/components/layout/MainLayout'; // 👈 importa tu layout
import { Cormorant } from 'next/font/google';

export const metadata: Metadata = {
  title: {
    default: 'Fotógrafo de Bodas en Monterrey | Luis Benítez Photography',
    template: '%s | Luis Benítez Photography',
  },
  description:
    'Fotografía y video cinematográfico de bodas en Monterrey, Nuevo León. Estilo documental, emotivo y auténtico. Agenda tu sesión con Luis Benítez.',
  metadataBase: new URL('https://photography.luisbtz.com'),
  robots: { index: true, follow: true },
  openGraph: {
    siteName: 'Luis Benítez Photography',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luis Benítez Photography — Fotógrafo de Bodas en Monterrey',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
};

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
