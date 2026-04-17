'use client';

import styled from 'styled-components';
import NextImage from 'next/image';
import Link from 'next/link';
import authorPhoto from '@/assets/images/home/hero-2.webp';

const Wrapper = styled.aside`
  max-width: 680px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 48px);
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 24px;
  align-items: start;
  padding: 32px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 480px) {
    grid-template-columns: 72px 1fr;
    gap: 18px;
  }
`;

const AvatarLink = styled(Link)`
  display: block;
  position: relative;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  filter: grayscale(0.15);
  transition: filter 0.3s ease;
  transform: scaleX(-1);
  img {
    transform: scale(300%) translateY(5%);
  }
  &:hover {
    filter: grayscale(0);
  }

  @media (max-width: 480px) {
    width: 72px;
    height: 72px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Eyebrow = styled.span`
  font-size: 9px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.4;
`;

const Name = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(18px, 2vw, 22px);
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const Bio = styled.p`
  font-size: 13px;
  line-height: 1.65;
  opacity: 0.6;
  margin: 2px 0 0;
  max-width: 440px;
`;

const ProfileLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  margin-top: 6px;
  transition: gap 0.2s ease;

  &::after {
    content: '→';
    font-size: 12px;
    transition: transform 0.2s ease;
  }
  &:hover {
    gap: 10px;
    &::after { transform: translateX(2px); }
  }
`;

export default function AuthorBio() {
  return (
    <Wrapper>
      <Card>
        <AvatarLink href="/sobre-mi" aria-label="Sobre Luis Benítez">
          <NextImage
            src={authorPhoto}
            alt="Luis Benítez"
            fill
            sizes="96px"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            placeholder="blur"
          />
        </AvatarLink>

        <Body>
          <Eyebrow>Fotografía por</Eyebrow>
          <Name href="/sobre-mi">Luis Benítez</Name>
          <Bio>
            Fotógrafo de bodas en Monterrey. Creo en las imágenes que se sienten antes de entenderse
            — momentos reales, luz natural y parejas que se olvidan de la cámara.
          </Bio>
          <ProfileLink href="/sobre-mi">Conoce más</ProfileLink>
        </Body>
      </Card>
    </Wrapper>
  );
}
