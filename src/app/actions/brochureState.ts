export type BrochureState = {
  ok: boolean;
  errors?: Partial<
    Record<
      | 'name'
      | 'email'
      | 'phone'
      | 'weddingDate'
      | 'venue'
      | 'consent'
      | 'global',
      string
    >
  >;
};

export const initialBrochureState: BrochureState = { ok: false };
