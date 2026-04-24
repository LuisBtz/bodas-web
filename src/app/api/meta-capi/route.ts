import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

const PIXEL_ID = process.env.META_PIXEL_ID!;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN!;
const API_VERSION = 'v21.0';
const CAPI_URL = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`;

function sha256(value: string) {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

export async function POST(req: NextRequest) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json({ error: 'Meta CAPI not configured' }, { status: 500 });
  }

  const body = await req.json();
  const { event_name, event_id, email, phone, name, fbp, fbc, event_source_url } = body;

  if (!event_name || !event_id) {
    return NextResponse.json({ error: 'event_name and event_id are required' }, { status: 400 });
  }

  const user_data: Record<string, string> = {
    client_ip_address: req.headers.get('x-forwarded-for')?.split(',')[0] ?? '',
    client_user_agent: req.headers.get('user-agent') ?? '',
  };
  if (email) user_data.em = sha256(email);
  if (phone) user_data.ph = sha256(phone.replace(/\D/g, ''));
  if (name) user_data.fn = sha256(name);
  if (fbp) user_data.fbp = fbp;
  if (fbc) user_data.fbc = fbc;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name,
        event_id,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: event_source_url ?? '',
        action_source: 'website',
        user_data,
      },
    ],
  };

  const testCode = process.env.META_CAPI_TEST_EVENT_CODE;
  if (testCode) payload.test_event_code = testCode;

  const res = await fetch(`${CAPI_URL}?access_token=${ACCESS_TOKEN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('[meta-capi] Error:', data);
    return NextResponse.json({ error: data }, { status: res.status });
  }

  return NextResponse.json({ ok: true, events_received: data.events_received });
}
