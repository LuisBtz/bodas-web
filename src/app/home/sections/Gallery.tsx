'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

/* ───────────── Imágenes (tus rutas) ───────────── */
import g1 from '@/assets/images/home/gallery/g1.webp';
import g2 from '@/assets/images/home/gallery/g2.webp';
import g3 from '@/assets/images/home/gallery/g3.webp';
import g4 from '@/assets/images/home/gallery/g4.webp';
import g5 from '@/assets/images/home/gallery/g5.webp';
import g6 from '@/assets/images/home/gallery/g6.webp';

/* adorno */
const DECOR = '/flower3-bl.svg';

type GImg = { src: any; alt: string };

const IMAGES: GImg[] = [
  { src: g1, alt: 'Pareja celebrando con confeti' },   // columna izquierda (arriba)
  { src: g2, alt: 'Interior de iglesia' },             // columna izquierda (abajo)
  { src: g3, alt: 'Novios en marco de telas (alto)' }, // COLUMNA ALTA (3ra imagen)
  { src: g4, alt: 'Balcón de iglesia (arriba derecha)' }, // derecha (arriba)
  { src: g5, alt: 'Fachada de iglesia (abajo derecha)' }, // derecha (abajo)
  { src: g6, alt: 'Pasillo con invitados (top intermedio)' }, // top intermedio
];

/* ───────────── Estilos ───────────── */
const Section = styled.section`
  position: relative;
  overflow: visible;
  padding: clamp(64px, 8vw, 110px) 0;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;

const Head = styled.header`
  text-align: center;
  max-width: 1000px;
  margin: 0 auto clamp(28px, 4vw, 40px);

  h2 {
    font-size: clamp(32px, 4.8vw, 56px);
    font-weight: 400;
    font-style: italic;
    margin-bottom: clamp(10px, 1.6vw, 14px);
  }
  p {
    max-width: 78ch;
    margin: 0 auto;
    line-height: 1.55;
    font-size: 18px;
  }
`;

const GridWrap = styled.div`
  position: relative;
`;

const Decor = styled.img`
  position: absolute;
  left: -32px;
  bottom: -32px;
  width: clamp(90px, 14vw, 180px);
  pointer-events: none;
  user-select: none;
  z-index: 3;

  @media ${({ theme }) => theme.media.mdDown} {
    left: -18px;
    bottom: -18px;
    width: clamp(76px, 22vw, 130px);
  }
`;

/* 
  LAYOUT DESKTOP (≥851px):
  - 2 filas (grid-auto-rows)
  - 4 columnas visibles:
      col1: 2 thumbs apilados (items 1 y 2)
      col2: imagen ALTA (item 3) → span 2 filas
      col3: thumb superior intermedio (item 6)
      col4: 2 thumbs apilados derecha (items 4 y 5)
  MOBILE (≤850px): grid 2 cols sin posiciones forzadas
*/
const Grid = styled.ul`
  --gap: clamp(14px, 2vw, 22px);
  --row-h: clamp(160px, 20vw, 260px); /* alto base de cada fila */

  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--gap);

  /* MOBILE por defecto (fluido) */
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: clamp(34vw, 38vw, 42vw);

  /* DESKTOP */
  @media (min-width: 851px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: var(--row-h);

    /* Posicionamiento explícito */
    > li:nth-child(1) { grid-column: 1; grid-row: 1; }            /* izquierda arriba */
    > li:nth-child(2) { grid-column: 1; grid-row: 2; }            /* izquierda abajo */

    > li:nth-child(3) { grid-column: 2; grid-row: 1 / span 2; }   /* 3ra imagen → ALTA */

    > li:nth-child(4) { grid-column: 3; grid-row: 1; }            /* derecha arriba */
    > li:nth-child(5) { grid-column: 3; grid-row: 2; }            /* derecha abajo */
    > li:nth-child(6) { grid-column: 4; grid-row: 1 / span 2; }            /* top intermedio */

   
  }
`;

const Item = styled.li`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
  transition: transform .15s ease, box-shadow .15s ease;
  &:hover {  box-shadow: 0 1px 0 rgba(0,0,0,.06), 0 14px 32px rgba(0,0,0,.08); }

  button {
    position: absolute;
    inset: 0;
    border: none;
    padding: 0;
    cursor: zoom-in;
    background: transparent;
  }
`;

const Thumb = styled(Image)`
  object-fit: cover;
    object-position: bottom;
`;

const Cta = styled.div`
  text-align: center;
  margin-top: clamp(26px, 3.5vw, 40px);

  a {
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: .04em;
    font-size: 14px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
    padding-bottom: 6px;
    transition: color .2s ease, border-color .2s ease;
  }
  a:hover { color: ${({ theme }) => theme.colors.red}; border-color: ${({ theme }) => theme.colors.red}; }
`;

/* ───────────── Lightbox ───────────── */
const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: ${({ $open }) => ($open ? 'grid' : 'none')};
  place-items: center;
  background: rgba(0,0,0,.92);
  color: white;
`;

const Stage = styled.div`
  position: relative;
  width: min(96vw, 1400px);
  height: min(88vh, 900px);
`;

const BigImg = styled(Image)`
  object-fit: contain;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 40px; height: 40px;
  border: none; background: transparent; cursor: pointer;
  &::before, &::after {
    content: '';
    position: absolute;
    top: 19px; left: 9px;
    width: 22px; height: 2px; background: white;
  }
  &::before { transform: rotate(45deg); }
  &::after  { transform: rotate(-45deg); }
`;

const NavBtn = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === 'left' ? 'left: 8px;' : 'right: 8px;')}
  transform: translateY(-50%);
  width: 56px; height: 56px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,.5);
  background: rgba(0,0,0,.35);
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    inset: 0; margin: auto;
    width: 10px; height: 10px;
    border-top: 2px solid #fff; border-right: 2px solid #fff;
    transform: ${({ $side }) => ($side === 'left' ? 'rotate(-135deg)' : 'rotate(45deg)')};
  }
`;

const Counter = styled.div`
  position: absolute;
  left: 14px; bottom: 12px;
  font-size: 14px; opacity: .8;
`;

/* ───────────── Componente ───────────── */
export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  // bloquear scroll al abrir
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // teclado
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, idx]);

  const next = () => setIdx((i) => (i + 1) % IMAGES.length);
  const prev = () => setIdx((i) => (i - 1 + IMAGES.length) % IMAGES.length);

  // gestos
  const startX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => { startX.current = e.clientX; };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    const TH = 40;
    if (dx > TH) prev();
    else if (dx < -TH) next();
    startX.current = null;
  };

  const active = IMAGES[idx];
  const sizes = useMemo(() => ({ w: active.src.width, h: active.src.height }), [idx]); // por si lo necesitas

  return (
    <Section aria-labelledby="gallery-title">
      <Container>
        <Head>
          <h2 id="gallery-title">Explora la galería</h2>
          <p>
            Cada fotografía es más que una imagen: un fragmento de historia convertido en memoria eterna.
            Aquí encontrarás una selección de mis trabajos más recientes.
          </p>
        </Head>

        <GridWrap>
          <Grid>
            {IMAGES.map((img, i) => (
              <Item key={i}>
                <Thumb
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 850px) 48vw, (max-width: 520px) 50vw, 22vw"
                  priority={i < 3}
                />
                <button
                  type="button"
                  aria-label="Abrir imagen"
                  onClick={() => { setIdx(i); setOpen(true); }}
                />
              </Item>
            ))}
          </Grid>

          <Decor src={DECOR} alt="" />
        </GridWrap>

        <Cta>
          <a href="/galeria">VER GALERÍA COMPLETA →</a>
        </Cta>
      </Container>

      {/* Lightbox */}
      <Overlay $open={open} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
        <Stage
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imágenes"
        >
          <BigImg
            key={idx}
            src={active.src}
            alt={active.alt}
            fill
            sizes="100vw"
            style={{ objectFit: 'contain' }}
            priority
          />
          <CloseBtn aria-label="Cerrar" onClick={() => setOpen(false)} />
          <NavBtn $side="left"  aria-label="Anterior" onClick={prev} />
          <NavBtn $side="right" aria-label="Siguiente" onClick={next} />
          <Counter>{idx + 1} / {IMAGES.length}</Counter>
        </Stage>
      </Overlay>
    </Section>
  );
}
