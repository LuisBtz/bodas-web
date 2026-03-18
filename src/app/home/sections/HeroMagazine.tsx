'use client';

import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import heroBg from '@/assets/images/home/hero-bg.jpg';
import type { PostMeta } from '@/lib/blog';

/* ─── helpers ─── */
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

/* ─── animación ─── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const AnimBlock = styled.div<{ $show: boolean; $delay: number }>`
  opacity: 0;
  ${({ $show, $delay }) => $show && css`
    animation: ${fadeUp} 540ms ease forwards;
    animation-delay: ${$delay}ms;
  `}
`;

/* ═══════════════════════════════════════════
   SHELL — full viewport, fondo crema
═══════════════════════════════════════════ */
const Section = styled.section`
  min-height: 100dvh;
  background: ${({ theme }) => theme.colors.cream};
  display: flex;
  flex-direction: column;
  padding-top: 72px; /* altura del nav */
`;

/* ─── Tira superior — simulación cabecera de revista ─── */
const MastHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px clamp(20px, 5vw, 64px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  gap: 16px;
`;

const MastLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const MastLogo = styled.img`
  width: 28px;
  height: auto;
  opacity: 0.7;
`;

const MastTitle = styled.span`
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.45);
`;

const MastRight = styled.span`
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.3);

  @media ${({ theme }) => theme.media.smDown} {
    display: none;
  }
`;

/* ═══════════════════════════════════════════
   GRID PRINCIPAL
═══════════════════════════════════════════ */
const MainGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 58fr 42fr;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
  }
`;

/* ─── Columna izquierda — Feature ─── */
const FeatureCol = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media ${({ theme }) => theme.media.mdDown} {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const FeaturePhoto = styled.div`
  position: relative;
  flex: 1;
  min-height: 340px;
  overflow: hidden;
`;

const FeatureText = styled.div`
  padding: clamp(20px, 3vw, 36px) clamp(20px, 4vw, 48px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: clamp(16px, 3vw, 48px);
  flex-wrap: wrap;
`;

const FeatureTextLeft = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Eyebrow = styled.p`
  font-size: 10px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.38);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: currentColor;
    flex-shrink: 0;
  }
`;

const H1 = styled.h1`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(28px, 3.5vw, 48px);
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: #000;
  margin-bottom: 10px;
  max-width: 16ch;

  em { font-style: italic; opacity: 0.7; }
`;

const Sub = styled.p`
  font-size: 13px;
  line-height: 1.65;
  color: rgba(0,0,0,0.55);
  max-width: 42ch;
`;

const FeatureCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 28px;
  border: 1px solid #000;
  background: transparent;
  color: #000;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: background 0.2s ease, color 0.2s ease;
  flex-shrink: 0;

  &:hover { background: #000; color: #fff; }
`;

/* ─── Columna derecha — Últimas historias ─── */
const StoriesCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const StoriesHeader = styled.div`
  padding: 16px clamp(16px, 3vw, 32px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StoriesTitle = styled.span`
  font-size: 10px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.4);
`;

const StoriesLink = styled(Link)`
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.35);
  transition: color 0.15s ease;

  &:hover { color: #000; }
`;

const StoryItem = styled(Link)`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 16px;
  padding: clamp(14px, 2vw, 20px) clamp(16px, 3vw, 32px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: inherit;
  transition: background 0.15s ease;
  flex: 1;
  align-items: center;

  &:hover { background: rgba(0,0,0,0.02); }
  &:last-child { border-bottom: none; }

  @media ${({ theme }) => theme.media.smDown} {
    grid-template-columns: 64px 1fr;
    gap: 12px;
  }
`;

const StoryThumb = styled.div`
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

const StoryBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StoryTag = styled.span`
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.35);
`;

const StoryTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(15px, 1.6vw, 19px);
  line-height: 1.25;
  color: #000;
`;

const StoryMeta = styled.span`
  font-size: 10px;
  letter-spacing: 0.1em;
  color: rgba(0,0,0,0.3);
  text-transform: uppercase;
`;

/* ─── Tira inferior ─── */
const FootStrip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px clamp(20px, 5vw, 64px);
  gap: 16px;
`;

const FootLeft = styled.span`
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.28);
`;

const FootCta = styled(Link)`
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.38);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.15s ease;

  &:hover { color: #000; }

  &::after {
    content: '→';
    font-size: 12px;
  }
`;

/* ═══════════════════════════════════════════
   COMPONENTE
═══════════════════════════════════════════ */
interface Props {
  posts: PostMeta[];
}

export default function HeroMagazine({ posts }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.scrollY > 20 || noMotion) { setShow(true); return; }

    const onDone = () => setShow(true);
    document.addEventListener('intro:headerDone', onDone, { once: true });
    const fallback = setTimeout(() => setShow(true), 1200);
    return () => {
      document.removeEventListener('intro:headerDone', onDone);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <Section>

      {/* ── Cabecera de revista ── */}
      <AnimBlock $show={show} $delay={0}>
        <MastHead>
          <MastLeft>
            <MastLogo src="/Vector.svg" alt="LBP" />
            <MastTitle>Luis Benítez Photography</MastTitle>
          </MastLeft>
          <MastRight>Fotografía de bodas · Monterrey, México</MastRight>
        </MastHead>
      </AnimBlock>

      {/* ── Grid principal ── */}
      <MainGrid>

        {/* ─ Feature izquierda ─ */}
        <FeatureCol>
          <AnimBlock $show={show} $delay={80} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <FeaturePhoto>
              <Image
                src={heroBg}
                alt="Fotografía de boda por Luis Benítez"
                fill
                priority
                placeholder="blur"
                sizes="(max-width: 850px) 100vw, 60vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                fetchPriority="high"
              />
            </FeaturePhoto>
          </AnimBlock>

          <AnimBlock $show={show} $delay={160}>
            <FeatureText>
              <FeatureTextLeft>
                <Eyebrow>Fotografía de bodas</Eyebrow>
                <H1>
                  Instantes que<br />
                  <em>perduran</em><br />
                  para siempre
                </H1>
                <Sub>
                  Capturamos la esencia de su amor con sensibilidad y arte,
                  creando imágenes que trascienden el tiempo.
                </Sub>
              </FeatureTextLeft>
              <FeatureCta href="/contacto">
                Comienza tu historia
              </FeatureCta>
            </FeatureText>
          </AnimBlock>
        </FeatureCol>

        {/* ─ Columna historias ─ */}
        <StoriesCol>
          <AnimBlock $show={show} $delay={120}>
            <StoriesHeader>
              <StoriesTitle>Últimas historias</StoriesTitle>
              <StoriesLink href="/blog">Ver todas →</StoriesLink>
            </StoriesHeader>
          </AnimBlock>

          {posts.map((post, i) => (
            <AnimBlock key={post.slug} $show={show} $delay={200 + i * 80}>
              <StoryItem href={`/blog/${post.slug}`}>
                <StoryThumb>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="80px"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </StoryThumb>
                <StoryBody>
                  <StoryTag>{post.tags?.[0]}</StoryTag>
                  <StoryTitle>{post.title}</StoryTitle>
                  <StoryMeta>{formatDate(post.date)} · {post.readTime}</StoryMeta>
                </StoryBody>
              </StoryItem>
            </AnimBlock>
          ))}
        </StoriesCol>

      </MainGrid>

      {/* ── Tira inferior ── */}
      <AnimBlock $show={show} $delay={400}>
        <FootStrip>
          <FootLeft>Monterrey, México · 2025</FootLeft>
          <FootCta href="/blog">Explorar el blog</FootCta>
        </FootStrip>
      </AnimBlock>

    </Section>
  );
}
