'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import NextImage from 'next/image';
import { BLUR_PLACEHOLDER } from '@/lib/blur-placeholder';
import { useMemo, useState } from 'react';
import Lightbox from '@/components/ui/Lightbox';
import { useColumnCount, distributeColumns } from '@/hooks/useColumnCount';

/* adorno */
const DECOR = '/flower3-bl.svg';

type GImg = { src: string; alt: string };

const BREAKPOINTS = [
  { minWidth: 851, cols: 3 },
  { minWidth: 0, cols: 2 },
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

const Columns = styled.div`
  display: flex;
  gap: clamp(14px, 2vw, 22px);
`;

const Column = styled.div`
  flex: 1;
  min-width: 0;
`;

const Item = styled.div`
  margin-bottom: clamp(14px, 2vw, 22px);
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
  transition: box-shadow 0.15s ease;
  &:hover {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06), 0 14px 32px rgba(0, 0, 0, 0.08);
  }

  button {
    display: block;
    width: 100%;
    border: none;
    padding: 0;
    margin: 0;
    cursor: zoom-in;
    background: transparent;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const Cta = styled.div`
  text-align: center;
  margin-top: clamp(26px, 3.5vw, 40px);

  a {
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: 14px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
    padding-bottom: 6px;
    transition: color 0.2s ease, border-color 0.2s ease;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.red};
    border-color: ${({ theme }) => theme.colors.red};
  }
`;

/* ───────────── Componente ───────────── */
export default function Gallery({ photos }: { photos: GImg[] }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const cols = useColumnCount(BREAKPOINTS);

  const columns = useMemo(
    () =>
      distributeColumns(
        photos.map((img, i) => ({ img, originalIndex: i })),
        cols,
      ),
    [photos, cols],
  );

  if (!photos.length) return null;

  return (
    <Section aria-labelledby="gallery-title">
      <Container>
        <Head>
          <h2 id="gallery-title">Explora la galería</h2>
          <p>
            Cada fotografía es más que una imagen: un fragmento de historia
            convertido en memoria eterna. Aquí encontrarás una selección de mis
            trabajos más recientes.
          </p>
        </Head>

        <GridWrap>
          <Columns>
            {columns.map((col, colIdx) => (
              <Column key={colIdx}>
                {col.map(({ img, originalIndex: i }) => (
                  <Item key={img.src}>
                    <button
                      type="button"
                      aria-label="Abrir imagen"
                      onClick={() => {
                        setIdx(i);
                        setOpen(true);
                      }}
                    >
                      <NextImage
                        src={img.src}
                        alt={img.alt}
                        width={600}
                        height={600}
                        sizes="(max-width: 850px) 48vw, 30vw"
                        priority={i < 3}
                        placeholder="blur"
                        blurDataURL={BLUR_PLACEHOLDER}
                      />
                    </button>
                  </Item>
                ))}
              </Column>
            ))}
          </Columns>

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
