'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import Image from 'next/image';

import photoA from '@/assets/images/home/gallery/g3.webp';
import photoB from '@/assets/images/home/gallery/g2.webp';

const Section = styled.section`
  padding: clamp(64px, 9vw, 120px) 0;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;

const SectionHeader = styled.header`
  text-align: center;
  margin-bottom: clamp(48px, 6vw, 72px);
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: clamp(24px, 4.5vw, 42px);
  line-height: 1.18;

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: clamp(22px, 6vw, 32px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  align-items: center;
  gap: clamp(32px, 6vw, 80px);

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
  }
`;

/* ---- Fotos apiladas ---- */
const PhotoStack = styled.div`
  position: relative;
  /* alto total = foto grande + desplazamiento */
  height: clamp(340px, 52vw, 560px);

  @media ${({ theme }) => theme.media.mdDown} {
    height: clamp(280px, 72vw, 440px);
    max-width: 480px;
    margin-inline: auto;
  }
`;

const PhotoBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 68%;
  height: 78%;
  overflow: hidden;
  z-index: 1;
`;

const PhotoFront = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 72%;
  height: 82%;
  overflow: hidden;
  z-index: 2;
  box-shadow: -6px 6px 28px rgba(0, 0, 0, 0.12);
`;

/* ---- Lista de incluidos ---- */
const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(22px, 3vw, 32px);
`;

const Feature = styled.article``;

const FeatureName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 13px;
  margin-bottom: 6px;

  span.plus {
    margin-right: 6px;
    opacity: 0.5;
  }
`;

const FeatureDesc = styled.p`
  font-size: 15px;
  line-height: 1.65;
  opacity: 0.82;
  max-width: 46ch;

  @media ${({ theme }) => theme.media.mdDown} {
    max-width: 100%;
  }
`;

const includes = [
  {
    name: 'Cobertura desde 6 horas',
    desc: 'Toda colección incluye un mínimo de 6 horas de cobertura continua. Podemos ampliar el tiempo según las necesidades de su día.',
  },
  {
    name: 'Todas sus fotografías',
    desc: '700+ imágenes editadas en alta resolución entregadas en su galería digital privada. Sin límite de selección.',
  },
  {
    name: 'Galería digital en línea',
    desc: 'Acceso privado a su galería donde pueden descargar, compartir y guardar sus recuerdos fácilmente desde cualquier dispositivo.',
  },
  {
    name: 'Vista previa en días',
    desc: 'Recibirán una selección de más de 100 fotografías en los primeros días posteriores a la boda, para que empiecen a revivir los momentos.',
  },
  {
    name: 'Segundo fotógrafo',
    desc: 'Un fotógrafo de confianza me acompaña para cubrir simultáneamente distintos ángulos y momentos de la ceremonia y recepción.',
  },
];

export default function Collection() {
  return (
    <Section aria-labelledby="collection-title">
      <Container>
        <SectionHeader>
          <Title id="collection-title">
            La colección de fotografía de boda
          </Title>
        </SectionHeader>

        <Grid>
          {/* Fotos apiladas */}
          <PhotoStack>
            <PhotoBack>
              <Image
                src={photoB}
                alt="Detalle de la decoración floral de una boda."
                fill
                placeholder="blur"
                sizes="(max-width: 850px) 48vw, 32vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </PhotoBack>
            <PhotoFront>
              <Image
                src={photoA}
                alt="Novios compartiendo un momento íntimo durante su boda."
                fill
                placeholder="blur"
                sizes="(max-width: 850px) 52vw, 34vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
            </PhotoFront>
          </PhotoStack>

          {/* Lista de incluidos */}
          <FeatureList>
            {includes.map((item) => (
              <Feature key={item.name}>
                <FeatureName>
                  <span className="plus">+</span>
                  {item.name}
                </FeatureName>
                <FeatureDesc>{item.desc}</FeatureDesc>
              </Feature>
            ))}
          </FeatureList>
        </Grid>
      </Container>
    </Section>
  );
}
