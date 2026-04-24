import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

type Props = {
  name: string;
};

const COLOR_CREAM = '#FFF8F4';
const COLOR_INK = '#1a1a1a';
const COLOR_MUTED = '#6b6b6b';
const COLOR_RED = '#930707';
const COLOR_BORDER = '#e6e0db';

const CALENDLY_URL = 'https://calendly.com/luisbttf/20-minute-meeting-clone';

export default function BrochureClientEmail({ name }: Props) {
  const firstName = name.split(' ')[0] || name;

  return (
    <Html>
      <Head />
      <Preview>Aquí está tu guía — Luis Benítez Photography</Preview>
      <Body
        style={{
          backgroundColor: COLOR_CREAM,
          fontFamily: "Georgia, 'Times New Roman', Times, serif",
          margin: 0,
          padding: '32px 16px',
        }}
      >
        <Container
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            border: `1px solid ${COLOR_BORDER}`,
          }}
        >
          {/* Header */}
          <Section
            style={{
              padding: '40px 40px 28px',
              borderBottom: `1px solid ${COLOR_BORDER}`,
              textAlign: 'center',
            }}
          >
            <Text
              style={{
                fontSize: '10px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: COLOR_MUTED,
                margin: '0 0 10px',
              }}
            >
              Luis Benítez
            </Text>
            <Heading
              as="h1"
              style={{
                fontFamily: "Georgia, 'Times New Roman', Times, serif",
                fontWeight: 400,
                fontSize: '26px',
                letterSpacing: '0.02em',
                color: COLOR_INK,
                margin: 0,
              }}
            >
              Photography
            </Heading>
          </Section>

          {/* Cuerpo */}
          <Section style={{ padding: '40px 40px 8px' }}>
            <Heading
              as="h2"
              style={{
                fontFamily: "Georgia, 'Times New Roman', Times, serif",
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: 1.3,
                color: COLOR_INK,
                margin: '0 0 20px',
              }}
            >
              Hola {firstName},
            </Heading>

            <Text
              style={{
                fontSize: '16px',
                lineHeight: 1.75,
                color: COLOR_INK,
                margin: '0 0 18px',
              }}
            >
              Gracias por tu interés en documentar tu boda conmigo. Como prometí,
              encontrarás adjunta la guía completa con paquetes, proceso y todo lo
              que incluye cada colaboración.
            </Text>

            <Text
              style={{
                fontSize: '16px',
                lineHeight: 1.75,
                color: COLOR_INK,
                margin: '0 0 28px',
              }}
            >
              Si después de revisarla quieres conversar, el siguiente paso es una
              videollamada de 20 minutos donde nos conocemos y revisamos
              disponibilidad para tu fecha.
            </Text>

            {/* CTA */}
            <Section style={{ textAlign: 'center', margin: '0 0 12px' }}>
              <Button
                href={CALENDLY_URL}
                style={{
                  backgroundColor: COLOR_INK,
                  color: '#ffffff',
                  padding: '14px 28px',
                  fontSize: '12px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Agendar videollamada
              </Button>
            </Section>
          </Section>

          {/* Separador decorativo */}
          <Section style={{ padding: '16px 40px 8px', textAlign: 'center' }}>
            <Hr
              style={{
                borderColor: COLOR_BORDER,
                width: '40px',
                margin: '16px auto',
              }}
            />
          </Section>

          {/* Firma */}
          <Section style={{ padding: '0 40px 36px' }}>
            <Text
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: COLOR_INK,
                margin: '0 0 8px',
                fontStyle: 'italic',
              }}
            >
              Con cariño,
            </Text>
            <Text
              style={{
                fontSize: '17px',
                fontWeight: 400,
                color: COLOR_INK,
                margin: '0 0 24px',
              }}
            >
              Luis Benítez
            </Text>

            <Text
              style={{
                fontSize: '13px',
                lineHeight: 1.9,
                color: COLOR_MUTED,
                margin: 0,
              }}
            >
              WhatsApp:{' '}
              <Link
                href="https://wa.me/5218112498874"
                style={{ color: COLOR_RED, textDecoration: 'none' }}
              >
                +52 811 249 8874
              </Link>
              <br />
              Instagram:{' '}
              <Link
                href="https://instagram.com/luisbenitezphotography"
                style={{ color: COLOR_RED, textDecoration: 'none' }}
              >
                @luisbenitezphotography
              </Link>
              <br />
              <Link
                href="https://photography.luisbtz.com"
                style={{ color: COLOR_RED, textDecoration: 'none' }}
              >
                photography.luisbtz.com
              </Link>
            </Text>
          </Section>

          {/* Footer legal */}
          <Section
            style={{
              backgroundColor: COLOR_CREAM,
              padding: '16px 40px',
              borderTop: `1px solid ${COLOR_BORDER}`,
            }}
          >
            <Text
              style={{
                fontSize: '11px',
                lineHeight: 1.6,
                color: COLOR_MUTED,
                margin: 0,
                textAlign: 'center',
              }}
            >
              Recibes este correo porque solicitaste la guía en
              photography.luisbtz.com. Tu información es privada y nunca será
              compartida con terceros.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
