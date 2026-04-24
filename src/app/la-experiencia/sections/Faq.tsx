'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Container from '@/components/ui/Container';

const Section = styled.section`
  padding: clamp(72px, 10vw, 120px) 0;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: clamp(44px, 6vw, 64px);
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.24em;
  font-size: 11px;
  opacity: 0.55;
  margin-bottom: 18px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(28px, 4.5vw, 44px);
  line-height: 1.15;

  .it { font-style: italic; }
`;

const List = styled.dl`
  max-width: 760px;
  margin-inline: auto;
`;

const Item = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const Question = styled.button<{ $open: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 4px;
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  gap: 16px;
  text-align: left;
  color: inherit;

  span.text {
    font-family: ${({ theme }) => theme.fonts.base};
    font-weight: 400;
    font-size: clamp(16px, 1.8vw, 19px);
    letter-spacing: 0.01em;
    flex: 1;
  }

  span.icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    position: relative;
    opacity: 0.55;

    &::before,
    &::after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.colors.black};
      border-radius: 1px;
    }
    &::before {
      top: 50%;
      left: 0;
      width: 100%;
      height: 1px;
      transform: translateY(-50%);
    }
    &::after {
      top: 0;
      left: 50%;
      width: 1px;
      height: 100%;
      transform: translateX(-50%);
      transition: opacity 0.2s ease;
      opacity: ${({ $open }) => ($open ? 0 : 1)};
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.red};
    outline-offset: 4px;
  }
`;

const Answer = styled.dd<{ $open: boolean }>`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? '500px' : '0')};
  transition: max-height 0.3s ease;
  margin: 0;

  p {
    padding: 0 4px 24px;
    font-size: 15px;
    line-height: 1.75;
    opacity: 0.8;
    max-width: 68ch;
  }
`;

const faqs: { q: string; a: string }[] = [
  {
    q: '¿Cuándo es ideal reservar mi fecha?',
    a: 'Trabajo con un número limitado de bodas al año. Lo ideal es reservar con 8-12 meses de anticipación, especialmente para fechas de temporada alta (octubre-diciembre, marzo-mayo).',
  },
  {
    q: '¿Viajas fuera de Monterrey?',
    a: 'Sí. Documento bodas en cualquier parte de México y el mundo. Los viáticos se calculan según el destino.',
  },
  {
    q: '¿Qué pasa después de recibir la guía?',
    a: 'Tras revisar los paquetes, el siguiente paso es una videollamada de 20 minutos para conocernos y revisar disponibilidad. El link para agendar viene dentro de la guía.',
  },
  {
    q: '¿Ofreces paquetes personalizados?',
    a: 'La colección base y los complementos cubren la mayoría de las bodas, pero si tu día tiene necesidades específicas, lo conversamos en la videollamada.',
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <Section aria-labelledby="experiencia-faq-title">
      <Container>
        <Header>
          <Eyebrow>Preguntas</Eyebrow>
          <Title id="experiencia-faq-title">
            Antes de que <span className="it">preguntes</span>
          </Title>
        </Header>

        <List>
          {faqs.map((item, i) => {
            const open = openIdx === i;
            const panelId = `experiencia-faq-panel-${i}`;
            return (
              <Item key={i}>
                <dt>
                  <Question
                    $open={open}
                    onClick={() => toggle(i)}
                    aria-expanded={open}
                    aria-controls={panelId}
                  >
                    <span className="text">{item.q}</span>
                    <span className="icon" aria-hidden="true" />
                  </Question>
                </dt>
                <Answer id={panelId} $open={open} role="region">
                  <p>{item.a}</p>
                </Answer>
              </Item>
            );
          })}
        </List>
      </Container>
    </Section>
  );
}
