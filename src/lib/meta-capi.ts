function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
}

function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

type CapiEventOptions = {
  event_name: string;
  email?: string;
  phone?: string;
};

/**
 * Sends a server-side CAPI event paired with the browser Pixel event.
 * Always call this alongside window.fbq() for deduplication.
 *
 * Returns the event_id so you can pass it to fbq() for deduplication:
 *   const id = await sendCapiEvent({ event_name: 'Lead', email });
 *   window.fbq('track', 'Lead', {}, { eventID: id });
 */
export async function sendCapiEvent(options: CapiEventOptions): Promise<string> {
  const event_id = generateEventId();
  const fbp = getCookie('_fbp');
  const fbc = getCookie('_fbc');

  try {
    await fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...options,
        event_id,
        fbp,
        fbc,
        event_source_url: window.location.href,
      }),
    });
  } catch (err) {
    console.error('[meta-capi] fetch error:', err);
  }

  return event_id;
}
