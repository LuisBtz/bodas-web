import type { Metadata } from 'next';
import Hero from './sections/Hero';
import CallToAction from './sections/CallToAction';
import SessionsGrid from './sections/SessionsGrid';

// demo: usa las fotos que prefieras
import g1 from '@/assets/images/home/gallery/g1.jpg';
// import g2 from '@/assets/images/home/gallery/g2.jpg';
// import g4 from '@/assets/images/home/gallery/g4.jpg';

  



export const metadata: Metadata = {
  title: 'Bodas reales | Luis Benítez Photography',
  description: 'Un vistazo íntimo a las bodas que hemos transformado en recuerdos eternos',
};

export default function BodasRealesPage() {

  const sessions = [
    {
      title: 'Cynthia & Fer',
      subtitle: 'Cuando el amor se convierte en arte.',
      href: 'https://luisbenitezphotography.pic-time.com/-genderrevealjanetthvalentin/sneakpeek',
      image: g1,
    },
    // {
    //   title: 'Cynthia & Fer',
    //   subtitle: 'Cuando el amor se convierte en arte.',
    //   href: 'https://luisbenitezphotography.pic-time.com/', // pon el definitivo cuando exista
    //   image: g2,
    // },
    // {
    //   title: 'Cynthia & Fer',
    //   subtitle: 'Cuando el amor se convierte en arte.',
    //   href: 'https://luisbenitezphotography.pic-time.com/', // pon el definitivo cuando exista
    //   image: g4,
    // },
  ];
  return (
    <>
        <Hero />

        <SessionsGrid items={sessions} />
        <CallToAction />

    </>
  );
}
