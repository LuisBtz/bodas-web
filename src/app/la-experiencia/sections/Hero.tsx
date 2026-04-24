'use client';

import Image from 'next/image';
import styled from 'styled-components';
import Container from '@/components/ui/Container';

const HERO_IMAGE = '/bodas-reales/amy-and-jorge/coverImage.webp';

const Section = styled.section`
  position: relative;
  width: 100%;
  height: calc(100dvh - 44px);
  min-height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.black};
  overflow: hidden;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    object-fit: cover;
    object-position: center;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(255, 248, 244, 0.5) 0%,
    rgba(255, 248, 244, 0.85) 40%,
    rgba(255, 248, 244, 1) 100%
  );
`;

const Decor = styled.div`
  position: absolute;
  z-index: 2;
  pointer-events: none;
  opacity: 0.85;

  &.tl {
    top: 10%;
    left: 10%;
    width: clamp(50px, 14vw, 80px);
  }
  &.br {
    bottom: 10%;
    right: 10%;
    width: clamp(50px, 14vw, 80px);
  }

  @media ${({ theme }) => theme.media.mdDown} {
    opacity: 0.75;
    &.tl { top: 16px; width: 90px; }
    &.br { width: 90px; }
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 16px;
  max-width: 900px;
  margin-inline: auto;
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.28em;
  font-size: 11px;
  opacity: 0.65;
  margin-bottom: 22px;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(40px, 7.5vw, 88px);
  line-height: 1.05;
  letter-spacing: 0.01em;
  margin-bottom: 22px;

  .it {
    font-style: italic;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(15px, 1.6vw, 18px);
  line-height: 1.65;
  max-width: 54ch;
  margin: 0 auto 44px;
  opacity: 1
`;

const Cta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: transparent;
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 12px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  transition: background 0.2s ease, color 0.2s ease, transform 0.08s ease;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }
  &:active {
    transform: translateY(1px);
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.red};
    outline-offset: 4px;
  }
`;

export default function Hero() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('solicitar-guia');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Section aria-labelledby="experiencia-hero-title">
      <Backdrop>
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
        />
      </Backdrop>
      <Overlay aria-hidden="true" />

      <Decor className="tl" aria-hidden="true">
        <Image
          src="/decor-top-left.svg"
          alt=""
          width={180}
          height={180}
          style={{ width: '100%', height: 'auto' }}
        />
      </Decor>
      <Decor className="br" aria-hidden="true">
        <Image
          src="/decor-bottom-right.svg"
          alt=""
          width={180}
          height={180}
          style={{ width: '100%', height: 'auto' }}
        />
      </Decor>

      <Container>
        <Inner>
          <Eyebrow>La experiencia</Eyebrow>
          <Title id="experiencia-hero-title">
            La experiencia <span className="it">completa</span>
          </Title>
          <Subtitle>
            Conoce el proceso, los paquetes y la filosofía detrás de cada boda
            que documento.
          </Subtitle>
          <Cta href="#solicitar-guia" onClick={handleClick}>
            Solicitar la guía <span aria-hidden="true">→</span>
          </Cta>
        </Inner>
      </Container>
    </Section>
  );
}
