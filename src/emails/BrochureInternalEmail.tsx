import * as React from 'react';
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

type Props = {
  name: string;
  email: string;
  phone: string;
  weddingDate?: string;
  venue?: string;
  utm?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  };
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
  margin: 0,
};

const value: React.CSSProperties = {
  fontSize: '15px',
  color: '#000',
  margin: 0,
};

export default function BrochureInternalEmail({
  name,
  email,
  phone,
  weddingDate,
  venue,
  utm,
}: Props) {
  const hasUtm =
    utm &&
    (utm.utm_source ||
      utm.utm_medium ||
      utm.utm_campaign ||
      utm.utm_content ||
      utm.utm_term);

  const whatsappHref = `https://wa.me/${phone.replace(/[^\d]/g, '')}`;

  return (
    <Html>
      <Head />
      <Preview>Nuevo lead brochure de {name}</Preview>
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
          <Section style={{ backgroundColor: '#000', padding: '24px 32px' }}>
            <Heading
              as="h1"
              style={{
                color: '#fff',
                fontSize: '16px',
                fontWeight: 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Luis Benítez Photography
            </Heading>
            <Text
              style={{
                color: '#aaa',
                fontSize: '11px',
                margin: '4px 0 0',
                letterSpacing: '0.12em',
              }}
            >
              NUEVO LEAD — BROCHURE
            </Text>
          </Section>

          {/* Cuerpo */}
          <Section style={{ padding: '32px' }}>
            <Heading
              as="h2"
              style={{ fontSize: '22px', fontWeight: 400, margin: '0 0 24px', color: '#000' }}
            >
              {name} solicitó la guía
            </Heading>

            <Section style={{ marginBottom: '20px' }}>
              <Row>
                <Column style={cell}>
                  <Text style={label}>Email</Text>
                </Column>
                <Column style={cell}>
                  <Text style={value}>
                    <a href={`mailto:${email}`} style={{ color: '#000' }}>
                      {email}
                    </a>
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column style={cell}>
                  <Text style={label}>WhatsApp</Text>
                </Column>
                <Column style={cell}>
                  <Text style={value}>
                    <a href={whatsappHref} style={{ color: '#000' }}>
                      {phone}
                    </a>
                  </Text>
                </Column>
              </Row>
            </Section>

            {(weddingDate || venue) && (
              <>
                <Hr style={{ borderColor: '#e6e0db', margin: '0 0 20px' }} />
                <Section style={{ marginBottom: '20px' }}>
                  {weddingDate && (
                    <Row>
                      <Column style={cell}>
                        <Text style={label}>Fecha tentativa</Text>
                      </Column>
                      <Column style={cell}>
                        <Text style={value}>{weddingDate}</Text>
                      </Column>
                    </Row>
                  )}
                  {venue && (
                    <Row>
                      <Column style={cell}>
                        <Text style={label}>Venue / Lugar</Text>
                      </Column>
                      <Column style={cell}>
                        <Text style={value}>{venue}</Text>
                      </Column>
                    </Row>
                  )}
                </Section>
              </>
            )}

            {hasUtm && (
              <>
                <Hr style={{ borderColor: '#e6e0db', margin: '0 0 20px' }} />
                <Text style={{ ...label, marginBottom: '10px' }}>Campaña (UTM)</Text>
                <Section>
                  {utm?.utm_source && (
                    <Row>
                      <Column style={cell}>
                        <Text style={label}>Source</Text>
                      </Column>
                      <Column style={cell}>
                        <Text style={value}>{utm.utm_source}</Text>
                      </Column>
                    </Row>
                  )}
                  {utm?.utm_medium && (
                    <Row>
                      <Column style={cell}>
                        <Text style={label}>Medium</Text>
                      </Column>
                      <Column style={cell}>
                        <Text style={value}>{utm.utm_medium}</Text>
                      </Column>
                    </Row>
                  )}
                  {utm?.utm_campaign && (
                    <Row>
                      <Column style={cell}>
                        <Text style={label}>Campaign</Text>
                      </Column>
                      <Column style={cell}>
                        <Text style={value}>{utm.utm_campaign}</Text>
                      </Column>
                    </Row>
                  )}
                  {utm?.utm_content && (
                    <Row>
                      <Column style={cell}>
                        <Text style={label}>Content</Text>
                      </Column>
                      <Column style={cell}>
                        <Text style={value}>{utm.utm_content}</Text>
                      </Column>
                    </Row>
                  )}
                  {utm?.utm_term && (
                    <Row>
                      <Column style={cell}>
                        <Text style={label}>Term</Text>
                      </Column>
                      <Column style={cell}>
                        <Text style={value}>{utm.utm_term}</Text>
                      </Column>
                    </Row>
                  )}
                </Section>
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
              Responde a este correo para contestar a {name} ({email}). Ya recibió
              la guía automáticamente.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
