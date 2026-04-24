import type { Metadata } from 'next';
import GraciasView from './GraciasView';

export const metadata: Metadata = {
  title: 'Gracias | Luis Benítez Photography',
  description: 'Tu guía viene en camino. Revisa tu correo en los próximos minutos.',
  robots: { index: false, follow: true },
};

export default function GraciasPage() {
  return <GraciasView />;
}
