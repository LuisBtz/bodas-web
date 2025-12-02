'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';

const WRAP_TOP_OFFSET = 96; // resguardo para la barra (72px) + aire

const Section = styled.section`
  padding: ${WRAP_TOP_OFFSET}px 0 72px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.white};
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 12px;
  margin-bottom: 24px;
  margin-top: 100px;
  opacity: 0.75;

  @media ${({ theme }) => theme.media.mdDown} {
    letter-spacing: 0.18em;
  }
`;

const Title = styled.h1`
  /* tipografía Cormorant ya viene desde el theme */
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.14;

  /* Tamaño fluido para que no “explote” en móviles */
  font-size: clamp(28px, 6vw, 48px);

  /* separa en dos líneas en desktop como en el diseño */
  max-width: 1100px;
  margin: 0 auto 20px;

  @media ${({ theme }) => theme.media.mdDown} {
    line-height: 1.18;
    max-width: 760px;
  }
`;

export default function Hero() {
  return (
    <Section>
      <Container>
        <Eyebrow>Bodas Reales</Eyebrow>
        <Title>
          Un vistazo íntimo a las bodas que hemos transformado en recuerdos eternos.
        </Title>
      </Container>
    </Section>
  );
}
