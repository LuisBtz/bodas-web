'use client';

import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import heroBg from '@/assets/images/home/hero-bg.jpg';

/* ─── Animación ─── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ─── Sección — fondo crema, sin foto de fondo ─── */
const Section = styled.section`
  min-height: 100dvh;
  background: ${({ theme }) => theme.colors.cream};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 72px; /* altura del nav */
  overflow: hidden;
  position: relative;
`;

/* Línea decorativa top — igual al borde del nav */
const TopRule = styled.div`
  position: absolute;
  top: 72px;
  left: 0;
  right: 0;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
`;

const Inner = styled.div`
  max-width: 1280px;
  margin-inline: auto;
  width: 100%;
  padding: clamp(48px, 6vw, 80px) clamp(24px, 6vw, 80px) clamp(48px, 6vw, 80px);
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr auto;
  gap: 0;
  align-items: start;
  min-height: calc(100dvh - 72px);

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    min-height: auto;
    padding-bottom: 56px;
  }
`;

/* ─── Bloque de animación ─── */
const AnimBlock = styled.div<{ $show: boolean; $delay: number }>`
  opacity: 0;
  transform: translateY(10px);

  ${({ $show, $delay }) =>
    $show &&
    `
    animation: fadeUpKf 560ms ease forwards;
    animation-delay: ${$delay}ms;
  `}

  @keyframes fadeUpKf {
    to { opacity: 1; transform: translateY(0); }
  }
`;

/* ─── Eyebrow ─── */
const Eyebrow = styled.p`
  grid-column: 1;
  font-size: 11px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.4);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    background: currentColor;
    flex-shrink: 0;
  }
`;

/* ─── Tipografía dominante ─── */
const HeadlineWrap = styled.div`
  grid-column: 1;
  align-self: center;
  padding: clamp(20px, 3vw, 40px) 0;
`;

const H1 = styled.h1`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(72px, 12vw, 152px);
  line-height: 0.94;
  letter-spacing: -0.02em;
  color: #000;
  margin: 0;

  /* La segunda línea en itálica con sangría — efecto revista */
  span.it {
    display: block;
    font-style: italic;
    padding-left: clamp(32px, 6vw, 96px);
    opacity: 0.72;
  }

  span.sm {
    display: block;
    font-size: clamp(40px, 6.5vw, 84px);
    letter-spacing: 0.01em;
    font-style: normal;
    opacity: 0.55;
  }

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: clamp(52px, 14vw, 96px);

    span.sm {
      font-size: clamp(28px, 8vw, 52px);
    }
  }
`;

/* ─── Foto vertical — columna derecha ─── */
const PhotoCol = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  align-self: stretch;
  width: clamp(180px, 22vw, 320px);
  margin-left: clamp(32px, 4vw, 64px);
  position: relative;

  /* borde editorial sutil */
  &::before {
    content: '';
    position: absolute;
    inset: -8px -8px 8px 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    z-index: 0;
  }

  @media ${({ theme }) => theme.media.mdDown} {
    display: none;
  }
`;

const PhotoFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 480px;
  overflow: hidden;
  z-index: 1;
`;

/* ─── Pie de página editorial ─── */
const Footer = styled.div`
  grid-column: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  padding-top: clamp(24px, 3vw, 40px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LogoMark = styled.img`
  width: 40px;
  height: auto;
  opacity: 0.65;
`;

const FooterMeta = styled.p`
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.35);
  line-height: 1.6;
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

  &:hover  { background: #000; color: #fff; }
  &:active { transform: translateY(1px); }
`;

/* ─── Número decorativo fondo — detalle editorial ─── */
const BgNumber = styled.span`
  position: absolute;
  bottom: -0.12em;
  right: clamp(16px, 5vw, 60px);
  font-family: ${({ theme }) => theme.fonts.base};
  font-size: clamp(160px, 22vw, 320px);
  font-weight: 400;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.06);
  pointer-events: none;
  user-select: none;
  z-index: 0;

  @media ${({ theme }) => theme.media.smDown} {
    display: none;
  }
`;

/* ─────────────────────────────── Componente ─────────────────────────────── */
export default function HeroTypo() {
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
      <TopRule />

      {/* Número fantasma de fondo */}
      <BgNumber aria-hidden>01</BgNumber>

      <Inner>
        {/* Eyebrow */}
        <AnimBlock $show={show} $delay={0} style={{ gridColumn: 1 }}>
          <Eyebrow>Fotografía de bodas · Monterrey, México</Eyebrow>
        </AnimBlock>

        {/* H1 tipográfico */}
        <AnimBlock $show={show} $delay={80} style={{ gridColumn: 1 }}>
          <HeadlineWrap>
            <H1>
              Foto<span className="it">grafía</span>
              <span className="sm">de bodas</span>
            </H1>
          </HeadlineWrap>
        </AnimBlock>

        {/* Foto vertical — columna derecha */}
        <AnimBlock
          $show={show}
          $delay={160}
          style={{ gridColumn: 2, gridRow: '1 / 4', display: 'contents' }}
        >
          <PhotoCol>
            <PhotoFrame>
              <Image
                src={heroBg}
                alt="Novios capturados por Luis Benítez Photography"
                fill
                priority
                placeholder="blur"
                sizes="(max-width: 850px) 0vw, 22vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                fetchPriority="high"
              />
            </PhotoFrame>
          </PhotoCol>
        </AnimBlock>

        {/* Footer editorial */}
        <AnimBlock $show={show} $delay={240} style={{ gridColumn: 1 }}>
          <Footer>
            <FooterLeft>
              <LogoMark src="/Vector.svg" alt="Luis Benítez Photography" />
              <FooterMeta>
                Luis Benítez Photography<br />
                Monterrey · México
              </FooterMeta>
            </FooterLeft>
            <Cta href="/contacto">Comienza tu historia</Cta>
          </Footer>
        </AnimBlock>
      </Inner>
    </Section>
  );
}
