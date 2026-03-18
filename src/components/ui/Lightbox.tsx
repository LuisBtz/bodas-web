'use client';

import { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

/* ─── Types ─── */
export interface LightboxPhoto {
  src: string;
  alt: string;
}

interface Props {
  photos: LightboxPhoto[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

/* ─── Styles ─── */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #FFF8F4;
  display: flex;
  flex-direction: column;

  @keyframes lb-in {
    from { opacity: 0 }
    to   { opacity: 1 }
  }
  animation: lb-in 200ms ease forwards;
`;

const TopBar = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 28px;
  border-bottom: 1px solid #e6e0db;

  @media (max-width: 520px) {
    padding: 14px 18px;
  }
`;

const Counter = styled.span`
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.35);
`;

const CloseBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  background: transparent;
  color: rgba(0,0,0,0.4);
  cursor: pointer;
  padding: 4px 0;
  transition: color 0.15s ease;

  &:hover { color: #000; }
`;

const CloseX = styled.span`
  font-size: 18px;
  line-height: 1;
  font-weight: 300;
`;

const CloseLabel = styled.span`
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;

  @media (max-width: 520px) {
    display: none;
  }
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 0;
  padding: 24px 80px;

  @media (max-width: 850px) {
    padding: 16px 64px;
  }
  @media (max-width: 520px) {
    padding: 12px 0;
  }
`;

const Stage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: min(1200px, 92vw);

  @keyframes img-in {
    from { opacity: 0; transform: scale(0.982) }
    to   { opacity: 1; transform: scale(1) }
  }
  animation: img-in 260ms ease forwards;
`;

const NavBtn = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => $side}: 0;
  width: 48px;
  height: 48px;
  border: 1px solid #e6e0db;
  background: #fff;
  color: rgba(0,0,0,0.45);
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  z-index: 2;

  &:hover {
    background: #000;
    color: #fff;
    border-color: #000;
  }

  @media (max-width: 520px) {
    width: 38px;
    height: 38px;
    font-size: 15px;
    ${({ $side }) => $side}: 8px;
    background: rgba(255,248,244,0.88);
    backdrop-filter: blur(6px);
    border-color: rgba(0,0,0,0.1);
  }
`;

const BottomBar = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 28px;
  gap: 7px;
  border-top: 1px solid #e6e0db;

  @media (max-width: 520px) {
    padding: 14px 18px;
  }
`;

const Dot = styled.span<{ $active: boolean }>`
  display: block;
  width: ${({ $active }) => ($active ? '22px' : '4px')};
  height: 4px;
  background: ${({ $active }) => ($active ? '#000' : '#e6e0db')};
  border-radius: 2px;
  transition: width 0.25s ease, background 0.25s ease;
`;

/* ─── Component ─── */
export default function Lightbox({ photos, index, onClose, onChange }: Props) {
  const len = photos.length;

  const prev = useCallback(() => onChange((index - 1 + len) % len), [index, len, onChange]);
  const next = useCallback(() => onChange((index + 1) % len), [index, len, onChange]);

  // Lock scroll
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, next, prev]);

  const current = photos[index];

  return (
    <Overlay role="dialog" aria-modal="true" aria-label="Visor de imágenes">
      <TopBar>
        <Counter>{index + 1} / {len}</Counter>
        <CloseBtn aria-label="Cerrar" onClick={onClose}>
          <CloseX>✕</CloseX>
          <CloseLabel>Cerrar</CloseLabel>
        </CloseBtn>
      </TopBar>

      <Center>
        <NavBtn $side="left" aria-label="Anterior" onClick={prev}>←</NavBtn>

        <Stage key={index}>
          <Image
            src={current.src}
            alt={current.alt || ''}
            fill
            priority
            sizes="(min-width: 1200px) 90vw, 100vw"
            style={{ objectFit: 'contain' }}
          />
        </Stage>

        <NavBtn $side="right" aria-label="Siguiente" onClick={next}>→</NavBtn>
      </Center>

      <BottomBar>
        {photos.map((_, i) => (
          <Dot key={i} $active={i === index} />
        ))}
      </BottomBar>
    </Overlay>
  );
}
