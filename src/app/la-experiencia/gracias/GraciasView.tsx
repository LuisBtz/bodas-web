'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Container from '@/components/ui/Container';
import { pushEvent } from '@/lib/gtm';

const CALENDLY_URL = 'https://calendly.com/luisbttf/30min';

const Section = styled.section`
  min-height: calc(100dvh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(96px, 14vw, 160px) 0 clamp(72px, 10vw, 120px);
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

const Inner = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.28em;
  font-size: 11px;
  opacity: 0.55;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(44px, 7.5vw, 84px);
  line-height: 1.05;
  letter-spacing: 0.01em;
  margin-bottom: 28px;

  .it { font-style: italic; }
`;

const Lead = styled.p`
  font-size: clamp(15px, 1.6vw, 17px);
  line-height: 1.75;
  max-width: 48ch;
  margin: 0 auto 44px;
  opacity: 0.82;
`;

const Rule = styled.div`
  width: 40px;
  height: 1px;
  background: ${({ theme }) => theme.colors.black};
  opacity: 0.3;
  margin: 0 auto 44px;
`;

const CtaPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 12px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  transition: background 0.2s ease, color 0.2s ease, transform 0.08s ease;

  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.colors.black};
  }
  &:active { transform: translateY(1px); }
`;

const CtaSecondary = styled(Link)`
  display: inline-block;
  margin-top: 28px;
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  opacity: 0.65;
  border-bottom: 1px solid currentColor;
  padding-bottom: 2px;
  transition: opacity 0.2s ease, color 0.2s ease;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.red};
  }
`;

export default function GraciasView() {
  useEffect(() => {
    pushEvent({ event: 'brochure_request_thankyou_view' });
  }, []);

  return (
    <Section>
      <Container>
        <Inner>
          <Eyebrow>Listo</Eyebrow>
          <Title>
            Ya viene en <span className="it">camino</span>
          </Title>
          <Lead>
            Revisa tu correo en los próximos minutos. Si no lo ves, checa la
            carpeta de promociones o spam.
          </Lead>

          <Rule aria-hidden="true" />

          <CtaPrimary
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => pushEvent({ event: 'calendly_click', source: 'gracias' })}
          >
            Agendar videollamada ahora <span aria-hidden="true">→</span>
          </CtaPrimary>

          <div>
            <CtaSecondary href="/bodas-reales/amy-and-jorge">
              Mientras tanto, mira una boda real →
            </CtaSecondary>
          </div>
        </Inner>
      </Container>
    </Section>
  );
}
