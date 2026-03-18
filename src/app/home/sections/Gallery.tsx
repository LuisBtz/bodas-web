'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from '@/components/ui/Lightbox';

/* adorno */
const DECOR = '/flower3-bl.svg';

type GImg = { src: string; alt: string };

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

const Grid = styled.ul`
  --gap: clamp(14px, 2vw, 22px);
  --row-h: clamp(160px, 20vw, 260px);

  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--gap);

  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: clamp(34vw, 38vw, 42vw);

  @media (min-width: 851px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: var(--row-h);

    > li:nth-child(1) { grid-column: 1; grid-row: 1; }
    > li:nth-child(2) { grid-column: 1; grid-row: 2; }
    > li:nth-child(3) { grid-column: 2; grid-row: 1 / span 2; }
    > li:nth-child(4) { grid-column: 3; grid-row: 1; }
    > li:nth-child(5) { grid-column: 3; grid-row: 2; }
    > li:nth-child(6) { grid-column: 4; grid-row: 1 / span 2; }
  }
`;

const Item = styled.li`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
  transition: transform .15s ease, box-shadow .15s ease;
  &:hover { box-shadow: 0 1px 0 rgba(0,0,0,.06), 0 14px 32px rgba(0,0,0,.08); }

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

/* ───────────── Componente ───────────── */
export default function Gallery({ photos }: { photos: GImg[] }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  if (!photos.length) return null;

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
            {photos.map((img, i) => (
              <Item key={img.src}>
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
          <a href="/fotografias">VER GALERÍA COMPLETA →</a>
        </Cta>
      </Container>

      {open && (
        <Lightbox
          photos={photos}
          index={idx}
          onChange={setIdx}
          onClose={() => setOpen(false)}
        />
      )}
    </Section>
  );
}
