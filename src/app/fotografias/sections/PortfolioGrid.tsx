'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { GalleryPhoto } from '@/lib/gallery';
import Lightbox from '@/components/ui/Lightbox';

/* ─── aspect-ratio map ─── */
const ASPECT: Record<string, string> = {
  landscape: '3 / 2',
  portrait:  '2 / 3',
  square:    '1 / 1',
};

/* --------------------------------- estilos -------------------------------- */

const Section = styled.section`
  padding: 48px 0 96px;
  background: ${({ theme }) => theme.colors.white};
`;

const Masonry = styled.div`
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
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;

  &:focus-visible { outline: 2px dashed ${({ theme }) => theme.colors.red}; }
`;

const Fig = styled.figure<{ $aspect: string }>`
  margin: 0;
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $aspect }) => $aspect};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.cream};
`;

/* -------------------------------- componente ------------------------------- */

interface Props {
  photos: GalleryPhoto[];
}

export default function PortfolioGrid({ photos }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const lightboxPhotos = useMemo(
    () => photos.map((p) => ({ src: p.image, alt: p.alt })),
    [photos],
  );

  const sizes = '(min-width: 1200px) 33vw, (min-width: 700px) 50vw, 100vw';

  if (!photos.length) return null;

  return (
    <Section>
      <Container>
        <Masonry>
          {photos.map((p, i) => (
            <Item
              key={p.image + i}
              onClick={() => { setIndex(i); setOpen(true); }}
              aria-label={p.alt || 'Ver imagen en grande'}
            >
              <Fig $aspect={ASPECT[p.orientation] ?? '3 / 2'}>
                <Image
                  src={p.image}
                  alt={p.alt || ''}
                  fill
                  sizes={sizes}
                  style={{ objectFit: 'cover' }}
                />
              </Fig>
            </Item>
          ))}
        </Masonry>
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
