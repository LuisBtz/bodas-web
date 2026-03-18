'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import ContactEmailFull from '@/emails/ContactEmailFull';
import type { ContactFullState } from './contactFullState';

const SERVICES: Record<string, string> = {
  fotografia: 'Solo fotografía',
  video: 'Solo video',
  ambos: 'Fotografía + Video',
};

const schema = z.object({
  name: z.string().min(2, 'Por favor ingresa tu nombre completo.'),
  email: z.string().email('Ingresa un correo electrónico válido.'),
  phone: z.string().min(8, 'Ingresa un número de WhatsApp o teléfono.'),
  weddingDate: z.string().min(1, '¿Cuándo será tu boda?'),
  venue: z.string().optional(),
  service: z
    .string()
    .refine((v) => Object.keys(SERVICES).includes(v), '¿Qué servicio les interesa?'),
  referral: z.string().optional(),
  message: z.string().optional(),
});

export async function sendContactFull(
  _prev: ContactFullState,
  formData: FormData
): Promise<ContactFullState> {
  // ─── Antispam 1: Honeypot ─────────────────────────────────────────────────
  // Campo oculto que humanos nunca llenan. Si tiene valor → bot.
  const honeypot = String(formData.get('website') ?? '');
  if (honeypot.length > 0) {
    // Rechazo silencioso: no revelar al bot que fue detectado
    return { ok: true };
  }

  // ─── Antispam 2: Time-threshold (< 3 s = bot demasiado rápido) ───────────
  const formTime = Number(formData.get('_t') ?? 0);
  if (formTime > 0 && Date.now() - formTime < 3000) {
    return { ok: true }; // Rechazo silencioso
  }

  // ─── Antispam 3: Longitud mínima razonable de IP contenido ───────────────
  // (Zod schema se encarga de validar campo a campo)

  // ─── Validación de entorno ────────────────────────────────────────────────
  if (!process.env.RESEND_API_KEY) {
    console.error('[sendContactFull] Falta RESEND_API_KEY');
    return { ok: false, errors: { global: 'Error de configuración. Escríbenos directamente.' } };
  }
  if (!process.env.MAIL_TO) {
    console.error('[sendContactFull] Falta MAIL_TO');
    return { ok: false, errors: { global: 'Error de configuración. Escríbenos directamente.' } };
  }

  // ─── Parse de datos ───────────────────────────────────────────────────────
  const raw = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim().toLowerCase(),
    phone: String(formData.get('phone') ?? '').trim(),
    weddingDate: String(formData.get('weddingDate') ?? '').trim(),
    venue: String(formData.get('venue') ?? '').trim(),
    service: String(formData.get('service') ?? '').trim(),
    referral: String(formData.get('referral') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: ContactFullState['errors'] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactFullState['errors']>;
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, errors };
  }

  const { name, email, phone, weddingDate, venue, service, referral, message } = parsed.data;
  const serviceLabel = SERVICES[service] ?? service;

  // ─── Envío con Resend ─────────────────────────────────────────────────────
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.MAIL_FROM ?? 'Contacto <onboarding@resend.dev>';
  const to = process.env.MAIL_TO.split(',').map((s) => s.trim()).filter(Boolean);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Nueva consulta de boda — ${name}`,
      react: ContactEmailFull({
        name,
        email,
        phone,
        weddingDate,
        venue,
        serviceLabel,
        referral,
        message,
      }),
      replyTo: email,
    });

    if (error) {
      console.error('[sendContactFull] Resend error:', error);
      return { ok: false, errors: { global: 'No se pudo enviar el mensaje. Intenta de nuevo.' } };
    }

    console.log('[sendContactFull] Enviado OK → to:', to, '| from:', name);
    return { ok: true };
  } catch (err) {
    console.error('[sendContactFull] Exception:', err);
    return { ok: false, errors: { global: 'No se pudo enviar el mensaje. Intenta de nuevo.' } };
  }
}
