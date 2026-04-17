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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': 'https://photography.luisbtz.com/#business',
  name: 'Luis Benítez Photography',
  url: 'https://photography.luisbtz.com',
  telephone: '+5218112498874',
  whatsapp: 'https://wa.me/5218112498874',
  description:
    'Fotógrafo de bodas en Monterrey especializado en estilo documental y editorial. Capturo momentos reales con sensibilidad artística para parejas en Nuevo León y todo México.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Monterrey',
    addressRegion: 'Nuevo León',
    addressCountry: 'MX',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.6866,
    longitude: -100.3161,
  },
  areaServed: [
    { '@type': 'City', name: 'Monterrey' },
    { '@type': 'City', name: 'San Pedro Garza García' },
    { '@type': 'City', name: 'Santiago' },
    { '@type': 'AdministrativeArea', name: 'Nuevo León' },
  ],
  sameAs: [
    'https://www.instagram.com/luisbenitezphotography/',
    'https://www.facebook.com/profile.php?id=61578594767267',
  ],
  founder: {
    '@type': 'Person',
    name: 'Luis Benítez',
    jobTitle: 'Fotógrafo de Bodas',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Paquetes de Fotografía de Bodas',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Fotografía de Bodas',
        description: 'Cobertura fotográfica documental y editorial para bodas en Monterrey',
      },
    ],
  },
};

export const runtime = 'nodejs';
export default function HomePage() {
  const galleryPhotos = getGalleryPhotos()
    .slice(0, 6)
    .map((p) => ({ src: p.image, alt: p.alt }));

  const latestBoda = getAllBodasReales()[0];
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
