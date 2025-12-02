export type ContactState = {
  ok: boolean;
  errors?: Partial<Record<'name' | 'email' | 'wedding' | 'message' | 'global', string>>;
};

export const initialState: ContactState = { ok: false };
