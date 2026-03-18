'use client';

import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import heroBg from '@/assets/images/home/hero-bg.jpg';

/* ─── Animación de entrada ─── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ─── Layout ─── */
const Section = styled.section`
  position: relative;
  min-height: 100dvh;
  overflow: hidden;
`;

/* Gradiente en la franja inferior — la foto respira arriba, el texto es legible abajo */
const Gradient = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    transparent 35%,
    rgba(255, 248, 244, 0.55) 62%,
    rgba(255, 248, 244, 0.92) 80%,
    #FFF8F4 100%
  );
`;

/* ─── Contenido ─── */
const Content = styled.div<{ $show: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  padding: 0 0 clamp(48px, 6vw, 80px) clamp(24px, 7vw, 100px);

  /* La animación se activa cuando $show es true */
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 100ms ease;

  @media ${({ theme }) => theme.media.mdDown} {
    padding: 0 0 clamp(40px, 5vw, 64px) clamp(20px, 5vw, 48px);
  }

  @media ${({ theme }) => theme.media.smDown} {
    padding: 0 24px clamp(36px, 5vw, 56px);
  }
`;

/* Logo decorativo */
const LogoMark = styled.img<{ $delay: number; $show?: boolean }>`
  width: 52px;
  height: auto;
  display: block;
  opacity: 0.7;
  margin-bottom: 20px;

  animation: ${({ $show }) => ($show ? fadeUp : 'none')} 600ms ease forwards;
  animation-delay: ${({ $delay }) => $delay}ms;

  @media ${({ theme }) => theme.media.smDown} {
    width: 40px;
    margin-bottom: 14px;
  }
`;

/* Línea de marca + eyebrow */
const Eyebrow = styled.p`
  font-size: 11px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 14px;

  &::before {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: currentColor;
    flex-shrink: 0;
  }
`;

/* Título principal */
const H1 = styled.h1`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(44px, 6.5vw, 96px);
  line-height: 1.04;
  letter-spacing: -0.01em;
  color: #000;
  max-width: 12ch;
  margin-bottom: 20px;

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: clamp(38px, 8vw, 64px);
  }
`;

/* Subtítulo */
const Sub = styled.p`
  font-family: ${({ theme }) => theme.fonts.base};
  font-style: italic;
  font-size: clamp(17px, 2vw, 22px);
  line-height: 1.55;
  color: rgba(0, 0, 0, 0.65);
  max-width: 38ch;
  margin-bottom: 32px;

  @media ${({ theme }) => theme.media.smDown} {
    font-size: 16px;
    margin-bottom: 24px;
  }
`;

/* CTA */
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

/* Línea decorativa inferior derecha — detalle editorial */
const CornerLabel = styled.span`
  position: absolute;
  bottom: clamp(48px, 6vw, 80px);
  right: clamp(24px, 4vw, 56px);
  z-index: 2;
  font-size: 10px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.3);
  writing-mode: vertical-rl;
  transform: rotate(180deg);

  @media ${({ theme }) => theme.media.mdDown} {
    display: none;
  }
`;

/* Stagger individual para cada bloque de contenido */
const AnimBlock = styled.div<{ $show: boolean; $delay: number }>`
  opacity: 0;
  transform: translateY(12px);

  ${({ $show, $delay }) =>
    $show &&
    `
    animation: fadeUpAnim 580ms ease forwards;
    animation-delay: ${$delay}ms;
  `}

  @keyframes fadeUpAnim {
    to { opacity: 1; transform: translateY(0); }
  }
`;

/* ─────────────────────────────── Componente ─────────────────────────────── */
export default function HeroEditorial() {
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
      {/* Foto de fondo */}
      <Image
        src={heroBg}
        alt="Novios en su boda capturados por Luis Benítez Photography"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        fetchPriority="high"
      />

      {/* Gradiente crema desde abajo */}
      <Gradient />

      {/* Texto bottom-left */}
      <Content $show={show}>
        <AnimBlock $show={show} $delay={0}>
          <LogoMark
            src="/Vector.svg"
            alt="Luis Benítez Photography"
            $delay={0}
            $show={show}
          />
        </AnimBlock>

        <AnimBlock $show={show} $delay={80}>
          <Eyebrow>Fotografía de bodas · Monterrey</Eyebrow>
        </AnimBlock>

        <AnimBlock $show={show} $delay={160}>
          <H1>Instantes que perduran para siempre</H1>
        </AnimBlock>

        <AnimBlock $show={show} $delay={240}>
          <Sub>
            Cada mirada, cada gesto y cada emoción cuentan una historia
            única — capturada con sensibilidad y arte.
          </Sub>
        </AnimBlock>

        <AnimBlock $show={show} $delay={320}>
          <Cta href="/contacto">Comienza tu historia</Cta>
        </AnimBlock>
      </Content>

      {/* Detalle tipográfico esquina inferior derecha */}
      <CornerLabel>Luis Benítez Photography</CornerLabel>
    </Section>
  );
}
