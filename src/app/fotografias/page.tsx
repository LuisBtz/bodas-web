import type { Metadata } from 'next';
import Hero from './sections/Hero';
import PortfolioGrid from './sections/PortfolioGrid';
import CallToAction from './sections/CallToAction';
import { getGalleryPhotos } from '@/lib/gallery';

export const metadata: Metadata = {
  title: 'Portafolio de Bodas en Monterrey — Fotografía Documental y Editorial',
  description: 'Explora más de 100 imágenes de bodas reales fotografiadas en Monterrey, Nuevo León. Estilo documental y editorial con toques de fine art.',
};

export default function FotografiasPage() {
  const photos = getGalleryPhotos();

  return (
    <>
      <Hero />
      <PortfolioGrid photos={photos} />
      <CallToAction />
    </>
  );
}
