'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import styled, { css } from 'styled-components';
import Container from '@/components/ui/Container';
import { sendBrochure } from '@/app/actions/sendBrochure';
import { initialBrochureState, type BrochureState } from '@/app/actions/brochureState';
import { pushEvent } from '@/lib/gtm';
import { sendCapiEvent } from '@/lib/meta-capi';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
type UtmKey = (typeof UTM_KEYS)[number];
const UTM_STORAGE_KEY = 'lbp:utm';

/* ─────────────────────────────────────────────
   Layout
───────────────────────────────────────────── */
const Section = styled.section`
  padding: clamp(72px, 10vw, 120px) 0;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;

const Header = styled.header`
  text-align: center;
  max-width: 560px;
  margin: 0 auto clamp(40px, 5vw, 56px);
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.24em;
  font-size: 11px;
  opacity: 0.55;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 400;
  font-size: clamp(30px, 4.5vw, 48px);
  line-height: 1.15;
  margin-bottom: 16px;

  .it { font-style: italic; }
`;

const Subtitle = styled.p`
  font-size: 15px;
  line-height: 1.7;
  opacity: 0.75;
`;

const FormCard = styled.div`
  background: ${({ theme }) => theme.colors.cream};
  padding: clamp(28px, 5vw, 56px);
  max-width: 620px;
  margin: 0 auto;
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
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  opacity: 0.7;
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
  &:focus-visible { outline: none; }
`;

const Input = styled.input`${inputBase}`;

const ErrorMsg = styled.p`
  margin-top: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.red};
`;

const ConsentField = styled.label`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  cursor: pointer;
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.85;

  input[type='checkbox'] {
    margin-top: 4px;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    accent-color: ${({ theme }) => theme.colors.red};
    cursor: pointer;
  }
`;

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
  gap: 14px;
  margin-top: 8px;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.2s ease, color 0.2s ease, transform 0.08s ease;

  &:hover:not(:disabled) {
    background: transparent;
    color: ${({ theme }) => theme.colors.black};
  }
  &:active { transform: translateY(1px); }
  &:disabled { opacity: 0.55; cursor: default; }
`;

const Spinner = styled.span`
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const GlobalError = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.red};
  text-align: center;
`;

const Privacy = styled.p`
  font-size: 12px;
  opacity: 0.5;
  text-align: center;
  max-width: 50ch;
`;

/* ─────────────────────────────────────────────
   Submit con pending state
───────────────────────────────────────────── */
function Submit() {
  const { pending } = useFormStatus();
  return (
    <SubmitBtn type="submit" disabled={pending} aria-busy={pending}>
      {pending && <Spinner aria-hidden="true" />}
      {pending ? 'Enviando…' : 'Enviar la guía a mi correo'}
    </SubmitBtn>
  );
}

/* ─────────────────────────────────────────────
   Componente principal
───────────────────────────────────────────── */
export default function BrochureForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef('');
  const phoneRef = useRef('');
  const nameRef = useRef('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const [state, formAction] = useActionState<BrochureState, FormData>(
    sendBrochure,
    initialBrochureState
  );

  const [formTime] = useState(() => Date.now().toString());
  const [utm, setUtm] = useState<Record<UtmKey, string>>(() =>
    Object.fromEntries(UTM_KEYS.map((k) => [k, ''])) as Record<UtmKey, string>
  );

  /* Capturar UTMs: primero del query, si no, de sessionStorage. Persistir. */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fromQuery: Record<UtmKey, string> = Object.fromEntries(
      UTM_KEYS.map((k) => [k, searchParams?.get(k) ?? ''])
    ) as Record<UtmKey, string>;

    const hasQueryUtm = Object.values(fromQuery).some(Boolean);

    if (hasQueryUtm) {
      try {
        sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromQuery));
      } catch {}
      setUtm(fromQuery);
      return;
    }

    try {
      const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<Record<UtmKey, string>>;
        setUtm(
          Object.fromEntries(
            UTM_KEYS.map((k) => [k, parsed[k] ?? ''])
          ) as Record<UtmKey, string>
        );
      }
    } catch {}
  }, [searchParams]);

  /* En éxito: disparar evento, resetear y navegar a página de gracias. */
  useEffect(() => {
    if (!state?.ok) return;

    const fd = new FormData(formRef.current ?? undefined);
    const weddingDate = String(fd.get('weddingDate') ?? '') || null;
    const venue = String(fd.get('venue') ?? '') || null;

    const metaEventId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    pushEvent({
      event: 'brochure_request',
      form_location: 'la-experiencia',
      wedding_date: weddingDate,
      venue,
      meta_event_id: metaEventId,
    });

    formRef.current?.reset();

    // Esperar CAPI antes de navegar para que el fetch no se cancele
    sendCapiEvent({
      event_name: 'Lead',
      event_id: metaEventId,
      email: emailRef.current,
      phone: phoneRef.current,
      name: nameRef.current,
    }).finally(() => {
      router.push('/la-experiencia/gracias');
    });
  }, [state?.ok, router]);

  return (
    <Section id="solicitar-guia" aria-labelledby="brochure-form-title">
      <Container>
        <Header>
          <Eyebrow>Formulario</Eyebrow>
          <Title id="brochure-form-title">
            Recibe <span className="it">la guía</span>
          </Title>
          <Subtitle>La enviaré a tu correo en los próximos minutos.</Subtitle>
        </Header>

        <FormCard>
          <form ref={formRef} action={formAction} noValidate>
            {/* Honeypot */}
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

            {/* Time threshold */}
            <input type="hidden" name="_t" value={formTime} />

            {/* UTMs ocultos */}
            {UTM_KEYS.map((k) => (
              <input key={k} type="hidden" name={k} value={utm[k]} />
            ))}

            {/* Nombre + Email */}
            <FieldRow>
              <Field>
                <Label htmlFor="name">Nombre completo *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ana García"
                  required
                  aria-invalid={state?.errors?.name ? true : undefined}
                  aria-describedby={state?.errors?.name ? 'name-error' : undefined}
                  onChange={(e) => { nameRef.current = e.target.value; }}
                />
                {state?.errors?.name && (
                  <ErrorMsg id="name-error">{state.errors.name}</ErrorMsg>
                )}
              </Field>
              <Field>
                <Label htmlFor="email">Correo electrónico *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="ana@correo.com"
                  required
                  aria-invalid={state?.errors?.email ? true : undefined}
                  aria-describedby={state?.errors?.email ? 'email-error' : undefined}
                  onChange={(e) => { emailRef.current = e.target.value; }}
                />
                {state?.errors?.email && (
                  <ErrorMsg id="email-error">{state.errors.email}</ErrorMsg>
                )}
              </Field>
            </FieldRow>

            {/* WhatsApp */}
            <Field>
              <Label htmlFor="phone">WhatsApp / Teléfono *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+52 81 1234 5678"
                required
                aria-invalid={state?.errors?.phone ? true : undefined}
                aria-describedby={state?.errors?.phone ? 'phone-error' : undefined}
                onChange={(e) => { phoneRef.current = e.target.value; }}
              />
              {state?.errors?.phone && (
                <ErrorMsg id="phone-error">{state.errors.phone}</ErrorMsg>
              )}
            </Field>

            {/* Fecha + Venue */}
            <FieldRow>
              <Field>
                <Label htmlFor="weddingDate">Fecha tentativa de la boda</Label>
                <Input
                  id="weddingDate"
                  name="weddingDate"
                  type="date"
                  aria-invalid={state?.errors?.weddingDate ? true : undefined}
                />
                {state?.errors?.weddingDate && (
                  <ErrorMsg>{state.errors.weddingDate}</ErrorMsg>
                )}
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

            {/* Consent */}
            <ConsentField htmlFor="consent">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                required
                aria-invalid={state?.errors?.consent ? true : undefined}
              />
              <span>Acepto recibir información sobre los servicios.</span>
            </ConsentField>
            {state?.errors?.consent && <ErrorMsg>{state.errors.consent}</ErrorMsg>}

            <FormFooter>
              <Submit />
              {state?.errors?.global && <GlobalError>{state.errors.global}</GlobalError>}
              <Privacy>Tu información es privada y nunca será compartida.</Privacy>
            </FormFooter>
          </form>
        </FormCard>
      </Container>
    </Section>
  );
}
