import * as React from 'react';
import { Html, Head, Preview, Body, Container, Heading, Text, Hr } from '@react-email/components';

type Props = {
  name: string;
  email: string;
  wedding: string;
  message: string;
};

export default function ContactEmail({ name, email, wedding, message }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Mensaje desde la web de {name}</Preview>
      <Body style={{ backgroundColor: '#ffffff', color: '#000', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ padding: '24px' }}>
          <Heading as="h2">Nuevo contacto desde la web</Heading>
          <Text><b>Nombre:</b> {name}</Text>
          <Text><b>Email:</b> {email}</Text>
          <Text><b>Boda:</b> {wedding}</Text>
          <Hr />
          <Text style={{ whiteSpace: 'pre-wrap' }}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}
