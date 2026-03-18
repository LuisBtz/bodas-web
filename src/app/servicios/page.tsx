import type { Metadata } from 'next';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Collection from './sections/Collection';
import Upgrades from './sections/Upgrades';
import Faq from './sections/Faq';

export const metadata: Metadata = {
  title: 'Servicios | Luis Benítez Photography',
  description: 'Fotografía y video cinematográfico de bodas en Monterrey. Conoce qué incluye cada colección, los complementos disponibles y las preguntas frecuentes.',
};

export default function ServiciosPage() {
  return (
    <>
      <Hero />
      <Intro />
      <Collection />
      <Upgrades />
      <Faq />
    </>
  );
}
