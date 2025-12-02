'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import ContactEmail from '@/emails/ContactEmail';
import type { ContactState } from './contactState';

// Validación
const schema = z.object({
  name: z.string().min(1, 'Por favor, cuéntame tu nombre.'),
  email: z.string().email('Ingresa un mail válido.'),
  wedding: z.string().min(1, '¿Cuándo y dónde será?'),
  message: z.string().min(1, 'Escribe un mensaje, te leo 😊'),
});

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // 1) Validaciones de entorno (reportan error a la UI)
  if (!process.env.RESEND_API_KEY) {
    console.error('[sendContact] Falta RESEND_API_KEY');
    return { ok: false, errors: { global: 'Falta configurar RESEND_API_KEY en .env.local' } };
  }
  if (!process.env.MAIL_TO) {
    console.error('[sendContact] Falta MAIL_TO');
    return { ok: false, errors: { global: 'Falta configurar MAIL_TO en .env.local' } };
  }

  // 2) Parse del form
  const data = {
    name: String(formData.get('name') || ''),
    email: String(formData.get('email') || ''),
    wedding: String(formData.get('wedding') || ''),
    message: String(formData.get('message') || ''),
  };

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const errors: ContactState['errors'] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as 'name' | 'email' | 'wedding' | 'message';
      errors[key] = issue.message;
    }
    return { ok: false, errors };
  }

  const { name, email, wedding, message } = parsed.data;

  // 3) Config de envío
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.MAIL_FROM || 'Contacto <onboarding@resend.dev>';
  const to = process.env.MAIL_TO.split(',').map(s => s.trim()).filter(Boolean);

  try {
    const { data: result, error } = await resend.emails.send({
      from,
      to,
      subject: `Nuevo contacto: ${name}`,
      react: ContactEmail({ name, email, wedding, message }),
      replyTo: email,
    });

    if (error) {
      console.error('[sendContact] Resend error:', error);
      return { ok: false, errors: { global: 'Fallo el envío con Resend. Revisa logs.' } };
    }

    console.log('[sendContact] Enviado OK. Resend id:', result?.id, 'to:', to);
    return { ok: true };
  } catch (err) {
    console.error('[sendContact] Exception:', err);
    return { ok: false, errors: { global: 'No se pudo enviar el correo. Intenta nuevamente.' } };
  }
}
