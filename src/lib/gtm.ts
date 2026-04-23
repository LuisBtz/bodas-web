type GtmEvent = {
  event: string;
  [key: string]: unknown;
};

export function pushEvent(payload: GtmEvent) {
  if (typeof window === 'undefined') return;
  (window as { dataLayer?: GtmEvent[] }).dataLayer =
    (window as { dataLayer?: GtmEvent[] }).dataLayer ?? [];
  (window as { dataLayer: GtmEvent[] }).dataLayer.push(payload);
}
