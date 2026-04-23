'use client';

import { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import Container from '@/components/ui/Container';
import Image from 'next/image';

import testimonio1 from '@/assets/images/home/testimonio-1.jpg';
import testimonio2 from '@/assets/images/home/testimonio-2.jpg';
import testimonio3 from '@/assets/images/home/testimonio-3.jpg';
const DECOR_FLOWER = '/flower2-bottom-left.svg';

/* ═══════════════════════════════════════════
   Data
   ═══════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    quote:
      '"Trabajar con Luis fue una experiencia maravillosa de principio a fin. Desde que platicamos por primera vez, nos transmitió una calma y seguridad que nos hizo saber que habíamos elegido bien. El día de la boda, su energía positiva y su manera de dirigirnos sin que se sintiera forzado hizo que todo fluyera naturalmente. Recorrimos el centro de Monterrey buscando las mejores locaciones, y Luis tenía un ojo increíble para encontrar rincones llenos de luz y vida que ni siquiera sabíamos que existían. Su pasión por lo que hace se nota en cada click, en cómo espera el momento perfecto, en cómo cuida cada detalle. Las fotos que nos entregó son un tesoro que superó todas nuestras expectativas: emotivas, auténticas y llenas de ese calor regio que queríamos capturar. ¡Gracias por tu talento y por hacernos sentir tan especiales, Luis!"',
    author: 'Amy & Jorge',
    photo: testimonio1,
    alt: 'Amy y Jorge en el centro de Monterrey.',
  },
  {
    quote:
      '"Nos encantó cada momento que compartimos con Luis. Desde el principio, nos hizo sentir tranquilos, relajados y en confianza. Aunque el clima no fue el ideal, Luis demostró su gran profesionalismo capturando imágenes increíbles. Cuidó cada detalle, buscó el mejor ángulo en cada rincón, y su pasión se notaba en cada toma. Las fotos que hoy tenemos no solo reflejan su gran talento, sino también la calidez y cariño con los que trabaja. ¡Gracias infinitas, Luis!"',
    author: 'Janeth y Valentín',
    photo: testimonio2,
    alt: 'Janeth y Valentín durante su boda.',
  },
  {
    quote:
      '"Las fotografías que nos tomó son un sueño, estamos encantados y maravillados con ellas. Lo recomendamos ampliamente, además de que conecta muy bonito con lo que tienes de tema de la boda. Estamos muy agradecidos de que capturara con tanta magia esos momentos."',
    author: 'Victoria & Arturo',
    photo: testimonio3,
    alt: 'Victoria y Arturo en su boda.',
  },
];

/* ═══════════════════════════════════════════
   Styled
   ═══════════════════════════════════════════ */
const Section = styled.section`
  position: relative;
  overflow: visible;
  padding: clamp(60px, 9vw, 130px) 0;
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.black};

  @media ${({ theme }) => theme.media.mdDown} {
    padding: clamp(44px, 7vw, 70px) 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.95fr;
  align-items: center;
  gap: clamp(28px, 6vw, 80px);

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

/* ─── Left: Text carousel ─── */
const CopyColumn = styled.div`
  margin-left: auto;

  @media ${({ theme }) => theme.media.mdDown} {
    order: 2;
    margin-left: 0;
    max-width: 70ch;
  }
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  letter-spacing: 0.01em;
  font-size: clamp(32px, 4.5vw, 56px);
  line-height: 1.12;
  margin-bottom: clamp(24px, 3vw, 36px);
`;

/* Carousel viewport — clips overflow */
const CarouselViewport = styled.div`
  position: relative;
  overflow: hidden;
`;

/* Track that slides horizontally */
const CarouselTrack = styled.div<{ $index: number }>`
  display: flex;
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${({ $index }) => $index * -100}%);
`;

/* Each slide takes full width */
const Slide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
`;

const Quote = styled.blockquote`
  margin: 0;
  font-size: 18px;
  line-height: 1.55;
  font-style: normal;

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: 16px;
  }
`;

const Author = styled.p`
  margin-top: clamp(16px, 2.2vw, 22px);
  font-size: 16px;
  font-style: italic;
  opacity: 0.7;
`;

/* ─── Controls ─── */
const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: clamp(28px, 3vw, 40px);
`;

const NavButton = styled.button`
  width: 44px;
  height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  font-size: 18px;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.black};
  }

  &:disabled {
    opacity: 0.2;
    cursor: default;
  }
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.black};
  padding: 0;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease;
  background: transparent;

  ${({ $active, theme }) =>
    $active &&
    css`
      background: ${theme.colors.black};
      transform: scale(1.2);
    `}
`;

const Counter = styled.span`
  font-size: 12px;
  letter-spacing: 0.08em;
  opacity: 0.35;
  margin-left: auto;
  font-variant-numeric: tabular-nums;
`;

/* ─── Right: Photo ─── */
const Figure = styled.figure`
  position: relative;
  margin: 0;
  overflow: visible;
  width: 100%;

  @media ${({ theme }) => theme.media.mdDown} {
    order: 1;
  }
`;

const Photo = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.white};
  z-index: 1;

  img {
    animation: fadeIn 0.5s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const DecorBL = styled.img`
  position: absolute;
  left: -56px;
  bottom: -84px;
  width: clamp(90px, 14vw, 200px);
  pointer-events: none;
  user-select: none;
  z-index: 2;

  @media ${({ theme }) => theme.media.mdDown} {
    left: -20px;
    bottom: -24px;
    width: clamp(78px, 22vw, 140px);
  }
`;

/* ═══════════════════════════════════════════
   Component
   ═══════════════════════════════════════════ */
export default function Emotions() {
  const [current, setCurrent] = useState(0);
  const total = TESTIMONIALS.length;

  const prev = useCallback(
    () => setCurrent((c) => Math.max(0, c - 1)),
    [],
  );
  const next = useCallback(
    () => setCurrent((c) => Math.min(total - 1, c + 1)),
    [total],
  );

  const activePhoto = TESTIMONIALS[current].photo;
  const ratio = `${activePhoto.width} / ${activePhoto.height}`;

  return (
    <Section aria-labelledby="emotions-title">
      <Container>
        <Grid>
          {/* ── Testimonial carousel ── */}
          <CopyColumn>
            <Title id="emotions-title">Abraza las emociones</Title>

            <CarouselViewport aria-live="polite">
              <CarouselTrack $index={current}>
                {TESTIMONIALS.map((t, i) => (
                  <Slide key={i} aria-hidden={i !== current}>
                    <Quote>{t.quote}</Quote>
                    <Author>— {t.author}</Author>
                  </Slide>
                ))}
              </CarouselTrack>
            </CarouselViewport>

            <Controls>
              <NavButton
                onClick={prev}
                disabled={current === 0}
                aria-label="Testimonio anterior"
              >
                ←
              </NavButton>
              <NavButton
                onClick={next}
                disabled={current === total - 1}
                aria-label="Siguiente testimonio"
              >
                →
              </NavButton>

              <Dots>
                {TESTIMONIALS.map((_, i) => (
                  <Dot
                    key={i}
                    $active={i === current}
                    onClick={() => setCurrent(i)}
                    aria-label={`Ir a testimonio ${i + 1}`}
                  />
                ))}
              </Dots>

              <Counter>
                {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </Counter>
            </Controls>
          </CopyColumn>

          {/* ── Photo + decor ── */}
          <Figure style={{ aspectRatio: ratio }}>
            <Photo>
              <Image
                key={current}
                src={activePhoto}
                alt={TESTIMONIALS[current].alt}
                fill
                placeholder="blur"
                sizes="(max-width: 850px) 92vw, 44vw"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </Photo>
            <DecorBL src={DECOR_FLOWER} alt="" />
          </Figure>
        </Grid>
      </Container>
    </Section>
  );
}
