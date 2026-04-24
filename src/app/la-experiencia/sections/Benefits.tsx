'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';

const Section = styled.section`
  padding: clamp(72px, 10vw, 128px) 0;
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.black};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: clamp(48px, 6vw, 72px);
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
  font-size: clamp(28px, 4.5vw, 46px);
  line-height: 1.15;
  letter-spacing: 0.01em;

  .it { font-style: italic; }
`;

const Grid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(32px, 4vw, 56px) clamp(32px, 5vw, 72px);
  max-width: 960px;
  margin-inline: auto;

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const Item = styled.li`
  display: flex;
  gap: 24px;
  align-items: flex-start;
`;

const Numeral = styled.span`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 300;
  font-style: italic;
  font-size: 42px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.red};
  flex-shrink: 0;
  padding-top: 2px;
  min-width: 48px;
`;

const Body = styled.div`
  flex: 1;
`;

const Label = styled.h3`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(18px, 2vw, 22px);
  line-height: 1.3;
  margin-bottom: 8px;
  letter-spacing: 0.01em;
`;

const Rule = styled.span`
  display: block;
  width: 28px;
  height: 1px;
  background: ${({ theme }) => theme.colors.black};
  opacity: 0.35;
  margin-top: 10px;
`;

const items = [
  'Paquetes e inversión detallada',
  'Mi proceso paso a paso',
  'Lo que incluye cada colaboración',
  'Testimonios de parejas reales',
];

export default function Benefits() {
  return (
    <Section aria-labelledby="benefits-title">
      <Container>
        <Header>
          <Eyebrow>Dentro de la guía</Eyebrow>
          <Title id="benefits-title">
            ¿Qué encontrarás en <span className="it">esta guía?</span>
          </Title>
        </Header>

        <Grid>
          {items.map((label, i) => (
            <Item key={i}>
              <Numeral aria-hidden="true">{String(i + 1).padStart(2, '0')}</Numeral>
              <Body>
                <Label>{label}</Label>
                <Rule aria-hidden="true" />
              </Body>
            </Item>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
