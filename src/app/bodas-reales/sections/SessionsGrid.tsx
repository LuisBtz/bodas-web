'use client';

import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';
import Container from '@/components/ui/Container';

type Session = {
  title: string;
  subtitle?: string;
  href: string;            // enlace a Pic-Time
  image: StaticImageData;  // import estático
  alt?: string;
};

const Section = styled.section`
  padding: 64px 0 100px;
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 56px 40px;
  list-style: none;
  padding: 0;
  margin: 0;

  /* 2 cols en tablets */
  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 44px 28px;
  }
  /* 1 col en móvil */
  @media ${({ theme }) => theme.media.smDown} {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

const Card = styled.li`
  text-align: center;
`;

const ThumbLink = styled.a`
  display: block;
  position: relative;
  border: 0;

  /* pequeño realce al hover */
  &:hover img { transform: scale(1.01); }
`;

const Thumb = styled.div`
  position: relative;
  overflow: hidden;
  /* Dejamos que cada foto conserve su propia relación de aspecto */
  border: 0;

  img {
    transition: transform .25s ease;
    width: 100%;
    height: auto;
    display: block;
  }
`;

const Title = styled.h3`
  margin: 14px 0 6px;
  font-size: 18px;
  letter-spacing: .02em;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  margin: 0 0 10px;
  font-size: 13px;
  letter-spacing: .04em;
  text-transform: uppercase;
  opacity: .8;
`;

const Cta = styled.a`
  font-size: 12px;
  letter-spacing: .06em;
  text-transform: uppercase;
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  padding-bottom: 2px;

  &:hover {
    color: ${({ theme }) => theme.colors.red};
    border-bottom-color: ${({ theme }) => theme.colors.red};
  }
`;

export default function SessionsGrid({ items }: { items: Session[] }) {
  return (
    <Section>
      <Container>
        <Grid>
          {items.map((s, i) => (
            <Card key={s.href + i}>
              <ThumbLink
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir galería de ${s.title}`}
              >
                <Thumb>
                  <Image
                    src={s.image}
                    alt={s.alt ?? s.title}
                    placeholder="blur"
                    sizes="(max-width: 780px) 100vw, (max-width: 1100px) 50vw, 32vw"
                    // con import estático, Next sabe width/height y respeta el aspect ratio
                  />
                </Thumb>
              </ThumbLink>

              <Title>{s.title}</Title>
              {s.subtitle && <Subtitle>{s.subtitle}</Subtitle>}

              <Cta
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                View gallery
              </Cta>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
