'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import NextImage from 'next/image';
import Link from 'next/link';
import type { PostMeta } from '@/lib/blog';
import AuthorBio from '@/components/ui/AuthorBio';

/* ─── Cover ─── */
const CoverSection = styled.div`
  position: relative;
  width: 100%;
  margin-top: 72px;
  aspect-ratio: 16 / 7;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.cream};

  @media ${({ theme }) => theme.media.mdDown} {
    aspect-ratio: 4 / 3;
  }
`;

/* ─── Article header ─── */
const HeaderSection = styled.header`
  padding: clamp(40px, 5vw, 64px) 0 clamp(32px, 4vw, 48px);
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.white};
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  border: 1px solid ${({ theme }) => theme.colors.black};
  padding: 3px 12px;
  opacity: 0.5;
`;

const PostTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(28px, 5vw, 52px);
  line-height: 1.14;
  max-width: 820px;
  margin-inline: auto;
  margin-bottom: 22px;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.5;

  span.dot { opacity: 0.5; }
`;

/* ─── Article body ─── */
const ArticleSection = styled.article`
  padding: clamp(48px, 6vw, 80px) 0 clamp(64px, 8vw, 112px);
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;

/* ─── CTA al final del post ─── */
const PostCta = styled.section`
  padding: clamp(56px, 7vw, 88px) 0;
  background: ${({ theme }) => theme.colors.cream};
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CtaEyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 11px;
  opacity: 0.55;
  margin-bottom: 16px;
`;

const CtaTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(24px, 4vw, 38px);
  margin-bottom: 20px;
  max-width: 600px;
  margin-inline: auto;
`;

const CtaText = styled.p`
  font-size: 16px;
  opacity: 0.75;
  max-width: 540px;
  margin-inline: auto;
  margin-bottom: 28px;
  line-height: 1.65;
`;

const CtaBtn = styled(Link)`
  display: inline-block;
  padding: 12px 36px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 13px;
  transition: background 0.2s ease, color 0.2s ease, transform 0.08s ease;
  border: 1px solid ${({ theme }) => theme.colors.black};

  &:hover { background: transparent; color: ${({ theme }) => theme.colors.black}; }
  &:active { transform: translateY(1px); }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.5;
  margin-bottom: 32px;
  transition: opacity 0.15s ease;

  &:hover { opacity: 0.9; }
`;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface Props {
  post: PostMeta;
  children: React.ReactNode;
}

export default function ArticleShell({ post, children }: Props) {
  return (
    <>
      {/* Cover image */}
      {post.coverImage && (
        <CoverSection>
          <NextImage
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </CoverSection>
      )}

      {/* Article header */}
      <HeaderSection>
        <Container>
          <BackLink href="/blog">← Volver al blog</BackLink>
          <TagRow>
            {post.tags?.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </TagRow>
          <PostTitle>{post.title}</PostTitle>
          <MetaRow>
            <span>{post.author}</span>
            <span className="dot">·</span>
            <span>{formatDate(post.date)}</span>
            <span className="dot">·</span>
            <span>{post.readTime} de lectura</span>
          </MetaRow>
        </Container>
      </HeaderSection>

      {/* Article body — MDXRemote content injected as children */}
      <ArticleSection>
        {children}
        <AuthorBio />
      </ArticleSection>

      {/* CTA */}
      <PostCta>
        <Container>
          <CtaEyebrow>Luis Benítez Photography · Monterrey</CtaEyebrow>
          <CtaTitle>¿Listos para comenzar su historia?</CtaTitle>
          <CtaText>
            Me encantaría conocerlos y conversar sobre el día más importante de su vida.
            Consulten disponibilidad sin compromiso.
          </CtaText>
          <CtaBtn href="/contacto">Agendar una consulta</CtaBtn>
        </Container>
      </PostCta>
    </>
  );
}
