'use client';

import styled, { css } from 'styled-components';
import Container from '@/components/ui/Container';
import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { sendContact } from '@/app/actions/sendContact';
import { initialState, type ContactState } from '@/app/actions/contactState';

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

const Row = styled.div`
  margin-bottom: 26px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 12px;
  font-size: 18px;
`;

const InputBase = css`
  width: 100%;
  padding: 10px 0 12px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  outline: none;
  font-size: 18px;

  &::placeholder { opacity: .5; }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.red};
  }
`;

const Input = styled.input`${InputBase}`;
const Textarea = styled.textarea`
  ${InputBase}
  min-height: 140px;
  resize: vertical;
`;

const Error = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.red};
`;

const Actions = styled.div`
  display: grid;
  place-items: center;
  margin-top: 28px;
`;

const Button = styled.button`
  appearance: none;
  padding: 12px 42px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background: transparent;
  text-transform: uppercase;
  cursor: pointer;
  transition: background .2s ease, color .2s ease, transform .08s ease;
  letter-spacing: .02em;

  &:hover { background: ${({ theme }) => theme.colors.black}; color: ${({ theme }) => theme.colors.white}; }
  &:active { transform: translateY(1px); }
  &:disabled { opacity: .5; cursor: default; }
`;

const Success = styled.p`
  margin-top: 16px;
  text-align: center;
  color: green;
`;

const GlobalError = styled.p`
  margin-top: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.red};
`;

/* Botón que usa el estado “pending” de Server Actions */
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Enviando…' : 'Enviar'}
    </Button>
  );
}

/* ---------- Componente ---------- */
export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState<ContactState, FormData>(sendContact, initialState);

  // Limpia el formulario si ok === true
  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
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

          <FormWrap ref={formRef} action={formAction} noValidate>
            <Row>
              <Label htmlFor="name">Tu nombre</Label>
              <Input id="name" name="name" autoComplete="name" />
              {state?.errors?.name && <Error>{state.errors.name}</Error>}
            </Row>

            <Row>
              <Label htmlFor="email">Tu mail</Label>
              <Input id="email" name="email" type="email" autoComplete="email" />
              {state?.errors?.email && <Error>{state.errors.email}</Error>}
            </Row>

            <Row>
              <Label htmlFor="wedding">Fecha de la boda y lugar</Label>
              <Input id="wedding" name="wedding" placeholder="dd/mm/aaaa · ciudad/venue" />
              {state?.errors?.wedding && <Error>{state.errors.wedding}</Error>}
            </Row>

            <Row>
              <Label htmlFor="message">Tu mensaje</Label>
              <Textarea id="message" name="message" />
              {state?.errors?.message && <Error>{state.errors.message}</Error>}
            </Row>

            <Actions>
              <SubmitButton />
              {state?.errors?.global && <GlobalError>{state.errors.global}</GlobalError>}
              {state?.ok && <Success>¡Gracias! Te responderé muy pronto.</Success>}
            </Actions>
          </FormWrap>
        </Wrap>
      </Container>
    </Section>
  );
}
