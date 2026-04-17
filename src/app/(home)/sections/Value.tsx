'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import Image from 'next/image';

import photoLeft from '@/assets/images/home/value-left.jpg';
import photoRight from '@/assets/images/home/value-right.jpg';

const DECO_TL = '/decor-top-left.svg';
const DECO_BR = '/decor-bottom-right.svg';

const Section = styled.section`
  position: relative;
  padding: clamp(60px, 9vw, 140px) 0;
  background: ${({ theme }) => theme.colors.cream};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr min(72ch, 70vw) 1fr;
  align-items: center;
  gap: clamp(16px, 3vw, 48px);

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
  }
`;

/* Contenedor externo: NO recorta, así los adornos pueden salir */
const Figure = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: visible; /* <- clave */

  @media ${({ theme }) => theme.media.mdDown} {
    aspect-ratio: 4 / 5;
    max-width: 420px;
    margin-inline: auto;
  }
`;

/* Wrapper interno: SÍ recorta solo la foto */
const Photo = styled.div`
  position: relative;       /* requerido por <Image fill> */
  width: 100%;
  height: 100%;
  overflow: hidden;         /* recorte de la imagen */
  z-index: 1;               /* por debajo de los adornos */
  img {
    object-fit: cover;
    object-position: center;

  }
`;

const DecoTL = styled.img`
  position: absolute;
  top: -28px;
  left: -28px;
  width: clamp(70px, 10vw, 120px);
  pointer-events: none;
  user-select: none;
  z-index: 2;               /* por encima de la foto */
  color: ${({ theme }) => theme.colors.red};
  @media ${({ theme }) => theme.media.mdDown} { display: none; }
`;

const DecoBR = styled.img`
  position: absolute;
  bottom: -28px;
  right: -28px;
  width: clamp(70px, 10vw, 120px);
  pointer-events: none;
  user-select: none;
  z-index: 2;
  color: ${({ theme }) => theme.colors.red};
  @media ${({ theme }) => theme.media.mdDown} { display: none; }
`;

const Copy = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
    @media ${({ theme }) => theme.media.mdDown} { 
    margin-top: 40px;
    margin-bottom: 40px;
     }

`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  letter-spacing: 0.01em;
  font-size: clamp(28px, 4.8vw, 56px);
  line-height: 1.12;

  .caps { text-transform: uppercase; font-weight: 700; }
  .it { font-style: italic; }
  span { display: inline; }
  .may {text-transform: uppercase;}

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: clamp(24px, 7vw, 36px);
  }
`;

const Sub = styled.p`
  margin-top: 18px;
  font-size: 16px;
  opacity: 0.9;
  @media ${({ theme }) => theme.media.mdDown} { font-size: 15px; }
`;

const Cta = styled.div` margin-top: 28px; `;
const CtaBtn = styled.a`
  padding: 10px 28px;
  display: inline-block;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background: transparent;
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 14px;
  transition: background .2s ease, color .2s ease, transform .1s ease;
  &:hover { background: ${({ theme }) => theme.colors.black}; color: ${({ theme }) => theme.colors.white}; }
  &:active { transform: translateY(1px); }
`;

export default function Value() {
  return (
    <Section aria-labelledby="value-title">
      <Container>
        <Grid>
          {/* Izquierda */}
          <Figure>
            <Photo>
              <Image
                src={photoLeft}
                alt="Campanario de iglesia con arquitectura clásica."
                fill
                placeholder="blur"
                sizes="(max-width: 850px) 90vw, 26vw"
              />
            </Photo>
            <DecoTL src={DECO_TL} alt="" />
          </Figure>

          {/* Centro */}
          <Copy>
            <Title id="value-title">
              <span>Los <span className="may">MOMENTOS</span></span>
              <span><span className="it"> reales</span> se pueden olvidar</span>
              <span> pero <span className="caps">SIEMPRE</span></span>
              <span> tendrás <span className="it">las fotografías</span></span>
              <span> que te harán</span>
              <span className="caps"> RECORDAR.</span>
            </Title>
            <Sub>No solo tomamos fotografías con nuestra cámara, sino con nuestro corazón.</Sub>
            <Cta><CtaBtn href="/contacto">TRABAJEMOS JUNTOS</CtaBtn></Cta>
          </Copy>

          {/* Derecha */}
          <Figure>
            <Photo>
              <Image
                src={photoRight}
                alt="Pareja de novios en un pasillo con telas y velas."
                fill
                placeholder="blur"
                sizes="(max-width: 850px) 90vw, 26vw"
              />
            </Photo>
            <DecoBR src={DECO_BR} alt="" />
          </Figure>
        </Grid>
      </Container>
    </Section>
  );
}
