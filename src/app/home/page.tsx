import Hero from './sections/Hero';
import Value from './sections/Value';
import Approach from './sections/Approach';
import Emotions from './sections/Emotions';
import Gallery from './sections/Gallery';
import ContactSection from './sections/ContactSection';

export const runtime = 'nodejs';
export default function HomePage() {
  return (
    <>
      <Hero />
      <Value />
      <Approach />
      <Emotions />
      <Gallery />
      <ContactSection />
      {/* Luego añadiremos más secciones (Value, Story, etc.) */}
    </>
  );
}
