'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import Image from 'next/image';

// ⚠️ usa tu imagen real
import approachPhoto from '@/assets/images/home/approach-left.jpg';
const DECOR_FLOWER = '/flower-bottom-right.svg';
const EMBLEM = '/Vector.svg';

const Section = styled.section`
  position: relative;
  padding: clamp(60px, 9vw, 130px) 0;
  background: ${({ theme }) => theme.colors.white};

  @media ${({ theme }) => theme.media.mdDown} {
    padding: clamp(44px, 7vw, 70px) 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  align-items: center;
  gap: clamp(24px, 5vw, 64px);

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
  }
`;

/* Permite que el adorno sobresalga */
const Figure = styled.figure`
  position: relative;
  margin: 0;
  overflow: visible;
  width: 100%;
  /* el aspect-ratio lo pasamos inline con el real de la imagen */
    @media ${({ theme }) => theme.media.mdDown} {
    display: none;
  }
`;

const Photo = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* no necesitamos overflow hidden si usamos contain */
  background: ${({ theme }) => theme.colors.cream}; /* color de “barras” si hay */
  z-index: 1;
  border: none;
`;

const DecorBR = styled.img`
  position: absolute;
  right: -34px;
  bottom: -34px;
  width: clamp(80px, 12vw, 160px);
  pointer-events: none;
  user-select: none;
  z-index: 2;

  @media ${({ theme }) => theme.media.mdDown} {
    right: -18px;
    bottom: -18px;
  }
`;

const FigCaption = styled.figcaption`
  margin-top: 10px;
  text-align: center;
  font-style: italic;
  font-size: 14px;
  opacity: 0.85;
`;

const Copy = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  max-width: 56ch;
  margin-inline: auto;
`;

const Emblem = styled.img`
  display: block;
  width: 72px;
  margin: 0 auto 18px;

  @media ${({ theme }) => theme.media.mdDown} {
    width: 56px;
  }
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  letter-spacing: 0.01em;
  font-size: clamp(28px, 4.2vw, 35px);
  line-height: 1.18;

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: clamp(24px, 6.2vw, 34px);
  }
`;

const Paragraph = styled.p`
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.55;
  opacity: 0.95;

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: 15px;
  }
`;

const Cta = styled.a`
  display: inline-block;
  margin-top: 22px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  padding-bottom: 4px;
  transition: color .2s ease, border-color .2s ease, transform .1s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.red};
    border-color: ${({ theme }) => theme.colors.red};
  }
  &:active { transform: translateY(1px); }
`;

export default function Approach() {
  // Usa el aspect ratio real de la imagen importada
  const ratio = `${approachPhoto.width} / ${approachPhoto.height}`;

  return (
    <Section aria-labelledby="approach-title">
      <Container>
        <Grid>
          {/* Columna izquierda: foto + adorno + caption */}
          <Figure style={{ aspectRatio: ratio }}>
            <Photo>
              <Image
                src={approachPhoto}
                alt="Novios bailando durante su recepción."
                fill
                placeholder="blur"
                sizes="(max-width: 850px) 92vw, 48vw"
                // 👇 no recorta
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                priority={false}
              />
            </Photo>
            <DecorBR src={DECOR_FLOWER} alt="" />
            <FigCaption>Cada foto cuenta una historia.</FigCaption>
          </Figure>

          {/* Columna derecha */}
          <Copy>
            <Emblem src={EMBLEM} alt="" />
            <Title id="approach-title">
              Documentamos de manera creativa, luminosa y especial el romance natural de tu día.
            </Title>
            <Paragraph>
              Auténticos momentos naturales que documentamos de forma genuina
              las emociones, interacciones y la celebración única de tu historia de amor.
            </Paragraph>
            <Cta href="/servicios">
              Agenda nuestros servicios para tu día especial →
            </Cta>
          </Copy>
        </Grid>
      </Container>
    </Section>
  );
}
