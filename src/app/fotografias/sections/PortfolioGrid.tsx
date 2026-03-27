'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { GalleryPhoto } from '@/lib/gallery';
import Lightbox from '@/components/ui/Lightbox';
import { useColumnCount, distributeColumns } from '@/hooks/useColumnCount';

/* ─── dimension helpers ─── */
const BASE_W = 800;
const HEIGHTS: Record<string, number> = {
  landscape: 533,
  portrait: 1200,
  square: 800,
};

const BREAKPOINTS = [
  { minWidth: 1024, cols: 3 },
  { minWidth: 700, cols: 2 },
  { minWidth: 0, cols: 1 },
];

/* --------------------------------- estilos -------------------------------- */

const Section = styled.section`
  padding: 48px 0 96px;
  background: ${({ theme }) => theme.colors.white};
`;

const Columns = styled.div`
  display: flex;
  gap: 24px;

  @media ${({ theme }) => theme.media.mdDown} {
    gap: 20px;
  }
  @media ${({ theme }) => theme.media.smDown} {
    gap: 0;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 0;
`;

const Item = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  margin: 0 0 24px 0;
  border: 0;
  background: none;
  cursor: zoom-in;

  &:focus-visible {
    outline: 2px dashed ${({ theme }) => theme.colors.red};
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    background: ${({ theme }) => theme.colors.cream};
  }
`;

/* -------------------------------- componente ------------------------------- */

interface Props {
  photos: GalleryPhoto[];
}

export default function PortfolioGrid({ photos }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const cols = useColumnCount(BREAKPOINTS);

  const lightboxPhotos = useMemo(
    () => photos.map((p) => ({ src: p.image, alt: p.alt })),
    [photos],
  );

  const columns = useMemo(
    () => distributeColumns(
      photos.map((p, i) => ({ photo: p, originalIndex: i })),
      cols,
    ),
    [photos, cols],
  );

  const sizes = '(min-width: 1200px) 33vw, (min-width: 700px) 50vw, 100vw';

  if (!photos.length) return null;

  return (
    <Section>
      <Container>
        <Columns>
          {columns.map((col, colIdx) => (
            <Column key={colIdx}>
              {col.map(({ photo: p, originalIndex: i }) => (
                <Item
                  key={p.image + i}
                  onClick={() => {
                    setIndex(i);
                    setOpen(true);
                  }}
                  aria-label={p.alt || 'Ver imagen en grande'}
                >
                  <Image
                    src={p.image}
                    alt={p.alt || ''}
                    width={BASE_W}
                    height={HEIGHTS[p.orientation] ?? 533}
                    sizes={sizes}
                  />
                </Item>
              ))}
            </Column>
          ))}
        </Columns>
      </Container>

      {open && (
        <Lightbox
          photos={lightboxPhotos}
          index={index}
          onChange={setIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </Section>
  );
}
