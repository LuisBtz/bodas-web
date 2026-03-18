'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import NextImage from 'next/image';
import Link from 'next/link';
import type { BodaRealMeta } from '@/lib/bodas-reales';
import AuthorBio from '@/components/ui/AuthorBio';

/* ─── Hero full-bleed ─── */
const HeroWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100svh;
  min-height: 560px;
  overflow: hidden;
  background: #111;
`;

const HeroGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 30%,
    rgba(0, 0, 0, 0.25) 60%,
    rgba(0, 0, 0, 0.72) 100%
  );
  z-index: 1;
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding: clamp(32px, 5vw, 64px) clamp(24px, 6vw, 80px);
  color: #fff;
`;

const HeroEyebrow = styled.p`
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.65;
  margin-bottom: 14px;
`;

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 300;
  font-size: clamp(42px, 8vw, 96px);
  line-height: 1;
  letter-spacing: -0.01em;
  margin: 0 0 18px;
`;

const HeroLocation = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.75;

  &::before {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    background: currentColor;
    opacity: 0.6;
  }
`;

/* ─── Scroll hint ─── */
const ScrollHint = styled.div`
  position: absolute;
  bottom: 32px;
  right: clamp(24px, 6vw, 80px);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #fff;
  opacity: 0.4;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const ScrollLine = styled.div`
  width: 1px;
  height: 48px;
  background: #fff;
`;

/* ─── Meta strip ─── */
const MetaStrip = styled.div`
  background: ${({ theme }) => theme.colors.cream};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: clamp(20px, 3vw, 32px) 0;
`;

const MetaInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

const MetaLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const MetaLabel = styled.span`
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.45;
`;

const MetaValue = styled.span`
  font-size: 13px;
  letter-spacing: 0.05em;
`;

const MetaDivider = styled.div`
  width: 1px;
  height: 28px;
  background: ${({ theme }) => theme.colors.border};

  @media ${({ theme }) => theme.media.smDown} {
    display: none;
  }
`;

const TagList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: 1px solid ${({ theme }) => theme.colors.black};
  padding: 3px 10px;
  opacity: 0.45;
`;

const BackLink = styled(Link)`
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.5;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: opacity 0.15s ease;

  &:hover { opacity: 0.9; }
`;

/* ─── Article body ─── */
const ArticleSection = styled.article`
  padding: clamp(56px, 7vw, 96px) 0 clamp(72px, 9vw, 128px);
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;

/* ─── CTA ─── */
const PostCta = styled.section`
  padding: clamp(64px, 8vw, 104px) 0;
  background: ${({ theme }) => theme.colors.cream};
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CtaEyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 11px;
  opacity: 0.45;
  margin-bottom: 16px;
`;

const CtaTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(26px, 4vw, 44px);
  margin-bottom: 20px;
  max-width: 600px;
  margin-inline: auto;
  line-height: 1.2;
`;

const CtaText = styled.p`
  font-size: 16px;
  opacity: 0.65;
  max-width: 520px;
  margin-inline: auto;
  margin-bottom: 32px;
  line-height: 1.7;
`;

const CtaButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const CtaBtn = styled(Link)<{ $variant?: 'outline' }>`
  display: inline-block;
  padding: 13px 40px;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.2s ease;
  border: 1px solid ${({ theme }) => theme.colors.black};

  ${({ $variant, theme }) =>
    $variant === 'outline'
      ? `background: transparent; color: ${theme.colors.black};
         &:hover { background: ${theme.colors.black}; color: ${theme.colors.white}; }`
      : `background: ${theme.colors.black}; color: ${theme.colors.white};
         &:hover { background: transparent; color: ${theme.colors.black}; }`}
`;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
  });
}

interface Props {
  boda: BodaRealMeta;
  index: number;
  children: React.ReactNode;
}

export default function BodaRealShell({ boda, index, children }: Props) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <>
      {/* Full-screen hero */}
      <HeroWrap>
        {boda.coverImage && (
          <NextImage
            src={boda.coverImage}
            alt={boda.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        )}
        <HeroGradient />
        <HeroContent>
          <HeroEyebrow>Boda {num} &nbsp;·&nbsp; Luis Benítez Photography</HeroEyebrow>
          <HeroTitle>{boda.title}</HeroTitle>
          <HeroLocation>{boda.location}</HeroLocation>
        </HeroContent>
        <ScrollHint>
          <ScrollLine />
          scroll
        </ScrollHint>
      </HeroWrap>

      {/* Meta strip */}
      <MetaStrip>
        <Container>
          <MetaInner>
            <MetaLeft>
              <BackLink href="/bodas-reales">← Bodas reales</BackLink>
              <MetaDivider />
              <MetaItem>
                <MetaLabel>Fecha</MetaLabel>
                <MetaValue>{formatDate(boda.date)}</MetaValue>
              </MetaItem>
              <MetaDivider />
              <MetaItem>
                <MetaLabel>Venue</MetaLabel>
                <MetaValue>{boda.location}</MetaValue>
              </MetaItem>
            </MetaLeft>
            <TagList>
              {boda.tags?.map((tag) => <Tag key={tag}>{tag}</Tag>)}
            </TagList>
          </MetaInner>
        </Container>
      </MetaStrip>

      {/* Article body */}
      <ArticleSection>
        {children}
        <AuthorBio />
      </ArticleSection>

      {/* CTA */}
      <PostCta>
        <Container>
          <CtaEyebrow>Luis Benítez Photography · Monterrey</CtaEyebrow>
          <CtaTitle>¿Quieren escribir su propia historia?</CtaTitle>
          <CtaText>
            Cada boda es única, y me encantaría escuchar la de ustedes.
            Consultemos disponibilidad y conversemos sin compromiso.
          </CtaText>
          <CtaButtons>
            <CtaBtn href="/contacto">Agendar una consulta</CtaBtn>
            <CtaBtn href="/bodas-reales" $variant="outline">Ver más bodas</CtaBtn>
          </CtaButtons>
        </Container>
      </PostCta>
    </>
  );
}
