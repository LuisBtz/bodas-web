import type { Metadata } from 'next';
import Hero from './sections/Hero';
import CallToAction from './sections/CallToAction';
import EditorialGrid from './sections/EditorialGrid';
import { getAllBodasReales } from '@/lib/bodas-reales';

export const metadata: Metadata = {
  title: 'Bodas reales | Luis Benítez Photography',
  description: 'Un vistazo íntimo a las bodas que hemos transformado en recuerdos eternos',
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
