import type { Metadata } from 'next';
import Hero from './sections/Hero';
import PortfolioGrid from './sections/PortfolioGrid';
import CallToAction from './sections/CallToAction';
import { getGalleryPhotos } from '@/lib/gallery';

export const metadata: Metadata = {
  title: 'Las fotografías | Luis Benítez Photography',
  description: 'Portfolio de fotografías de boda.',
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
