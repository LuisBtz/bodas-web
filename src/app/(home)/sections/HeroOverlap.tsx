'use client';

import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import type { PostMeta } from '@/lib/blog';

import heroMain from '@/assets/images/imagenes/1.jpg';
import heroAccent from '@/assets/images/imagenes/7.jpg';

/* ── helpers ── */
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
}

/* ═══════════════════════════════════════
   ANIMACIONES
═══════════════════════════════════════ */
const rise = keyframes`
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const Anim = styled.div<{ $on: boolean; $ms: number; $fade?: boolean }>`
  opacity: 0;
  ${({ $on, $ms, $fade }) => $on && css`
    animation: ${$fade ? fadeIn : rise} 700ms cubic-bezier(0.16, 1, 0.3, 1) ${$ms}ms forwards;
  `}
`;

/* ═══════════════════════════════════════
   SHELL
═══════════════════════════════════════ */
const Wrap = styled.section`
  min-height: 100dvh;
  padding-top: 72px;
  background: ${({ theme }) => theme.colors.cream};
  display: flex;
  flex-direction: column;
`;

/* ═══════════════════════════════════════
   COMPOSICIÓN PRINCIPAL — el fracture
   3 columnas: [TIPO-IZQ] [FOTO] [TIPO-DER]
═══════════════════════════════════════ */
const Stage = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  min-height: clamp(380px, 62vh, 700px);

  @media ${({ theme }) => theme.media.mdDown} {
    flex-direction: column;
    min-height: unset;
  }
`;

/* — Columna izquierda — */
const LeftCol = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: flex-end;
  padding: 0 clamp(10px, 1.8vw, 36px) clamp(20px, 3vw, 48px);

  @media ${({ theme }) => theme.media.mdDown} {
    display: none;
  }
`;

/* — Columna foto — */
const PhotoCol = styled.div`
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;

  img { transition: transform 900ms ease; }
  &:hover img { transform: scale(1.025); }

  @media ${({ theme }) => theme.media.mdDown} {
    height: clamp(280px, 55vw, 440px);
    width: 100%;
  }
`;

/* Foto de acento flotante — esquina inf-izq de la foto principal */
const AccentPhoto = styled.div`
  position: absolute;
  bottom: -6%;
  left: -10%;
  width: clamp(90px, 13vw, 170px);
  aspect-ratio: 3/4;
  overflow: hidden;
  z-index: 4;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);

  img { transition: transform 600ms ease; }
  &:hover img { transform: scale(1.06); }

  @media ${({ theme }) => theme.media.mdDown} {
    left: auto;
    right: 5%;
    bottom: -12%;
    width: clamp(70px, 18vw, 120px);
  }
`;

/* — Columna derecha — */
const RightCol = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(20px, 2.5vw, 40px) clamp(16px, 2vw, 44px) clamp(20px, 2.5vw, 40px);
  min-width: min(clamp(180px, 22vw, 310px), 40vw);

  @media ${({ theme }) => theme.media.mdDown} {
    padding: 28px 24px 24px;
    min-width: unset;
  }
`;

/* ═══════════════════════════════════════
   TIPOGRAFÍA — el corazón del diseño
═══════════════════════════════════════ */
const WordSplit = styled.span`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 300;
  font-size: clamp(52px, 7.8vw, 112px);
  line-height: 0.88;
  letter-spacing: -0.03em;
  color: #000;
  text-transform: uppercase;
  white-space: nowrap;
  display: block;
`;

/* "de bodas" — contraste con el bloque de arriba */
const Sub = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.base};
  font-style: italic;
  font-weight: 300;
  font-size: clamp(20px, 2.4vw, 36px);
  line-height: 1;
  letter-spacing: 0.01em;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 6px;
  white-space: nowrap;
`;

/* Copy en la parte baja de la columna derecha */
const BottomCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Rule = styled.div`
  width: 28px;
  height: 1px;
  background: rgba(0, 0, 0, 0.22);
`;

const Copy = styled.p`
  font-family: ${({ theme }) => theme.fonts.base};
  font-style: italic;
  font-size: clamp(14px, 1.2vw, 16px);
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.48);
  margin: 0;
  max-width: 26ch;
`;

/* Versión mobile de la tipografía — stacked */
const MobileType = styled.div`
  display: none;
  padding: 28px 24px 0;

  @media ${({ theme }) => theme.media.mdDown} {
    display: block;
  }
`;

const MobileWord = styled.span`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 300;
  font-size: clamp(52px, 14vw, 80px);
  line-height: 0.88;
  letter-spacing: -0.03em;
  color: #000;
  text-transform: uppercase;
  display: block;
`;

const MobileSub = styled.span`
  font-family: ${({ theme }) => theme.fonts.base};
  font-style: italic;
  font-weight: 300;
  font-size: clamp(22px, 6vw, 36px);
  color: rgba(0, 0, 0, 0.42);
  display: block;
  margin-top: 4px;
`;

/* ═══════════════════════════════════════
   HISTORIAS — 2 story cards editoriales
═══════════════════════════════════════ */
const StoriesWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media ${({ theme }) => theme.media.smDown} {
    grid-template-columns: 1fr;
  }
`;

const StoriesLabel = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px clamp(20px, 4vw, 56px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const LabelText = styled.span`
  font-size: 9px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.3);
`;

const AllLink = styled(Link)`
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.28);
  transition: color 0.15s;
  &:hover { color: #000; }
`;

const StoryCard = styled(Link)<{ $idx: number }>`
  display: flex;
  flex-direction: column;
  color: inherit;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.15s;

  &:last-child { border-right: none; }
  &:hover { background: rgba(0, 0, 0, 0.016); }

  @media ${({ theme }) => theme.media.smDown} {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    flex-direction: row;
    gap: 16px;
    align-items: center;
    padding: 14px 20px;
    &:last-child { border-bottom: none; }
  }
`;

const StoryImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  flex-shrink: 0;

  img { transition: transform 600ms ease; }
  ${StoryCard}:hover & img { transform: scale(1.04); }

  @media ${({ theme }) => theme.media.smDown} {
    width: 80px;
    aspect-ratio: 1;
    border-radius: 2px;
  }
`;

const StoryBody = styled.div`
  padding: 14px clamp(16px, 2.5vw, 32px) 18px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media ${({ theme }) => theme.media.smDown} {
    padding: 0;
  }
`;

const StoryNum = styled.span`
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.25);
`;

const StoryTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.base};
  font-style: italic;
  font-weight: 400;
  font-size: clamp(15px, 1.4vw, 18px);
  line-height: 1.25;
  color: #000;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StoryDate = styled.span`
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.22);
  margin-top: 2px;
`;

/* ═══════════════════════════════════════
   BARRA INFERIOR
═══════════════════════════════════════ */
const BottomBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px clamp(20px, 4vw, 56px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
  gap: 12px;
`;

const Location = styled.span`
  font-size: 9px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.25);
`;

const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 28px;
  border: 1px solid #000;
  background: transparent;
  color: #000;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: background 0.2s, color 0.2s, transform 0.08s;

  &:hover  { background: #000; color: #fff; }
  &:active { transform: translateY(1px); }
`;

/* ═══════════════════════════════════════
   COMPONENTE
═══════════════════════════════════════ */
export default function HeroOverlap({ posts }: { posts: PostMeta[] }) {
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

  const storyPosts = posts.slice(0, 2);

  return (
    <Wrap>

      {/* ── COMPOSICIÓN FRACTURE ── */}
      <Stage>

        {/* Columna izquierda: "FOTO" */}
        <LeftCol>
          <Anim $on={on} $ms={60}>
            <WordSplit>Foto</WordSplit>
          </Anim>
        </LeftCol>

        {/* Columna centro: foto principal */}
        <Anim $on={on} $ms={0} $fade style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <PhotoCol>
            <Image
              src={heroMain}
              alt="Fotografía de boda"
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 850px) 100vw, 55vw"
              style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
            />
            {/* Foto acento flotante */}
            <AccentPhoto>
              <Image
                src={heroAccent}
                alt=""
                fill
                placeholder="blur"
                sizes="(max-width: 520px) 18vw, 13vw"
                style={{ objectFit: 'cover' }}
              />
            </AccentPhoto>
          </PhotoCol>
        </Anim>

        {/* Columna derecha: "GRAFÍA" + copy */}
        <RightCol>
          <Anim $on={on} $ms={80}>
            <WordSplit>grafía</WordSplit>
            <Sub>de bodas</Sub>
          </Anim>

          <Anim $on={on} $ms={200}>
            <BottomCopy>
              <Rule />
              <Copy>
                Cada mirada, cada gesto —
                fotografiados con la sensibilidad
                que merece lo irrepetible.
              </Copy>
            </BottomCopy>
          </Anim>
        </RightCol>

      </Stage>

      {/* Tipografía móvil — visible solo en mobile */}
      <Anim $on={on} $ms={60}>
        <MobileType>
          <MobileWord>Fotografía</MobileWord>
          <MobileSub>de bodas</MobileSub>
        </MobileType>
      </Anim>

      {/* ── HISTORIAS ── */}
      {storyPosts.length > 0 && (
        <Anim $on={on} $ms={260}>
          <StoriesWrap>
            <StoriesLabel>
              <LabelText>Últimas historias</LabelText>
              <AllLink href="/blog">Ver todas →</AllLink>
            </StoriesLabel>

            {storyPosts.map((p, i) => (
              <StoryCard key={p.slug} href={`/blog/${p.slug}`} $idx={i}>
                <StoryImage>
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    sizes="(max-width: 520px) 80px, (max-width: 850px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                </StoryImage>
                <StoryBody>
                  <StoryNum>0{i + 1} — {p.tags?.[0]}</StoryNum>
                  <StoryTitle>{p.title}</StoryTitle>
                  <StoryDate>{fmtDate(p.date)} · {p.readTime}</StoryDate>
                </StoryBody>
              </StoryCard>
            ))}
          </StoriesWrap>
        </Anim>
      )}

      {/* ── BARRA INFERIOR ── */}
      <Anim $on={on} $ms={320}>
        <BottomBar>
          <Location>Luis Benítez Photography · Monterrey, México</Location>
          <Cta href="/contacto">Comienza tu historia →</Cta>
        </BottomBar>
      </Anim>

    </Wrap>
  );
}
