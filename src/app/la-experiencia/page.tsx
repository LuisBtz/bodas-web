import type { Metadata } from 'next';
import { Suspense } from 'react';
import Hero from './sections/Hero';
import Benefits from './sections/Benefits';
import BrochureForm from './sections/BrochureForm';
import Testimonial from './sections/Testimonial';
import Faq from './sections/Faq';

export const metadata: Metadata = {
  title: 'La experiencia | Luis Benítez Photography',
  description:
    'Conoce el proceso, los paquetes y la filosofía detrás de cada boda que documento. Recibe la guía completa en tu correo.',
  openGraph: {
    title: 'La experiencia | Luis Benítez Photography',
    description:
      'Conoce el proceso, los paquetes y la filosofía detrás de cada boda que documento. Recibe la guía completa en tu correo.',
    url: 'https://photography.luisbtz.com/la-experiencia',
    type: 'website',
    images: [
      {
        url: '/bodas-reales/amy-and-jorge/coverImage.webp',
        width: 1200,
        height: 630,
        alt: 'La experiencia — Luis Benítez Photography',
      },
    ],
  },
};

export default function LaExperienciaPage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Suspense fallback={null}>
        <BrochureForm />
      </Suspense>
      <Testimonial />
      <Faq />
    </>
  );
}
