'use client';

import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import type { PostMeta } from '@/lib/blog';

/* ── imágenes de la tira ── */
import s1 from '@/assets/images/imagenes/1.jpg';
import s2 from '@/assets/images/imagenes/3.jpg';
import s3 from '@/assets/images/imagenes/5.jpg';
import s4 from '@/assets/images/imagenes/7.jpg';
import s5 from '@/assets/images/imagenes/9.jpg';
import s6 from '@/assets/images/imagenes/11.jpg';

const STRIP = [s1, s2, s3, s4, s5, s6];

/* ── helper ── */
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('es-MX', { year: 'numeric', month: 'short' });
}

/* ═══════════════════════════
   Animación
═══════════════════════════ */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Anim = styled.div<{ $on: boolean; $ms: number }>`
  opacity: 0;
  ${({ $on, $ms }) => $on && css`
    animation: ${fadeUp} 580ms ease forwards;
    animation-delay: ${$ms}ms;
  `}
`;

/* ═══════════════════════════
   Shell
═══════════════════════════ */
const Section = styled.section`
  min-height: 100dvh;
  padding-top: 72px;
  background: ${({ theme }) => theme.colors.cream};
  display: flex;
  flex-direction: column;
`;

/* ═══════════════════════════
   TIRA DE FOTOS
═══════════════════════════ */
const Strip = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  height: clamp(260px, 40vh, 460px);
  overflow: hidden;

  /* en tablet: 3 fotos */
  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: repeat(3, 1fr);

    /* ocultar fotos 4-6 */
    & > *:nth-child(n+4) { display: none; }
  }
`;

const StripCell = styled.div<{ $i: number }>`
  position: relative;
  overflow: hidden;
  border-right: 1px solid ${({ theme }) => theme.colors.cream};

  &:last-child { border-right: none; }

  /* zoom muy sutil en hover — sensación de vida */
  img {
    transition: transform 600ms ease;
  }
  &:hover img {
    transform: scale(1.04);
  }
`;

/* ═══════════════════════════
   BLOQUE CENTRAL (H1 + sub)
═══════════════════════════ */
const Mid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
  }
`;

/* columna izquierda — tipografía dominante */
const TitleCol = styled.div`
  padding: clamp(28px, 4vw, 52px) clamp(20px, 5vw, 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media ${({ theme }) => theme.media.mdDown} {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding-bottom: 28px;
  }
`;

const H1 = styled.h1`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(52px, 8vw, 116px);
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: #000;
  margin: 0;

  /* segunda línea con sangría editorial */
  span {
    display: block;
    padding-left: clamp(24px, 4vw, 64px);
    font-style: italic;
    opacity: 0.7;
  }
`;

/* columna derecha — copy + cta */
const CopyCol = styled.div`
  padding: clamp(28px, 4vw, 52px) clamp(20px, 5vw, 64px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
`;

const CopyTop = styled.div``;

const Eyebrow = styled.p`
  font-size: 10px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.38);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    display: block;
    width: 24px;
    height: 1px;
    background: currentColor;
    flex-shrink: 0;
  }
`;

const Sub = styled.p`
  font-family: ${({ theme }) => theme.fonts.base};
  font-style: italic;
  font-size: clamp(17px, 1.8vw, 22px);
  line-height: 1.55;
  color: rgba(0,0,0,0.6);
  max-width: 34ch;
`;

const CopyBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

const Location = styled.span`
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.3);
`;

const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 11px 32px;
  border: 1px solid #000;
  background: transparent;
  color: #000;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: background 0.2s ease, color 0.2s ease, transform 0.08s ease;

  &:hover  { background: #000; color: #fff; }
  &:active { transform: translateY(1px); }
`;

/* ═══════════════════════════
   BLOG ROW
═══════════════════════════ */
const BlogRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media ${({ theme }) => theme.media.smDown} {
    grid-template-columns: 1fr;
  }
`;

const BlogRowHeader = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px clamp(20px, 5vw, 64px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const BlogLabel = styled.span`
  font-size: 10px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.35);
`;

const BlogAllLink = styled(Link)`
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.32);
  transition: color 0.15s ease;

  &:hover { color: #000; }
`;

const BlogCard = styled(Link)<{ $i: number }>`
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 14px;
  align-items: center;
  padding: 14px clamp(16px, 3vw, 40px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: inherit;
  transition: background 0.15s ease;

  /* separador vertical entre cards */
  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }

  &:hover { background: rgba(0,0,0,0.02); }
`;

const BlogThumb = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

const BlogMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
`;

const BlogTag = styled.span`
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.32);
`;

const BlogTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(14px, 1.4vw, 17px);
  line-height: 1.25;
  color: #000;

  /* clamp a 2 líneas */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogDate = styled.span`
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.28);
`;

/* ═══════════════════════════
   COMPONENTE
═══════════════════════════ */
export default function HeroFilmStrip({ posts }: { posts: PostMeta[] }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.scrollY > 20 || noMotion) { setOn(true); return; }

    const done = () => setOn(true);
    document.addEventListener('intro:headerDone', done, { once: true });
    const fb = setTimeout(() => setOn(true), 1200);
    return () => {
      document.removeEventListener('intro:headerDone', done);
      clearTimeout(fb);
    };
  }, []);

  return (
    <Section>

      {/* ── TIRA DE FOTOS ── */}
      <Anim $on={on} $ms={0}>
        <Strip>
          {STRIP.map((src, i) => (
            <StripCell key={i} $i={i}>
              <Image
                src={src}
                alt=""
                fill
                priority={i < 3}
                placeholder="blur"
                sizes="(max-width: 850px) 33vw, 17vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </StripCell>
          ))}
        </Strip>
      </Anim>

      {/* ── BLOQUE CENTRAL ── */}
      <Mid>
        <Anim $on={on} $ms={80} style={{ display: 'contents' }}>
          <TitleCol>
            <H1>
              Fotografía
              <span>de bodas</span>
            </H1>
          </TitleCol>

          <CopyCol>
            <CopyTop>
              <Eyebrow>Luis Benítez Photography</Eyebrow>
              <Sub>
                Cada mirada, cada gesto y cada emoción —
                capturados con sensibilidad y arte para que
                perduren más allá del tiempo.
              </Sub>
            </CopyTop>
            <CopyBottom>
              <Location>Monterrey · México</Location>
              <Cta href="/contacto">Comienza tu historia</Cta>
            </CopyBottom>
          </CopyCol>
        </Anim>
      </Mid>

      {/* ── BLOG ROW ── */}
      <Anim $on={on} $ms={200}>
        <BlogRow>
          <BlogRowHeader>
            <BlogLabel>Últimas historias</BlogLabel>
            <BlogAllLink href="/blog">Ver todas →</BlogAllLink>
          </BlogRowHeader>

          {posts.map((p, i) => (
            <BlogCard key={p.slug} href={`/blog/${p.slug}`} $i={i}>
              <BlogThumb>
                <Image
                  src={p.coverImage}
                  alt={p.title}
                  fill
                  sizes="60px"
                  style={{ objectFit: 'cover' }}
                />
              </BlogThumb>
              <BlogMeta>
                <BlogTag>{p.tags?.[0]}</BlogTag>
                <BlogTitle>{p.title}</BlogTitle>
                <BlogDate>{fmtDate(p.date)} · {p.readTime}</BlogDate>
              </BlogMeta>
            </BlogCard>
          ))}
        </BlogRow>
      </Anim>

    </Section>
  );
}
