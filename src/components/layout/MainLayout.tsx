'use client';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const Wrapper = styled.div`
  min-height: 100dvh; /* usa 100vh si prefieres, 100dvh mejora móviles */
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // El CMS de Keystatic maneja su propio UI — no necesita header/footer del sitio.
  if (pathname?.startsWith('/keystatic') || pathname?.startsWith('/admin')) {
    return <>{children}</>;
  }

  // La landing de brochure usa su propio header y footer minimal (sin distracciones).
  const isExperiencia = pathname?.startsWith('/la-experiencia');

  return (
    <Wrapper>
      {!isExperiencia && <Header />}
      <main>{children}</main>
      {!isExperiencia && <Footer />}
    </Wrapper>
  );
}
