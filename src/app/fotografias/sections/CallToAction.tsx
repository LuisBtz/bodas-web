'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import Link from 'next/link';

const Section = styled.section`
  position: relative;
  padding: 88px 0 96px;
  background: ${({ theme }) => theme.colors.white};
  text-align: center;
  overflow: visible;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Wrap = styled.div`
  position: relative;
  z-index: 2;
  max-width: 920px;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  letter-spacing: .14em;
  text-transform: uppercase;
  font-size: 12px;
  opacity: .7;
  margin-bottom: 18px;
`;

const H = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  line-height: ${({ theme }) => theme.lineHeights.h2};
  margin-bottom: 16px;

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: 36px;
    line-height: 1.1;
  }
`;

const Sub = styled.p`
  max-width: 720px;
  margin: 0 auto 28px;
  font-size: 20px;
  line-height: 1.55;

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: 18px;
  }
`;

const Lines = styled.div`
  position: relative;
  display: inline-block;
  margin: 10px 0 24px;
  .line {
    position: absolute;
    top: 12px;
    width: 56px;
    height: 1px;
    background: ${({ theme }) => theme.colors.black};
  }
  .l1 { left: -72px; }
  .l2 { right: -72px; }

  @media ${({ theme }) => theme.media.xsDown} {
    .line { display:none; }
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Btn = styled(Link)<{ $variant?: 'primary' | 'outline' }>`
  padding: 10px 28px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  letter-spacing: .02em;
  transition: background .2s ease, color .2s ease, transform .08s ease;
  border-radius: 0;

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `
        background: ${theme.colors.black};
        color: ${theme.colors.white};
        &:hover { background: transparent; color: ${theme.colors.black}; }
      `
      : `
        background: transparent;
        color: ${theme.colors.black};
        &:hover { background: ${theme.colors.black}; color: ${theme.colors.white}; }
      `
  }

  &:active { transform: translateY(1px); }
`;

const Deco = styled.img<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => ($side === 'left' ? 'left:3%;' : 'right:3%;')}
  width: 160px;
  opacity: .85;
  pointer-events: none;
  user-select: none;

  @media ${({ theme }) => theme.media.mdDown} {
    display: none;
  }
`;

export default function CallToAction() {
  return (
    <Section>
      {/* opcional: coloca tus SVG florales en /public */}
      <Deco src="/decor-left5.svg" alt="" $side="left" />
      <Deco src="/decor6-right.svg" alt="" $side="right" />

      <Container>
        <Wrap>
          <Eyebrow>Luis Benítez Photography</Eyebrow>

          <Lines>
            <span className="line l1" />
            <span>¿Te imaginas tus recuerdos así?</span>
            <span className="line l2" />
          </Lines>

          <H>Hablemos de su boda</H>
          <Sub>
            Agenda tu fecha y conversemos sobre el día, el lugar y lo que sueñan.
            Cada historia es única; me encantará documentarla con sensibilidad y arte.
          </Sub>

          <Actions>
            <Btn href="/contacto" $variant="primary">Consultar disponibilidad</Btn>
            <Btn href="/servicios" $variant="outline">Ver servicios y precios</Btn>
          </Actions>
        </Wrap>
      </Container>
    </Section>
  );
}
