// src/components/layout/Footer.tsx
'use client';

import type { StaticImageData } from 'next/image';
import styled from 'styled-components';
import Container from '@/components/ui/Container';
import Image from 'next/image';
import Link from 'next/link';

import f1 from '@/assets/images/footer/1.jpg';
import f2 from '@/assets/images/footer/2.jpg';
import f3 from '@/assets/images/footer/3.jpg';
import f4 from '@/assets/images/footer/4.jpg';
import f5 from '@/assets/images/footer/5.jpg';
import { pushEvent } from '@/lib/gtm';

const IG: { src: StaticImageData; href: string; alt: string }[] = [
  {
    src: f1,
    href:
      'https://www.instagram.com/p/DNo1kFHs190/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    alt: 'Post 1 de Instagram',
  },
  {
    src: f2,
    href:
      'https://www.instagram.com/p/DNE11sMy4k1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    alt: 'Post 2 de Instagram',
  },
  {
    src: f3,
    href:
      'https://www.instagram.com/p/DNLi-3aufmh/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    alt: 'Post 3 de Instagram',
  },
  {
    src: f4,
    href:
      'https://www.instagram.com/p/DNPCy9CsZ5I/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    alt: 'Post 4 de Instagram',
  },
  {
    src: f5,
    href:
      'https://www.instagram.com/luisbenitezphotography/',
    alt: 'Post 5 de Instagram',
  },
];

/* ---------- Top (heading + tira IG) ---------- */
const Section = styled.footer`
  background: ${({ theme }) => theme.colors.bg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Head = styled.div`
  text-align: left;
  padding: 56px 0 24px;

  h3 {
    font-family: ${({ theme }) => theme.fonts.base};
    font-size: 40px;
    font-weight: 400;
    line-height: 1.1;
    margin-bottom: 8px;

    @media ${({ theme }) => theme.media.mdDown} {
      font-size: 32px;
    }
  }

  p {
    font-style: italic;
    max-width: 980px;
    font-size: 18px;
  }
`;

const IgStrip = styled.div`
  margin: 28px 0 54px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;

    /* Hide 5th item on tablet */
    & > a:nth-child(n + 5) {
      display: none;
    }
  }

  @media ${({ theme }) => theme.media.smDown} {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;

    /* Hide 4th+ items on mobile */
    & > a:nth-child(n + 4) {
      display: none;
    }
  }
`;

const IgCard = styled.a`
  position: relative;
  display: block;
  border-radius: 0;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};

  /* Relación de aspecto consistente */
  aspect-ratio: 4 / 5;

  /* Hover sutil */
  transform: translateZ(0);
  &:hover img {
    transform: scale(1.03);
  }
  &:active img {
    transform: scale(1.01);
  }

  img {
    transition: transform 280ms ease;
    object-fit: cover;
  }
`;

/* ---------- Bottom (logo + menús + contacto) ---------- */
const Bottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 42px 0 72px;
`;

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 0.9fr;
  align-items: start;
  gap: 28px;

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
    gap: 22px;
  }
`;

const Brand = styled.div`
  display: grid;
  justify-items: start;
  gap: 18px;

  img {
    width: 74px;
    height: auto;
    display: block;
  }

  ul {
    display: flex;
    gap: 28px;
    list-style: none;
    padding: 0;
    margin: 0;
    font-style: italic;
  }

  a:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const LinksCols = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 48px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 8px;
  }
  a {
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.red};
  }
`;

const Contact = styled.address`
  font-style: normal;
  display: grid;
  gap: 10px;
  justify-items: start;

  a {
    font-style: italic;
  }
`;

export default function Footer() {
  return (
    <Section>
      <Container>
        {/* Top */}
        <Head>
          <h3>Síguenos en Instagram</h3>
          <p>
            Un espacio donde comparto inspiración, consejos y reflexiones sobre
            fotografía de bodas y el arte de contar historias a través de la
            imagen.
          </p>
        </Head>

        <IgStrip aria-label="Últimos posts de Instagram">
          {IG.map((item, i) => (
            <IgCard
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir post ${i + 1} en Instagram`}
            >
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 520px) 33vw, (max-width: 850px) 25vw, 20vw" />
            </IgCard>
          ))}
        </IgStrip>
      </Container>

      {/* Bottom */}
      <Bottom>
        <Container>
          <BottomGrid>
            {/* Col 1: logo + redes */}
            <Brand>
              <Image src="/icon-l.svg" alt="Logotipo Luis Benítez Photography" width={74} height={81} />
              <ul>
                <li>
                  <a href="https://www.facebook.com/profile.php?id=61578594767267" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/luisbenitezphotography/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                {/* <li>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    Youtube
                  </a>
                </li> */}
              </ul>
            </Brand>

            {/* Col 2: navegación del sitio (dos columnas) */}
            <LinksCols aria-label="Enlaces del sitio">
              <ul>
                <li>
                  <Link href="/fotografias">Fotografías</Link>
                </li>
                <li>
                  <Link href="/bodas-reales">Bodas Reales</Link>
                </li>
                <li>
                  <Link href="/sobre-mi">Sobre mí</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/servicios">Servicios</Link>
                </li>
                <li>
                  <Link href="/contacto" style={{ fontWeight: 700 }}>
                    Contacto
                  </Link>
                </li>
              </ul>
            </LinksCols>

            {/* Col 3: contacto */}
            <Contact>
              <a href="mailto:contacto@luisbtz.com">contacto@luisbtz.com</a>
              <a
                href="https://wa.me/5218112498874?text=Hola%20Luis%2C%20te%20contacto%20desde%20tu%20p%C3%A1gina%20web%20%F0%9F%91%8B"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushEvent({ event: 'whatsapp_click', source: 'footer' })}
              >
                +52 (81) 1249-8874
              </a>
            </Contact>
          </BottomGrid>
        </Container>
      </Bottom>
    </Section>
  );
}
