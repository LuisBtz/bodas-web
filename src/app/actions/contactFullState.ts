export type ContactFullState = {
  ok: boolean;
  errors?: Partial<
    Record<
      | 'name'
      | 'email'
      | 'phone'
      | 'weddingDate'
      | 'venue'
      | 'service'
      | 'referral'
      | 'message'
      | 'global',
      string
    >
  >;
};

export const initialFullState: ContactFullState = { ok: false };
