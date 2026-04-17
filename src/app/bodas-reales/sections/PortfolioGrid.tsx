'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useMemo, useState } from 'react';

/* --------------------------------- estilos -------------------------------- */

const Section = styled.section`
  padding: 48px 0 96px;
  background: ${({ theme }) => theme.colors.white};
`;

const Masonry = styled.div`
  /* masonry CSS nativo con columnas */
  column-count: 3;
  column-gap: 24px;

  @media ${({ theme }) => theme.media.mdDown} {
    column-count: 2;
    column-gap: 20px;
  }
  @media ${({ theme }) => theme.media.smDown} {
    column-count: 1;
    column-gap: 0;
  }
`;

const Item = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  margin: 0 0 24px 0;
  border: 0;
  background: none;
  cursor: zoom-in;

  /* evita que el elemento se rompa entre columnas */
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;

  &:focus-visible { outline: 2px dashed ${({ theme }) => theme.colors.red}; }
`;

const Fig = styled.figure`
  margin: 0;
  position: relative;

  img {
    /* El wrapper de Next <Image> recibe este width:100% */
    width: 100% !important;
    height: auto !important; /* mantiene proporción original */
  }
`;

/* ----------------------------- Lightbox styles ---------------------------- */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,0.92);
  display: grid;
  grid-template-rows: 1fr;
  place-items: center;
`;

const Stage = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const CloseBtn = styled.button`
  position: fixed;
  top: 14px;
  right: 16px;
  width: 44px;
  height: 44px;
  border: none;
  background: rgba(255,255,255,0.12);
  color: #fff;
  font-size: 26px;
  line-height: 1;
  border-radius: 6px;
  cursor: pointer;
  z-index: 2;
  &:hover { background: rgba(255,255,255,0.18); }
`;

const NavBtn = styled.button<{ side: 'left' | 'right' }>`
  position: fixed;
  top: 0;
  ${({ side }) => side}: 0;
  width: 50vw;
  max-width: 540px;
  height: 100vh;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #fff;
  z-index: 1;

  /* icono */
  &::after{
    content: '${({ side }) => (side === 'left' ? '‹' : '›')}';
    position: absolute;
    top: 50%;
    ${({ side }) => side}: 16px;
    transform: translateY(-50%);
    font-size: clamp(44px, 6vw, 80px);
    line-height: 1;
    opacity: .8;
    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover::after { opacity: 1; }
  }
`;

/* ---------------------------------- tipos --------------------------------- */

type Photo = {
  src: StaticImageData;
  alt: string;
};

/* ----------------------------- tus imágenes aquí ----------------------------- */
/* Sustituye por tus imports. Con static import, Next conoce width/height reales */
import p1 from '@/assets/images/imagenes/1.jpg';
import p2 from '@/assets/images/imagenes/2.jpg';
import p3 from '@/assets/images/imagenes/3.jpg';
import p4 from '@/assets/images/imagenes/4.jpg';
import p5 from '@/assets/images/imagenes/5.jpg';
import p6 from '@/assets/images/imagenes/6.jpg';
import p7 from '@/assets/images/imagenes/7.jpg';
import p8 from '@/assets/images/imagenes/8.jpg';
import p9 from '@/assets/images/imagenes/9.jpg';
import p10 from '@/assets/images/imagenes/10.jpg';
import p11 from '@/assets/images/imagenes/11.jpg';
import p12 from '@/assets/images/imagenes/12.jpg';
import p13 from '@/assets/images/imagenes/13.jpg';
import p14 from '@/assets/images/imagenes/14.jpg';
/* ...agrega/quita libremente */

const PHOTOS: Photo[] = [
  { src: p1, alt: '' },
  { src: p2, alt: '' },
  { src: p3, alt: '' },
  { src: p4, alt: '' },
  { src: p5, alt: '' },
  { src: p6, alt: '' },
  { src: p7, alt: '' },
  { src: p8, alt: '' },
  { src: p9, alt: '' },
  { src: p10, alt: '' },
  { src: p11, alt: '' },
  { src: p12, alt: '' },
  { src: p13, alt: '' },
  { src: p14, alt: '' },
];

/* -------------------------------- componente ------------------------------- */

export default function PortfolioGrid() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const photos = useMemo(() => PHOTOS, []);

  // bloquear scroll del body cuando el lightbox está abierto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // teclas: ← → Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % photos.length);
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, photos.length]);

  const sizes =
    '(min-width: 1200px) 33vw, (min-width: 700px) 50vw, 100vw';

  return (
    <Section>
      <Container>
        <Masonry>
          {photos.map((p, i) => (
            <Item
              key={i}
              onClick={() => { setIndex(i); setOpen(true); }}
              aria-label="Ver imagen en grande"
            >
              <Fig>
                <Image
                  src={p.src}
                  alt={p.alt}
                  // usa los width/height del import estático y deja que se adapte al 100% del contenedor
                  placeholder="blur"
                  sizes={sizes}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </Fig>
            </Item>
          ))}
        </Masonry>
      </Container>

      {/* Lightbox */}
      {open && (
        <Overlay role="dialog" aria-modal="true">
          <CloseBtn aria-label="Cerrar" onClick={() => setOpen(false)}>×</CloseBtn>
          <NavBtn side="left" aria-label="Anterior"
            onClick={() => setIndex(i => (i - 1 + photos.length) % photos.length)} />
          <Stage>
            <Image
              src={photos[index].src}
              alt={photos[index].alt}
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              style={{ objectFit: 'contain' }}
            />
          </Stage>
          <NavBtn side="right" aria-label="Siguiente"
            onClick={() => setIndex(i => (i + 1) % photos.length)} />

          {/* Pre-carga simple de la siguiente/prev imagen para que el pase sea suave */}
          <div style={{ display: 'none' }}>
            <Image src={photos[(index + 1) % photos.length].src} alt="" />
            <Image src={photos[(index - 1 + photos.length) % photos.length].src} alt="" />
          </div>
        </Overlay>
      )}
    </Section>
  );
}
