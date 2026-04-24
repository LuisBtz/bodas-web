'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import Image from 'next/image';
import Link from 'next/link';

import photoCouple from '@/assets/images/home/gallery/g1.webp';
import photoDetail from '@/assets/images/home/gallery/g4.webp';

const Section = styled.section`
  padding: clamp(64px, 9vw, 120px) 0 0;
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.black};
`;

/* ---- Bloque superior: complementos + fotos ---- */
const UpgradesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  gap: clamp(32px, 6vw, 80px);
  padding-bottom: clamp(64px, 9vw, 120px);

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
  }
`;

const Copy = styled.div``;

const BlockTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: clamp(22px, 3.5vw, 36px);
  line-height: 1.18;
  margin-bottom: clamp(28px, 4vw, 44px);
`;

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
`;

/* Video highlight */
const VideoFeature = styled.article`
  border-left: 2px solid ${({ theme }) => theme.colors.black};
  padding-left: 16px;
  margin-top: 4px;
`;

const VideoLabel = styled.p`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  opacity: 0.55;
  margin-bottom: 6px;
`;

/* Fotos */
const PhotoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${({ theme }) => theme.media.mdDown} {
    flex-direction: row;
    max-width: 520px;
    margin-inline: auto;
  }

  @media ${({ theme }) => theme.media.smDown} {
    flex-direction: column;
  }
`;

const PhotoWrap = styled.div<{ $ratio: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio};
  overflow: hidden;

  @media ${({ theme }) => theme.media.mdDown} {
    flex: 1;
  }
`;

/* ---- Bloque inferior: fechas limitadas ---- */
const LimitedDates = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: clamp(48px, 6vw, 72px) 0;
`;

const LimitedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 6vw, 80px);
  align-items: center;

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
  }
`;

const LimitedCopy = styled.div``;

const LimitedTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: clamp(22px, 3.5vw, 36px);
  margin-bottom: 20px;
`;

const LimitedText = styled.p`
  font-size: 15px;
  line-height: 1.75;
  opacity: 0.85;
  max-width: 52ch;
  margin-bottom: 12px;
`;

const ContactBtn = styled(Link)`
  display: inline-block;
  margin-top: 24px;
  padding: 14px 48px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 13px;
  transition: background 0.2s ease, color 0.2s ease, transform 0.08s ease;

  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.colors.black};
    outline: 1px solid ${({ theme }) => theme.colors.black};
  }
  &:active { transform: translateY(1px); }
`;

const upgrades = [
  {
    name: 'Sesión de compromiso',
    desc: 'La manera perfecta de celebrar su noviazgo y ganar confianza frente a la cámara antes del gran día. Una sesión relajada y llena de amor.',
    isVideo: false,
  },
  {
    name: 'Álbum de boda',
    desc: 'La culminación de todos sus recuerdos en un libro de arte impreso con la más alta calidad. Un objeto para atesorar generación tras generación.',
    isVideo: false,
  },
  {
    name: 'Cobertura de fin de semana',
    desc: 'Cobertura para ensayo de boda, cena de bienvenida y otros eventos previos. Consultar disponibilidad y precio.',
    isVideo: false,
  },
  {
    name: 'Video cinematográfico',
    desc: 'Cuento con un cineasta colaborador de confianza que complementa mi trabajo con una narrativa visual en video de nivel cinematográfico. Así, además de las fotografías, tendrán una película de su boda que los hará revivir cada emoción.',
    isVideo: true,
  },
];

export default function Upgrades() {
  const ratioCouple = `${photoCouple.width} / ${photoCouple.height}`;
  const ratioDetail = `${photoDetail.width} / ${photoDetail.height}`;

  return (
    <Section>
      <Container>
        {/* Complementos */}
        <UpgradesGrid>
          <Copy>
            <BlockTitle>Complementos de colección</BlockTitle>
            <FeatureList>
              {upgrades.map((item) =>
                item.isVideo ? (
                  <VideoFeature key={item.name}>
                    <VideoLabel>Servicio adicional exclusivo</VideoLabel>
                    <FeatureName>
                      <span className="plus">+</span>
                      {item.name}
                    </FeatureName>
                    <FeatureDesc>{item.desc}</FeatureDesc>
                  </VideoFeature>
                ) : (
                  <Feature key={item.name}>
                    <FeatureName>
                      <span className="plus">+</span>
                      {item.name}
                    </FeatureName>
                    <FeatureDesc>{item.desc}</FeatureDesc>
                  </Feature>
                )
              )}
            </FeatureList>
          </Copy>

          <PhotoCol>
            <PhotoWrap $ratio={ratioCouple}>
              <Image
                src={photoCouple}
                alt="Pareja de novios celebrando con confeti en su boda."
                fill
                placeholder="blur"
                sizes="(max-width: 850px) 46vw, 36vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </PhotoWrap>
            <PhotoWrap $ratio={ratioDetail}>
              <Image
                src={photoDetail}
                alt="Detalle del altar de la iglesia durante la ceremonia."
                fill
                placeholder="blur"
                sizes="(max-width: 850px) 46vw, 36vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </PhotoWrap>
          </PhotoCol>
        </UpgradesGrid>

        {/* Fechas limitadas */}
        <LimitedDates>
          <LimitedGrid>
            <LimitedCopy>
              <LimitedTitle>Fechas limitadas</LimitedTitle>
              <LimitedText>
                Tomo un número muy reducido de bodas al año para poder dedicar
                atención total y personalizada a cada pareja. Si les interesa reservar
                su fecha, los invito a escribirme a través de la página de contacto
                para confirmar disponibilidad.
              </LimitedText>
              <LimitedText>
                Toda reservación requiere la firma de un contrato y un anticipo del
                50% para asegurar la fecha. Lamentablemente no es posible apartar
                fechas sin estos requisitos dada la demanda limitada.
              </LimitedText>
              <ContactBtn href="/la-experiencia">Consultar disponibilidad + guía de precios</ContactBtn>
            </LimitedCopy>

            <PhotoWrap
              $ratio={`${photoCouple.width} / ${photoCouple.height}`}
              style={{ maxHeight: '400px' }}
            >
              <Image
                src={photoCouple}
                alt="Pareja de novios en un momento romántico."
                fill
                placeholder="blur"
                sizes="(max-width: 850px) 92vw, 44vw"
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </PhotoWrap>
          </LimitedGrid>
        </LimitedDates>
      </Container>
    </Section>
  );
}
