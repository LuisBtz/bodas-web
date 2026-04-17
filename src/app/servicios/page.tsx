import type { Metadata } from 'next';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Collection from './sections/Collection';
import Upgrades from './sections/Upgrades';
import Faq from './sections/Faq';

export const metadata: Metadata = {
  title: 'Paquetes de Fotografía de Bodas en Monterrey',
  description: 'Fotografía de bodas en Monterrey. Conoce qué incluye cada colección, los complementos disponibles y las preguntas frecuentes.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Fotografía de bodas',
  name: 'Colección de Fotografía de Boda',
  description:
    'Cobertura fotográfica documental y editorial para bodas en Monterrey. Incluye mínimo 6 horas de cobertura, 700+ imágenes editadas en alta resolución, galería digital privada, vista previa en días y segundo fotógrafo.',
  provider: { '@id': 'https://photography.luisbtz.com/#business' },
  areaServed: [
    { '@type': 'City', name: 'Monterrey' },
    { '@type': 'City', name: 'San Pedro Garza García' },
    { '@type': 'AdministrativeArea', name: 'Nuevo León' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Colecciones y Complementos de Fotografía de Boda',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Colección de Fotografía de Boda',
        description:
          'Mínimo 6 horas de cobertura continua, 700+ imágenes editadas en alta resolución, galería digital privada, vista previa en días y segundo fotógrafo incluido.',
        eligibleRegion: { '@type': 'City', name: 'Monterrey' },
      },
      {
        '@type': 'Offer',
        name: 'Sesión de Compromiso',
        description:
          'Sesión fotográfica previa a la boda para celebrar el noviazgo y ganar confianza frente a la cámara.',
        priceCurrency: 'MXN',
        eligibleRegion: { '@type': 'City', name: 'Monterrey' },
      },
      {
        '@type': 'Offer',
        name: 'Álbum de Boda',
        description:
          'Libro de arte impreso en alta calidad con los mejores momentos de la boda. Un objeto para atesorar generación tras generación.',
        priceCurrency: 'MXN',
        eligibleRegion: { '@type': 'City', name: 'Monterrey' },
      },
      {
        '@type': 'Offer',
        name: 'Video Cinematográfico',
        description:
          'Película de boda de nivel cinematográfico realizada por un cineasta colaborador de confianza. Complemento al servicio fotográfico.',
        priceCurrency: 'MXN',
        eligibleRegion: { '@type': 'City', name: 'Monterrey' },
      },
    ],
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Trabajas fuera de Monterrey?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, he documentado bodas en distintas ciudades de México y en el extranjero. Si su boda es fuera de Monterrey, escríbanme y les envío información sobre tarifas de traslado y disponibilidad.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Serás tú quien nos fotografíe personalmente?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. A diferencia de estudios que cuentan con varios fotógrafos, yo me dedico personalmente a cada boda que acepto. Por eso tomo un número muy limitado de bodas por año, garantizando atención y calidad en cada una.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Se requiere anticipo para reservar la fecha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Para confirmar su fecha se firma un contrato y se cubre un anticipo del 50% del total. El 50% restante se liquida con anticipación a la boda. Lamentablemente no es posible apartar fechas sin estos requisitos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo tardan en recibir las fotografías?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Recibirán una vista previa de más de 100 imágenes en los primeros días. La galería completa con todas las fotografías editadas en alta resolución estará lista en un plazo de 30 días después de la boda.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuántas horas de cobertura necesitamos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La mayoría de las parejas necesitan entre 8 y 10 horas de cobertura. Durante nuestra consulta inicial repasaremos juntos el itinerario del día para que tengan un estimado preciso. También es posible agregar horas adicionales al momento de reservar o incluso el mismo día de la boda.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Ofrecen video?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Cuento con un cineasta colaborador de confianza que puede documentar su boda en video cinematográfico. Su trabajo complementa perfectamente mi estilo fotográfico. Pueden preguntar por esta opción al momento de hacer su consulta.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Disparas en analógico o digital?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mi estilo está profundamente inspirado en la fotografía de película, especialmente en la paleta de Kodak Portra. Trabajo principalmente con cámara digital para garantizar la mejor calidad y consistencia, pero el proceso de edición logra esa calidez y atemporalidad del film. Todas las imágenes se entregan en formato digital.',
      },
    },
  ],
};

export default function ServiciosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <Intro />
      <Collection />
      <Upgrades />
      <Faq />
    </>
  );
}
