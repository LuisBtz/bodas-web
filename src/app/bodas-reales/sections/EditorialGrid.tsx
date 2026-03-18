'use client';

import styled from 'styled-components';
import NextImage from 'next/image';
import Link from 'next/link';
import type { BodaRealMeta } from '@/lib/bodas-reales';

/* ═══════════════════════════════════════════
   Section
   ═══════════════════════════════════════════ */
const Section = styled.section`
  padding: clamp(48px, 6vw, 88px) 0 clamp(64px, 8vw, 112px);
  background: ${({ theme }) => theme.colors.white};
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 48px);
`;

/* ═══════════════════════════════════════════
   Featured card — first / most recent post
   ═══════════════════════════════════════════ */
const FeaturedCard = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  margin-bottom: clamp(56px, 7vw, 88px);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedImage = styled(Link)`
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  display: block;

  img {
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  &:hover img {
    transform: scale(1.03);
  }

  @media (max-width: 800px) {
    aspect-ratio: 3 / 2;
  }
`;

const FeaturedBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(32px, 4vw, 56px) clamp(28px, 4vw, 52px);
  background: ${({ theme }) => theme.colors.cream};
`;

const FeaturedNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.base};
  font-size: clamp(80px, 12vw, 160px);
  font-weight: 300;
  line-height: 0.85;
  opacity: 0.05;
  letter-spacing: -0.03em;
  display: block;
  margin-bottom: 12px;
`;

const FeaturedTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 300;
  font-size: clamp(30px, 3.8vw, 48px);
  line-height: 1.08;
  margin: 0 0 14px;
`;

const FeaturedLocation = styled.p`
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 18px;
`;

const FeaturedExcerpt = styled.p`
  font-size: 15px;
  line-height: 1.65;
  opacity: 0.6;
  max-width: 400px;
  margin-bottom: 28px;
`;

/* ═══════════════════════════════════════════
   Column grid — remaining posts
   ═══════════════════════════════════════════ */
const ColumnsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(28px, 3vw, 48px);

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
`;

const CardImage = styled(Link)`
  position: relative;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  display: block;
  margin-bottom: 18px;

  img {
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  &:hover img {
    transform: scale(1.04);
  }
`;

const CardNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.base};
  font-size: 42px;
  font-weight: 300;
  line-height: 1;
  opacity: 0.08;
  letter-spacing: -0.02em;
  display: block;
  margin-bottom: 6px;
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(20px, 2vw, 24px);
  line-height: 1.15;
  margin: 0 0 8px;
`;

const CardLocation = styled.p`
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.45;
  margin-bottom: 10px;
`;

const CardExcerpt = styled.p`
  font-size: 13px;
  line-height: 1.6;
  opacity: 0.55;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/* ═══════════════════════════════════════════
   Shared
   ═══════════════════════════════════════════ */
const ReadLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  transition: gap 0.2s ease;

  &::after {
    content: '→';
    font-size: 13px;
    transition: transform 0.2s ease;
  }
  &:hover {
    gap: 14px;
    &::after { transform: translateX(2px); }
  }
`;

/* ─── Divider between featured and grid ─── */
const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin-bottom: clamp(40px, 5vw, 64px);
`;

const SectionLabel = styled.p`
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.4;
  margin-bottom: clamp(28px, 3vw, 40px);
`;

interface Props {
  items: BodaRealMeta[];
}

export default function EditorialGrid({ items }: Props) {
  if (!items.length) return null;

  const [featured, ...rest] = items;

  return (
    <Section>
      <Inner>
        {/* ── Featured / most recent ── */}
        <FeaturedCard>
          <FeaturedImage
            href={`/bodas-reales/${featured.slug}`}
            aria-label={`Ver historia de ${featured.title}`}
          >
            {featured.coverImage && (
              <NextImage
                src={featured.coverImage}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            )}
          </FeaturedImage>

          <FeaturedBody>
            <FeaturedNumber>01</FeaturedNumber>
            <FeaturedTitle>{featured.title}</FeaturedTitle>
            <FeaturedLocation>{featured.location}</FeaturedLocation>
            <FeaturedExcerpt>{featured.description}</FeaturedExcerpt>
            <ReadLink href={`/bodas-reales/${featured.slug}`}>
              Ver historia completa
            </ReadLink>
          </FeaturedBody>
        </FeaturedCard>

        {/* ── Remaining entries ── */}
        {rest.length > 0 && (
          <>
            <Divider />
            <SectionLabel>Más historias</SectionLabel>

            <ColumnsGrid>
              {rest.map((boda, i) => {
                const num = String(i + 2).padStart(2, '0');
                return (
                  <Card key={boda.slug}>
                    <CardImage
                      href={`/bodas-reales/${boda.slug}`}
                      aria-label={`Ver historia de ${boda.title}`}
                    >
                      {boda.coverImage && (
                        <NextImage
                          src={boda.coverImage}
                          alt={boda.title}
                          fill
                          sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                          style={{ objectFit: 'cover', objectPosition: 'center' }}
                        />
                      )}
                    </CardImage>

                    <CardNumber>{num}</CardNumber>
                    <CardTitle>{boda.title}</CardTitle>
                    <CardLocation>{boda.location}</CardLocation>
                    <CardExcerpt>{boda.description}</CardExcerpt>
                    <ReadLink href={`/bodas-reales/${boda.slug}`}>
                      Ver historia
                    </ReadLink>
                  </Card>
                );
              })}
            </ColumnsGrid>
          </>
        )}
      </Inner>
    </Section>
  );
}
