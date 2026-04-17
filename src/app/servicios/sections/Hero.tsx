'use client';

import Image from 'next/image';
import styled from 'styled-components';
import Container from '@/components/ui/Container';

const WRAP_TOP_OFFSET = 96;

const Section = styled.section`
  padding: ${WRAP_TOP_OFFSET}px 0 72px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.white};
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 12px;
  margin-bottom: 24px;
  margin-top: 100px;
  opacity: 0.75;

  @media ${({ theme }) => theme.media.mdDown} {
    letter-spacing: 0.18em;
  }
`;

const Title = styled.h1`
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.14;
  font-size: clamp(28px, 6vw, 48px);
  max-width: 1100px;
  margin: 0 auto 20px;

  @media ${({ theme }) => theme.media.mdDown} {
    line-height: 1.18;
    max-width: 760px;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 28px;
  opacity: 0.35;

  span {
    width: 56px;
    height: 1px;
    background: ${({ theme }) => theme.colors.black};
    display: block;
  }

  img {
    width: 32px;
  }
`;

export default function Hero() {
  return (
    <Section>
      <Container>
        <Eyebrow>Servicios</Eyebrow>
        <Title>
          Fotografía y video para el día más importante
        </Title>
        <Divider>
          <span />
          <Image src="/Vector.svg" alt="" width={32} height={47} />
          <span />
        </Divider>
      </Container>
    </Section>
  );
}
