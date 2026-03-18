'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import Image from 'next/image';

import introPhoto from '@/assets/images/home/value-right.jpg';

const Section = styled.section`
  padding: clamp(64px, 9vw, 120px) 0;
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.black};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: start;
  gap: clamp(32px, 6vw, 80px);

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
  }
`;

/* ---- Columna texto ---- */
const Copy = styled.div``;

const Headline = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-size: clamp(26px, 4vw, 44px);
  line-height: 1.16;
  margin-bottom: clamp(36px, 5vw, 56px);

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: clamp(22px, 6vw, 34px);
    margin-bottom: 32px;
  }
`;

const PillarList = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 3.5vw, 40px);
`;

const Pillar = styled.article``;

const PillarLabel = styled.h3`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 13px;
  margin-bottom: 10px;
`;

const PillarText = styled.p`
  font-size: 15px;
  line-height: 1.7;
  opacity: 0.85;
  max-width: 54ch;
`;

/* ---- Columna foto ---- */
const Figure = styled.figure`
  position: relative;
  margin: 0;
  width: 100%;
  overflow: hidden;

  @media ${({ theme }) => theme.media.mdDown} {
    max-width: 480px;
    margin-inline: auto;
    order: -1;
  }
`;

const pillars = [
  {
    label: 'Atemporal',
    text: 'Combino la esencia de la fotografía de película con la tecnología digital para crear imágenes que serán igual de emotivas en 35 años que hoy. Un estilo clásico que nunca pasa de moda.',
  },
  {
    label: 'Natural',
    text: 'Una de mis cosas favoritas es hacer que olvides que hay una cámara. Las mejores fotografías suceden cuando estás presente disfrutando tu día. Mi habilidad para crear confianza produce imágenes relajadas que se sienten y se ven como ustedes.',
  },
  {
    label: 'Sin esfuerzo',
    text: 'Desde la planeación previa hasta la entrega del álbum, cada etapa del proceso está diseñada para que vivan su boda sin preocupaciones. Mi experiencia se siente desde el primer contacto hasta el momento en que abren su galería.',
  },
];

export default function Intro() {
  const ratio = `${introPhoto.width} / ${introPhoto.height}`;

  return (
    <Section aria-labelledby="intro-title">
      <Container>
        <Grid>
          {/* Columna texto */}
          <Copy>
            <Headline id="intro-title">
              Una experiencia de fotografía de boda inigualable
            </Headline>
            <PillarList>
              {pillars.map((p) => (
                <Pillar key={p.label}>
                  <PillarLabel>{p.label}</PillarLabel>
                  <PillarText>{p.text}</PillarText>
                </Pillar>
              ))}
            </PillarList>
          </Copy>

          {/* Columna foto */}
          <Figure style={{ aspectRatio: ratio }}>
            <Image
              src={introPhoto}
              alt="Pareja de novios en un pasillo iluminado con velas durante su boda."
              fill
              placeholder="blur"
              sizes="(max-width: 850px) 92vw, 44vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </Figure>
        </Grid>
      </Container>
    </Section>
  );
}
