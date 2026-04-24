'use client';

import styled from 'styled-components';
import Container from '@/components/ui/Container';
import { pushEvent } from '@/lib/gtm';

const Section = styled.footer`
  background: ${({ theme }) => theme.colors.bg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: clamp(40px, 6vw, 56px) 0 clamp(32px, 4vw, 40px);
  color: ${({ theme }) => theme.colors.black};
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.24em;
  font-size: 11px;
  opacity: 0.55;
`;

const ContactList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px clamp(20px, 4vw, 36px);

  a {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.black};
    transition: color 0.2s ease;
    letter-spacing: 0.02em;

    &:hover { color: ${({ theme }) => theme.colors.red}; }
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.red};
      outline-offset: 4px;
    }
  }
`;

const Legal = styled.p`
  font-size: 12px;
  opacity: 0.45;
  margin-top: 8px;
`;

export default function MinimalFooter() {
  const year = new Date().getFullYear();

  return (
    <Section>
      <Container>
        <Inner>
          <Eyebrow>Contacto</Eyebrow>
          <ContactList>
            <li>
              <a href="mailto:contacto@luisbtz.com">contacto@luisbtz.com</a>
            </li>
            <li>
              <a
                href="https://wa.me/5218112498874?text=Hola%20Luis%2C%20te%20contacto%20desde%20tu%20p%C3%A1gina%20web%20%F0%9F%91%8B"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushEvent({ event: 'whatsapp_click', source: 'la-experiencia' })}
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/luisbenitezphotography/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61578594767267"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
          </ContactList>
          <Legal>© {year} Luis Benítez Photography</Legal>
        </Inner>
      </Container>
    </Section>
  );
}
