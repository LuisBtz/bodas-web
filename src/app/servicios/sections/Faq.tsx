'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Container from '@/components/ui/Container';

const Section = styled.section`
  padding: clamp(64px, 9vw, 120px) 0;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: clamp(44px, 6vw, 64px);
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: clamp(24px, 4.5vw, 42px);
  line-height: 1.2;
`;

const List = styled.dl`
  max-width: 780px;
  margin-inline: auto;
`;

const Item = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const Question = styled.dt<{ $open: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  cursor: pointer;
  gap: 16px;
  user-select: none;

  span.text {
    font-family: ${({ theme }) => theme.fonts.base};
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 13px;
    flex: 1;
  }

  span.icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    position: relative;
    opacity: 0.5;

    &::before,
    &::after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.colors.black};
      border-radius: 1px;
    }
    /* Barra horizontal siempre visible */
    &::before {
      top: 50%;
      left: 0;
      width: 100%;
      height: 1px;
      transform: translateY(-50%);
    }
    /* Barra vertical: desaparece cuando está abierto */
    &::after {
      top: 0;
      left: 50%;
      width: 1px;
      height: 100%;
      transform: translateX(-50%);
      transition: transform 0.2s ease, opacity 0.2s ease;
      opacity: ${({ $open }) => ($open ? 0 : 1)};
    }
  }
`;

const Answer = styled.dd<{ $open: boolean }>`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? '400px' : '0')};
  transition: max-height 0.3s ease;
  margin: 0;

  p {
    padding-bottom: 22px;
    font-size: 15px;
    line-height: 1.75;
    opacity: 0.85;
    max-width: 68ch;
  }
`;

const faqs = [
  {
    q: '¿Trabajas fuera de Monterrey?',
    a: 'Sí, he documentado bodas en distintas ciudades de México y en el extranjero. Si su boda es fuera de Monterrey, escríbanme y les envío información sobre tarifas de traslado y disponibilidad.',
  },
  {
    q: '¿Serás tú quien nos fotografíe personalmente?',
    a: 'Sí. A diferencia de estudios que cuentan con varios fotógrafos, yo me dedico personalmente a cada boda que acepto. Por eso tomo un número muy limitado de bodas por año, garantizando atención y calidad en cada una.',
  },
  {
    q: '¿Se requiere anticipo para reservar la fecha?',
    a: 'Para confirmar su fecha se firma un contrato y se cubre un anticipo del 50% del total. El 50% restante se liquida con anticipación a la boda. Lamentablemente no es posible apartar fechas sin estos requisitos.',
  },
  {
    q: '¿Cuánto tiempo tardan en recibir las fotografías?',
    a: 'Recibirán una vista previa de más de 100 imágenes en los primeros días. La galería completa con todas las fotografías editadas en alta resolución estará lista en un plazo de 30 días después de la boda.',
  },
  {
    q: '¿Cuántas horas de cobertura necesitamos?',
    a: 'La mayoría de las parejas necesitan entre 8 y 10 horas de cobertura. Durante nuestra consulta inicial repasaremos juntos el itinerario del día para que tengan un estimado preciso. También es posible agregar horas adicionales al momento de reservar o incluso el mismo día de la boda si desean extender la cobertura.',
  },
  {
    q: '¿Ofrecen video?',
    a: 'Sí. Cuento con un cineasta colaborador de confianza que puede documentar su boda en video cinematográfico. Su trabajo complementa perfectamente mi estilo fotográfico para que tengan una experiencia visual completa. Pueden preguntar por esta opción al momento de hacer su consulta.',
  },
  {
    q: '¿Disparas en analógico o digital?',
    a: 'Mi estilo está profundamente inspirado en la fotografía de película, especialmente en la paleta de Kodak Portra. Trabajo principalmente con cámara digital para garantizar la mejor calidad y consistencia, pero el proceso de edición logra esa calidez y atemporalidad del film que tanto me caracteriza. Todas las imágenes se entregan en formato digital.',
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <Section aria-labelledby="faq-title">
      <Container>
        <Header>
          <Title id="faq-title">
            Preguntas<br />frecuentes
          </Title>
        </Header>

        <List>
          {faqs.map((item, i) => (
            <Item key={i}>
              <Question
                $open={openIdx === i}
                onClick={() => toggle(i)}
                aria-expanded={openIdx === i}
              >
                <span className="text">{item.q}</span>
                <span className="icon" aria-hidden="true" />
              </Question>
              <Answer $open={openIdx === i}>
                <p>{item.a}</p>
              </Answer>
            </Item>
          ))}
        </List>
      </Container>
    </Section>
  );
}
