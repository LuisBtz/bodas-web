'use client';

import styled from 'styled-components';
import NextImage from 'next/image';
import { useRef } from 'react';

/* ═══════════════════════════════════════════
   Helpers
═══════════════════════════════════════════ */

const MAX_CAROUSEL = 8;
const MAX_MASONRY = 12;

interface ImgSlot {
  src: string;
  alt: string;
}

/** Extract filled image slots from numbered props (src1…srcN, alt1…altN) */
function extractSlots(props: Record<string, unknown>, max: number): ImgSlot[] {
  const out: ImgSlot[] = [];
  for (let i = 1; i <= max; i++) {
    const src = props[`src${i}`];
    if (src && typeof src === 'string') {
      out.push({ src, alt: (props[`alt${i}`] as string) ?? '' });
    }
  }
  return out;
}

/* ═══════════════════════════════════════════
   MdxCarousel — horizontal scroll, 3 desktop / 2 mobile
═══════════════════════════════════════════ */

const CarouselWrap = styled.div`
  position: relative;
  max-width: 1000px;
  margin: clamp(32px, 5vw, 64px) auto;
  padding-inline: clamp(20px, 5vw, 48px);
`;

const Track = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const Slide = styled.div`
  flex: 0 0 calc((100% - 32px) / 3);
  scroll-snap-align: start;
  cursor: zoom-in;

  @media (max-width: 768px) {
    flex: 0 0 calc((100% - 16px) / 2);
  }
`;

const SlideImg = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background: #FFF8F4;
`;

const Arrow = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => $side}: 4px;
  width: 40px;
  height: 40px;
  border: 1px solid #e6e0db;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(4px);
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
  transition: background 0.15s, color 0.15s, border-color 0.15s;

  &:hover {
    background: #000;
    color: #fff;
    border-color: #000;
  }

  @media (max-width: 520px) {
    width: 34px;
    height: 34px;
    font-size: 14px;
  }
`;

export type MdxCarouselProps = Record<string, unknown>;

export function MdxCarousel(props: MdxCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const images = extractSlots(props, MAX_CAROUSEL);

  const scroll = (dir: number) => {
    if (!trackRef.current) return;
    const firstSlide = trackRef.current.firstElementChild as HTMLElement | null;
    if (!firstSlide) return;
    trackRef.current.scrollBy({ left: dir * (firstSlide.offsetWidth + 16), behavior: 'smooth' });
  };

  if (!images.length) return null;

  return (
    <CarouselWrap>
      {images.length > 3 && (
        <Arrow $side="left" onClick={() => scroll(-1)} aria-label="Anterior">←</Arrow>
      )}
      <Track ref={trackRef}>
        {images.map((img, i) => (
          <Slide key={i}>
            <SlideImg data-lightbox-src={img.src} data-lightbox-alt={img.alt}>
              <NextImage
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 45vw, 30vw"
                style={{ objectFit: 'cover' }}
              />
            </SlideImg>
          </Slide>
        ))}
      </Track>
      {images.length > 3 && (
        <Arrow $side="right" onClick={() => scroll(1)} aria-label="Siguiente">→</Arrow>
      )}
    </CarouselWrap>
  );
}

/* ═══════════════════════════════════════════
   MdxMasonry — 3-column CSS masonry grid
═══════════════════════════════════════════ */

const MasonryWrap = styled.div`
  max-width: 1000px;
  margin: clamp(32px, 5vw, 64px) auto;
  padding-inline: clamp(20px, 5vw, 48px);
  columns: 3;
  column-gap: 16px;

  @media (max-width: 768px) {
    columns: 2;
  }

  @media (max-width: 480px) {
    columns: 1;
  }
`;

const MasonryItem = styled.div`
  break-inside: avoid;
  margin-bottom: 16px;
  cursor: zoom-in;
  overflow: hidden;
  background: #FFF8F4;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

export type MdxMasonryProps = Record<string, unknown>;

export function MdxMasonry(props: MdxMasonryProps) {
  const images = extractSlots(props, MAX_MASONRY);

  if (!images.length) return null;

  return (
    <MasonryWrap>
      {images.map((img, i) => (
        <MasonryItem key={i} data-lightbox-src={img.src} data-lightbox-alt={img.alt}>
          <NextImage
            src={img.src}
            alt={img.alt}
            width={800}
            height={1200}
            sizes="(max-width: 480px) 90vw, (max-width: 768px) 45vw, 30vw"
            style={{ width: '100%', height: 'auto' }}
          />
        </MasonryItem>
      ))}
    </MasonryWrap>
  );
}
