'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import Image from 'next/image';

import storyPhoto from '@/assets/images/home/approach-left.jpg';

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
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: clamp(24px, 5vw, 72px);

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
  }
`;

const Figure = styled.figure`
  position: relative;
  margin: 0;
  overflow: visible;
  width: 100%;

  @media ${({ theme }) => theme.media.mdDown} {
    max-width: 480px;
    margin-inline: auto;
  }
`;

const Photo = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
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
    right: -16px;
    bottom: -16px;
    width: clamp(64px, 18vw, 100px);
  }
`;

const Copy = styled.div`
  text-align: left;
  color: ${({ theme }) => theme.colors.black};
  max-width: 54ch;

  @media ${({ theme }) => theme.media.mdDown} {
    text-align: center;
    max-width: 100%;
    margin-inline: auto;
    margin-top: 56px;
  }
`;

const Emblem = styled.img`
  display: block;
  width: 64px;
  margin-bottom: 20px;

  @media ${({ theme }) => theme.media.mdDown} {
    margin-inline: auto;
    width: 52px;
  }
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 12px;
  opacity: 0.65;
  margin-bottom: 14px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  letter-spacing: 0.01em;
  font-size: clamp(28px, 4.2vw, 40px);
  line-height: 1.18;
  margin-bottom: 22px;

  .it { font-style: italic; }

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: clamp(24px, 6.2vw, 34px);
  }
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.65;
  opacity: 0.9;
  margin-bottom: 16px;

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: 15px;
  }
`;

const Signature = styled.p`
  margin-top: 28px;
  font-style: italic;
  font-size: 22px;
  opacity: 0.75;
`;

export default function Story() {
  const ratio = `${storyPhoto.width} / ${storyPhoto.height}`;

  return (
    <Section aria-labelledby="story-title">
      <Container>
        <Grid>
          {/* Columna izquierda: foto */}
          <Figure style={{ aspectRatio: ratio }}>
            <Photo>
              <Image
                src={storyPhoto}
                alt="Luis Benítez fotografiando una boda, capturando momentos especiales con su cámara."
                fill
                placeholder="blur"
                sizes="(max-width: 850px) 92vw, 48vw"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                priority={false}
              />
            </Photo>
            <DecorBR src={DECOR_FLOWER} alt="" />
          </Figure>

          {/* Columna derecha: texto */}
          <Copy>
            <Emblem src={EMBLEM} alt="" />
            <Eyebrow>Mi historia</Eyebrow>
            <Title id="story-title">
              Nací para <span className="it">contar historias</span> a través del lente
            </Title>
            <Paragraph>
              Soy Luis Benítez, fotógrafo de bodas con base en Monterrey. Desde pequeño sentí una
              fascinación profunda por los momentos que la vida nos regala: esas miradas cargadas
              de emoción, los abrazos que lo dicen todo y las risas que estallan entre lágrimas de
              alegría.
            </Paragraph>
            <Paragraph>
              Lo que comenzó como una pasión se convirtió en mi vocación. Hoy tengo el privilegio
              de acompañar a parejas en uno de los días más importantes de sus vidas, documentando
              con honestidad y sensibilidad cada instante que merece ser recordado para siempre.
            </Paragraph>
            <Paragraph>
              Mi enfoque es documental y emotivo: no dirijo escenas, las descubro. Me muevo en
              silencio, observo, y aprieto el disparador justo cuando la magia ocurre de forma
              natural.
            </Paragraph>
            <Signature>— Luis Benítez</Signature>
          </Copy>
        </Grid>
      </Container>
    </Section>
  );
}
