'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '@/components/ui/Container';
import Image from 'next/image';
import heroBg from '@/assets/images/footer/2.jpg';
import heroBgMobile from '@/assets/images/footer/2-mobile.jpg';

const HeroImageDesktop = styled(Image)`
  @media ${({ theme }) => theme.media.mdDown} {
    display: none;
  }
`;

const HeroImageMobile = styled(Image)`
  display: none;
  @media ${({ theme }) => theme.media.mdDown} {
    display: block;
  }
`;

const Section = styled.section`
  position: relative;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

const Overlay = styled.div<{ $show: boolean }>`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 700ms ease;
  z-index: 0;
`;

const Inner = styled.div`
  /* ---- Animación de aparición ---- */
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 480ms ease, transform 480ms ease;

  &[data-show='true'] {
    opacity: 1;
    transform: translateY(0);
  }

  h1 {
  }

  h2.desc {
    margin-top: 30px;
    font-style: italic;
    margin-bottom: 30px;

    @media ${({ theme }) => theme.media.mdDown} {
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }

  p.sub {
    margin-top: 8px;
    max-width: 680px;
    margin-inline: auto;
    margin-bottom: 50px;

    @media ${({ theme }) => theme.media.mdDown} {
      margin-bottom: 20px;
    }
  }

  .cta {
    margin-top: 24px;
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .lines {
    position: relative;
    display: inline-block;
    margin-bottom: 10px;

    .line {
      height: 1px;
      width: 50px;
      background-color: black;
      position: absolute;
    }

    .line1 {
      top: 12px;
      left: -70px;

      @media ${({ theme }) => theme.media.xsDown} {
        display: none;
      }
    }

    .line2 {
      top: 12px;
      right: -70px;

      @media ${({ theme }) => theme.media.xsDown} {
        display: none;
      }
    }

    span {
      display: inline-block;
    }
  }
`;

const Btn = styled.a<{ $variant?: 'primary' | 'outline' }>`
  padding: 5px 30px;
  border-radius: 0;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background: none;
  color: black;
  transition: all .2s ease-in-out;
  text-transform: uppercase;

  &:active { transform: translateY(1px); }
  &:hover { background-color: black; color: white; }
`;

export const BrandMark = styled.img`
  display: block;
  width: 90px;
  margin: 0 auto 20px;

  /* <= 850px */
  @media ${({ theme }) => theme.media.mdDown} {
    width: 50px;
  }

  @media ${({ theme }) => theme.media.xsDown} {
    display: none;
  }
`;

export default function Hero() {
  const [overlayShow, setOverlayShow] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Si ya hay scroll o el usuario prefiere menos movimiento → mostrar de inmediato
    if (window.scrollY > 20 || noMotion) {
      setOverlayShow(true);
      setShow(true);
      return;
    }

    // Overlay aparece primero, luego el texto
    const overlayTimer = setTimeout(() => setOverlayShow(true), 700);
    const textTimer = setTimeout(() => setShow(true), 1500);

    return () => {
      clearTimeout(overlayTimer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <Section>
      <HeroImageDesktop
        src={heroBg}
        alt="Novios tomados de la mano dándose un beso en el altar durante la ceremonia religiosa, con la novia en vestido blanco y el novio en traje negro."
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center', zIndex: -1 }}
        fetchPriority="high"
      />
      <HeroImageMobile
        src={heroBgMobile}
        alt="Novios tomados de la mano dándose un beso en el altar durante la ceremonia religiosa, con la novia en vestido blanco y el novio en traje negro."
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center', zIndex: -1 }}
      />
      <Overlay $show={overlayShow} />
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <Inner data-show={show ? 'true' : undefined}>
          <BrandMark
            src="/Vector.svg"
            alt="Logotipo de Luis Benítez Photography con las iniciales LBP en tipografía elegante dentro de un círculo adornado con ramas florales."
          />

          <div className="lines">
            <div className="line1 line"></div>
            <span>Luis Benítez Photography</span>
            <div className="line2 line"></div>
          </div>

          <h1>Fotografía de bodas en Monterrey</h1>
          <h2 className="desc">Instantes que se convierten en memorias eternas.</h2>
          <p className="sub">
            Cada mirada, cada gesto y cada emoción cuentan una historia única. Mi misión es capturar la esencia de tu amor con sensibilidad y arte, creando imágenes que perduren más allá del tiempo.
          </p>

          <div className="cta">
            <Btn href="/contacto" $variant="primary">Comienza tu historia</Btn>
          </div>
        </Inner>
      </Container>
    </Section>
  );
}
