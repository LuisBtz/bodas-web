/**
 * MdxComponents — Sin 'use client', 100 % RSC-compatible.
 * next-mdx-remote/rsc evalúa el MDX en el servidor; los componentes
 * deben ser referencias resolvibles en ese contexto, no client references.
 * Usamos inline styles en vez de styled-components para evitar la frontera.
 *
 * Lightbox: cada imagen clickeable lleva data-lightbox-src/data-lightbox-alt.
 * PostLightboxProvider (client) captura clicks vía event delegation.
 */
import NextImage from 'next/image';
import type { MDXComponents } from 'mdx/types';
import type { CSSProperties, ReactNode } from 'react';
import { MdxCarousel } from './MdxGalleries';
import { MdxMasonry } from './MdxGalleries';

/* ─────────────────────────────────────────────
   Constantes de diseño (valores del tema)
───────────────────────────────────────────── */
const T = {
  cream:  '#FFF8F4',
  border: '#e6e0db',
  black:  '#000',
  white:  '#fff',
  font:   "var(--font-cormorant), Georgia, 'Times New Roman', Times, serif",
};

/** Restricción de ancho para texto (prose) */
const prose: CSSProperties = {
  maxWidth: '720px',
  marginInline: 'auto',
  paddingInline: 'clamp(20px, 5vw, 48px)',
  display: 'block',
};

/* ─────────────────────────────────────────────
   Overrides HTML
───────────────────────────────────────────── */
function H2({ children }: { children?: ReactNode }) {
  return (
    <h2 style={{
      ...prose,
      fontFamily: T.font,
      fontWeight: 400,
      fontSize: 'clamp(22px, 3.5vw, 32px)',
      lineHeight: 1.2,
      letterSpacing: '0.01em',
      marginTop: 'clamp(40px, 5vw, 64px)',
      marginBottom: '16px',
    }}>
      {children}
    </h2>
  );
}

function H3({ children }: { children?: ReactNode }) {
  return (
    <h3 style={{
      ...prose,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontSize: '13px',
      marginTop: 'clamp(28px, 3.5vw, 40px)',
      marginBottom: '10px',
    }}>
      {children}
    </h3>
  );
}

function H4({ children }: { children?: ReactNode }) {
  return (
    <h4 style={{
      ...prose,
      fontWeight: 700,
      fontSize: '15px',
      marginTop: '24px',
      marginBottom: '8px',
    }}>
      {children}
    </h4>
  );
}

function P({ children }: { children?: ReactNode }) {
  return (
    <p style={{
      ...prose,
      fontSize: 'clamp(16px, 2vw, 18px)',
      lineHeight: 1.78,
      opacity: 0.9,
      marginBottom: '18px',
    }}>
      {children}
    </p>
  );
}

function UL({ children }: { children?: ReactNode }) {
  return (
    <ul style={{
      ...prose,
      listStyle: 'none',
      padding: 0,
      marginBottom: '24px',
    }}>
      {children}
    </ul>
  );
}

function OL({ children }: { children?: ReactNode }) {
  return (
    <ol style={{
      ...prose,
      paddingLeft: '24px',
      marginBottom: '24px',
    }}>
      {children}
    </ol>
  );
}

function LI({ children }: { children?: ReactNode }) {
  return (
    <li style={{
      position: 'relative',
      paddingLeft: '20px',
      fontSize: 'clamp(15px, 1.8vw, 17px)',
      lineHeight: 1.75,
      opacity: 0.9,
      marginBottom: '10px',
      listStyle: 'none',
    }}>
      <span style={{
        position: 'absolute',
        left: 0,
        opacity: 0.4,
      }}>—</span>
      {children}
    </li>
  );
}

function Blockquote({ children }: { children?: ReactNode }) {
  return (
    <blockquote style={{
      ...prose,
      borderLeft: `2px solid ${T.black}`,
      paddingLeft: '24px',
      marginBlock: '32px',
      fontStyle: 'italic',
      fontSize: 'clamp(17px, 2.2vw, 20px)',
      lineHeight: 1.65,
      opacity: 0.8,
    }}>
      {children}
    </blockquote>
  );
}

function HR() {
  return (
    <hr style={{
      ...prose,
      border: 'none',
      borderTop: `1px solid ${T.border}`,
      marginBlock: '48px',
    }} />
  );
}

function A({ children, href }: { children?: ReactNode; href?: string }) {
  return (
    <a href={href} style={{ borderBottom: '1px solid currentColor' }}>
      {children}
    </a>
  );
}

/* ── img (markdown: ![alt](src)) ── */
function MdxImg({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src || typeof src !== 'string') return null;

  const isAbsolute = src.startsWith('/') || src.startsWith('http');

  return (
    <figure style={{ ...prose, marginBlock: '32px', margin: '32px auto' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3 / 2',
          overflow: 'hidden',
          background: T.cream,
          cursor: 'zoom-in',
        }}
        {...(isAbsolute
          ? { 'data-lightbox-src': src, 'data-lightbox-alt': alt ?? '' }
          : {})}
      >
        {isAbsolute ? (
          <NextImage
            src={src}
            alt={alt ?? ''}
            fill
            sizes="(max-width: 850px) 92vw, 720px"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          // Fallback for relative paths (prevents URL constructor error)
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? ''}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
    </figure>
  );
}

/* ─────────────────────────────────────────────
   Componentes editoriales personalizados
───────────────────────────────────────────── */

interface PhotoProps {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
}

/** Foto de ancho completo, cinematográfica */
export function FullPhoto({ src, alt, caption, aspect }: PhotoProps) {
  if (!src) return null;
  return (
    <figure style={{ width: '100%', marginBlock: 'clamp(40px, 6vw, 80px)', marginInline: 0 }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: aspect ?? '16 / 9',
          overflow: 'hidden',
          background: T.cream,
          cursor: 'zoom-in',
        }}
        data-lightbox-src={src}
        data-lightbox-alt={alt}
      >
        <NextImage
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      {caption && (
        <figcaption style={{
          textAlign: 'center',
          fontStyle: 'italic',
          fontSize: '16px',
          opacity: 0.55,
          marginTop: '10px',
          paddingInline: '20px',
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Foto centrada con ancho prose */
export function Photo({ src, alt, caption, aspect }: PhotoProps) {
  if (!src) return null;
  return (
    <figure style={{
      maxWidth: '720px',
      marginInline: 'auto',
      paddingInline: 'clamp(20px, 5vw, 48px)',
      marginBlock: 'clamp(32px, 5vw, 56px)',
    }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: aspect ?? '3 / 2',
          overflow: 'hidden',
          background: T.cream,
          cursor: 'zoom-in',
        }}
        data-lightbox-src={src}
        data-lightbox-alt={alt}
      >
        <NextImage
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 850px) 92vw, 720px"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      {caption && (
        <figcaption style={{
          textAlign: 'center',
          fontStyle: 'italic',
          fontSize: '16px',
          opacity: 0.55,
          marginTop: '10px',
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

interface PhotoRowProps {
  // Formato nuevo (Keystatic): dos fotos como props planas
  src1?: string; alt1?: string; caption1?: string; aspect1?: string;
  src2?: string; alt2?: string; caption2?: string; aspect2?: string;
  // Formato legado: children con <RowPhoto> anidados
  children?: ReactNode;
}

/** Contenedor de dos fotos lado a lado. Acepta formato plano (src1/src2) o children legacy. */
export function PhotoRow({ src1, alt1, caption1, aspect1, src2, alt2, caption2, aspect2, children }: PhotoRowProps) {
  const row = (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'clamp(8px, 1.5vw, 16px)',
      maxWidth: '1000px',
      marginInline: 'auto',
      marginBlock: 'clamp(32px, 5vw, 64px)',
      paddingInline: 'clamp(20px, 5vw, 48px)',
    }}>
      {src1 && src2
        ? <>
            <RowPhoto src={src1} alt={alt1 ?? ''} caption={caption1} aspect={aspect1} />
            <RowPhoto src={src2} alt={alt2 ?? ''} caption={caption2} aspect={aspect2} />
          </>
        : children}
    </div>
  );
  return row;
}

/** Foto individual dentro de PhotoRow */
export function RowPhoto({ src, alt, caption, aspect }: PhotoProps) {
  if (!src) return null;
  return (
    <figure style={{ flex: '1 1 260px', minWidth: '200px', margin: 0 }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: aspect ?? '2 / 3',
          overflow: 'hidden',
          background: T.cream,
          cursor: 'zoom-in',
        }}
        data-lightbox-src={src}
        data-lightbox-alt={alt}
      >
        <NextImage
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 520px) 92vw, 45vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      {caption && (
        <figcaption style={{
          textAlign: 'center',
          fontStyle: 'italic',
          fontSize: '14px',
          opacity: 0.5,
          marginTop: '8px',
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Caja editorial destacada */
export function Callout({ children, emoji }: { children: ReactNode; emoji?: string }) {
  return (
    <aside style={{
      ...prose,
      background: T.cream,
      borderLeft: `3px solid ${T.black}`,
      padding: '20px 24px',
      marginBlock: 'clamp(28px, 4vw, 48px)',
      fontSize: '15px',
      lineHeight: 1.7,
    }}>
      {emoji && (
        <span style={{ fontSize: '20px', marginBottom: '8px', display: 'block' }}>
          {emoji}
        </span>
      )}
      {children}
    </aside>
  );
}

/** Cita grande centrada */
export function PullQuote({ children, author }: { children: ReactNode; author?: string }) {
  return (
    <blockquote style={{
      maxWidth: '800px',
      marginInline: 'auto',
      paddingInline: 'clamp(20px, 5vw, 64px)',
      marginBlock: 'clamp(40px, 6vw, 72px)',
      textAlign: 'center',
      border: 'none',
    }}>
      <span style={{
        display: 'block',
        fontFamily: T.font,
        fontStyle: 'italic',
        fontSize: 'clamp(22px, 3.5vw, 36px)',
        lineHeight: 1.4,
        fontWeight: 400,
        margin: '0 0 16px',
        opacity: 0.88,
      }}>
        {children}
      </span>
      {author && (
        <cite style={{
          fontSize: '13px',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          opacity: 0.5,
          fontStyle: 'normal',
        }}>
          — {author}
        </cite>
      )}
    </blockquote>
  );
}

/* ─────────────────────────────────────────────
   Mapa de componentes para MDXRemote
───────────────────────────────────────────── */
export const mdxComponents: MDXComponents = {
  // Overrides HTML:
  h2: H2,
  h3: H3,
  h4: H4,
  p:  P,
  ul: UL,
  ol: OL,
  li: LI,
  blockquote: Blockquote,
  hr: HR,
  a:  A,
  img: MdxImg,
  // Componentes editoriales personalizados:
  FullPhoto,
  Photo,
  PhotoRow,
  RowPhoto,
  Callout,
  PullQuote,
  // Galerías (client components):
  Carousel: MdxCarousel,
  MasonryGallery: MdxMasonry,
};
