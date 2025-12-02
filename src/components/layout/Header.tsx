'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/* ---------- Config ---------- */
const BAR_HEIGHT = 72;
const BREAKPOINT = 780;        // iPads / móviles
const HYSTERESIS = 2;          // tolerancia al umbral 100vh
const DOWN_THRESHOLD = 4;      // mostrar sticky tras acumular scroll down
const UP_THRESHOLD = 10;       // ocultar sticky tras acumular scroll up
const PANEL_IMAGE_SRC = '/menu-side.jpg'; // <-- pon tu imagen en public/
const INTRO_MS = 700;          // duración del slide inicial del header

/* ---------- Base styles ---------- */
const Nav = styled.nav`
  height: ${BAR_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* logo a la izq, burger a la der en móvil */
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
`;

const Menu = styled.ul`
  display: flex;
  width: 100%;
  max-width: 980px;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;

  li:last-child a { font-weight: 700; }

  a {
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    transition: color .2s ease;
  }

  a:hover,
  a[data-active='true'] {
    color: ${({ theme }) => theme.colors.red};
  }

  /* En móvil: sólo se muestra el logo en la barra; el resto va al drawer */
  @media (max-width: ${BREAKPOINT}px) {
    li:not(:first-child) { display: none; }
  }
`;

/* Barra transparente sobre el hero: no ocupa layout, no desplaza */
const BarHero = styled.header<{
  $visible: boolean;
  $intro: 'off' | 'from' | 'to';
}>`
  position: absolute;
  inset: 0 0 auto 0;
  z-index: 50;
  background: transparent;

  /* visibilidad por estar en el hero o durante intro */
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};

  /* animación de entrada */
  transform: translateY(${({ $intro }) => ($intro === 'from' ? '-100%' : '0%')});
  transition:
    transform ${INTRO_MS}ms ease,
    opacity 200ms ease;
`;

/* Barra fija blanca que aparece tras 100vh con slide */
const BarSticky = styled.header<{ $show: boolean }>`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 60;
  background: ${({ theme }) => theme.colors.white};

  transform: translateY(${({ $show }) => ($show ? '0%' : '-100%')});
  transition: transform 220ms ease;
  pointer-events: ${({ $show }) => ($show ? 'auto' : 'none')};
  will-change: transform;
`;

const Logo = styled.img`
  height: 36px;
  width: auto;
  display: block;
`;

/* Botón hamburguesa (solo móvil) */
const Burger = styled.button<{ $open: boolean }>`
  display: none;
  @media (max-width: ${BREAKPOINT}px) {
    display: inline-flex;
  }
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;

  span {
    position: relative;
    display: block;
    width: 22px;
    height: 2px;
    background: ${({ theme }) => theme.colors.black};
    transition: transform .2s ease, background .2s ease;
  }
  span::before,
  span::after{
    content: '';
    position: absolute;
    left: 0;
    width: 22px;
    height: 2px;
    background: ${({ theme }) => theme.colors.black};
    transition: transform .2s ease, opacity .2s ease, top .2s ease, bottom .2s ease;
  }
  span::before{ top: -7px; }
  span::after{ bottom: -7px; }

  /* animación a “X” cuando está abierto */
  ${({ $open }) => $open && `
    span { background: transparent; }
    span::before { top: 0; transform: rotate(45deg); }
    span::after { bottom: 0; transform: rotate(-45deg); }
  `}
`;

/* ---------- Drawer fullscreen (right slide) ---------- */
const Drawer = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 80;
  background: ${({ theme }) => theme.colors.white};
  transform: translateX(${({ $open }) => ($open ? '0%' : '100%')});
  transition: transform 260ms ease;
  will-change: transform;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 520px) {
    grid-template-columns: 1fr; /* apilado en XS */
  }
`;

const DrawerLeft = styled.div`
  position: relative;
  overflow: hidden;
  border-right: 1px solid ${({ theme }) => theme.colors.black};

  @media (max-width: 520px) {
    display: none; /* oculta la imagen en XS si prefieres */
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DrawerRight = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px min(6vw, 32px);
  gap: 24px;
  position: relative;
`;

const DrawerClose = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  cursor: pointer;

  /* “X” */
  &::before, &::after {
    content: '';
    position: absolute;
    top: 19px; left: 9px;
    width: 22px;
    height: 2px;
    background: ${({ theme }) => theme.colors.black};
  }
  &::before { transform: rotate(45deg); }
  &::after  { transform: rotate(-45deg); }
`;

const DrawerList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 64px 0 0; /* baja los links para separarlos de la X */
  display: flex;
  flex-direction: column;
  gap: 18px;

  .contact {
    margin-top: 20px;

    a {
      text-decoration: none;
      text-transform: lowercase;
      border-bottom: none;
      font-style: italic;
    }

    .links {
      padding: 0;
      margin: 10px 0;
      list-style: none;
      display: flex;

      a { margin-right: 20px; }
    }
  }

  a{
    text-transform: uppercase;
    font-weight: 200;
    letter-spacing: .04em;
    font-size: 20px;
    border-bottom: solid 1px black;
    margin-bottom: 10px;
    display: inline-block;
  }
`;

/* ---------- Link con estado activo ---------- */
function MenuLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const pathname = usePathname();
  const active = pathname === href || pathname?.startsWith(href + '/');
  return (
    <li>
      <Link href={href} data-active={active ? 'true' : undefined} onClick={onClick}>
        {label}
      </Link>
    </li>
  );
}

/* ---------- Componente ---------- */
export default function Header() {
  const pathname = usePathname();

  const [isPastHero, setIsPastHero] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  const [open, setOpen] = useState(false);

  // Intro: 'from' (arriba, listo para animar) → 'to' (baja) → 'off' (estado normal)
  const [intro, setIntro] = useState<'off' | 'from' | 'to'>('off');

  const prevY = useRef(0);
  const accum = useRef(0);
  const lastDir = useRef<'down' | 'up' | null>(null);
  const raf = useRef<number | null>(null);

  /* Animación de entrada del header (solo al entrar arriba y sin reduced motion) */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const atTop = window.scrollY <= 10;

    if (atTop && !reduce) {
      // primer frame: posición inicial arriba (-100%)
      setIntro('from');
      // siguiente frame: animar a 0
      requestAnimationFrame(() => setIntro('to'));

      const done = setTimeout(() => {
        setIntro('off'); // dejamos el header en su sitio
        // avisamos al Hero que puede mostrar su contenido
        document.dispatchEvent(new Event('intro:headerDone'));
      }, INTRO_MS + 30);

      return () => clearTimeout(done);
    } else {
      // si no estamos arriba o reduce motion, no hay intro
      setIntro('off');
      // avisa al hero para que no espere
      document.dispatchEvent(new Event('intro:headerDone'));
    }
  }, []);

  /* Scroll logic: mostrar/ocultar la barra sticky después de 100vh */
  useEffect(() => {
    const tick = () => {
      raf.current = null;
      const y = window.scrollY;
      const past = y >= window.innerHeight - HYSTERESIS;

      setIsPastHero(past);

      if (!past) {
        setShowSticky(false);
        accum.current = 0;
        lastDir.current = null;
        prevY.current = y;
        return;
      }

      const delta = y - prevY.current;
      const dir: 'down' | 'up' | null = delta > 0 ? 'down' : delta < 0 ? 'up' : null;

      if (dir && dir !== lastDir.current) {
        accum.current = 0;
        lastDir.current = dir;
      }

      if (dir === 'down') {
        accum.current += delta;
        if (accum.current >= DOWN_THRESHOLD) {
          setShowSticky(true);
          accum.current = 0;
        }
      } else if (dir === 'up') {
        accum.current += delta; // negativo
        if (Math.abs(accum.current) >= UP_THRESHOLD) {
          setShowSticky(false);
          accum.current = 0;
        }
      }

      prevY.current = y;
    };

    const onScroll = () => {
      if (raf.current != null) return;
      raf.current = requestAnimationFrame(tick);
    };

    prevY.current = window.scrollY;
    const startPast = window.scrollY >= window.innerHeight - HYSTERESIS;
    setIsPastHero(startPast);
    setShowSticky(startPast);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  /* Cerrar drawer al cambiar de ruta */
  useEffect(() => { setOpen(false); }, [pathname]);

  /* Bloquear scroll del body cuando el drawer está abierto */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  /* Cerrar si se pasa a escritorio (>BREAKPOINT) */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > BREAKPOINT) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Esc para cerrar */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const links = (
    <>
      <MenuLink href="/fotografias" label="Fotografías" onClick={() => setOpen(false)} />
      <MenuLink href="/bodas-reales" label="Bodas Reales" onClick={() => setOpen(false)} />
      <MenuLink href="/sobre-mi" label="Sobre mí" onClick={() => setOpen(false)} />
      <MenuLink href="/blog" label="Blog" onClick={() => setOpen(false)} />
      <MenuLink href="/servicios" label="Servicios" onClick={() => setOpen(false)} />
      <MenuLink href="/contacto" label="Contacto" onClick={() => setOpen(false)} />
    </>
  );

  const BarContent = () => (
    <>
      <Menu>
        {/* Logo siempre visible */}
        <li>
          <Link href="/" aria-label="Ir al inicio">
            <Logo src="/icon-l.svg" alt="" />
          </Link>
        </li>

        {/* Links escritorio (ocultos en móvil por media query) */}
        {links}
      </Menu>

      {/* Burger solo en ≤780px */}
      <Burger
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        aria-controls="mobile-drawer"
        onClick={() => setOpen(v => !v)}
        $open={open}
      >
        <span />
      </Burger>
    </>
  );

  // La barra de hero es visible si NO pasaste 100vh o si está corriendo la intro
  const heroVisible = !isPastHero || intro !== 'off';

  return (
    <>
      {/* Barra transparente sobre hero con animación de entrada */}
      <BarHero $visible={heroVisible} $intro={intro} aria-label="primary-hero">
        <Container>
          <Nav>
            <BarContent />
          </Nav>
        </Container>
      </BarHero>

      {/* Barra sticky blanca (post 100vh) */}
      <BarSticky $show={showSticky} aria-label="primary-sticky">
        <Container>
          <Nav>
            <BarContent />
          </Nav>
        </Container>
      </BarSticky>

      {/* Drawer fullscreen */}
      <Drawer id="mobile-drawer" role="dialog" aria-modal="true" $open={open}>
        <DrawerLeft>
          {/* Imagen lado izquierdo */}
          <img src={PANEL_IMAGE_SRC} alt="" />
        </DrawerLeft>

        <DrawerRight>
          <DrawerClose aria-label="Cerrar menú" onClick={() => setOpen(false)} />

          <nav aria-label="mobile">
            <DrawerList>
              {links}
              <div className='contact'>
                <p><a>contacto@luisbtz.com</a></p>
                <ul className='links'>
                  <li><a>Facebook</a></li>
                  <li><a>Instagram</a></li>
                </ul>
              </div>
            </DrawerList>
          </nav>
        </DrawerRight>
      </Drawer>
    </>
  );
}