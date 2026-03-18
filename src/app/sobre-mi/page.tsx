import type { Metadata } from 'next';
import Hero from './sections/Hero';
import Story from './sections/Story';
import Philosophy from './sections/Philosophy';
import CallToAction from './sections/CallToAction';

export const metadata: Metadata = {
  title: 'Sobre mí | Luis Benítez Photography',
  description: 'Conoce la historia y filosofía de Luis Benítez, fotógrafo de bodas en Monterrey con un enfoque documental, emotivo y auténtico.',
};

export default function SobreMiPage() {
  return (
    <>
      <Hero />
      <Story />
      <Philosophy />
      <CallToAction />
    </>
  );
}
