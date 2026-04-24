'use client';

import Link from 'next/link';
import styled from 'styled-components';

const Bar = styled.header`
  position: relative;
  z-index: 5;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
`;

const Inner = styled.div`
  max-width: 1200px;
  margin-inline: auto;
  padding: 10px clamp(16px, 3vw, 28px);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
  min-height: 44px;

  @media ${({ theme }) => theme.media.smDown} {
    grid-template-columns: auto 1fr;
    /* El "spacer" de la derecha se oculta en mobile para centrar el copy */
    & > span:last-child { display: none; }
  }
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 4px;
  margin: -4px;
  transition: opacity 0.2s ease;

  &:hover { opacity: 0.75; }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.white};
    outline-offset: 3px;
  }
`;

const Logo = styled.img`
  height: 22px;
  width: auto;
  display: block;
  filter: brightness(0) invert(1);
`;

const Message = styled.a`
  justify-self: center;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  line-height: 1.35;
  transition: opacity 0.2s ease;

  strong {
    font-weight: 700;
    color: #f5c6c6;
    letter-spacing: inherit;
  }

  span.arrow {
    transition: transform 0.2s ease;
  }

  &:hover {
    opacity: 0.85;
    span.arrow { transform: translateX(3px); }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.white};
    outline-offset: 3px;
  }

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: 11px;
    letter-spacing: 0.1em;
    gap: 8px;
  }

  @media ${({ theme }) => theme.media.smDown} {
    justify-self: end;

    .long { display: none; }
  }
`;

/* Spacer invisible para equilibrar el grid en desktop */
const Spacer = styled.span`
  width: 22px;
  height: 22px;
`;

export default function MinimalHeader() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('solicitar-guia');
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Bar aria-label="Anuncio">
      <Inner>
        <Brand href="/" aria-label="Luis Benítez Photography — ir al inicio">
          <Logo src="/icon-l.svg" alt="" />
        </Brand>

        <Message href="#solicitar-guia" onClick={handleClick}>
          <span>
            <span className="long">Cupos limitados para bodas 2026 — </span>
            <strong>asegura tu fecha</strong> antes que se agote
          </span>
          <span className="arrow" aria-hidden="true">→</span>
        </Message>

        <Spacer aria-hidden="true" />
      </Inner>
    </Bar>
  );
}
