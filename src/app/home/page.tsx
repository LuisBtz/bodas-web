import Hero from './sections/Hero';
import Value from './sections/Value';
import LatestBodaReal from './sections/LatestBodaReal';
import Approach from './sections/Approach';
import Emotions from './sections/Emotions';
import Gallery from './sections/Gallery';
import ContactSection from './sections/ContactSection';
import LatestPosts from './sections/LatestPosts';
import { getGalleryPhotos } from '@/lib/gallery';
import { getAllBodasReales } from '@/lib/bodas-reales';
import { getAllPosts } from '@/lib/blog';

export const runtime = 'nodejs';
export default function HomePage() {
  const galleryPhotos = getGalleryPhotos()
    .slice(0, 6)
    .map((p) => ({ src: p.image, alt: p.alt }));

  const latestBoda = getAllBodasReales()[0];
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <Value />
      <Approach />
      <Emotions />
            {latestBoda && <LatestBodaReal boda={latestBoda} />}

      <Gallery photos={galleryPhotos} />
      <ContactSection />
      {latestPosts.length > 0 && <LatestPosts posts={latestPosts} />}
    </>
  );
}
