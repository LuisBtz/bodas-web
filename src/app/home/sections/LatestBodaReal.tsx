'use client';

import styled from 'styled-components';
import NextImage from 'next/image';
import Link from 'next/link';
import type { BodaRealMeta } from '@/lib/bodas-reales';

/* ═══════════════════════════════════════════
   Section
   ═══════════════════════════════════════════ */
const Section = styled.section`
  position: relative;
  padding: clamp(60px, 9vw, 140px) 0;
  background: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`;

/* Thin decorative line above the section */
const TopRule = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: clamp(40px, 5vw, 72px);
  background: ${({ theme }) => theme.colors.border};
`;

/* ─── Layout ─── */
const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 48px);
`;

const Kicker = styled.p`
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-align: center;
  opacity: 0.45;
  margin-bottom: clamp(28px, 4vw, 48px);
`;

const Card = styled.article`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 0;

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
  }
`;

/* ─── Image side ─── */
const ImageWrap = styled(Link)`
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  display: block;

  img {
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  &:hover img {
    transform: scale(1.03);
  }

  @media ${({ theme }) => theme.media.mdDown} {
    aspect-ratio: 4 / 5;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(0, 0, 0, 0.15) 100%
  );
  z-index: 1;
  pointer-events: none;
`;

/* ─── Copy side ─── */
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(32px, 5vw, 64px) clamp(28px, 4vw, 56px);
  background: ${({ theme }) => theme.colors.cream};
`;

const Label = styled.span`
  display: block;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.4;
  margin-bottom: 18px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 300;
  font-size: clamp(32px, 4.2vw, 52px);
  line-height: 1.08;
  margin: 0 0 10px;
`;

const Location = styled.p`
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.45;
  margin-bottom: 20px;
`;

const Excerpt = styled.p`
  font-size: 15px;
  line-height: 1.65;
  opacity: 0.6;
  max-width: 400px;
  margin-bottom: 32px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
`;

const PrimaryLink = styled(Link)`
  display: inline-block;
  padding: 12px 32px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 11px;
  transition: background 0.25s ease, color 0.25s ease;

  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.colors.black};
  }
`;

const SecondaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  opacity: 0.6;
  transition: opacity 0.2s ease, gap 0.2s ease;

  &::after {
    content: '→';
    font-size: 13px;
    transition: transform 0.2s ease;
  }
  &:hover {
    opacity: 1;
    gap: 14px;
    &::after {
      transform: translateX(2px);
    }
  }
`;

/* ═══════════════════════════════════════════
   Component
   ═══════════════════════════════════════════ */
interface Props {
  boda: BodaRealMeta;
}

export default function LatestBodaReal({ boda }: Props) {
  return (
    <Section aria-labelledby="latest-boda-title">
      <TopRule />
      <Inner>
        <Kicker>Último proyecto</Kicker>

        <Card>
          {/* Image */}
          <ImageWrap
            href={`/bodas-reales/${boda.slug}`}
            aria-label={`Ver historia de ${boda.title}`}
          >
            {boda.coverImage && (
              <NextImage
                src={boda.coverImage}
                alt={boda.title}
                fill
                sizes="(max-width: 850px) 100vw, 55vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            )}
            <ImageOverlay />
          </ImageWrap>

          {/* Copy */}
          <Body>
            <Label>Boda real</Label>
            <Title id="latest-boda-title">{boda.title}</Title>
            <Location>{boda.location}</Location>
            <Excerpt>{boda.description}</Excerpt>

            <Actions>
              <PrimaryLink href={`/bodas-reales/${boda.slug}`}>
                Ver historia completa
              </PrimaryLink>
              <SecondaryLink href="/bodas-reales">
                Explorar todas las bodas
              </SecondaryLink>
            </Actions>
          </Body>
        </Card>
      </Inner>
    </Section>
  );
}
