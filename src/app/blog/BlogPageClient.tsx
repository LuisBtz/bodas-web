'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import NextImage from 'next/image';
import { BLUR_PLACEHOLDER } from '@/lib/blur-placeholder';
import type { PostMeta } from '@/lib/blog';

/* ─── Hero ─── */
const HeroSection = styled.section`
  padding: 196px 0 72px;
  text-align: center;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};

  @media ${({ theme }) => theme.media.mdDown} {
    padding: 160px 0 56px;
  }
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 12px;
  opacity: 0.65;
  margin-bottom: 20px;
`;

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(30px, 5.5vw, 56px);
  line-height: 1.14;
  max-width: 800px;
  margin-inline: auto;

  .it { font-style: italic; }
`;

const HeroDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 28px;
  opacity: 0.3;

  span { width: 56px; height: 1px; background: currentColor; display: block; }
  img  { width: 28px; }
`;

/* ─── Grid ─── */
const GridSection = styled.section`
  padding: clamp(56px, 7vw, 96px) 0 clamp(80px, 10vw, 140px);
  background: ${({ theme }) => theme.colors.cream};
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(24px, 3vw, 40px);

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({ theme }) => theme.media.smDown} {
    grid-template-columns: 1fr;
  }
`;

const PostCard = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.09);
  }

  &:hover .card-img img {
    transform: scale(1.04);
  }
`;

const CardImg = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.cream};

  img {
    transition: transform 0.5s ease;
  }
`;

const CardBody = styled.div`
  padding: clamp(20px, 3vw, 28px);
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
`;

const Tag = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  border: 1px solid ${({ theme }) => theme.colors.black};
  padding: 2px 10px;
  opacity: 0.55;
`;

const CardTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(18px, 2.5vw, 22px);
  line-height: 1.25;
  margin-bottom: 10px;
`;

const CardExcerpt = styled.p`
  font-size: 14px;
  line-height: 1.65;
  opacity: 0.7;
  flex: 1;
  /* clamp to 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 20px;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.45;
  margin-top: auto;

  span.dot { opacity: 0.4; }
`;

const CardCta = styled.span`
  margin-top: 14px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-bottom: 1px solid currentColor;
  padding-bottom: 2px;
  display: inline-block;
  transition: opacity 0.15s ease;

  ${PostCard}:hover & { opacity: 0.6; }
`;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface Props {
  posts: PostMeta[];
}

export default function BlogPageClient({ posts }: Props) {
  return (
    <>
      <HeroSection>
        <Container>
          <Eyebrow>Blog</Eyebrow>
          <HeroTitle>
            Historias, <span className="it">consejos</span><br />y reflexiones
          </HeroTitle>
          <HeroDivider>
            <span />
            <NextImage src="/Vector.svg" alt="" width={32} height={47} />
            <span />
          </HeroDivider>
        </Container>
      </HeroSection>

      <GridSection>
        <Container>
          <PostGrid>
            {posts.map((post) => (
              <PostCard key={post.slug} href={`/blog/${post.slug}`}>
                <CardImg className="card-img">
                  {post.coverImage && (
                    <NextImage
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 520px) 92vw, (max-width: 1000px) 46vw, 30vw"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                    />
                  )}
                </CardImg>
                <CardBody>
                  <TagRow>
                    {post.tags?.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                  </TagRow>
                  <CardTitle>{post.title}</CardTitle>
                  <CardExcerpt>{post.description}</CardExcerpt>
                  <CardMeta>
                    <span>{formatDate(post.date)}</span>
                    <span className="dot">·</span>
                    <span>{post.readTime}</span>
                  </CardMeta>
                  <CardCta>Leer artículo →</CardCta>
                </CardBody>
              </PostCard>
            ))}
          </PostGrid>
        </Container>
      </GridSection>
    </>
  );
}
