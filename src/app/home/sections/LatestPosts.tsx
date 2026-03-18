'use client';

import styled from 'styled-components';
import NextImage from 'next/image';
import Link from 'next/link';
import type { PostMeta } from '@/lib/blog';

/* ═══════════════════════════════════════════
   Section
   ═══════════════════════════════════════════ */
const Section = styled.section`
  position: relative;
  padding: clamp(72px, 10vw, 160px) 0;
  background: ${({ theme }) => theme.colors.white};
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 48px);
`;

/* ─── Section label — editorial kicker ─── */
const Kicker = styled.p`
  font-size: 10px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  text-align: center;
  opacity: 0.35;
  margin-bottom: 14px;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 300;
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.05;
  text-align: center;
  margin-bottom: 8px;

  .it {
    font-style: italic;
    font-weight: 400;
  }
`;

const SectionSub = styled.p`
  text-align: center;
  font-size: 15px;
  opacity: 0.45;
  margin-bottom: clamp(44px, 6vw, 72px);
`;

/* Thin horizontal rule */
const Rule = styled.hr`
  border: none;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 0 auto clamp(44px, 6vw, 72px);
  max-width: 80px;
`;

/* ═══════════════════════════════════════════
   Featured — magazine cover-style hero card
   ═══════════════════════════════════════════ */
const FeaturedCard = styled(Link)`
  display: block;
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  margin-bottom: clamp(48px, 6vw, 80px);

  @media ${({ theme }) => theme.media.mdDown} {
    aspect-ratio: 4 / 5;
  }

  img {
    transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  &:hover img {
    transform: scale(1.03);
  }
`;

const FeaturedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(255, 248, 244, 0.92) 0%,
    rgba(255, 248, 244, 0.7) 35%,
    rgba(255, 248, 244, 0.15) 60%,
    transparent 80%
  );
  z-index: 1;
  pointer-events: none;
  transition: opacity 0.45s ease;

  ${FeaturedCard}:hover & {
    opacity: 0;
  }
`;

const FeaturedContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 2;
  padding: clamp(28px, 4vw, 56px);
  color: ${({ theme }) => theme.colors.black};
  max-width: 520px;
  transition: opacity 0.45s ease;

  ${FeaturedCard}:hover & {
    opacity: 0;
  }
`;

const FeaturedTag = styled.span`
  display: inline-block;
  font-size: 9px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.6;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 5px 14px;
  margin-bottom: 16px;
`;

const FeaturedTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(28px, 3.8vw, 44px);
  line-height: 1.1;
  margin: 0 0 14px;
`;

const FeaturedExcerpt = styled.p`
  font-size: 15px;
  line-height: 1.6;
  opacity: 0.6;
  max-width: 440px;
  margin-bottom: 20px;

  @media ${({ theme }) => theme.media.smDown} {
    display: none;
  }
`;

const FeaturedCta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.7;
`;

/* ═══════════════════════════════════════════
   Secondary posts — editorial columns
   ═══════════════════════════════════════════ */
const SecondaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: 0 clamp(28px, 4vw, 52px);

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
    gap: clamp(40px, 5vw, 56px);
  }
`;

const VerticalRule = styled.div`
  background: ${({ theme }) => theme.colors.border};
  width: 1px;
  align-self: stretch;

  @media ${({ theme }) => theme.media.mdDown} {
    display: none;
  }
`;

const SecondaryCard = styled.article``;

const SecondaryImageWrap = styled(Link)`
  position: relative;
  display: block;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  margin-bottom: clamp(18px, 2vw, 24px);

  img {
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  &:hover img {
    transform: scale(1.04);
  }
`;

const SecondaryMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

const MetaTag = styled.span`
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.4;
`;

const MetaDot = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.black};
  opacity: 0.2;
`;

const MetaTime = styled.span`
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.3;
`;

const SecondaryTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(22px, 2.6vw, 28px);
  line-height: 1.18;
  margin: 0 0 10px;
`;

const SecondaryExcerpt = styled.p`
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.5;
  margin-bottom: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  transition: gap 0.2s ease;

  &::after {
    content: '→';
    font-size: 13px;
    transition: transform 0.2s ease;
  }
  &:hover {
    gap: 14px;
    &::after {
      transform: translateX(2px);
    }
  }
`;

/* ─── Bottom CTA ─── */
const BottomCta = styled.div`
  text-align: center;
  margin-top: clamp(52px, 6vw, 80px);
`;

const CtaBtn = styled(Link)`
  display: inline-block;
  padding: 14px 40px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background: transparent;
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 11px;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }
`;

/* ═══════════════════════════════════════════
   Component
   ═══════════════════════════════════════════ */
interface Props {
  posts: PostMeta[];
}

export default function LatestPosts({ posts }: Props) {
  if (!posts.length) return null;

  const [featured, ...rest] = posts;
  const secondary = rest.slice(0, 2);

  return (
    <Section aria-labelledby="latest-posts-title">
      <Inner>
        {/* ── Editorial header ── */}
        <Kicker>Blog</Kicker>
        <SectionTitle id="latest-posts-title">
          Historias, consejos y <span className="it">reflexiones</span>
        </SectionTitle>
        <SectionSub>Lo último que hemos escrito para ti</SectionSub>
        <Rule />

        {/* ── Featured — full-width magazine hero ── */}
        <FeaturedCard
          href={`/blog/${featured.slug}`}
          aria-label={`Leer: ${featured.title}`}
        >
          {featured.coverImage && (
            <NextImage
              src={featured.coverImage}
              alt={featured.title}
              fill
              priority={false}
              sizes="(max-width: 850px) 100vw, 1200px"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          )}
          <FeaturedOverlay />
          <FeaturedContent>
            {featured.tags?.[0] && (
              <FeaturedTag>{featured.tags[0]}</FeaturedTag>
            )}
            <FeaturedTitle>{featured.title}</FeaturedTitle>
            <FeaturedExcerpt>{featured.description}</FeaturedExcerpt>
            <FeaturedCta>Leer artículo</FeaturedCta>
          </FeaturedContent>
        </FeaturedCard>

        {/* ── Secondary — two-column editorial ── */}
        {secondary.length > 0 && (
          <SecondaryGrid>
            {secondary.flatMap((post, i) => [
              ...(i === 1 ? [<VerticalRule key="divider" />] : []),
              <SecondaryCard key={post.slug}>
                  <SecondaryImageWrap
                    href={`/blog/${post.slug}`}
                    aria-label={`Leer: ${post.title}`}
                  >
                    {post.coverImage && (
                      <NextImage
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 850px) 100vw, 540px"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    )}
                  </SecondaryImageWrap>

                  <SecondaryMeta>
                    {post.tags?.[0] && <MetaTag>{post.tags[0]}</MetaTag>}
                    {post.readTime && (
                      <>
                        <MetaDot />
                        <MetaTime>{post.readTime}</MetaTime>
                      </>
                    )}
                  </SecondaryMeta>

                  <SecondaryTitle>{post.title}</SecondaryTitle>
                  <SecondaryExcerpt>{post.description}</SecondaryExcerpt>
                  <ReadLink href={`/blog/${post.slug}`}>Leer más</ReadLink>
                </SecondaryCard>,
            ])}
          </SecondaryGrid>
        )}

        {/* ── CTA ── */}
        <BottomCta>
          <CtaBtn href="/blog">Explorar el blog</CtaBtn>
        </BottomCta>
      </Inner>
    </Section>
  );
}
