import type { Metadata } from 'next';
import Script from 'next/script';
import StyledComponentsRegistry from '@/lib/styled-registry';
import Providers from './Providers';
import MainLayout from '@/components/layout/MainLayout';
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
  other: {
    'facebook-domain-verification': 'c95ox9874sq5itv5v2d39rtdmr1glf',
  },
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
      <head>
        {/* Google Tag Manager — reemplaza GTM-XXXXXXX con tu ID real */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PNTMPFTG');`}
        </Script>
      </head>
      <body className={cormorant.variable}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PNTMPFTG"
            height="0" width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <StyledComponentsRegistry>
          <Providers>
            <MainLayout>{children}</MainLayout> {/* 👈 aquí vuelve el Header/Footer */}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
