'use client';

import styled, { css } from 'styled-components';
import Container from '@/components/ui/Container';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { sendContactFull } from '@/app/actions/sendContactFull';
import { initialFullState, type ContactFullState } from '@/app/actions/contactFullState';
import { pushEvent } from '@/lib/gtm';

/* ---------- Layout ---------- */
const Section = styled.section`
  position: relative;
  padding: 96px 0 120px;
  background: ${({ theme }) => theme.colors.bg};
  overflow: visible;
`;

const Deco = styled.img<{ $side: 'left' | 'right' }>`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  user-select: none;
  width: 160px;
  opacity: 0.9;

  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => ($side === 'left' ? 'left:3%;' : 'right:3%;')}

  @media ${({ theme }) => theme.media.mdDown} {
    display: none;
  }
`;

const Wrap = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  line-height: ${({ theme }) => theme.lineHeights.h2};
  margin-bottom: 12px;

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: 36px;
    line-height: 1.1;
  }
`;

const Intro = styled.p`
  max-width: 780px;
  margin: 0 auto 36px;
  font-size: 20px;
  line-height: 1.5;

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: 18px;
    margin-bottom: 28px;
  }
`;

/* ---------- Form ---------- */
const FormWrap = styled.form`
  max-width: 620px;
  margin: 0 auto;
  text-align: left;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 clamp(16px, 3vw, 32px);

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  margin-bottom: 26px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.65;
`;

const inputBase = css`
  width: 100%;
  padding: 10px 0 12px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  outline: none;
  font-size: 17px;
  color: ${({ theme }) => theme.colors.black};
  transition: border-color 0.2s ease;

  &::placeholder { opacity: 0.3; }
  &:focus { border-bottom-color: ${({ theme }) => theme.colors.red}; }
`;

const Input = styled.input`${inputBase}`;
const Textarea = styled.textarea`
  ${inputBase}
  min-height: 110px;
  resize: vertical;
`;

const SelectWrap = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    width: 7px;
    height: 7px;
    border-right: 1.5px solid ${({ theme }) => theme.colors.black};
    border-bottom: 1.5px solid ${({ theme }) => theme.colors.black};
    pointer-events: none;
    opacity: 0.5;
  }
`;

const Select = styled.select`
  ${inputBase}
  appearance: none;
  cursor: pointer;
  padding-right: 24px;
`;

const ErrorMsg = styled.p`
  margin-top: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.red};
`;

/* Honeypot */
const HoneypotField = styled.div`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
`;

const Actions = styled.div`
  display: grid;
  place-items: center;
  margin-top: 28px;
  gap: 12px;
`;

const Button = styled.button`
  appearance: none;
  padding: 14px 48px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.08s ease;

  &:hover:not(:disabled) {
    background: transparent;
    color: ${({ theme }) => theme.colors.black};
  }
  &:active { transform: translateY(1px); }
  &:disabled { opacity: 0.45; cursor: default; }
`;

const GlobalError = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.red};
  text-align: center;
`;

const SuccessBox = styled.div`
  text-align: center;
  padding: 48px 24px;

  h3 {
    font-family: ${({ theme }) => theme.fonts.base};
    font-weight: 400;
    font-size: clamp(22px, 3.5vw, 32px);
    margin-bottom: 14px;
  }

  p {
    font-size: 15px;
    opacity: 0.75;
    line-height: 1.7;
    max-width: 42ch;
    margin-inline: auto;
  }
`;

const Privacy = styled.p`
  font-size: 12px;
  opacity: 0.4;
  text-align: center;
  max-width: 50ch;
`;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Enviando…' : 'Enviar consulta'}
    </Button>
  );
}

/* ---------- Componente ---------- */
export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState<ContactFullState, FormData>(
    sendContactFull,
    initialFullState
  );
  const [formTime] = useState(() => Date.now().toString());

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
      pushEvent({ event: 'form_submit', form_id: 'home' });
    }
  }, [state?.ok]);

  return (
    <Section id="contacto">
      <Deco src="/decor-left5.svg" alt="" $side="left" />
      <Deco src="/decor6-right.svg" alt="" $side="right" />

      <Container>
        <Wrap>
          <Heading>Trabajemos juntos</Heading>
          <Intro>
            Estamos aquí, listos para darlo todo y contar la historia de su amor, por todo Monterrey y el mundo.
            ¡Contáctanos! ¡Nos encantaría conversar sobre el día de su boda!
          </Intro>

          {state?.ok ? (
            <SuccessBox>
              <h3>¡Gracias, ya recibí su mensaje!</h3>
              <p>
                Les responderé en menos de 24 horas. Mientras tanto,
                pueden explorar el portfolio en Instagram.
              </p>
            </SuccessBox>
          ) : (
            <FormWrap ref={formRef} action={formAction} noValidate>
              {/* Antispam: Honeypot */}
              <HoneypotField aria-hidden="true">
                <label htmlFor="hs-website">No llenar este campo</label>
                <input
                  type="text"
                  id="hs-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </HoneypotField>
              <input type="hidden" name="_t" value={formTime} />

              {/* Nombre + Teléfono */}
              <FieldRow>
                <Field>
                  <Label htmlFor="cs-name">Nombre completo *</Label>
                  <Input
                    id="cs-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Ana García"
                  />
                  {state?.errors?.name && <ErrorMsg>{state.errors.name}</ErrorMsg>}
                </Field>
                <Field>
                  <Label htmlFor="cs-phone">WhatsApp / Teléfono *</Label>
                  <Input
                    id="cs-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+52 81 1234 5678"
                  />
                  {state?.errors?.phone && <ErrorMsg>{state.errors.phone}</ErrorMsg>}
                </Field>
              </FieldRow>

              {/* Email */}
              <Field>
                <Label htmlFor="cs-email">Correo electrónico *</Label>
                <Input
                  id="cs-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="ana@correo.com"
                />
                {state?.errors?.email && <ErrorMsg>{state.errors.email}</ErrorMsg>}
              </Field>

              {/* Fecha + Venue */}
              <FieldRow>
                <Field>
                  <Label htmlFor="cs-weddingDate">Fecha de la boda *</Label>
                  <Input
                    id="cs-weddingDate"
                    name="weddingDate"
                    type="text"
                    placeholder="15 / nov / 2025"
                  />
                  {state?.errors?.weddingDate && <ErrorMsg>{state.errors.weddingDate}</ErrorMsg>}
                </Field>
                <Field>
                  <Label htmlFor="cs-venue">Venue / Lugar</Label>
                  <Input
                    id="cs-venue"
                    name="venue"
                    type="text"
                    placeholder="Hacienda San Pedro"
                  />
                </Field>
              </FieldRow>

              {/* Servicio */}
              <Field>
                <Label htmlFor="cs-service">¿Qué servicio les interesa? *</Label>
                <SelectWrap>
                  <Select id="cs-service" name="service" defaultValue="">
                    <option value="" disabled>Seleccionar…</option>
                    <option value="fotografia">Solo fotografía</option>
                    <option value="video">Solo video</option>
                    <option value="ambos">Fotografía + Video</option>
                  </Select>
                </SelectWrap>
                {state?.errors?.service && <ErrorMsg>{state.errors.service}</ErrorMsg>}
              </Field>

              {/* ¿Cómo nos encontraste? */}
              <Field>
                <Label htmlFor="cs-referral">¿Cómo nos encontraste?</Label>
                <SelectWrap>
                  <Select id="cs-referral" name="referral" defaultValue="">
                    <option value="" disabled>Seleccionar…</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Google">Google</option>
                    <option value="Recomendación de pareja">Recomendación de otra pareja</option>
                    <option value="Recomendación de proveedor">Recomendación de proveedor</option>
                    <option value="Otro">Otro</option>
                  </Select>
                </SelectWrap>
              </Field>

              {/* Mensaje */}
              <Field>
                <Label htmlFor="cs-message">Mensaje (opcional)</Label>
                <Textarea
                  id="cs-message"
                  name="message"
                  placeholder="Cuéntanos un poco sobre su día ideal, estilo de boda o cualquier pregunta que tengan…"
                />
              </Field>

              <Actions>
                <SubmitButton />
                {state?.errors?.global && <GlobalError>{state.errors.global}</GlobalError>}
                <Privacy>Tu información es privada y nunca será compartida con terceros.</Privacy>
              </Actions>
            </FormWrap>
          )}
        </Wrap>
      </Container>
    </Section>
  );
}
