'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import Image from 'next/image';

// Sustituye por tus rutas reales
import emotionsPhoto from '@/assets/images/home/emotions-right.jpg'; // foto vertical
const DECOR_FLOWER = '/flower2-bottom-left.svg'; // adorno rojo (PNG/SVG)

const Section = styled.section`
  position: relative;
  overflow: visible; /* importante para que el adorno pueda salirse */
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

/* -------- Columna texto -------- */
const Copy = styled.div`
  margin-left: auto; /* empuja un poco hacia el centro en desktop */

  @media ${({ theme }) => theme.media.mdDown} {
    order: 2;        /* en móvil el texto queda debajo de la foto */
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
  margin-bottom: clamp(16px, 2vw, 24px);
`;

const Quote = styled.p`
  font-size: 18px;
  line-height: 1.55;

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: 16px;
  }
`;

const Author = styled.p`
  margin-top: clamp(16px, 2.2vw, 22px);
  font-size: 16px;
  font-style: italic;
`;

/* -------- Columna foto -------- */
const Figure = styled.figure`
  position: relative;
  margin: 0;
  overflow: visible; /* deja salir el adorno */
  width: 100%;

  @media ${({ theme }) => theme.media.mdDown} {
    order: 1;
  }
`;

const Photo = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.white}; /* “barras” si hay contain */
  z-index: 1;
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

export default function Emotions() {
  // Mantiene la proporción real de la imagen importada
  const ratio = `${emotionsPhoto.width} / ${emotionsPhoto.height}`;

  return (
    <Section aria-labelledby="emotions-title">
      <Container>
        <Grid>
          {/* Texto */}
          <Copy>
            <Title id="emotions-title">Abraza las emociones</Title>
            <Quote>
              “Nos encantó cada momento que compartimos con Luis. Desde el principio, nos hizo
              sentir tranquilos, relajados y en confianza. Aunque el clima no fue el ideal, Luis
              demostró su gran profesionalismo capturando imágenes increíbles. Cuidó cada detalle,
              buscó el mejor ángulo en cada rincón, y su pasión se notaba en cada toma. Las fotos que
              hoy tenemos no solo reflejan su gran talento, sino también la calidez y cariño con los
              que trabaja. ¡Gracias infinitas, Luis! 🥹🙏🏻💗”
            </Quote>
            <Author>— Janeth y Valentín</Author>
          </Copy>

          {/* Foto + adorno */}
          <Figure style={{ aspectRatio: ratio }}>
            <Photo>
              <Image
                src={emotionsPhoto}
                alt="Pareja abrazándose en un parque."
                fill
                placeholder="blur"
                sizes="(max-width: 850px) 92vw, 44vw"
                /* No recorta la imagen */
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
