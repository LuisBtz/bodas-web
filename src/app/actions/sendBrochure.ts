'use server';

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Resend } from 'resend';
import { z } from 'zod';
import BrochureClientEmail from '@/emails/BrochureClientEmail';
import BrochureInternalEmail from '@/emails/BrochureInternalEmail';
import type { BrochureState } from './brochureState';

const BROCHURE_FILENAME = 'luis-benitez-brochure-2026-2027.pdf';
const BROCHURE_PATH = path.join(process.cwd(), 'public', 'brochure', BROCHURE_FILENAME);

/* ─── Rate limit en memoria (por instancia) ──────────────────────────────
   3 envíos por email en 10 minutos. Es "best-effort" en serverless —
   suficiente para bloquear loops de un cliente concreto en una sesión.   */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;
const rateBuckets = new Map<string, number[]>();

function hitRateLimit(key: string) {
  const now = Date.now();
  const hits = (rateBuckets.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  rateBuckets.set(key, hits);
  return hits.length > RATE_MAX;
}

const schema = z.object({
  name: z.string().min(2, 'Por favor ingresa tu nombre completo.'),
  email: z.string().email('Ingresa un correo electrónico válido.'),
  phone: z
    .string()
    .min(8, 'Ingresa un número de WhatsApp o teléfono.')
    .regex(/^[+\d\s()-]{8,}$/, 'Formato de teléfono no válido.'),
  weddingDate: z.string().optional(),
  venue: z.string().optional(),
  consent: z.literal('on', { message: 'Debes aceptar para recibir la guía.' }),
  // UTMs (opcionales)
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
});

export async function sendBrochure(
  _prev: BrochureState,
  formData: FormData
): Promise<BrochureState> {
  // ─── Antispam 1: Honeypot ──────────────────────────────────────────────
  const honeypot = String(formData.get('website') ?? '');
  if (honeypot.length > 0) return { ok: true };

  // ─── Antispam 2: Time-threshold ────────────────────────────────────────
  const formTime = Number(formData.get('_t') ?? 0);
  if (formTime > 0 && Date.now() - formTime < 3000) return { ok: true };

  // ─── Validación de entorno ─────────────────────────────────────────────
  if (!process.env.RESEND_API_KEY) {
    console.error('[sendBrochure] Falta RESEND_API_KEY');
    return { ok: false, errors: { global: 'Error de configuración. Escríbenos directamente.' } };
  }

  // ─── Parse ─────────────────────────────────────────────────────────────
  const raw = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim().toLowerCase(),
    phone: String(formData.get('phone') ?? '').trim(),
    weddingDate: String(formData.get('weddingDate') ?? '').trim(),
    venue: String(formData.get('venue') ?? '').trim(),
    consent: String(formData.get('consent') ?? ''),
    utm_source: String(formData.get('utm_source') ?? '').trim(),
    utm_medium: String(formData.get('utm_medium') ?? '').trim(),
    utm_campaign: String(formData.get('utm_campaign') ?? '').trim(),
    utm_content: String(formData.get('utm_content') ?? '').trim(),
    utm_term: String(formData.get('utm_term') ?? '').trim(),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: BrochureState['errors'] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<BrochureState['errors']>;
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, errors };
  }

  const { name, email, phone, weddingDate, venue, ...utms } = parsed.data;

  // ─── Rate limit ────────────────────────────────────────────────────────
  if (hitRateLimit(email)) {
    console.warn('[sendBrochure] Rate limit para', email);
    return { ok: false, errors: { global: 'Hemos recibido varias solicitudes desde tu correo. Intenta de nuevo más tarde.' } };
  }

  // ─── Cargar PDF del brochure ───────────────────────────────────────────
  let pdfBuffer: Buffer;
  try {
    pdfBuffer = await fs.readFile(BROCHURE_PATH);
  } catch (err) {
    console.error('[sendBrochure] No se pudo leer el PDF:', err);
    return { ok: false, errors: { global: 'No pudimos adjuntar la guía. Escríbenos directamente.' } };
  }

  // ─── Envío con Resend ──────────────────────────────────────────────────
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.MAIL_FROM ?? 'Contacto <onboarding@resend.dev>';
  const internalTo = (process.env.MAIL_TO ?? 'contacto@luisbtz.com')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const replyTo = 'contacto@luisbtz.com';

  try {
    // 1) Correo al cliente con el brochure adjunto
    const clientSend = await resend.emails.send({
      from,
      to: email,
      subject: 'Tu guía de Luis Benítez Photography ✨',
      replyTo,
      react: BrochureClientEmail({ name }),
      attachments: [
        {
          filename: BROCHURE_FILENAME,
          content: pdfBuffer,
        },
      ],
    });

    if (clientSend.error) {
      console.error('[sendBrochure] Resend error (cliente):', clientSend.error);
      return { ok: false, errors: { global: 'No pudimos enviar la guía. Intenta de nuevo.' } };
    }

    // 2) Notificación interna para seguimiento
    const internalSend = await resend.emails.send({
      from,
      to: internalTo,
      subject: `Nuevo lead brochure — ${name}`,
      replyTo: email,
      react: BrochureInternalEmail({
        name,
        email,
        phone,
        weddingDate,
        venue,
        utm: utms,
      }),
    });

    if (internalSend.error) {
      // No bloqueamos al cliente si falla la notificación interna
      console.error('[sendBrochure] Resend error (interno):', internalSend.error);
    }

    console.log('[sendBrochure] Enviado OK → cliente:', email, '| lead:', name);
    return { ok: true };
  } catch (err) {
    console.error('[sendBrochure] Exception:', err);
    return { ok: false, errors: { global: 'No pudimos enviar la guía. Intenta de nuevo.' } };
  }
}
