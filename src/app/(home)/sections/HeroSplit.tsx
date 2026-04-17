'use client';

import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import heroBg from '@/assets/images/home/hero-bg.jpg';

/* ─── Animación de entrada ─── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ─── Wrapper split ─── */
const Section = styled.section`
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 42fr 58fr;

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
    grid-template-rows: 52vh 1fr;
  }
`;

/* ─── Panel izquierdo — crema ─── */
const LeftPanel = styled.div`
  background: ${({ theme }) => theme.colors.cream};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 112px clamp(32px, 5vw, 72px) clamp(48px, 5vw, 72px);
  position: relative;
  z-index: 1;

  /* Línea vertical sutil en el borde derecho */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: ${({ theme }) => theme.colors.border};
  }

  @media ${({ theme }) => theme.media.mdDown} {
    /* En móvil: orden 2 (debajo de la foto) */
    order: 2;
    padding: 40px clamp(24px, 5vw, 48px) 48px;
    justify-content: flex-start;

    &::after { display: none; }
  }
`;

/* ─── Panel derecho — foto ─── */
const RightPanel = styled.div`
  position: relative;
  overflow: hidden;

  @media ${({ theme }) => theme.media.mdDown} {
    order: 1;
  }
`;

/* ─── Contenido del panel izquierdo ─── */
const AnimBlock = styled.div<{ $show: boolean; $delay: number }>`
  opacity: 0;
  transform: translateY(10px);

  ${({ $show, $delay }) =>
    $show &&
    `
    animation: fadeUpBlock 560ms ease forwards;
    animation-delay: ${$delay}ms;
  `}

  @keyframes fadeUpBlock {
    to { opacity: 1; transform: translateY(0); }
  }
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 32px;
`;

const LogoMark = styled.img`
  width: 48px;
  height: auto;
  opacity: 0.8;

  @media ${({ theme }) => theme.media.smDown} {
    width: 36px;
  }
`;

const LogoLabel = styled.span`
  font-size: 10px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.4);
  line-height: 1.5;
`;

const Rule = styled.div`
  width: 36px;
  height: 1px;
  background: ${({ theme }) => theme.colors.black};
  opacity: 0.25;
  margin-bottom: 28px;
`;

const Eyebrow = styled.p`
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.45);
  margin-bottom: 20px;
`;

const H1 = styled.h1`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(36px, 4vw, 64px);
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: #000;
  margin-bottom: 22px;
  max-width: 14ch;

  em {
    font-style: italic;
    opacity: 0.75;
  }

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: clamp(32px, 6vw, 52px);
  }
`;

const Sub = styled.p`
  font-family: ${({ theme }) => theme.fonts.base};
  font-style: italic;
  font-size: clamp(15px, 1.4vw, 18px);
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.6);
  max-width: 36ch;
  margin-bottom: 36px;
`;

const Cta = styled(Link)`
  display: inline-block;
  padding: 11px 36px;
  border: 1px solid #000;
  background: transparent;
  color: #000;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: background 0.2s ease, color 0.2s ease, transform 0.08s ease;
  align-self: flex-start;

  &:hover  { background: #000; color: #fff; }
  &:active { transform: translateY(1px); }
`;

/* Número de edición — detalle de revista, abajo del panel */
const Edition = styled.span`
  position: absolute;
  bottom: clamp(28px, 3vw, 40px);
  left: clamp(32px, 5vw, 72px);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.22);

  @media ${({ theme }) => theme.media.mdDown} {
    display: none;
  }
`;

/* ─────────────────────────────── Componente ─────────────────────────────── */
export default function HeroSplit() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (window.scrollY > 20 || noMotion) {
      setShow(true);
      return;
    }

    const onDone = () => setShow(true);
    document.addEventListener('intro:headerDone', onDone, { once: true });
    const fallback = setTimeout(() => setShow(true), 1200);

    return () => {
      document.removeEventListener('intro:headerDone', onDone);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <Section>
      {/* ── Panel izquierdo ── */}
      <LeftPanel>
        <AnimBlock $show={show} $delay={0}>
          <LogoWrap>
            <LogoMark src="/Vector.svg" alt="Luis Benítez Photography" />
            <LogoLabel>
              Luis Benítez<br />Photography
            </LogoLabel>
          </LogoWrap>
        </AnimBlock>

        <AnimBlock $show={show} $delay={80}>
          <Eyebrow>Fotografía de bodas · Monterrey</Eyebrow>
          <Rule />
        </AnimBlock>

        <AnimBlock $show={show} $delay={160}>
          <H1>
            Instantes que<br />
            <em>perduran</em><br />
            para siempre
          </H1>
        </AnimBlock>

        <AnimBlock $show={show} $delay={240}>
          <Sub>
            Cada mirada y cada emoción cuentan una historia única —
            capturada con sensibilidad y arte.
          </Sub>
        </AnimBlock>

        <AnimBlock $show={show} $delay={320}>
          <Cta href="/contacto">Comienza tu historia</Cta>
        </AnimBlock>

        <Edition>Monterrey · México</Edition>
      </LeftPanel>

      {/* ── Panel derecho — foto sin overlay ── */}
      <RightPanel>
        <Image
          src={heroBg}
          alt="Novios en su boda capturados por Luis Benítez Photography"
          fill
          priority
          placeholder="blur"
          sizes="(max-width: 850px) 100vw, 60vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          fetchPriority="high"
        />
      </RightPanel>
    </Section>
  );
}
