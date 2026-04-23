'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import styled, { css } from 'styled-components';
import Container from '@/components/ui/Container';
import { sendContactFull } from '@/app/actions/sendContactFull';
import { initialFullState, type ContactFullState } from '@/app/actions/contactFullState';
import { pushEvent } from '@/lib/gtm';

/* ─────────────────────────────────────────────
   Layout
───────────────────────────────────────────── */
const Section = styled.section`
  position: relative;
  padding: 130px 0 120px;
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.black};
  overflow: visible;

  @media ${({ theme }) => theme.media.mdDown} {
    padding: 120px 0 80px;
  }
`;



const Grid = styled.div`
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: clamp(40px, 7vw, 100px);
  align-items: start;

  @media ${({ theme }) => theme.media.mdDown} {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

/* ─────────────────────────────────────────────
   Columna izquierda — Editorial copy
───────────────────────────────────────────── */
const EditorialCol = styled.div`
  position: sticky;
  top: 120px;

  @media ${({ theme }) => theme.media.mdDown} {
    position: static;
  }
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 12px;
  opacity: 0.6;
  margin-bottom: 18px;
`;

const Headline = styled.h1`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(32px, 4.5vw, 52px);
  line-height: 1.12;
  margin-bottom: 22px;

  .it { font-style: italic; }

  @media ${({ theme }) => theme.media.mdDown} {
    font-size: clamp(28px, 7vw, 40px);
  }
`;

const Lead = styled.p`
  font-size: 15px;
  line-height: 1.75;
  opacity: 0.82;
  max-width: 44ch;
  margin-bottom: 36px;
`;

const Rule = styled.div`
  width: 40px;
  height: 1px;
  background: ${({ theme }) => theme.colors.black};
  opacity: 0.3;
  margin-bottom: 28px;
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContactItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ContactLabel = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 11px;
  opacity: 0.5;
`;

const ContactValue = styled.a`
  font-size: 15px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  transition: opacity 0.15s ease;

  &:hover { opacity: 0.6; }
`;

const Note = styled.p`
  margin-top: 36px;
  font-size: 13px;
  font-style: italic;
  opacity: 0.5;
  max-width: 38ch;
  line-height: 1.6;
`;

/* ─────────────────────────────────────────────
   Columna derecha — Formulario
───────────────────────────────────────────── */
const FormCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: clamp(28px, 5vw, 56px);
`;

const FormTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(20px, 3vw, 28px);
  margin-bottom: 32px;
  letter-spacing: 0.01em;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 clamp(16px, 3vw, 32px);

  @media ${({ theme }) => theme.media.smDown} {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  margin-bottom: 28px;
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
  padding: 10px 0 12px;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 0;
  outline: none;
  font-family: ${({ theme }) => theme.fonts.base};
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

/* Honeypot — invisible para humanos, visible para bots */
const HoneypotField = styled.div`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
`;

const FormFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 14px 24px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
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

/* ─────────────────────────────────────────────
   Submit button con pending state
───────────────────────────────────────────── */
function Submit() {
  const { pending } = useFormStatus();
  return (
    <SubmitBtn type="submit" disabled={pending}>
      {pending ? 'Enviando…' : 'Enviar consulta'}
    </SubmitBtn>
  );
}

/* ─────────────────────────────────────────────
   Componente principal
───────────────────────────────────────────── */
export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState<ContactFullState, FormData>(
    sendContactFull,
    initialFullState
  );

  // Timestamp: se establece al montar el componente en el cliente.
  // El servidor verifica que hayan pasado ≥ 3s desde que se cargó el form.
  const [formTime] = useState(() => Date.now().toString());

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
      pushEvent({ event: 'form_submit', form_id: 'contacto' });
    }
  }, [state?.ok]);

  return (
    <Section id="contacto" aria-labelledby="contact-headline">
      

      <Container>
        <Grid>
          {/* ── Columna editorial ── */}
          <EditorialCol>
            <Eyebrow>Contacto</Eyebrow>
            <Headline id="contact-headline">
              Cuéntenos<br />sobre <span className="it">su boda</span>
            </Headline>
            <Lead>
              Estaré encantado de conocer su historia y conversar sobre el día
              más importante de su vida. Respondo en menos de 24 horas.
            </Lead>

            <Rule />

            <ContactList>
              <ContactItem>
                <ContactLabel>Email</ContactLabel>
                <ContactValue href="mailto:hola@luisbenitezphoto.com">
                  hola@luisbenitezphoto.com
                </ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>WhatsApp</ContactLabel>
                <ContactValue
                  href="https://wa.me/528112345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => pushEvent({ event: 'whatsapp_click', source: 'contacto' })}
                >
                  +52 (81) 1234-5678
                </ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Instagram</ContactLabel>
                <ContactValue
                  href="https://instagram.com/luisbenitezphoto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @luisbenitezphoto
                </ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Ubicación</ContactLabel>
                <ContactValue as="span">Monterrey, México — y el mundo</ContactValue>
              </ContactItem>
            </ContactList>

            <Note>
              Tomo un número limitado de bodas por año para garantizar
              atención personalizada a cada pareja.
            </Note>
          </EditorialCol>

          {/* ── Columna formulario ── */}
          <FormCard>
            {state?.ok ? (
              <SuccessBox>
                <h3>¡Gracias, ya recibí su mensaje!</h3>
                <p>
                  Les responderé en menos de 24 horas. Mientras tanto,
                  pueden explorar el portfolio en Instagram.
                </p>
              </SuccessBox>
            ) : (
              <form ref={formRef} action={formAction} noValidate>
                <FormTitle>Información de su boda</FormTitle>

                {/* ── Antispam: Honeypot ── */}
                <HoneypotField aria-hidden="true">
                  <label htmlFor="website">No llenar este campo</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </HoneypotField>

                {/* ── Antispam: Time threshold ── */}
                <input type="hidden" name="_t" value={formTime} />

                {/* Fila 1: Nombre + Teléfono */}
                <FieldRow>
                  <Field>
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Ana García"
                    />
                    {state?.errors?.name && <ErrorMsg>{state.errors.name}</ErrorMsg>}
                  </Field>
                  <Field>
                    <Label htmlFor="phone">WhatsApp / Teléfono *</Label>
                    <Input
                      id="phone"
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
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="ana@correo.com"
                  />
                  {state?.errors?.email && <ErrorMsg>{state.errors.email}</ErrorMsg>}
                </Field>

                {/* Fila 2: Fecha + Venue */}
                <FieldRow>
                  <Field>
                    <Label htmlFor="weddingDate">Fecha de la boda *</Label>
                    <Input
                      id="weddingDate"
                      name="weddingDate"
                      type="text"
                      placeholder="15 / nov / 2025"
                    />
                    {state?.errors?.weddingDate && <ErrorMsg>{state.errors.weddingDate}</ErrorMsg>}
                  </Field>
                  <Field>
                    <Label htmlFor="venue">Venue / Lugar</Label>
                    <Input
                      id="venue"
                      name="venue"
                      type="text"
                      placeholder="Hacienda San Pedro"
                    />
                  </Field>
                </FieldRow>

                {/* Servicio */}
                <Field>
                  <Label htmlFor="service">¿Qué servicio les interesa? *</Label>
                  <SelectWrap>
                    <Select id="service" name="service" defaultValue="">
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
                  <Label htmlFor="referral">¿Cómo nos encontraste?</Label>
                  <SelectWrap>
                    <Select id="referral" name="referral" defaultValue="">
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
                  <Label htmlFor="message">Mensaje (opcional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Cuéntanos un poco sobre su día ideal, estilo de boda o cualquier pregunta que tengan…"
                  />
                </Field>

                <FormFooter>
                  <Submit />
                  {state?.errors?.global && (
                    <GlobalError>{state.errors.global}</GlobalError>
                  )}
                  <Privacy>
                    Tu información es privada y nunca será compartida con terceros.
                  </Privacy>
                </FormFooter>
              </form>
            )}
          </FormCard>
        </Grid>
      </Container>
    </Section>
  );
}
