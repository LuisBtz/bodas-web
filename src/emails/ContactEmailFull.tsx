import * as React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Section,
  Row,
  Column,
} from '@react-email/components';

type Props = {
  name: string;
  email: string;
  phone: string;
  weddingDate: string;
  venue?: string;
  serviceLabel: string;
  referral?: string;
  message?: string;
};

const cell: React.CSSProperties = {
  padding: '8px 16px 8px 0',
  verticalAlign: 'top',
};

const label: React.CSSProperties = {
  fontWeight: 700,
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#666',
  whiteSpace: 'nowrap',
};

const value: React.CSSProperties = {
  fontSize: '15px',
  color: '#000',
};

export default function ContactEmailFull({
  name,
  email,
  phone,
  weddingDate,
  venue,
  serviceLabel,
  referral,
  message,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>Nueva consulta de boda de {name} — Luis Benítez Photography</Preview>
      <Body style={{ backgroundColor: '#FFF8F4', fontFamily: 'Georgia, serif', margin: 0 }}>
        <Container
          style={{
            maxWidth: '560px',
            margin: '32px auto',
            backgroundColor: '#ffffff',
            border: '1px solid #e6e0db',
          }}
        >
          {/* Header */}
          <Section style={{ backgroundColor: '#000', padding: '28px 32px' }}>
            <Heading
              as="h1"
              style={{
                color: '#fff',
                fontSize: '18px',
                fontWeight: 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Luis Benítez Photography
            </Heading>
            <Text style={{ color: '#aaa', fontSize: '12px', margin: '4px 0 0', letterSpacing: '0.12em' }}>
              NUEVA CONSULTA DE BODA
            </Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: '32px' }}>
            <Heading
              as="h2"
              style={{ fontSize: '22px', fontWeight: 400, margin: '0 0 24px', color: '#000' }}
            >
              {name} ha enviado una consulta
            </Heading>

            {/* Datos de contacto */}
            <Section style={{ marginBottom: '24px' }}>
              <Row>
                <Column style={cell}><Text style={label}>Email</Text></Column>
                <Column style={cell}><Text style={value}><a href={`mailto:${email}`} style={{ color: '#000' }}>{email}</a></Text></Column>
              </Row>
              <Row>
                <Column style={cell}><Text style={label}>WhatsApp / Tel</Text></Column>
                <Column style={cell}><Text style={value}>{phone}</Text></Column>
              </Row>
            </Section>

            <Hr style={{ borderColor: '#e6e0db', margin: '0 0 24px' }} />

            {/* Datos de la boda */}
            <Section style={{ marginBottom: '24px' }}>
              <Row>
                <Column style={cell}><Text style={label}>Fecha de boda</Text></Column>
                <Column style={cell}><Text style={value}>{weddingDate}</Text></Column>
              </Row>
              {venue && (
                <Row>
                  <Column style={cell}><Text style={label}>Venue / Lugar</Text></Column>
                  <Column style={cell}><Text style={value}>{venue}</Text></Column>
                </Row>
              )}
              <Row>
                <Column style={cell}><Text style={label}>Servicio</Text></Column>
                <Column style={cell}><Text style={value}>{serviceLabel}</Text></Column>
              </Row>
              {referral && (
                <Row>
                  <Column style={cell}><Text style={label}>¿Cómo nos encontró?</Text></Column>
                  <Column style={cell}><Text style={value}>{referral}</Text></Column>
                </Row>
              )}
            </Section>

            {/* Mensaje */}
            {message && (
              <>
                <Hr style={{ borderColor: '#e6e0db', margin: '0 0 24px' }} />
                <Text style={{ fontSize: '12px', ...label, marginBottom: '8px' }}>Mensaje</Text>
                <Text
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.7',
                    color: '#000',
                    whiteSpace: 'pre-wrap',
                    backgroundColor: '#FFF8F4',
                    padding: '16px',
                    borderLeft: '3px solid #000',
                  }}
                >
                  {message}
                </Text>
              </>
            )}
          </Section>

          {/* Footer */}
          <Section
            style={{
              backgroundColor: '#FFF8F4',
              padding: '16px 32px',
              borderTop: '1px solid #e6e0db',
            }}
          >
            <Text style={{ fontSize: '12px', color: '#888', margin: 0 }}>
              Responde directamente a este correo para contestar a {name} ({email})
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
