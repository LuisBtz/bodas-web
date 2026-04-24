'use client';

import Image from 'next/image';
import styled from 'styled-components';
import Container from '@/components/ui/Container';

const TESTIMONIAL_IMAGE = '/bodas-reales/amy-and-jorge/Gallery-015.webp';

const Section = styled.section`
  padding: clamp(80px, 12vw, 140px) 0;
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.black};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 5fr 7fr;
  align-items: center;
  gap: clamp(40px, 7vw, 96px);
  max-width: 1080px;
  margin-inline: auto;

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  width: 100%;
  overflow: hidden;

  img {
    object-fit: cover;
    object-position: center;
  }

  @media ${({ theme }) => theme.media.mdDown} {
    aspect-ratio: 4 / 3;
    max-width: 440px;
    margin-inline: auto;
  }
`;

const Body = styled.div`
  max-width: 520px;
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.24em;
  font-size: 11px;
  opacity: 0.55;
  margin-bottom: 22px;
`;

const Quote = styled.blockquote`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(22px, 2.8vw, 30px);
  line-height: 1.4;
  margin: 0 0 28px;
  letter-spacing: 0.005em;
  color: ${({ theme }) => theme.colors.black};
  position: relative;

  &::before {
    content: '“';
    font-family: ${({ theme }) => theme.fonts.base};
    font-size: 72px;
    line-height: 0.8;
    color: ${({ theme }) => theme.colors.red};
    opacity: 0.4;
    position: absolute;
    top: -22px;
    left: -18px;
    font-style: italic;

    @media ${({ theme }) => theme.media.mdDown} {
      font-size: 56px;
      top: -18px;
      left: -10px;
    }
  }
`;

const Attribution = styled.p`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.7;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: ${({ theme }) => theme.colors.black};
    opacity: 0.4;
  }
`;

export default function Testimonial() {
  return (
    <Section aria-label="Testimonio de pareja real">
      <Container>
        <Grid>
          <ImageWrap>
            <Image
              src={TESTIMONIAL_IMAGE}
              alt="Amy y Jorge en su boda documentada por Luis Benítez"
              fill
              sizes="(max-width: 850px) 90vw, 440px"
              quality={85}
            />
          </ImageWrap>

          <Body>
            <Eyebrow>Lo que dicen</Eyebrow>
            <Quote>
              Luis nos transmitió calma desde el inicio. Recorrimos el centro de
              Monterrey y encontró rincones llenos de luz que ni sabíamos que
              existían.
            </Quote>
            <Attribution>Amy &amp; Jorge</Attribution>
          </Body>
        </Grid>
      </Container>
    </Section>
  );
}
