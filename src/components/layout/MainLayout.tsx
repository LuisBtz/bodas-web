'use client';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const Wrapper = styled.div`
  min-height: 100dvh; /* usa 100vh si prefieres, 100dvh mejora móviles */
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Header />
      <main>{children}</main>
      <Footer />
    </Wrapper>
  );
}
