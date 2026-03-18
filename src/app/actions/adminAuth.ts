'use server';

import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function adminLogin(password: string): Promise<{ ok: boolean }> {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return { ok: false };

  if (password !== secret) return { ok: false };

  const jar = await cookies();
  jar.set(COOKIE_NAME, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });

  return { ok: true };
}

export async function adminLogout() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}
