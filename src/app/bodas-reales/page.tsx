import type { Metadata } from 'next';
import Hero from './sections/Hero';
import CallToAction from './sections/CallToAction';
import EditorialGrid from './sections/EditorialGrid';
import { getAllBodasReales } from '@/lib/bodas-reales';

export const metadata: Metadata = {
  title: 'Bodas Reales en Monterrey — Historias Documentadas por Luis Benítez',
  description: 'Descubre bodas reales fotografiadas en Monterrey y Nuevo León. Momentos auténticos, emociones reales y recuerdos eternos capturados por Luis Benítez.',
};

export default function BodasRealesPage() {
  const bodas = getAllBodasReales();

  return (
    <>
      <Hero />
      <EditorialGrid items={bodas} />
      <CallToAction />
    </>
  );
}
