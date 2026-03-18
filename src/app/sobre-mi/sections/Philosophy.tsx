'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';

const DECO_TL = '/decor-top-left.svg';
const DECO_BR = '/decor-bottom-right.svg';

const Section = styled.section`
  position: relative;
  padding: clamp(64px, 9vw, 130px) 0;
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.black};
  overflow: visible;
`;

const DecoTL = styled.img`
  position: absolute;
  top: -22px;
  left: -22px;
  width: clamp(80px, 10vw, 140px);
  pointer-events: none;
  user-select: none;
  opacity: 0.85;

  @media ${({ theme }) => theme.media.mdDown} {
    display: none;
  }
`;

const DecoBR = styled.img`
  position: absolute;
  bottom: -22px;
  right: -22px;
  width: clamp(80px, 10vw, 140px);
  pointer-events: none;
  user-select: none;
  opacity: 0.85;

  @media ${({ theme }) => theme.media.mdDown} {
    display: none;
  }
`;

const Header = styled.header`
  text-align: center;
  max-width: 680px;
  margin: 0 auto clamp(48px, 6vw, 72px);
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 12px;
  opacity: 0.65;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(28px, 4.8vw, 50px);
  line-height: 1.14;

  .it { font-style: italic; }
  .caps { text-transform: uppercase; font-weight: 700; }

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: clamp(24px, 7vw, 36px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(28px, 4vw, 56px);

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin-inline: auto;
    gap: 40px;
  }
`;

const Pillar = styled.article`
  text-align: center;
  position: relative;
`;

const Number = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.base};
  font-size: clamp(56px, 8vw, 96px);
  font-weight: 400;
  font-style: italic;
  line-height: 1;
  color: ${({ theme }) => theme.colors.black};
  opacity: 0.08;
  margin-bottom: -20px;
  user-select: none;
`;

const PillarTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(20px, 2.8vw, 28px);
  letter-spacing: 0.01em;
  line-height: 1.2;
  margin-bottom: 14px;
  position: relative;
  z-index: 1;

  .it { font-style: italic; }
`;

const Rule = styled.div`
  width: 36px;
  height: 1px;
  background: ${({ theme }) => theme.colors.black};
  margin: 0 auto 16px;
  opacity: 0.4;
`;

const PillarText = styled.p`
  font-size: 15px;
  line-height: 1.65;
  opacity: 0.85;
  max-width: 34ch;
  margin-inline: auto;

  @media ${({ theme }) => theme.media.mdDown} {
    max-width: 48ch;
    font-size: 15px;
  }
`;

const pillars = [
  {
    n: 'I',
    title: <>Autenticidad <span className="it">ante todo</span></>,
    text: 'No construyo poses ni guiones. Me muevo en silencio entre los invitados y capturo lo que surge de forma espontánea: la emoción real, sin filtros ni artificios.',
  },
  {
    n: 'II',
    title: <>La <span className="it">luz</span> como lenguaje</>,
    text: 'Cada ventana, cada destello de atardecer y cada vela son pinceladas de la historia que cuento. Trabajo con la luz disponible para crear imágenes cálidas y cinematográficas.',
  },
  {
    n: 'III',
    title: <>Presencia <span className="it">discreta</span></>,
    text: 'Mi misión es que olvides que hay una cámara. Así, cuando veas las fotografías, volverás a vivir el día tal como fue: libre, espontáneo y lleno de amor.',
  },
];

export default function Philosophy() {
  return (
    <Section aria-labelledby="philosophy-title">
      <DecoTL src={DECO_TL} alt="" />
      <DecoBR src={DECO_BR} alt="" />

      <Container>
        <Header>
          <Eyebrow>Mi filosofía</Eyebrow>
          <Title id="philosophy-title">
            Lo que guía cada <span className="it">disparo</span>
          </Title>
        </Header>

        <Grid>
          {pillars.map((p) => (
            <Pillar key={p.n}>
              <Number aria-hidden="true">{p.n}</Number>
              <PillarTitle>{p.title}</PillarTitle>
              <Rule />
              <PillarText>{p.text}</PillarText>
            </Pillar>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
