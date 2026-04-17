import type { Metadata } from 'next';
import ContactForm from './sections/ContactForm';

export const metadata: Metadata = {
  title: 'Cotiza tu Boda en Monterrey — Contacto Luis Benítez Photography',
  description:
    'Consulta disponibilidad para tu boda en Monterrey. Fotografía y video cinematográfico para parejas que quieren recordar cada emoción.',
};

export default function ContactoPage() {
  return <ContactForm />;
}
